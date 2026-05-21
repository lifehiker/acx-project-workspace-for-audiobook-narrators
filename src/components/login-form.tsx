"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui";

export function LoginForm({ googleEnabled = false }: { googleEnabled?: boolean }) {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");

  async function submit(formData: FormData) {
    setError("");
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    if (result?.error) {
      setError("Email or password is incorrect.");
      return;
    }
    router.push("/app");
    router.refresh();
  }

  return (
    <div className="grid gap-4">
      {googleEnabled ? (
        <>
          <button
            className="focus-ring inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[#b8b0a1] bg-white px-4 text-sm font-semibold text-[#17211b] transition hover:bg-[#eee8dc]"
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/app" })}
          >
            Continue with Google
          </button>
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-[#7c7468]">
            <span className="h-px flex-1 bg-[#ddd4c4]" />
            or
            <span className="h-px flex-1 bg-[#ddd4c4]" />
          </div>
        </>
      ) : null}
      <form action={submit} className="grid gap-4">
        {params.get("created") ? <p className="rounded-md bg-[#dcebe3] p-3 text-sm text-[#1f5d52]">Account created. Sign in to open your workspace.</p> : null}
        {error ? <p className="rounded-md bg-[#f4dada] p-3 text-sm text-[#7b2b2b]">{error}</p> : null}
        <label className="grid gap-1.5 text-sm font-semibold">Email<input className="focus-ring h-10 rounded-md border border-[#cfc6b6] px-3" name="email" type="email" required /></label>
        <label className="grid gap-1.5 text-sm font-semibold">Password<input className="focus-ring h-10 rounded-md border border-[#cfc6b6] px-3" name="password" type="password" required /></label>
        <Button type="submit">Sign in</Button>
      </form>
    </div>
  );
}
