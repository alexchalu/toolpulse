#!/usr/bin/env node

const fs = require('fs');

const calculators = [
  {
    slug: 'rental-property-roi-calculator',
    title: 'Rental Property ROI Calculator',
    desc: 'Calculate return on investment for rental properties with cash flow analysis',
    category: 'Real Estate Investment',
    fields: [
      { id: 'purchase-price', label: 'Purchase Price ($)', type: 'number', placeholder: '300000' },
      { id: 'down-payment', label: 'Down Payment (%)', type: 'number', placeholder: '20' },
      { id: 'interest-rate', label: 'Mortgage Interest Rate (%)', type: 'number', placeholder: '7' },
      { id: 'loan-term', label: 'Loan Term (years)', type: 'number', placeholder: '30' },
      { id: 'monthly-rent', label: 'Monthly Rent Income ($)', type: 'number', placeholder: '2500' },
      { id: 'vacancy-rate', label: 'Vacancy Rate (%)', type: 'number', placeholder: '5' },
      { id: 'property-tax', label: 'Annual Property Tax ($)', type: 'number', placeholder: '3600' },
      { id: 'insurance', label: 'Annual Insurance ($)', type: 'number', placeholder: '1200' },
      { id: 'maintenance', label: 'Annual Maintenance ($)', type: 'number', placeholder: '2400' },
      { id: 'hoa', label: 'Monthly HOA Fees ($)', type: 'number', placeholder: '0' },
    ]
  },
  {
    slug: 'cap-rate-calculator',
    title: 'Cap Rate Calculator',
    desc: 'Calculate capitalization rate for real estate investments',
    category: 'Real Estate Investment',
    fields: [
      { id: 'purchase-price', label: 'Property Purchase Price ($)', type: 'number', placeholder: '500000' },
      { id: 'annual-noi', label: 'Annual Net Operating Income ($)', type: 'number', placeholder: '35000' },
      { id: 'annual-rent', label: 'Annual Gross Rental Income ($)', type: 'number', placeholder: '48000' },
      { id: 'operating-expenses', label: 'Annual Operating Expenses ($)', type: 'number', placeholder: '13000' },
    ]
  },
  {
    slug: 'noi-calculator',
    title: 'Net Operating Income (NOI) Calculator',
    desc: 'Calculate NOI for rental and commercial properties',
    category: 'Real Estate Investment',
    fields: [
      { id: 'gross-rent', label: 'Gross Rental Income ($)', type: 'number', placeholder: '48000' },
      { id: 'other-income', label: 'Other Income (parking, laundry, etc.) ($)', type: 'number', placeholder: '2400' },
      { id: 'vacancy-loss', label: 'Vacancy & Credit Loss ($)', type: 'number', placeholder: '2500' },
      { id: 'property-tax', label: 'Property Tax ($)', type: 'number', placeholder: '5000' },
      { id: 'insurance', label: 'Insurance ($)', type: 'number', placeholder: '1800' },
      { id: 'utilities', label: 'Utilities ($)', type: 'number', placeholder: '3000' },
      { id: 'maintenance', label: 'Maintenance & Repairs ($)', type: 'number', placeholder: '4000' },
      { id: 'management', label: 'Property Management Fees ($)', type: 'number', placeholder: '3600' },
    ]
  },
  {
    slug: 'real-estate-appreciation-calculator',
    title: 'Real Estate Appreciation Calculator',
    desc: 'Calculate property value growth over time with appreciation',
    category: 'Real Estate Investment',
    fields: [
      { id: 'current-value', label: 'Current Property Value ($)', type: 'number', placeholder: '350000' },
      { id: 'appreciation-rate', label: 'Annual Appreciation Rate (%)', type: 'number', placeholder: '3' },
      { id: 'years', label: 'Number of Years', type: 'number', placeholder: '10' },
      { id: 'down-payment', label: 'Down Payment ($)', type: 'number', placeholder: '70000' },
    ]
  },
  {
    slug: 'house-flipping-calculator',
    title: 'House Flipping Calculator',
    desc: 'Calculate profit on fix-and-flip real estate investments',
    category: 'Real Estate Investment',
    fields: [
      { id: 'purchase-price', label: 'Purchase Price ($)', type: 'number', placeholder: '200000' },
      { id: 'renovation-cost', label: 'Renovation Costs ($)', type: 'number', placeholder: '50000' },
      { id: 'holding-costs', label: 'Holding Costs (monthly) ($)', type: 'number', placeholder: '2000' },
      { id: 'holding-time', label: 'Holding Time (months)', type: 'number', placeholder: '6' },
      { id: 'arv', label: 'After Repair Value (ARV) ($)', type: 'number', placeholder: '320000' },
      { id: 'selling-costs', label: 'Selling Costs (%) (agent, closing)', type: 'number', placeholder: '8' },
    ]
  },
  {
    slug: 'mortgage-refinance-calculator',
    title: 'Mortgage Refinance Calculator',
    desc: 'Should you refinance? Compare current vs new mortgage',
    category: 'Real Estate',
    fields: [
      { id: 'loan-balance', label: 'Current Loan Balance ($)', type: 'number', placeholder: '250000' },
      { id: 'current-rate', label: 'Current Interest Rate (%)', type: 'number', placeholder: '6.5' },
      { id: 'current-term', label: 'Remaining Term (years)', type: 'number', placeholder: '25' },
      { id: 'new-rate', label: 'New Interest Rate (%)', type: 'number', placeholder: '5.5' },
      { id: 'new-term', label: 'New Loan Term (years)', type: 'number', placeholder: '30' },
      { id: 'closing-costs', label: 'Closing Costs ($)', type: 'number', placeholder: '5000' },
    ]
  },
];

