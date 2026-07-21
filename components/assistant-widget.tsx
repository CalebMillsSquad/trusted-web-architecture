"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { MAX_ASSISTANT_MESSAGE_LENGTH, type AssistantMessage, type StructuredAssistantResponse } from "@/lib/assistant-contract";
import {
  createInitialAssessment, FIRST_BUSINESS_QUESTION, industryBlueprints, industryOptions, LEAD_DISCLOSURE,
  normalizePublicUrl, preliminaryWebsiteAssessment, stepOptions,
  type AssessmentState, type AssessmentStep, type DigitalBlueprint, type PreliminaryEstimate,
} from "@/lib/business-architect-core";

const STORAGE_KEY = "trusted-business-architect-v1";
const emailHref = "mailto:caleb@trustedacademy.net?subject=TRUSTed%20AI%20Business%20Architect%20review%20request";
const multiSteps = new Set<AssessmentStep>(["systems", "operations", "pains", "goals", "features"]);
const nextStep: Record<AssessmentStep, AssessmentStep> = { industry: "stage", stage: "offering", offering: "systems", systems: "operations", operations: "pains", pains: "goals", goals: "website", website: "features", features: "budget", budget: "timeline", timeline: "complete", complete: "complete" };

function promptFor(state: AssessmentState) {
  if (state.step === "industry") return FIRST_BUSINESS_QUESTION;
  if (state.step === "stage") return "Is this business operating now, or are you planning it?";
  if (state.step === "offering") return state.stage === "planning" ? "What will the business primarily offer?" : "What does the business primarily sell or provide today?";
  if (state.step === "systems") return state.stage === "planning" ? "Which digital systems are already selected, if any?" : "Which systems does the business use today? Select all that apply.";
  if (state.step === "operations") return industryBlueprints[state.industry ?? "other"].question;
  if (state.step === "pains") return "Where is the business experiencing the most friction? Select the problems that are true today.";
  if (state.step === "goals") return "What would you most like the digital foundation to improve?";
  if (state.step === "website") return "Does the business have a public website we should include in a preliminary assessment?";
  if (state.step === "features") return "Which capabilities are you already considering? Choose only what seems relevant.";
  if (state.step === "budget") return "What preliminary budget range should human review keep in mind?";
  if (state.step === "timeline") return "What timeline are you considering?";
  return "Your preliminary blueprint is ready for review.";
}

const labelFor = (value: string) => [...industryOptions, ...Object.values(stepOptions).flat()].find(([id]) => id === value)?.[1] ?? value.replaceAll("_", " ");

