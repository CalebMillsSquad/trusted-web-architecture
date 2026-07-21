# Active Mission

## Production readiness after launch

Keep the existing deployment safe, honest, observable, and ready for founder-approved provider connections. Provider-backed AI quota, durable lead storage/notifications, and calendar booking remain founder decisions.

Status: In progress — post-launch production readiness

## Mission Title

Founder-Approved Production Domain and Vercel Launch

## Objective

Publish the verified TRUSTed Digital Architecture website from `CalebMillsSquad/trusted-digital-architecture` to the existing Vercel project, activate the approved `digitalarchitecture.trusted-eco.org` subdomain without changing the root domain or unrelated DNS, configure the production OpenAI secret securely, and verify the complete public experience over HTTPS.

## Approved Scope

- Push the verified `main` branch to the existing GitHub repository.
- Preserve and use the existing Vercel project `trusted-digital-architecture` with the Next.js preset, repository root, and default output directory.
- Store `OPENAI_API_KEY` as a sensitive Production-only Vercel environment variable without displaying or committing it.
- Connect only `digitalarchitecture.trusted-eco.org` using the exact CNAME Vercel requires.
- Verify Vercel status, DNS validity, HTTPS, all public routes, desktop and mobile rendering, assistant behavior, API errors, console health, and secret safety.
- Keep lead submission disabled and appointment language non-confirming until real approved infrastructure exists.

## Preserved Boundaries

- The root domain `trusted-eco.org`, nameservers, Squarespace website records, Google Workspace records, and unrelated DNS remain unchanged.
- No domain transfer, Cloudflare, custom authentication, database, payment system, CRM, calendar, lead storage, or notification provider was added.
- No secret is stored in Git, documentation, browser code, or client assets.
- OpenAI quota failure is acceptable only because the assistant fails safely and visitors can continue the deterministic assessment.

## Acceptance Criteria

- [x] Lint, strict typecheck, all tests, secret scans, and production build pass.
- [x] `main` is pushed to `CalebMillsSquad/trusted-digital-architecture`.
- [x] Vercel is connected to the correct repository and branch with standard Next.js settings.
- [x] The production secret is saved securely and a fresh production deployment is Ready.
- [x] The exact Squarespace CNAME is saved without modifying unrelated records.
- [x] Vercel reports the custom domain as Valid Configuration.
- [x] HTTPS and all 28 public routes succeed at the production URL.
- [x] Desktop, mobile, assistant, error handling, console, and deployed secret-safety checks pass.
- [x] Deployment and repository documentation reflect the verified production state.
