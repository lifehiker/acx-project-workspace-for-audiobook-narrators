import { notFound } from "next/navigation";
import { submitIntakeAction } from "@/actions/pronunciations";
import { PublicShell } from "@/components/public-shell";
import { Button, Card, Field, PageHeader, Textarea } from "@/components/ui";
import { prisma } from "@/lib/db";

export default async function IntakePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const link = await prisma.authorIntakeLink.findUnique({ where: { token }, include: { project: true } });
  if (!link?.active) notFound();
  return <PublicShell><main className="mx-auto max-w-2xl px-4 py-12"><PageHeader title={`Pronunciation notes for ${link.project.title}`} eyebrow="Author intake">Submit names, terms, pronunciations, and context without logging in.</PageHeader><Card><form action={submitIntakeAction.bind(null, token, null)} className="grid gap-4"><Field label="Your name or email" name="submittedBy" /><Field label="Author email" name="authorEmail" type="email" /><Field label="Term/name" name="term" required /><Field label="Pronunciation" name="pronunciation" required /><Textarea label="Context" name="context" /><Field label="Audio link" name="audioUrl" /><Button type="submit">Submit pronunciation</Button></form></Card></main></PublicShell>;
}
