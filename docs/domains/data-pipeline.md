# Data Pipeline

## Stages
1. acquire public data
2. normalize disease, species, dates, sources, and locations
3. georeference records
4. map records to administrative regions
5. aggregate by region and time bucket
6. derive KPIs, source mixes, and operational dashboard inputs

## Pipeline Modules
- `public_ingestion`
- `normalization`
- `geocoding`
- `region_mapping`
- `aggregation`
- `kpi_generation`
- `validation`

## Constraints
- The pipeline must support imported public data, verified veterinary reports, and public-source intelligence.
- Privacy rules apply before any public-facing output is materialized.
- Taxonomy keys remain language-neutral even when downstream contracts expose English and Spanish labels.
- Region-level public outputs may be delayed or suppressed to preserve anonymity.
