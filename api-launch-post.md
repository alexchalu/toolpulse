# 🚀 Introducing CalcLeap API — The Free Financial Calculator API

### 8 Powerful Endpoints. Zero Cost to Start. Built for Developers.

**TL;DR:** CalcLeap API gives you production-ready financial, health, and math calculators via simple REST endpoints. Free tier includes 100 requests/day. No signup required. MIT licensed.

---

## 🎯 What is CalcLeap API?

CalcLeap API is a free, open-source REST API that provides 8 essential calculator endpoints for developers building fintech apps, financial planning tools, insurance platforms, health & fitness applications, and educational websites.

**Live API:** `https://calcleap-api.onrender.com`

---

## 💡 Why We Built This

As developers, we've all been there: you need a mortgage calculator for your app. You could:
1. ❌ Write complex financial formulas from scratch (error-prone)
2. ❌ Copy-paste unreliable code from StackOverflow
3. ❌ Pay $99/mo for an enterprise API you barely use
4. ✅ **Use CalcLeap API** — free, accurate, and ready in 60 seconds

We built CalcLeap API because every developer deserves access to production-grade financial calculations without the complexity or cost.

---

## 🔥 What Can You Build With It?

### Fintech Apps
- Personal finance dashboards
- Investment planning tools
- Loan comparison platforms
- Mortgage affordability calculators

### Insurance Platforms
- Premium estimators (50-state coverage)
- Quote generators
- Coverage calculators

### Health & Fitness Apps
- BMI trackers
- Health category assessments
- Weight management tools

### Productivity Tools
- Bill splitting apps
- Tip calculators
- Business expense tools

---

## 🛠️ The Endpoints

### 1. 🏠 Mortgage Calculator
**Endpoint:** `/api/mortgage`

Calculate monthly payments, total interest, and get a full amortization schedule.

```bash
curl "https://calcleap-api.onrender.com/api/mortgage?principal=350000&rate=6.5&years=30"
```

**Returns:**
- Monthly payment
- Total amount paid
- Total interest
- 12-month amortization schedule (principal, interest, balance)

**Perfect for:** Real estate apps, mortgage calculators, home affordability tools

---

### 2. 💰 Compound Interest Calculator
**Endpoint:** `/api/compound`

Project investment growth with optional recurring contributions.

```bash
curl "https://calcleap-api.onrender.com/api/compound?principal=10000&rate=7&years=20&contribution=500&compounding=12"
```

**Returns:**
- Future value
- Total contributed
- Total interest earned
- Year-by-year growth projections

**Perfect for:** Investment apps, savings planners, retirement calculators

---

### 3. 🎯 Retirement Savings Planner
**Endpoint:** `/api/retirement`

Calculate retirement readiness based on age, savings, and contributions.

```bash
curl "https://calcleap-api.onrender.com/api/retirement?currentAge=30&retireAge=65&currentSavings=50000&monthlyContribution=500&annualReturn=7"
```

**Returns:**
- Projected retirement savings
- Estimated monthly income (4% rule)
- Total growth
- Years to retirement

**Perfect for:** Financial planning apps, 401(k) calculators, retirement dashboards

---

### 4. 💳 Loan Calculator
**Endpoint:** `/api/loan`

Calculate payments for auto loans, personal loans, student loans, or any installment loan.

```bash
curl "https://calcleap-api.onrender.com/api/loan?amount=25000&rate=5.5&months=60&downPayment=5000"
```

**Returns:**
- Monthly payment
- Total paid
- Total interest
- Loan amount after down payment

**Perfect for:** Loan comparison tools, auto financing calculators, debt payoff planners

---

### 5. 🛡️ Insurance Cost Estimator
**Endpoint:** `/api/insurance`

Get auto and home insurance premium estimates by state (all 50 US states supported).

```bash
curl "https://calcleap-api.onrender.com/api/insurance?type=auto&state=CA&age=28&coverage=full"
```

**Returns:**
- Annual premium estimate
- Monthly premium
- State average
- Coverage level

**Perfect for:** Insurance quote platforms, cost comparison tools, coverage estimators

---

### 6. 📊 BMI Calculator
**Endpoint:** `/api/bmi`

Calculate Body Mass Index with health category classification.

```bash
curl "https://calcleap-api.onrender.com/api/bmi?weight=180&height=70&unit=imperial"
```

**Returns:**
- BMI value
- Health category (underweight, normal, overweight, obese)
- Healthy weight range for height
- Supports imperial & metric units

**Perfect for:** Health apps, fitness trackers, wellness platforms

---

### 7. 🧾 Tip Calculator
**Endpoint:** `/api/tip`

Calculate tips and split bills among multiple people.

```bash
curl "https://calcleap-api.onrender.com/api/tip?bill=85.50&tipPercent=20&people=4"
```

**Returns:**
- Tip amount
- Total amount
- Per-person amount
- Tip per person

**Perfect for:** Restaurant apps, expense splitters, payment tools

---

### 8. 📈 Percentage Calculator
**Endpoint:** `/api/percentage`

