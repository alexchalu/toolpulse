# CalcLeap API Marketplace Listing - Complete Package

**Created:** March 20, 2026  
**Status:** Ready for deployment and listing

---

## 📦 Package Contents

All files needed to deploy CalcLeap API and list it on multiple marketplaces:

### 1. Core API Specification
- ✅ **openapi.json** - Complete OpenAPI 3.0 spec with RapidAPI extensions
  - All 8 endpoints fully documented
  - Request/response schemas
  - Pricing tiers defined
  - Example values included

### 2. Documentation
- ✅ **README.md** - Comprehensive API documentation
  - Feature highlights
  - All endpoint examples
  - Integration guides (JS, Python, cURL)
  - Pricing table
  - Use cases

### 3. Deployment Guides
- ✅ **DEPLOYMENT.md** - Server deployment instructions
  - Current API status (not live)
  - Hosting platform comparison (Render, Railway, Fly.io)
  - Step-by-step Render deployment
  - Custom domain setup
  - Rate limiting considerations

### 4. Marketplace Listing Guides
- ✅ **RAPIDAPI.md** - RapidAPI listing via GitHub Action
  - Programmatic upload workflow
  - Credential setup
  - GitHub Action configuration
  - Revenue projections
  - Post-launch checklist

- ✅ **OTHER_MARKETPLACES.md** - Additional marketplace guides
  - API.market (OpenAPI import)
  - APILayer (provider application)
  - PublicAPIs.io (GitHub PR)
  - ProgrammableWeb (directory listing)
  - APIs.guru (OpenAPI directory)
  - Revenue comparison table

### 5. Configuration Files
- ✅ **rapidapi-deploy.yml** - GitHub Action workflow
  - Auto-deploy to RapidAPI on push
  - Secrets configuration
  - Output logging

- ✅ **render.yaml** - Render.com deployment config
  - Free tier configuration
  - Health check endpoint
  - Environment variables
  - Upgrade guidance

---

## 🚨 CRITICAL: API is NOT Currently Live

### Current Status
- ❌ API endpoint returns **404 Not Found**
- ✅ GitHub repo exists: https://github.com/alexchalu/calcleap-api
- ✅ Documentation page exists: https://calcleap.com/api-docs.html
- ✅ Code is production-ready

### What Needs to Happen FIRST
**You CANNOT list on marketplaces until the API is deployed and live.**

### Deployment Priority
1. **Deploy to Render** (15 minutes)
   - Recommended: Free tier to start
   - Upgrade to $7/mo when revenue > $7/mo
   - See DEPLOYMENT.md for step-by-step

2. **Verify endpoints work** (10 minutes)
   - Test all 8 endpoints on live URL
   - Check response times
   - Verify CORS headers

3. **Update OpenAPI spec** (5 minutes)
   - Change `servers[0].url` to live Render URL
   - Commit to GitHub

4. **THEN list on marketplaces** (3-4 hours)
   - RapidAPI (GitHub Action)
   - API.market
   - Others in parallel

---

## 📊 Revenue Potential

### Pricing Tiers Configured
| Plan | Price | Quota | Target |
|------|-------|-------|--------|
| Free | $0/mo | 100/day | Testers, hobby projects |
| Pro | $9/mo | 10K/day | Production apps |
| Enterprise | $49/mo | Unlimited | High-volume apps |

### Conservative Revenue Forecast
| Month | Users | Revenue | After Fees (80%) |
|-------|-------|---------|------------------|
| 1 | 10 Free, 2 Pro | $18 | $14 |
| 2 | 50 Free, 10 Pro | $90 | $72 |
| 3 | 100 Free, 30 Pro | $270 | $216 |
| 6 | 200 Free, 100 Pro, 5 Enterprise | $1,145 | $916 |
| 12 | 500 Free, 300 Pro, 20 Enterprise | $3,680 | $2,944 |

**Month 12 = $2,944/mo passive income** (conservative estimate)

