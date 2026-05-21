import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { getProjectForUser } from "@/lib/workspace";

export default async function ProjectLayout({ children, params }: { children: React.ReactNode; params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const user = await requireUser();
  const project = await getProjectForUser(user.id, projectId);
  if (!project) notFound();
  const tabs = [
    ["Overview", ""], ["Pronunciations", "pronunciations"], ["Pickups", "pickups"], ["Proofing", "proofing"], ["Payments", "payments"], ["Royalties", "royalties"],
  ];
  return <div><div className="mb-5 flex gap-2 overflow-x-auto">{tabs.map(([label, path]) => <Link className="rounded-md border border-[#ddd4c4] bg-white px-3 py-2 text-sm font-semibold hover:border-[#1f5d52]" key={label} href={`/app/projects/${projectId}${path ? `/${path}` : ""}`}>{label}</Link>)}</div>{children}</div>;
}
