export const FIRST_BUSINESS_QUESTION = "What type of business do you currently operate, or what type of business are you planning to start?";

export const ESTIMATE_DISCLOSURE = "This is a preliminary estimate based on the information provided and publicly visible information. It is not a contract, proposal, guaranteed quote, or confirmation that TRUSTed Digital Architecture has accepted the project. Final scope and pricing require human review and technical discovery.";

export const LEAD_DISCLOSURE = "Submitting this request does not create a contract, confirm pricing, guarantee project acceptance, or schedule an appointment. TRUSTed Digital Architecture will review the information and contact you regarding possible next steps.";

export const PUBLIC_ASSESSMENT_LIMITATIONS = [
  "Source-code quality", "Hosting configuration", "Backend systems", "Database structure", "Security controls",
  "Internal APIs", "CRM configuration", "Private integrations", "Administrative access", "Licensing restrictions",
] as const;

export const industryOptions = [
  ["retail", "Retail"], ["automotive", "Automotive"], ["restaurant", "Restaurant or hospitality"],
  ["construction", "Construction or home services"], ["professional_services", "Professional services"],
  ["healthcare", "Healthcare"], ["education", "Education"], ["ministry", "Church or ministry"],
  ["manufacturing", "Manufacturing"], ["logistics", "Logistics or transportation"], ["real_estate", "Real estate"],
  ["ecommerce", "Ecommerce"], ["nonprofit", "Nonprofit"], ["technology", "Technology"], ["other", "Other"],
] as const;

export type IndustryId = typeof industryOptions[number][0];
export type BusinessStage = "operating" | "planning";
export type AssessmentStep = "industry" | "stage" | "offering" | "systems" | "operations" | "pains" | "goals" | "website" | "features" | "budget" | "timeline" | "complete";
export type SolutionId = "website_architecture" | "grounded_ai_assistant" | "custom_software" | "dashboard" | "command_center" | "api_integration" | "automation" | "employee_onboarding" | "ai_instructor";

export type ArchitectMessage = { role: "assistant" | "user"; content: string };

export type AssessmentState = {
  step: AssessmentStep;
  industry?: IndustryId;
  industryDetail?: string;
  stage?: BusinessStage;
  offering?: string;
  systems: string[];
  operationDetails: string[];
  painPoints: string[];
  goals: string[];
  websiteUrl?: string;
  websiteChoice?: "provide" | "none" | "skip";
  requestedFeatures: string[];
  budget?: string;
  timeline?: string;
};

export type Recommendation = {
  id: SolutionId;
  name: string;
  problemAddressed: string;
  purpose: string;
  dependencies: string[];
  unknowns: string[];
  priority: "Foundation" | "Operational" | "Expansion";
  scope: "Core" | "Optional";
};

export type DigitalBlueprint = {
  title: "TRUSTed Digital Business Blueprint";
  businessOverview: string[];
  currentEnvironment: string[];
  painPoints: string[];
  goals: string[];
  recommendations: Recommendation[];
  roadmap: Array<{ phase: string; items: string[] }>;
  expectedBenefits: string[];
  unknowns: string[];
  nextStep: string;
};

export type PreliminaryEstimate = {
  title: "Preliminary Implementation Estimate";
  recommendedSolution: string;
  includedCapabilities: string[];
  optionalCapabilities: string[];
  effortHours: { low: number; high: number };
  implementationRange: { low: number; high: number; currency: "USD" };
  maintenanceRange: { low: number; high: number; cadence: "monthly" };
  ongoingOperatingCosts: string[];
  assumptions: string[];
  unknowns: string[];
  costFactors: string[];
  nextStep: string;
  disclosure: string;
  catalogVersion: string;
};

