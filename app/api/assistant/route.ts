import { createHash } from "node:crypto";
import OpenAI from "openai";
import { NextResponse } from "next/server";
import { ASSISTANT_RESPONSE_SCHEMA, parseAssistantRequest, parseStructuredAssistantResponse } from "@/lib/assistant-contract";
import { ASSISTANT_MODEL, buildAssistantInstructions } from "@/lib/assistant-knowledge";
import { UsageGate } from "@/lib/business-architect-server";
import { loadRelevantKnowledge } from "@/lib/knowledge-loader";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const usageGate = new UsageGate();
const readNumber = (name: string, fallback: number, min: number, max: number) => { const value = Number(process.env[name]); return Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : fallback; };
const readFlag = (name: string, fallback: boolean) => process.env[name] === undefined ? fallback : process.env[name] === "true";
const usageConfig = {
  maxMessagesPerSession: readNumber("AI_MAX_MESSAGES_PER_SESSION", 5, 1, 20), maxMessagesPerIpPerDay: readNumber("AI_MAX_MESSAGES_PER_IP_PER_DAY", 10, 1, 100),
  maxInputCharacters: readNumber("AI_MAX_INPUT_CHARACTERS", 1500, 100, 3000),
  maxOutputTokens: readNumber("AI_MAX_OUTPUT_TOKENS", 700, 100, 1500), cooldownMs: readNumber("AI_REQUEST_COOLDOWN_SECONDS", 5, 0, 60) * 1000,
  timeoutMs: readNumber("AI_REQUEST_TIMEOUT_SECONDS", 30, 5, 90) * 1000,
};

function visitorId(request: Request) { const raw = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "local-visitor"; return createHash("sha256").update(raw).digest("hex").slice(0, 64); }
const headers = { "Cache-Control": "no-store", "Content-Security-Policy": "default-src 'none'" };
const errorResponse = (error: string, status: number) => NextResponse.json({ error }, { status, headers });

export async function POST(request: Request) {
  if (!readFlag("AI_PUBLIC_CHAT_ENABLED", true)) return errorResponse("The AI architect is temporarily disabled.", 503);
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 24_000) return errorResponse("That request is too large.", 413);
  let body: unknown;
  try { body = await request.json(); } catch { return errorResponse("The request could not be read.", 400); }
  const parsed = parseAssistantRequest(body);
  if (!parsed.ok) return errorResponse(parsed.error, 400);
  if (parsed.messages.at(-1)!.content.length > usageConfig.maxInputCharacters) return errorResponse("That message is too long.", 413);
  const id = visitorId(request);
  const gate = usageGate.checkAI(parsed.sessionId, id, Date.now(), { session: usageConfig.maxMessagesPerSession, ip: usageConfig.maxMessagesPerIpPerDay, cooldownMs: usageConfig.cooldownMs });
  if (!gate.allowed) return errorResponse(gate.reason === "cooldown" ? "Please wait a few seconds before asking another question." : "The AI architect has reached its current usage limit. Please continue the guided assessment or contact TRUSTed.", 429);
  if (!process.env.OPENAI_API_KEY) return errorResponse("The AI architect is not configured yet. Please email caleb@trustedacademy.net.", 503);

  const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), usageConfig.timeoutMs);
  try {
    const knowledge = loadRelevantKnowledge(parsed.assessment);
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.responses.create({
      model: ASSISTANT_MODEL,
      instructions: buildAssistantInstructions(knowledge, JSON.stringify(parsed.assessment ?? {})),
      input: parsed.messages,
      max_output_tokens: usageConfig.maxOutputTokens,
      reasoning: { effort: "none" }, safety_identifier: id, store: false,
      text: { verbosity: "low", format: { type: "json_schema", name: "business_architect_response", strict: true, schema: ASSISTANT_RESPONSE_SCHEMA } },
    }, { signal: controller.signal });
    let raw: unknown;
    try { raw = JSON.parse(response.output_text); } catch { return errorResponse("The AI architect could not prepare a validated reply. Please try again.", 502); }
    const result = parseStructuredAssistantResponse(raw);
    if (!result) return errorResponse("The AI architect could not prepare a validated reply. Please try again.", 502);
    return NextResponse.json({ result }, { headers });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") return errorResponse("The AI architect timed out. Please try again.", 504);
    const quota = error instanceof OpenAI.APIError && error.code === "insufficient_quota";
    const rate = error instanceof OpenAI.APIError && error.status === 429 && !quota;
    return errorResponse(quota ? "The AI architect is not available yet. Please continue the guided assessment or email TRUSTed." : rate ? "The AI architect is temporarily busy. Please wait and try again." : "The AI architect is unavailable right now. Please continue the guided assessment or email TRUSTed.", quota ? 503 : rate ? 429 : 502);
  } finally { clearTimeout(timer); }
}
