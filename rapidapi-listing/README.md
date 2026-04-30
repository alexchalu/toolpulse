# CalcLeap Financial Calculator API

**The most comprehensive financial calculator API for developers**

CalcLeap provides 8 powerful, production-ready calculator endpoints that power financial applications, fintech platforms, insurance tools, health apps, and educational websites. Built for reliability, speed, and ease of integration.

## 🚀 Key Features

- **8 Production-Ready Endpoints** - Mortgage, Compound Interest, Retirement, Loan, Insurance, BMI, Tip, Percentage
- **Zero Configuration** - Simple REST API with JSON responses
- **Free Tier Available** - 100 requests/day with no credit card required
- **Real-Time Calculations** - Sub-100ms response times
- **State-Level Insurance Data** - Accurate estimates for all 50 US states
- **Comprehensive Documentation** - Full examples in JavaScript, Python, and cURL
- **Open Source** - MIT licensed, available on [GitHub](https://github.com/alexchalu/calcleap-api)

## 📊 Use Cases

### Fintech & Banking Apps
- Mortgage calculators for real estate platforms
- Investment growth projectors
- Loan comparison tools
- Retirement planning dashboards

### Insurance Platforms
- Auto insurance quote estimators
- Home insurance premium calculators
- Multi-state comparison tools

### Health & Fitness Apps
- BMI calculators with health recommendations
- Healthy weight range displays
- Fitness tracking integrations

### Education & Tools
- Financial literacy apps
- Math homework helpers
- Restaurant bill splitters
- Percentage calculators for e-commerce

## 🔌 API Endpoints

### 1. Mortgage Calculator
Calculate monthly payments, total interest, and get a 12-month amortization schedule.

```bash
GET /api/mortgage?principal=300000&rate=6.5&years=30
```

**Response:**
```json
{
  "calculator": "mortgage",
  "result": {
    "monthlyPayment": 1896.20,
    "totalPaid": 682632,
    "totalInterest": 382632,
    "loanTermMonths": 360,
    "schedule": [...]
  }
}
```

### 2. Compound Interest Calculator
Project investment growth with optional regular contributions.

```bash
GET /api/compound?principal=10000&rate=7&years=20&contribution=500&compounding=12
```

### 3. Retirement Calculator
Estimate retirement savings based on age, contributions, and expected returns.

```bash
GET /api/retirement?currentAge=35&retireAge=65&currentSavings=50000&monthlyContribution=1000&annualReturn=7
```

### 4. Loan Calculator
Calculate auto, personal, or student loan payments with down payment support.

```bash
GET /api/loan?amount=25000&rate=5.5&months=60&downPayment=5000
```

### 5. Insurance Estimator
Get auto and home insurance estimates by state with age-based factors.

```bash
GET /api/insurance?type=auto&state=CA&age=35&coverage=full
```

### 6. BMI Calculator
Calculate Body Mass Index with health categories and ideal weight ranges.

```bash
GET /api/bmi?weight=180&height=70&unit=imperial
```

### 7. Tip Calculator
Calculate tips and split bills among multiple people.

```bash
GET /api/tip?bill=85.50&tipPercent=20&people=4
```

### 8. Percentage Calculator
Perform percentage operations: "of", increase, decrease, change.

```bash
GET /api/percentage?value=1000&percentage=15&type=of
```

## 💰 Pricing

| Plan | Price | Requests | Features |
|------|-------|----------|----------|
| **Free** | $0/month | 100/day | All endpoints, rate limited by IP, community support |
| **Pro** | $9/month | 10,000/day | API key auth, priority email support, 99.9% uptime SLA |
| **Enterprise** | $49/month | Unlimited | Custom endpoints, dedicated support, on-premise option |

## 🔐 Authentication

**Free Tier:** No authentication required. Rate limited by IP address (100 requests/day).

**Pro & Enterprise:** Include your API key in the request header:
```
Authorization: Bearer YOUR_API_KEY
```

## 📚 Integration Examples

### JavaScript/Node.js
```javascript
const response = await fetch('https://calcleap.com/api/mortgage?principal=300000&rate=6.5&years=30');
const data = await response.json();
console.log(data.result.monthlyPayment); // 1896.20
```

### Python
```python
import requests

response = requests.get('https://calcleap.com/api/mortgage', params={
    'principal': 300000,
    'rate': 6.5,
    'years': 30
})
data = response.json()
print(data['result']['monthlyPayment'])  # 1896.20
```

### cURL
```bash
curl "https://calcleap.com/api/mortgage?principal=300000&rate=6.5&years=30"
```

## 📈 Rate Limits

- **Free:** 100 requests/day per IP
- **Pro:** 10,000 requests/day per API key
- **Enterprise:** Unlimited

Rate limit headers included in all responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1710979200
```

## 🌐 CORS Support

All endpoints support CORS with wildcard origin (`*`) for easy browser-based integration.

## 📞 Support

- **Documentation:** [calcleap.com/api-docs.html](https://calcleap.com/api-docs.html)
- **GitHub:** [github.com/alexchalu/calcleap-api](https://github.com/alexchalu/calcleap-api)
- **Email:** alexmathewc@gmail.com
- **Issues:** Report bugs on [GitHub Issues](https://github.com/alexchalu/calcleap-api/issues)

## 📄 License

MIT License - Free to use in commercial and personal projects.

## 🔗 Links

- **Website:** [calcleap.com](https://calcleap.com)
- **API Docs:** [calcleap.com/api-docs.html](https://calcleap.com/api-docs.html)
- **GitHub:** [github.com/alexchalu/calcleap-api](https://github.com/alexchalu/calcleap-api)
- **Pro Plan:** [Contact Sales](mailto:alexmathewc@gmail.com?subject=CalcLeap%20API%20Pro%20Plan)

---

**Built with ❤️ by [CalcLeap](https://calcleap.com)** - Making financial calculations accessible to everyone.