export const stepOptions: Record<Exclude<AssessmentStep, "industry" | "operations" | "complete">, ReadonlyArray<readonly [string, string]>> = {
  stage: [["operating", "I operate this business now"], ["planning", "I am planning this business"]],
  offering: [["services", "Services"], ["products", "Products"], ["both", "Products and services"], ["education", "Education or training"], ["membership", "Membership or subscription"]],
  systems: [["website", "Website"], ["social_media", "Social media"], ["ecommerce", "Ecommerce"], ["booking", "Booking or scheduling"], ["payments", "Online payments"], ["inventory_pos", "Inventory or POS"], ["crm", "CRM"], ["accounting", "Accounting"], ["email_marketing", "Email marketing"], ["learning", "Learning system"], ["dashboard", "Dashboard or reporting"], ["internal_software", "Internal software"], ["ai_tools", "AI tools"], ["none", "None yet"]],
  pains: [["repetitive_inquiries", "We answer the same questions repeatedly"], ["manual_entry", "Information is entered more than once"], ["lost_leads", "Leads, tasks, or messages get lost"], ["slow_service", "Customers experience delays"], ["poor_visibility", "Management lacks clear visibility"], ["fragmented_tools", "Our tools do not work together"], ["onboarding_gaps", "Employees need repeated training help"], ["website_confusion", "Our website is unclear or outdated"]],
  goals: [["improve_clarity", "Make the business easier to understand"], ["reduce_inquiries", "Reduce repetitive calls or messages"], ["capture_leads", "Capture and route more qualified inquiries"], ["automate_work", "Automate repetitive work"], ["connect_systems", "Connect existing systems"], ["management_visibility", "Improve management visibility"], ["customer_self_service", "Give customers self-service options"], ["consistent_onboarding", "Improve onboarding or education"]],
  website: [["provide", "I have a public website"], ["none", "No website yet"], ["skip", "Skip for now"]],
  features: [["new_website", "New website or rebuild"], ["custom_design", "Custom visual design"], ["copywriting", "Copywriting"], ["ecommerce", "Ecommerce"], ["booking", "Booking"], ["customer_portal", "Customer portal"], ["ai_assistant", "AI assistant"], ["integrations", "System integrations"], ["dashboard", "Dashboard"], ["automation", "Automation"]],
  budget: [["under_5k", "Under $5,000"], ["5k_15k", "$5,000–$15,000"], ["15k_35k", "$15,000–$35,000"], ["35k_75k", "$35,000–$75,000"], ["75k_plus", "$75,000+"], ["unknown", "Need help determining scope"]],
  timeline: [["one_three", "1–3 months"], ["three_six", "3–6 months"], ["six_plus", "6+ months"], ["flexible", "Flexible or not yet decided"]],
};

export const industryBlueprints: Record<IndustryId, { question: string; options: ReadonlyArray<readonly [string, string]> }> = {
  automotive: { question: "Which operational area creates the most friction today?", options: [["inventory", "Inventory or parts search"], ["pos", "POS or register"], ["supplier_catalogs", "Supplier catalogs"], ["order_requests", "Order requests"], ["customer_notifications", "Customer notifications"]] },
  restaurant: { question: "Which restaurant workflow needs the most improvement?", options: [["reservations", "Reservations"], ["online_ordering", "Online ordering"], ["pos", "POS"], ["catering", "Catering"], ["customer_messaging", "Customer messaging"]] },
  professional_services: { question: "Which client-service workflow needs the most improvement?", options: [["lead_qualification", "Lead qualification"], ["scheduling", "Consultation scheduling"], ["documents", "Document collection"], ["client_portal", "Client portal"], ["proposals", "Proposals and project updates"]] },
  ministry: { question: "Which ministry workflow needs the most support?", options: [["events", "Events"], ["resources", "Sermons or resources"], ["member_communication", "Member communication"], ["volunteer_onboarding", "Volunteer onboarding"], ["learning", "Learning or member portal"]] },
  construction: { question: "Which field-service workflow needs the most improvement?", options: [["estimates", "Estimate requests"], ["scheduling", "Scheduling or dispatch"], ["job_tracking", "Job tracking"], ["field_communication", "Field communication"], ["training", "Employee training"]] },
  education: { question: "Which learning workflow needs the most improvement?", options: [["enrollment", "Enrollment"], ["course_delivery", "Course delivery"], ["progress", "Progress tracking"], ["parent_communication", "Parent communication"], ["ai_instruction", "AI-supported instruction"]] },
  healthcare: { question: "Which administrative workflow needs review with privacy safeguards?", options: [["public_information", "Public information"], ["intake", "Intake planning"], ["scheduling", "Scheduling"], ["staff_workflows", "Staff workflows"]] },
  retail: { question: "Which retail workflow creates the most friction?", options: [["catalog", "Product catalog"], ["inventory", "Inventory"], ["ordering", "Ordering"], ["customer_service", "Customer service"]] },
  manufacturing: { question: "Which operating workflow needs better visibility?", options: [["catalog", "Catalogs"], ["inventory", "Inventory"], ["orders", "Orders"], ["reporting", "Operational reporting"]] },
  logistics: { question: "Which logistics workflow needs the most improvement?", options: [["dispatch", "Dispatch"], ["scheduling", "Scheduling"], ["documentation", "Documentation"], ["status", "Status communication"]] },
  real_estate: { question: "Which real-estate workflow needs the most support?", options: [["lead_routing", "Lead routing"], ["property_experience", "Property experience"], ["scheduling", "Scheduling"], ["documents", "Document workflow"]] },
  ecommerce: { question: "Which commerce workflow needs the most improvement?", options: [["catalog", "Catalog"], ["inventory", "Inventory"], ["fulfillment", "Fulfillment"], ["support", "Customer support"]] },
  nonprofit: { question: "Which nonprofit workflow needs the most support?", options: [["resources", "Public resources"], ["membership", "Membership"], ["learning", "Learning"], ["communications", "Communications"]] },
  technology: { question: "Which product workflow needs the most improvement?", options: [["onboarding", "Product onboarding"], ["support", "Support"], ["dashboard", "Dashboards"], ["integrations", "Integrations"]] },
  other: { question: "Which part of daily operations needs the most improvement?", options: [["customer_acquisition", "Customer acquisition"], ["communication", "Communication"], ["service_delivery", "Service delivery"], ["management", "Management visibility"]] },
};

