// California State Tax Calculator JavaScript
class CaliforniaTaxCalculator {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.calculate();
    }

    initializeElements() {
        // Input elements
        this.annualIncomeInput = document.getElementById('annual-income');
        this.incomeSlider = document.getElementById('income-slider');
        this.incomeSliderValue = document.querySelector('.slider-value');
        this.filingStatusSelect = document.getElementById('filing-status');
        this.preTaxDeductionsInput = document.getElementById('pre-tax-deductions');
        this.deductionsSlider = document.getElementById('deductions-slider');
        this.deductionsSliderValue = document.querySelector('.slider-value');
        this.dependentCountInput = document.getElementById('dependent-count');

        // Result elements
        this.grossIncomeElement = document.getElementById('gross-income');
        this.taxableIncomeElement = document.getElementById('taxable-income');
        this.federalTaxElement = document.getElementById('federal-tax');
        this.stateTaxElement = document.getElementById('state-tax');
        this.ficaTaxesElement = document.getElementById('fica-taxes');
        this.totalTaxesElement = document.getElementById('total-taxes');
        this.takeHomePayElement = document.getElementById('take-home-pay');
        this.effectiveRateElement = document.getElementById('effective-rate');
    }

    bindEvents() {
        // Income events
        this.annualIncomeInput.addEventListener('input', () => this.syncIncomeInputs());
        this.incomeSlider.addEventListener('input', () => this.syncIncomeInputs());

        // Deduction events
        this.preTaxDeductionsInput.addEventListener('input', () => this.syncDeductionInputs());
        this.deductionsSlider.addEventListener('input', () => this.syncDeductionInputs());

        // Other events
        this.filingStatusSelect.addEventListener('change', () => this.calculate());
        this.dependentCountInput.addEventListener('input', () => this.calculate());
    }

    syncIncomeInputs() {
        const income = parseFloat(this.annualIncomeInput.value) || 0;
        const sliderValue = Math.round(income / 1000) * 1000;
        
        this.annualIncomeInput.value = income;
        this.incomeSlider.value = sliderValue;
        this.incomeSliderValue.textContent = this.formatCurrency(sliderValue);
        
        this.calculate();
    }

    syncDeductionInputs() {
        const deductions = parseFloat(this.preTaxDeductionsInput.value) || 0;
        const sliderValue = Math.round(deductions / 100) * 100;
        
        this.preTaxDeductionsInput.value = deductions;
        this.deductionsSlider.value = sliderValue;
        this.deductionsSliderValue.textContent = this.formatCurrency(sliderValue);
        
        this.calculate();
    }

    calculate() {
        const income = parseFloat(this.annualIncomeInput.value) || 0;
        const deductions = parseFloat(this.preTaxDeductionsInput.value) || 0;
        const dependents = parseInt(this.dependentCountInput.value) || 0;
        const filingStatus = this.filingStatusSelect.value;

        // Calculate results
        const results = this.calculateTaxes(income, deductions, dependents, filingStatus);

        // Update display
        this.updateResults(results);
    }

    calculateTaxes(income, deductions, dependents, filingStatus) {
        // Standard deductions for 2024 (California specific)
        const standardDeductions = {
            'single': 5472,
            'married-joint': 10944,
            'married-separate': 5472,
            'head-household': 8208
        };

        const personalExemption = 1294; // California personal exemption 2024

        // Calculate taxable income
        const totalDeductions = Math.max(deductions, standardDeductions[filingStatus]);
        const exemptionAmount = dependents * personalExemption;
        const taxableIncome = Math.max(0, income - totalDeductions - exemptionAmount);

        // Calculate federal tax (simplified)
        const federalTax = this.calculateFederalTax(income, filingStatus);

        // Calculate California state tax
        const stateTax = this.calculateCaliforniaTax(taxableIncome);

        // Calculate FICA taxes
        const ficaTaxes = this.calculateFicaTaxes(income);

        // Calculate total taxes and take-home pay
        const totalTaxes = federalTax + stateTax + ficaTaxes;
        const takeHomePay = income - totalTaxes;

        // Calculate effective tax rate
        const effectiveRate = income > 0 ? (totalTaxes / income) * 100 : 0;

        return {
            grossIncome: income,
            taxableIncome: taxableIncome,
            federalTax: federalTax,
            stateTax: stateTax,
            ficaTaxes: ficaTaxes,
            totalTaxes: totalTaxes,
            takeHomePay: takeHomePay,
            effectiveRate: effectiveRate
        };
    }

    calculateFederalTax(income, filingStatus) {
        // Simplified federal tax calculation for 2024
        const brackets = {
            'single': [
                { rate: 0.10, limit: 11600 },
                { rate: 0.12, limit: 47150 },
                { rate: 0.22, limit: 100525 },
                { rate: 0.24, limit: 191050 },
                { rate: 0.32, limit: 244775 },
                { rate: 0.35, limit: 604550 },
                { rate: 0.37, limit: Infinity }
            ],
            'married-joint': [
                { rate: 0.10, limit: 23200 },
                { rate: 0.12, limit: 94300 },
                { rate: 0.22, limit: 201050 },
                { rate: 0.24, limit: 382100 },
                { rate: 0.32, limit: 489500 },
                { rate: 0.35, limit: 731200 },
                { rate: 0.37, limit: Infinity }
            ],
            'married-separate': [
                { rate: 0.10, limit: 11600 },
                { rate: 0.12, limit: 47150 },
                { rate: 0.22, limit: 100525 },
                { rate: 0.24, limit: 191050 },
                { rate: 0.32, limit: 244775 },
                { rate: 0.35, limit: 365600 },
                { rate: 0.37, limit: Infinity }
            ],
            'head-household': [
                { rate: 0.10, limit: 16550 },
                { rate: 0.12, limit: 63700 },
                { rate: 0.22, limit: 100525 },
                { rate: 0.24, limit: 191050 },
                { rate: 0.32, limit: 244775 },
                { rate: 0.35, limit: 604550 },
                { rate: 0.37, limit: Infinity }
            ]
        };

        const statusBrackets = brackets[filingStatus];
        let tax = 0;
        let remaining = income;

        for (const bracket of statusBrackets) {
            if (remaining <= 0) break;
            
            const taxableInBracket = Math.min(remaining, bracket.limit);
            tax += taxableInBracket * bracket.rate;
            remaining -= taxableInBracket;
        }

        return tax;
    }

    calculateCaliforniaTax(taxableIncome) {
        // California 2024 tax brackets
        const brackets = [
            { rate: 0.01, limit: 10808 },
            { rate: 0.02, limit: 25916 },
            { rate: 0.04, limit: 40773 },
            { rate: 0.06, limit: 51540 },
            { rate: 0.08, limit: 65144 },
            { rate: 0.093, limit: 57835 },
            { rate: 0.103, limit: 295373 },
            { rate: 0.113, limit: 590737 },
            { rate: 0.123, limit: Infinity }
        ];

        let tax = 0;
        let remaining = taxableIncome;
        let previousLimit = 0;

        for (const bracket of brackets) {
            if (remaining <= 0) break;
            
            const taxableInBracket = Math.min(remaining, bracket.limit - previousLimit);
            tax += taxableInBracket * bracket.rate;
            remaining -= taxableInBracket;
            previousLimit = bracket.limit;
        }

        return tax;
    }

    calculateFicaTaxes(income) {
        // Social Security tax (6.2%) on first $160,200 (2024)
        const socialSecurityTax = Math.min(income, 160200) * 0.062;
        
        // Medicare tax (1.45%) on all income
        const medicareTax = income * 0.0145;
        
        // Additional Medicare tax (0.9%) on income over $200,000
        const additionalMedicareTax = income > 200000 ? (income - 200000) * 0.009 : 0;
        
        return socialSecurityTax + medicareTax + additionalMedicareTax;
    }

    updateResults(results) {
        this.grossIncomeElement.textContent = this.formatCurrency(results.grossIncome);
        this.taxableIncomeElement.textContent = this.formatCurrency(results.taxableIncome);
        this.federalTaxElement.textContent = this.formatCurrency(results.federalTax);
        this.stateTaxElement.textContent = this.formatCurrency(results.stateTax);
        this.ficaTaxesElement.textContent = this.formatCurrency(results.ficaTaxes);
        this.totalTaxesElement.textContent = this.formatCurrency(results.totalTaxes);
        this.takeHomePayElement.textContent = this.formatCurrency(results.takeHomePay);
        this.effectiveRateElement.textContent = results.effectiveRate.toFixed(1) + '%';
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CaliforniaTaxCalculator();
});