export function AssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [assessment, setAssessment] = useState<AssessmentState>(createInitialAssessment);
  const [messages, setMessages] = useState<AssistantMessage[]>([{ role: "assistant", content: FIRST_BUSINESS_QUESTION }]);
  const [draft, setDraft] = useState(""); const [urlDraft, setUrlDraft] = useState(""); const [industryDraft, setIndustryDraft] = useState("");
  const [isSending, setIsSending] = useState(false); const [error, setError] = useState("");
  const [plan, setPlan] = useState<{ blueprint: DigitalBlueprint; estimate: PreliminaryEstimate } | null>(null);
  const [leadResult, setLeadResult] = useState<{ leadId: string; codexIntake: string; message: string } | null>(null);
  const [showLead, setShowLead] = useState(false); const [restored, setRestored] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null); const sessionId = useRef("");

  useEffect(() => {
    sessionId.current = sessionStorage.getItem("trusted-architect-session-id") || `tda_${crypto.randomUUID().replaceAll("-", "")}`;
    sessionStorage.setItem("trusted-architect-session-id", sessionId.current);
    try { const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "null") as { assessment?: AssessmentState; messages?: AssistantMessage[] } | null; if (saved?.assessment) setAssessment(saved.assessment); if (saved?.messages?.length) setMessages(saved.messages.slice(-12)); } catch { sessionStorage.removeItem(STORAGE_KEY); }
    setRestored(true);
  }, []);
  useEffect(() => { if (restored) sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ assessment, messages: messages.slice(-12) })); }, [assessment, messages, restored]);
  useEffect(() => {
    if (assessment.step !== "complete" || plan) return;
    fetch("/api/architect/plan", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ assessment }) })
      .then(async (response) => { const data = await response.json(); if (!response.ok) throw new Error(data.error); return data; })
      .then(setPlan).catch(() => setError("The preliminary blueprint could not be generated. Please review your answers or contact TRUSTed."));
  }, [assessment, plan]);

  const options = useMemo(() => {
    if (assessment.step === "industry") return industryOptions;
    if (assessment.step === "operations") return industryBlueprints[assessment.industry ?? "other"].options;
    if (assessment.step === "complete") return [];
    return stepOptions[assessment.step];
  }, [assessment.industry, assessment.step]);
  const selection = assessment.step === "systems" ? assessment.systems : assessment.step === "operations" ? assessment.operationDetails : assessment.step === "pains" ? assessment.painPoints : assessment.step === "goals" ? assessment.goals : assessment.step === "features" ? assessment.requestedFeatures : [];

  const addLocalTurn = (user: string, next: AssessmentState) => {
    setMessages((current) => [...current, { role: "user" as const, content: user }, { role: "assistant" as const, content: promptFor(next) }].slice(-12));
    setAssessment(next); setError("");
  };
  const choose = (value: string) => {
    if (multiSteps.has(assessment.step)) {
      const key = assessment.step === "systems" ? "systems" : assessment.step === "operations" ? "operationDetails" : assessment.step === "pains" ? "painPoints" : assessment.step === "goals" ? "goals" : "requestedFeatures";
      setAssessment((current) => ({ ...current, [key]: (current[key] as string[]).includes(value) ? (current[key] as string[]).filter((item) => item !== value) : [...(current[key] as string[]), value] })); return;
    }
    if (assessment.step === "website") {
      if (value === "provide") { setAssessment((current) => ({ ...current, websiteChoice: "provide" })); return; }
      addLocalTurn(labelFor(value), { ...assessment, websiteChoice: value as "none" | "skip", step: "features" }); return;
    }
    const key = assessment.step === "industry" ? "industry" : assessment.step === "stage" ? "stage" : assessment.step === "offering" ? "offering" : assessment.step === "budget" ? "budget" : "timeline";
    addLocalTurn(options.find(([id]) => id === value)?.[1] ?? labelFor(value), { ...assessment, [key]: value, step: nextStep[assessment.step] });
  };
  const continueMulti = () => { if (!selection.length) { setError("Select at least one option to continue."); return; } addLocalTurn(selection.map(labelFor).join(", "), { ...assessment, step: nextStep[assessment.step] }); };
  const submitIndustry = (event: FormEvent) => { event.preventDefault(); const value = industryDraft.trim(); if (!value) return; addLocalTurn(value, { ...assessment, industry: "other", industryDetail: value.slice(0, 120), step: "stage" }); setIndustryDraft(""); };
  const submitUrl = (event: FormEvent) => { event.preventDefault(); const normalized = normalizePublicUrl(urlDraft); if (!normalized.ok) { setError(normalized.error); return; } addLocalTurn(normalized.url, { ...assessment, websiteChoice: "provide", websiteUrl: normalized.url, step: "features" }); };

  const sendAI = async (event: FormEvent) => {
    event.preventDefault(); const content = draft.trim(); if (!content || isSending) return;
    const conversation = [...messages, { role: "user" as const, content }].slice(-6); setMessages(conversation); setDraft(""); setError(""); setIsSending(true);
    try { const response = await fetch("/api/assistant", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sessionId: sessionId.current, messages: conversation, assessment }) }); const data = await response.json() as { result?: StructuredAssistantResponse; error?: string }; if (!response.ok || !data.result) throw new Error(data.error || "The AI architect could not respond."); setMessages((current) => [...current, { role: "assistant" as const, content: `${data.result!.answer}${data.result!.nextQuestion ? `\n\n${data.result!.nextQuestion}` : ""}` }].slice(-12)); }
    catch (requestError) { setError(requestError instanceof Error ? requestError.message : "The AI architect is unavailable. The guided assessment still works without an AI call."); } finally { setIsSending(false); }
  };
  const reset = () => { const next = createInitialAssessment(); setAssessment(next); setMessages([{ role: "assistant", content: FIRST_BUSINESS_QUESTION }]); setPlan(null); setLeadResult(null); setShowLead(false); sessionStorage.removeItem(STORAGE_KEY); };

  const submitLead = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); if (!plan) return; const form = new FormData(event.currentTarget); setError("");
    const payload = { name: form.get("name"), businessName: form.get("businessName"), email: form.get("email"), phone: form.get("phone"), website: form.get("website"), consent: form.get("consent") === "on", privacyConsent: form.get("privacyConsent") === "on", assessment, blueprint: plan.blueprint, estimate: plan.estimate };
    const response = await fetch("/api/architect/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }); const data = await response.json();
    if (!response.ok) { setError(data.error); return; } setLeadResult(data);
  };

  return <div className="assistant-widget">
    {isOpen && <section className="assistant-panel architect-panel" id="trusted-assistant" role="dialog" aria-label="TRUSTed AI Business Architect">
      <header className="assistant-header architect-header"><div className="architect-identity"><Image src="/founder-portrait-placeholder.svg" alt="Founder portrait placeholder" width={58} height={58} priority /><div><span>TRUSTed</span><strong>AI Business Architect</strong><small>{isSending ? "Analyzing" : assessment.step === "complete" ? "Blueprint ready" : "Listening and learning"}</small></div></div><button type="button" onClick={() => setIsOpen(false)} aria-label="Close AI Business Architect">×</button></header>
      <p className="architect-disclosure">AI representation of Trust — not a live video call.</p>
      <div className="assistant-messages" aria-live="polite" aria-busy={isSending}>{messages.map((message, index) => <p className={`assistant-message assistant-message-${message.role}`} key={`${message.role}-${index}`}><span>{message.role === "assistant" ? "Trust" : "You"}</span>{message.content}</p>)}{isSending && <p className="assistant-thinking"><span />Analyzing</p>}</div>
      {assessment.step !== "complete" && <div className="architect-guided" aria-label="Guided business assessment">
        <p className="architect-progress">Assessment step {Object.keys(nextStep).indexOf(assessment.step) + 1} of 10</p>
        {assessment.step === "website" && assessment.websiteChoice === "provide" ? <form onSubmit={submitUrl} className="architect-inline-form"><label htmlFor="architect-url">Public website URL</label><div><input id="architect-url" value={urlDraft} onChange={(event) => setUrlDraft(event.target.value)} placeholder="example.com" /><button type="submit">Continue</button></div><small>Public pages only. Never enter credentials or private links.</small></form> : <div className="architect-options">{options.map(([id, label]) => <button type="button" key={id} className={selection.includes(id) ? "selected" : ""} aria-pressed={multiSteps.has(assessment.step) ? selection.includes(id) : undefined} onClick={() => choose(id)}>{label}</button>)}</div>}
        {assessment.step === "industry" && <form onSubmit={submitIndustry} className="architect-inline-form"><label htmlFor="architect-industry">Or describe the business</label><div><input id="architect-industry" value={industryDraft} maxLength={120} onChange={(event) => setIndustryDraft(event.target.value)} placeholder="Describe the industry" /><button type="submit">Continue</button></div></form>}
        {multiSteps.has(assessment.step) && <button type="button" className="architect-continue" onClick={continueMulti}>Continue with {selection.length} selected →</button>}
      </div>}
      {assessment.websiteUrl && <details className="architect-assessment"><summary>Preliminary Public Website Assessment</summary>{(() => { const report = preliminaryWebsiteAssessment(assessment.websiteUrl!); return <><p>{report.observed[0]}</p><p>{report.opportunities[0]}</p><small>{report.disclosure}</small></>; })()}</details>}
      {plan && <div className="architect-results"><article><span>BLUEPRINT</span><h3>{plan.blueprint.title}</h3><p>{plan.blueprint.recommendations.map((item) => item.name).join(" · ")}</p><details><summary>View recommendations and roadmap</summary>{plan.blueprint.recommendations.map((item) => <div key={item.id}><strong>{item.name}</strong><p>{item.problemAddressed}</p><small>{item.priority} · {item.scope}</small></div>)}</details></article><article><span>RULES-BASED ESTIMATE</span><h3>${plan.estimate.implementationRange.low.toLocaleString()}–${plan.estimate.implementationRange.high.toLocaleString()}</h3><p>{plan.estimate.effortHours.low}–{plan.estimate.effortHours.high} estimated hours</p><small>Maintenance: ${plan.estimate.maintenanceRange.low.toLocaleString()}–${plan.estimate.maintenanceRange.high.toLocaleString()}/month</small><p className="estimate-disclosure">{plan.estimate.disclosure}</p></article><div className="architect-result-actions"><button type="button" onClick={() => setShowLead((value) => !value)}>Request human review</button><button type="button" onClick={reset}>Start a new assessment</button></div></div>}
      {showLead && plan && !leadResult && <form className="architect-lead" onSubmit={submitLead}><h3>Request founder review</h3><label>Name<input name="name" required maxLength={100} /></label><label>Business name<input name="businessName" required maxLength={140} /></label><label>Email<input name="email" type="email" required maxLength={200} /></label><label>Phone (optional)<input name="phone" maxLength={40} /></label><label className="architect-trap" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label><label className="architect-check"><input name="consent" type="checkbox" required /> I consent to being contacted about this request.</label><label className="architect-check"><input name="privacyConsent" type="checkbox" required /> I understand the privacy and data-processing notice.</label><p>{LEAD_DISCLOSURE}</p><button type="submit">Prepare review request</button></form>}
      {leadResult && <div className="architect-success" role="status"><strong>{leadResult.leadId} · NEW — FOUNDER REVIEW REQUIRED</strong><p>{leadResult.message}</p><details><summary>View sanitized Codex-ready brief</summary><pre>{leadResult.codexIntake}</pre></details></div>}
      {error && <p className="assistant-error" role="alert">{error} {error.includes("not configured") && <a href={emailHref}>Email TRUSTed directly</a>}</p>}
      <form className="assistant-form architect-freeform" onSubmit={sendAI}><label htmlFor="assistant-message">Ask a free-form question (uses AI)</label><div><textarea id="assistant-message" ref={inputRef} value={draft} maxLength={MAX_ASSISTANT_MESSAGE_LENGTH} onChange={(event) => setDraft(event.target.value)} placeholder="Add context or ask a question" rows={2} /><button type="submit" disabled={isSending || !draft.trim()} aria-label="Send question">→</button></div></form>
      <div className="assistant-disclosure"><p>Structured choices stay in this browser session. Free-form messages are processed by OpenAI. Do not share sensitive or confidential information.</p><a href={emailHref}>Request human review by email</a><small>No appointment, price, project acceptance, or email delivery is confirmed without a human response.</small></div>
    </section>}
    <button type="button" className="assistant-launcher architect-launcher" aria-expanded={isOpen} aria-controls="trusted-assistant" onClick={() => setIsOpen((value) => !value)}><span aria-hidden="true">✦</span>{isOpen ? "Close architect" : "Meet your AI Architect"}</button>
  </div>;
}
