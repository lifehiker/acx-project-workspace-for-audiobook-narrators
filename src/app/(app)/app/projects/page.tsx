export const dynamic = "force-dynamic";
import Link from "next/link";
import { Button, Card, PageHeader } from "@/components/ui";
import { ProjectStatusBadge } from "@/components/status";
import { requireUser } from "@/lib/auth";
import { ensureWorkspace } from "@/lib/workspace";
import { prisma } from "@/lib/db";

export default async function ProjectsPage({ searchParams }: { searchParams?: Promise<{ status?: string }> }) {
  const params = await searchParams;
  const user = await requireUser();
  const workspace = await ensureWorkspace(user.id);
  const projects = await prisma.project.findMany({ where: { workspaceId: workspace.id, ...(params?.status ? { status: params.status as never } : {}) }, orderBy: { createdAt: "desc" } });
  const statuses = ["INTAKE", "WAITING_ON_AUTHOR", "RECORDING", "PROOFING", "PICKUPS", "DELIVERED", "PAID", "ARCHIVED"];
  return (
    <>
      <PageHeader title="Projects" eyebrow="Audiobook tracker" action={<Button href="/app/projects/new">New project</Button>} />
      <div className="mb-4 flex gap-2 overflow-x-auto">{statuses.map((status) => <Button key={status} href={`/app/projects?status=${status}`} variant="secondary">{status.replaceAll("_", " ")}</Button>)}</div>
      <Card>
        <div className="grid gap-3">
          {projects.length === 0 ? <p className="text-[#596358]">No projects match this filter.</p> : projects.map((project) => (
            <Link className="grid gap-2 rounded-md border border-[#eee8dc] p-4 hover:border-[#1f5d52] md:grid-cols-[1fr_auto]" href={`/app/projects/${project.id}`} key={project.id}>
              <div><h2 className="font-bold">{project.title}</h2><p className="text-sm text-[#596358]">{project.authorName} · {project.projectType} · due {project.dueDate?.toISOString().slice(0, 10) ?? "unset"}</p></div><ProjectStatusBadge status={project.status} />
            </Link>
          ))}
        </div>
      </Card>
    </>
  );
}
