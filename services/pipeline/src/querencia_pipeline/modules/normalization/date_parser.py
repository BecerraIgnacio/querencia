"""Parse raw date strings into Python date objects."""

from datetime import date
import re

_DATE_FORMATS = [
    "%Y-%m-%d",
    "%d/%m/%Y",
    "%m/%d/%Y",
    "%d-%m-%Y",
    "%Y/%m/%d",
    "%d.%m.%Y",
]


def parse_date(raw_date: str) -> date | None:
    """Attempt to parse a raw date string into a date object."""
    if not raw_date:
        return None

    raw_date = raw_date.strip()

    for fmt in _DATE_FORMATS:
        try:
            from datetime import datetime
            return datetime.strptime(raw_date, fmt).date()
        except ValueError:
            continue

    # Try ISO 8601 with time component
    try:
        return date.fromisoformat(raw_date[:10])
    except ValueError:
        pass

    return None
