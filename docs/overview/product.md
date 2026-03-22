# Product Overview

Querencia is a hybrid livestock-health monitoring product with two layers:

- a public national awareness layer across bovine, porcine, and avian diseases
- a private operational layer for veterinary networks, starting with an avian pilot

## Product Model
- Public users browse animal type, disease, and region-level activity.
- Operational users monitor watch regions, review vetted reports, and act on trusted alerts.
- Public visibility is region-based, delayed when needed, and thresholded for anonymity.
- Operational reporting is confidential and restricted to verified veterinarians.

## Core Public Flow
1. Select an animal type.
2. Browse diseases linked to that animal.
3. Open a disease view.
4. Explore regional activity, timeline, public KPIs, and disease information.

## Core Operational Flow
1. Select a monitored region or watch area.
2. Review incoming veterinary reports and signal changes.
3. Classify reports by confidence.
4. Trigger alerts and operational follow-up from approved regional views.

## Supported Animal Types
- bovine
- porcine
- avian

## Operational First Scope
- avian only
- one high-priority avian disease family first
- one veterinary network first
- region-level monitoring only in v1

## Product Boundaries
- Not an individual diagnosis tool.
- Not an official government tracing system.
- Not a replacement for sanitary authorities.
- Not an open public rumor board.

## Differentiator
- Querencia creates a confidential reporting and review loop for veterinarians while exposing only region-level public intelligence.
- The product’s value is trusted coordination and controlled disclosure, not point-level mapping.

## Commercial Model
- Public awareness remains open access.
- Paid value sits in organization-level monitoring, review, alerting, and operational dashboards for veterinary networks.

## Language Model
- Product UX remains native in English and Spanish.
- Public and authenticated routes use `/en` and `/es`.
- Stable IDs, scientific identifiers, and aggregation keys remain language-neutral.
