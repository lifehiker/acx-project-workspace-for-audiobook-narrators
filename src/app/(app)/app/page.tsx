export const dynamic = "force-dynamic";

import Link from "next/link";
import { format } from "date-fns";
import { Card, PageHeader, Button, Badge } from "@/components/ui";
import { ProjectStatusBadge } from "@/components/status";
import { requireUser } from "@/lib/auth";
import { ensureWorkspace } from "@/lib/workspace";
import { prisma } from "@/lib/db";

export default async function DashboardPage() {
  const user = await requireUser();
  const workspace = await ensureWorkspace(user.id);
  const projects = await prisma.project.findMany({ where: { workspaceId: workspace.id }, include: { payment: true, royalty: true }, orderBy: { updatedAt: "desc" } });
  const openPickups = await prisma.pickupItem.count({ where: { project: { workspaceId: workspace.id }, status: { not: "APPROVED" } } });
  const reminders = projects.filter((p) => p.payment?.paymentDueDate || p.royalty?.reminderDate).slice(0, 5);
  return (
    <>
      <PageHeader title="Dashboard" eyebrow="Production control" action={<Button href="/app/projects/new">New project</Button>}>
        Track active audiobook work, upcoming reminders, and pickup pressure.
      </PageHeader>
      <div className="grid gap-4 md:grid-cols-4">
        <Card><p className="text-sm text-[#596358]">Projects</p><p className="mt-2 text-3xl font-bold">{projects.length}</p></Card>
        <Card><p className="text-sm text-[#596358]">Active</p><p className="mt-2 text-3xl font-bold">{projects.filter((p) => p.status !== "ARCHIVED" && p.status !== "PAID").length}</p></Card>
        <Card><p className="text-sm text-[#596358]">Open pickups</p><p className="mt-2 text-3xl font-bold">{openPickups}</p></Card>
        <Card><p className="text-sm text-[#596358]">Plan</p><p className="mt-2 text-3xl font-bold">{workspace.subscription?.plan ?? "SOLO"}</p></Card>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_360px]">
        <Card>
          <h2 className="mb-4 text-xl font-bold">Recent projects</h2>
          <div className="grid gap-3">
            {projects.length === 0 ? <p className="rounded-md bg-[#f7f4ee] p-4 text-[#596358]">Create your first audiobook project.</p> : projects.slice(0, 8).map((project) => (
              <Link className="grid gap-2 rounded-md border border-[#eee8dc] p-3 hover:border-[#1f5d52] md:grid-cols-[1fr_auto]" href={`/app/projects/${project.id}`} key={project.id}>
                <div><strong>{project.title}</strong><p className="text-sm text-[#596358]">{project.authorName} · {project.platform}</p></div><ProjectStatusBadge status={project.status} />
              </Link>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="mb-4 text-xl font-bold">Upcoming reminders</h2>
          {reminders.length === 0 ? <p className="text-sm text-[#596358]">Payment and rights reminders appear here.</p> : reminders.map((project) => <div className="mb-3 rounded-md border border-[#eee8dc] p-3" key={project.id}><Badge tone="amber">{project.payment?.paymentDueDate ? "Payment" : "Rights"}</Badge><p className="mt-2 font-semibold">{project.title}</p><p className="text-sm text-[#596358]">{format(project.payment?.paymentDueDate ?? project.royalty?.reminderDate ?? new Date(), "MMM d, yyyy")}</p></div>)}
        </Card>
      </div>
    </>
  );
}
