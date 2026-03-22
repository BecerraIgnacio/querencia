# Execution Roadmap

This is the operator-facing roadmap for rebuilding Querencia around the regional public-awareness model and the vet-only operational pilot.

Use this file when you want to know:
- the exact build order
- what each step will implement
- what each step must not implement
- what becomes available after each step

## How To Use This Roadmap
1. Check the next ready plan with `./scripts/list-runnable-plans.sh --ready`.
2. Load its context with `./scripts/plan-context.sh M1-001` or the next ready leaf ID.
3. Run Claude with `develop #<leaf-id>`.
4. Stop at the plan's stop conditions.
5. Mark the plan completed and update `docs/state/current.md`.
6. Return here to pick the next unblocked step.

## Strategy Reset
- The previous `M1` through `M4` roadmap is now legacy reference material.
- The active product model is regional public intelligence plus a private veterinary-network pilot.
- Historical milestone docs remain on disk for traceability, but they no longer define the active build order.

## Current Execution Rule
- Only leaf plans are executable.
- Phase docs and track docs are never executable.
- `P-000` remains the runtime baseline.

## Recommended Serial Build Order

### R1: Strategy Reset And Contract Rewrite
| Order | Plan | Implements | Stops Before |
| --- | --- | --- | --- |
| 1 | `R1-001` | product overview, domain docs, ADR reset, legacy roadmap handoff | contracts, schema |
| 2 | `R1-002` | shared domain vocabulary for regions, access tiers, vet reporting | web and pipeline behavior |
| 3 | `R1-003` | public/member contract rewrite for region activity and confidence states | handlers, RLS |

### R2: Public Regional Awareness Layer
| Order | Plan | Implements | Stops Before |
| --- | --- | --- | --- |
| 4 | `R2-001` | national public animal and disease discovery across bovine, porcine, avian | operational pilot UI |
| 5 | `R2-002` | region-level disease activity views, public KPIs, and source labeling | private reporting |
| 6 | `R2-003` | regional aggregation and public-suppression rules in the pipeline | operational alerts |

### R3: Avian Operational Pilot
| Order | Plan | Implements | Stops Before |
| --- | --- | --- | --- |
| 7 | `R3-001` | network access tiers, profile fields, and vet verification state | report intake |
| 8 | `R3-002` | confidential avian veterinary report intake and review queue | alerting |
| 9 | `R3-003` | region-based watch areas and operational alert center | coordinator dashboards |

### R4: Validation, Alerts, And Reconciliation
| Order | Plan | Implements | Stops Before |
| --- | --- | --- | --- |
| 10 | `R4-001` | confidence-state transitions, review actions, and source reconciliation | exports |
| 11 | `R4-002` | alert evaluation from approved regional views | multi-species ops |
| 12 | `R4-003` | coordinator dashboards, exports, and regional prioritization | species expansion |

### R5: Operational Expansion
| Order | Plan | Implements | Stops Before |
| --- | --- | --- | --- |
| 13 | `R5-001` | extend operational workflows from avian to a second species | additional analytics |
| 14 | `R5-002` | strengthen public and operational cross-source trend analytics | forecasting work |

## Recommended Parallel Opportunities
- After `R1-001`, run `R1-002` and `R1-003` in parallel.
- After `R2-001`, run public web work and pipeline regional aggregation in parallel.
- `R3-001` can run in parallel with `R2-003` because one stabilizes access and the other stabilizes public aggregates.
- `R4-001` and `R4-002` can run in parallel once avian reporting intake is stable.

## Phase Exit Markers
- `R1` is complete when product docs, ADRs, shared contracts, and access vocabulary match the new regional model.
- `R2` is complete when public users can browse all three species with region-based public activity only.
- `R3` is complete when verified veterinarians can submit and monitor avian signals within one network.
- `R4` is complete when review, alerting, and reconciliation are operating from approved regional views.
- `R5` is complete when operational workflows extend beyond avian.
