import { notFound } from "next/navigation";
import { addPickupAction } from "@/actions/pickups";
import { Button, Card, Field, PageHeader, Select, Textarea } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { getProjectForUser } from "@/lib/workspace";

export default async function PickupsPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const user = await requireUser();
  const project = await getProjectForUser(user.id, projectId);
  if (!project) notFound();
  return <><PageHeader title="Pickup tracker" eyebrow={project.title} action={<Button href={`/api/projects/${projectId}/pickups/export`} variant="secondary">Export CSV</Button>}>Track retakes by chapter and timestamp.</PageHeader><div className="grid gap-4 lg:grid-cols-[360px_1fr]"><Card><form action={addPickupAction.bind(null, projectId, null)} className="grid gap-3"><Field label="Chapter" name="chapter" required /><Field label="Timestamp" name="timestamp" placeholder="00:14:32" required /><Textarea label="Issue" name="issue" /><Textarea label="Requested fix" name="requestedFix" /><Field label="Source" name="source" /><Field label="Assignee" name="assignee" /><Select label="Status" name="status" defaultValue="OPEN" options={["OPEN", "IN_PROGRESS", "RECORDED", "SENT_FOR_REVIEW", "APPROVED"]} /><Field label="Due date" name="dueDate" type="date" /><Button type="submit">Add pickup</Button></form></Card><Card>{project.pickups.length === 0 ? <p className="text-[#596358]">Track retakes by chapter and timestamp.</p> : <div className="grid gap-3">{project.pickups.map((p) => <div className="rounded-md border border-[#eee8dc] p-3" key={p.id}><div className="flex justify-between gap-3"><strong>{p.chapter} · {p.timestamp}</strong><span>{p.status.replaceAll("_", " ")}</span></div><p className="mt-2 text-sm text-[#596358]">{p.issue}</p><p className="mt-1 text-sm">{p.requestedFix}</p></div>)}</div>}</Card></div></>;
}
