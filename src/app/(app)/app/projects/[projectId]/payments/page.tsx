import { notFound } from "next/navigation";
import { updatePaymentAction } from "@/actions/payments";
import { Button, Card, Field, PageHeader, Select } from "@/components/ui";
import { money } from "@/lib/utils";
import { requireUser } from "@/lib/auth";
import { getProjectForUser } from "@/lib/workspace";

function dv(d?: Date | null) { return d?.toISOString().slice(0, 10) ?? ""; }
export default async function PaymentsPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const user = await requireUser();
  const project = await getProjectForUser(user.id, projectId);
  if (!project) notFound();
  const payment = project.payment;
  const pfhTotal = (payment?.pfhRate ?? 0) * (payment?.estimatedFinishedHours ?? project.estimatedFinishedHours ?? 0);
  return <><PageHeader title="Payment tracker" eyebrow={project.title}>Add PFH rate, invoice dates, and payment status.</PageHeader><div className="grid gap-4 lg:grid-cols-[1fr_320px]"><Card><form action={updatePaymentAction.bind(null, projectId, null)} className="grid gap-4 md:grid-cols-2"><Select label="Rate type" name="rateType" defaultValue={payment?.rateType ?? project.projectType} options={["PFH", "ROYALTY_SHARE", "ROYALTY_SHARE_PLUS", "FLAT_FEE", "OTHER"]} /><Select label="Status" name="status" defaultValue={payment?.status ?? "NOT_INVOICED"} options={["NOT_INVOICED", "INVOICED", "OVERDUE", "PAID"]} /><Field label="PFH rate" name="pfhRate" type="number" defaultValue={payment?.pfhRate} /><Field label="Estimated finished hours" name="estimatedFinishedHours" type="number" defaultValue={payment?.estimatedFinishedHours ?? project.estimatedFinishedHours} /><Field label="Agreed amount" name="agreedAmount" type="number" defaultValue={payment?.agreedAmount} /><Field label="Invoice sent" name="invoiceSentDate" type="date" defaultValue={dv(payment?.invoiceSentDate)} /><Field label="Payment due" name="paymentDueDate" type="date" defaultValue={dv(payment?.paymentDueDate)} /><Field label="Payment received" name="paymentReceivedDate" type="date" defaultValue={dv(payment?.paymentReceivedDate)} /><Button type="submit">Save payment</Button></form></Card><Card><p className="text-sm text-[#596358]">Estimated PFH total</p><p className="mt-2 text-4xl font-bold">{money(pfhTotal || payment?.agreedAmount)}</p></Card></div></>;
}
