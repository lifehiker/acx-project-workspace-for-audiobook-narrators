import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.redirect(new URL("/login", request.url));
  if (!process.env.STRIPE_SECRET_KEY) return NextResponse.redirect(new URL("/app/settings/billing?stripe=missing", request.url));
  return NextResponse.redirect(new URL("/app/settings/billing?portal=configure-customer", request.url));
}
