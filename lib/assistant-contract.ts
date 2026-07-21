import type { AssessmentState } from "./business-architect-core";

export const MAX_ASSISTANT_MESSAGES = 6;
export const MAX_ASSISTANT_MESSAGE_LENGTH = 1500;

export type AssistantRole = "user" | "assistant";
export type AssistantMessage = { role: AssistantRole; content: string };

type ParseResult =
  | { ok: true; messages: AssistantMessage[]; sessionId: string; assessment?: Partial<AssessmentState> }
  | { ok: false; error: string };

export function parseAssistantRequest(value: unknown): ParseResult {
  if (!value || typeof value !== "object" || !("messages" in value)) {
    return { ok: false, error: "A messages array is required." };
  }

  const messages = (value as { messages?: unknown }).messages;

  if (!Array.isArray(messages) || messages.length === 0) {
    return { ok: false, error: "Add a message before sending." };
  }

  if (messages.length > MAX_ASSISTANT_MESSAGES) {
    return { ok: false, error: "This conversation is too long. Start a new chat." };
  }

  const normalized: AssistantMessage[] = [];

  for (const message of messages) {
    if (!message || typeof message !== "object") {
      return { ok: false, error: "One or more messages are invalid." };
    }

    const role = (message as { role?: unknown }).role;
    const content = (message as { content?: unknown }).content;

    if (role !== "user" && role !== "assistant") {
      return { ok: false, error: "One or more message roles are invalid." };
    }

    if (typeof content !== "string") {
      return { ok: false, error: "One or more messages are invalid." };
    }

    const trimmedContent = content.trim();

    if (!trimmedContent || trimmedContent.length > MAX_ASSISTANT_MESSAGE_LENGTH) {
      return { ok: false, error: `Messages must be between 1 and ${MAX_ASSISTANT_MESSAGE_LENGTH} characters.` };
    }

    normalized.push({ role, content: trimmedContent });
  }

  if (normalized.at(-1)?.role !== "user") {
    return { ok: false, error: "The latest message must be from the visitor." };
  }

  const raw = value as { sessionId?: unknown; assessment?: unknown };
  if (typeof raw.sessionId !== "string" || !/^[a-zA-Z0-9_-]{8,80}$/.test(raw.sessionId)) return { ok: false, error: "A valid session is required." };
  const assessment = raw.assessment && typeof raw.assessment === "object" ? raw.assessment as Partial<AssessmentState> : undefined;
  return { ok: true, messages: normalized, sessionId: raw.sessionId, assessment };
}

export const conversationPhases = ["business_discovery", "digital_presence", "operations_audit", "pain_points", "goals", "recommendations", "blueprint", "human_review"] as const;
export const responseIntents = ["business_assessment", "website_question", "service_question", "consultation_request", "unsupported"] as const;
export const responseSolutions = ["website_architecture", "grounded_ai_assistant", "custom_software", "dashboard", "command_center", "api_integration", "automation", "employee_onboarding", "ai_instructor"] as const;
export type StructuredAssistantResponse = { answer: string; conversationPhase: typeof conversationPhases[number]; intent: typeof responseIntents[number]; identifiedPainPoints: string[]; identifiedGoals: string[]; recommendedSolutions: typeof responseSolutions[number][]; nextQuestion: string; shouldGenerateBlueprint: boolean; shouldOfferHumanReview: boolean; confidence: "low" | "medium" | "high" };

export const ASSISTANT_RESPONSE_SCHEMA = {
  type: "object", additionalProperties: false,
  properties: {
    answer: { type: "string" }, conversationPhase: { type: "string", enum: conversationPhases }, intent: { type: "string", enum: responseIntents },
    identifiedPainPoints: { type: "array", items: { type: "string" }, maxItems: 8 }, identifiedGoals: { type: "array", items: { type: "string" }, maxItems: 8 },
    recommendedSolutions: { type: "array", items: { type: "string", enum: responseSolutions }, maxItems: 4 }, nextQuestion: { type: "string" },
    shouldGenerateBlueprint: { type: "boolean" }, shouldOfferHumanReview: { type: "boolean" }, confidence: { type: "string", enum: ["low", "medium", "high"] },
  },
  required: ["answer", "conversationPhase", "intent", "identifiedPainPoints", "identifiedGoals", "recommendedSolutions", "nextQuestion", "shouldGenerateBlueprint", "shouldOfferHumanReview", "confidence"],
} as const;

const includes = (list: readonly string[], value: unknown): value is string => typeof value === "string" && list.includes(value);
export function parseStructuredAssistantResponse(value: unknown): StructuredAssistantResponse | null {
  if (!value || typeof value !== "object") return null; const raw = value as Record<string, unknown>;
  if (typeof raw.answer !== "string" || raw.answer.length < 1 || raw.answer.length > 1800 || !includes(conversationPhases, raw.conversationPhase) || !includes(responseIntents, raw.intent) || typeof raw.nextQuestion !== "string" || typeof raw.shouldGenerateBlueprint !== "boolean" || typeof raw.shouldOfferHumanReview !== "boolean" || !includes(["low", "medium", "high"], raw.confidence)) return null;
  if (!Array.isArray(raw.identifiedPainPoints) || !raw.identifiedPainPoints.every((item) => typeof item === "string") || !Array.isArray(raw.identifiedGoals) || !raw.identifiedGoals.every((item) => typeof item === "string") || !Array.isArray(raw.recommendedSolutions) || !raw.recommendedSolutions.every((item) => includes(responseSolutions, item))) return null;
  return raw as StructuredAssistantResponse;
}
