"""Aggregation stage: hex records -> aggregated cells by hex + time bucket."""

from collections import defaultdict
from datetime import date, timedelta

from ..models.hex_record import HexRecord
from ..models.aggregated_cell import AggregatedCell
from ..models.taxonomy import TimeBucket, AnimalType
from .anonymity import should_suppress


def _bucket_start(d: date, bucket: TimeBucket) -> date:
    if bucket == TimeBucket.DAY:
        return d
    if bucket == TimeBucket.WEEK:
        return d - timedelta(days=d.weekday())
    if bucket == TimeBucket.MONTH:
        return d.replace(day=1)
    if bucket == TimeBucket.QUARTER:
        q_month = ((d.month - 1) // 3) * 3 + 1
        return d.replace(month=q_month, day=1)
    if bucket == TimeBucket.YEAR:
        return d.replace(month=1, day=1)
    return d


def _bucket_end(start: date, bucket: TimeBucket) -> date:
    if bucket == TimeBucket.DAY:
        return start
    if bucket == TimeBucket.WEEK:
        return start + timedelta(days=6)
    if bucket == TimeBucket.MONTH:
        # Last day of month
        if start.month == 12:
            return start.replace(month=12, day=31)
        return start.replace(month=start.month + 1, day=1) - timedelta(days=1)
    if bucket == TimeBucket.QUARTER:
        end_month = start.month + 2
        if end_month == 12:
            return start.replace(month=12, day=31)
        return start.replace(month=end_month + 1, day=1) - timedelta(days=1)
    if bucket == TimeBucket.YEAR:
        return start.replace(month=12, day=31)
    return start


def aggregate(
    records: list[HexRecord],
    bucket: TimeBucket = TimeBucket.MONTH,
) -> list[AggregatedCell]:
    """
    Group hex records by (hex_id, disease_key, animal_type, time_bucket_start)
    and produce aggregated cells. Cells below the anonymity threshold are marked
    suppressed.
    """
    GroupKey = tuple[str, str, AnimalType, date]
    groups: dict[GroupKey, list[HexRecord]] = defaultdict(list)

    for record in records:
        start = _bucket_start(record.reported_date, bucket)
        key: GroupKey = (record.hex_id, record.disease_key, record.animal_type, start)
        groups[key].append(record)

    # Compute max count for intensity normalization
    counts = [len(recs) for recs in groups.values()]
    max_count = max(counts, default=1)

    cells: list[AggregatedCell] = []
    for (hex_id, disease_key, animal_type, bucket_start), recs in groups.items():
        case_count = len(recs)
        suppressed = should_suppress(case_count)
        intensity = 0.0 if suppressed else case_count / max_count

        cells.append(
            AggregatedCell(
                hex_id=hex_id,
                disease_key=disease_key,
                animal_type=animal_type,
                time_bucket=bucket,
                bucket_start=bucket_start,
                bucket_end=_bucket_end(bucket_start, bucket),
                case_count=case_count,
                intensity=round(intensity, 4),
                suppressed=suppressed,
            )
        )

    return cells
