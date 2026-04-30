# MEMORY.md — Long-Term Memory

## Who I Am
- **Rando** 🔧 — AI builder, professional, mission-driven
- Created by Alex Chalunkal on 2026-03-04

## Who Alex Is
- Creator, visionary, US Eastern timezone
- **Net worth: $10M+** — think BIG, not hobby-level
- Telegram (@vulcan_ish) + WhatsApp
- Values results over talk. Tests capabilities before trusting.
- Mission: Build apps people love. Make people productive. Change the world.
- **Revenue expectations:** Massive scale. Volume × high CPC. Thousands of clicks/day.
- **Wants ZERO effort on his part** — I do everything, he does nothing unless absolutely required
- **Stakes are high** — livelihood-level urgency
- **Always use best model (Opus), max context window.** Cost is irrelevant. Never downgrade.
- **Hates wasted work** — think holistically, connect the pieces, don't build orphaned pages

## Active Protocol: HOLISTIC REVENUE OPTIMIZATION
- **Google is now indexing CalcLeap.** The J-curve is starting. Optimization > blind building.
- **Alex directive (2026-03-26):** "Holistic. See the whole picture. Maximum context. Always optimizing. Full platform experience. Nothing in silos. The J-curve must be hit correctly."
- **Three revenue streams active:**
  1. **CalcLeap AdSense** — 2,895 pages, Google indexing in progress, high-CPC niches targeted
  2. **CalcLeap API** — LIVE at calcleap-api.onrender.com, 8 endpoints, needs marketplace listings
  3. **Chalunkal AI Agency** — LIVE at alexchalu.github.io/cai-automation, needs outreach
