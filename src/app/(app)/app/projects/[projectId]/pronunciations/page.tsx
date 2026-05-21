import { notFound } from "next/navigation";
import { Link as LinkIcon } from "lucide-react";
import { addPronunciationAction, createIntakeLinkAction } from "@/actions/pronunciations";
import { Button, Card, Field, PageHeader, Select, Textarea } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { getProjectForUser } from "@/lib/workspace";

export default async function PronunciationsPage({ params, searchParams }: { params: Promise<{ projectId: string }>; searchParams?: Promise<{ q?: string; status?: string }> }) {
  const { projectId } = await params;
  const sp = await searchParams;
  const user = await requireUser();
  const project = await getProjectForUser(user.id, projectId);
  if (!project) notFound();
  const rows = project.pronunciations.filter((p) => (!sp?.q || `${p.term} ${p.pronunciation}`.toLowerCase().includes(sp.q.toLowerCase())) && (!sp?.status || p.status === sp.status));
  const link = project.intakeLinks[0];
  return <><PageHeader title="Pronunciation sheet" eyebrow={project.title} action={<Button href={`/api/projects/${projectId}/pronunciations/export`} variant="secondary">Export CSV</Button>}>Add terms manually or send the author intake form.</PageHeader><div className="grid gap-4 lg:grid-cols-[360px_1fr]"><Card><form action={addPronunciationAction.bind(null, projectId, null)} className="grid gap-3"><Field label="Term/name" name="term" required /><Field label="Pronunciation" name="pronunciation" required /><Textarea label="Source/context" name="context" /><Field label="Audio link" name="audioUrl" /><Select label="Status" name="status" defaultValue="PENDING" options={["PENDING", "APPROVED", "NEEDS_CLARIFICATION"]} /><Button type="submit">Add pronunciation</Button></form><form action={createIntakeLinkAction.bind(null, projectId)} className="mt-5"><Button type="submit" variant="secondary"><LinkIcon size={16} /> Generate intake link</Button></form>{link ? <p className="mt-3 break-all rounded-md bg-[#f7f4ee] p-3 text-sm">/intake/{link.token}</p> : null}</Card><Card><form className="mb-4 grid gap-2 md:grid-cols-[1fr_180px_auto]"><Field label="Search" name="q" defaultValue={sp?.q} /><Select label="Status" name="status" defaultValue={sp?.status ?? ""} options={["", "PENDING", "APPROVED", "NEEDS_CLARIFICATION"]} /><Button type="submit" variant="secondary" className="self-end">Filter</Button></form>{rows.length === 0 ? <p className="text-[#596358]">Add terms manually or send the author intake form.</p> : <div className="overflow-x-auto"><table className="w-full min-w-[720px] text-left text-sm"><thead><tr>{["Term", "Pronunciation", "Context", "Status", "Submitted by"].map((h) => <th className="border-b p-3" key={h}>{h}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.id}><td className="border-b p-3 font-semibold">{row.term}</td><td className="border-b p-3">{row.pronunciation}</td><td className="border-b p-3">{row.context}</td><td className="border-b p-3">{row.status}</td><td className="border-b p-3">{row.submittedBy}</td></tr>)}</tbody></table></div>}</Card></div></>;
}
