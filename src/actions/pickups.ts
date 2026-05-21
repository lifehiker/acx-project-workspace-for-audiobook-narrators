"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { track } from "@/lib/analytics";
import { getProjectForUser } from "@/lib/workspace";

const schema = z.object({
  chapter: z.string().min(1),
  timestamp: z.string().min(1),
  issue: z.string().min(1),
  requestedFix: z.string().min(1),
  source: z.string().optional(),
  assignee: z.string().optional(),
  status: z.enum(["OPEN", "IN_PROGRESS", "RECORDED", "SENT_FOR_REVIEW", "APPROVED"]),
  dueDate: z.string().optional(),
});

export async function addPickupAction(projectId: string, _: unknown, formData: FormData) {
  const user = await requireUser();
  if (!(await getProjectForUser(user.id, projectId))) return;
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;
  await prisma.pickupItem.create({
    data: {
      projectId,
      chapter: parsed.data.chapter,
      timestamp: parsed.data.timestamp,
      issue: parsed.data.issue,
      requestedFix: parsed.data.requestedFix,
      source: parsed.data.source || null,
      assignee: parsed.data.assignee || null,
      status: parsed.data.status,
      dueDate: parsed.data.dueDate ? new Date(parsed.data.dueDate) : null,
    },
  });
  track("pickup_created", { projectId });
  revalidatePath(`/app/projects/${projectId}/pickups`);
  return;
}
