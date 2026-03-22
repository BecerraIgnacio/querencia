"""Tests for Pro-level executive metrics: prioritization, critical zones, snapshots."""

from datetime import date

from querencia_pipeline.modules.models.aggregated_cell import AggregatedCell
from querencia_pipeline.modules.models.executive_metric import (
    CriticalZone,
    DiseaseRanking,
    ExecutiveSnapshot,
)
from querencia_pipeline.modules.models.taxonomy import AnimalType, TimeBucket
from querencia_pipeline.modules.aggregation.prioritize import (
    compute_critical_zones,
    compute_disease_rankings,
)
from querencia_pipeline.modules.kpi_generation.executive_metrics import (
    generate_executive_snapshot,
)


def _cell(
    hex_id: str = "872830828ffffff",
    disease_key: str = "fmd",
    animal_type: AnimalType = AnimalType.BOVINE,
    time_bucket: TimeBucket = TimeBucket.MONTH,
    bucket_start: date = date(2024, 1, 1),
    bucket_end: date = date(2024, 1, 31),
    case_count: int = 10,
    intensity: float = 0.5,
    suppressed: bool = False,
) -> AggregatedCell:
    return AggregatedCell(
        hex_id=hex_id,
        disease_key=disease_key,
        animal_type=animal_type,
        time_bucket=time_bucket,
        bucket_start=bucket_start,
        bucket_end=bucket_end,
        case_count=case_count,
        intensity=intensity,
        suppressed=suppressed,
    )


# ---------------------------------------------------------------------------
# Disease ranking tests
# ---------------------------------------------------------------------------


class TestDiseaseRankings:
    def test_empty_cells(self):
        result = compute_disease_rankings([])
        assert result == {}

    def test_all_suppressed_cells(self):
        cells = [_cell(suppressed=True), _cell(suppressed=True, disease_key="asf")]
        result = compute_disease_rankings(cells)
        assert result == {}

    def test_single_disease(self):
        cells = [_cell(disease_key="fmd", case_count=10)]
        result = compute_disease_rankings(cells)
        assert AnimalType.BOVINE in result
        rankings = result[AnimalType.BOVINE]
        assert len(rankings) == 1
        assert rankings[0].disease_key == "fmd"
        assert rankings[0].rank == 1
        assert rankings[0].total_cases == 10

    def test_multiple_diseases_ranked_by_severity(self):
        cells = [
            _cell(disease_key="fmd", case_count=50, hex_id="hex_a", intensity=0.9),
            _cell(disease_key="fmd", case_count=30, hex_id="hex_b", intensity=0.7),
            _cell(disease_key="asf", case_count=10, hex_id="hex_c", intensity=0.3),
        ]
        result = compute_disease_rankings(cells)
        rankings = result[AnimalType.BOVINE]
        assert len(rankings) == 2
        assert rankings[0].disease_key == "fmd"
        assert rankings[1].disease_key == "asf"
        assert rankings[0].severity_score >= rankings[1].severity_score

    def test_rankings_sorted_descending(self):
        cells = [
            _cell(disease_key="d1", case_count=5, hex_id="h1"),
            _cell(disease_key="d2", case_count=20, hex_id="h2"),
            _cell(disease_key="d3", case_count=50, hex_id="h3"),
        ]
        result = compute_disease_rankings(cells)
        rankings = result[AnimalType.BOVINE]
        scores = [r.severity_score for r in rankings]
        assert scores == sorted(scores, reverse=True)
        assert rankings[0].rank == 1
        assert rankings[1].rank == 2
        assert rankings[2].rank == 3

    def test_multiple_animal_types(self):
        cells = [
            _cell(disease_key="fmd", animal_type=AnimalType.BOVINE, case_count=20),
            _cell(disease_key="asf", animal_type=AnimalType.PORCINE, case_count=30),
        ]
        result = compute_disease_rankings(cells)
        assert AnimalType.BOVINE in result
        assert AnimalType.PORCINE in result
        assert result[AnimalType.BOVINE][0].disease_key == "fmd"
        assert result[AnimalType.PORCINE][0].disease_key == "asf"

    def test_top_n_limits_output(self):
        cells = [
            _cell(disease_key=f"d{i}", case_count=(i + 1) * 10, hex_id=f"h{i}")
            for i in range(10)
        ]
        result = compute_disease_rankings(cells, top_n=3)
        assert len(result[AnimalType.BOVINE]) == 3

    def test_velocity_with_previous_cells(self):
        current = [_cell(disease_key="fmd", case_count=20)]
        previous = [_cell(disease_key="fmd", case_count=10)]
        result = compute_disease_rankings(current, previous_cells=previous)
        ranking = result[AnimalType.BOVINE][0]
        # velocity = (20 - 10) / 10 = 1.0
        assert ranking.velocity == 1.0

    def test_velocity_without_previous_cells(self):
        current = [_cell(disease_key="fmd", case_count=20)]
        result = compute_disease_rankings(current, previous_cells=None)
        ranking = result[AnimalType.BOVINE][0]
        assert ranking.velocity == 0.0

    def test_velocity_negative(self):
        current = [_cell(disease_key="fmd", case_count=5)]
        previous = [_cell(disease_key="fmd", case_count=20)]
        result = compute_disease_rankings(current, previous_cells=previous)
        ranking = result[AnimalType.BOVINE][0]
        # velocity = (5 - 20) / 20 = -0.75
        assert ranking.velocity == -0.75

    def test_suppressed_cells_excluded_from_ranking(self):
        cells = [
            _cell(disease_key="fmd", case_count=20, suppressed=False),
            _cell(disease_key="asf", case_count=100, suppressed=True),
        ]
        result = compute_disease_rankings(cells)
        rankings = result[AnimalType.BOVINE]
        assert len(rankings) == 1
        assert rankings[0].disease_key == "fmd"

    def test_severity_score_bounded(self):
        cells = [
            _cell(disease_key="fmd", case_count=100, hex_id="h1"),
            _cell(disease_key="fmd", case_count=100, hex_id="h2"),
        ]
        previous = [_cell(disease_key="fmd", case_count=1)]
        result = compute_disease_rankings(cells, previous_cells=previous)
        ranking = result[AnimalType.BOVINE][0]
        assert 0.0 <= ranking.severity_score <= 1.0

    def test_language_neutral_keys(self):
        cells = [_cell(disease_key="fmd")]
        result = compute_disease_rankings(cells)
        ranking = result[AnimalType.BOVINE][0]
        # disease_key and animal_type must be language-neutral identifiers
        assert ranking.disease_key == "fmd"
        assert ranking.animal_type == AnimalType.BOVINE


