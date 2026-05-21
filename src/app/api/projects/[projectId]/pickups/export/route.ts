import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { csvEscape } from "@/lib/utils";

export async function GET(_: Request, { params }: { params: Promise<{ projectId: string }> }) {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });
  const { projectId } = await params;
  const project = await prisma.project.findFirst({ where: { id: projectId, workspace: { memberships: { some: { userId } } } }, include: { pickups: true } });
  if (!project) return new NextResponse("Not found", { status: 404 });
  const rows = [["Chapter", "Timestamp", "Issue", "Requested Fix", "Source", "Assignee", "Status", "Due Date"], ...project.pickups.map((p) => [p.chapter, p.timestamp, p.issue, p.requestedFix, p.source, p.assignee, p.status, p.dueDate?.toISOString().slice(0, 10)])];
  return new NextResponse(rows.map((row) => row.map(csvEscape).join(",")).join("\n"), { headers: { "content-type": "text/csv", "content-disposition": `attachment; filename="${project.title}-pickups.csv"` } });
}
