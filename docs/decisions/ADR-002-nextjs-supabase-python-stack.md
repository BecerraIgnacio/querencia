# ADR-002: Next.js, Supabase, And Python Pipeline

## Status
- accepted

## Decision
- Use Next.js + TypeScript for the web app, Supabase for auth/data platform, and Python for ingestion and aggregation jobs.

## Why
- The product needs a modern web surface plus a strong ecosystem for data ingestion, normalization, and geospatial processing.

## Consequences
- Frontend plans default to the JS/TS plugin lane.
- Pipeline plans default to the Python/data-engineering plugin lane.

