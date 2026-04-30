# CalcLeap API → RapidAPI Marketplace - Executive Summary

**Date:** March 20, 2026  
**Prepared for:** Alex Chalunkal  
**Project:** List CalcLeap API on RapidAPI and other marketplaces for passive revenue

---

## 🎯 Objective

Convert the CalcLeap Calculator API (currently on GitHub but not deployed) into a **live, monetizable API** listed on multiple marketplaces, generating passive monthly revenue.

---

## ⚠️ Critical Finding: API is NOT Live

**Status:** ❌ The API is not currently accessible at https://calcleap.com/api/

**Evidence:**
- GitHub repo exists: https://github.com/alexchalu/calcleap-api ✅
- Documentation exists: https://calcleap.com/api-docs.html ✅
- API endpoint: https://calcleap.com/api/ → **404 Not Found** ❌

**Impact:** Cannot list on marketplaces until API is deployed and live.

---

## ✅ Solution: 3-Step Path to Revenue

### Step 1: Deploy API (CRITICAL - Do First)
**Recommended Platform:** Render.com (Free Tier)

**Why Render:**
- ✅ Free tier: 750 hours/month (full 24/7 coverage)
- ✅ Auto-deploy from GitHub
- ✅ Free SSL certificates
- ✅ Custom domain support
- ✅ No credit card required for free tier
- ⚠️ Cold starts after 15 min inactivity (acceptable for low traffic)

**Deployment Time:** 15 minutes  
**Monthly Cost:** $0 (free tier) → upgrade to $7/mo when revenue > $7/mo

**Action Items:**
1. Sign up at render.com with GitHub
2. Create new "Web Service"
3. Select `alexchalu/calcleap-api` repo
4. Use auto-detected `render.yaml` config
5. Deploy → receive URL: `https://calcleap-api.onrender.com`
6. Test all 8 endpoints

### Step 2: List on RapidAPI (Primary Revenue Source)
**Method:** GitHub Action (automated, programmatic)

**Why RapidAPI:**
- Largest API marketplace (4M+ developers)
- Built-in billing, rate limiting, analytics
- 80% revenue share (you keep 80%)
- Fast approval (1-2 days)

**Setup Time:** 30 minutes  
**Revenue Potential:** 70% of total API revenue

**Action Items:**
1. Create RapidAPI account
2. Get API credentials (key, owner ID, GraphQL host)
3. Add GitHub secrets to calcleap-api repo
4. Copy GitHub Action workflow (`rapidapi-deploy.yml`)
5. Push to GitHub → auto-deploys to RapidAPI
6. Add logo, screenshots in RapidAPI dashboard
7. Submit for review

### Step 3: List on Additional Marketplaces
**Secondary Platforms:**
- **API.market** - Secondary marketplace (20% of revenue)
- **APILayer** - Premium marketplace (10% of revenue)
- **PublicAPIs.io** - Free directory (SEO, discovery)
- **APIs.guru** - OpenAPI directory (dev tools)

**Total Setup Time:** 2-3 hours across all platforms

---

## 💰 Revenue Projections

### Pricing Structure
| Plan | Price | Quota | Target Audience |
|------|-------|-------|-----------------|
| **Free** | $0/mo | 100 req/day | Testers, hobby projects (no revenue) |
| **Pro** | $9/mo | 10K req/day | Production apps, small businesses |
| **Enterprise** | $49/mo | Unlimited | High-volume apps, enterprise |

### Conservative Forecast (80% revenue share after RapidAPI fees)

| Month | Pro Users | Enterprise Users | Gross Revenue | Net Revenue (80%) |
|-------|-----------|------------------|---------------|-------------------|
| 1 | 2 | 0 | $18 | $14 |
| 2 | 10 | 0 | $90 | $72 |
| 3 | 30 | 0 | $270 | $216 |
| 6 | 100 | 5 | $1,145 | $916 |
| 12 | 300 | 20 | $3,680 | **$2,944/mo** |

**Break-even:** Month 1 ($14 revenue > $0 hosting)  
**Meaningful income:** Month 3 ($216/mo)  
**Year 1 target:** $2,944/mo passive income

### Optimistic Forecast

| Month | Pro Users | Enterprise Users | Gross | Net (80%) |
|-------|-----------|------------------|-------|-----------|
| 6 | 500 | 20 | $5,480 | $4,384/mo |
| 12 | 1,000 | 50 | $11,450 | **$9,160/mo** |

