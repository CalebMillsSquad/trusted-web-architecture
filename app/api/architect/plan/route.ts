import { NextResponse } from "next/server";
import { createPlan } from "@/lib/business-architect-server";
import type { AssessmentState } from "@/lib/business-architect-core";

export const runtime = "nodejs";
export async function POST(request: Request) {
  if (process.env.AI_BUSINESS_ASSESSMENT_ENABLED === "false" || process.env.AI_ESTIMATOR_ENABLED === "false") return NextResponse.json({ error: "Business assessment is temporarily disabled." }, { status: 503 });
  let body: unknown; try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  const state = (body as { assessment?: AssessmentState })?.assessment;
  if (!state || state.step !== "complete" || !state.industry || !state.stage || state.goals.length === 0) return NextResponse.json({ error: "Complete the guided assessment before generating a plan." }, { status: 400 });
  return NextResponse.json(createPlan(state), { headers: { "Cache-Control": "no-store" } });
}
