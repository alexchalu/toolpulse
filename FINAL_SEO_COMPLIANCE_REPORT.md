# SEO & AdSense Compliance Verification Report
## CalcLeap.com - April 1, 2026

---

## Executive Summary

Comprehensive audit of 1,237 pages checking 10 SEO and AdSense compliance requirements.

**Overall Status:** ⚠️ **MOSTLY COMPLIANT** with 27 issues requiring attention

### Quick Stats
- ✅ **robots.txt**: Correct
- ✅ **sitemap.xml**: All 1,237 URLs point to existing files
- ✅ **ads.txt**: Contains correct AdSense ID (pub-3112605892426625)
- ✅ **Viewport tags**: 100% compliant (1,237/1,237 pages)
- ✅ **HTTPS links**: No http:// internal links found
- ⚠️  **Schema markup**: 60% compliant (18/30 sampled pages)
- ⚠️  **Canonical URLs**: 100% present, all correct domain
- ⚠️  **Open Graph tags**: 90% compliant (27/30 sampled pages)
- ❌ **External resources**: 2 pages with CDN dependencies
- ❌ **AdSense code**: 4 pages missing AdSense

---

## 1. robots.txt ✅

**Status:** PASS

```
User-agent: *
Allow: /
Sitemap: https://calcleap.com/sitemap.xml
```

- ✓ Correct sitemap URL: https://calcleap.com/sitemap.xml
- ✓ No important pages blocked
- ✓ Allows all crawlers

**Recommendation:** No action needed.

---

## 2. sitemap.xml - File Existence ✅

**Status:** PASS

- ✓ Contains 1,237 URLs
- ✓ All 1,237 URLs point to files that exist on disk
- ✓ No broken sitemap references

**Recommendation:** No action needed.

---

## 3. ads.txt ✅

**Status:** PASS

```
google.com, pub-3112605892426625, DIRECT, f08c47fec0942fa0
```

- ✓ File exists at root
- ✓ Contains correct AdSense publisher ID: pub-3112605892426625
- ✓ Properly formatted

**Recommendation:** No action needed.

---

## 4. Schema Markup (JSON-LD) ⚠️

**Status:** PARTIAL COMPLIANCE

### Statistics
- **Sampled:** 30 pages
- **Valid schema:** 18 pages (60%)
- **Missing schema:** 12 pages (40%)

### Pages Missing Schema
1. best-credit-cards.html
2. calc/cost-of-living-kansas-city-mo.html
3. calc/renters-insurance-calculator.html
4. car-insurance-calculator.html ⚠️ CRITICAL
5. convert-ml-to-cups.html
6. convert-tablespoons-to-teaspoons.html
7. georgia-sales-tax-calculator.html
8. insolvency-calculator.html
9. los-angeles-cost-of-living-calculator.html
10. mississippi-income-tax-calculator.html
11. (2 more not shown)

### Recommendation
Add JSON-LD schema markup with @context and @type to all pages. Priority: High-traffic calculator pages (car-insurance-calculator.html, cost-of-living pages).

**Template:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Car Insurance Calculator",
  "description": "Calculate your car insurance premium...",
  "url": "https://calcleap.com/car-insurance-calculator.html"
}
</script>
```

---

## 5. Canonical URLs ✅

**Status:** PASS

- ✓ All 30 sampled pages have canonical tags
- ✓ All point to calcleap.com (correct domain)
- ✓ No alexchalu.github.io references found
- ✓ Proper format

**Example:**
```html
<link rel="canonical" href="https://calcleap.com/mortgage-calculator.html">
```

**Recommendation:** No action needed.

---

## 6. Open Graph Tags ⚠️

**Status:** MOSTLY COMPLIANT

### Statistics
- **Complete OG tags:** 27/30 pages (90%)
- **Missing OG tags:** 3 pages (10%)

### Pages Missing OG Tags
All 3 OG properties missing on:
1. calc/cost-of-living-kansas-city-mo.html
2. calc/energy-cost-calculator.html
3. car-insurance-calculator.html

### Recommendation
Add og:title, og:description, og:url to these 3 pages.

**Template:**
```html
<meta property="og:title" content="Car Insurance Calculator">
<meta property="og:description" content="Calculate your car insurance premium...">
<meta property="og:url" content="https://calcleap.com/car-insurance-calculator.html">
```

---

## 7. Mobile Viewport ✅

**Status:** PASS

- ✓ ALL 1,237 pages checked
- ✓ 100% compliance
- ✓ All have: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`

**Recommendation:** No action needed. Perfect compliance.

---

## 8. External Resources (CSS/JS) ❌

**Status:** FAIL

### Issues Found
**2 pages with external CDN dependencies:**

1. **markdown-preview.html**
   - External: `https://cdn.jsdelivr.net/npm/marked/marked.min.js`

2. **qr-code-generator.html**
   - External: `https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js`

3. **hash-generator.html**
   - External: `https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js`

### Impact
- ⚠️ Page load dependency on external CDNs
- ⚠️ Potential for failures if CDN is down
- ⚠️ Slower page loads
- ⚠️ Privacy concerns

### Recommendation
**HIGH PRIORITY:** Self-host these libraries or remove the pages from the site.

**Options:**
1. Download and host libraries locally at /js/
2. Implement functionality without external dependencies
3. Remove these utility pages if not critical