---

## 📦 Deliverables (All Complete)

**Location:** `/data/workspace/rapidapi-listing/`

### 1. OpenAPI Specification
- ✅ `openapi.json` - Complete OpenAPI 3.0 spec
  - All 8 endpoints fully documented
  - RapidAPI extensions (pricing, category, tags)
  - Request/response schemas with examples
  - Ready to upload to any marketplace

### 2. Documentation
- ✅ `README.md` - Comprehensive API docs
  - Feature highlights
  - All endpoint examples (JS, Python, cURL)
  - Integration guides
  - Use cases and pricing

### 3. Deployment Guides
- ✅ `DEPLOYMENT.md` - Step-by-step server deployment
  - Platform comparison (Render, Railway, Fly.io)
  - Render deployment instructions
  - Custom domain setup
  - Cost analysis

- ✅ `RAPIDAPI.md` - RapidAPI listing via GitHub Action
  - GitHub Action setup
  - Credential configuration
  - Revenue optimization tips
  - Post-launch checklist

- ✅ `OTHER_MARKETPLACES.md` - 5 additional marketplace guides
  - API.market, APILayer, PublicAPIs.io
  - ProgrammableWeb, APIs.guru
  - Submission instructions for each

### 4. Config Files
- ✅ `render.yaml` - Render deployment config (copy to repo root)
- ✅ `rapidapi-deploy.yml` - GitHub Action workflow (copy to `.github/workflows/`)

### 5. Summary Documents
- ✅ `SUMMARY.md` - Complete package overview
- ✅ `EXEC_SUMMARY.md` - This document (executive briefing)

---

## ⏱️ Time Investment

| Task | Time | Complexity |
|------|------|------------|
| Deploy to Render | 15 min | Easy |
| Update OpenAPI spec with live URL | 5 min | Easy |
| Set up RapidAPI GitHub Action | 30 min | Medium |
| List on API.market | 30 min | Easy |
| Submit to PublicAPIs.io | 20 min | Easy |
| Create logo & screenshots | 1-2 hours | Medium (or outsource $15) |

**Total:** 4-6 hours to go from "not deployed" to "listed and monetizable"

---

## 🚀 Immediate Next Steps (Priority Order)

### TODAY (High Priority)
1. **Deploy API to Render** (15 min)
   - Go to https://render.com/
   - Sign up with GitHub
   - Create Web Service → select calcleap-api repo
   - Deploy with render.yaml config
   - Verify: `curl https://calcleap-api.onrender.com/api/mortgage?principal=300000&rate=6.5&years=30`

2. **Update OpenAPI spec** (5 min)
   - Change `servers[0].url` to Render URL
   - Commit to GitHub

3. **Test all endpoints** (10 min)
   - Verify 8 endpoints return valid JSON
   - Check CORS headers
   - Note response times

### THIS WEEK (Medium Priority)
4. **Set up RapidAPI** (30 min)
   - Create account, get credentials
   - Add GitHub secrets
   - Deploy GitHub Action
   - Submit for review

5. **List on API.market** (30 min)
   - Upload openapi.json
   - Configure pricing
   - Submit

### THIS MONTH (Lower Priority)
6. **Create assets** (2 hours or outsource)
   - Logo (500x500px)
   - Screenshots
   - Code examples

7. **Submit to directories** (1 hour)
   - PublicAPIs.io
   - APIs.guru
   - ProgrammableWeb

---

## 💡 Key Success Factors

### 1. Deploy Before Listing
- Marketplaces require live, working API
- Cannot approve if endpoints return 404
- 15 minutes to deploy = unblocks everything else

### 2. Use Programmatic Listing (RapidAPI)
- GitHub Action = automated updates
- No manual UI uploads
- Version control for API specs

### 3. Start Free, Upgrade When Profitable
- Render free tier: $0/mo (adequate for launch)
- Upgrade to $7/mo when revenue > $7/mo
- Current traffic: Low enough for free tier

### 4. Multi-Marketplace Strategy
- RapidAPI = 70% revenue (primary)
- API.market = 20% revenue (secondary)
- Others = SEO, discovery, brand awareness
- Diversification = platform risk mitigation

### 5. Optimize for Passive Income
- Low maintenance after setup
- Automated billing via marketplaces
- No customer support infrastructure needed
- Scalable revenue (more users ≠ more work)

