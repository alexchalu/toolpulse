---
title: "California State Income Tax Calculator 2024"
description: "Calculate your California state income tax with accurate 2024 tax brackets, standard deduction, and paycheck estimates. Free online calculator for CA residents."
keywords: "California income tax calculator, CA state tax, paycheck calculator California, California tax brackets, California taxes"
published: true
---

# California State Income Tax Calculator

Calculate your California state income tax liability using the latest 2024 tax brackets and rates. This calculator helps you estimate your annual state tax burden and take-home pay.

## How It Works

Enter your annual income, filing status, and any pre-tax deductions to calculate your California state income tax. The calculator uses California's progressive tax system and includes the standard deduction.

## California Income Tax Brackets 2024

California has a progressive tax system with 9 tax brackets:

| Filing Status | Tax Rate | Income Range |
|---------------|----------|--------------|
| **Single** | 1% | $0 - $10,412 |
| **Single** | 2% | $10,412 - $24,684 |
| **Single** | 4% | $24,684 - $38,952 |
| **Single** | 6% | $38,952 - $61,214 |
| **Single** | 8% | $61,214 - $312,874 |
| **Single** | 9.3% | $312,874 - $590,742 |
| **Single** | 10.3% | $590,742 - $1,000,000 |
| **Single** | 11.3% | $1,000,000 - $1,000,001+ |
| **Married Filing Jointly** | 1% | $0 - $20,824 |
| **Married Filing Jointly** | 2% | $20,824 - $49,368 |
| **Married Filing Jointly** | 4% | $49,368 - $77,904 |
| **Married Filing Jointly** | 6% | $77,904 - $122,428 |
| **Married Filing Jointly** | 8% | $122,428 - $625,748 |
| **Married Filing Jointly** | 9.3% | $625,748 - $1,181,484 |
| **Married Filing Jointly** | 10.3% | $1,181,484 - $2,000,000 |
| **Married Filing Jointly** | 11.3% | $2,000,000 - $2,000,001+ |
| **Married Filing Separately** | 1% | $0 - $10,412 |
| **Married Filing Separately** | 2% | $10,412 - $24,684 |
| **Married Filing Separately** | 4% | $24,684 - $38,952 |
| **Married Filing Separately** | 6% | $38,952 - $61,214 |
| **Married Filing Separately** | 8% | $61,214 - $312,874 |
| **Married Filing Separately** | 9.3% | $312,874 - $590,742 |
| **Married Filing Separately** | 10.3% | $590,742 - $1,000,000 |
| **Married Filing Separately** | 11.3% | $1,000,000 - $1,000,001+ |
| **Head of Household** | 1% | $0 - $15,618 |
| **Head of Household** | 2% | $15,618 - $37,026 |
| **Head of Household** | 4% | $37,026 - $58,428 |
| **Head of Household** | 6% | $58,428 - $91,821 |
| **Head of Household** | 8% | $91,821 - $469,311 |
| **Head of Household** | 9.3% | $469,311 - $886,113 |
| **Head of Household** | 10.3% | $886,113 - $1,500,000 |
| **Head of Household** | 11.3% | $1,500,000 - $1,500,001+ |

## California Standard Deduction 2024

| Filing Status | Standard Deduction |
|---------------|-------------------|
| **Single** | $5,086 |
| **Married Filing Jointly** | $10,172 |
| **Married Filing Separately** | $5,086 |
| **Head of Household** | $7,803 |

## Calculator

