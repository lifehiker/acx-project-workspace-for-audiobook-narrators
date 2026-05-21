import { addDays } from "date-fns";
import { prisma } from "@/lib/db";

export async function ensureWorkspace(userId: string) {
  const existing = await prisma.membership.findFirst({
    where: { userId },
    include: { workspace: { include: { subscription: true } } },
  });
  if (existing) return existing.workspace;

  return prisma.workspace.create({
    data: {
      name: "Narrator Workspace",
      memberships: { create: { userId, role: "OWNER" } },
      subscription: {
        create: {
          plan: "SOLO",
          status: "TRIALING",
          trialEndsAt: addDays(new Date(), 14),
        },
      },
    },
    include: { subscription: true },
  });
}

export async function getProjectForUser(userId: string, projectId: string) {
  return prisma.project.findFirst({
    where: {
      id: projectId,
      workspace: { memberships: { some: { userId } } },
    },
    include: {
      payment: true,
      royalty: true,
      intakeLinks: true,
      pronunciations: { orderBy: { createdAt: "desc" } },
      pickups: { orderBy: { createdAt: "desc" } },
      proofingComments: { orderBy: { createdAt: "desc" } },
      invites: { orderBy: { createdAt: "desc" } },
    },
  });
}
