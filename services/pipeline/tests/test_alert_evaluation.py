"""Tests for alert evaluation logic."""

from datetime import date

from querencia_pipeline.modules.alert_evaluation.evaluate import (
    AlertCandidate,
    WatchAreaSpec,
    classify_severity,
    evaluate_alerts,
)
from querencia_pipeline.modules.models.aggregated_cell import AggregatedCell
from querencia_pipeline.modules.models.taxonomy import AnimalType, TimeBucket


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _make_cell(
    hex_id: str = "abc123",
    disease_key: str = "fmd",
    animal_type: AnimalType = AnimalType.BOVINE,
    case_count: int = 10,
    intensity: float = 0.5,
    suppressed: bool = False,
) -> AggregatedCell:
    return AggregatedCell(
        hex_id=hex_id,
        disease_key=disease_key,
        animal_type=animal_type,
        time_bucket=TimeBucket.WEEK,
        bucket_start=date(2026, 1, 1),
        bucket_end=date(2026, 1, 7),
        case_count=case_count,
        intensity=intensity,
        suppressed=suppressed,
    )


def _make_watch_area(
    wa_id: str = "wa-1",
    user_id: str = "user-1",
    animal_types: list[str] | None = None,
    hex_cell_ids: list[str] | None = None,
    is_active: bool = True,
) -> WatchAreaSpec:
    return WatchAreaSpec(
        id=wa_id,
        user_id=user_id,
        label="Test area",
        animal_types=animal_types or ["bovine"],
        hex_cell_ids=hex_cell_ids or ["abc123"],
        is_active=is_active,
    )


# ---------------------------------------------------------------------------
# Tests
# ---------------------------------------------------------------------------

def test_no_alerts_when_no_watch_areas():
    cells = [_make_cell()]
    result = evaluate_alerts(cells, [])
    assert result == []


def test_no_alerts_when_cells_suppressed():
    cells = [_make_cell(suppressed=True)]
    watch_areas = [_make_watch_area()]
    result = evaluate_alerts(cells, watch_areas)
    assert result == []


def test_alert_generated_for_matching_cell():
    cells = [_make_cell(hex_id="hex-a", intensity=0.5)]
    watch_areas = [_make_watch_area(hex_cell_ids=["hex-a"])]

    result = evaluate_alerts(cells, watch_areas)

    assert len(result) == 1
    alert = result[0]
    assert isinstance(alert, AlertCandidate)
    assert alert.user_id == "user-1"
    assert alert.watch_area_id == "wa-1"
    assert alert.disease_id == "fmd"
    assert alert.animal_type == "bovine"
    assert alert.severity == "medium"
    assert alert.hex_cell_id == "hex-a"


def test_no_alert_for_wrong_animal_type():
    cells = [_make_cell(animal_type=AnimalType.AVIAN)]
    watch_areas = [_make_watch_area(animal_types=["bovine"])]

    result = evaluate_alerts(cells, watch_areas)
    assert result == []


def test_no_alert_for_unwatched_hex():
    cells = [_make_cell(hex_id="hex-other")]
    watch_areas = [_make_watch_area(hex_cell_ids=["hex-mine"])]

    result = evaluate_alerts(cells, watch_areas)
    assert result == []


def test_inactive_watch_area_skipped():
    cells = [_make_cell()]
    watch_areas = [_make_watch_area(is_active=False)]

    result = evaluate_alerts(cells, watch_areas)
    assert result == []


def test_severity_classification():
    assert classify_severity(0.0) == "low"
    assert classify_severity(0.09) == "low"
    assert classify_severity(0.1) == "low"
    assert classify_severity(0.29) == "low"
    assert classify_severity(0.3) == "medium"
    assert classify_severity(0.59) == "medium"
    assert classify_severity(0.6) == "high"
    assert classify_severity(0.84) == "high"
    assert classify_severity(0.85) == "critical"
    assert classify_severity(1.0) == "critical"


def test_bilingual_titles_and_messages():
    cells = [_make_cell(hex_id="hex-b", intensity=0.7, case_count=15)]
    watch_areas = [_make_watch_area(hex_cell_ids=["hex-b"])]

    result = evaluate_alerts(cells, watch_areas)
    assert len(result) == 1
    alert = result[0]

    # English title and message
    assert "High alert" in alert.title_en
    assert "fmd" in alert.title_en
    assert "15 cases" in alert.message_en
    assert "hex-b" in alert.message_en
    assert "70%" in alert.message_en

    # Spanish title and message
    assert "Alerta Alta" in alert.title_es
    assert "fmd" in alert.title_es
    assert "15 casos" in alert.message_es
    assert "hex-b" in alert.message_es
    assert "70%" in alert.message_es
