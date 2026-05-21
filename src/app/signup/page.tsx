import Link from "next/link";
import { signupAction } from "@/actions/auth";
import { Button, Card, Field, PageHeader } from "@/components/ui";

export const metadata = {
  title: "Signup | ACX Project Workspace",
  description: "Create a 14-day trial workspace for audiobook production administration.",
};

export default function SignupPage() {
  return (
    <main className="mx-auto grid min-h-screen w-full max-w-md place-items-center p-6">
      <div className="w-full">
        <PageHeader title="Start your trial" eyebrow="No credit card required">
          Create a secure local workspace account. External billing can be connected later.
        </PageHeader>
        <Card>
          <form action={signupAction.bind(null, null)} className="grid gap-4">
            <Field label="Name" name="name" required />
            <Field label="Email" name="email" type="email" required />
            <Field label="Password" name="password" type="password" required />
            <Button type="submit">Create workspace</Button>
          </form>
          <p className="mt-4 text-sm text-[#596358]">Already have an account? <Link className="font-semibold text-[#1f5d52]" href="/login">Sign in</Link>.</p>
        </Card>
      </div>
    </main>
  );
}
