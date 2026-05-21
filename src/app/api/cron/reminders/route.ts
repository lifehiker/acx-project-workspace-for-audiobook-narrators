import { NextResponse } from "next/server";
import { addDays } from "date-fns";
import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/email";

export async function GET(request: Request) {
  const secret = new URL(request.url).searchParams.get("secret");
  if (process.env.CRON_SECRET && secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const soon = addDays(new Date(), 7);
  const payments = await prisma.paymentRecord.findMany({ where: { paymentDueDate: { lte: soon }, status: { in: ["INVOICED", "OVERDUE"] } }, include: { project: { include: { workspace: { include: { memberships: { include: { user: true } } } } } } } });
  const royalties = await prisma.royaltyRecord.findMany({ where: { reminderDate: { lte: soon } }, include: { project: { include: { workspace: { include: { memberships: { include: { user: true } } } } } } } });
  for (const payment of payments) {
    const owner = payment.project.workspace.memberships.find((m) => m.role === "OWNER")?.user;
    if (owner?.email) await sendEmail({ to: owner.email, subject: `Payment reminder: ${payment.project.title}`, text: `Payment is due for ${payment.project.title}.` });
  }
  for (const royalty of royalties) {
    const owner = royalty.project.workspace.memberships.find((m) => m.role === "OWNER")?.user;
    if (owner?.email) await sendEmail({ to: owner.email, subject: `Rights reminder: ${royalty.project.title}`, text: `Review royalty-share or reversion terms for ${royalty.project.title}.` });
  }
  return NextResponse.json({ ok: true, payments: payments.length, royalties: royalties.length });
}
