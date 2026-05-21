"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getProjectForUser } from "@/lib/workspace";

const schema = z.object({
  royaltyShareType: z.string().optional(),
  startDate: z.string().optional(),
  reversionDate: z.string().optional(),
  reminderDate: z.string().optional(),
  notes: z.string().optional(),
});

export async function updateRoyaltyAction(projectId: string, _: unknown, formData: FormData) {
  const user = await requireUser();
  if (!(await getProjectForUser(user.id, projectId))) return;
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;
  const data = parsed.data;
  await prisma.royaltyRecord.upsert({
    where: { projectId },
    update: {
      royaltyShareType: data.royaltyShareType || null,
      startDate: data.startDate ? new Date(data.startDate) : null,
      reversionDate: data.reversionDate ? new Date(data.reversionDate) : null,
      reminderDate: data.reminderDate ? new Date(data.reminderDate) : null,
      notes: data.notes || null,
    },
    create: { projectId, royaltyShareType: data.royaltyShareType || null },
  });
  revalidatePath(`/app/projects/${projectId}/royalties`);
  return;
}
