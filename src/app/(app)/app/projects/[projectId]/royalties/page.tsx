import { notFound } from "next/navigation";
import { updateRoyaltyAction } from "@/actions/royalties";
import { Button, Card, Field, PageHeader, Textarea } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { getProjectForUser } from "@/lib/workspace";

function dv(d?: Date | null) { return d?.toISOString().slice(0, 10) ?? ""; }
export default async function RoyaltiesPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const user = await requireUser();
  const project = await getProjectForUser(user.id, projectId);
  if (!project) notFound();
  const royalty = project.royalty;
  return <><PageHeader title="Royalty-share and rights tracker" eyebrow={project.title}>Track royalty-share terms and reversion dates.</PageHeader><Card><form action={updateRoyaltyAction.bind(null, projectId, null)} className="grid gap-4 md:grid-cols-2"><Field label="Royalty-share type" name="royaltyShareType" defaultValue={royalty?.royaltyShareType} /><Field label="Start date" name="startDate" type="date" defaultValue={dv(royalty?.startDate)} /><Field label="Rights/reversion date" name="reversionDate" type="date" defaultValue={dv(royalty?.reversionDate)} /><Field label="Reminder date" name="reminderDate" type="date" defaultValue={dv(royalty?.reminderDate)} /><div className="md:col-span-2"><Textarea label="Notes" name="notes" defaultValue={royalty?.notes} /></div><Button type="submit">Save royalty tracker</Button></form></Card></>;
}
