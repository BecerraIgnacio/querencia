# MVP4 Backlog

## Goal
- Deliver advanced validation, reconciliation, heuristic trend intelligence, and territorial evolution analytics on top of `Pro`.

## Track
- `M4-T01` validation and trend intelligence

## Phase Spine
- `M4-P01` validation and quality
- `M4-P02` trend intelligence

## Runnable Leaf Backlog
| ID | Phase | Module | Status | Depends On |
| --- | --- | --- | --- | --- |
| `M4-001` | validation and quality | `services/pipeline` | blocked | `M3-006`, `M2-003` |
| `M4-002` | validation and quality | `services/pipeline` | blocked | `M4-001`, `M2-003` |
| `M4-003` | trend intelligence | `services/pipeline` | blocked | `M3-003`, `M4-001` |
| `M4-004` | trend intelligence | `services/pipeline` | blocked | `M3-003`, `M4-002` |
| `M4-005` | trend intelligence | `apps/web` | blocked | `M4-003`, `M4-004`, `M3-004` |

## Rule
- Run only leaf IDs.
- Keep M4 practical: heuristic scoring and forecasting, not a full ML platform.
- Advanced analytics surfaces remain bilingual and Pro-scoped.
