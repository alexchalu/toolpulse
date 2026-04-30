---
name: reflexion
description: "Post-task reflection and learning — store lessons from successes and failures to avoid repeating mistakes"
metadata:
  openclaw:
    emoji: "r"
    always: true
---

# Reflexion Skill

After completing any significant task, run this reflection process.

## When to Use
- After completing a task that took more than 2 steps
- After encountering an error or unexpected result
- After Alex corrects or redirects you
- After successfully solving a difficult problem

## Reflection Process

### 1. Evaluate the Outcome
- Did the task succeed? Partially? Fail?
- How long did it take vs. expected?
- Were there any errors or retries?

### 2. Analyze What Happened
- **What worked well?** Which tools, approaches, or reasoning steps were effective?
- **What went wrong?** What caused delays, errors, or poor results?
- **What was surprising?** Any unexpected behavior from tools, APIs, or data?

### 3. Extract Lessons
- **What would you do differently next time?** Be specific and actionable.
- **Is there a pattern here?** Does this connect to previous reflections?
- **Should a skill/script be created or updated?** Would automation help?

### 4. Store the Reflection
Save to `/data/workspace/memory/reflections/YYYY-MM-DD-topic.md`:

```markdown
# Reflection: [Brief Topic]
Date: YYYY-MM-DD
Task: [What you were trying to do]
Outcome: [Success/Partial/Failure]

## What Worked
- [Specific effective approaches]

## What Went Wrong
- [Specific issues encountered]

## Lessons Learned
- [Actionable takeaways for next time]

## Action Items
- [ ] [Any follow-up improvements to make]
```

### 5. Check for Patterns
After storing, scan recent reflections for recurring issues:
```bash
ls /data/workspace/memory/reflections/ | tail -10
```
If the same issue appears 3+ times, create a skill or update AGENTS.md to address it permanently.

## Before Similar Tasks
Before starting a task, check if there are relevant past reflections:
```bash
grep -rl "KEYWORD" /data/workspace/memory/reflections/ | head -5
```
Read the most relevant ones and apply their lessons.
