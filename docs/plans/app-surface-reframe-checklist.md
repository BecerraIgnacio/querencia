# App Surface Reframe Checklist

This file is the handoff checklist for the web app refactor under the regional public-awareness model and the avian vet-only operational pilot.

Use it when:
- the agent context is lost
- another agent needs to continue the app work
- you need a fast truth source for what is already done versus what is still pending

## Scope

This checklist covers the app-facing work for:
- public regional discovery across bovine, porcine, and avian
- avian-only operational reporting for verified veterinarians
- organization access tiers: `public`, `network`, `coordinator`
- region-based watch areas and alerts
- account, dashboard, and workspace access copy and gating

This checklist does not cover:
- the completed docs and contract rewrite
- the future Supabase migration and full data model backfill
- pipeline cleanup outside the web app surface

## Status Summary

- [x] Strategy reset docs are already rewritten around regions, vet-only reporting, and organization access tiers.
- [x] Shared domain and contract vocabulary has been partially rewritten for regions, report confidence, and organization roles.
- [x] Core public seed data and disease-view surfaces have started the region-first refactor.
- [x] Web app routing, gating, reporting, alerts, and i18n have been moved onto the access-tier and region model.
- [x] Targeted web verification has been completed with a successful `@querencia/web` build.
- [ ] Account/dashboard copy and deeper workspace naming are only partially aligned and still need cleanup.

## Completed Work

### 1. Shared foundations already updated

- [x] `packages/core-domain/src/plans.ts`
  - Added access tiers: `public`, `network`, `coordinator`
  - Added `NetworkRole`
  - Kept `PlanName` as a compatibility alias
- [x] `packages/core-domain/src/territory.ts`
  - Added `RegionId`
  - Added `VeterinaryNetworkId`
- [x] `packages/core-domain/src/surveillance.ts`
  - Replaced source model with:
    - `official_confirmed`
    - `verified_veterinarian`
    - `public_intelligence`
  - Added report confidence states:
    - `submitted`
    - `screened`
    - `probable`
    - `confirmed`
    - `rejected`
    - `duplicate`
  - Generalized aggregation key generation away from hex-only naming
- [x] `packages/contracts/src/shared/region-activity.ts`
  - Added `Region` and `RegionAggregation`
- [x] Public/member contracts were partially updated for region activity, report status, region watch areas, and organization profile fields.
- [x] `packages/authz/src/entitlements.ts`
  - Replaced `free/plus/pro` behavior with `public/network/coordinator`
- [x] Shared package tests passed:
  - `@querencia/core-domain`
  - `@querencia/authz`

### 2. Public app surfaces already updated

- [x] `apps/web/src/data/seed-map-data.ts`
  - Replaced hex seed data with region activity seed data
  - Added watch region options
  - Added public regional overview data
- [x] `apps/web/src/data/seed-kpis.ts`
  - Replaced `affectedHexCount` with `affectedRegionCount`
  - Added `sourceTotals`
- [x] `apps/web/src/modules/disease-view/use-map-data.ts`
  - Switched to `RegionAggregation`
- [x] `apps/web/src/modules/disease-view/hex-map.tsx`
  - Refactored from hex map rendering into a region activity panel
- [x] `apps/web/src/modules/disease-view/hero-map.tsx`
  - Refactored into a region overview hero
- [x] `apps/web/src/modules/disease-view/kpi-panel.tsx`
  - Uses affected regions terminology
- [x] `apps/web/src/modules/disease-view/disease-detail-shell.tsx`
  - Uses `public` access tier for public dashboard slot behavior
- [x] `apps/web/src/modules/disease-view/infographic/infographic-page.tsx`
  - Uses `public` access tier for public dashboard slot behavior

## Pending Work

### 3. Add a web access compatibility helper

- [x] Create `apps/web/src/lib/access.ts`
- [x] Add `coercePlanName(rawPlanName, rawAccessTier)`:
  - `public` -> `public`
  - `network` -> `network`
  - `coordinator` -> `coordinator`
  - legacy `free` -> `public`
  - legacy `plus` -> `network`
  - legacy `pro` -> `coordinator`
- [x] Add helper for `networkRole`
- [x] Add helper for `isVerifiedVeterinarian`

### 4. Update route-level page gating and profile mapping

- [x] `apps/web/app/[locale]/report/page.tsx`
  - Use coerced access tier
  - Pass through vet verification state
- [x] `apps/web/app/[locale]/alerts/page.tsx`
  - Use coerced access tier
- [x] `apps/web/app/[locale]/account/page.tsx`
  - Use new access terminology
- [x] `apps/web/app/[locale]/dashboard/page.tsx`
  - Gate for `network` and `coordinator`
- [x] `apps/web/app/[locale]/workspace/page.tsx`
  - Gate for `coordinator`

### 5. Finish report flow for avian-only confidential veterinary reporting

- [x] `apps/web/src/modules/reporting/report-gate.tsx`
  - Require sign-in
  - Require access tier permission to report
  - Require verified veterinarian
- [x] `apps/web/src/modules/reporting/report-form.tsx`
  - Remove broad public/community reporting language
  - Make operational pilot avian-only
  - Remove visibility controls
  - Replace any `user_report` submission path with `verified_veterinarian`
  - Replace location/hex semantics with `regionId`
  - Include structured fields:
    - disease
    - region
    - reportedAt
    - caseCountEstimate
    - evidenceSummary
    - notes
    - veterinaryNetworkId
