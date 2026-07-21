import { readFileSync } from "node:fs";
import path from "node:path";
import type { AssessmentState, IndustryId } from "./business-architect-core";

const commonFiles = ["company.md", "services.md", "business-pain-points.md", "solution-catalog.md", "process.md", "estimating-policy.md", "consultation.md", "policies.md", "disclaimers.md"];
const industryFiles: Partial<Record<IndustryId, string>> = {
  automotive: "automotive.md", restaurant: "restaurant.md", construction: "construction.md",
  professional_services: "professional-services.md", healthcare: "healthcare.md", education: "education.md",
  ministry: "ministry.md", retail: "retail.md", ecommerce: "ecommerce.md", logistics: "logistics.md",
};

export function loadRelevantKnowledge(state?: Partial<AssessmentState>) {
  const root = path.join(process.cwd(), "knowledge");
  const selected = commonFiles.map((file) => path.join(root, file));
  const industry = state?.industry && industryFiles[state.industry];
  if (industry) selected.push(path.join(root, "industries", industry));
  return selected.map((file) => readFileSync(file, "utf8").trim()).join("\n\n");
}
