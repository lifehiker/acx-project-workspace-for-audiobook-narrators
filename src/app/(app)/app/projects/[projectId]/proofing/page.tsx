import { notFound } from "next/navigation";
import { addProofingCommentAction, convertProofingToPickupAction } from "@/actions/proofing";
import { Button, Card, Field, PageHeader, Select, Textarea } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { getProjectForUser } from "@/lib/workspace";

export default async function ProofingPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const user = await requireUser();
  const project = await getProjectForUser(user.id, projectId);
  if (!project) notFound();
  return <><PageHeader title="Proofing comments" eyebrow={project.title}>Keep proofing notes separate, then convert approved fixes into pickups.</PageHeader><div className="grid gap-4 lg:grid-cols-[360px_1fr]"><Card><form action={addProofingCommentAction.bind(null, projectId, null)} className="grid gap-3"><Field label="Chapter" name="chapter" required /><Field label="Timestamp" name="timestamp" required /><Textarea label="Note" name="note" /><Field label="Proofer name" name="prooferName" /><Select label="Severity" name="severity" defaultValue="MEDIUM" options={["LOW", "MEDIUM", "HIGH"]} /><Button type="submit">Add comment</Button></form></Card><Card>{project.proofingComments.length === 0 ? <p className="text-[#596358]">Proofing notes will appear here.</p> : <div className="grid gap-3">{project.proofingComments.map((c) => <div className="rounded-md border border-[#eee8dc] p-3" key={c.id}><strong>{c.chapter} · {c.timestamp}</strong><p className="mt-2 text-sm text-[#596358]">{c.note}</p><form action={convertProofingToPickupAction.bind(null, projectId, c.id)} className="mt-3"><Button type="submit" variant="secondary">{c.convertedAt ? "Converted" : "Convert to pickup"}</Button></form></div>)}</div>}</Card></div></>;
}
