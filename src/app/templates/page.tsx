import Link from "next/link";
import { PublicShell } from "@/components/public-shell";
import { Card, PageHeader } from "@/components/ui";
import { templates } from "@/lib/marketing";

export const metadata = { title: "Audiobook Narrator Templates | Free ACX Workflow Templates", description: "Free pronunciation, pickup, payment, royalty-share, and project tracker templates for audiobook narrators." };

export default function TemplatesPage() {
  return <PublicShell><main className="mx-auto max-w-7xl px-4 py-12"><PageHeader title="Free audiobook narrator templates" eyebrow="SEO resources">Use the templates directly or turn them into repeatable project workflows.</PageHeader><div className="grid gap-4 md:grid-cols-3">{templates.map((template) => <Link key={template.slug} href={`/templates/${template.slug}`}><Card className="h-full hover:border-[#1f5d52]"><h2 className="font-bold">{template.title}</h2><p className="mt-2 text-sm leading-6 text-[#596358]">{template.description}</p></Card></Link>)}</div></main></PublicShell>;
}