### Optimistic Revenue Forecast
| Month | Users | Revenue | After Fees |
|-------|-------|---------|------------|
| 6 | 500 Pro, 20 Enterprise | $5,480 | $4,384/mo |
| 12 | 1000 Pro, 50 Enterprise | $11,450 | $9,160/mo |

**Month 12 = $9,160/mo** (optimistic)

---

## ✅ Marketplace Strategy

### Phase 1: Core Revenue (Week 1)
1. **RapidAPI** - Largest marketplace
   - Use GitHub Action (rapidapi-deploy.yml)
   - Expected approval: 1-2 days
   - Target: 70% of revenue

2. **API.market** - Secondary marketplace
   - Upload openapi.json
   - Expected approval: 1-3 days
   - Target: 20% of revenue

### Phase 2: Discovery (Week 2-3)
3. **PublicAPIs.io** - Developer directory
   - Submit via GitHub PR
   - Free, SEO benefits
   - Drives organic traffic

4. **APIs.guru** - OpenAPI directory
   - Automated listing
   - Used by dev tools (Postman, Insomnia)

### Phase 3: Premium & SEO (Month 2)
5. **APILayer** - Quality marketplace
   - Apply as provider (1-2 week approval)
   - Higher revenue share (70%)
   - Target: 10% of revenue

6. **ProgrammableWeb** - Established directory
   - Free listing
   - SEO authority boost

---

## 🎯 Next Steps (In Order)

### Step 1: Deploy API (CRITICAL - Do First)
```bash
# Option A: Deploy via Render Dashboard (easiest)
1. Go to https://render.com/
2. Sign up with GitHub
3. New Web Service → select calcleap-api repo
4. Use render.yaml config (auto-detected)
5. Deploy (2-3 minutes)
6. Get URL: https://calcleap-api.onrender.com

# Option B: Deploy via Render CLI
npm install -g render
render login
cd /path/to/calcleap-api
render services create web --region oregon --plan free
```

**Estimated time:** 15 minutes  
**Result:** Live API at https://calcleap-api.onrender.com

### Step 2: Update OpenAPI Spec
```bash
# In openapi.json, change:
"servers": [
  {
    "url": "https://calcleap-api.onrender.com",
    "description": "Production server"
  }
]

# Commit to GitHub
git add openapi.json
git commit -m "Update API server URL to Render deployment"
git push origin main
```

**Estimated time:** 5 minutes

### Step 3: Set Up RapidAPI GitHub Action
```bash
# 1. Get RapidAPI credentials (see RAPIDAPI.md)
# 2. Add GitHub secrets:
#    - RAPIDAPI_KEY
#    - RAPIDAPI_OWNER_ID
#    - RAPIDAPI_GRAPHQL_HOST
#    - RAPIDAPI_GRAPHQL_URL
#
# 3. Copy workflow file:
cp /data/workspace/rapidapi-listing/rapidapi-deploy.yml \
   /path/to/calcleap-api/.github/workflows/

# 4. Push to GitHub
cd /path/to/calcleap-api
git add .github/workflows/rapidapi-deploy.yml
git commit -m "Add RapidAPI auto-deploy workflow"
git push origin main
```

**Estimated time:** 30 minutes (including RapidAPI account setup)

### Step 4: List on API.market
```bash
# 1. Sign up at https://api.market/
# 2. Add New API → Import from OpenAPI
# 3. Upload openapi.json
# 4. Configure pricing tiers
# 5. Submit for review
```

**Estimated time:** 30 minutes

### Step 5: Submit to PublicAPIs.io
```bash
# 1. Fork https://github.com/davemachado/public-api
# 2. Edit entries.json
# 3. Add CalcLeap entry
# 4. Submit PR
```

**Estimated time:** 20 minutes

### Step 6: Create Logo & Assets (Optional but Recommended)
- **Logo:** 500x500px PNG (Canva template or Fiverr $5-15)
- **Screenshots:** Endpoint examples, code snippets
- **Benefits:** Professional appearance, higher conversion

**Estimated time:** 1-2 hours (or outsource for $15)

---

## 📁 File Locations

