# TRUSTed Digital Architecture

Public marketing website for TRUSTed Digital Architecture, a founder-led digital architecture and software development firm. The site presents website architecture, custom software, AI-system planning, automation, integrations, learning platforms, and connected business systems without claiming unfinished products or integrations are live.

## Maturity

TRUSTed AI Business Architect local review phase. The approved public information architecture now includes a structured, industry-aware business assessment, blueprint, controlled preliminary estimator, and safe human-review handoff.

## Technology

- Next.js 15 App Router
- React 19
- TypeScript
- CSS visual system with no runtime UI dependency
- ESLint and Next.js Core Web Vitals rules
- Vitest content and route contracts
- OpenAI Responses API through the official server-side Node SDK
- Vercel deployment using standard Next.js output

## Requirements

- Node.js 20 or another Next.js 15-compatible supported Node.js release
- npm
- Port `3023` available for local development

The website requires no database. Free-form AI questions require `OPENAI_API_KEY` in ignored `.env.local`; the guided assessment, blueprint, and estimator are deterministic. Copy `.env.example` to `.env.local` and supply secrets securely; never commit or expose them to browser code.

## Install and run

```bash
npm install
npm run dev
```

Open `http://localhost:3023`.

On Windows, double-click `START_APP.bat`. The launcher opens this repository, checks that dependencies exist, refuses to stop a conflicting process, starts the development server on port `3023`, verifies the responding TRUSTed site, and opens the local URL. `STOP_APP.bat` stops only a Next.js process verified to belong to this repository.

## Commands

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm start
```

`npm start` serves the production build on port `3023`.

## Public routes

- `/`
- `/services` plus nine service detail pages
- `/solutions` plus eight solution detail pages
- `/products`
- `/industries`
- `/process`
- `/about`
- `/contact`
- `/website-audit`
- `/privacy`
- `/terms`

Contact and website-audit forms are explicitly non-functional previews. Authentication, databases, payments, uploads, backend services, and live external integrations are outside the current product boundary.

## TRUSTed AI Business Architect

The site-wide virtual architect begins with the visitor’s business type and progressively records business stage, offering, current systems, an industry-specific operations branch, pain points, goals, public website status, considered capabilities, budget, and timeline. Structured choices are local; free-form questions call `/api/assistant` once and receive a strict server-validated response grounded in relevant repository knowledge.

Non-contact assessment state and recent display messages use session storage for same-tab navigation continuity. Contact fields are not persisted in the browser. Free-form messages are sent to OpenAI with application storage disabled, so visitors are instructed not to submit sensitive or confidential information. No appointment, project acceptance, price, or email delivery is confirmed without a human response.

`/api/architect/plan` generates the blueprint and estimate from deterministic rules. The draft rates in `lib/business-architect-server.ts` are not approved for production. `/api/architect/lead` is disabled unless local test mode is explicitly enabled; it stores nothing and sends no email.

For a future production activation, first approve quota, rates, portrait, privacy/legal language, secure lead storage, notification provider, retention/recovery, and the separate deployment decision. The local `.env.local` file is never deployed by source control.

## Repository structure

- `app/` — App Router layout, homepage, catch-all public route, and styles
- `components/` — shared site shell, editorial renderer, and virtual business architect
- `knowledge/` — controlled repository-local company and industry knowledge
- `lib/business-architect-*.ts` — typed assessment, recommendations, blueprint, estimator, lead validation, and usage controls
- `lib/site-content.ts` — centralized typed navigation and page content
- `tests/` — route and content regression tests
- `docs/` — founder specification, execution plan, audit, architecture, assessment, estimator, lead, export, privacy, portrait, and Project Meter notes
- `AGENTS.md` — permanent autonomous operating contract
- `MISSION.md` — one active product-quality mission
- `PROJECT_STATUS.md` — current verified state
- `BACKLOG.md` — ordered roadmap
- `DECISIONS.md` — founder-approved decisions

## Operating workflow

Future sessions begin by reading `AGENTS.md`, `PROJECT_STATUS.md`, `MISSION.md`, `DECISIONS.md`, `BACKLOG.md`, `README.md`, and the relevant specification. `docs/EXECUTION_PLAN.md` tracks substantial work within the active mission. Saying “Continue working” resumes the next incomplete milestone without requiring the founder to select routine implementation tasks.

## Deployment

Vercel uses the repository root, Next.js framework preset, `npm install`, `npm run build`, and the default `.next` output directory. No environment variables or custom-domain changes are configured by this repository.

- GitHub: `https://github.com/CalebMillsSquad/trusted-digital-architecture`
- Production: `https://trusted-digital-architecture.vercel.app`
