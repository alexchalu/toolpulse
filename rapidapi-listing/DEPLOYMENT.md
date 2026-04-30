# CalcLeap API Deployment Status & Instructions

**Last Updated:** March 20, 2026

## Current Status

### ❌ API is NOT currently live
- The GitHub repo exists: https://github.com/alexchalu/calcleap-api
- Documentation page exists: https://calcleap.com/api-docs.html
- **BUT** the actual API endpoint at `https://calcleap.com/api/` returns **404 Not Found**
- The API needs to be deployed to a live server before it can be listed on marketplaces

## Recommended Hosting Options (2026)

Based on research, here are the best free/low-cost hosting options for Node.js APIs:

### 1. **Render** (RECOMMENDED for CalcLeap)
- ✅ **Free tier:** 750 hours/month (enough for 24/7 uptime)
- ✅ Generous free tier for static sites + APIs
- ✅ Auto-deploy from GitHub
- ✅ Custom domains supported
- ✅ SSL certificates included
- ✅ Best for: Production APIs with moderate traffic
- 📊 Free tier limits: 
  - 750 hours/month
  - 100GB bandwidth/month
  - Spins down after inactivity (30 sec cold start)

**Why Render?** Most complete PaaS with generous free tier. Perfect for CalcLeap's needs.

### 2. **Railway**
- ✅ Fastest deployment experience
- ✅ $5 free credits/month
- ⚠️ No longer has unlimited free tier (changed in 2023)
- ✅ Best for: Quick prototypes and testing
- 📊 With $5 credit: ~100-200 hours of uptime

**Why Railway?** Fast setup, but limited free credits make it less ideal for 24/7 production.

### 3. **Fly.io**
- ✅ Free tier: 3 shared VMs (256MB RAM each)
- ✅ Global edge deployment (low latency worldwide)
- ⚠️ Requires Docker knowledge
- ⚠️ CLI-first workflow (more complex)
- ✅ Best for: Global apps with low latency needs

**Why Fly.io?** Great for distributed apps, but more complex setup. Overkill for CalcLeap.

### 4. **Vercel** (NOT recommended for this API)
- ❌ Designed for frontend/serverless, not long-running APIs
- ❌ 10-second function timeout (won't work for persistent servers)
- ✅ Only use for serverless functions, not Express/http servers

## RECOMMENDED: Deploy to Render (Free Tier)

### Step 1: Prepare the Repository
The CalcLeap API repo needs a `render.yaml` config file:

```yaml
# render.yaml
services:
  - type: web
    name: calcleap-api
    env: node
    plan: free
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: PORT
        value: 3000
```

### Step 2: Deploy via Render Dashboard
1. Go to https://render.com/
2. Sign up/login with GitHub
3. Click "New +" → "Web Service"
4. Connect GitHub account and select `alexchalu/calcleap-api` repo
5. Configure:
   - **Name:** calcleap-api
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free
6. Click "Create Web Service"
7. Wait 2-3 minutes for deployment
8. Render will provide a URL like: `https://calcleap-api.onrender.com`

### Step 3: Test the Deployment
```bash
curl "https://calcleap-api.onrender.com/api/mortgage?principal=300000&rate=6.5&years=30"
```

### Step 4: Custom Domain Setup
Once verified working on Render's domain:

1. In Render dashboard → Settings → Custom Domains
2. Add domain: `api.calcleap.com` (or use calcleap.com/api with a reverse proxy)
3. Add CNAME record in DNS:
   ```
   api.calcleap.com  →  calcleap-api.onrender.com
   ```
4. Wait for SSL certificate to provision (automatic, ~5 minutes)

### Alternative: Subdirectory Proxy on Main Site
If you want `https://calcleap.com/api/...` instead of `api.calcleap.com`:

**Option A: Nginx reverse proxy** (if calcleap.com is on a VPS)
```nginx
location /api/ {
    proxy_pass https://calcleap-api.onrender.com/api/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

**Option B: Use Render directly** with main domain
Deploy to Render and use `calcleap.com` as the custom domain, but this requires moving the entire site.

## Alternative: Quick Deploy to Railway

### Step 1: Install Railway CLI
```bash
npm install -g railway
```

### Step 2: Deploy
```bash
cd /path/to/calcleap-api
railway login
railway init
railway up
```

Railway will provide a URL instantly. But remember: only $5/month free credits.

## Cost Comparison (24/7 Uptime)

| Platform | Free Tier | Paid (if needed) | Best For |
|----------|-----------|------------------|----------|
| **Render** | 750 hrs/mo (full month) | $7/mo for always-on | Production APIs |
| **Railway** | $5 credit (~150hrs) | $5-20/mo usage-based | Prototypes |
| **Fly.io** | 3 VMs (256MB) free | $1.94/mo per VM | Global apps |
| **Vercel** | ❌ (serverless only) | Not suitable | Frontend only |

## NEXT STEPS FOR ALEX

### Immediate Action Required:
1. **Deploy the API to Render (free tier)** - This will make it live
2. **Verify all 8 endpoints work** on the Render URL
3. **Set up custom domain** (api.calcleap.com or reverse proxy)
4. **Once live, THEN list on marketplaces:**
   - RapidAPI (programmatic via GitHub Action)
   - APILayer
   - API.market
   - PublicAPIs.io

### Why This Order Matters:
- RapidAPI requires a **working, publicly accessible API URL** during listing
- You cannot monetize an API that returns 404 errors
- Marketplaces will test your endpoints before approval

## Timeline Estimate

- **Deploy to Render:** 15 minutes (including account setup)
- **Test endpoints:** 10 minutes
- **Custom domain setup:** 30 minutes (DNS propagation)
- **List on RapidAPI:** 1 hour (setup GitHub Action + metadata)
- **List on other marketplaces:** 2-3 hours (manual submissions)

**Total:** ~4-5 hours to go from "not deployed" to "listed and monetizable"

## Files Created for Marketplace Listings

All materials are ready in `/data/workspace/rapidapi-listing/`:
- ✅ `openapi.json` - Full OpenAPI 3.0 spec with all 8 endpoints
- ✅ `README.md` - Comprehensive API documentation
- ✅ `DEPLOYMENT.md` - This deployment guide
- 🔄 `RAPIDAPI.md` - RapidAPI listing instructions (next file)
- 🔄 `OTHER_MARKETPLACES.md` - APILayer, API.market, PublicAPIs listings

## Important Notes

### Free Tier Limitations (Render)
- **Cold starts:** Free tier spins down after 15 min inactivity, 30-60 sec to wake up
- **Solution:** Upgrade to $7/mo "Starter" plan for always-on, or use a cron job to ping every 10 min
- **For CalcLeap:** Free tier is FINE to start. Upgrade when revenue > $7/mo

### Rate Limiting
The current API has no rate limiting built-in. Before going live:

**Option 1: Add rate limiting middleware**
```javascript
npm install express-rate-limit
```

**Option 2: Use RapidAPI's built-in rate limiting** (recommended)
When you list on RapidAPI, they handle rate limiting automatically based on pricing tiers.

## Support
- Render docs: https://render.com/docs
- Railway docs: https://docs.railway.app/
- Fly.io docs: https://fly.io/docs/

---

**Status:** Ready to deploy. API code is production-ready. Just needs a hosting platform.
