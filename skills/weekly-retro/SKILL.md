---
name: weekly-retro
description: "Sunday strategic review. Re-evaluates each project's strategy, runs premise-challenge, decides whether to update current-strategy.md or escalate to Alex. The ONLY skill allowed to rewrite current-strategy.md."
metadata:
  openclaw:
    emoji: "@"
    always: true
---

# Weekly Retro

Runs every Sunday at 8am ET via cron. Use the strongest model available (Opus 4.7 if accessible, Sonnet 4.6 otherwise) with `xhigh` thinking. This is the most important hour of Rando's week.

## Prerequisites
- Read `/data/workspace/STRATEGY.md`
- Read each `/data/workspace/projects/<project>/north-star.md`, `current-strategy.md`, `experiments.md`, `blockers.md`, `kill-list.md`
- Read `/data/workspace/state/metrics.json` and `/data/workspace/state/red-team-log.json`

## The drill

### Step 1 — Per project: did the north-star metric move?
For each active project (skip any with PAUSED.md):
- Compute Δ in north-star metric since last week.
- If movement: log it under "wins" — what specific action(s) caused it?
- If no movement: log it under "stuck" — and run premise-challenge (Step 3) for this project.

### Step 2 — Aggregate the week's actions
- How many actions did Rando take across all projects this week?
- How many were on the highest-leverage project (the one most likely to move the needle)?
- What % of effort went to "execute" (sending, building, posting) vs "think" (strategy, retro, premise-challenge)?
- If "execute" >> "think" and metrics didn't move, that's a signal Rando was busy not effective.

### Step 3 — Run `premise-challenge` for any stuck project
See premise-challenge skill. Do NOT skip this step. The whole reason Rando didn't notice CalcLeap's strategy was broken for 35 cycles is that nobody ever forced a premise check.

### Step 4 — Decide: update strategy, escalate, or hold?
For each project, exactly one of:
- **HOLD**: strategy is working (north-star moved). Keep doing it. Update `current-strategy.md` with "still betting on X — confirmed by [evidence]."
- **PIVOT**: strategy is broken. Pick a new direction from `hypotheses.md` (untested) or propose a new one. Rewrite `current-strategy.md` with the new bet, the rationale, the leading indicators, and what we'll measure to know it's working in 30 days.
- **ESCALATE**: strategy is broken AND no clear next direction exists. Trigger `stuck-detector` → escalate to Alex with three options.

### Step 5 — Update kill-list for any newly-refuted hypotheses
If a hypothesis was tested and refuted this week, move it from `hypotheses.md` to `kill-list.md` with the evidence.

### Step 6 — Write the retro log
Append to `/data/workspace/projects/<project>/retro-log.md`:
```markdown
## YYYY-MM-DD retro

**North-star delta:** <was> → <now> (Δ <amount>)
**Wins:** <bullet list>
**Stuck on:** <bullet list>
**Premise-challenge result:** <verdict + critique>
**Decision:** HOLD / PIVOT / ESCALATE
**If PIVOT, new bet:** <one paragraph>
**Effort distribution:** <X% execute, Y% think>
```

### Step 7 — Cross-project allocation
After all per-project retros, decide for the coming week:
- Which project gets the bulk of strategic-cycle attention?
- Which project goes into pure-maintenance mode?
- Should any project be paused or killed entirely?

Write this decision to `/data/workspace/STRATEGY.md` under "This week's allocation."

### Step 8 — Send Alex a one-page summary
Telegram message to user 7768883665. Format:
```
📊 Weekly retro — <date>

CalcLeap: <HOLD/PIVOT/ESCALATE> — <one-line why>
Laser: <HOLD/PIVOT/ESCALATE> — <one-line why>

Premise-challenges this week: <count>
Refuted hypotheses moved to kill-list: <count>

This week's allocation: <which project gets most attention>

Anything you want me to change? (Reply or stay silent — I'll proceed with what I wrote.)
```

## Anti-patterns
- **Do NOT** mark a project as HOLD if the north-star is flat. That's how 35 cycles of nothing happened.
- **Do NOT** skip premise-challenge when you're tired or out of context. That's exactly when you need it most.
- **Do NOT** rewrite `current-strategy.md` outside of weekly-retro. It's the one source of truth for "what we believe right now."
