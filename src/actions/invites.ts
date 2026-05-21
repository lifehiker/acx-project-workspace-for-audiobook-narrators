"use server";

import { revalidatePath } from "next/cache";
import { nanoid } from "nanoid";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { getProjectForUser } from "@/lib/workspace";
import { canUseFeature, getWorkspacePlan } from "@/lib/subscription";

const schema = z.object({
  email: z.string().email(),
  role: z.enum(["OWNER", "COLLABORATOR", "READ_ONLY"]),
});

export async function inviteCollaboratorAction(projectId: string, _: unknown, formData: FormData) {
  const user = await requireUser();
  const project = await getProjectForUser(user.id, projectId);
  if (!project) return;
  const plan = await getWorkspacePlan(project.workspaceId);
  if (!canUseFeature(plan, "collaboration")) return;
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;
  const invite = await prisma.projectInvite.create({
    data: {
      workspaceId: project.workspaceId,
      projectId,
      email: parsed.data.email.toLowerCase(),
      role: parsed.data.role,
      token: nanoid(20),
    },
  });
  await sendEmail({
    to: invite.email,
    subject: `Invitation to ${project.title}`,
    text: `${user.name || user.email} invited you to collaborate on ${project.title}.`,
  });
  revalidatePath(`/app/projects/${projectId}`);
  return;
}
