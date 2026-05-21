import type { Plan, Workspace } from "@prisma/client";
import { prisma } from "@/lib/db";

export type Feature =
  | "collaboration"
  | "payments"
  | "royalties"
  | "advancedFiltering"
  | "teamSeats";

export async function getWorkspacePlan(workspaceId: string): Promise<Plan> {
  const subscription = await prisma.subscription.findUnique({ where: { workspaceId } });
  return subscription?.plan ?? "SOLO";
}

export function canUseFeature(plan: Plan, feature: Feature) {
  if (plan === "STUDIO") return true;
  if (plan === "PRO") return feature !== "teamSeats";
  return !["collaboration", "payments", "royalties", "advancedFiltering", "teamSeats"].includes(feature);
}

export async function canCreateProject(workspace: Pick<Workspace, "id">, plan: Plan) {
  if (plan !== "SOLO") return true;
  const active = await prisma.project.count({
    where: { workspaceId: workspace.id, status: { not: "ARCHIVED" } },
  });
  return active < 5;
}
