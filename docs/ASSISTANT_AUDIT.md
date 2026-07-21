# Existing Assistant Audit and Gap Analysis

Last updated: 2026-07-21

## Verified Existing Foundation

- **UI:** Site-wide fixed launcher with an accessible dialog, message history, loading and error states, suggested prompts, keyboard-operable controls, mobile reflow, and reduced-motion handling.
- **Opening and flow:** A general welcome followed by free-form questions. It does not begin with the required business-type question and has no progressive business-assessment state.
- **Model:** OpenAI Responses API using `gpt-5.6-terra`, one request for each submitted free-text message, `store: false`, bounded output, and a server-only key.
- **Grounding:** One generated system prompt assembled from centralized public site content. It includes service, product, process, appointment, unsupported-claim, and sensitive-information guardrails.
- **History:** The client sends the last ten messages. History is held only in React memory and is lost on internal navigation.
- **Controls:** Request-size validation, message validation, instance-local ten-minute IP rate limiting, pseudonymous safety identifiers, safe missing-key, quota, rate-limit, and provider errors.
- **Handoff:** A pre-addressed email link with clear language that appointments are not confirmed until a human responds.
- **Storage and leads:** No database, lead record, structured lead fields, submission workflow, email-provider confirmation, or Codex intake export.
- **Testing:** Request parsing, core prompt guardrails, route content, and public-route coverage. No business-assessment, estimator, lead, persistence, or structured-output coverage.
- **Privacy:** Conversations are sent to OpenAI and not stored by the website. The current privacy notice accurately warns visitors not to enter sensitive or confidential information.

## Mission Gaps

1. Replace the general opening with the exact required business-type question and a locally handled progressive assessment.
2. Add typed, configuration-driven business stages, industries, systems, pain points, goals, industry follow-ups, and solution mapping.
3. Preserve structured answers separately from chat prose and restore non-contact assessment state from session storage across internal navigation.
4. Add a server-validated structured model response with approved enumerations and relevant local knowledge retrieval.
5. Add URL normalization and a clearly limited Preliminary Public Website Assessment without unrestricted browsing or invented findings.
6. Generate a fact-linked Digital Business Blueprint and a deterministic preliminary estimate from one server-controlled catalog.
7. Add a portrait-ready virtual architect presentation and the required non-live-video disclosure without inventing the founder's likeness.
8. Add validated local/mock lead submission, duplicate protection, provider-confirmed email status semantics, and no persistent personal-data storage.
9. Generate a sanitized Codex-ready intake brief that defaults to `NEW — FOUNDER REVIEW REQUIRED` and cannot authorize work.
10. Make usage limits environment-configurable, enforce session/IP/cooldown/timeout flags server-side, and expand automated coverage to every founder-required behavior.

## Preservation Decisions

- Keep the existing Next.js App Router, official OpenAI SDK, `/api/assistant` boundary, server-only secret, `store: false`, safe errors, route-wide mounting, email fallback, visual design tokens, and appointment limitation.
- Do not add a database, external email provider, calendar, CRM, paid vector store, research browser, voice, animated likeness, authentication, or production deployment.
- Use deterministic local controls for common choices and reserve one model call for genuinely free-form interpretation.
- Keep contact information out of session storage, Git, URLs, logs, and Codex export.
