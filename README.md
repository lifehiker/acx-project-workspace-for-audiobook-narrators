# ACX Project Workspace for Audiobook Narrators

Responsive Next.js SaaS workspace for freelance audiobook narrators and producer-narrators managing ACX, Findaway, and direct author projects.

## Stack

- Next.js App Router + TypeScript + Tailwind CSS
- Prisma + SQLite for zero-config persistence
- NextAuth Credentials auth with bcrypt password hashing
- Guarded Stripe and Resend integrations with safe local fallbacks

## Local Setup

```bash
npm install
cp .env.example .env.local
npx prisma db push
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run lint
npm run build
```

## Deployment Notes

The app is configured with `output: "standalone"` for Docker/Coolify. It runs with no external credentials. Stripe checkout, Stripe portal, Stripe webhooks, and Resend email paths skip gracefully until credentials are provided.