All files saved to: `/data/workspace/rapidapi-listing/`

```
rapidapi-listing/
├── openapi.json              # OpenAPI 3.0 spec (ready to use)
├── README.md                 # API documentation
├── DEPLOYMENT.md             # Hosting guide
├── RAPIDAPI.md               # RapidAPI listing guide
├── OTHER_MARKETPLACES.md     # Alternative marketplaces
├── rapidapi-deploy.yml       # GitHub Action workflow
├── render.yaml               # Render deployment config
└── SUMMARY.md                # This file
```

---

## 🔑 Key Success Factors

### 1. Deploy FIRST, List SECOND
- Marketplaces require working API URL
- Cannot test endpoints if API returns 404
- Approval delayed/rejected without live API

### 2. Use GitHub Action for RapidAPI
- Automated updates when OpenAPI changes
- No manual UI uploads
- Version control for API specs

### 3. Start with Free Tier Hosting
- Render free tier is sufficient initially
- Upgrade when revenue > hosting cost
- Cold starts acceptable for low traffic

### 4. List on Multiple Marketplaces
- RapidAPI = 70% of revenue
- API.market = 20% of revenue
- Others = SEO and discovery
- Diversification reduces platform risk

### 5. Optimize for Discovery
- SEO: PublicAPIs.io, ProgrammableWeb
- Developer tools: APIs.guru
- Quality: APILayer
- Volume: RapidAPI

---

## 💡 Pro Tips

### Prevent Render Free Tier Spin-Down
**Problem:** Free tier sleeps after 15 min inactivity  
**Solutions:**
1. Upgrade to Starter ($7/mo) for always-on
2. Set up cron job to ping every 10 minutes:
   ```bash
   # In render.yaml, add cron service (requires paid plan)
   # OR use external service like cron-job.org
   ```

### Monitor API Health
```bash
# Set up UptimeRobot (free tier: 50 monitors)
# Ping: https://calcleap-api.onrender.com/api/health
# Alert: Email if down > 5 minutes
```

### Track Revenue
- RapidAPI dashboard: Daily/monthly revenue
- API.market dashboard: Subscription analytics
- Spreadsheet: Aggregate across platforms
- Goal: Break even ($7/mo) within 4-6 weeks

### Promote Your API
- Reddit: r/SideProject, r/webdev, r/javascript
- Hacker News: Show HN post
- Product Hunt: Launch listing
- Twitter: Share milestone (e.g., "100 API calls today!")
- CalcLeap.com: Add prominent "API for Developers" section

---

## 📞 Support

**Questions or issues?**
- Email: alexmathewc@gmail.com
- GitHub: https://github.com/alexchalu/calcleap-api/issues
- Documentation: https://calcleap.com/api-docs.html

---

## ✅ Checklist

Use this to track progress:

### Pre-Launch
- [ ] Deploy API to Render
- [ ] Verify all 8 endpoints work on live URL
- [ ] Update openapi.json with live server URL
- [ ] Test OpenAPI spec validation (editor.swagger.io)
- [ ] Create logo (500x500px)
- [ ] Take screenshots of API responses

### Marketplace Listings
- [ ] RapidAPI account created
- [ ] RapidAPI GitHub secrets configured
- [ ] RapidAPI GitHub Action deployed
- [ ] RapidAPI listing submitted for review
- [ ] API.market account created
- [ ] API.market listing submitted
- [ ] PublicAPIs.io PR submitted
- [ ] APIs.guru PR submitted
- [ ] APILayer provider application submitted

### Post-Launch
- [ ] First API subscriber!
- [ ] First Pro subscriber ($9)
- [ ] Revenue > $7/mo (break even)
- [ ] Revenue > $100/mo
- [ ] Revenue > $1,000/mo
- [ ] First Enterprise customer ($49)

---

**Status:** Package complete. Ready for deployment.  
**Timeline:** 4-6 hours total to deploy and list on all marketplaces  
**Expected outcome:** Live, monetizable API generating passive income within 2-4 weeks