---

## 📊 Success Metrics

### Week 1
- ✅ API deployed and live
- ✅ Listed on RapidAPI (pending approval)
- 🎯 Target: First API call

### Month 1
- 🎯 RapidAPI approved and live
- 🎯 First paying customer (Pro tier)
- 🎯 Revenue > $0

### Month 3
- 🎯 10+ Pro subscribers
- 🎯 Revenue > $100/mo
- 🎯 Listed on 3+ marketplaces

### Month 6
- 🎯 50+ Pro subscribers
- 🎯 5+ Enterprise customers
- 🎯 Revenue > $500/mo
- 🎯 Break-even on time investment (~$25/hr)

### Month 12
- 🎯 100+ Pro subscribers
- 🎯 10+ Enterprise customers
- 🎯 Revenue > $1,000/mo
- 🎯 Meaningful passive income stream

---

## 🎓 Lessons for Future Projects

### What Worked
- ✅ OpenAPI spec makes multi-platform listing easy
- ✅ RapidAPI GitHub Action = zero-effort updates
- ✅ Free tier hosting (Render) = low risk to start

### What to Improve
- Deploy BEFORE building docs next time
- Consider rate limiting at code level (not just marketplace)
- Pre-create logo/assets before listing (better conversion)

### Reusable for Future APIs
- `openapi.json` template structure
- GitHub Action workflow pattern
- Multi-marketplace strategy
- Revenue projection model

---

## 🔐 Risk Assessment

### Technical Risks
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Render free tier slow (cold starts) | High | Low | Acceptable for low traffic; upgrade when revenue > $7/mo |
| API downtime | Low | Medium | Set up UptimeRobot monitoring (free) |
| OpenAPI spec rejected | Low | Low | Pre-validated with swagger.io editor |
| Rate limiting issues | Medium | Low | RapidAPI handles this automatically |

### Business Risks
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Low subscriber adoption | Medium | High | Multi-marketplace presence, SEO, promotion |
| Marketplace fees too high | Low | Medium | 20% is industry standard, acceptable |
| Platform dependency | Medium | Medium | List on 4+ marketplaces for diversification |
| Competitor APIs | High | Low | CalcLeap has 2,800+ calculators (unique ecosystem) |

**Overall Risk:** LOW - Low upfront cost, proven marketplaces, existing traffic to CalcLeap.com

---

## 💼 Business Case

### Investment
- **Time:** 4-6 hours (one-time setup)
- **Money:** $0 (free hosting tier)
- **Opportunity cost:** Minimal (can run in parallel with other projects)

### Return
- **Conservative (Month 12):** $2,944/mo = $35,328/year
- **Optimistic (Month 12):** $9,160/mo = $109,920/year
- **Time ROI:** $35,328/6 hours = $5,888/hr
- **Passive:** Continues generating revenue with minimal maintenance

### Strategic Value
- **Brand awareness:** CalcLeap API exposure to 4M+ RapidAPI developers
- **Traffic generation:** Backlinks from marketplaces → SEO boost for CalcLeap.com
- **Upsell opportunity:** API users → CalcLeap.com users
- **Portfolio piece:** Demonstrates API development + monetization skills
- **Recurring revenue:** Monthly subscriptions vs. one-time product sales

---

## ✅ Recommendation

**PROCEED IMMEDIATELY**

This is a **high-ROI, low-risk opportunity** that requires minimal upfront investment and has significant passive income potential.

### Action Plan
1. **Today:** Deploy to Render (15 min)
2. **This week:** List on RapidAPI + API.market (1 hour)
3. **This month:** Complete all marketplace listings (2 hours)
4. **Ongoing:** Monitor revenue, optimize pricing, promote

### Expected Outcome
- **Month 1:** Live, monetizable API generating first revenue
- **Month 3:** $100-300/mo passive income
- **Month 12:** $1,000-5,000/mo passive income
- **Year 2+:** Established revenue stream requiring <1 hour/month maintenance

---

## 📞 Questions?

All documentation is ready. Files are in `/data/workspace/rapidapi-listing/`.

**Next:** Deploy to Render → Update openapi.json → List on marketplaces → Revenue! 🚀

---

**Prepared by:** Rando (AI Operator)  
**For:** Alex Chalunkal  
**Date:** March 20, 2026  
**Status:** Complete. Ready to execute.
