import { createHash, randomUUID } from "node:crypto";
import type { AssessmentState, DigitalBlueprint, PreliminaryEstimate, Recommendation } from "./business-architect-core";
import { ESTIMATE_DISCLOSURE, generateBlueprint } from "./business-architect-core";

export const RATE_CATALOG = {
  version: "2026-07-local-draft",
  founderApprovedForProduction: false,
  hourlyRate: 145,
  projectManagementRate: 0.12,
  qualityRate: 0.15,
  uncertaintyRate: 0.12,
  integrationRiskRate: 0.1,
  marginRate: 0.12,
  minimumImplementation: 3500,
  maintenanceHourlyRate: 125,
  solutions: {
    website_architecture: { hours: [45, 100], maintenance: [2, 6] },
    grounded_ai_assistant: { hours: [50, 115], maintenance: [3, 10] },
    custom_software: { hours: [140, 360], maintenance: [8, 25] },
    dashboard: { hours: [70, 170], maintenance: [4, 12] },
    command_center: { hours: [130, 320], maintenance: [8, 24] },
    api_integration: { hours: [45, 140], maintenance: [3, 12] },
    automation: { hours: [35, 100], maintenance: [2, 8] },
    employee_onboarding: { hours: [60, 150], maintenance: [3, 10] },
    ai_instructor: { hours: [90, 220], maintenance: [5, 16] },
  },
} as const;

export const LEAD_STATUSES = ["NEW", "UNDER_REVIEW", "DISCOVERY_REQUIRED", "APPROVED_FOR_PROPOSAL", "PROPOSAL_SENT", "APPROVED_FOR_BUILD", "DECLINED", "ARCHIVED"] as const;

const roundMoney = (value: number) => Math.ceil(value / 500) * 500;

export function calculateEstimate(recommendations: Recommendation[]): PreliminaryEstimate {
  const core = recommendations.filter((item) => item.scope === "Core");
  const included = core.length ? core : recommendations.slice(0, 1);
  const optional = recommendations.filter((item) => !included.includes(item));
  const sum = (index: 0 | 1) => included.reduce((total, item) => total + RATE_CATALOG.solutions[item.id].hours[index], 0);
  const lowHours = sum(0); const highHours = sum(1);
  const multiplier = 1 + RATE_CATALOG.projectManagementRate + RATE_CATALOG.qualityRate + RATE_CATALOG.uncertaintyRate + (included.some((item) => item.id === "api_integration") ? RATE_CATALOG.integrationRiskRate : 0) + RATE_CATALOG.marginRate;
  const low = Math.max(RATE_CATALOG.minimumImplementation, roundMoney(lowHours * RATE_CATALOG.hourlyRate * multiplier));
  const high = Math.max(low, roundMoney(highHours * RATE_CATALOG.hourlyRate * multiplier));
  const maintenanceLow = included.reduce((total, item) => total + RATE_CATALOG.solutions[item.id].maintenance[0], 0) * RATE_CATALOG.maintenanceHourlyRate;
  const maintenanceHigh = included.reduce((total, item) => total + RATE_CATALOG.solutions[item.id].maintenance[1], 0) * RATE_CATALOG.maintenanceHourlyRate;
  return {
    title: "Preliminary Implementation Estimate",
    recommendedSolution: included.map((item) => item.name).join(" + "),
    includedCapabilities: included.map((item) => item.name), optionalCapabilities: optional.map((item) => item.name),
    effortHours: { low: lowHours, high: highHours }, implementationRange: { low, high, currency: "USD" },
    maintenanceRange: { low: maintenanceLow, high: maintenanceHigh, cadence: "monthly" },
    ongoingOperatingCosts: ["Third-party subscriptions, API usage, hosting, licenses, and transaction fees are excluded until verified."],
    assumptions: ["Local draft rate catalog; founder approval is required before production use.", "One primary stakeholder and normal review cadence.", "No private-system access was evaluated."],
    unknowns: [...new Set(included.flatMap((item) => item.unknowns))],
    costFactors: ["Final feature scope", "Data migration", "External API access and vendor fees", "Security or compliance requirements", "Urgency and review cycles"],
    nextStep: "Founder review followed by technical discovery and a written proposal.", disclosure: ESTIMATE_DISCLOSURE, catalogVersion: RATE_CATALOG.version,
  };
}

export function createPlan(state: AssessmentState) {
  const blueprint = generateBlueprint(state);
  return { blueprint, estimate: calculateEstimate(blueprint.recommendations) };
}

export type LeadInput = { name: string; businessName: string; email: string; phone?: string; consent: boolean; privacyConsent: boolean; consentVersion: string; consentedAt: string; assessment: AssessmentState; blueprint: DigitalBlueprint; estimate: PreliminaryEstimate };

