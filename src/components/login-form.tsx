"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui";

export function LoginForm() {
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
    <form action={submit} className="grid gap-4">
      {params.get("created") ? <p className="rounded-md bg-[#dcebe3] p-3 text-sm text-[#1f5d52]">Account created. Sign in to open your workspace.</p> : null}
      {error ? <p className="rounded-md bg-[#f4dada] p-3 text-sm text-[#7b2b2b]">{error}</p> : null}
      <label className="grid gap-1.5 text-sm font-semibold">Email<input className="focus-ring h-10 rounded-md border border-[#cfc6b6] px-3" name="email" type="email" required /></label>
      <label className="grid gap-1.5 text-sm font-semibold">Password<input className="focus-ring h-10 rounded-md border border-[#cfc6b6] px-3" name="password" type="password" required /></label>
      <Button type="submit">Sign in</Button>
    </form>
  );
}
