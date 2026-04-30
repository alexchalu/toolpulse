# CalcLeap API → Marketplaces - QUICK START

**Goal:** Deploy CalcLeap API and list on RapidAPI in under 1 hour

---

## 🚨 CRITICAL: API is NOT LIVE (Must Fix First)

Current status: https://calcleap.com/api/ returns **404 Not Found**

**You must deploy the API before listing on any marketplace.**

---

## ⚡ 3 Steps to Revenue

### Step 1: Deploy to Render (15 minutes)

1. **Go to** https://render.com/
2. **Sign up** with GitHub account
3. **Click** "New +" → "Web Service"
4. **Select** repository: `alexchalu/calcleap-api`
5. **Configure:**
   - Name: `calcleap-api`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Plan: **Free**
6. **Click** "Create Web Service"
7. **Wait** 2-3 minutes for deployment
8. **Copy** your URL: `https://calcleap-api.onrender.com`

**Test it:**
```bash
curl "https://calcleap-api.onrender.com/api/mortgage?principal=300000&rate=6.5&years=30"
```

You should see JSON response with mortgage calculation. ✅

---

### Step 2: Update OpenAPI Spec (5 minutes)

1. **Open** `/data/workspace/rapidapi-listing/openapi.json`
2. **Find** the `servers` section (around line 32)
3. **Change:**
   ```json
   "servers": [
     {
       "url": "https://calcleap.com",
       "description": "Production server"
     }
   ]
   ```
   **To:**
   ```json
   "servers": [
     {
       "url": "https://calcleap-api.onrender.com",
       "description": "Production server"
     }
   ]
   ```
4. **Copy** updated `openapi.json` to your calcleap-api repo
5. **Commit and push:**
   ```bash
   cd /path/to/calcleap-api
   git add openapi.json
   git commit -m "Update API server URL to Render deployment"
   git push origin main
   ```

---

### Step 3: List on RapidAPI (30 minutes)

#### 3a. Get RapidAPI Credentials (10 min)
1. Sign up at https://rapidapi.com/
2. Go to Provider Dashboard → My APIs
3. Note these values:
   - **x-rapidapi-key** (your API key)
   - **owner_id** (your user ID)
   - **x-rapidapi-graphql-host** (usually `graphql-platform.rapidapi.com`)

#### 3b. Add GitHub Secrets (5 min)
1. Go to https://github.com/alexchalu/calcleap-api/settings/secrets/actions
2. Click "New repository secret" and add:
   - Name: `RAPIDAPI_KEY`, Value: (your x-rapidapi-key)
   - Name: `RAPIDAPI_OWNER_ID`, Value: (your owner_id)
   - Name: `RAPIDAPI_GRAPHQL_HOST`, Value: `graphql-platform.rapidapi.com`
   - Name: `RAPIDAPI_GRAPHQL_URL`, Value: `https://graphql-platform.p.rapidapi.com/`

#### 3c. Add GitHub Action Workflow (10 min)
```bash
cd /path/to/calcleap-api
mkdir -p .github/workflows
cp /data/workspace/rapidapi-listing/rapidapi-deploy.yml .github/workflows/
git add .github/workflows/rapidapi-deploy.yml
git commit -m "Add RapidAPI auto-deploy workflow"
git push origin main
```

The GitHub Action will automatically run and upload your API to RapidAPI!

#### 3d. Complete RapidAPI Listing (5 min)
1. Go to RapidAPI Provider Dashboard
2. Find your newly created "CalcLeap Financial Calculator API"
3. Add:
   - Logo (500x500px PNG) - optional but recommended
   - Screenshots - optional
4. Review pricing tiers (Free, Pro, Enterprise)
5. Click "Submit for Review"

**Approval time:** 1-2 business days

---

## ✅ Done! What Now?

### You've Achieved:
- ✅ Live API deployed to Render (free tier)
- ✅ Listed on RapidAPI (pending approval)
- ✅ Automated updates via GitHub Action

### Next Steps (Optional):
- List on API.market (30 min) - see OTHER_MARKETPLACES.md
- Submit to PublicAPIs.io (20 min) - see OTHER_MARKETPLACES.md
- Create logo and screenshots (1-2 hours or outsource)
- Promote on social media

### Revenue Timeline:
- **Week 1:** RapidAPI approval
- **Week 2:** First API subscriber (likely Free tier)
- **Month 1:** First Pro subscriber ($9) → You earn $7.20
- **Month 3:** 10-30 Pro subscribers → $72-216/mo
- **Month 6:** 50-100 Pro + 5 Enterprise → $500-1,000/mo

---

## 🆘 Troubleshooting

**Problem:** Render deployment failed  
**Fix:** Check `package.json` has `"start": "node api.js"` script

**Problem:** API returns 500 error  
**Fix:** Check Render logs. Likely missing dependency. Verify `npm install` worked.

**Problem:** GitHub Action fails  
**Fix:** Double-check all 4 GitHub secrets are set correctly with exact names.

**Problem:** RapidAPI rejects listing  
**Fix:** Ensure API is live and responding. Test all endpoints manually.

**Problem:** Render spins down after 15 min  
**Fix:** Normal for free tier. Upgrade to $7/mo Starter plan when revenue > $7/mo.

---

## 📊 Success Metrics

**Day 1:**
- [ ] API deployed and live
- [ ] All 8 endpoints tested
- [ ] RapidAPI listing submitted

**Week 1:**
- [ ] RapidAPI approved
- [ ] First API call logged
- [ ] Analytics dashboard active

**Month 1:**
- [ ] First paying subscriber
- [ ] Revenue > $0
- [ ] Listed on 2+ marketplaces

**Month 3:**
- [ ] 10+ Pro subscribers
- [ ] Revenue > $100/mo
- [ ] Positive ROI on time invested

---

## 📞 Need Help?

- **Full docs:** See INDEX.md for all files
- **Deployment issues:** See DEPLOYMENT.md
- **Marketplace questions:** See RAPIDAPI.md or OTHER_MARKETPLACES.md
- **Email:** alexmathewc@gmail.com

---

**Total Time:** ~1 hour  
**Total Cost:** $0 (free tiers)  
**Potential Revenue:** $100-1,000/mo by Month 3-6

**Let's go! 🚀**
