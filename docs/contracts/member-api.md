# Member API Contract

## Authenticated Endpoints
- login/session
- get profile
- save watch region
- submit veterinary report
- list review queue
- classify report
- list alerts
- get operational dashboards by access tier
- update user settings

## Contract Rules
- Entitlements are access-tier-aware.
- Profile and settings payloads include `preferredLocale`.
- Report submission stores source, region, network, and confidence metadata.
- User-authored free text keeps its original language metadata when present.
- Dashboard responses are filtered by access tier and role.
- Only verified veterinarians may create signal-bearing reports.
