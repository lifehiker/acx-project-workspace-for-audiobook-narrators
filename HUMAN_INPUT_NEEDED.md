# Human Input Needed

The app runs locally and in Docker without these credentials. Provide them only to enable production integrations.

## Stripe

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SOLO_PRICE_ID`
- `STRIPE_PRO_PRICE_ID`
- `STRIPE_STUDIO_PRICE_ID`

Create Solo, Pro, and Studio subscription prices in Stripe, then add the IDs to the deployment environment.

## Resend

- `RESEND_API_KEY`
- `EMAIL_FROM`

Verify the sending domain in Resend and set `EMAIL_FROM` to an approved sender.

## Production Auth

- `AUTH_SECRET`
- `NEXTAUTH_URL`

Generate `AUTH_SECRET` with `openssl rand -base64 32` and set `NEXTAUTH_URL` to the production site URL.

## Cron

- `CRON_SECRET`

Set this if the reminder endpoint will be called by Coolify cron or an external scheduler.
