# Execution Plan

Last updated: 2026-07-19

## Active Mission

Public Website Production Readiness and Founder Review

## Repository Observations

- The approved public information architecture is implemented through a Next.js 15 App Router catch-all route backed by typed content.
- The homepage is a focused client component because its architecture panel is interactive; internal pages render from reusable server components.
- The site has a dedicated local port, guarded Windows launchers, tests, lint, typecheck, build scripts, GitHub history, and a verified Vercel production deployment.
- The initial production-readiness audit identified duplicated internal-page metadata titles, no skip link or current-page navigation state, non-strict TypeScript configuration, and an overlap between mobile architecture controls and the active-layer detail.

## Implementation Sequence

1. Normalize `AGENTS.md`, `MISSION.md`, `PROJECT_STATUS.md`, `BACKLOG.md`, `DECISIONS.md`, and `README.md`.
2. Add accessible skip navigation and current-page semantics without replacing the established site shell.
3. Make internal-page metadata unique and enable strict TypeScript validation.
4. Repair mobile architecture-panel spacing and strengthen focus/reflow styles.
5. Expand automated content and route contracts.
6. Run lint, typecheck, tests, build, full-route HTTP smoke tests, and responsive browser checks.
7. Reconcile documentation and prepare the founder-review checklist.

## Dependencies

- Existing Next.js, React, TypeScript, ESLint, and Vitest toolchain
- Local Node.js/npm installation
- Port `3023` remaining available to this project
- No new runtime dependency or external service is required

## Risks

- CSS is compact and shared across many pages; responsive changes require representative visual checks.
- The full homepage is long, so mobile changes must avoid unnecessary additional height while preserving control separation.
- Vercel automatically deploys pushed `main` commits; production publication remains a separate founder-approved action.
- Legal and secure-intake decisions remain outside this mission.

## Validation Plan

- Static checks: lint, strict typecheck, tests, production build
- HTTP checks: homepage plus every key in the typed route registry
- Accessibility checks: landmarks, one H1, skip-link target, current-page state, button keyboard behavior, visible focus
- Responsive checks: 390px mobile, 768px tablet, and 1440px desktop, including document overflow and architecture-panel geometry
- Reliability checks: browser console errors and internal route navigation

## Progress Checklist

- [x] Audit repository structure, documents, configuration, scripts, launchers, and current state
- [x] Select the largest coherent unblocked mission
- [x] Normalize the six root operating files
- [x] Implement accessibility and metadata refinements
- [x] Repair responsive defects
- [x] Expand regression tests
- [x] Pass automated validation
- [x] Pass full-route and responsive browser checks
- [x] Reconcile final status and founder-review notes

## Discovered Issues

- Resolved: internal route metadata now uses a unique descriptive title, with concise service metadata where appropriate.
- Resolved: repeated navigation can be skipped directly to `#main-content`.
- Resolved: navigation exposes the current route with `aria-current="page"`.
- Resolved: architecture-layer controls and the active detail no longer overlap at mobile or tablet widths.
- Resolved: TypeScript strict mode is enabled and passing.
- Monitored: two moderate transitive PostCSS advisories have no safe automated fix in the current compatible Next.js line.

## Decisions Needed

Founder visual and copy feedback is the next required input. Secure intake, legal review, analytics, live integrations, and production publication remain separate founder-level decisions.
