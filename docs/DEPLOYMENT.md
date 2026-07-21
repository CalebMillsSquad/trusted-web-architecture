# Production Deployment

Last verified: 2026-07-21

## Production Identity

- GitHub repository: `https://github.com/CalebMillsSquad/trusted-digital-architecture`
- Production branch: `main`
- Vercel project: `trusted-digital-architecture`
- Production URL: `https://digitalarchitecture.trusted-eco.org`
- Vercel fallback URL: `https://trusted-digital-architecture.vercel.app`

## Vercel Configuration

- Framework preset: Next.js
- Root directory: repository root
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: Next.js default; no override
- Production deployment source: GitHub `main`
- Latest verified production commit: `c35d1d6c810693620ab18a04db4327e500e642d4`
- Latest verified Vercel deployment: `ABHmZcLxuNMopp71qfuQ2RFtCbi8` (Ready)
- `OPENAI_API_KEY`: sensitive, Production-only Vercel environment variable
- No lead, calendar, database, payment, authentication, or third-party notification environment variables are configured.

The local `.env.local` file is ignored and untracked. Never copy its contents into source control, logs, documentation, client code, or public browser assets.

## DNS Configuration

The root domain remains registered and managed at Squarespace. It was not transferred to Vercel, and its nameservers were not changed.

- Record type: CNAME
- Host/name: `digitalarchitecture`
- Target/value: `56546e7b60344d4f.vercel-dns-017.com`
- TTL: 4 hours / 14400 seconds

Only this custom record was added. Squarespace website records, `www`, Domain Connect, Google verification, Google Workspace MX, and all unrelated records were preserved.

## Release Workflow

1. Confirm the worktree and intended `main` commit.
2. Run `npm run lint`, `npm run typecheck`, `npm test`, secret scans, and `npm run build`.
3. Confirm `.next/routes-manifest.json` exists and no key pattern appears in `.next/static`.
4. Push `main`; the connected Vercel project deploys automatically.
5. Confirm the production deployment is Ready and references the intended commit.
6. Verify the custom domain, HTTPS, public routes, API error handling, responsive layouts, browser console, and deployed client secret scan.

## Verified Production Behavior

- All 28 public routes return HTTP 200 over the custom HTTPS domain.
- Malformed assistant, plan, and lead requests fail safely with HTTP 400.
- The production OpenAI secret is recognized server-side. Current provider quota returns the approved temporary-unavailability response with HTTP 503.
- The deterministic assessment remains usable during provider unavailability.
- Lead submission remains disabled because secure authoritative storage and confirmed email delivery are not implemented.
- No appointment is scheduled or confirmed because no calendar is connected.
- `/robots.txt` and `/sitemap.xml` return HTTP 200 and advertise the custom HTTPS origin.
- Production responses include `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, and `X-Frame-Options` headers.
- Vercel Web Analytics and Speed Insights remain intentionally disabled; no analytics or error-monitoring provider is configured.

## Operational Limitations

Resolve OpenAI quota before expecting free-form assistant replies. Approve estimator catalog values, founder photography, privacy/legal wording, lead storage, notification delivery, retention/recovery, and calendar rules before expanding production functionality.
