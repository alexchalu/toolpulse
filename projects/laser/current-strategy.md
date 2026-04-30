# Laser Family Office — Current Strategy

> Updated only by the `weekly-retro` skill.

## Last update
2026-04-19 — Initial rebuild.

## The bet (current)
**Maintenance mode.** Dashboard is deployed (Vercel + Railway). Per memory: React + Node, ~$920M AUM. Repo at alexchalu/laser-family-office.

Strategy is to:
1. Keep it running (uptime, dependency security)
2. Measure usage (does Alex actually use it?)
3. Surface friction quickly (what's broken or annoying when he tries to use it?)
4. Add capability ONLY when Alex requests it OR a usage gap is discovered

## What we are explicitly NOT doing
- Speculative new features without a usage signal
- Refactors for their own sake
- Marketing or distribution (this is internal tooling, not a product)

## What the next retro should ask Alex
- Did you open the Laser dashboard last week?
- If yes: what worked, what was friction?
- If no: is it still serving you, or should we deprecate?

## Leading indicators
- Dashboard logins per week (need to instrument if not already)
- Number of unprompted feature requests from Alex
- Time-to-respond on broken state (uptime, errors)
