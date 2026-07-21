# Lead Intake and Email Handoff

The review form collects name, business name, email, optional phone, and two explicit consents after a blueprint exists. All values are validated and sanitized on the server. A hidden honeypot rejects automated submissions, and accepted consent is tagged with the current public-intake version and timestamp in the request boundary. Contact information must never enter URLs, analytics, public logs, Git, source documentation, or the Codex-ready export.

There is no approved database or email provider. Production submission therefore fails safely with a direct, subject-only email fallback. `AI_LEAD_TEST_MODE=true` enables a local-only mock that returns a generated lead ID, `NEW` status, explicit `mock_confirmed` email status, and a sanitized in-memory Codex brief. It sends no email and writes no file.

Production requires secure server-side storage as the authoritative record, a provider-confirmed notification adapter, retention and deletion rules, operational retry/recovery, access controls, and privacy review. Email must never be the sole authoritative record. Until those are approved and configured, the route returns `storage_unavailable` and `emailStatus: not_attempted`; it does not claim that a lead was accepted or retained.