- **Every cycle must:** Check metrics → Optimize existing → Distribute → Build new (in that order)
- **No silos.** Site + API + Agency + SEO + Distribution = ONE integrated revenue platform
- **Heartbeat = optimization-first.** Audit, fix, enhance, THEN build new.
- Priority: (what's already working × optimization potential × speed to revenue)
- Log all actions in memory/revenue-log.md

---

## ⚠️ CRITICAL ARCHITECTURE RULE
**ALL work goes to calcleap.com. No exceptions.**
- The old github.io sites (smartcalc, writefast, healthcalcs) are LEGACY — do NOT build for them
- Every new page, tool, calculator → toolpulse repo → calcleap.com
- Every URL reference → calcleap.com (not alexchalu.github.io)
- This was an explicit directive from Alex on 2026-03-10

---

## PROJECT MAP

### CalcLeap — THE Site (calcleap.com)
- **Live:** https://calcleap.com/
- **Repo:** https://github.com/alexchalu/toolpulse
- **Hosting:** GitHub Pages + custom domain (calcleap.com via Namecheap)
- **DNS:** 4x GitHub Pages A records (185.199.108-111.153) + CNAME www → alexchalu.github.io
- **SSL:** Approved, expires 2026-06-08, HTTPS enforced
- **AdSense:** ca-pub-3112605892426625 (3 ad slots per page)
- **ads.txt:** Live at calcleap.com/ads.txt
- **Google Search Console:** VERIFIED, sitemap submitted
- **Bing Webmaster Tools:** BingSiteAuth.xml deployed
- **IndexNow:** Key `a1b2c3d4e5f6g7h8`
- **Total Pages:** ~2,223 HTML files, 2,223 in sitemap
- **Quality audit:** 2,216/2,223 passing all checks (as of 2026-03-11)
- **Audit script:** `python3 audit.py` — run before EVERY push
- **Design:** Apple-inspired light theme (#f5f5f7 bg, #0071e3 accent, SF Pro typography, frosted glass nav)
- **Gold standard pages:** bmi-calculator.html, calc/sleep-calculator.html — all other pages must match this structure
- **Trust Pages:** about.html, privacy.html, contact.html
- **TEMPLATE.html:** Master template for tool pages
- **Workspace:** `/data/workspace/toolpulse/`
- **Key files:**
  - `index.html` — homepage (Apple-inspired redesign, 2026-03-10)
  - `TEMPLATE.html` — master page template
  - `sitemap.xml` — all URLs pointing to calcleap.com
  - `ads.txt` — AdSense authorization
  - `robots.txt` — points to calcleap.com/sitemap.xml
  - `a1b2c3d4e5f6g7h8.txt` — IndexNow verification key
  - `BingSiteAuth.xml` — Bing Webmaster verification

### Legacy Sites (NO LONGER MAINTAINED)
- `alexchalu.github.io/smartcalc` — ~517 pages, finance calculators
- `alexchalu.github.io/writefast` — ~22 pages, writing tools
- `alexchalu.github.io/healthcalcs` — ~207 pages, health calculators
- `alexchalu.github.io/datacenter-dashboard` — DC Pulse news (auto-updates via GitHub Actions, self-sustaining)
- **These are frozen.** All new content goes to calcleap.com.

### Other Projects
- **FocusTab Chrome Extension:** Submitted to Chrome Web Store, pending verification
- **Gumroad Products:** 3 built (Budget Tracker $12, Startup Financial Model $29, Social Media Calendar $19), pending Alex upload

---

## REVENUE ARCHITECTURE

### Primary: Lead Generation (Insurance) — HIGHEST PRIORITY
- **270 insurance pages** now have lead capture forms (deployed 2026-03-12)
- Forms collect: name, email, phone, ZIP, insurance type
- Leads emailed to alexmathewc@gmail.com via Formsubmit.co + localStorage backup
- **Revenue per lead: $50-200** vs AdSense $0.10-2 per click
- Insurance types: auto, home, life, health, disability, business, pet, motorcycle, boat, flood, earthquake, umbrella, renters, long-term care
- **Next step:** Sign up for lead aggregator (QuoteWizard, SmartFinancial, MediaAlpha) to sell at scale
- **Target:** 10 leads/day = $500-2,000/day once traffic arrives

### Secondary: AdSense on calcleap.com
- ~2,500+ pages, 3 ad slots each
- High-CPC: insurance ($30-80/click), tax ($10-30), mortgage ($5-20), finance ($5-50)
- Google Search Console verified, Alex did URL inspection (2026-03-12)
- AdSense: confirmed done by Alex (2026-03-12)
- **Status:** Zero pages indexed yet. Domain is 2 days old. Expected: 2-6 weeks.

### Tertiary: Digital Products (Gumroad) — pending Alex upload
### Quaternary: Chrome Extension — pending verification

### DISTRIBUTION (critical — no traffic yet)
- **Reddit posts:** 5 written, sent to Alex for copy-paste (2026-03-12)
- **Directory submissions:** automated via sub-agent
- **IndexNow:** re-submitted top 10 pages (2026-03-12)
- **Key lesson:** 2,500 pages without distribution = $0. Marketing > building now.
- **Alex directive:** "Figure it out yourself. Be proactive. Don't ask."

### CalcLeap API (NEW — 2026-03-13)
- **Repo:** github.com/alexchalu/calcleap-api (public, open source)
- **8 endpoints:** mortgage, compound, retirement, insurance, bmi, loan, tip, percentage
- **Pricing model:** Free (100 req/day) → Pro $9/mo (10K/day) → Enterprise
- **Blog post:** calcleap.com/blog/free-calculator-api-developers.html
- **API docs page:** calcleap.com/api-docs.html (built by sub-agent)
- **Status:** Working, tested, deployed. Not yet listed on RapidAPI.

### Email Outreach System (NEW — 2026-03-13)
- Sending from alex@calcleap.com via Resend API
- **18 emails sent** to finance blogs, insurance sites, health blogs, dev communities
- Targets: NerdWallet, Penny Hoarder, PolicyGenius, Healthline, Dev.to, freeCodeCamp, etc.
- Expected: 5-15 backlinks from responses over 1-2 weeks
- Outreach templates saved: /data/workspace/outreach-campaign.md
- Profile submission templates: /data/workspace/profile-submissions.md
- Quora-style answers: /data/workspace/quora-answers.md
- Social media posts: /data/workspace/social-posts-ready.md

### GitHub Backlink Network (8 repos, all DR-99)
1. toolpulse (main) — README with 30+ calcleap.com links
2. calcleap-api — API repo
3. free-calculator-tools — curated resource list
4. awesome-calculators fork — CalcLeap added
5. awesome-free-tools fork (x2)
6. free-for-dev fork
7. awesome-selfhosted fork

### FUTURE REVENUE IDEAS (Alex-approved for exploration)
1. **GPU/DC market intelligence** — $299-999/mo sub for AI companies & investors
2. **AI voice agent for local businesses** — $500-2k/mo per client
3. **GPU compute arbitrage** — capital deployment, 30-60% spreads

---

## QUALITY MANDATE (2026-03-10)
Alex's standing directive: site must be "unparalleled globally." Quality > quantity. Never ship broken code.

### Design System (Gold Standard)
- **Reference pages:** bmi-calculator.html, calc/sleep-calculator.html
- **Background:** #f5f5f7 (Apple's exact gray)
- **Accent:** #0071e3 (Apple's blue)
- **Font:** -apple-system, BlinkMacSystemFont, SF Pro Display
- **Nav:** Frosted glass (backdrop-filter blur), 48px height, `class="nav"`
- **Container:** `<div class="page">` with max-width 980px
- **Title:** `<h1 class="page-title">` — EXACTLY ONE per page
- **Cards:** `class="card"` for calculators, `class="info-card"` for content sections
- **Footer:** 4-column grid with Popular/Categories/Company links
- **Ads:** Maximum 3 per page, seamless (no dashed borders)

### Quality Gate (MUST pass before every push)
1. Structural: single H1, max 3 ads, page-title class, gold CSS, footer present
2. Functional: 5+ calculators tested with real inputs, results display correctly
3. Links: related tools point to existing files
4. No orphan HTML, no duplicate elements
5. **If any check fails → fix first, then push**

### Critical Lessons from Broken Migrations (DO NOT REPEAT)
Alex said: "this process has been messy." He's right. Three migrations broke the site:
- **V1:** Restructured HTML body content → broke ALL calculator JS
- **V2:** Tried to fix V1 → left orphan divs, duplicate H1s, missing containers
- **V3:** Finally fixed it by ONLY replacing CSS/nav/footer, never touching body content
- **Comprehensive CSS fix:** Gold CSS only had ~20 class rules, site uses 50+. Had to add rules for calc-card, result-grid, radio-group, converter-box, tool-card, stat-card, output-area, etc.
- **ALWAYS run `python3 audit.py` before pushing** — this is the quality gate
- **NEVER restructure page body HTML in automated scripts**
- **NEVER replace style blocks without including ALL CSS rules**
- **Test rendering, not just grep** — a page can pass grep checks and still look broken

### World-class features needed per page
- Visual charts/graphs for results (bar charts, gauges, not plain text)
- Educational content (500-1000 words)
- FAQ sections
- Breadcrumbs + related tools (6-8 per page)
- Source citations, "last updated" dates

## CRITICAL LESSONS LEARNED

1. **Always verify sitemap includes ALL pages.** Sitemap was missing 275 pages — Google can't find pages not in the sitemap.
2. **Always link new pages from the homepage.** Built 39 calculators but forgot to add them to index.html — orphaned pages get no traffic.
3. **Think holistically before building.** Don't build 16 pages without connecting them to the rest of the site.
4. **Don't promise what you can't automate.** Gumroad API is broken, Chrome Web Store needs browser login. Be upfront.
5. **Alex wants ZERO manual work.** Only ask him to do things that absolutely cannot be automated.
6. **GitHub Pages auto-deploys on push** — just commit and push, pages go live in ~60 seconds.
7. **GitHub Actions workflows need `workflow` scope** on the token to push.
8. **IndexNow (HTTP POST to api.indexnow.org)** fast-tracks Bing/Yandex indexing. Key file must be at the same domain.
9. **Don't run Google Ads to AdSense pages** — Google bans this as ad arbitrage.
10. **GitHub traffic API** shows page views: `GET /repos/{owner}/{repo}/traffic/views`
11. **Surge.sh** is unreliable — use GitHub Pages as primary hosting.
12. **ALWAYS set up heartbeat-driven auto-improvement** when Alex says "keep going" or "keep scaling". Don't stop between sessions.
13. **Alex's standing directives:** Keep scaling, minimize his actions, think bigger ($10M+), stop making errors. BUILD AUTONOMOUSLY.
14. **⏰ EVERY 2 HOURS: Mandatory check-in.** Read HEARTBEAT.md and execute. Quality maintenance FIRST, then build new content. This is a standing order from Alex (2026-03-08).
15. **Run `python3 audit.py` before every push.** This is the quality gate. If pages regress, fix before pushing. Alex explicitly asked for this after 3 broken migrations.
16. **Alex said "this process has been messy."** Quality protection is now the #1 priority. Never break what works. Build new content ONLY after confirming existing pages still pass audit.

## Browser Relay
- **Node name:** "Alex Windows Browser" (Windows, win32)
- **Capabilities:** browser, system (can run commands on Alex's Windows PC)
- **Key limitation:** Google/social OAuth popups open in separate windows relay can't capture
- **Workaround:** Alex logs in himself, then attaches relay to the logged-in tab
- **Requires:** Laptop on + Chrome open + relay badge ON on target tab
- `chrome://newtab` and internal pages render as black/blank

## Domain — COMPLETED
- **calcleap.com** purchased on Namecheap (2026-03-10)
- DNS configured and propagated, SSL active, HTTPS enforced
- Full rebrand from ToolPulse → CalcLeap across all 1,695 files
- All URLs, sitemaps, robots.txt, canonical tags updated to calcleap.com
- Apple-inspired redesign deployed (light theme, frosted glass nav, SF typography)
- Next: backlink building, content enrichment on top pages, Reddit/Pinterest distribution

## Alex's Family
- Lives in Franklin Lakes, NJ (ZIP 07417)
- Has a wife (works from home) and 2-year-old daughter
- Indian-American family
- Looking for experienced nanny (30s+, flexible, driving preferred)
- Job posting text is ready — Alex needs to post on Care.com, Nextdoor, Facebook

## Communication Channels
- **Primary:** Telegram (@vulcan_ish)
- **Secondary:** WhatsApp — configured, working
- **Email (outbound):** Resend API, sending from **alex@calcleap.com**
  - Domain verified (DKIM ✅, MX ✅, SPF ✅) on 2026-03-13
  - API Key: in /data/workspace/.env (re_Xr5JGTdH_...)
  - Can send to ANYONE (not just Alex) — outreach unlocked
  - Old script: `send-email.js` (was onboarding@resend.dev, limited to owner only)

## Search & Research
- **Brave Search API:** Configured and working (free tier, 2,000 searches/month, 1 req/sec rate limit)

## Accounts & Credentials
- **GitHub:** alexchalu, token in git config (fine-grained PAT with Pages + Workflows permissions)
- **AdSense:** ca-pub-3112605892426625
- **Gumroad:** 3816559307848.gumroad.com, API token: 4SLj5Hnr-hgKqt_XlXVUeM2W7vG6n4z5QfQTmfOJje0
- **Surge.sh:** toolpulse-deploy@proton.me / ToolPulse2026! (backup hosting, unreliable)
- **IndexNow key:** a1b2c3d4e5f6g7h8 (deployed to both repos)
- **Resend:** API key in /data/workspace/.env, domain calcleap.com verified, sends from alex@calcleap.com
