# MVP3 Backlog

## Goal
- Deliver the `Pro` milestone: multi-area monitoring, executive analytics, exports, and expanded disease coverage on top of `Plus`.

## Track
- `M3-T01` Pro analytics and exports

## Phase Spine
- `M3-P01` multi-area monitoring
- `M3-P02` Pro analytics
- `M3-P03` exports and catalog expansion

## Runnable Leaf Backlog
| ID | Phase | Module | Status | Depends On |
| --- | --- | --- | --- | --- |
| `M3-001` | multi-area monitoring | `supabase` | blocked | `M2-004`, `M2-008` |
| `M3-002` | multi-area monitoring | `apps/web` | blocked | `M3-001` |
| `M3-003` | Pro analytics | `services/pipeline` | blocked | `M2-007`, `M1-004` |
| `M3-004` | Pro analytics | `apps/web` | blocked | `M3-001`, `M3-003` |
| `M3-005` | exports and catalog expansion | `apps/web` | blocked | `M3-003`, `M3-004` |
| `M3-006` | exports and catalog expansion | `services/pipeline` | blocked | `M2-008`, `M1-003`, `M1-004` |

## Rule
- Run only leaf IDs.
- `Pro` surfaces must remain bilingual and clearly separated from `Plus`.
- Exports are practical CSV/basic downloads, not a full document-generation platform.
