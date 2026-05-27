import Link from "next/link";
import { PublicShell } from "@/components/public-shell";
import { Card, PageHeader } from "@/components/ui";
export const dynamic = "force-static";
export const metadata = { title: "Blog | ACX Project Workspace", description: "Audiobook narrator workflow notes and launch updates." };
export default function Page() { return <PublicShell><main className="mx-auto max-w-4xl px-4 py-12"><PageHeader title="Blog" eyebrow="Updates" /><Link href="/blog/why-audiobook-narrators-need-project-workspaces-not-more-spreadsheets"><Card><h2 className="font-bold">Why audiobook narrators need project workspaces, not more spreadsheets</h2></Card></Link></main></PublicShell>; }
