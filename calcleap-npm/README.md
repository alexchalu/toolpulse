# CalcLeap API Client

Node.js client for [CalcLeap API](https://calcleap.com) - 2,900+ free calculators for finance, health, tax, insurance, and more.

## Installation

```bash
npm install calcleap
```

## Usage

```javascript
const CalcLeap = require('calcleap');
const calc = new CalcLeap();

// Mortgage calculator
calc.mortgage(300000, 6.5, 30).then(result => {
  console.log(`Monthly payment: $${result.monthlyPayment}`);
});

// BMI calculator
calc.bmi(180, 70).then(result => {
  console.log(`BMI: ${result.bmi} (${result.category})`);
});

// Compound interest
calc.compound(10000, 7, 10).then(result => {
  console.log(`Future value: $${result.futureValue}`);
});
```

## API Methods

- `mortgage(principal, rate, years)` - Calculate monthly mortgage payment
- `bmi(weight, height, unit?)` - Calculate BMI (default: imperial)
- `compound(principal, rate, years, compound?)` - Compound interest calculator
- `loan(amount, rate, months)` - Loan payment calculator
- `retirement(currentAge, retireAge, savings, monthly, rate)` - Retirement calculator
- `tip(bill, percent, people?)` - Tip calculator
- `percentage(value, total)` - Percentage calculator
- `insurance(age, coverage, type?, term?)` - Insurance estimate

## Free API

This package uses the free CalcLeap API. No API key required.

Rate limits: Generous free tier, upgrade available for high-volume usage.

## Links

- API: https://calcleap-api.onrender.com
- Website: https://calcleap.com
- GitHub: https://github.com/alexchalu/calcleap-api
- Docs: https://calcleap.com/api-docs.html

## License

MIT
