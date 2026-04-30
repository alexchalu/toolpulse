# Heartbeat (v2 — 2026-04-19)

> The heartbeat is for ROUTINE MAINTENANCE only. Strategy lives in the strategic-cycle (daily 7am ET).
> Run on free model (Gemini Flash). Stay short. Stay silent unless something is broken or measured.

## Phase 0 — Self-check (every cycle, ~30s)

1. Read `STRATEGY.md` — am I aligned with this week's allocation?
2. List projects and check for `PAUSED.md`. Skip any paused project.
3. Glance at `state/cycle-log.json` — what was the last strategic-cycle outcome?
4. If today is Sunday and weekly-retro hasn't run yet, escalate to Alex (cron may be broken).

## Phase 1 — Site & infra health (~2 min)

For each live property the user cares about:

### CalcLeap (calcleap.com)
- `curl -s -o /dev/null -w "%{http_code}\n" https://calcleap.com/` — must return 200.
- If broken: page Alex on Telegram immediately.

### Rando self
- `free -h` — RAM check. If <500MB free, log a warning.
- Check `cron` jobs ran successfully in last 24h. If `strategic-cycle` or `weekly-retro` failed, message Alex.
- Check Anthropic API status if last strategic-cycle errored on auth.

### Laser (laser-family-office)
- Healthcheck the dashboard URL (Vercel + Railway). 200 OK = silent.
- If broken: page Alex.

## Phase 2 — Metrics snapshot (~1 min)

Update `/data/workspace/state/metrics.json` with current:
- CalcLeap: indexed pages count, traffic 14d, gumroad sales
- Laser: dashboard logins last 7d (if instrumented)

That's it. Do NOT analyze. Strategic-cycle reads these tomorrow morning and decides what to do.

## Phase 3 — Stuck check (~30s)

For each project, if north-star metric hasn't moved in 14 days AND no `PAUSED.md` exists AND `stuck-detections.json` doesn't have an entry for today, invoke `stuck-detector` skill.

## Phase 4 — Memory consolidation (~1 min)

- Write today's date file in `memory/YYYY-MM-DD.md` if not exists; append any notable events.
- DO NOT rewrite long-term memory. That's a strategic-cycle job.

## Phase 5 — Report (silent unless...)

Send Telegram to Alex ONLY if:
- A site is broken
- Revenue arrived (any amount)
- A cron failed
- The stuck-detector escalated (it sends its own message — don't double-send)
- An incoming message is waiting

Otherwise: stay silent.

---

## What the heartbeat is NOT
- ❌ Running outreach campaigns (gated by red-team)
- ❌ Building content (gated by red-team + strategic-cycle)
- ❌ Reading project strategies and "thinking about what to do" (that's strategic-cycle's job)
- ❌ Sending Telegram digests every 4h "just to show I'm alive"
- ❌ Reflecting on strategy (weekly-retro)

The heartbeat is the equivalent of a janitor's nightly walk. Lights still on, doors locked, alarm armed. Don't redesign the building.