# ---------------------------------------------------------------------------
# Critical zone tests
# ---------------------------------------------------------------------------


class TestCriticalZones:
    def test_empty_cells(self):
        result = compute_critical_zones([])
        assert result == []

    def test_all_suppressed(self):
        cells = [_cell(suppressed=True), _cell(suppressed=True, hex_id="h2")]
        result = compute_critical_zones(cells)
        assert result == []

    def test_ranked_by_intensity_descending(self):
        cells = [
            _cell(hex_id="h1", intensity=0.3, case_count=5),
            _cell(hex_id="h2", intensity=0.9, case_count=15),
            _cell(hex_id="h3", intensity=0.6, case_count=10),
        ]
        zones = compute_critical_zones(cells)
        assert len(zones) == 3
        assert zones[0].hex_id == "h2"
        assert zones[1].hex_id == "h3"
        assert zones[2].hex_id == "h1"
        assert zones[0].rank == 1
        assert zones[1].rank == 2
        assert zones[2].rank == 3

    def test_tiebreak_by_case_count(self):
        cells = [
            _cell(hex_id="h1", intensity=0.8, case_count=5),
            _cell(hex_id="h2", intensity=0.8, case_count=20),
        ]
        zones = compute_critical_zones(cells)
        assert zones[0].hex_id == "h2"
        assert zones[1].hex_id == "h1"

    def test_hotspot_threshold(self):
        cells = [
            _cell(hex_id="h1", intensity=0.9),
            _cell(hex_id="h2", intensity=0.7),
            _cell(hex_id="h3", intensity=0.5),
        ]
        zones = compute_critical_zones(cells, hotspot_threshold=0.7)
        assert zones[0].is_hotspot is True  # 0.9 >= 0.7
        assert zones[1].is_hotspot is True  # 0.7 >= 0.7
        assert zones[2].is_hotspot is False  # 0.5 < 0.7

    def test_top_n_limits_output(self):
        cells = [_cell(hex_id=f"h{i}", intensity=i * 0.1) for i in range(1, 8)]
        zones = compute_critical_zones(cells, top_n=3)
        assert len(zones) == 3

    def test_custom_hotspot_threshold(self):
        cells = [_cell(hex_id="h1", intensity=0.5)]
        zones = compute_critical_zones(cells, hotspot_threshold=0.3)
        assert zones[0].is_hotspot is True

    def test_suppressed_excluded(self):
        cells = [
            _cell(hex_id="h1", intensity=1.0, suppressed=True),
            _cell(hex_id="h2", intensity=0.4, suppressed=False),
        ]
        zones = compute_critical_zones(cells)
        assert len(zones) == 1
        assert zones[0].hex_id == "h2"


# ---------------------------------------------------------------------------
# Executive snapshot tests
# ---------------------------------------------------------------------------


