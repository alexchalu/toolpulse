# Other API Marketplace Listing Guide

In addition to RapidAPI, CalcLeap should be listed on these API marketplaces to maximize reach and revenue.

---

## 1. API.market

**URL:** https://api.market/  
**Docs:** https://docs.api.market/

### Overview
- **Gateway-based marketplace** similar to RapidAPI
- Handles authentication, billing, rate limiting automatically
- Free to list, commission-based revenue
- Requires OpenAPI spec import

### How to List

#### Step 1: Create Account
1. Sign up at https://api.market/
2. Verify email
3. Navigate to "Seller Dashboard"

#### Step 2: Import API via OpenAPI Spec
1. Click **"Add New API"**
2. Select **"Import from OpenAPI"**
3. Upload `openapi.json` (already created)
4. API.market will parse all endpoints automatically

#### Step 3: Configure Metadata
- **Name:** CalcLeap Financial Calculator API
- **Category:** Finance & Business Tools
- **Description:** (use README.md content)
- **Tags:** calculator, finance, mortgage, retirement, insurance, BMI, loan
- **Logo:** 500x500px PNG
- **Base URL:** Your deployed API URL (e.g., https://calcleap-api.onrender.com)

#### Step 4: Set Pricing Plans
API.market supports flexible pricing tiers:

| Plan | Price | Quota | Description |
|------|-------|-------|-------------|
| Free | $0/mo | 100/day | Testing and hobby projects |
| Pro | $9/mo | 10,000/day | Production apps |
| Enterprise | $49/mo | Unlimited | High-volume usage |

#### Step 5: Configure Gateway Settings
- **Authentication:** API key (API.market provides this)
- **Rate Limiting:** Set per pricing tier (handled automatically)
- **CORS:** Enable for all origins
- **Caching:** Disable (real-time calculations)

#### Step 6: Add Documentation
- Paste README.md content into "API Documentation" section
- Add code examples (JavaScript, Python, cURL)
- Upload sample requests/responses

#### Step 7: Submit for Review
- Review all fields
- Click **"Submit for Review"**
- Approval time: 1-3 business days

### Revenue Model
- API.market takes **20-30% commission**
- Monthly payouts via Stripe/PayPal
- Analytics dashboard for tracking subscriptions

### Pros & Cons
✅ Gateway handles all infrastructure  
✅ Built-in billing and subscriptions  
✅ Growing marketplace with active users  
❌ Commission fee (20-30%)  
❌ Smaller user base than RapidAPI

---

## 2. APILayer

**URL:** https://apilayer.com/marketplace  
**Provider Portal:** https://apilayer.com/providers

### Overview
- Established API marketplace (formerly part of APIHub)
- Known for high-quality, well-documented APIs
- Strong fintech and data API categories
- Free tier supported

### How to List

#### Step 1: Apply as Provider
1. Visit https://apilayer.com/providers
2. Fill out provider application form:
   - Company/Individual name
   - API description
   - Expected API category
   - Contact email
3. Wait for approval (1-2 weeks)

#### Step 2: Provider Onboarding
Once approved:
1. Access provider dashboard
2. Complete profile:
   - Company information
   - Payment details (bank/PayPal)
   - Tax information (W-9 for US, W-8 for international)

#### Step 3: Create API Listing
1. Click **"Add New API"**
2. Fill in details:
   - **Name:** CalcLeap Financial Calculator API
   - **Category:** Financial Services
   - **Short Description:** 8 powerful financial calculators in one API
   - **Long Description:** (use README.md content)

#### Step 4: Upload OpenAPI Spec
- Upload `openapi.json`
- APILayer will validate and parse endpoints
- Review auto-generated endpoint documentation
- Add custom descriptions if needed

#### Step 5: Pricing Configuration
APILayer uses credit-based pricing:

**Example pricing structure:**
- **Free:** 100 requests/month (0 credits)
- **Starter:** $9.99/mo (1,000 requests)
- **Pro:** $49.99/mo (10,000 requests)
- **Enterprise:** Custom pricing

**Revenue split:** 70% provider, 30% APILayer

#### Step 6: Documentation & Assets
- Add endpoint examples
- Upload logo (512x512px recommended)
- Add screenshots of responses
- Include integration guides

#### Step 7: Testing & Launch
- Use APILayer's testing console to verify endpoints
- Submit for final review
- Once approved, API goes live on marketplace

### Revenue Model
- **70/30 split** (you keep 70%)
- Monthly payouts (minimum $100 threshold)
- Transparent analytics dashboard

### Pros & Cons
✅ Higher revenue share (70% vs RapidAPI's 80%)  
✅ Quality-focused marketplace  
✅ Good for fintech APIs  
❌ Longer approval process  
❌ Requires provider application

---

## 3. PublicAPIs.io

**URL:** https://publicapis.io/  
**GitHub:** https://github.com/davemachado/public-api

### Overview
- **Directory/catalog** of public APIs (NOT a marketplace)
- Free listing, no revenue sharing
- High traffic from developers searching for APIs
- Great for brand visibility and organic discovery
- No billing integration (users subscribe directly to you)

### How to List

#### Method 1: Submit via Website (If Available)
1. Visit https://publicapis.io/
2. Look for "Submit API" or "Add Your API" button
3. Fill out submission form

#### Method 2: Submit via GitHub (Primary Method)
PublicAPIs.io is community-driven via GitHub:

1. **Fork the repository:**
   ```bash
   # Visit: https://github.com/davemachado/public-api
   # Click "Fork"
   ```

2. **Edit the JSON file:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/public-api.git
   cd public-api
   ```

3. **Add CalcLeap to `entries.json`:**
   ```json
   {
     "API": "CalcLeap Financial Calculator",
     "Description": "Mortgage, compound interest, retirement, loan, insurance, BMI, tip, and percentage calculators",
     "Auth": "apiKey",
     "HTTPS": true,
     "CORS": "yes",
     "Link": "https://calcleap.com/api-docs.html",
     "Category": "Finance"
   }
   ```

4. **Submit Pull Request:**
   ```bash
   git add entries.json
   git commit -m "Add CalcLeap Financial Calculator API"
   git push origin main
   # Create PR on GitHub
   ```

5. **Wait for Review:**
   - Maintainers review PRs weekly
   - Approval time: 1-2 weeks
   - Once merged, API appears on PublicAPIs.io

### What to Include
- **API Name:** CalcLeap Financial Calculator
- **Description:** Brief (1-2 sentences)
- **Auth Type:** apiKey (or "No" for free tier)
- **HTTPS:** Yes
- **CORS:** Yes
- **Category:** Finance
- **Link:** https://calcleap.com/api-docs.html

### Revenue Model
- **No direct revenue** (it's a directory, not a marketplace)
- Users visit your site directly to subscribe
- Good for **SEO and brand awareness**

### Pros & Cons
✅ Free listing, no fees  
✅ High traffic from developers  
✅ SEO benefits (backlink)  
✅ Community-driven, trusted source  
❌ No billing integration  
❌ Manual approval via GitHub PR  
❌ No analytics provided

---

## 4. ProgrammableWeb (API Directory)

**URL:** https://www.programmableweb.com/apis/directory

### Overview
- One of the oldest API directories (est. 2005)
- Over 24,000 APIs listed
- Free directory listing
- Good for SEO and discoverability

### How to List

#### Step 1: Create Account
1. Sign up at https://www.programmableweb.com/
2. Verify email

#### Step 2: Submit API
1. Navigate to "Submit API"
2. Fill out form:
   - **API Name:** CalcLeap Financial Calculator API
   - **Category:** Finance
   - **Base URL:** https://calcleap-api.onrender.com
   - **Description:** (use README.md summary)
   - **Protocols:** REST
   - **Data Formats:** JSON
   - **Authentication:** API Key
   - **SSL Support:** Yes
   - **CORS:** Yes

#### Step 3: Add Documentation
- Link to API docs: https://calcleap.com/api-docs.html
- Add endpoint examples
- Upload OpenAPI spec (optional)

#### Step 4: Submit for Review
- Review time: 1-3 weeks
- Manual review by ProgrammableWeb team

### Pros & Cons
✅ Established directory with high authority  
✅ Good for SEO  
✅ Free listing  
❌ Slow review process  
❌ No billing/marketplace features  
❌ Less traffic than modern platforms

---

## 5. APIs.guru (OpenAPI Directory)

**URL:** https://apis.guru/  
**GitHub:** https://github.com/APIs-guru/openapi-directory

### Overview
- **Largest OpenAPI spec repository**
- Machine-readable API directory
- Free, automated listing via GitHub PR
- Used by tools like Postman, Insomnia, Swagger

### How to List

#### Step 1: Fork Repository
```bash
git clone https://github.com/APIs-guru/openapi-directory.git
cd openapi-directory
```

#### Step 2: Add OpenAPI Spec
1. Create directory: `APIs/calcleap.com/1.0.0/`
2. Copy your `openapi.json` → `openapi.yaml` (convert to YAML)
3. Add `patch.yaml` if needed (for corrections)

#### Step 3: Submit PR
```bash
git add APIs/calcleap.com/
git commit -m "Add CalcLeap Financial Calculator API"
git push origin main
# Create PR
```

#### Step 4: Automated Validation
- APIs.guru bot validates OpenAPI spec
- Checks for errors, formatting issues
- Once validated, auto-merged

### Pros & Cons
✅ Automated listing (no manual review)  
✅ Widely used by developer tools  
✅ Free, no fees  
❌ Requires YAML format  
❌ No marketplace/billing features  
❌ Purely technical directory

---

## Comparison Table

| Marketplace | Fee | Revenue Share | Approval Time | Billing | Best For |
|-------------|-----|---------------|---------------|---------|----------|
| **RapidAPI** | 20% | 80% to you | 1-2 days | Built-in | Main revenue source |
| **API.market** | 20-30% | 70-80% to you | 1-3 days | Built-in | Secondary revenue |
| **APILayer** | 30% | 70% to you | 1-2 weeks | Built-in | Premium marketplace |
| **PublicAPIs.io** | Free | N/A | 1-2 weeks | External | Discovery & SEO |
| **ProgrammableWeb** | Free | N/A | 1-3 weeks | External | SEO & brand |
| **APIs.guru** | Free | N/A | Instant | External | Developer tools |

---

## Recommended Listing Strategy

### Phase 1: Primary Revenue (Week 1)
1. **RapidAPI** - Main marketplace (GitHub Action)
2. **API.market** - Secondary marketplace

### Phase 2: Discoverability (Week 2-3)
3. **PublicAPIs.io** - GitHub PR submission
4. **APIs.guru** - OpenAPI directory

### Phase 3: SEO & Brand (Month 2)
5. **APILayer** - Apply as provider
6. **ProgrammableWeb** - Directory listing
7. **Public Press** - Reddit r/SideProject, Hacker News Show HN, Product Hunt

### Expected Timeline
- **Week 1:** Deploy + RapidAPI + API.market
- **Week 2:** PublicAPIs.io PR + APIs.guru
- **Week 3:** APILayer application
- **Month 2:** Approved on all platforms, revenue flowing

### Revenue Projection
**Conservative estimate (Month 3-6):**
- RapidAPI: 30 Pro users = $270/mo (after fees)
- API.market: 10 Pro users = $72/mo (after fees)
- APILayer: 5 Pro users = $35/mo (after fees)
- **Total:** ~$377/mo passive income

**Optimistic (Month 6-12):**
- RapidAPI: 100 Pro, 10 Enterprise = $1,120/mo
- API.market: 30 Pro users = $216/mo
- APILayer: 20 Pro users = $140/mo
- **Total:** ~$1,476/mo passive income

---

## Next Steps

1. ✅ Deploy API to Render (see DEPLOYMENT.md)
2. ✅ List on RapidAPI (see RAPIDAPI.md)
3. 🔄 List on API.market (use openapi.json)
4. 🔄 Submit to PublicAPIs.io (GitHub PR)
5. 🔄 Submit to APIs.guru (GitHub PR)
6. 🔄 Apply to APILayer as provider
7. 🔄 Submit to ProgrammableWeb

**All files ready in `/data/workspace/rapidapi-listing/`**

---

## Support & Resources

- **OpenAPI Validator:** https://editor.swagger.io/
- **OpenAPI to Postman:** https://learning.postman.com/docs/integrations/available-integrations/working-with-openAPI/
- **API Best Practices:** https://swagger.io/resources/articles/best-practices-in-api-design/

**Questions?** Email alexmathewc@gmail.com
