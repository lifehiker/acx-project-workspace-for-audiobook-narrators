"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getProjectForUser } from "@/lib/workspace";

const schema = z.object({
  chapter: z.string().min(1),
  timestamp: z.string().min(1),
  note: z.string().min(1),
  prooferName: z.string().optional(),
  severity: z.enum(["LOW", "MEDIUM", "HIGH"]),
});

export async function addProofingCommentAction(projectId: string, _: unknown, formData: FormData) {
  const user = await requireUser();
  if (!(await getProjectForUser(user.id, projectId))) return;
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;
  await prisma.proofingComment.create({
    data: { projectId, ...parsed.data, prooferName: parsed.data.prooferName || null },
  });
  revalidatePath(`/app/projects/${projectId}/proofing`);
  return;
}

export async function convertProofingToPickupAction(projectId: string, commentId: string) {
  const user = await requireUser();
  if (!(await getProjectForUser(user.id, projectId))) return;
  const comment = await prisma.proofingComment.findUnique({ where: { id: commentId } });
  if (!comment || comment.projectId !== projectId) return;
  await prisma.$transaction([
    prisma.pickupItem.create({
      data: {
        projectId,
        chapter: comment.chapter,
        timestamp: comment.timestamp,
        issue: comment.note,
        requestedFix: "Record correction and replace in master.",
        source: `Proofing: ${comment.prooferName || "proofer"}`,
        status: "OPEN",
      },
    }),
    prisma.proofingComment.update({ where: { id: commentId }, data: { convertedAt: new Date() } }),
  ]);
  revalidatePath(`/app/projects/${projectId}/proofing`);
  revalidatePath(`/app/projects/${projectId}/pickups`);
  return;
}
