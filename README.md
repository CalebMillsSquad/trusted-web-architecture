# TRUSTed Digital Architecture

Public marketing website for TRUSTed Digital Architecture, a founder-led digital architecture and software development firm. The site presents website architecture, custom software, AI-system planning, automation, integrations, learning platforms, and connected business systems without claiming unfinished products or integrations are live.

## Maturity

Production-readiness and founder-review phase. The approved public information architecture is implemented; accessibility, responsive, and release validation are the active mission.

## Technology

- Next.js 15 App Router
- React 19
- TypeScript
- CSS visual system with no runtime UI dependency
- ESLint and Next.js Core Web Vitals rules
- Vitest content and route contracts
- Vercel deployment using standard Next.js output

## Requirements

- Node.js 20 or another Next.js 15-compatible supported Node.js release
- npm
- Port `3023` available for local development

No environment variables, database, external AI provider, or API key is required.

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

## Repository structure

- `app/` — App Router layout, homepage, catch-all public route, and styles
- `components/` — shared site shell and editorial page renderer
- `lib/site-content.ts` — centralized typed navigation and page content
- `tests/` — route and content regression tests
- `docs/` — founder-approved specification and living execution plan
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
