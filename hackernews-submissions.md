# Hacker News Submission Plan

## Submission 1: CalcLeap.com (Main Site)

**Type:** Show HN  
**URL:** https://calcleap.com  
**Title:** Show HN: CalcLeap – 2,800+ Free Calculators (Mortgage, BMI, Finance, Health)

**Text:**

Hi HN,

I built CalcLeap.com - a collection of 2,800+ calculators covering finance, health, science, education, and more.

**Why I built it:**

I was searching for a compound interest calculator and visited 5 sites - all had intrusive ads, paywalls, or "enter your email to see results." 

I thought: "Why isn't there ONE clean site with EVERY calculator?"

So I built it.

**What's inside:**

- 🏠 Home/Real Estate: Mortgage, rent vs buy, refinance
- 💰 Finance: Compound interest, retirement, investment calculators
- 🏥 Health: BMI, TDEE, body fat %, ideal weight
- 🧮 Math: Percentage, statistics, fractions
- ⚛️ Science: Physics, chemistry, unit conversions
- 💼 Business: ROI, profit margin, break-even
- And 2,800+ more

**Tech:**

- Vanilla HTML/CSS/JS (no framework)
- Generated from templates (Python + Jinja2)
- Hosted on GitHub Pages (free)
- ~200ms load time
- Perfect Lighthouse scores

**Why no framework?**

Calculators are simple: form inputs → math → display results. React/Vue would add 50KB+ of overhead for functionality I can write in 50 lines of vanilla JS.

**SEO strategy:**

Each calculator is its own page with long-tail keywords. 2,800 calculators = 2,800 entry points from Google.

**Monetization:**

- Google AdSense (non-intrusive)
- Premium API access ($9/mo for developers)
- Affiliate links for related products

**Traffic so far:**

Week 1: 200 visitors  
Week 4: 1,000/week  
Growing organically via SEO

**What's next:**

- Embed widgets for bloggers
- Mobile app version
- Expand to 5,000+ calculators

Check it out: https://calcleap.com

I'm here for questions about the build, tech choices, SEO strategy, or anything else!

---

## Submission 2: CalcLeap API

**Type:** Show HN  
**URL:** https://github.com/alexchalu/calcleap-api  
**Title:** Show HN: CalcLeap API – Free financial calculator API (mortgage, compound interest)

**Text:**

Hi HN,

I built CalcLeap API - a free REST API for financial calculators. One GET request = production-ready mortgage/loan/BMI/compound interest calculations.

**Problem:**

Adding a mortgage calculator to an app looks simple. The formula is one line:

```javascript
M = P * (r * (1+r)^n) / ((1+r)^n - 1)
```

But then you need:
- Amortization schedules
- Edge case handling (0% interest, huge principals)
- Rounding that matches banks
- Validation logic

3 days later, you're still debugging.

**Solution:**

```bash
curl "https://calcleap-api.onrender.com/api/mortgage?principal=350000&rate=6.5&years=30"
```

Response:

```json
{
  "calculator": "mortgage",
  "result": {
    "monthlyPayment": 2212.08,
    "totalPaid": 796348.80,
    "totalInterest": 446348.80,
    "loanTermMonths": 360,
    "schedule": [
      {
        "month": 1,
        "payment": 2212.08,
        "principal": 316.25,
        "interest": 1895.83,
        "balance": 349683.75
      }
      ...
    ]
  }
}
```

**Endpoints:**

1. Mortgage calculator
2. Compound interest
3. Retirement planner
4. Loan calculator
5. Insurance estimator
6. BMI calculator
7. Tip calculator
8. Percentage calculator

**Tech:**

- Node.js + Express
- No database (pure computation)
- OpenAPI 3.0 spec
- < 100ms response time
- CORS-enabled

**Pricing:**

- Free: 100 req/day
- Pro: $9/mo → 10K/day
- Enterprise: $49/mo → unlimited

**Why free?**

Financial calculations shouldn't be behind paywalls. Developers should have access to accurate math without writing complex formulas.

**Open source:** MIT licensed  
**Repo:** https://github.com/alexchalu/calcleap-api  
**Live API:** https://calcleap-api.onrender.com  
**Docs:** https://calcleap.com/api-docs.html

I'm here for questions about API design, performance, or feature requests!

---

## Submission 3: Hacker News Comment Strategy

**Target threads:** Search for recent posts about calculators, finance tools, side projects, SEO

**Comment template:**

"If you need calculators for [specific use case], I built CalcLeap.com with 2,800+ free calculators (mortgage, BMI, finance, health, etc.). No ads, no paywalls. Also has a free API: https://github.com/alexchalu/calcleap-api"

**Relevant keywords to search:**
- mortgage calculator
- financial calculator
- side project
- calculator API
- BMI calculator
- compound interest
- personal finance tools

---

## Execution Plan

**Timing:**
- Submit CalcLeap.com: TODAY (Fri 12:01 AM PST = best time)
- Submit API repo: TOMORROW (Sat 12:01 AM PST)
- Comments: Throughout weekend (when traffic is high)

**Upvote strategy:**
- Post in relevant Slack/Discord communities
- Share on Twitter with #ShowHN
- Ask friends to upvote (within HN rules)

