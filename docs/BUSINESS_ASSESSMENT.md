# Business Assessment

The first substantive question is fixed in `lib/business-architect-core.ts`. The assessment then records business stage, offer, current systems, one industry-specific operations branch, pain points, goals, public website status, considered capabilities, budget range, and timeline.

Industry labels and branch questions live in `industryOptions` and `industryBlueprints`. Add an industry by extending the typed ID list, its branch configuration, and the corresponding `knowledge/industries/*.md` mapping. Do not add technical questions visitors cannot reasonably answer.

Recommendations are deterministic and linked to recorded facts. The engine returns at most four relevant solutions and explicitly retains unknowns for human discovery. The public website assessment currently validates and normalizes a public URL but performs no automated scan or unrestricted browsing.