export function createInitialAssessment(): AssessmentState {
  return { step: "industry", systems: [], operationDetails: [], painPoints: [], goals: [], requestedFeatures: [] };
}

export function normalizePublicUrl(input: string): { ok: true; url: string } | { ok: false; error: string } {
  const trimmed = input.trim();
  if (!trimmed || trimmed.length > 300 || /[\s@]/.test(trimmed)) return { ok: false, error: "Enter a public website address." };
  try {
    const value = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") throw new Error();
    if (!url.hostname.includes(".") || ["localhost", "127.0.0.1"].includes(url.hostname)) throw new Error();
    url.username = ""; url.password = ""; url.hash = "";
    return { ok: true, url: url.toString() };
  } catch {
    return { ok: false, error: "Enter a valid public http or https website address." };
  }
}

const solutionCatalog: Record<SolutionId, Omit<Recommendation, "problemAddressed" | "priority" | "scope">> = {
  website_architecture: { id: "website_architecture", name: "Website Architecture", purpose: "Create a clear, credible customer journey and durable digital foundation.", dependencies: ["Approved content and brand direction"], unknowns: ["Final page and content scope"] },
  grounded_ai_assistant: { id: "grounded_ai_assistant", name: "Grounded AI Assistant", purpose: "Answer approved questions consistently and guide visitors to a human next step.", dependencies: ["Approved knowledge and escalation rules"], unknowns: ["Knowledge ownership and operating budget"] },
  custom_software: { id: "custom_software", name: "Custom Software", purpose: "Support a workflow that off-the-shelf tools do not handle cleanly.", dependencies: ["Workflow discovery"], unknowns: ["User roles, data, and security requirements"] },
  dashboard: { id: "dashboard", name: "Management Dashboard", purpose: "Make meaningful work, exceptions, and performance visible.", dependencies: ["Reliable source data"], unknowns: ["Metrics and data access"] },
  command_center: { id: "command_center", name: "Operations Command Center", purpose: "Bring fragmented daily work into one controlled operating view.", dependencies: ["Defined ownership and workflows"], unknowns: ["Roles, permissions, and system boundaries"] },
  api_integration: { id: "api_integration", name: "API and System Integration", purpose: "Reduce duplicate entry and move approved data between systems.", dependencies: ["Supported APIs and account permissions"], unknowns: ["Vendor limits, documentation, and fees"] },
  automation: { id: "automation", name: "Workflow Automation", purpose: "Reduce stable repetitive work while preserving exception handling.", dependencies: ["A clarified workflow"], unknowns: ["Exceptions and notification rules"] },
  employee_onboarding: { id: "employee_onboarding", name: "Employee Onboarding System", purpose: "Make training and operational knowledge more consistent.", dependencies: ["Approved training content"], unknowns: ["Roles and completion requirements"] },
  ai_instructor: { id: "ai_instructor", name: "AI-Supported Learning", purpose: "Guide learners through approved material with human oversight.", dependencies: ["Curriculum and safety review"], unknowns: ["Assessment and escalation rules"] },
};

