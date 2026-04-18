// California Income Tax Calculator Logic
// This script handles the tax calculation logic for the California Income Tax Calculator page.

// Tax brackets and rates (simplified for demonstration; actual rates vary by year and filing status)
// Source: California Franchise Tax Board (FTB) - illustrative 2026 rates
const CALIFORNIA_TAX_BRACKETS = {
    'single': [
        { limit: 10412, rate: 0.01 },    // 1%
        { limit: 24827, rate: 0.02 },    // 2%
        { limit: 39236, rate: 0.04 },    // 4%
        { limit: 53645, rate: 0.06 },    // 6%
        { limit: 68054, rate: 0.08 },    // 8%
        { limit: 82463, rate: 0.093 },   // 9.3%
        { limit: 96872, rate: 0.103 },   // 10.3%
        { limit: 111281, rate: 0.113 },  // 11.3%
        { limit: 125690, rate: 0.123 },  // 12.3%
        { limit: Infinity, rate: 0.133 } // 13.3% (top bracket)
    ],
    'married-joint': [
        { limit: 20824, rate: 0.01 },
        { limit: 49654, rate: 0.02 },
        { limit: 78472, rate: 0.04 },
        { limit: 107290, rate: 0.06 },
        { limit: 136108, rate: 0.08 },
        { limit: 164926, rate: 0.093 },
        { limit: 193744, rate: 0.103 },
        { limit: 222562, rate: 0.113 },
        { limit: 251380, rate: 0.123 },
        { limit: Infinity, rate: 0.133 }
    ],
    'married-separate': [
        { limit: 10412, rate: 0.01 },
        { limit: 24827, rate: 0.02 },
        { limit: 39236, rate: 0.04 },
        { limit: 53645, rate: 0.06 },
        { limit: 68054, rate: 0.08 },
        { limit: 82463, rate: 0.093 },
        { limit: 96872, rate: 0.103 },
        { limit: 111281, rate: 0.113 },
        { limit: 125690, rate: 0.123 },
        { limit: Infinity, rate: 0.133 }
    ],
    'head-of-household': [
        { limit: 16666, rate: 0.01 },
        { limit: 33332, rate: 0.02 },
        { limit: 50000, rate: 0.04 },
        { limit: 66666, rate: 0.06 },
        { limit: 83332, rate: 0.08 },
        { limit: 100000, rate: 0.093 },
        { limit: 116666, rate: 0.103 },
        { limit: 133332, rate: 0.113 },
        { limit: 150000, rate: 0.123 },
        { limit: Infinity, rate: 0.133 }
    ],
    'qualifying-widow': [
        { limit: 20824, rate: 0.01 },
        { limit: 49654, rate: 0.02 },
        { limit: 78472, rate: 0.04 },
        { limit: 107290, rate: 0.06 },
        { limit: 136108, rate: 0.08 },
        { limit: 164926, rate: 0.093 },
        { limit: 193744, rate: 0.103 },
        { limit: 222562, rate: 0.113 },
        { limit: 251380, rate: 0.123 },
        { limit: Infinity, rate: 0.133 }
    ]
};

// Standard deduction amounts for 2026 (illustrative; adjust as needed)
const STANDARD_DEDUCTIONS = {
    'single': 5363,
    'married-joint': 10726,
    'married-separate': 5363,
    'head-of-household': 8049,
    'qualifying-widow': 10726
};

// Dependent exemption credit (illustrative)
const DEPENDENT_CREDIT = 100;

// Calculate California state income tax
function calculateCaliforniaTax(annualIncome, filingStatus, dependents) {
    if (annualIncome <= 0) {
        return { estimatedTax: 0, netIncome: 0 };
    }

    // Apply standard deduction
    const deduction = STANDARD_DEDUCTIONS[filingStatus] || STANDARD_DEDUCTIONS['single'];
    let taxableIncome = Math.max(0, annualIncome - deduction);

    // Apply dependent credits
    const totalDependentCredit = dependents * DEPENDENT_CREDIT;
    taxableIncome = Math.max(0, taxableIncome - totalDependentCredit);

    // Calculate tax using progressive brackets
    const brackets = CALIFORNIA_TAX_BRACKETS[filingStatus] || CALIFORNIA_TAX_BRACKETS['single'];
    let tax = 0;
    let remainingIncome = taxableIncome;

    for (let i = 0; i < brackets.length && remainingIncome > 0; i++) {
        const bracket = brackets[i];
        const prevLimit = i > 0 ? brackets[i - 1].limit : 0;
        const bracketWidth = bracket.limit - prevLimit;
        const taxableInBracket = Math.min(remainingIncome, bracketWidth);
        tax += taxableInBracket * bracket.rate;
        remainingIncome -= taxableInBracket;
    }

    // Round to nearest cent
    tax = Math.round(tax * 100) / 100;

    return {
        estimatedTax: tax,
        netIncome: annualIncome - tax
    };
}

// Export for use in HTML
if (typeof window !== 'undefined') {
    window.calculateCaliforniaTax = calculateCaliforniaTax;
}