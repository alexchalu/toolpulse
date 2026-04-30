---
name: strategic-cycle
description: "Daily strategic-thinking cycle. Runs once per day via cron with the strongest model + xhigh thinking. Reads project state, runs project-router, executes the highest-leverage action with care. Distinct from heartbeat (which is routine maintenance)."
metadata:
  openclaw:
    emoji: "$"
    always: true
---

# Strategic Cycle

Runs once daily via cron at 7am ET. Uses Claude Sonnet 4.6 (or Opus 4.7 if available) with `xhigh` thinking. Budget: up to 30 minutes of model time.

This is where Rando does his actual thinking. The 4-hour heartbeat does maintenance. This cycle does strategy.

## The drill

### Step 1 — Boot context
Read in order:
1. `/data/workspace/STRATEGY.md` — top-level meta-strategy
2. `/data/workspace/projects/INDEX.md` — project list
3. For the project flagged as "this week's primary":
   - `north-star.md`, `current-strategy.md`, `blockers.md`, `experiments.md`, `kill-list.md`

### Step 2 — Pre-flight checks (mandatory)
- Has `stuck-detector` flagged this project? If yes, do not execute — wait for Alex's reply.
- Has `weekly-retro` PIVOT-ed the strategy in the last 7 days? If yes, the cycle's job today is to **set up measurement for the new bet**, not to "do something productive" on the old plan.
- Is the planned action on `kill-list.md`? Hard stop.

### Step 3 — Use `project-router` to pick the action
See project-router skill. Output: one specific, leverage-justified action.

### Step 4 — Red-team the action (if externally visible)
See red-team skill. If verdict is "kill" or "pilot first," respect it.

### Step 5 — Execute
Use whichever skill is appropriate (enhanced-research, web-research, content-builder, github-manager, email-drafter, etc.). Use full thinking budget. Do NOT delegate the core thinking to a subagent — delegate sub-tasks (research lookups, fact-checks, formatting) but hold the strategic frame yourself.

### Step 6 — Reflexion (mandatory)
After execution, run the `reflexion` skill against this cycle's work. Save reflection to `/data/workspace/memory/reflections/YYYY-MM-DD-strategic-cycle.md`.

### Step 7 — Log outcome
Append to `/data/workspace/state/cycle-log.json` (project-router does this for you).

### Step 8 — Decide if next cycle should be different
If the action's outcome surprised you (good or bad), flag the relevant project's `current-strategy.md` for review at the next weekly-retro. Don't change strategy mid-week — flag and wait.

## What this cycle is NOT for
- Routine site health checks → that's the heartbeat
- Bug fixes → that's the heartbeat or PRIORITY-BUGS.md
- Email drafting templates → that's a per-need action triggered by the strategic cycle, not the strategic cycle itself
- "Catching up on memory" → memory is built passively via session-memory hook

## Model usage
Strategic cycle MUST use a frontier model:
- 1st choice: `anthropic/claude-opus-4-7` (if available in the agent's model list)
- 2nd: `anthropic/claude-sonnet-4-6`
- 3rd: `groq/openai/gpt-oss-120b` (free; weaker but better than nothing)

Set `thinking: "xhigh"` for this cycle regardless of the global default.

## Output discipline
At the end of every strategic cycle, write a one-paragraph summary to `/data/workspace/memory/strategic-cycle-summaries/YYYY-MM-DD.md`:
- What I did and why
- What changed (concrete: a metric, a file, a state)
- What I'll watch for in the next cycle