Perform various percentage calculations (what is X% of Y, increase/decrease, change).

```bash
curl "https://calcleap-api.onrender.com/api/percentage?value=250&percentage=15&type=of"
```

**Types:** `of`, `increase`, `decrease`, `change`

**Perfect for:** E-commerce discount calculators, analytics dashboards, educational tools

---

## ✨ Why Developers Love It

### ⚡ Simple & Fast
No SDK. No complicated setup. Just HTTP GET requests.

```javascript
// That's it. You're done.
fetch('https://calcleap-api.onrender.com/api/mortgage?principal=350000&rate=6.5&years=30')
  .then(res => res.json())
  .then(data => console.log(data.result.monthlyPayment));
```

### 🆓 Free to Start
**Free Tier:** 100 requests/day (perfect for testing and small projects)

**Paid Plans:**
- **Pro:** $9/month — 10,000 requests/day
- **Enterprise:** $49/month — Unlimited requests

### 🔒 No Auth Required (Free Tier)
Start using the API immediately. No signup, no API keys, no friction.

### 🌍 CORS Enabled
Call it directly from your frontend. Works with React, Vue, Angular, vanilla JS.

### 📚 Fully Documented
- **OpenAPI/Swagger spec** included
- **Live docs:** [calcleap.com/api-docs.html](https://calcleap.com/api-docs.html)
- **GitHub repo:** [github.com/alexchalu/calcleap-api](https://github.com/alexchalu/calcleap-api)

### 🛠️ Open Source (MIT)
Fork it. Modify it. Deploy your own instance. It's yours.

---

## 🚀 Get Started in 60 Seconds

### Option 1: Use the Live API (Recommended)
```bash
curl "https://calcleap-api.onrender.com/api/mortgage?principal=350000&rate=6.5&years=30"
```

### Option 2: Deploy Your Own
```bash
git clone https://github.com/alexchalu/calcleap-api.git
cd calcleap-api
npm install
npm start

# API now running at http://localhost:3000
```

### Option 3: Docker
```bash
docker run -p 3000:3000 calcleap-api
```

---

## 📊 Response Format

Every endpoint returns consistent JSON:

```json
{
  "calculator": "mortgage",
  "result": {
    "monthlyPayment": 2212.08,
    "totalPaid": 796348.80,
    "totalInterest": 446348.80,
    "loanTermMonths": 360,
    "schedule": [...]
  },
  "poweredBy": "CalcLeap.com",
  "moreCalculators": "https://calcleap.com"
}
```

Clean. Predictable. Easy to parse.

---

## 🎁 Bonus: Web Calculators Too

Need a UI? CalcLeap.com offers **2,800+ free calculators** with embeddable widgets:
- No coding required
- Responsive design
- SEO-friendly
- White-label ready

**Explore:** [calcleap.com](https://calcleap.com)

---

## 🔮 What's Next?

We're actively developing CalcLeap API. Upcoming features:

- **More calculators:** Student loan payoff, auto lease, ROI, IRR
- **Webhooks:** Get notified of calculation results
- **Batch endpoints:** Calculate multiple scenarios at once
- **Historical data:** Track calculations over time
- **API analytics dashboard:** Monitor your usage

**Want to influence the roadmap?** [Open an issue on GitHub](https://github.com/alexchalu/calcleap-api/issues)

---

## 🤝 Built With Love

CalcLeap API is built by [Alex Chalunkal](https://github.com/alexchalu), a developer who believes powerful tools should be accessible to everyone.

**Got feedback?** We'd love to hear from you:
- 💬 [GitHub Issues](https://github.com/alexchalu/calcleap-api/issues)
- 📧 Email: alexmathewc@gmail.com
- 🐦 Twitter: Share your CalcLeap-powered projects!

---

## 📦 Technical Details

- **Framework:** Node.js + Express
- **OpenAPI 3.0** spec available
- **Hosting:** Render.com (99.9% uptime)
- **Response time:** < 100ms average
- **License:** MIT
- **Dependencies:** Minimal (just Express)

---

## 🏆 Join the Community

CalcLeap API is **free and open source**. Here's how you can contribute:

1. ⭐ **Star the repo** on GitHub
2. 🐛 **Report bugs** or request features
3. 🔧 **Submit PRs** to improve the API
4. 📢 **Share it** with other developers
5. 💡 **Build something cool** and show us!

---

## 🔗 Links

- 🌐 **Live API:** https://calcleap-api.onrender.com
- 📖 **Docs:** https://calcleap.com/api-docs.html
- 💻 **GitHub:** https://github.com/alexchalu/calcleap-api
- 🧮 **Web Calculators:** https://calcleap.com
- 📧 **Email:** alexmathewc@gmail.com

---

**Ready to build something amazing?** Start using CalcLeap API today. No signup required. Just hit the endpoint and go.

```bash
curl "https://calcleap-api.onrender.com/api/mortgage?principal=350000&rate=6.5&years=30"
```

🚀 **Happy building!**
