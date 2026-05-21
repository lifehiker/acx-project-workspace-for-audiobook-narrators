# Forge Completion Audit

## Foundation And Data
- Next.js/Tailwind app: `src/app/layout.tsx`, `src/app/globals.css`, `next.config.ts`.
- SQLite Prisma schema: `prisma/schema.prisma`.
- Prisma runtime: `src/lib/db.ts`.
- Workspace auto-creation and permissions: `src/lib/workspace.ts`.

## Auth
- Credentials signup: `src/app/signup/page.tsx`, `src/actions/auth.ts`.
- Credentials login and optional Google OAuth: `src/app/login/page.tsx`, `src/components/login-form.tsx`, `src/app/api/auth/[...nextauth]/route.ts`, `src/lib/auth.ts`.
- Protected workspace routes: `src/app/(app)/layout.tsx`.

## Workspace Pages And Workflows
- Dashboard and reminders: `src/app/(app)/app/page.tsx`.
- Project list/filter/create/edit: `src/app/(app)/app/projects/page.tsx`, `src/app/(app)/app/projects/new/page.tsx`, `src/app/(app)/app/projects/[projectId]/page.tsx`, `src/actions/projects.ts`, `src/components/project-form.tsx`.
- Pronunciation CRUD/search/filter/intake link/export: `src/app/(app)/app/projects/[projectId]/pronunciations/page.tsx`, `src/actions/pronunciations.ts`, `src/app/api/projects/[projectId]/pronunciations/export/route.ts`.
- Public author intake: `src/app/intake/[token]/page.tsx`, `src/actions/pronunciations.ts`.
- Pickup tracker/export: `src/app/(app)/app/projects/[projectId]/pickups/page.tsx`, `src/actions/pickups.ts`, `src/app/api/projects/[projectId]/pickups/export/route.ts`.
- Proofing comments and convert-to-pickup: `src/app/(app)/app/projects/[projectId]/proofing/page.tsx`, `src/actions/proofing.ts`.
- Payment tracker and PFH calculation: `src/app/(app)/app/projects/[projectId]/payments/page.tsx`, `src/actions/payments.ts`.
- Royalty-share and rights tracker: `src/app/(app)/app/projects/[projectId]/royalties/page.tsx`, `src/actions/royalties.ts`.
- Collaboration invites: `src/actions/invites.ts`, project overview invite form.
- Billing and plan display: `src/app/(app)/app/settings/billing/page.tsx`, `src/lib/subscription.ts`.

## Integrations And Fallbacks
- Stripe checkout, portal, webhook: `src/app/api/stripe/checkout/route.ts`, `src/app/api/stripe/portal/route.ts`, `src/app/api/webhooks/stripe/route.ts`. All lazy-initialize Stripe only when credentials exist.
- Resend email: `src/lib/email.ts`. Resend is imported only inside `sendEmail` and logs safely without credentials.
- Reminder endpoint: `src/app/api/cron/reminders/route.ts`.
- Analytics fallback: `src/lib/analytics.ts`.

## Marketing And SEO
- Landing page: `src/app/page.tsx`.
- Pricing: `src/app/pricing/page.tsx`.
- Template index and six template pages: `src/app/templates/*`.
- Guide index and two guide pages: `src/app/guides/*`.
- Use-case pages: `src/app/use-cases/acx-narrator-workspace/page.tsx`, `src/app/use-cases/producer-narrator-workspace/page.tsx`.
- Software landing page: `src/app/software-for-audiobook-narration/page.tsx`.
- Founder note/blog: `src/app/blog/*`.
- Sitemap and robots: `src/app/sitemap.ts`, `src/app/robots.ts`.

## Deployment
- Standalone output: `next.config.ts`.
- Docker standalone runtime, SQLite schema initialization, and NextAuth URL/secret defaults: `Dockerfile`.
- Environment template: `.env.example`.

## External Credential Items
- Stripe live checkout and portal require Stripe keys and price IDs.
- Resend delivery requires a Resend API key and verified sender.
- Cron protection requires `CRON_SECRET` when an external scheduler is configured.
- Google OAuth requires `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and a configured callback URL.

The app still builds and runs without those credentials because all third-party SDKs are lazily initialized and guarded.
