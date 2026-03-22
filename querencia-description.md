# Querencia

## Summary
Querencia is a web platform for livestock disease surveillance.

It helps users:
- choose an animal type
- explore diseases for that animal
- view disease activity on a map
- understand disease spread and impact
- track trends over time
- submit anonymous reports
- access advanced dashboards by plan

It is not:
- an individual animal diagnosis tool
- an official government tracing system
- a replacement for sanitary authorities

It is:
- a territorial monitoring platform
- a prevention and awareness tool
- a disease intelligence layer built on public data + anonymous user reports

## Languages
- The app is native in English and Spanish.
- Public and authenticated routes use `/en` and `/es`.
- Disease and educational content use one canonical record with separate English and Spanish user-facing fields.
- User-authored report text stays in the language it was entered and is not auto-translated.

## Core Idea
The product flow is:

1. Select animal type
2. See diseases for that animal
3. Select a disease
4. Open disease view with:
   - hex map
   - timeline
   - disease info
   - KPIs
   - dashboards based on plan

## Main Differentiator
Public reporting is anonymized through **hexagonal aggregation**.

Instead of showing exact farm coordinates:
- reports are assigned to hex cells
- public users only see aggregated area-level activity
- reporters are protected
- epidemiological value is preserved

## Animal Types
- bovine
- porcine
- avian

## Main Modules
- animal selection
- disease catalog by animal
- disease detail view
- hex-based map
- disease information panel
- anonymous report submission
- alerts
- analytics dashboards
- auth/account

## Disease View
Each disease page must include:
- map with hex cells
- color intensity by activity
- time filter / timeline
- public KPIs
- disease information
- premium/business analytics if enabled

## Disease Information Fields
- name
- summary
- affected species
- transmission method
- contagiousness level
- severity level
- general symptoms
- production impact
- notes
- source references

## Plans

### Free
Free tier for public users, students, and basic exploration.

Includes:
- animal -> disease flow
- public hex map
- basic timeline
- disease info
- public aggregated data

### Plus
For small/medium farmers and independent veterinarians.

Includes everything in Free, plus:
- saved watch areas
- alerts
- report submission
- basic dashboards
- trend views
- expanded history

### Pro
For agro companies, large veterinarians, and institutions.

Includes everything in Plus, plus:
- advanced dashboards
- multi-area monitoring
- executive views
- aggregated metrics
- exports
- critical-zone prioritization

## Privacy Rules
- never expose exact farm coordinates publicly
- never expose producer identity publicly
- never expose address/location text publicly
- use hex aggregation for public display
- apply minimum anonymity thresholds for low-volume cells

## Tech
- Next.js
- Supabase
- Google login via Supabase Auth
- OpenStreetMap + open-source map library
- H3 or equivalent for hex indexing

## Frontend Scope
- public exploration
- auth
- map
- disease pages
- dashboards
- report form
- account/plan page

## Backend Scope
- auth + authorization by plan
- public data ingestion
- normalization
- geocoding / region mapping
- hex assignment
- aggregations by time period
- KPI generation
- alerts
- report storage

## Core Entities
- AnimalType
- Disease
- AnimalDisease
- HexCell
- PublicOutbreakRecord
- UserReport
- HexAggregation
- Alert
- SubscriptionPlan
- UserProfile
- WatchArea

## Public API
- list animal types
- list diseases by animal
- get disease detail
- get aggregated map data by animal/disease/time range
- get public KPIs

## Auth API
- login / session
- get profile
- save watch area
- submit report
- list alerts
- get dashboards by plan
- update user settings

## Localization Rules
1. User-facing UI must ship in English and Spanish from the first complete delivery.
2. Browser/geo detection chooses `en` or `es`; if ambiguous, default to Spanish.
3. Stable IDs, scientific identifiers, and aggregation keys remain language-neutral.
4. Public/member APIs are keyed by stable IDs plus locale, not per-language entity copies.

## Internal/Admin Jobs
- import public datasets
- normalize disease/species/location fields
- assign data to hex cells
- recalculate aggregations
- recalculate trends
- refresh disease catalog
- run validation jobs

## Business Rules
1. Flow always starts with animal, then disease
2. A disease only appears for linked animal types
3. Public views never show exact private report coordinates
4. Hex color intensity depends on selected time range
5. Dashboards depend on subscription plan
6. Alerts are paid-tier only
7. Reports must store source + visibility type
8. Advanced metrics must come from aggregated data, not exact public points
9. System must support both public datasets and user reports
10. UI must distinguish official/public-imported/collaborative data

## Data Pipeline
1. Acquire public data (API / CSV / Excel / GeoJSON)
2. Normalize diseases, species, dates, locations
3. Georeference / map to area
4. Assign to hex cells
5. Aggregate by hex + time bucket
6. Expose data for maps and dashboards

## Minimum Screens
1. Landing
2. Animal selection
3. Disease list by animal
4. Disease main view with map
5. Google login
6. Report submission
7. Plus dashboard
8. Pro dashboard
9. Profile / plan

## Roadmap

### MVP 1
- auth
- animal types
- diseases by animal
- basic hex map
- public dataset ingestion
- disease info
- Free tier
- English and Spanish public core flow

### MVP 2
- user reports
- alerts
- Plus dashboard
- better timeline/history
- bilingual report and alert workflows

### MVP 3
- Pro dashboard
- watch areas
- exports
- more diseases
- better aggregations

### MVP 4
- advanced validation
- trend models
- expanded territorial analytics

## Short Build Prompt
Build HerdWatch as a Next.js + Supabase livestock disease surveillance platform. The main flow is animal -> disease -> hex map -> disease information. Use Google login with Supabase Auth. Use public data first. Preserve reporter privacy through hexagonal aggregation. Support free/basic/public exploration plus higher-tier dashboards, alerts, and watch areas. Build incrementally, starting with the core flow, then auth, then reports, dashboards, and alerts.
