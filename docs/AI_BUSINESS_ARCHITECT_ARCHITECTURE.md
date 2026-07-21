# AI Business Architect Architecture

The virtual architect is mounted in the root layout and therefore appears on every public route. Common choices are deterministic React state transitions; only the free-form question form calls `/api/assistant`. Non-contact assessment state and recent display messages are saved in `sessionStorage` for same-tab navigation continuity. Contact fields are never persisted in the browser.

`/api/assistant` validates bounded messages and a pseudonymous session ID, applies feature flags, session/IP/cooldown controls, loads only common knowledge plus the selected industry file, and makes one Responses API request. The response uses strict JSON Schema and is validated again before returning to the browser. The key remains server-only, `store` is false, and errors are mapped to safe public messages.

The deterministic `/api/architect/plan` route generates the blueprint and estimate without an OpenAI call. `/api/architect/lead` is disabled unless local test mode is explicitly enabled; it does not store data or send email.

Disable AI chat with `AI_PUBLIC_CHAT_ENABLED=false`, the guided assessment with `AI_BUSINESS_ASSESSMENT_ENABLED=false`, or the estimator with `AI_ESTIMATOR_ENABLED=false`.
