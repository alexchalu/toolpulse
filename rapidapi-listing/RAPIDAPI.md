# RapidAPI Listing Guide

## Overview

RapidAPI supports **programmatic API listing** via GitHub Actions. This is the recommended approach vs. manual UI uploads.

## Prerequisites

✅ **BEFORE listing on RapidAPI:**
1. Deploy the API to a live server (see DEPLOYMENT.md)
2. Verify all endpoints return valid responses
3. Have the OpenAPI 3.0 spec ready (✅ already created: `openapi.json`)
4. Have a RapidAPI account

## Method 1: GitHub Action (RECOMMENDED)

RapidAPI provides an official GitHub Action that automatically uploads/updates your API listing from an OpenAPI spec.

### Step 1: Get RapidAPI Credentials

1. Sign up at https://rapidapi.com/
2. Navigate to https://rapidapi.com/developer/dashboard
3. Go to **My APIs** → **Provider Dashboard**
4. Get your credentials:
   - `x-rapidapi-key` - Your API key
   - `x-rapidapi-graphql-host` - GraphQL endpoint (e.g., `graphql-platform.rapidapi.com`)
   - `owner_id` - Your user/team ID (found in dashboard)

### Step 2: Add GitHub Secrets

In the CalcLeap API GitHub repo (https://github.com/alexchalu/calcleap-api):

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add the following secrets:
   - `RAPIDAPI_KEY` = your x-rapidapi-key
   - `RAPIDAPI_OWNER_ID` = your owner ID
   - `RAPIDAPI_GRAPHQL_HOST` = graphql-platform.rapidapi.com
   - `RAPIDAPI_GRAPHQL_URL` = https://graphql-platform.p.rapidapi.com/

### Step 3: Create GitHub Action Workflow

Create `.github/workflows/rapidapi-deploy.yml` in the repo:

```yaml
name: Deploy to RapidAPI

on:
  push:
    branches:
      - main
    paths:
      - 'openapi.json'
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Upload API to RapidAPI
        id: rapidapi-upload
        uses: RapidAPI/create_or_update_rapidapi_listing@v0
        with:
          spec_path: openapi.json
          owner_id: ${{ secrets.RAPIDAPI_OWNER_ID }}
          x_rapidapi_key: ${{ secrets.RAPIDAPI_KEY }}
          x_rapidapi_graphql_host: ${{ secrets.RAPIDAPI_GRAPHQL_HOST }}
          graphql_url: ${{ secrets.RAPIDAPI_GRAPHQL_URL }}

      - name: Display API info
        run: |
          echo "API ID: ${{ steps.rapidapi-upload.outputs.api_id }}"
          echo "API Version: ${{ steps.rapidapi-upload.outputs.api_version_name }}"
          echo "API Version ID: ${{ steps.rapidapi-upload.outputs.api_version_id }}"
```

### Step 4: Prepare OpenAPI Spec

The `openapi.json` file is already created with:
- ✅ All 8 endpoints defined
- ✅ RapidAPI extensions (x-category, x-pricing, x-tags)
- ✅ Complete parameter schemas
- ✅ Response examples

**Key RapidAPI Extensions Added:**
```json
"x-category": "Financial",
"x-tags": ["calculator", "finance", "mortgage", ...],
"x-pricing": [
  {
    "name": "Free",
    "price": "0",
    "quota": 100,
    "quotaPeriod": "day"
  },
  {
    "name": "Pro",
    "price": "9",
    "quota": 10000,
    "quotaPeriod": "day"
  },
  {
    "name": "Enterprise",
    "price": "49",
    "quota": -1,
    "quotaPeriod": "unlimited"
  }
]
```

### Step 5: Update `openapi.json` with Live Server URL

**CRITICAL:** Before deploying, update the `servers` section in `openapi.json`:

```json
"servers": [
  {
    "url": "https://calcleap-api.onrender.com",
    "description": "Production server"
  }
]
```

Replace with your actual deployed URL from Render/Railway/Fly.io.

### Step 6: Trigger Deployment

**Option A: Push to main branch**
```bash
cd /path/to/calcleap-api
cp /data/workspace/rapidapi-listing/openapi.json .
git add openapi.json .github/workflows/rapidapi-deploy.yml
git commit -m "Add RapidAPI deployment workflow"
git push origin main
```

**Option B: Manual trigger**
1. Go to GitHub → Actions tab
2. Select "Deploy to RapidAPI" workflow
3. Click "Run workflow"

### Step 7: Verify Listing

1. Check GitHub Actions output for API ID
2. Visit RapidAPI Provider Dashboard
3. Your API should appear in "My APIs"
4. Complete the listing:
   - Add logo (500x500px PNG)
   - Add screenshots
   - Review pricing tiers
   - Add FAQ/tutorials (optional)
   - Submit for review

### Step 8: Publish & Monetize

1. RapidAPI reviews your API (usually 1-2 business days)
2. Once approved, your API goes live on RapidAPI Marketplace
3. Users can subscribe to Free/Pro/Enterprise tiers
4. You earn revenue from Pro/Enterprise subscriptions
5. RapidAPI takes a commission (typically 20%)

## Method 2: Manual Upload via RapidAPI UI

If GitHub Action doesn't work, use the manual method:

1. Login to RapidAPI Provider Dashboard
2. Click **Add New API**
3. Upload `openapi.json` file
4. Fill in metadata:
   - **Name:** CalcLeap Financial Calculator API
   - **Category:** Financial
   - **Description:** (use content from README.md)
   - **Base URL:** https://your-deployed-url.com
   - **Logo:** Upload 500x500px PNG
5. Configure pricing tiers (Free, Pro, Enterprise as defined above)
6. Add documentation (README.md content)
7. Submit for review

## Pricing Strategy

The API is configured with three tiers:

| Tier | Price | Quota | Target Audience |
|------|-------|-------|-----------------|
| **Free** | $0/mo | 100 req/day | Developers testing, hobby projects |
| **Pro** | $9/mo | 10K req/day | Small businesses, production apps |
| **Enterprise** | $49/mo | Unlimited | High-volume apps, enterprise clients |

**Revenue Potential:**
- 100 Free users = $0
- 50 Pro users = $450/mo (minus 20% RapidAPI fee = $360/mo)
- 10 Enterprise users = $490/mo (minus fee = $392/mo)
- **Total potential:** $752/mo passive income

**Scaling:**
- At 500 Pro users: $3,600/mo
- At 100 Enterprise users: $3,920/mo

## RapidAPI Features to Enable

Once listed, configure these features in the RapidAPI dashboard:

### 1. Analytics
- Track usage by endpoint
- Monitor subscription conversions
- View revenue metrics

### 2. API Monitoring
- Set up health checks
- Get alerts for downtime
- Monitor response times

### 3. Support & Communication
- Enable discussion boards
- Respond to user questions
- Collect feature requests

### 4. Marketing
- Submit API to RapidAPI blog for feature
- Create tutorials (boost visibility)
- Run promotions (free trial periods)

## OpenAPI Spec Validation

Before uploading, validate the spec:

**Option 1: Online validator**
```bash
# Visit: https://editor.swagger.io/
# Paste openapi.json content
```

**Option 2: CLI validator**
```bash
npm install -g @apidevtools/swagger-cli
swagger-cli validate openapi.json
```

## Troubleshooting

### Error: "Invalid OpenAPI spec"
- Ensure `servers[0].url` is a valid, live URL
- Check all `$ref` references resolve correctly
- Validate JSON syntax

### Error: "API already exists"
- The GitHub Action will UPDATE if API name matches
- Check your RapidAPI dashboard for existing "CalcLeap" listings
- Delete old listing or use a different name

### Error: "Unauthorized"
- Verify `x-rapidapi-key` is correct
- Ensure `owner_id` matches your account
- Check API key has "provider" permissions

## Post-Launch Checklist

After successful RapidAPI listing:

- [ ] Test all endpoints via RapidAPI web client
- [ ] Verify rate limiting works correctly
- [ ] Subscribe to your own Free tier (test user flow)
- [ ] Set up analytics tracking
- [ ] Add API to personal website/portfolio
- [ ] Share on social media (Twitter, LinkedIn, Reddit r/SideProject)
- [ ] Submit to RapidAPI blog for potential feature
- [ ] Monitor support inbox daily
- [ ] Track revenue in RapidAPI dashboard

## Files Included

All necessary files for RapidAPI listing:

- ✅ `openapi.json` - Complete OpenAPI 3.0 spec with RapidAPI extensions
- ✅ `README.md` - API documentation (use for RapidAPI About/Docs section)
- ✅ `.github/workflows/rapidapi-deploy.yml` - GitHub Action workflow (create this)
- 🔄 Logo image - **TODO:** Create 500x500px logo for CalcLeap
- 🔄 Screenshots - **TODO:** Capture endpoint examples

## Logo & Assets TODO

**Logo Requirements:**
- Size: 500x500px
- Format: PNG or JPG
- Transparent background recommended
- Represents "calculator" or "financial" theme

**Screenshot Ideas:**
1. JSON response from mortgage endpoint
2. Compound interest calculation example
3. Insurance estimate by state
4. Integration code snippet

**Create with:**
- Canva (templates for API logos)
- Figma
- Or hire on Fiverr ($5-15 for simple logo)

## Next Steps

1. **Deploy API to Render** (see DEPLOYMENT.md)
2. **Update `openapi.json` with live server URL**
3. **Create RapidAPI account** and get credentials
4. **Set up GitHub Action** using steps above
5. **Push to GitHub** to trigger auto-upload
6. **Complete listing** with logo/screenshots
7. **Submit for review**
8. **Launch and promote!**

---

**Estimated Time:** 2-3 hours (excluding review wait time)

**Revenue Timeline:**
- Week 1: Setup and approval
- Week 2-4: First subscribers (0-10 users)
- Month 2-3: Growth phase (10-50 users)
- Month 4+: Steady passive income ($100-500/mo)
