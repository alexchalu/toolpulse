---
name: premise-challenge
description: "Challenge the premise of a strategy, not just the plan. Used at the start of every weekly retro and any time the stuck-detector fires. Forces 'is the question we're asking even the right one?' before 'is our answer good?'"
metadata:
  openclaw:
    emoji: "?"
    always: true
---

# Premise Challenge

The most expensive mistakes are not bad executions of good plans — they are flawless executions of wrong premises. This skill exists to interrupt that pattern.

## When to use
1. At the start of every weekly retro (mandatory).
2. Any time `stuck-detector` fires.
3. Before committing to any plan that will consume more than 1 cycle of effort or send any externally-visible action (email, Reddit post, code push to a public repo).
4. When you catch yourself thinking "I just need to do MORE of what I'm already doing." That's the signal.

## The drill

### Step 1 — State the premise out loud
Write down, in one sentence, the assumption that makes the current plan make sense.

Example (CalcLeap, pre-rebuild):
> "If we publish enough calculator pages and send enough outreach, traffic and revenue will follow."

If you can't articulate the premise in one sentence, you don't understand your own plan well enough to defend it.

### Step 2 — Find the evidence FOR the premise
List every concrete piece of evidence supporting the premise. Not vibes. Not "everyone does this." Actual numbers from `experiments.md` or external sources.

### Step 3 — Find the evidence AGAINST the premise
List every concrete piece of evidence refuting the premise. Be brutal. Look in `experiments.md`, `metrics.json`, AdSense rejections, response rates.

### Step 4 — Apply the asymmetry test
If evidence-against significantly outweighs evidence-for AND the premise is several months old, the premise is probably wrong. Mark it for kill-list.

For CalcLeap the math is:
- For: "everyone does SEO" (vibes, no evidence)
- Against: 0 traffic, 5/3012 indexed, AdSense rejected, 0/825 outreach response
- Verdict: premise refuted.

### Step 5 — Ask the inversion question
"What would I have to believe for the OPPOSITE of this plan to be the right move?"

For CalcLeap:
- Opposite plan: "Stop publishing pages. Stop sending outreach. Pick one narrow vertical and become genuinely the best resource on it."
- What I'd have to believe: that quality > quantity in 2026 SEO, that AdSense will stay restrictive on templated sites, that distribution requires earned trust not blasted volume.
- Is that more believable than the current premise? **Yes.**

### Step 6 — Spawn a hostile subagent
Subagent prompt (use Haiku 4.5 or stronger):
> "I am about to commit to plan [X] based on premise [Y]. Here is my evidence: [paste]. Argue, in your strongest possible voice, why this premise is wrong. Be a hostile critic. Do not soften your critique. Your job is to find the flaw, not to be polite. Output: top 3 reasons the premise is wrong, ranked by severity."

Read the subagent's output. If any of its three points is a "huh, I hadn't thought of that," PAUSE the plan and bring the critique into the next retro.

### Step 7 — Record the result
Append to `/data/workspace/projects/<project>/premise-challenges.md`:
```
## YYYY-MM-DD
- Premise tested: <one sentence>
- Verdict: confirmed / refuted / inconclusive
- Hostile-subagent's strongest critique: <quote>
- Action taken: <what changed>
```

## Output discipline
A premise-challenge that produces "yes the premise is fine, carry on" without listing any specific evidence-against is NOT a real premise-challenge. Re-run with more honesty.