const clean = (value: string, max: number) => value.replace(/[<>\u0000-\u001f]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
export function validateLead(value: unknown): { ok: true; lead: LeadInput } | { ok: false; error: string } {
  if (!value || typeof value !== "object") return { ok: false, error: "Lead information is required." };
  const raw = value as Partial<LeadInput>;
  const name = typeof raw.name === "string" ? clean(raw.name, 100) : "";
  const businessName = typeof raw.businessName === "string" ? clean(raw.businessName, 140) : "";
  const email = typeof raw.email === "string" ? clean(raw.email.toLowerCase(), 200) : "";
  const phone = typeof raw.phone === "string" ? clean(raw.phone, 40) : "";
  const honeypot = typeof (raw as { website?: unknown }).website === "string" ? (raw as { website: string }).website.trim() : "";
  if (honeypot) return { ok: false, error: "Lead information could not be validated." };
  if (name.length < 2 || businessName.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: "Name, business name, and a valid email are required." };
  if (raw.consent !== true || raw.privacyConsent !== true) return { ok: false, error: "Contact and privacy consent are required." };
  if (!raw.assessment || !raw.blueprint || !raw.estimate) return { ok: false, error: "Complete the assessment before submitting." };
  return { ok: true, lead: { name, businessName, email, phone, consent: true, privacyConsent: true, consentVersion: "public-intake-v1", consentedAt: new Date().toISOString(), assessment: raw.assessment, blueprint: raw.blueprint, estimate: raw.estimate } };
}

export function createLeadId(now = new Date(), seed: string = randomUUID()) { return `TDA-${now.getUTCFullYear()}-${createHash("sha256").update(seed).digest("hex").slice(0, 5).toUpperCase()}`; }

export function createCodexIntake(leadId: string, input: LeadInput) {
  const list = (items: string[]) => items.length ? items.map((item) => `- ${clean(item, 180)}`).join("\n") : "- Unknown — human discovery required";
  return `# TRUSTed Project Intake\n\n## Lead ID\n${leadId}\n\n## Status\nNEW — FOUNDER REVIEW REQUIRED\n\n## Business Overview\n- Contact details held only in the approved lead system; not included in this export.\n${list(input.blueprint.businessOverview)}\n\n## Website\n${input.assessment.websiteUrl ? `- Public URL: ${input.assessment.websiteUrl}` : "- Unknown"}\n\n## Current Systems\n${list(input.assessment.systems)}\n\n## Identified Pain Points\n${list(input.blueprint.painPoints)}\n\n## Business Goals\n${list(input.blueprint.goals)}\n\n## Recommended Digital Architecture\n${list(input.blueprint.recommendations.map((item) => `${item.name}: ${item.problemAddressed}`))}\n\n## Proposed Roadmap\n${list(input.blueprint.roadmap.flatMap((phase) => phase.items.map((item) => `${phase.phase} — ${item}`)))}\n\n## Preliminary Estimate\n- $${input.estimate.implementationRange.low.toLocaleString()}–$${input.estimate.implementationRange.high.toLocaleString()} USD\n- ${input.estimate.disclosure}\n\n## Assumptions\n${list(input.estimate.assumptions)}\n\n## Technical Unknowns\n${list(input.estimate.unknowns)}\n\n## Requested Timeline\n- ${clean(input.assessment.timeline ?? "Unknown", 80)}\n\n## Founder Decision Required\n- Review this intake and decide whether discovery should be offered.\n\n## Codex Restrictions\n- Do not begin implementation.\n- Do not contact the client.\n- Do not create a repository.\n- Do not access private systems.\n- Do not issue a final proposal.\n- Do not deploy.\n- Founder approval is required.\n`;
}

export class UsageGate {
  private sessions = new Map<string, number>(); private ips = new Map<string, { count: number; day: string; lastAt: number }>(); private submissions = new Map<string, number>();
  checkAI(session: string, ip: string, now: number, limits: { session: number; ip: number; cooldownMs: number }) {
    const day = new Date(now).toISOString().slice(0, 10); const entry = this.ips.get(ip);
    if ((this.sessions.get(session) ?? 0) >= limits.session) return { allowed: false, reason: "session" as const };
    if (entry?.day === day && entry.count >= limits.ip) return { allowed: false, reason: "ip" as const };
    if (entry && now - entry.lastAt < limits.cooldownMs) return { allowed: false, reason: "cooldown" as const };
    this.sessions.set(session, (this.sessions.get(session) ?? 0) + 1); this.ips.set(ip, { day, count: entry?.day === day ? entry.count + 1 : 1, lastAt: now });
    return { allowed: true, reason: null };
  }
  checkSubmission(fingerprint: string, now: number, windowMs = 10 * 60_000) { const prior = this.submissions.get(fingerprint); if (prior && now - prior < windowMs) return false; this.submissions.set(fingerprint, now); return true; }
}
