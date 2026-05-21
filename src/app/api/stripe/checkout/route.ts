import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { track } from "@/lib/analytics";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.redirect(new URL("/login", request.url));
  const url = new URL(request.url);
  const plan = url.searchParams.get("plan") || "PRO";
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.redirect(new URL(`/app/settings/billing?stripe=missing&plan=${plan}`, request.url));
  }
  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const price = plan === "STUDIO" ? process.env.STRIPE_STUDIO_PRICE_ID : plan === "SOLO" ? process.env.STRIPE_SOLO_PRICE_ID : process.env.STRIPE_PRO_PRICE_ID;
  if (!price) return NextResponse.redirect(new URL("/app/settings/billing?price=missing", request.url));
  const checkout = await stripe.checkout.sessions.create({ mode: "subscription", line_items: [{ price, quantity: 1 }], success_url: `${url.origin}/app/settings/billing?checkout=success`, cancel_url: `${url.origin}/pricing` });
  track("checkout_completed", { plan });
  return NextResponse.redirect(checkout.url || "/app/settings/billing");
}
