"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ensureWorkspace, getProjectForUser } from "@/lib/workspace";
import { canCreateProject, getWorkspacePlan } from "@/lib/subscription";
import { track } from "@/lib/analytics";

const projectSchema = z.object({
  title: z.string().min(2),
  authorName: z.string().min(2),
  authorEmail: z.string().email().optional().or(z.literal("")),
  platform: z.enum(["ACX", "FINDAWAY", "DIRECT", "OTHER"]),
  projectType: z.enum(["PFH", "ROYALTY_SHARE", "ROYALTY_SHARE_PLUS", "FLAT_FEE", "OTHER"]),
  status: z.enum(["INTAKE", "WAITING_ON_AUTHOR", "RECORDING", "PROOFING", "PICKUPS", "DELIVERED", "PAID", "ARCHIVED"]),
  estimatedFinishedHours: z.coerce.number().nonnegative().optional().or(z.literal("")),
  dueDate: z.string().optional(),
  notes: z.string().optional(),
});

function dateOrNull(value?: string) {
  return value ? new Date(value) : null;
}

export async function createProjectAction(_: unknown, formData: FormData) {
  const user = await requireUser();
  const workspace = await ensureWorkspace(user.id);
  const plan = await getWorkspacePlan(workspace.id);
  if (!(await canCreateProject(workspace, plan))) {
    return;
  }
  const parsed = projectSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;
  const project = await prisma.project.create({
    data: {
      workspaceId: workspace.id,
      title: parsed.data.title,
      authorName: parsed.data.authorName,
      authorEmail: parsed.data.authorEmail || null,
      platform: parsed.data.platform,
      projectType: parsed.data.projectType,
      status: parsed.data.status,
      estimatedFinishedHours:
        typeof parsed.data.estimatedFinishedHours === "number" ? parsed.data.estimatedFinishedHours : null,
      dueDate: dateOrNull(parsed.data.dueDate),
      notes: parsed.data.notes || null,
      payment: { create: { rateType: parsed.data.projectType, estimatedFinishedHours: typeof parsed.data.estimatedFinishedHours === "number" ? parsed.data.estimatedFinishedHours : null } },
      royalty: { create: {} },
    },
  });
  track("project_created", { projectId: project.id });
  revalidatePath("/app");
  redirect(`/app/projects/${project.id}`);
}

export async function updateProjectAction(projectId: string, _: unknown, formData: FormData) {
  const user = await requireUser();
  const project = await getProjectForUser(user.id, projectId);
  if (!project) return;
  const parsed = projectSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;
  await prisma.project.update({
    where: { id: projectId },
    data: {
      title: parsed.data.title,
      authorName: parsed.data.authorName,
      authorEmail: parsed.data.authorEmail || null,
      platform: parsed.data.platform,
      projectType: parsed.data.projectType,
      status: parsed.data.status,
      estimatedFinishedHours:
        typeof parsed.data.estimatedFinishedHours === "number" ? parsed.data.estimatedFinishedHours : null,
      dueDate: dateOrNull(parsed.data.dueDate),
      notes: parsed.data.notes || null,
    },
  });
  revalidatePath(`/app/projects/${projectId}`);
  return;
}
