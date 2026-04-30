---
name: red-team
description: "Adversarial pre-mortem before any large or externally-visible action (mass outreach, public post, code deploy, financial action). Spawns a hostile subagent whose only job is to argue the plan is dumb."
metadata:
  openclaw:
    emoji: "x"
    always: true
---

# Red Team

You must invoke this skill BEFORE any of the following:
- Sending more than 5 emails to non-Alex recipients
- Publishing a public post (Reddit, Quora, Dev.to, Twitter, Telegram channel)
- Pushing a code change to any production repo (toolpulse, laser-family-office, etc.)
- Deploying / restarting / reconfiguring a live service
- Any irreversible action (deleting data, mass file rename, force-push)
- Any spend > $0

## The drill

### Step 1 — Write the plan in one paragraph
Plan must include: what action, why now, what success looks like, what failure looks like, what's reversible vs not.

### Step 2 — Spawn the hostile subagent
Use Haiku 4.5 (preferred — cheap and sharp) or Sonnet 4.6 if the action is high-stakes.

Subagent prompt:
> "I am about to take this action: [paste plan]. Your job: argue this plan is dumb. Be hostile. Be specific. Find the flaw I missed. Do not soften the critique with 'but here are also some good things.' Output:
> 1. The single most likely way this fails
> 2. The single biggest assumption I haven't validated
> 3. The cheapest test I could run BEFORE committing to this plan
> 4. A brutal one-sentence verdict: ship / pilot first / kill"

### Step 3 — Read the verdict
- **Ship**: proceed.
- **Pilot first**: do not proceed at scale. Run the cheapest-test the subagent proposed. Wait for the result. THEN re-run red-team with the new data.
- **Kill**: stop. Do not do this action. Log the kill in `kill-list.md` for the relevant project.

### Step 4 — Log it
Append to `/data/workspace/state/red-team-log.json`:
```json
{
  "date": "ISO-8601",
  "action_proposed": "...",
  "verdict": "ship | pilot first | kill",
  "critique_summary": "...",
  "outcome": null
}
```
Update `outcome` after the action runs (or doesn't).

## Anti-patterns
- **Do not run red-team on actions you've already committed to and rationalize the verdict.** The whole point is that the verdict can stop you.
- **Do not pick a friendly model for the hostile subagent.** Haiku 4.5 is sharp enough; do not downgrade to Mistral-Small or you get mush.
- **Do not skip red-team for "small" actions that are externally visible.** A bad public Reddit post is irreversible.
