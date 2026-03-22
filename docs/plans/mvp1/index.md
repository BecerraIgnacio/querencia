# MVP1 Backlog

## Goal
- Deliver the `Free` baseline: bilingual public exploration, public disease intelligence, and the minimum auth/account shell needed for plan-aware evolution.

## Phase Spine
- `M1-P01` shared base
- `M1-P02` public data
- `M1-P03` public web
- `M1-P04` auth and Free

## Runnable Leaf Backlog
| ID | Phase | Module | Status | Depends On |
| --- | --- | --- | --- | --- |
| `M1-001` | shared base | `packages/core-domain` | ready | `P-000` |
| `M1-002` | shared base | `packages/contracts` | blocked | `M1-001` |
| `M1-003` | public data | `services/pipeline` | blocked | `M1-001` |
| `M1-004` | public data | `services/pipeline` | blocked | `M1-002`, `M1-003` |
| `M1-005` | public web | `apps/web` | blocked | `M1-001` |
| `M1-006` | public web | `apps/web` | blocked | `M1-002`, `M1-005` |
| `M1-007` | public web | `apps/web` | blocked | `M1-002`, `M1-006` |
| `M1-008` | public web | `apps/web` | blocked | `M1-004`, `M1-007` |
| `M1-009` | auth/locale | `supabase` | blocked | `M1-001` |
| `M1-010` | auth/Free | `apps/web` | blocked | `M1-002`, `M1-009` |

## Rule
- Run only leaf IDs.
- Every web-facing leaf in MVP1 must preserve English and Spanish parity.
- Do not ask Claude to execute `M1-P01` or any milestone track directly.
