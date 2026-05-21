import { notFound } from "next/navigation";
import { Card, Field, PageHeader, Select } from "@/components/ui";
import { ProjectForm } from "@/components/project-form";
import { inviteCollaboratorAction } from "@/actions/invites";
import { requireUser } from "@/lib/auth";
import { getProjectForUser } from "@/lib/workspace";

export default async function ProjectPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const user = await requireUser();
  const project = await getProjectForUser(user.id, projectId);
  if (!project) notFound();
  return <>
    <PageHeader title={project.title} eyebrow={`${project.platform} · ${project.projectType}`}>{project.authorName}</PageHeader>
    <div className="grid gap-4 lg:grid-cols-[1fr_360px]"><Card><ProjectForm project={project} /></Card><Card><h2 className="mb-4 text-xl font-bold">Invite collaborator</h2><form action={inviteCollaboratorAction.bind(null, project.id, null)} className="grid gap-3"><Field label="Email" name="email" type="email" required /><Select label="Role" name="role" defaultValue="COLLABORATOR" options={["COLLABORATOR", "READ_ONLY", "OWNER"]} /><button className="focus-ring h-10 rounded-md bg-[#1f5d52] px-4 font-semibold text-white">Send invite</button></form><div className="mt-5 grid gap-2">{project.invites.map((invite) => <p className="text-sm text-[#596358]" key={invite.id}>{invite.email} · {invite.role}</p>)}</div></Card></div>
  </>;
}
