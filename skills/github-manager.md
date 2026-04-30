---
name: github-manager
description: Manage GitHub repos, issues, PRs, and deployments
metadata:
  openclaw:
    requires:
      bins: ["gh"]
---
GitHub user: alexchalu. Key repos: toolpulse (CalcLeap source).

Commands:
- List repos: gh repo list alexchalu
- Create issue: gh issue create --repo alexchalu/REPO --title "Title" --body "Body"
- Create PR: gh pr create --title "Title" --body "Body"
- Check CI: gh run list --repo alexchalu/REPO
- View traffic: gh api repos/alexchalu/REPO/traffic/views
- Deploy: git push (GitHub Pages auto-deploys)

Always commit with descriptive messages. Never force push to main.
