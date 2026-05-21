import Link from "next/link";
import { Suspense } from "react";
import { Card, PageHeader } from "@/components/ui";
import { LoginForm } from "@/components/login-form";

export const metadata = {
  title: "Login | ACX Project Workspace",
  description: "Sign in to your audiobook narrator project workspace.",
};

export default function LoginPage() {
  return (
    <main className="mx-auto grid min-h-screen w-full max-w-md place-items-center p-6">
      <div className="w-full">
        <PageHeader title="Sign in" eyebrow="Workspace access">
          Open your narrator workspace for projects, pickups, payments, and author intake.
        </PageHeader>
        <Card>
          <Suspense fallback={<p className="text-sm text-[#596358]">Loading sign in form...</p>}>
            <LoginForm />
          </Suspense>
          <p className="mt-4 text-sm text-[#596358]">No account yet? <Link className="font-semibold text-[#1f5d52]" href="/signup">Start a 14-day trial</Link>.</p>
        </Card>
      </div>
    </main>
  );
}