function generateCalculatorPage(calc) {
  const fieldsHTML = calc.fields.map(f => `
    <div class="input-group">
      <label for="${f.id}">${f.label}</label>
      <input type="${f.type}" id="${f.id}" placeholder="${f.placeholder}" step="any">
    </div>
  `).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${calc.title} - Free ${calc.category} Tool | CalcLeap</title>
    <meta name="description" content="${calc.desc}. Free online ${calc.title.toLowerCase()} with detailed results and explanations.">
    <link rel="canonical" href="https://calcleap.com/calc/${calc.slug}.html">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f7fa; color: #333; line-height: 1.6; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem 0; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
        .header h1 { font-size: 1.8rem; margin-bottom: 0.5rem; }
        .header p { opacity: 0.9; }
        .main { padding: 2rem 0; }
        .calc-box { background: white; border-radius: 12px; padding: 2rem; box-shadow: 0 2px 20px rgba(0,0,0,0.08); margin-bottom: 2rem; }
        .calc-box h2 { margin-bottom: 1.5rem; color: #667eea; }
        .input-group { margin-bottom: 1.5rem; }
        .input-group label { display: block; margin-bottom: 0.5rem; font-weight: 600; color: #555; }
        .input-group input { width: 100%; padding: 0.75rem; border: 2px solid #e0e6ed; border-radius: 6px; font-size: 1rem; transition: border 0.3s; }
        .input-group input:focus { outline: none; border-color: #667eea; }
        .btn { background: #667eea; color: white; border: none; padding: 0.75rem 2rem; border-radius: 6px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: background 0.3s; }
        .btn:hover { background: #5568d3; }
        .result-box { background: #f0f4ff; border-left: 4px solid #667eea; padding: 1.5rem; border-radius: 6px; margin-top: 1.5rem; display: none; }
        .result-box.show { display: block; }
        .result-box h3 { color: #667eea; margin-bottom: 1rem; }
        .result-item { margin-bottom: 0.75rem; padding: 0.75rem; background: white; border-radius: 6px; }
        .result-item strong { color: #333; }
        .result-value { color: #667eea; font-size: 1.1rem; font-weight: 700; }
        .info-section { background: white; border-radius: 12px; padding: 2rem; box-shadow: 0 2px 20px rgba(0,0,0,0.08); margin-bottom: 2rem; }
        .info-section h3 { color: #667eea; margin-bottom: 1rem; }
        .info-section p, .info-section ul { margin-bottom: 1rem; }
        .info-section ul { margin-left: 1.5rem; }
        .ad-placeholder { background: #f0f0f0; border: 2px dashed #ccc; padding: 2rem; text-align: center; margin: 2rem 0; border-radius: 8px; min-height: 250px; display: flex; align-items: center; justify-content: center; }
        .footer { background: #2d3748; color: white; padding: 2rem 0; text-align: center; }
        .footer a { color: #667eea; text-decoration: none; }
        @media (max-width: 768px) { .header h1 { font-size: 1.5rem; } }
    </style>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3112605892426625" crossorigin="anonymous"></script>
</head>
<body>
    <div class="header">
        <div class="container">
            <h1>${calc.title}</h1>
            <p>${calc.desc}</p>
        </div>
    </div>

    <div class="main container">
        <!-- Ad Slot 1 -->
        <div class="ad-placeholder">
            <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3112605892426625" data-ad-slot="1234567890" data-ad-format="auto" data-full-width-responsive="true"></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        </div>

        <div class="calc-box">
            <h2>Enter Your Information</h2>
            ${fieldsHTML}
            <button class="btn" onclick="calculate()">Calculate</button>
            
            <div class="result-box" id="results">
                <h3>Results</h3>
                <div id="result-content"></div>
            </div>
        </div>

        <!-- Ad Slot 2 -->
        <div class="ad-placeholder">
            <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3112605892426625" data-ad-slot="1234567891" data-ad-format="auto" data-full-width-responsive="true"></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        </div>

        <div class="info-section">
            <h3>About This Calculator</h3>
            <p>${calc.desc}. This free tool helps real estate investors, homeowners, and property buyers make informed financial decisions.</p>
            
            <h3>How to Use</h3>
            <ol style="margin-left: 1.5rem;">
                <li>Enter your property and financial information in the fields above</li>
                <li>Click "Calculate" to see detailed results</li>
                <li>Review the breakdown to understand your ${calc.category.toLowerCase()} metrics</li>
                <li>Adjust inputs to compare different scenarios</li>
            </ol>
        </div>

        <!-- Ad Slot 3 -->
        <div class="ad-placeholder">
            <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3112605892426625" data-ad-slot="1234567892" data-ad-format="auto" data-full-width-responsive="true"></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        </div>

        <div class="info-section">
            <h3>More Tools</h3>
            <p>Check out our other real estate and financial calculators:</p>
            <ul>
                <li><a href="../index.html">CalcLeap Home - All Tools</a></li>
                <li><a href="https://alexchalu.github.io/smartcalc/">SmartCalc - Financial Calculators</a></li>
                <li><a href="https://alexchalu.github.io/healthcalcs/">HealthCalcs - Health & Wellness</a></li>
            </ul>
        </div>
    </div>

    <div class="footer">
        <div class="container">
            <p>&copy; 2026 CalcLeap. Free online tools and calculators.</p>
            <p><a href="../index.html">Home</a> | <a href="https://alexchalu.github.io/smartcalc/">SmartCalc</a> | <a href="https://alexchalu.github.io/healthcalcs/">HealthCalcs</a></p>
            <p style="margin-top: 0.5rem; font-size: 0.75rem;">All calculations are for informational purposes only. Consult a financial advisor for investment decisions.</p>
        </div>
    </div>

    <script>
        function calculate() {
            // Calculator-specific logic will be implemented based on the calculator type
            const slug = '${calc.slug}';
            const results = document.getElementById('results');
            const content = document.getElementById('result-content');
            
            // Get all input values
            const inputs = {};
            document.querySelectorAll('input').forEach(input => {
                inputs[input.id] = parseFloat(input.value) || 0;
            });
            
            let html = '';
            
            ${generateCalculatorLogic(calc)}
            
            content.innerHTML = html;
            results.classList.add('show');
        }
        
        function formatCurrency(num) {
            return '$' + num.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        }
        
        function formatPercent(num) {
            return num.toFixed(2) + '%';
        }
    </script>
</body>
</html>`;
}

function generateCalculatorLogic(calc) {
  switch(calc.slug) {
    case 'rental-property-roi-calculator':
      return `
            const purchasePrice = inputs['purchase-price'];
            const downPaymentPct = inputs['down-payment'];
            const interestRate = inputs['interest-rate'];
            const loanTerm = inputs['loan-term'];
            const monthlyRent = inputs['monthly-rent'];
            const vacancyRate = inputs['vacancy-rate'];
            const propertyTax = inputs['property-tax'];
            const insurance = inputs['insurance'];
            const maintenance = inputs['maintenance'];
            const hoa = inputs['hoa'];
            
            const downPayment = purchasePrice * (downPaymentPct / 100);
            const loanAmount = purchasePrice - downPayment;
            const monthlyRate = (interestRate / 100) / 12;
            const numPayments = loanTerm * 12;
            const monthlyMortgage = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
            
            const effectiveMonthlyRent = monthlyRent * (1 - vacancyRate / 100);
            const monthlyExpenses = (propertyTax + insurance + maintenance) / 12 + hoa + monthlyMortgage;
            const monthlyCashFlow = effectiveMonthlyRent - monthlyExpenses;
            const annualCashFlow = monthlyCashFlow * 12;
            const cashOnCashReturn = (annualCashFlow / downPayment) * 100;
            const totalROI = ((annualCashFlow * loanTerm + loanAmount) / downPayment - 1) * 100;
            
            html = \`
                <div class="result-item"><strong>Down Payment:</strong> <span class="result-value">\${formatCurrency(downPayment)}</span></div>
                <div class="result-item"><strong>Loan Amount:</strong> <span class="result-value">\${formatCurrency(loanAmount)}</span></div>
                <div class="result-item"><strong>Monthly Mortgage Payment:</strong> <span class="result-value">\${formatCurrency(monthlyMortgage)}</span></div>
                <div class="result-item"><strong>Effective Monthly Rent:</strong> <span class="result-value">\${formatCurrency(effectiveMonthlyRent)}</span></div>
                <div class="result-item"><strong>Total Monthly Expenses:</strong> <span class="result-value">\${formatCurrency(monthlyExpenses)}</span></div>
                <div class="result-item"><strong>Monthly Cash Flow:</strong> <span class="result-value" style="color: \${monthlyCashFlow >= 0 ? '#10b981' : '#ef4444'}">\${formatCurrency(monthlyCashFlow)}</span></div>
                <div class="result-item"><strong>Annual Cash Flow:</strong> <span class="result-value" style="color: \${annualCashFlow >= 0 ? '#10b981' : '#ef4444'}">\${formatCurrency(annualCashFlow)}</span></div>
                <div class="result-item"><strong>Cash-on-Cash Return:</strong> <span class="result-value">\${formatPercent(cashOnCashReturn)}</span></div>
                <div class="result-item"><strong>Total ROI:</strong> <span class="result-value">\${formatPercent(totalROI)}</span></div>
            \`;
      `;
      
    case 'cap-rate-calculator':
      return `
            const purchasePrice = inputs['purchase-price'];
            const annualNOI = inputs['annual-noi'];
            const annualRent = inputs['annual-rent'];
            const operatingExpenses = inputs['operating-expenses'];
            
            const calculatedNOI = annualRent - operatingExpenses;
            const capRate = (annualNOI / purchasePrice) * 100;
            const calculatedCapRate = (calculatedNOI / purchasePrice) * 100;
            
            html = \`
                <div class="result-item"><strong>Cap Rate (from NOI):</strong> <span class="result-value">\${formatPercent(capRate)}</span></div>
                <div class="result-item"><strong>Calculated NOI:</strong> <span class="result-value">\${formatCurrency(calculatedNOI)}</span></div>
                <div class="result-item"><strong>Calculated Cap Rate:</strong> <span class="result-value">\${formatPercent(calculatedCapRate)}</span></div>
                <div class="result-item" style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e0e6ed;">
                    <p><strong>What this means:</strong> A cap rate of \${capRate.toFixed(2)}% means you're earning \${capRate.toFixed(2)}% annual return on your investment before financing costs. Higher cap rates generally indicate better returns but may come with higher risk.</p>
                </div>
            \`;
      `;
      
    case 'noi-calculator':
      return `
            const grossRent = inputs['gross-rent'];
            const otherIncome = inputs['other-income'];
            const vacancyLoss = inputs['vacancy-loss'];
            const propertyTax = inputs['property-tax'];
            const insurance = inputs['insurance'];
            const utilities = inputs['utilities'];
            const maintenance = inputs['maintenance'];
            const management = inputs['management'];
            
            const grossIncome = grossRent + otherIncome;
            const effectiveIncome = grossIncome - vacancyLoss;
            const totalExpenses = propertyTax + insurance + utilities + maintenance + management;
            const noi = effectiveIncome - totalExpenses;
            
            html = \`
                <div class="result-item"><strong>Gross Rental Income:</strong> <span class="result-value">\${formatCurrency(grossIncome)}</span></div>
                <div class="result-item"><strong>Effective Gross Income:</strong> <span class="result-value">\${formatCurrency(effectiveIncome)}</span></div>
                <div class="result-item"><strong>Total Operating Expenses:</strong> <span class="result-value">\${formatCurrency(totalExpenses)}</span></div>
                <div class="result-item"><strong>Net Operating Income (NOI):</strong> <span class="result-value" style="font-size: 1.3rem; color: \${noi >= 0 ? '#10b981' : '#ef4444'}">\${formatCurrency(noi)}</span></div>
                <div class="result-item" style="margin-top: 1rem;">
                    <p><strong>Operating Expense Ratio:</strong> \${((totalExpenses / effectiveIncome) * 100).toFixed(2)}%</p>
                </div>
            \`;
      `;
      
    case 'real-estate-appreciation-calculator':
      return `
            const currentValue = inputs['current-value'];
            const appreciationRate = inputs['appreciation-rate'];
            const years = inputs['years'];
            const downPayment = inputs['down-payment'];
            
            const futureValue = currentValue * Math.pow(1 + appreciationRate / 100, years);
            const totalAppreciation = futureValue - currentValue;
            const equityGain = totalAppreciation;
            const roi = ((equityGain / downPayment) * 100);
            
            html = \`
                <div class="result-item"><strong>Current Property Value:</strong> <span class="result-value">\${formatCurrency(currentValue)}</span></div>
                <div class="result-item"><strong>Future Value:</strong> <span class="result-value">\${formatCurrency(futureValue)}</span> <small>(in \${years} years)</small></div>
                <div class="result-item"><strong>Total Appreciation:</strong> <span class="result-value" style="color: #10b981">\${formatCurrency(totalAppreciation)}</span></div>
                <div class="result-item"><strong>ROI on Down Payment:</strong> <span class="result-value">\${formatPercent(roi)}</span></div>
                <div class="result-item" style="margin-top: 1rem;">
                    <p><strong>Average Annual Gain:</strong> \${formatCurrency(totalAppreciation / years)}</p>
                </div>
            \`;
      `;
      
    case 'house-flipping-calculator':
      return `
            const purchasePrice = inputs['purchase-price'];
            const renovationCost = inputs['renovation-cost'];
            const holdingCosts = inputs['holding-costs'];
            const holdingTime = inputs['holding-time'];
            const arv = inputs['arv'];
            const sellingCosts = inputs['selling-costs'];
            
            const totalHoldingCosts = holdingCosts * holdingTime;
            const totalInvestment = purchasePrice + renovationCost + totalHoldingCosts;
            const sellingCostsDollar = arv * (sellingCosts / 100);
            const netProfit = arv - totalInvestment - sellingCostsDollar;
            const roi = (netProfit / totalInvestment) * 100;
            const annualizedROI = roi * (12 / holdingTime);
            
            html = \`
                <div class="result-item"><strong>Purchase Price:</strong> <span class="result-value">\${formatCurrency(purchasePrice)}</span></div>
                <div class="result-item"><strong>Renovation Costs:</strong> <span class="result-value">\${formatCurrency(renovationCost)}</span></div>
                <div class="result-item"><strong>Holding Costs:</strong> <span class="result-value">\${formatCurrency(totalHoldingCosts)}</span></div>
                <div class="result-item"><strong>Selling Costs:</strong> <span class="result-value">\${formatCurrency(sellingCostsDollar)}</span></div>
                <div class="result-item"><strong>Total Investment:</strong> <span class="result-value">\${formatCurrency(totalInvestment)}</span></div>
                <div class="result-item"><strong>After Repair Value:</strong> <span class="result-value">\${formatCurrency(arv)}</span></div>
                <div class="result-item"><strong>Net Profit:</strong> <span class="result-value" style="font-size: 1.3rem; color: \${netProfit >= 0 ? '#10b981' : '#ef4444'}">\${formatCurrency(netProfit)}</span></div>
                <div class="result-item"><strong>ROI:</strong> <span class="result-value">\${formatPercent(roi)}</span></div>
                <div class="result-item"><strong>Annualized ROI:</strong> <span class="result-value">\${formatPercent(annualizedROI)}</span></div>
            \`;
      `;
      
    case 'mortgage-refinance-calculator':
      return `
            const loanBalance = inputs['loan-balance'];
            const currentRate = inputs['current-rate'];
            const currentTerm = inputs['current-term'];
            const newRate = inputs['new-rate'];
            const newTerm = inputs['new-term'];
            const closingCosts = inputs['closing-costs'];
            
            const currentMonthlyRate = (currentRate / 100) / 12;
            const currentPayments = currentTerm * 12;
            const currentPayment = loanBalance * (currentMonthlyRate * Math.pow(1 + currentMonthlyRate, currentPayments)) / (Math.pow(1 + currentMonthlyRate, currentPayments) - 1);
            
            const newMonthlyRate = (newRate / 100) / 12;
            const newPayments = newTerm * 12;
            const newPayment = loanBalance * (newMonthlyRate * Math.pow(1 + newMonthlyRate, newPayments)) / (Math.pow(1 + newMonthlyRate, newPayments) - 1);
            
            const monthlySavings = currentPayment - newPayment;
            const breakEvenMonths = closingCosts / monthlySavings;
            const totalCurrentCost = currentPayment * currentPayments;
            const totalNewCost = (newPayment * newPayments) + closingCosts;
            const lifetimeSavings = totalCurrentCost - totalNewCost;
            
            html = \`
                <div class="result-item"><strong>Current Monthly Payment:</strong> <span class="result-value">\${formatCurrency(currentPayment)}</span></div>
                <div class="result-item"><strong>New Monthly Payment:</strong> <span class="result-value">\${formatCurrency(newPayment)}</span></div>
                <div class="result-item"><strong>Monthly Savings:</strong> <span class="result-value" style="color: \${monthlySavings >= 0 ? '#10b981' : '#ef4444'}">\${formatCurrency(monthlySavings)}</span></div>
                <div class="result-item"><strong>Break-Even Point:</strong> <span class="result-value">\${breakEvenMonths.toFixed(1)} months</span></div>
                <div class="result-item"><strong>Lifetime Savings:</strong> <span class="result-value" style="color: \${lifetimeSavings >= 0 ? '#10b981' : '#ef4444'}">\${formatCurrency(lifetimeSavings)}</span></div>
                <div class="result-item" style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e0e6ed;">
                    <p><strong>Recommendation:</strong> \${monthlySavings > 0 && breakEvenMonths < 36 ? 'Refinancing looks favorable. You\\'ll break even in ' + breakEvenMonths.toFixed(1) + ' months.' : 'Consider waiting or shopping for better rates. Break-even time is quite long.'}</p>
                </div>
            \`;
      `;
      
    default:
      return `html = '<div class="result-item">Calculation complete. Results will appear here.</div>';`;
  }
}

// Generate all calculator pages
let count = 0;
calculators.forEach(calc => {
  const html = generateCalculatorPage(calc);
  const dir = __dirname + '/calc';
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  fs.writeFileSync(`${dir}/${calc.slug}.html`, html);
  count++;
  console.log(`✓ Generated calc/${calc.slug}.html`);
});

console.log(`\n✅ Generated ${count} real estate investment calculators`);
console.log('📝 Next: Update sitemap.xml and rebuild-index.js');
