import { notFound } from "next/navigation";
import { Download, MailPlus } from "lucide-react";
import { PublicShell } from "@/components/public-shell";
import { Button, Card, Field, PageHeader } from "@/components/ui";
import { guides, templates } from "@/lib/marketing";

export function TemplatePage({ slug }: { slug: string }) {
  const template = templates.find((item) => item.slug === slug);
  if (!template) notFound();
  return (
    <PublicShell>
      <main className="mx-auto max-w-7xl px-4 py-12">
        <PageHeader title={template.title} eyebrow="Free template">
          {template.description}
        </PageHeader>
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] border-collapse text-left text-sm">
                <thead><tr>{template.columns.map((column) => <th className="border-b border-[#ddd4c4] p-3" key={column}>{column}</th>)}</tr></thead>
                <tbody>{["Sample row", "Author note", "Ready for project"].map((row, index) => <tr key={row}>{template.columns.map((column) => <td className="border-b border-[#eee8dc] p-3 text-[#596358]" key={column}>{index === 0 ? column : row}</td>)}</tr>)}</tbody>
              </table>
            </div>
          </Card>
          <Card>
            <h2 className="text-xl font-bold">Use this workflow</h2>
            <p className="mt-3 text-sm leading-6 text-[#596358]">{template.cta}</p>
            <form className="mt-5 grid gap-3">
              <Field label="Email for template" name="email" type="email" placeholder="narrator@example.com" />
              <Button type="submit"><Download size={16} /> Download CSV preview</Button>
            </form>
            <Button className="mt-3 w-full" href="/signup" variant="secondary"><MailPlus size={16} /> Create workspace</Button>
          </Card>
        </div>
      </main>
    </PublicShell>
  );
}

export function GuidePage({ slug }: { slug: string }) {
  const guide = guides.find((item) => item.slug === slug);
  if (!guide) notFound();
  return (
    <PublicShell>
      <main className="mx-auto max-w-4xl px-4 py-12">
        <PageHeader title={guide.title} eyebrow="Guide for ACX and audiobook narrators">{guide.description}</PageHeader>
        <Card>
          {["Capture all notes in one project record.", "Separate pronunciation questions from proofing comments.", "Convert approved proofing fixes into timestamped pickups.", "Review payment and rights reminders before delivery."].map((step, index) => (
            <div className="border-b border-[#eee8dc] py-5 last:border-0" key={step}>
              <p className="text-sm font-bold text-[#2f6f62]">Step {index + 1}</p>
              <h2 className="mt-1 text-xl font-bold">{step}</h2>
              <p className="mt-2 leading-7 text-[#596358]">This keeps author communication, proofer notes, retakes, and delivery administration out of scattered ACX messages and generic spreadsheets.</p>
            </div>
          ))}
          <Button href="/signup">Create a proofing checklist</Button>
        </Card>
      </main>
    </PublicShell>
  );
}
