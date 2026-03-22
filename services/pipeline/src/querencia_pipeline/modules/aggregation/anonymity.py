"""Privacy enforcement: suppress cells below anonymity threshold."""

MIN_ANONYMITY_THRESHOLD = 3


def should_suppress(case_count: int) -> bool:
    """Return True if the cell should be suppressed for privacy."""
    return case_count < MIN_ANONYMITY_THRESHOLD