class TestExecutiveSnapshot:
    def test_empty_cells(self):
        result = generate_executive_snapshot([])
        assert result == []

    def test_all_suppressed(self):
        cells = [_cell(suppressed=True)]
        result = generate_executive_snapshot(cells)
        assert result == []

    def test_single_animal_type(self):
        cells = [
            _cell(disease_key="fmd", hex_id="h1", case_count=10, intensity=0.5),
            _cell(disease_key="fmd", hex_id="h2", case_count=20, intensity=0.8),
            _cell(disease_key="asf", hex_id="h3", case_count=5, intensity=0.3),
        ]
        snapshots = generate_executive_snapshot(cells)
        assert len(snapshots) == 1
        snap = snapshots[0]
        assert snap.animal_type == AnimalType.BOVINE
        assert snap.total_diseases_active == 2
        assert snap.total_cases == 35
        assert snap.total_affected_hex == 3

    def test_multi_animal_type(self):
        cells = [
            _cell(disease_key="fmd", animal_type=AnimalType.BOVINE, case_count=10),
            _cell(disease_key="asf", animal_type=AnimalType.PORCINE, case_count=20),
        ]
        snapshots = generate_executive_snapshot(cells)
        assert len(snapshots) == 2
        types = {s.animal_type for s in snapshots}
        assert AnimalType.BOVINE in types
        assert AnimalType.PORCINE in types

    def test_filter_by_animal_type(self):
        cells = [
            _cell(disease_key="fmd", animal_type=AnimalType.BOVINE),
            _cell(disease_key="asf", animal_type=AnimalType.PORCINE),
        ]
        snapshots = generate_executive_snapshot(cells, animal_type=AnimalType.BOVINE)
        assert len(snapshots) == 1
        assert snapshots[0].animal_type == AnimalType.BOVINE

    def test_filter_by_bucket(self):
        cells = [
            _cell(time_bucket=TimeBucket.MONTH),
            _cell(time_bucket=TimeBucket.WEEK),
        ]
        snapshots = generate_executive_snapshot(cells, bucket=TimeBucket.MONTH)
        assert len(snapshots) == 1

    def test_overall_trend_up(self):
        current = [_cell(case_count=100)]
        previous = [_cell(case_count=10)]
        snapshots = generate_executive_snapshot(current, previous_cells=previous)
        assert snapshots[0].overall_trend == "up"

    def test_overall_trend_down(self):
        current = [_cell(case_count=5)]
        previous = [_cell(case_count=100)]
        snapshots = generate_executive_snapshot(current, previous_cells=previous)
        assert snapshots[0].overall_trend == "down"

    def test_overall_trend_stable_no_previous(self):
        current = [_cell(case_count=50)]
        snapshots = generate_executive_snapshot(current, previous_cells=None)
        assert snapshots[0].overall_trend == "stable"

    def test_top_diseases_present(self):
        cells = [
            _cell(disease_key="fmd", case_count=50, hex_id="h1"),
            _cell(disease_key="asf", case_count=20, hex_id="h2"),
        ]
        snapshots = generate_executive_snapshot(cells, top_diseases=5)
        assert len(snapshots[0].top_diseases) == 2
        assert snapshots[0].top_diseases[0].rank == 1

    def test_critical_zones_present(self):
        cells = [
            _cell(hex_id="h1", intensity=0.9, case_count=30),
            _cell(hex_id="h2", intensity=0.4, case_count=10),
        ]
        snapshots = generate_executive_snapshot(cells, top_zones=5)
        assert len(snapshots[0].critical_zones) >= 1
        assert snapshots[0].critical_zones[0].intensity >= snapshots[0].critical_zones[1].intensity

    def test_language_neutral_output(self):
        cells = [_cell(disease_key="fmd")]
        snapshots = generate_executive_snapshot(cells)
        snap = snapshots[0]
        # All keys must be language-neutral enums or plain identifiers
        assert snap.animal_type == AnimalType.BOVINE
        assert snap.time_bucket == TimeBucket.MONTH
        assert snap.overall_trend in ("up", "down", "stable")
        for d in snap.top_diseases:
            assert isinstance(d.disease_key, str)
            assert isinstance(d.animal_type, AnimalType)
        for z in snap.critical_zones:
            assert isinstance(z.disease_key, str)
            assert isinstance(z.animal_type, AnimalType)

    def test_bucket_date_range(self):
        cells = [
            _cell(bucket_start=date(2024, 1, 1), bucket_end=date(2024, 1, 31)),
            _cell(
                bucket_start=date(2024, 1, 1),
                bucket_end=date(2024, 1, 31),
                hex_id="h2",
            ),
        ]
        snapshots = generate_executive_snapshot(cells)
        assert snapshots[0].bucket_start == date(2024, 1, 1)
        assert snapshots[0].bucket_end == date(2024, 1, 31)
