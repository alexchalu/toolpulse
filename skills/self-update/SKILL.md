---
name: self-update
description: Check for OpenClaw updates and manage version upgrades
metadata:
  openclaw:
    always: true
---

# Self-Update Skill

1. Check current version: openclaw --version
2. Use update.run() to check for and apply updates
3. Verify health: curl -s http://127.0.0.1:3000/healthz
4. Notify Alex about what changed
5. Post-update checklist: gateway health, Telegram connection, cron jobs, skills loaded
