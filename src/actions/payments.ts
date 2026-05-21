"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getProjectForUser } from "@/lib/workspace";

const schema = z.object({
  rateType: z.enum(["PFH", "ROYALTY_SHARE", "ROYALTY_SHARE_PLUS", "FLAT_FEE", "OTHER"]),
  pfhRate: z.coerce.number().nonnegative().optional().or(z.literal("")),
  estimatedFinishedHours: z.coerce.number().nonnegative().optional().or(z.literal("")),
  agreedAmount: z.coerce.number().nonnegative().optional().or(z.literal("")),
  invoiceSentDate: z.string().optional(),
  paymentDueDate: z.string().optional(),
  paymentReceivedDate: z.string().optional(),
  status: z.enum(["NOT_INVOICED", "INVOICED", "OVERDUE", "PAID"]),
});

export async function updatePaymentAction(projectId: string, _: unknown, formData: FormData) {
  const user = await requireUser();
  if (!(await getProjectForUser(user.id, projectId))) return;
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;
  const data = parsed.data;
  await prisma.paymentRecord.upsert({
    where: { projectId },
    update: {
      rateType: data.rateType,
      pfhRate: typeof data.pfhRate === "number" ? data.pfhRate : null,
      estimatedFinishedHours: typeof data.estimatedFinishedHours === "number" ? data.estimatedFinishedHours : null,
      agreedAmount: typeof data.agreedAmount === "number" ? data.agreedAmount : null,
      invoiceSentDate: data.invoiceSentDate ? new Date(data.invoiceSentDate) : null,
      paymentDueDate: data.paymentDueDate ? new Date(data.paymentDueDate) : null,
      paymentReceivedDate: data.paymentReceivedDate ? new Date(data.paymentReceivedDate) : null,
      status: data.status,
    },
    create: { projectId, rateType: data.rateType, status: data.status },
  });
  revalidatePath(`/app/projects/${projectId}/payments`);
  return;
}
