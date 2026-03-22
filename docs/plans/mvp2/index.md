# MVP2 Backlog

## Goal
- Deliver the `Plus` milestone: bilingual reporting, watch areas, alerts, and paid trend dashboards built on the `Free` baseline.

## Track
- `M2-T01` Plus reporting and alerts

## Phase Spine
- `M2-P01` reporting
- `M2-P02` watch areas and alerts
- `M2-P03` Plus dashboards

## Runnable Leaf Backlog
| ID | Phase | Module | Status | Depends On |
| --- | --- | --- | --- | --- |
| `M2-001` | reporting | `supabase` | blocked | `M1-002`, `M1-009`, `M1-010` |
| `M2-002` | reporting | `apps/web` | blocked | `M2-001` |
| `M2-003` | reporting | `services/pipeline` | blocked | `M2-001`, `M1-004` |
| `M2-004` | watch areas and alerts | `supabase` | blocked | `M1-009`, `M1-010` |
| `M2-005` | watch areas and alerts | `supabase` | blocked | `M2-003`, `M2-004` |
| `M2-006` | watch areas and alerts | `apps/web` | blocked | `M2-005`, `M1-010` |
| `M2-007` | Plus dashboards | `services/pipeline` | blocked | `M1-004`, `M2-003` |
| `M2-008` | Plus dashboards | `apps/web` | blocked | `M2-004`, `M2-007`, `M1-010` |

## Rule
- Run only leaf IDs.
- Reporting, alert, and dashboard UI must preserve English and Spanish parity.
- `Plus` plans may extend `Free`, but must not redesign the core public flow.
