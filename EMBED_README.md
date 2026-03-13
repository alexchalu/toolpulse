# CalcLeap Embeddable Calculators

## Overview
This directory contains a complete embeddable calculator widget system for calcleap.com designed to generate backlinks and provide value to other websites.

## Structure

```
toolpulse/
├── embed.html              # Main showcase page (16KB)
└── embed/
    ├── bmi.html           # BMI Calculator (6.5KB)
    ├── mortgage.html      # Mortgage Calculator (6.2KB)
    ├── compound.html      # Compound Interest Calculator (7.3KB)
    ├── tip.html           # Tip Calculator (8KB)
    └── age.html           # Age Calculator (7.6KB)
```

## Features

### Main Showcase Page (`embed.html`)
- Professional landing page showcasing all 5 calculators
- Live iframe previews of each calculator
- Copy-to-clipboard embed code snippets
- Apple-inspired design matching CalcLeap brand
- Mobile-responsive layout
- Feature highlights and CTA sections

### Individual Calculator Widgets

All calculators share these characteristics:
- ✅ **Fully functional** - Real JavaScript calculations, no placeholders
- ✅ **Self-contained** - No external dependencies (no jQuery, no CDN)
- ✅ **Lightweight** - 6-8KB each, fast loading
- ✅ **Mobile-responsive** - Works perfectly on all devices
- ✅ **Clean design** - Apple-inspired UI (#f5f5f7 bg, #0071e3 accent, -apple-system fonts)
- ✅ **Attribution link** - "Powered by CalcLeap" backlink in each widget
- ✅ **Iframe-ready** - Designed specifically for embedding

### Calculator Details

**1. BMI Calculator** (`embed/bmi.html`)
- Supports metric (kg/cm) and imperial (lbs/in) units
- Dynamic unit switching
- Color-coded BMI categories (Underweight, Normal, Overweight, Obese)
- Real-time calculation with instant results

**2. Mortgage Calculator** (`embed/mortgage.html`)
- Calculates monthly payment from loan amount, interest rate, and term
- Shows total payment and total interest paid
- Proper mortgage amortization formula
- Number formatting with thousands separators

**3. Compound Interest Calculator** (`embed/compound.html`)
- Supports multiple compounding frequencies (annual, semi-annual, quarterly, monthly, daily)
- Optional monthly contribution feature
- Shows future value, total principal, and total interest
- Full compound interest formula with annuity calculations

**4. Tip Calculator** (`embed/tip.html`)
- Quick-select tip buttons (10%, 15%, 18%, 20%)
- Custom tip percentage input
- Bill splitting functionality
- Auto-calculation on input change
- Shows tip amount, total, and per-person split

**5. Age Calculator** (`embed/age.html`)
- Calculates precise age from birthdate
- Shows years, months, days breakdown
- Total time in months, weeks, days
- Days until next birthday
- Custom calculation date support

## Embed Code Format

Each calculator uses this standard embed format:

```html
<iframe src="https://calcleap.com/embed/bmi.html" width="400" height="500" frameborder="0"></iframe>
<p style="text-align:center;font-size:12px;margin-top:8px;">Powered by <a href="https://calcleap.com" target="_blank">CalcLeap</a></p>
```

## Deployment

### Upload to CalcLeap
1. Upload `embed.html` to `https://calcleap.com/embed.html`
2. Upload all files in `embed/` folder to `https://calcleap.com/embed/`

### File paths should be:
- `https://calcleap.com/embed.html` - Main showcase
- `https://calcleap.com/embed/bmi.html`
- `https://calcleap.com/embed/mortgage.html`
- `https://calcleap.com/embed/compound.html`
- `https://calcleap.com/embed/tip.html`
- `https://calcleap.com/embed/age.html`

## SEO & Backlink Strategy

### How It Generates Backlinks
1. **Attribution Link** - Every embedded calculator includes "Powered by CalcLeap" link
2. **Showcase Page** - Main embed.html page can be promoted for discovery
3. **Value Proposition** - Free, high-quality widgets encourage adoption
4. **Multiple Verticals** - 5 different calculators = 5 different niches (health, finance, real estate)

### Target Websites
- Personal finance blogs
- Health & fitness sites
- Real estate websites
- Educational resources
- Productivity blogs
- Small business sites

### Promotion Strategy
1. List on embeddable widget directories
2. Reach out to relevant blogs offering free embed codes
3. Submit to "free tools" roundup articles
4. Create social media posts showcasing the widgets
5. Add to CalcLeap's main site navigation

## Technical Specs

- **No external dependencies** - Pure HTML, CSS, JavaScript
- **Browser support** - All modern browsers (Chrome, Firefox, Safari, Edge)
- **Load time** - < 100ms per widget
- **Mobile-first** - Responsive design with touch-friendly inputs
- **Accessibility** - Proper labels, semantic HTML, keyboard navigation
- **Security** - No external scripts, no data collection, no tracking

## Future Enhancements

Potential additions:
- More calculator types (retirement, loan, savings, etc.)
- Dark mode toggle
- Customization options (color schemes)
- API for dynamic embedding
- Analytics dashboard for embed usage
- WordPress plugin version
- Embed generator tool

## Testing

Before deploying, test each calculator:
- ✅ BMI: Try metric and imperial units
- ✅ Mortgage: Test with typical loan amounts ($200k-$500k)
- ✅ Compound: Test with and without monthly contributions
- ✅ Tip: Test quick buttons and custom percentages
- ✅ Age: Test with various birthdates

All calculators have been tested and produce accurate results.

## License & Usage

These calculators are provided free for embedding with required attribution.
- Must keep "Powered by CalcLeap" link intact
- Can be embedded on any website
- Cannot be rebranded or sold
- Cannot remove attribution

## Contact

For questions or custom calculator requests: calcleap.com
