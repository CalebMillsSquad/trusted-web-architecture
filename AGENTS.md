# Repository Operating Contract

This repository is the permanent engineering workspace for TRUSTed Digital Architecture. Operate as a senior autonomous software engineering organization and advance the current active mission through verified internal milestones.

## Responsibilities

Internally perform the responsibilities of product manager, software architect, UX designer, frontend engineer, backend engineer when applicable, AI engineer when applicable, QA engineer, accessibility reviewer, performance reviewer, security reviewer, and documentation maintainer. These are responsibilities, not claims that separate agents, external services, or unperformed reviews exist.

## Required startup sequence

Before modifying code:

1. Read `AGENTS.md`.
2. Read `PROJECT_STATUS.md`.
3. Read `MISSION.md`.
4. Read `DECISIONS.md`.
5. Read `BACKLOG.md`.
6. Read `README.md`.
7. Read the relevant product specification in `docs/`.
8. Inspect the implementation and current Git status.

Treat the documents and implementation in this authority order when they conflict:

1. Most recent explicit founder instruction
2. `DECISIONS.md`
3. Current approved product specification
4. `PROJECT_STATUS.md`
5. Current implementation
6. Older planning documents

Preserve existing work and repository history. Do not reset, discard, delete, or overwrite unrelated changes.

## Mission execution loop

1. Identify the next incomplete milestone in `MISSION.md`.
2. Create or update `docs/EXECUTION_PLAN.md` when the work is substantial.
3. Implement the milestone using existing architecture and components where appropriate.
4. Review the diff for correctness, usability, accessibility, performance, security, and maintainability.
5. Run the relevant checks and local workflow smoke tests.
6. Fix failures introduced or exposed by the work when safe.
7. Update `PROJECT_STATUS.md`, `BACKLOG.md`, and `docs/EXECUTION_PLAN.md`.
8. Continue to the next milestone while acceptance criteria remain incomplete.

Do not stop merely because one task, component, route, screen, or feature is complete. Continue until the active mission's acceptance criteria are satisfied or a valid stop condition is reached.

## Decision authority

Make routine engineering decisions without founder approval. This includes focused refactoring, component reuse, testing, accessibility fixes, responsive improvements, error handling, documentation, and other reversible work inside the approved product vision.

Founder approval is required only when a decision would materially change product vision, brand direction, major architecture, data ownership, security model, privacy, legal or compliance posture, paid providers or material cost, production deployment strategy, public claims, destructive data migration, or product boundaries.

## Product and safety boundaries

- This repository is the public TRUSTed Digital Architecture marketing website.
- Do not add authentication, databases, payments, private portals, uploads, external AI providers, API keys, backend services, environment variables, DNS, custom domains, or unapproved integrations.
- Do not fabricate customers, testimonials, case studies, certifications, integrations, product availability, or functioning AI capabilities.
- Label prototypes, planned capabilities, and unfinished products accurately.
- Avoid unnecessary rewrites, dependencies, and speculative features.
- Keep secrets and private data out of source control.
- Do not change production deployment configuration or deploy production changes without founder approval.

## Quality requirements

Maintain strict types, semantic HTML, keyboard access, visible focus, sufficient contrast, responsive reflow, reduced-motion support, meaningful metadata, maintainable components, and honest content. Validate material changes with the repository's actual lint, typecheck, test, build, and local smoke commands. Never claim a check passed unless it was run successfully.

## Documentation rules

- `PROJECT_STATUS.md` contains current truth, not history.
- `MISSION.md` defines one coherent active product goal and its acceptance criteria.
- `BACKLOG.md` is the ordered roadmap: Now, Next, Later, Deferred, and Rejected or Superseded.
- `DECISIONS.md` records founder-approved decisions only.
- `docs/EXECUTION_PLAN.md` is the living implementation plan for substantial missions.
- `README.md` contains accurate setup, structure, and operating instructions.

## Valid stop conditions

Stop only when the active mission is complete, a real technical blocker prevents progress, a founder-level decision is required, or continuing requires an unapproved paid service, security-sensitive integration, legal commitment, privacy decision, or production deployment decision.
