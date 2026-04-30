---
name: project-router
description: "Picks the highest-leverage action across all active projects for the current cycle. Replaces 'just run HEARTBEAT.md top to bottom' with a project-aware router that respects PAUSED.md, allocations from STRATEGY.md, and stuck-detector escalations."
metadata:
  openclaw:
    emoji: ">"
    always: true
---

# Project Router

Used by the daily `strategic-cycle` cron and (in lighter form) by the heartbeat. Decides "what should I work on right now?" instead of "what's next on my checklist?"

## The drill

### Step 1 — List all projects
Scan `/data/workspace/projects/*/`. For each:
- Skip if `PAUSED.md` exists.
- Note the north-star metric.
- Note when `current-strategy.md` was last updated.

### Step 2 — Read `STRATEGY.md`
Top-level meta-strategy doc tells you:
- This week's primary project (set by weekly-retro)
- Maintenance-mode projects
- Any cross-project rules

### Step 3 — Pick the highest-leverage action
For the primary project, ask:
1. What is the single highest-leverage action that would move the north-star this cycle?
2. Is it on `current-strategy.md`'s active bet?
3. Is it on `kill-list.md`? If yes, REJECT and pick something else.
4. Has it been red-teamed? If no AND it's externally visible, run `red-team` first.

### Step 4 — If the primary project is stuck mid-strategy, fall back
If the primary project's strategy is in PIVOT-pending state (i.e., last weekly-retro said PIVOT but the new strategy isn't implemented yet), default to:
- Set up the leading-indicator measurement for the new bet
- DO NOT execute the old (refuted) strategy

### Step 5 — Output the action plan
Before doing anything, write to `/data/workspace/state/current-action.json`:
```json
{
  "cycle_started_at": "ISO-8601",
  "selected_project": "calcleap",
  "selected_action": "...",
  "rationale": "highest leverage because <X>",
  "is_on_current_strategy": true,
  "red_teamed": true,
  "estimated_effort_minutes": 30
}
```

### Step 6 — Execute
Now do the action. Use the appropriate skill (e.g., enhanced-research for research, content-builder for content, web-research for fact-finding).

### Step 7 — Log result
Append to `/data/workspace/state/cycle-log.json`:
```json
{
  "cycle_ended_at": "ISO-8601",
  "project": "calcleap",
  "action": "...",
  "outcome": "...",
  "north_star_delta": null,
  "lesson": "..."
}
```

## Hard rules
- **Never act on a project with PAUSED.md.** That's an explicit Alex-decision-required state.
- **Never act on something in kill-list.md.** Even if it "feels right." Even if "this time will be different."
- **Always check current-strategy.md before acting.** If the action isn't aligned with the current bet, you're either drifting (bad) or executing an unannounced pivot (worse — should be a retro decision).
- **Default to fewer, bigger actions.** Better to do one well-thought-out thing per cycle than five sloppy ones.
