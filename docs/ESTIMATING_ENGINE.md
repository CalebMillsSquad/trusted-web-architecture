# Estimating Engine

`lib/business-architect-server.ts` contains the single server-controlled `RATE_CATALOG`. It defines a draft hourly assumption, effort and maintenance ranges by solution, project-management and quality allocations, uncertainty and integration-risk reserves, margin, and a minimum implementation charge.

The model never receives authority to set or revise pricing. The application sums included solution hours, applies the catalog factors, and returns separate implementation and monthly maintenance ranges plus assumptions, exclusions, unknowns, and the required preliminary-estimate disclosure.

The current catalog is marked `founderApprovedForProduction: false`. Update rates only in this catalog, update the version, run the full estimator tests, and obtain founder approval before production use. Third-party fees remain excluded until verified.
