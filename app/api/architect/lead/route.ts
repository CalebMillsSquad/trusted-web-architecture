import { createHash, randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { createCodexIntake, createLeadId, UsageGate, validateLead } from "@/lib/business-architect-server";

export const runtime = "nodejs";
const gate = new UsageGate();
export async function POST(request: Request) {
  const requestId = randomUUID();
  let body: unknown; try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  const parsed = validateLead(body); if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });
  const fingerprint = createHash("sha256").update(`${parsed.lead.email}|${parsed.lead.businessName}`).digest("hex");
  if (!gate.checkSubmission(fingerprint, Date.now())) return NextResponse.json({ error: "This review request was already prepared recently." }, { status: 409 });
  if (process.env.AI_LEAD_TEST_MODE !== "true") return NextResponse.json({ error: "Secure lead storage and confirmed email delivery are not configured. Please use the direct email option.", requestId, status: "storage_unavailable", emailStatus: "not_attempted" }, { status: 503, headers: { "Cache-Control": "no-store" } });
  const leadId = createLeadId(); const intake = createCodexIntake(leadId, parsed.lead);
  return NextResponse.json({ leadId, status: "NEW", emailStatus: "mock_confirmed", message: "Local test submission prepared. No external email was sent and no appointment was scheduled.", codexIntake: intake }, { headers: { "Cache-Control": "no-store" } });
}
