---
name: stuck-detector
description: "Daily check — detect when a project's north-star metric has gone flat for too long, and force escalation to Alex instead of silent grinding. The single most important loop-breaker in Rando's architecture."
metadata:
  openclaw:
    emoji: "!"
    always: true
---

# Stuck Detector

You are running this skill because the daily `stuck-detector` cron fired, OR you self-invoked because something feels off.

## Why this exists
Before this skill existed, Rando ran 35 heartbeat cycles, sent 825 outreach emails, and produced $0 revenue and 0 traffic on CalcLeap — without ever escalating to Alex that the strategy might be fundamentally wrong. The architecture had no mechanism to recognize "we are not making progress." This skill is that mechanism.

## What to do

### Step 1 — Read every project's north-star and metrics
For each folder in `/data/workspace/projects/*/`:
- Read `north-star.md` — what's the metric we're watching?
- Read `current-strategy.md` — when was it last updated?
- Pull current value of the north-star metric from `/data/workspace/state/metrics.json` or from a fresh measurement.

### Step 2 — Check the "hard rule" in each `north-star.md`
Each north-star.md contains an explicit "Hard rule" section like:
> If MRR has not moved in 14 days, escalate to Alex with three alternative directions.

If the hard rule is triggered, proceed to Step 3. If not, log "OK" and exit silently.

### Step 3 — Generate three alternative directions
For each stuck project, do NOT propose "let's grind harder." Instead:
1. Re-read `hypotheses.md` and `kill-list.md`. What's untested? What's been tried and failed?
2. Read `experiments.md` to understand what evidence we have.
3. Spawn a subagent (use Haiku 4.5) with this prompt:
   > "Project [X] has a stuck north-star metric. Here is the strategy, the kill-list, and the experiment log: [paste]. Propose THREE materially different directions the project could take. Each must be:
   > - genuinely different from what's already on the kill-list
   > - testable within 30 days
   > - have a clear leading indicator
   > Output as numbered list with: direction name, one-paragraph rationale, leading indicator, 30-day cost estimate."

### Step 4 — Escalate to Alex via Telegram
Send a message to Alex (user 7768883665) with the format:

```
🚨 Stuck-detector escalation: <project>

North-star: <metric>
Current: <value>
Last movement: <N days ago>

I've been doing the same thing without progress. Strategy needs your call.

Three directions I propose:
1. <direction> — <one-line rationale>
2. <direction> — <one-line rationale>
3. <direction> — <one-line rationale>

Reply with 1, 2, 3, or "other: <your idea>". Until you reply, I will pause work on this project.
```

### Step 5 — Pause the project
Until Alex replies, write `/data/workspace/projects/<project>/PAUSED.md` containing:
- Date paused
- Reason (stuck-detector trigger, with metric values)
- What I'm waiting for (Alex's choice of direction)

The `project-router` skill MUST skip any project with a PAUSED.md file when picking the day's action.

### Step 6 — Log it
Append to `/data/workspace/state/stuck-detections.json`:
```json
{
  "date": "YYYY-MM-DD",
  "project": "calcleap",
  "metric": "MRR",
  "current_value": 0,
  "days_flat": 27,
  "directions_proposed": ["...", "...", "..."],
  "alex_response": null
}
```

## Anti-patterns

- **Do NOT** "give it one more cycle." If the rule says 14 days, 14 days is the line.
- **Do NOT** propose a fourth direction that is "do exactly what we were doing." That defeats the purpose.
- **Do NOT** auto-pick a direction without Alex's input. The whole point is that Rando alone cannot judge premise failure — Alex must.
- **Do NOT** spam Alex daily once a project is paused. Send the escalation once, then wait silently.