- [x] `apps/web/src/modules/reporting/report-success.tsx`
  - Align success flow with `submitted` status
  - Remove legacy `pending_review` assumptions if still present

### 6. Finish watch region and alert center refactor

- [x] `apps/web/src/modules/alerts/alert-gate.tsx`
  - Align to `network` and `coordinator`
- [x] `apps/web/src/modules/alerts/watch-area-form.tsx`
  - Remove hex-cell selection
  - Use `WATCH_REGION_OPTIONS`
  - Store `region_ids`
  - Keep avian as the only operational species
- [x] `apps/web/src/modules/alerts/watch-area-list.tsx`
  - Render `regionIds` instead of `hexCellIds`
- [x] `apps/web/src/modules/alerts/alert-center-page.tsx`
  - Map legacy storage to region-compatible UI if necessary
  - Display source and confidence status where available
- [x] `apps/web/src/modules/alerts/alert-card.tsx`
  - Show region terminology
  - Optionally show source/confidence metadata

### 7. Align account, access, and dashboard terminology

- [x] `apps/web/src/modules/account-plan/plan-badge.tsx`
  - Rename and restyle around `public`, `network`, `coordinator`
- [x] `apps/web/src/modules/account-plan/upgrade-prompt.tsx`
  - Replace consumer upgrade language with access-request language
- [x] `apps/web/src/modules/account-plan/entitlement-summary.tsx`
  - Include review capability and vet requirements
- [ ] `apps/web/src/modules/account-plan/account-page.tsx`
  - Update product framing away from self-serve plans
- [x] `apps/web/src/modules/dashboards/dashboard-gate.tsx`
  - Allow `network` and `coordinator`
- [x] `apps/web/src/modules/disease-view/dashboard-slot.tsx`
  - Keep public users out of operational dashboards
- [ ] `apps/web/src/modules/dashboards/plus-dashboard.tsx`
  - Rename or repurpose around network operations
- [ ] `apps/web/src/modules/dashboards/pro-dashboard.tsx`
  - Rename or repurpose around coordinator operations
- [x] `apps/web/src/modules/dashboards/portfolio-workspace.tsx`
  - Reframe to watch regions and network coordination
- [x] `apps/web/src/modules/dashboards/portfolio-detail.tsx`
  - Reframe away from multi-hex portfolio language
- [x] `apps/web/src/modules/dashboards/portfolio-list.tsx`
  - Reframe away from multi-hex portfolio language

### 8. Replace remaining hex and plan-tier terminology in app data and tables

- [x] `apps/web/src/data/seed-executive.ts`
- [x] `apps/web/src/data/seed-trends.ts`
- [x] `apps/web/src/modules/dashboards/critical-zone-table.tsx`
- [x] `apps/web/src/modules/dashboards/executive-snapshot-card.tsx`
- [x] `apps/web/src/modules/dashboards/disease-ranking-table.tsx`
- [x] `apps/web/src/lib/export/export-columns.ts`
- [ ] Search for remaining legacy terms and remove or isolate them:
  - `hex`
  - `hexCell`
  - `affectedHexCount`
  - `free`
  - `plus`
  - `pro`
  - `user_report`
  - `anonymous`

### 9. Fix i18n message keys introduced by the public surface refactor

- [x] `apps/web/src/i18n/messages/en.json`
- [x] `apps/web/src/i18n/messages/es.json`
- [x] Add the new keys already referenced by updated components:
  - `landing.coveredSpecies`
  - `landing.operationalPilot`
  - `landing.publicPoints`
  - `landing.regionalSignals`
  - `diseaseDetail.regionalActivity`
  - `diseaseDetail.delayedPublicRelease`
  - `diseaseDetail.lastUpdate`
  - `diseaseDetail.kpiAffectedRegions`
- [ ] Rewrite old wording that still centers:
  - hex maps
  - anonymous reporting
  - self-serve consumer plans

### 10. Verification

- [x] Run targeted checks after the app refactor
- [ ] Minimum recommended commands:
  - `npx pnpm@10.6.2 --filter @querencia/web build`
  - `npx pnpm@10.6.2 --filter @querencia/core-domain test`
  - `npx pnpm@10.6.2 --filter @querencia/authz test`
- [x] If build fails, record the first blocking error and the file that owns it

## Suggested Execution Order

1. Add `apps/web/src/lib/access.ts`
2. Update route pages to use the helper
3. Finish report flow
4. Finish watch region and alert flow
5. Align account and dashboard copy/gating
6. Replace remaining hex and plan-tier language in dashboard data and tables
7. Fix i18n keys
8. Run verification

## Fast Resume Notes

- The public disease-view region refactor is already partially landed.
- The previous biggest break risk was missing i18n keys; those have been added.
- The app currently builds, but old consumer-plan vocabulary still exists in some account/dashboard/workspace copy and should be cleaned up next.
- A previous large patch for reporting, alerts, and account/dashboard surfaces failed and did not apply cleanly. Continue in small patches.
- There is no git repository available in this workspace, so use careful incremental edits.
