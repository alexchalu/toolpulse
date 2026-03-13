# Deployment Guide - CalcLeap Embeddable Calculators

## Quick Deploy

### Option 1: Upload to GitHub Pages (if CalcLeap uses GH Pages)

```bash
# From the toolpulse directory
cd /data/workspace/toolpulse

# Copy files to CalcLeap repo
cp embed.html /path/to/calcleap-repo/
cp -r embed/ /path/to/calcleap-repo/

# Commit and push
cd /path/to/calcleap-repo
git add embed.html embed/
git commit -m "Add embeddable calculator widgets"
git push
```

### Option 2: Upload via FTP/SFTP

Upload these files to your web server:
```
embed.html          → https://calcleap.com/embed.html
embed/bmi.html      → https://calcleap.com/embed/bmi.html
embed/mortgage.html → https://calcleap.com/embed/mortgage.html
embed/compound.html → https://calcleap.com/embed/compound.html
embed/tip.html      → https://calcleap.com/embed/tip.html
embed/age.html      → https://calcleap.com/embed/age.html
```

### Option 3: Use Netlify/Vercel

```bash
# Install Netlify CLI (if not already installed)
npm install -g netlify-cli

# Deploy
cd /data/workspace/toolpulse
netlify deploy --prod
```

## Post-Deployment Checklist

### 1. Verify All URLs Work
- [ ] https://calcleap.com/embed.html (main showcase)
- [ ] https://calcleap.com/embed/bmi.html
- [ ] https://calcleap.com/embed/mortgage.html
- [ ] https://calcleap.com/embed/compound.html
- [ ] https://calcleap.com/embed/tip.html
- [ ] https://calcleap.com/embed/age.html

### 2. Test Each Calculator
- [ ] BMI: Enter 70kg, 170cm → Should show ~24.2 BMI (Normal)
- [ ] Mortgage: Enter $300k, 6.5%, 30yrs → Should show ~$1,896/month
- [ ] Compound: Enter $10k, 7%, 10yrs, monthly → Should show ~$20k
- [ ] Tip: Enter $50, 18% → Should show $9 tip, $59 total
- [ ] Age: Enter a birthdate → Should calculate correct age

### 3. Test Embed Codes
Copy an embed code from the showcase page and test it on:
- [ ] A test HTML page
- [ ] WordPress (if targeting WP sites)
- [ ] Medium/Substack (if allowing HTML embeds)

### 4. Mobile Testing
- [ ] Open each calculator on mobile device
- [ ] Verify responsive design works
- [ ] Test touch interactions (buttons, inputs)
- [ ] Check that iframes resize properly

### 5. Browser Testing
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari (desktop & mobile)
- [ ] Edge

## Integration with CalcLeap Main Site

### Add Navigation Link

Add to main CalcLeap navigation:
```html
<nav>
  <a href="/">Home</a>
  <a href="/calculators">Calculators</a>
  <a href="/embed.html">Embed Widgets</a> <!-- NEW -->
  <a href="/about">About</a>
</nav>
```

### Add Footer Link

```html
<footer>
  <div class="footer-links">
    <a href="/embed.html">Embeddable Widgets</a>
    <a href="/privacy">Privacy</a>
    <a href="/terms">Terms</a>
  </div>
</footer>
```

### Create Announcement Banner (Optional)

```html
<div class="announcement-banner">
  🎉 New: <a href="/embed.html">Free embeddable calculator widgets</a> for your website!
</div>
```

## SEO Optimization

### Update sitemap.xml
Add these URLs:
```xml
<url>
  <loc>https://calcleap.com/embed.html</loc>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
<url>
  <loc>https://calcleap.com/embed/bmi.html</loc>
  <changefreq>monthly</changefreq>
  <priority>0.6</priority>
</url>
<!-- Add other calculators -->
```

### robots.txt
Ensure widgets are crawlable:
```
User-agent: *
Allow: /embed/
Allow: /embed.html
```

### Meta Tags (Already Included)
The embed.html page includes:
- Title: "Embeddable Calculators - CalcLeap"
- Description meta tag
- Responsive viewport meta

## Promotion Strategy

### Immediate Actions (Week 1)
1. **Social Media**
   - Post on Twitter/X announcing free embeds
   - Share on LinkedIn (target business/finance audience)
   - Post in relevant Reddit communities (r/webdev, r/personalfinance)

2. **Direct Outreach**
   - Email 10-20 relevant blogs offering free embed
   - Reach out to finance/health bloggers
   - Contact real estate websites

3. **Directories**
   - Submit to embeddable widget directories
   - Add to ProductHunt as "Free embeddable calculators"
   - List on free tools directories

### Medium-term (Month 1)
1. **Content Marketing**
   - Write blog post: "How to Add a Calculator to Your Website"
   - Create tutorial video showing embed process
   - Guest post on relevant blogs mentioning the widgets

2. **Partnerships**
   - Partner with website builders (Wix, Squarespace communities)
   - Reach out to WordPress plugin developers
   - Contact website template creators

### Long-term (Months 2-6)
1. **Track & Optimize**
   - Monitor backlinks acquired
   - Track traffic from embedded widgets
   - A/B test widget designs

2. **Expand**
   - Add more calculator types based on demand
   - Create WordPress plugin version
   - Build API for programmatic embedding

## Tracking & Analytics

### Add Event Tracking (Optional)
If you want to track embed usage, add to each widget:

```javascript
// Add to bottom of each calculator's <script> section
window.addEventListener('load', function() {
  if (window.parent !== window) {
    // Widget is embedded
    fetch('https://calcleap.com/api/track-embed', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        widget: 'bmi', // or 'mortgage', 'compound', etc.
        referrer: document.referrer
      })
    });
  }
});
```

### Monitor Backlinks
Use these tools to track backlink acquisition:
- Google Search Console
- Ahrefs Site Explorer
- Moz Link Explorer
- SEMrush Backlink Analytics

## Support & Maintenance

### Expected Issues & Solutions

**Issue**: Widget not displaying in iframe
- **Solution**: Check X-Frame-Options headers on server

**Issue**: Copy button not working
- **Solution**: Requires HTTPS for clipboard API

**Issue**: Mobile scrolling issues
- **Solution**: Add `scrolling="yes"` to iframe embed code

### Update Schedule
- **Monthly**: Check all calculators still work
- **Quarterly**: Review and update formulas if needed
- **Yearly**: Refresh design to stay modern

## Success Metrics

Track these KPIs:
- **Backlinks acquired**: Target 50+ in first 3 months
- **Referral traffic**: Monitor traffic from embedded widgets
- **Embed adoption**: How many sites are using the widgets
- **Calculator usage**: Which calculators are most popular
- **Time on site**: Are embeds driving engaged traffic back to CalcLeap

## Contact & Feedback

Create a feedback mechanism:
- Add "Report Issue" link to embed.html
- Create email: widgets@calcleap.com
- Monitor social media mentions

---

## Files Ready for Deployment

All files are in `/data/workspace/toolpulse/`:
```
✅ embed.html (16KB) - Main showcase page
✅ embed/bmi.html (6.5KB) - BMI Calculator
✅ embed/mortgage.html (6.2KB) - Mortgage Calculator
✅ embed/compound.html (7.3KB) - Compound Interest Calculator
✅ embed/tip.html (8KB) - Tip Calculator
✅ embed/age.html (7.6KB) - Age Calculator
```

**Total size**: ~52KB for all 6 files

Ready to deploy! 🚀
