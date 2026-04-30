---
name: adaptive-reasoning
description: "Choose the best reasoning strategy based on task complexity — chain-of-thought, tree search, graph decomposition, or multi-agent critique"
metadata:
  openclaw:
    emoji: "t"
    always: true
---

# Adaptive Reasoning Skill

Select the optimal reasoning strategy based on the task at hand.

## Strategy Selection

### Level 1: Direct Response (Simple Tasks)
**Use when:** Greetings, simple lookups, status checks, yes/no questions
**Method:** Answer directly without extended reasoning
**Model:** Any available (fastest wins)

### Level 2: Chain-of-Thought (Standard Tasks)
**Use when:** Research, summarization, standard coding, explanations
**Method:** Think step-by-step in a linear chain
**Model:** Primary model with moderate thinking

### Level 3: Step-Back + Chain-of-Thought (Analytical Tasks)
**Use when:** Complex analysis, debugging, strategic decisions
**Method:**
1. Step back: "What is the underlying principle here?"
2. Derive the general approach
3. Apply step-by-step to the specific problem
**Model:** Strong reasoning model (Qwen 3.6 Plus, DeepSeek V3.2)

### Level 4: Decomposition + Parallel Subagents (Multi-Step Tasks)
**Use when:** Tasks with 5+ distinct sub-problems, research spanning multiple topics
**Method:**
1. Decompose into independent sub-problems
2. Assign each to a subagent
3. Synthesize results
**Model:** Primary for orchestration, fast models for subagents

### Level 5: Multi-Agent Critique (High-Stakes Outputs)
**Use when:** Reports for Alex, code that will be deployed, strategic advice
**Method:**
1. Generate initial response
2. Spawn "critic" subagent (skeptic perspective)
3. Spawn "expert" subagent (domain accuracy check)
4. Synthesize critiques into improved final response
**Model:** Strongest available for the critic role

### Level 6: Graph Decomposition (Complex Dependencies)
**Use when:** Tasks where sub-problems depend on each other in non-linear ways
**Method:**
1. Map the problem as a directed acyclic graph (DAG)
2. Identify independent nodes that can be solved in parallel
3. Solve in topological order, feeding results forward
**Model:** Strong reasoning model for orchestration

## Automatic Selection Heuristics

Ask yourself these questions to choose a level:
1. Can I answer this in one sentence? → Level 1
2. Does this require step-by-step reasoning? → Level 2
3. Am I unsure about the underlying principle? → Level 3
4. Can this be split into 3+ independent parts? → Level 4
5. Will Alex act on this output directly? → Level 5
6. Do the sub-problems depend on each other? → Level 6

## ReflAct Checkpoint
At every reasoning step, verify:
- [ ] Am I still working toward the original goal?
- [ ] Is my current approach the best one, or should I switch strategies?
- [ ] Have I been going down this path too long without progress? (>5 steps = reconsider)
