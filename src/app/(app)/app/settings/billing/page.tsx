import { Button, Card, PageHeader } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { ensureWorkspace } from "@/lib/workspace";

export const dynamic = "force-dynamic";

export default async function BillingPage() {
  const user = await requireUser();
  const workspace = await ensureWorkspace(user.id);
  return <><PageHeader title="Billing" eyebrow="Subscription" /><Card><p className="text-sm text-[#596358]">Current plan</p><p className="mt-2 text-3xl font-bold">{workspace.subscription?.plan ?? "SOLO"}</p><p className="mt-4 text-[#596358]">Stripe checkout and billing portal routes are guarded. Without Stripe credentials, the app shows upgrade prompts and keeps the workspace usable.</p><div className="mt-5 flex gap-3"><Button href="/api/stripe/checkout?plan=PRO">Upgrade to Pro</Button><Button href="/api/stripe/portal" variant="secondary">Billing portal</Button></div></Card></>;
}
