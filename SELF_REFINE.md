# Self-Refining System — CalcLeap Continuous Improvement Engine

## Architecture

Three JSON coordination files that agents read/write to create a closed-loop optimization system:

1. `/data/workspace/state/metrics.json` — Current performance numbers
2. `/data/workspace/state/experiments.json` — Active A/B tests and optimizations  
3. `/data/workspace/state/learnings.json` — What worked, what didn't, why

Every heartbeat cycle: MEASURE → ANALYZE → HYPOTHESIZE → EXECUTE → MEASURE AGAIN

## The Loop

```
┌─────────────────────────────────────────────┐
│                MEASURE                       │
│  Read metrics.json                          │
│  Check: indexed pages, traffic, revenue,    │
│  outreach responses, page quality scores    │
├─────────────────────────────────────────────┤
│                ANALYZE                       │
│  Compare to previous cycle                  │
│  What improved? What degraded? Why?         │
│  Read learnings.json for patterns           │
├─────────────────────────────────────────────┤
│              HYPOTHESIZE                     │
│  Generate 3 improvement hypotheses          │
│  Rank by (expected impact × confidence)     │
│  Pick top 1-2 to execute                    │
├─────────────────────────────────────────────┤
│                EXECUTE                       │
│  Implement the change                       │
│  Log to experiments.json with timestamp     │
│  Set success criteria + measurement date    │
├─────────────────────────────────────────────┤
│               EVALUATE                       │
│  After measurement period, check results    │
│  Write to learnings.json                    │
│  If positive → scale it. If negative → why? │
│  Feed back into next cycle                  │
└─────────────────────────────────────────────┘
```