export function recommendSolutions(state: AssessmentState): Recommendation[] {
  const picks: Array<[SolutionId, string, Recommendation["priority"], Recommendation["scope"]]> = [];
  const has = (list: string[], ...values: string[]) => values.some((value) => list.includes(value));
  if (has(state.painPoints, "website_confusion") || has(state.goals, "improve_clarity") || has(state.requestedFeatures, "new_website")) picks.push(["website_architecture", "The public experience needs clearer positioning or a stronger foundation.", "Foundation", "Core"]);
  if (has(state.painPoints, "repetitive_inquiries") || has(state.goals, "reduce_inquiries") || has(state.requestedFeatures, "ai_assistant")) picks.push(["grounded_ai_assistant", "Repeated questions may be handled more consistently with approved knowledge and escalation.", "Operational", picks.length ? "Optional" : "Core"]);
  if (has(state.painPoints, "manual_entry", "fragmented_tools") || has(state.goals, "connect_systems") || has(state.requestedFeatures, "integrations")) picks.push(["api_integration", "Information is repeated or fragmented across existing systems.", "Foundation", "Core"]);
  if (has(state.goals, "automate_work") || has(state.requestedFeatures, "automation")) picks.push(["automation", "A repeated, stable workflow may be suitable for controlled automation.", "Operational", "Core"]);
  if (has(state.painPoints, "poor_visibility") || has(state.goals, "management_visibility") || has(state.requestedFeatures, "dashboard")) picks.push(["dashboard", "Management needs a clearer view of activity, exceptions, or results.", "Operational", "Core"]);
  if (has(state.painPoints, "lost_leads") && has(state.painPoints, "fragmented_tools")) picks.push(["command_center", "Work and communications are being lost across fragmented tools.", "Operational", "Optional"]);
  if (has(state.painPoints, "onboarding_gaps") || has(state.goals, "consistent_onboarding")) picks.push(["employee_onboarding", "Employees need repeated help understanding the work.", "Expansion", "Core"]);
  if (state.industry === "education" && has(state.operationDetails, "ai_instruction")) picks.push(["ai_instructor", "The education workflow includes interest in guided AI-supported instruction.", "Expansion", "Optional"]);
  if (has(state.requestedFeatures, "customer_portal") || (state.stage === "operating" && has(state.goals, "customer_self_service"))) picks.push(["custom_software", "Customers need a structured self-service workflow beyond a public website.", "Expansion", "Optional"]);
  if (picks.length === 0) picks.push(["website_architecture", "A focused discovery and public-experience review is the safest first foundation.", "Foundation", "Core"]);
  return [...new Map(picks.map((pick) => [pick[0], pick])).values()].slice(0, 4).map(([id, problemAddressed, priority, scope]) => ({ ...solutionCatalog[id], problemAddressed, priority, scope }));
}

export function generateBlueprint(state: AssessmentState): DigitalBlueprint {
  const recommendations = recommendSolutions(state);
  const industry = industryOptions.find(([id]) => id === state.industry)?.[1] ?? state.industryDetail ?? "Business type not provided";
  const phaseOrder = ["Foundation", "Operational", "Expansion"] as const;
  return {
    title: "TRUSTed Digital Business Blueprint",
    businessOverview: [industry, state.stage === "planning" ? "Planned business" : "Existing operating business", state.offering ? `Primary offer: ${state.offering}` : "Offer details require discovery"],
    currentEnvironment: state.systems.length ? state.systems : ["No current systems were identified"],
    painPoints: state.painPoints.length ? state.painPoints : ["No confirmed pain points; human discovery required"],
    goals: state.goals.length ? state.goals : ["No confirmed goals; human discovery required"],
    recommendations,
    roadmap: phaseOrder.map((phase, index) => ({ phase: `Phase ${index + 1}: ${phase === "Foundation" ? "Highest-impact foundation" : phase === "Operational" ? "Operational improvement" : "Expansion and optimization"}`, items: recommendations.filter((item) => item.priority === phase).map((item) => item.name) })).filter((phase) => phase.items.length),
    expectedBenefits: recommendations.map((item) => item.id === "dashboard" ? "May improve management visibility" : item.id === "grounded_ai_assistant" ? "May reduce repetitive inquiries" : item.id === "api_integration" ? "May reduce duplicate data entry" : item.id === "employee_onboarding" ? "May make employee onboarding more consistent" : "May make the customer or operational workflow clearer"),
    unknowns: [...new Set(recommendations.flatMap((item) => item.unknowns))],
    nextStep: "Human review and a focused discovery consultation before scope, feasibility, or pricing is confirmed.",
  };
}

export function preliminaryWebsiteAssessment(url: string) {
  return {
    title: "Preliminary Public Website Assessment" as const,
    url,
    observed: ["No automated public-site scan was performed in this local release."],
    opportunities: ["A human review can assess messaging, navigation, mobile experience, accessibility, conversion paths, and integration readiness."],
    limitations: [...PUBLIC_ASSESSMENT_LIMITATIONS],
    disclosure: "This is not a security audit, code audit, accessibility certification, SEO guarantee, or complete technical discovery.",
  };
}
