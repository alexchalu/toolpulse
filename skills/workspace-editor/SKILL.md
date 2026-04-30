---
name: workspace-editor
description: Edit your own workspace files (AGENTS.md, SOUL.md, TOOLS.md, skills, scripts)
metadata:
  openclaw:
    always: true
---

# Workspace Editor Skill

You have full authority to edit your own workspace files.

## Editable Files
- AGENTS.md - operating manual (High caution - affects all behavior)
- SOUL.md - personality (Medium caution)
- TOOLS.md - tool reference (Low caution)
- HEARTBEAT.md - heartbeat checklist (Low)
- BOOT.md - startup checklist (Medium)
- skills/*.md or skills/*/SKILL.md - individual skills (Low)
- scripts/* - utility scripts (Low)

## Safety Protocol for High-Caution Files
1. Read current content first
2. Backup: cp FILE.md FILE.md.bak
3. Make changes
4. Verify no syntax errors in frontmatter
5. Changes take effect on next session start

## For Config Changes
Use config.patch() instead of editing /data/openclaw.json directly.
The config tool validates JSON and handles gateway restart.
