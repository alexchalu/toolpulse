---
name: content-builder
description: Build and deploy web content to CalcLeap
metadata:
  openclaw:
    requires:
      bins: ["git", "python3"]
---
When building content for CalcLeap (calcleap.com):

1. Pull the toolpulse repo: cd /data/workspace/toolpulse && git pull
2. Create calculator/tool pages following the existing design system:
   - Apple-inspired clean design
   - Interactive calculator with JavaScript
   - 500+ words educational content
   - FAQ section with schema markup
   - Meta tags, breadcrumbs, AdSense (ca-pub-3112605892426625)
   - Lead form for insurance pages (formsubmit.co)
3. Run python3 audit.py to verify quality
4. Update sitemap.xml with new page
5. Git commit with descriptive message and push
6. Submit to IndexNow
7. Log in today's memory file: page name, URL, target keyword, CPC estimate
