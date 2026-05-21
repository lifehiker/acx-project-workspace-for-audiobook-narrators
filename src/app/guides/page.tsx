import Link from "next/link";
import { PublicShell } from "@/components/public-shell";
import { Card, PageHeader } from "@/components/ui";
import { guides } from "@/lib/marketing";

export const metadata = { title: "Audiobook Narrator Workflow Guides | ACX & Direct Projects", description: "Guides for audiobook proofing workflows, ACX retake notes, pickups, and narrator project administration." };

export default function GuidesPage() {
  return <PublicShell><main className="mx-auto max-w-7xl px-4 py-12"><PageHeader title="Audiobook workflow guides" eyebrow="Operations playbooks" /><div className="grid gap-4 md:grid-cols-2">{guides.map((guide) => <Link key={guide.slug} href={`/guides/${guide.slug}`}><Card><h2 className="font-bold">{guide.title}</h2><p className="mt-2 text-sm leading-6 text-[#596358]">{guide.description}</p></Card></Link>)}</div></main></PublicShell>;
}
