"use server";

import { revalidatePath } from "next/cache";
import { nanoid } from "nanoid";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { track } from "@/lib/analytics";
import { getProjectForUser } from "@/lib/workspace";

const schema = z.object({
  term: z.string().min(1),
  pronunciation: z.string().min(1),
  context: z.string().optional(),
  audioUrl: z.string().url().optional().or(z.literal("")),
  status: z.enum(["PENDING", "APPROVED", "NEEDS_CLARIFICATION"]).default("PENDING"),
  submittedBy: z.string().optional(),
});

export async function addPronunciationAction(projectId: string, _: unknown, formData: FormData) {
  const user = await requireUser();
  const project = await getProjectForUser(user.id, projectId);
  if (!project) return;
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;
  await prisma.pronunciationEntry.create({
    data: {
      projectId,
      term: parsed.data.term,
      pronunciation: parsed.data.pronunciation,
      context: parsed.data.context || null,
      audioUrl: parsed.data.audioUrl || null,
      status: parsed.data.status,
      submittedBy: parsed.data.submittedBy || user.name || user.email,
    },
  });
  track("pronunciation_added", { projectId });
  revalidatePath(`/app/projects/${projectId}/pronunciations`);
  return;
}

export async function createIntakeLinkAction(projectId: string) {
  const user = await requireUser();
  const project = await getProjectForUser(user.id, projectId);
  if (!project) return;
  const existing = await prisma.authorIntakeLink.findFirst({ where: { projectId, active: true } });
  if (existing) return;
  await prisma.authorIntakeLink.create({ data: { projectId, token: nanoid(16) } });
  revalidatePath(`/app/projects/${projectId}/pronunciations`);
  return;
}

export async function submitIntakeAction(token: string, _: unknown, formData: FormData) {
  const link = await prisma.authorIntakeLink.findUnique({
    where: { token },
    include: { project: { include: { workspace: { include: { memberships: { include: { user: true } } } } } } },
  });
  if (!link?.active) return;
  const parsed = schema.extend({ authorEmail: z.string().email().optional().or(z.literal("")) }).safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;
  await prisma.pronunciationEntry.create({
    data: {
      projectId: link.projectId,
      term: parsed.data.term,
      pronunciation: parsed.data.pronunciation,
      context: parsed.data.context || null,
      audioUrl: parsed.data.audioUrl || null,
      status: "PENDING",
      submittedBy: parsed.data.submittedBy || parsed.data.authorEmail || "Author intake form",
    },
  });
  const owner = link.project.workspace.memberships.find((m) => m.role === "OWNER")?.user;
  if (owner?.email) {
    await sendEmail({
      to: owner.email,
      subject: `New pronunciation for ${link.project.title}`,
      text: `${parsed.data.term}: ${parsed.data.pronunciation}`,
    });
  }
  return;
}
