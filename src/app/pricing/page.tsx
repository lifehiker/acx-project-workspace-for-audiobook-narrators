import { CheckCircle2 } from "lucide-react";
import { PublicShell } from "@/components/public-shell";
import { Button, Card, PageHeader } from "@/components/ui";

export const metadata = { title: "Pricing | ACX Project Workspace", description: "Solo, Pro, and Studio pricing for audiobook narrator project administration." };

const tiers = [
  ["Solo", "$19", "Up to 5 active projects, pronunciation sheets, pickups, proofing notes, CSV export, author intake, reminders."],
  ["Pro", "$39", "Unlimited projects, collaborator invites, payment tracker, PFH calculations, royalty-share tracking, archive."],
  ["Studio", "$79", "Up to 5 internal seats, project permissions, team dashboard, shared contacts, priority support."],
];

export default function PricingPage() {
  return (
    <PublicShell><main className="mx-auto max-w-7xl px-4 py-12"><PageHeader title="Pricing that matches real audiobook project value" eyebrow="14-day free trial">Free templates handle acquisition. The workspace is for narrators who need reusable operations, collaboration, reminders, and payment tracking.</PageHeader><div className="grid gap-4 md:grid-cols-3">{tiers.map(([name, price, desc]) => <Card key={name} className={name === "Pro" ? "border-[#1f5d52] ring-2 ring-[#1f5d52]" : ""}><h2 className="text-xl font-bold">{name}</h2><p className="mt-3 text-4xl font-bold">{price}<span className="text-base font-normal text-[#596358]">/mo</span></p><p className="mt-4 min-h-24 text-sm leading-6 text-[#596358]">{desc}</p><div className="mt-4 flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-[#1f5d52]" />Safe local fallback when Stripe is not configured.</div><Button className="mt-6 w-full" href="/signup">Start trial</Button></Card>)}</div></main></PublicShell>
  );
}