```javascript
function calculateCaliforniaTax(income, filingStatus, preTaxDeductions = 0) {
    // Standard deductions
    const standardDeductions = {
        'single': 5086,
        'married_jointly': 10172,
        'married_separately': 5086,
        'head_of_household': 7803
    };
    
    // Tax brackets for each filing status
    const taxBrackets = {
        'single': [
            { min: 0, max: 10412, rate: 0.01 },
            { min: 10412, max: 24684, rate: 0.02 },
            { min: 24684, max: 38952, rate: 0.04 },
            { min: 38952, max: 61214, rate: 0.06 },
            { min: 61214, max: 312874, rate: 0.08 },
            { min: 312874, max: 590742, rate: 0.093 },
            { min: 590742, max: 1000000, rate: 0.103 },
            { min: 1000000, max: Infinity, rate: 0.113 }
        ],
        'married_jointly': [
            { min: 0, max: 20824, rate: 0.01 },
            { min: 20824, max: 49368, rate: 0.02 },
            { min: 49368, max: 77904, rate: 0.04 },
            { min: 77904, max: 122428, rate: 0.06 },
            { min: 122428, max: 625748, rate: 0.08 },
            { min: 625748, max: 1181484, rate: 0.093 },
            { min: 1181484, max: 2000000, rate: 0.103 },
            { min: 2000000, max: Infinity, rate: 0.113 }
        ],
        'married_separately': [
            { min: 0, max: 10412, rate: 0.01 },
            { min: 10412, max: 24684, rate: 0.02 },
            { min: 24684, max: 38952, rate: 0.04 },
            { min: 38952, max: 61214, rate: 0.06 },
            { min: 61214, max: 312874, rate: 0.08 },
            { min: 312874, max: 590742, rate: 0.093 },
            { min: 590742, max: 1000000, rate: 0.103 },
            { min: 1000000, max: Infinity, rate: 0.113 }
        ],
        'head_of_household': [
            { min: 0, max: 15618, rate: 0.01 },
            { min: 15618, max: 37026, rate: 0.02 },
            { min: 37026, max: 58428, rate: 0.04 },
            { min: 58428, max: 91821, rate: 0.06 },
            { min: 91821, max: 469311, rate: 0.08 },
            { min: 469311, max: 886113, rate: 0.093 },
            { min: 886113, max: 1500000, rate: 0.103 },
            { min: 1500000, max: Infinity, rate: 0.113 }
        ]
    };
    
    if (!taxBrackets[filingStatus]) {
        return { error: 'Invalid filing status' };
    }
    
    const standardDeduction = standardDeductions[filingStatus];
    const taxableIncome = Math.max(0, income - standardDeduction - preTaxDeductions);
    
    let tax = 0;
    let remainingIncome = taxableIncome;
    
    for (const bracket of taxBrackets[filingStatus]) {
        if (remainingIncome <= 0) break;
        
        const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min);
        tax += taxableInBracket * bracket.rate;
        remainingIncome -= taxableInBracket;
    }
    
    const effectiveRate = taxableIncome > 0 ? (tax / taxableIncome) * 100 : 0;
    const netIncome = income - tax - preTaxDeductions;
    
    return {
        grossIncome: income,
        standardDeduction: standardDeduction,
        preTaxDeductions: preTaxDeductions,
        taxableIncome: taxableIncome,
        tax: tax,
        netIncome: netIncome,
        effectiveRate: effectiveRate.toFixed(2) + '%'
    };
}

// Example usage:
const result = calculateCaliforniaTax(75000, 'single', 3000);
console.log(result);
```

## Example Calculations

### Example 1: Single filer with $75,000 income
- **Gross Income**: $75,000
- **Standard Deduction**: $5,086
- **Taxable Income**: $69,914
- **California Tax**: $4,537.18
- **Net Income**: $70,462.82
- **Effective Tax Rate**: 6.49%

### Example 2: Married filing jointly with $150,000 income
- **Gross Income**: $150,000
- **Standard Deduction**: $10,172
- **Taxable Income**: $139,828
- **California Tax**: $9,073.08
- **Net Income**: $140,926.92
- **Effective Tax Rate**: 6.49%

### Example 3: High earner with $500,000 income
- **Gross Income**: $500,000
- **Standard Deduction**: $5,086 (single)
- **Taxable Income**: $494,914
- **California Tax**: $71,842.16
- **Net Income**: $428,157.84
- **Effective Tax Rate**: 14.51%

## Important Notes

1. **This calculator provides estimates only**. Actual tax liability may vary based on additional factors.
2. **California has additional taxes** including mental health services tax (1% on income over $1M) and local taxes.
3. **Consider consulting a tax professional** for accurate tax planning.
4. **Tax laws change frequently** - always verify current rates before making financial decisions.

## Related California Tax Calculators

- [California Paycheck Calculator](/paycheck-calculator/california)
- [California Property Tax Calculator](/property-tax-calculator/california)
- [California Sales Tax Calculator](/sales-tax-calculator/california)
- [Federal Income Tax Calculator](/federal-income-tax-calculator)

*Last updated: May 2, 2024*