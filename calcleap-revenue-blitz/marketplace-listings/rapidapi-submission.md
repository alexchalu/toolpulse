# CalcLeap API - RapidAPI Hub Submission

## Basic Information

**API Name:** CalcLeap - Financial & Health Calculators  
**Category:** Finance > Financial Calculations  
**Sub-category:** Calculators  
**Tags:** mortgage, loan, calculator, finance, retirement, compound-interest, bmi, insurance

**Short Description (160 chars max):**  
8 production-ready financial & health calculators: mortgage, retirement, loan, compound interest, BMI, insurance, tip, percentage.

**Long Description:**
CalcLeap API provides 8 powerful, production-ready calculators for financial and health applications:

**Financial Calculators:**
- **Mortgage Calculator**: Monthly payments, amortization schedules, total interest
- **Compound Interest**: Investment growth with regular contributions
- **Retirement Planner**: Savings projections with 4% rule income estimates
- **Loan Calculator**: Payment schedules for any loan type

**Insurance & Health:**
- **Insurance Estimator**: Auto and home insurance rates by US state
- **BMI Calculator**: Body mass index with healthy weight ranges

**Utility Calculators:**
- **Tip Calculator**: Tip amounts and bill splitting
- **Percentage Calculator**: Percentage of, increase, decrease, change

**Why Choose CalcLeap:**
- ✅ Sub-100ms response times
- ✅ No API key required (free tier)
- ✅ Battle-tested (powers CalcLeap.com)
- ✅ TypeScript support via official clients
- ✅ Comprehensive documentation

**Use Cases:**
- Fintech applications
- Real estate platforms
- Personal finance tools
- Health & wellness apps
- No-code/low-code integrations

---

## API Endpoints

### 1. Mortgage Calculator
**Endpoint:** `GET /mortgage`

**Parameters:**
- `principal` (required, number): Loan amount in dollars
- `rate` (required, number): Annual interest rate (percentage)
- `years` (required, number): Loan term in years
- `propertyTax` (optional, number): Annual property tax
- `insurance` (optional, number): Annual home insurance
- `hoa` (optional, number): Monthly HOA fees

**Example Request:**
```
GET /mortgage?principal=350000&rate=6.5&years=30
```

**Example Response:**
```json
{
  "calculator": "mortgage",
  "result": {
    "monthlyPayment": "$2,212.24",
    "totalPayment": "$796,406",
    "totalInterest": "$446,406",
    "schedule": [...]
  }
}
```

---

### 2. Compound Interest Calculator
**Endpoint:** `GET /compound`

**Parameters:**
- `principal` (required, number): Initial investment
- `rate` (required, number): Annual interest rate (%)
- `years` (required, number): Investment period
- `contribution` (optional, number): Regular contribution amount
- `compounding` (optional, number): Compounds per year (default: 12)

---

### 3. Retirement Planner
**Endpoint:** `GET /retirement`

**Parameters:**
- `currentAge` (required, number): Current age
- `retireAge` (required, number): Retirement age
- `monthlyContribution` (required, number): Monthly contribution
- `currentSavings` (optional, number): Current retirement savings
- `annualReturn` (optional, number): Expected annual return (default: 7)

---

### 4. Loan Calculator
**Endpoint:** `GET /loan`

**Parameters:**
- `amount` (required, number): Loan amount
- `rate` (required, number): Annual interest rate (%)
- `months` (required, number): Loan term in months
- `downPayment` (optional, number): Down payment amount

---

### 5. Insurance Estimator
**Endpoint:** `GET /insurance`

**Parameters:**
- `type` (required, string): Insurance type ('auto' or 'home')
- `state` (required, string): US state code (e.g., 'CA', 'NY')
- `age` (required, number): Age
- `coverage` (optional, string): Coverage level ('basic', 'standard', 'full')

---

### 6. BMI Calculator
**Endpoint:** `GET /bmi`

**Parameters:**
- `weight` (required, number): Weight (lbs or kg)
- `height` (required, number): Height (inches or cm)
- `unit` (optional, string): Unit system ('imperial' or 'metric')

---

### 7. Tip Calculator
**Endpoint:** `GET /tip`

**Parameters:**
- `bill` (required, number): Bill amount
- `tipPercent` (required, number): Tip percentage
- `people` (optional, number): Number of people splitting

---

### 8. Percentage Calculator
**Endpoint:** `GET /percentage`

**Parameters:**
- `value` (required, number): Base value
- `percentage` (required, number): Percentage amount
- `type` (required, string): Calculation type ('of', 'increase', 'decrease', 'change')

---

## Pricing on RapidAPI

### Basic (Free)
- **1,000 requests/month**
- **Price:** $0/month
- All 8 calculators
- Community support

### Pro
- **50,000 requests/month**
- **Price:** $49/month
- All 8 calculators
- Priority support
- SLA guarantee (99.9%)

### Business
- **250,000 requests/month**
- **Price:** $199/month
- All 8 calculators
- Dedicated support
- SLA guarantee (99.95%)
- Custom branding options

### Mega
- **1,000,000 requests/month**
- **Price:** $499/month
- All features
- White-label options
- Volume discounts

---

## Base URL
`https://calcleap-api.onrender.com/api`

## Authentication
None required (free tier and all paid plans)

## Rate Limiting
Based on plan tier (enforced via RapidAPI)

## Documentation URL
https://calcleap.com/api-docs.html

## Support Email
alex@chalunkal.com

## Terms of Service URL
https://calcleap.com/terms

## Privacy Policy URL
https://calcleap.com/privacy

---

## Code Examples

### JavaScript
```javascript
const response = await fetch('https://calcleap-api.onrender.com/api/mortgage?principal=350000&rate=6.5&years=30');
const data = await response.json();
console.log(data.result.monthlyPayment);
```

### Python
```python
import requests
response = requests.get('https://calcleap-api.onrender.com/api/mortgage', params={
    'principal': 350000,
    'rate': 6.5,
    'years': 30
})
print(response.json()['result']['monthlyPayment'])
```

### cURL
```bash
curl "https://calcleap-api.onrender.com/api/mortgage?principal=350000&rate=6.5&years=30"
```

---

## Submission Checklist

- [x] API tested and live
- [x] All endpoints documented
- [x] Pricing tiers defined
- [x] Code examples provided
- [x] Support email configured
- [x] Terms and privacy URLs ready
- [ ] Submit to RapidAPI Hub
- [ ] Configure webhooks for billing
- [ ] Set up analytics tracking
