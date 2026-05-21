# FORGE PRD Tasks

## Foundation
- [x] Initialize Next.js 15+ App Router with TypeScript and Tailwind.
- [x] Install dependencies for Prisma, NextAuth Credentials auth, guarded Stripe/Resend, forms, validation, dates, IDs, and icons.
- [x] Configure `next.config.ts` with `output: "standalone"`.
- [x] Replace starter UI with narrator workspace visual system and responsive layouts.
- [x] Add README, `.env.example`, Dockerfile, and deploy notes.

## Data Model
- [x] Configure Prisma with SQLite for zero-config local/Coolify deployment.
- [x] Model users, auth compatibility tables, workspaces, memberships, subscriptions, projects, pronunciation entries, pickups, proofing comments, payment records, royalty records, invites, and intake links.
- [x] Generate Prisma client and push schema locally.
- [x] Auto-create a workspace and 14-day trial subscription for first-time users.

## Auth
- [x] Implement Credentials signup/login with bcryptjs and JWT sessions.
- [x] Add protected authenticated app layout.
- [x] Keep marketing, pricing, SEO, intake, login, and signup routes public.
- [x] Add safe missing-env behavior for auth secret in development/build.

## User-Facing App Pages
- [x] `/app` dashboard with project metrics, reminders, and status overview.
- [x] `/app/projects` project list with filtering.
- [x] `/app/projects/new` project creation.
- [x] `/app/projects/[projectId]` project overview and metadata editing.
- [x] Project pronunciation sheet page with add/search/filter, intake link, CSV export.
- [x] Project pickups page with add/statuses and CSV export.
- [x] Project proofing page with add and convert-to-pickup.
- [x] Project payments page with PFH calculation and status tracking.
- [x] Project royalties page with rights/reversion reminder tracking.
- [x] Billing/settings page with current plan, limits, checkout/portal fallback.

## API Routes And Server Actions
- [x] `src/actions/projects.ts` with validation, auth, permission checks, and Solo project limit.
- [x] `src/actions/pronunciations.ts` with add/intake-link/intake submission actions.
- [x] `src/actions/pickups.ts` with add action.
- [x] `src/actions/proofing.ts` with create and convert-to-pickup.
- [x] `src/actions/payments.ts` with update and PFH totals.
- [x] `src/actions/royalties.ts` with update.
- [x] `src/actions/invites.ts` with role validation and guarded email sending.
- [x] Intake submission route for unauthenticated authors.
- [x] CSV export API routes with permission checks.
- [x] Stripe checkout, portal, and webhook routes with no-credential fallbacks.
- [x] Cron reminders route protected by `CRON_SECRET` when set.

## Core Workflows
- [x] Account signup/login creates user workspace and trial subscription.
- [x] Create/edit/list/filter audiobook projects.
- [x] Add/search/filter/export pronunciation entries.
- [x] Generate and use public author pronunciation intake link.
- [x] Add/export pickup and retake items.
- [x] Add proofing comments and convert them into pickups.
- [x] Track payment fields and calculate PFH totals.
- [x] Track royalty-share terms, rights reversion dates, and reminders.
- [x] Invite collaborators with Owner/Collaborator/Read-only roles.
- [x] Enforce Solo/Pro/Studio feature gates with graceful upgrade prompts.

## Integrations And Fallbacks
- [x] Stripe subscription checkout/portal/webhook lazy-initialized inside handlers.
- [x] Resend transactional emails lazy-initialized inside functions.
- [x] Analytics wrapper for required events with console/local fallback.
- [x] `HUMAN_INPUT_NEEDED.md` documents only external credential setup.

## Marketing, SEO, And Public Pages
- [x] `/` SaaS landing page.
- [x] `/pricing`.
- [x] `/templates` index.
- [x] Six required template pages.
- [x] `/guides` index and two required guide pages.
- [x] `/use-cases/acx-narrator-workspace`.
- [x] `/use-cases/producer-narrator-workspace`.
- [x] Software for audiobook narration landing page.
- [x] Blog founder note.
- [x] Metadata, sitemap, robots, template download/email capture CTAs.

## Deployment
- [x] Production-ready Dockerfile using standalone output and existing directories only.
- [x] `.env.example` includes used variables.
- [x] No `next/font/google` or build-time network resources.
- [x] Third-party SDK clients are not initialized at module scope.

## Verification
- [x] Run lint.
- [x] Run Prisma generate/db push.
- [x] Run `npm run build` and fix all errors.
- [x] Start dev server.
- [x] Smoke-test primary public and app routes.
- [x] Review UI visually with Playwright desktop/mobile route rendering.
- [x] Test interactive login/navigation and authenticated dashboard route.
- [ ] Build Docker image if Docker is available. Blocked: Docker CLI exists, but `/var/run/docker.sock` access is denied in this environment.
- [x] Create `FORGE_COMPLETION_AUDIT.md`.
