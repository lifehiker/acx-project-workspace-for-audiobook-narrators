import { ArrowRight, CheckCircle2, Clock, FileText, Mic2, ReceiptText } from "lucide-react";
import { PublicShell } from "@/components/public-shell";
import { Badge, Button, Card } from "@/components/ui";
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <PublicShell>
      <main>
        <section className="border-b border-[#ddd4c4] bg-[#17211b] text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-[1.1fr_0.9fr] md:py-20">
            <div>
              <Badge tone="amber">Built for audiobook narrators</Badge>
              <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">Run every audiobook project without another fragile spreadsheet.</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/72">Centralize pronunciation sheets, author intake, proofing comments, pickups, PFH payments, royalty-share terms, and rights reversion reminders across ACX, Findaway, and direct clients.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/signup">Start 14-day trial <ArrowRight size={16} /></Button>
                <Button href="/templates" variant="secondary">Browse free templates</Button>
              </div>
            </div>
            <div className="rounded-lg border border-white/15 bg-white/8 p-4">
              <div className="rounded-md bg-[#f7f4ee] p-4 text-[#17211b]">
                <div className="mb-4 flex items-center justify-between"><strong>Queen of Ashes</strong><Badge tone="amber">PICKUPS</Badge></div>
                {["Pronunciations pending: 7", "Open pickups: 12", "Invoice due: May 31", "Reversion reminder: Aug 15"].map((item) => (
                  <div className="mb-3 flex items-center gap-3 rounded-md border border-[#ddd4c4] bg-white p-3 text-sm" key={item}><CheckCircle2 className="text-[#1f5d52]" size={18} />{item}</div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="mx-auto grid max-w-7xl gap-4 px-4 py-12 md:grid-cols-4">
          {[
            [Mic2, "Pronunciation intake", "Give authors a public form and keep approvals beside the project."],
            [Clock, "Pickup tracking", "Track retakes by chapter, timestamp, status, source, and due date."],
            [FileText, "Proofing workflow", "Separate notes from pickups, then convert fixes when they are ready."],
            [ReceiptText, "Payment and rights", "Calculate PFH totals and surface invoice or reversion reminders."],
          ].map(([Icon, title, text]) => {
            const I = Icon as typeof Mic2;
            return <Card key={String(title)}><I className="mb-4 text-[#1f5d52]" /><h2 className="font-bold">{title as string}</h2><p className="mt-2 text-sm leading-6 text-[#596358]">{text as string}</p></Card>;
          })}
        </section>
      </main>
    </PublicShell>
  );
}
