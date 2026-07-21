# Future TRUSTed Project Meter

This document defines an integration boundary only; no internal administration application is added.

## Proposed records

- `Project`: approved project identifier, client reference, status, estimate version, commercial terms reference.
- `WorkEvent`: category, actor type, started/ended timestamps, machine elapsed time, human active time, equivalent production effort, approved billable time, evidence reference, notes.
- `CostEvent`: provider/category, quantity, unit, external amount, currency, verified source, approval state.
- `ScopeEvent`: requested change, impact, founder decision, estimate delta, approved date.
- `VerificationEvent`: command or review type, result, commit, files, tests, build result.
- `CommercialReview`: estimate versus actual, approved billable work, external costs, commercial value, margin, billing recommendation, founder decision.

Machine execution time is never automatically billable. Human active time, equivalent production effort, approved billable work, commercial value, and external costs remain distinct. Future ingestion should use authenticated, append-only server events and opaque project IDs; this public website has no write access.
