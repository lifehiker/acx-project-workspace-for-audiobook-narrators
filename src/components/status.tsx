import { Badge } from "@/components/ui";

export function ProjectStatusBadge({ status }: { status: string }) {
  const tone = status === "PAID" || status === "DELIVERED" ? "green" : status === "PICKUPS" || status === "PROOFING" ? "amber" : status === "ARCHIVED" ? "neutral" : "blue";
  return <Badge tone={tone}>{status.replaceAll("_", " ")}</Badge>;
}