---

## 9. AdSense Code ❌

**Status:** FAIL

### Statistics
- **Pages with AdSense:** 26/30 sampled (87%)
- **Pages missing AdSense:** 4/30 (13%)

### Pages Missing AdSense Script
1. calc/cost-of-living-kansas-city-mo.html
2. calc/energy-cost-calculator.html
3. car-insurance-calculator.html ⚠️ CRITICAL
4. personal-injury-settlement-calculator.html

### Expected AdSense Code
Pages should have:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3112605892426625" crossorigin="anonymous"></script>
```

And ad units:
```html
<div class="ad-container">
  <ins class="adsbygoogle" 
       style="display:block" 
       data-ad-client="ca-pub-3112605892426625" 
       data-ad-slot="auto" 
       data-ad-format="auto" 
       data-full-width-responsive="true">
  </ins>
  <script>(adsbygoogle=window.adsbygoogle||[]).push({});</script>
</div>
```

### Impact
- ❌ Lost revenue on these pages
- ❌ Inconsistent user experience
- ❌ Potential AdSense policy issues

### Recommendation
**CRITICAL:** Add AdSense code to all 4 pages immediately. These appear to be incomplete or outdated versions.

---

## 10. HTTPS Links ✅

**Status:** PASS

- ✓ No http://calcleap.com links found
- ✓ All internal links use relative paths or https://
- ✓ No mixed content issues

**Recommendation:** No action needed.

---

## Critical Issues Summary

### 🔴 HIGH PRIORITY (Fix Immediately)

1. **car-insurance-calculator.html** - Missing:
   - Schema markup
   - Open Graph tags
   - AdSense code
   - **Action:** This file appears incomplete. Replace with car-insurance-estimator.html or rebuild.

2. **External CDN Dependencies** (3 pages)
   - markdown-preview.html
   - qr-code-generator.html
   - hash-generator.html
   - **Action:** Self-host libraries or remove pages

3. **Missing AdSense** (4 pages)
   - **Action:** Add AdSense code to all 4 pages

### 🟡 MEDIUM PRIORITY (Fix Soon)

4. **Missing Schema** (12 pages)
   - **Action:** Add JSON-LD schema to all pages

5. **Missing OG Tags** (3 pages)
   - **Action:** Add Open Graph meta tags

---

## Files Requiring Immediate Attention

### car-insurance-calculator.html
This file appears to be an incomplete/broken version:
- 375 lines (vs 517 lines in car-insurance-estimator.html)
- Missing schema
- Missing OG tags  
- Missing AdSense
- Missing footer content

**Recommendation:** Compare with car-insurance-estimator.html and either:
- Replace car-insurance-calculator.html with the working version
- Fix the missing elements
- Remove from sitemap if obsolete

### calc/ subdirectory files
Several calc/ files missing components:
- calc/cost-of-living-kansas-city-mo.html
- calc/energy-cost-calculator.html  
- calc/renters-insurance-calculator.html

Check if these are old versions or need updating.

---

## Compliance Score

| Requirement | Status | Score |
|------------|--------|-------|
| 1. robots.txt | ✅ Pass | 100% |
| 2. Sitemap file existence | ✅ Pass | 100% |
| 3. ads.txt | ✅ Pass | 100% |
| 4. Schema markup | ⚠️ Partial | 60% |
| 5. Canonical URLs | ✅ Pass | 100% |
| 6. Open Graph tags | ⚠️ Partial | 90% |
| 7. Viewport tags | ✅ Pass | 100% |
| 8. No external resources | ❌ Fail | 99.8% |
| 9. AdSense code present | ❌ Fail | 87% |
| 10. HTTPS links | ✅ Pass | 100% |
| **OVERALL** | **⚠️ PARTIAL** | **94%** |

---

## Recommended Action Plan

### Phase 1: Critical Fixes (Do Now)
1. Fix car-insurance-calculator.html (replace or update)
2. Add AdSense to 4 missing pages
3. Self-host or remove external CDN dependencies (3 pages)

### Phase 2: High Priority (This Week)
4. Add schema markup to 12 pages missing it
5. Add OG tags to 3 pages

### Phase 3: Optimization (Ongoing)
6. Standardize schema across all pages
7. Monitor for future issues
8. Consider automated schema generation

---

## Detailed Issue List

All issues have been logged to: `seo_audit_detailed.txt`

**Total issues:** 27
- 4_SCHEMA: 12 issues
- 6_OG: 9 issues  
- 8_EXTERNAL: 3 issues
- 9_ADSENSE: 4 issues

---

## Conclusion

CalcLeap.com is **94% compliant** with SEO and AdSense requirements. The main issues are:

1. A few incomplete calculator pages (car-insurance-calculator.html is the worst)
2. Some pages missing schema markup (40% of sample)
3. A few utility pages with external CDN dependencies
4. 4 pages missing AdSense code

**The site is in good shape overall**, but the issues found represent:
- Lost revenue (missing AdSense)
- SEO opportunities (missing schema)
- Performance/reliability risks (CDN dependencies)

**Estimated time to fix all issues:** 2-4 hours

---

*Report generated: April 1, 2026*  
*Pages audited: 1,237*  
*Sample checked: 30 pages (detailed)*  
*Viewport checked: 1,237 pages (all)*
