# CalcLeap Python API Client

Python client for [CalcLeap API](https://calcleap.com) - 2,900+ free calculators for finance, health, tax, insurance, and more.

## Installation

```bash
pip install calcleap
```

## Usage

```python
from calcleap import CalcLeap

calc = CalcLeap()

# Mortgage calculator
result = calc.mortgage(principal=300000, rate=6.5, years=30)
print(f"Monthly payment: ${result['monthlyPayment']}")

# BMI calculator
result = calc.bmi(weight=180, height=70)
print(f"BMI: {result['bmi']} ({result['category']})")

# Compound interest
result = calc.compound(principal=10000, rate=7, years=10)
print(f"Future value: ${result['futureValue']}")
```

## API Methods

- `mortgage(principal, rate, years)` - Calculate monthly mortgage payment
- `bmi(weight, height, unit='imperial')` - Calculate BMI
- `compound(principal, rate, years, compound='annually')` - Compound interest
- `loan(amount, rate, months)` - Loan payment calculator
- `retirement(current_age, retire_age, savings, monthly_contribution, rate)` - Retirement calculator
- `tip(bill, percent, people=1)` - Tip calculator
- `percentage(value, total)` - Percentage calculator
- `insurance(age, coverage, insurance_type='term', term=20)` - Insurance estimate

## Free API

This package uses the free CalcLeap API. No API key required.

## Links

- API: https://calcleap-api.onrender.com
- Website: https://calcleap.com
- GitHub: https://github.com/alexchalu/calcleap-api
- Docs: https://calcleap.com/api-docs.html

## License

MIT
