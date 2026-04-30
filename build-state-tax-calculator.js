const fs = require('fs');
const path = require('path');

const states = [
  { name: "Alabama", code: "AL", rates: [2,4,5], brackets: [500,3000,null], standardDeduction: 2500, personalExemption: 1500 },
  { name: "Alaska", code: "AK", rates: [0], brackets: [null], standardDeduction: 0, personalExemption: 0, note: "No state income tax" },
  { name: "Arizona", code: "AZ", rates: [2.55], brackets: [null], standardDeduction: 13850, personalExemption: 0 },
  { name: "Arkansas", code: "AR", rates: [2,4,5.5], brackets: [5000,10000,null], standardDeduction: 2340, personalExemption: 29 },
  { name: "Colorado", code: "CO", rates: [4.4], brackets: [null], standardDeduction: 13850, personalExemption: 0 },
  { name: "Connecticut", code: "CT", rates: [3,5,5.5,6,6.5,6.9,6.99], brackets: [10000,50000,100000,200000,250000,500000,null], standardDeduction: 0, personalExemption: 15000 },
  { name: "Delaware", code: "DE", rates: [2.2,3.9,4.8,5.2,5.55,6.6], brackets: [2000,5000,10000,20000,25000,null], standardDeduction: 3250, personalExemption: 110 },
  { name: "Florida", code: "FL", rates: [0], brackets: [null], standardDeduction: 0, personalExemption: 0, note: "No state income tax" },
  { name: "Georgia", code: "GA", rates: [1,2,3,4,5,5.75], brackets: [750,2250,3750,5250,7000,null], standardDeduction: 12000, personalExemption: 7400 },
  { name: "Hawaii", code: "HI", rates: [1.4,3.2,5.5,6.4,6.8,7.2,7.6,7.9,9,10,11], brackets: [2400,4800,9600,14400,19200,24000,36000,48000,150000,175000,null], standardDeduction: 2200, personalExemption: 1144 },
  { name: "Idaho", code: "ID", rates: [5.8], brackets: [null], standardDeduction: 13850, personalExemption: 0 },
  { name: "Illinois", code: "IL", rates: [4.95], brackets: [null], standardDeduction: 0, personalExemption: 2425 },
  { name: "Indiana", code: "IN", rates: [3.15], brackets: [null], standardDeduction: 0, personalExemption: 1000 },
  { name: "Iowa", code: "IA", rates: [4.4,4.82], brackets: [6000,null], standardDeduction: 2080, personalExemption: 40 },
  { name: "Kansas", code: "KS", rates: [3.1,5.25,5.7], brackets: [15000,30000,null], standardDeduction: 3500, personalExemption: 2250 },
  { name: "Kentucky", code: "KY", rates: [4.5], brackets: [null], standardDeduction: 3160, personalExemption: 0 },
  { name: "Louisiana", code: "LA", rates: [1.85,3.5,4.25], brackets: [12500,50000,null], standardDeduction: 0, personalExemption: 4500 },
  { name: "Maine", code: "ME", rates: [5.8,6.75,7.15], brackets: [24500,58050,null], standardDeduction: 13850, personalExemption: 5000 },
  { name: "Maryland", code: "MD", rates: [2,3,4,4.75,5,5.25,5.5,5.75], brackets: [1000,2000,3000,100000,125000,150000,250000,null], standardDeduction: 2400, personalExemption: 3200 },
  { name: "Massachusetts", code: "MA", rates: [5], brackets: [null], standardDeduction: 0, personalExemption: 4400 },
  { name: "Michigan", code: "MI", rates: [4.25], brackets: [null], standardDeduction: 0, personalExemption: 5400 },
  { name: "Minnesota", code: "MN", rates: [5.35,6.8,7.85,9.85], brackets: [30070,98760,183340,null], standardDeduction: 13850, personalExemption: 0 },
  { name: "Mississippi", code: "MS", rates: [4,5], brackets: [5000,null], standardDeduction: 2300, personalExemption: 6000 },
  { name: "Missouri", code: "MO", rates: [2,2.5,3,3.5,4,4.5,4.8], brackets: [1207,2414,3621,4828,6035,7242,null], standardDeduction: 13850, personalExemption: 0 },
  { name: "Montana", code: "MT", rates: [4.7,5.9,6.5], brackets: [20500,49900,null], standardDeduction: 5340, personalExemption: 2820 },
  { name: "Nebraska", code: "NE", rates: [2.46,3.51,5.01,6.84], brackets: [3700,22170,35730,null], standardDeduction: 7900, personalExemption: 159 },
  { name: "Nevada", code: "NV", rates: [0], brackets: [null], standardDeduction: 0, personalExemption: 0, note: "No state income tax" },
  { name: "New Hampshire", code: "NH", rates: [0], brackets: [null], standardDeduction: 0, personalExemption: 0, note: "No state income tax (dividend/interest only)" },
  { name: "New Jersey", code: "NJ", rates: [1.4,1.75,2.45,3.5,5.525,6.37,8.97,10.75], brackets: [20000,35000,40000,75000,500000,1000000,5000000,null], standardDeduction: 0, personalExemption: 1000 },
  { name: "New Mexico", code: "NM", rates: [1.7,3.2,4.7,5.9], brackets: [5500,11000,16000,null], standardDeduction: 13850, personalExemption: 0 },
  { name: "North Carolina", code: "NC", rates: [4.5], brackets: [null], standardDeduction: 12750, personalExemption: 0 },
  { name: "North Dakota", code: "ND", rates: [1.95,2.5,2.7], brackets: [44725,108825,null], standardDeduction: 13850, personalExemption: 0 },
  { name: "Ohio", code: "OH", rates: [2.75,3.226,3.688,3.99], brackets: [26050,46100,92150,null], standardDeduction: 0, personalExemption: 0 },
  { name: "Oklahoma", code: "OK", rates: [0.25,0.75,1.75,2.75,3.75,4.75], brackets: [1000,2500,3750,4900,7200,null], standardDeduction: 6350, personalExemption: 1000 },
  { name: "Oregon", code: "OR", rates: [4.75,6.75,8.75,9.9], brackets: [4050,10200,125000,null], standardDeduction: 2605, personalExemption: 229 },
  { name: "Pennsylvania", code: "PA", rates: [3.07], brackets: [null], standardDeduction: 0, personalExemption: 0 },
  { name: "Rhode Island", code: "RI", rates: [3.75,4.75,5.99], brackets: [73450,166950,null], standardDeduction: 10400, personalExemption: 4700 },
  { name: "South Carolina", code: "SC", rates: [0,3,4,5,6,7], brackets: [3200,6410,9620,12820,16040,null], standardDeduction: 13850, personalExemption: 0 },
  { name: "South Dakota", code: "SD", rates: [0], brackets: [null], standardDeduction: 0, personalExemption: 0, note: "No state income tax" },
  { name: "Tennessee", code: "TN", rates: [0], brackets: [null], standardDeduction: 0, personalExemption: 0, note: "No state income tax" },
  { name: "Texas", code: "TX", rates: [0], brackets: [null], standardDeduction: 0, personalExemption: 0, note: "No state income tax" },
  { name: "Utah", code: "UT", rates: [4.65], brackets: [null], standardDeduction: 13850, personalExemption: 0 },
  { name: "Vermont", code: "VT", rates: [3.35,6.6,7.6,8.75], brackets: [45400,110050,229550,null], standardDeduction: 7200, personalExemption: 4750 },
  { name: "Virginia", code: "VA", rates: [2,3,5,5.75], brackets: [3000,5000,17000,null], standardDeduction: 8000, personalExemption: 930 },
  { name: "Washington", code: "WA", rates: [0], brackets: [null], standardDeduction: 0, personalExemption: 0, note: "No state income tax" },
  { name: "West Virginia", code: "WV", rates: [2.36,3.15,3.54,4.72,5.12], brackets: [10000,25000,40000,60000,null], standardDeduction: 0, personalExemption: 2000 },
  { name: "Wisconsin", code: "WI", rates: [3.54,4.65,5.3,7.65], brackets: [13810,27630,304170,null], standardDeduction: 12760, personalExemption: 700 },
  { name: "Wyoming", code: "WY", rates: [0], brackets: [null], standardDeduction: 0, personalExemption: 0, note: "No state income tax" }
];

states.forEach(state => {
  const slug = `state-tax-calculator-${state.name.toLowerCase().replace(/\s+/g, '-')}`;
  const filename = `${slug}.html`;
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${state.name} State Income Tax Calculator 2026 - CalcLeap</title>
    <meta name="description" content="Calculate your ${state.name} state income tax liability for 2026. ${state.note || `Accurate tax brackets, rates, deductions, and exemptions for ${state.name} residents.`}">
    <link rel="stylesheet" href="assets/css/gold.css">
    <link rel="stylesheet" href="assets/css/comprehensive-nav.css">
    <link rel="canonical" href="https://calcleap.com/${filename}">
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-5X1QPS2SVW"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-5X1QPS2SVW');
    </script>
</head>
<body>
    <nav class="nav-container">
        <div class="nav-left">
            <a href="index.html" class="logo">CalcLeap</a>
        </div>
        <button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">
            <span></span><span></span><span></span>
        </button>
        <ul class="nav-links">
            <li><a href="index.html">Home</a></li>
            <li class="dropdown">
                <button class="dropdown-toggle" aria-haspopup="true" aria-expanded="false">
                    Calculators <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M6 9L1 4h10z"/></svg>
                </button>
                <ul class="dropdown-menu">
                    <li><a href="calculators.html">All Calculators</a></li>
                    <li><a href="index.html#finance">Finance</a></li>
                    <li><a href="index.html#health">Health</a></li>
                    <li><a href="index.html#conversion">Conversions</a></li>
                </ul>
            </li>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="contact.html">Contact</a></li>
        </ul>
    </nav>

    <main class="page-container">
        <div class="page-title">
            <h1>${state.name} State Income Tax Calculator</h1>
            <p class="subtitle">Calculate your ${state.name} state income tax liability for 2026</p>
        </div>

        <div class="tool-container">
            <div class="calculator-inputs">
                <div class="input-group">
                    <label for="income">Annual Taxable Income ($)</label>
                    <input type="number" id="income" value="75000" min="0" step="1000">
                </div>
                <div class="input-group">
                    <label for="filingStatus">Filing Status</label>
                    <select id="filingStatus">
                        <option value="single">Single</option>
                        <option value="married">Married Filing Jointly</option>
                        <option value="head">Head of Household</option>
                    </select>
                </div>
                <div class="input-group">
                    <label for="dependents">Number of Dependents</label>
                    <input type="number" id="dependents" value="0" min="0" max="10">
                </div>
                <button onclick="calculateTax()" class="calculate-btn">Calculate Tax</button>
            </div>

            <div id="results" class="results-box" style="display:none;">
                <h3>Tax Calculation Results</h3>
                <div class="result-item">
                    <span class="result-label">Gross Income:</span>
                    <span class="result-value" id="grossIncome">$0</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Standard Deduction:</span>
                    <span class="result-value" id="deduction">$0</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Personal Exemptions:</span>
                    <span class="result-value" id="exemptions">$0</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Taxable Income:</span>
                    <span class="result-value" id="taxableIncome">$0</span>
                </div>
                <div class="result-item highlight">
                    <span class="result-label">Total State Tax:</span>
                    <span class="result-value" id="totalTax">$0</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Effective Tax Rate:</span>
                    <span class="result-value" id="effectiveRate">0%</span>
                </div>
            </div>
        </div>

        <div class="info-section">
            <h2>About ${state.name} State Income Tax</h2>
            ${state.note ? `<p><strong>${state.note}</strong></p>` : ''}
            <h3>Tax Brackets & Rates (2026)</h3>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Income Range</th>
                        <th>Tax Rate</th>
                    </tr>
                </thead>
                <tbody>
                    ${state.rates.map((rate, idx) => {
                        const start = idx === 0 ? 0 : state.brackets[idx - 1];
                        const end = state.brackets[idx];
                        const rangeText = end === null 
                            ? `Over $${start.toLocaleString()}`
                            : `$${start.toLocaleString()} - $${end.toLocaleString()}`;
                        return `<tr><td>${rangeText}</td><td>${rate}%</td></tr>`;
                    }).join('')}
                </tbody>
            </table>
            
            <h3>Deductions & Exemptions</h3>
            <ul>
                ${state.standardDeduction > 0 ? `<li>Standard Deduction: $${state.standardDeduction.toLocaleString()}</li>` : ''}
                ${state.personalExemption > 0 ? `<li>Personal Exemption: $${state.personalExemption.toLocaleString()} per taxpayer</li>` : ''}
                ${state.standardDeduction === 0 && state.personalExemption === 0 ? '<li>No standard deductions or exemptions apply</li>' : ''}
            </ul>

            <h3>How ${state.name} State Income Tax Works</h3>
            <p>${state.rates.length === 1 && state.rates[0] === 0 
                ? `${state.name} does not impose a state income tax on wages and salaries. Residents only pay federal income tax.`
                : state.rates.length === 1
                    ? `${state.name} uses a flat tax rate of ${state.rates[0]}% on all taxable income. This means all income above deductions and exemptions is taxed at the same rate.`
                    : `${state.name} uses a progressive tax system with ${state.rates.length} tax brackets. As your income increases, different portions are taxed at higher rates. Only the income within each bracket is taxed at that bracket's rate.`
            }</p>

            <h3>Tips for ${state.name} Taxpayers</h3>
            <ul>
                <li>File your state return by the same deadline as federal taxes (typically April 15)</li>
                ${state.standardDeduction > 0 ? '<li>Consider itemizing deductions if they exceed the standard deduction</li>' : ''}
                <li>Make estimated quarterly payments if you're self-employed or have significant investment income</li>
                <li>Keep detailed records of all income, deductions, and tax payments</li>
                ${state.rates[0] > 0 ? '<li>Consider contributions to tax-advantaged accounts like 401(k)s and IRAs to reduce taxable income</li>' : ''}
            </ul>
        </div>
    </main>

    <footer class="site-footer">
        <div class="footer-content">
            <p>&copy; 2026 CalcLeap. Your go-to source for accurate calculators.</p>
            <div class="footer-links">
                <a href="about.html">About</a>
                <a href="contact.html">Contact</a>
                <a href="privacy.html">Privacy Policy</a>
            </div>
        </div>
    </footer>

    <script>
const stateData = ${JSON.stringify(state)};

function calculateTax() {
    const income = parseFloat(document.getElementById('income').value) || 0;
    const filingStatus = document.getElementById('filingStatus').value;
    const dependents = parseInt(document.getElementById('dependents').value) || 0;

    // Adjust deductions/exemptions based on filing status
    let standardDed = stateData.standardDeduction;
    if (filingStatus === 'married' && standardDed > 0) {
        standardDed *= 1.5; // Rough multiplier for married filing jointly
    }

    const personalExempt = stateData.personalExemption * (filingStatus === 'married' ? 2 : 1);
    const dependentExempt = stateData.personalExemption * dependents;
    const totalExemptions = personalExempt + dependentExempt;

    const taxableIncome = Math.max(0, income - standardDed - totalExemptions);

    let tax = 0;
    if (stateData.rates[0] !== 0) {
        for (let i = 0; i < stateData.rates.length; i++) {
            const rate = stateData.rates[i] / 100;
            const bracketStart = i === 0 ? 0 : stateData.brackets[i - 1];
            const bracketEnd = stateData.brackets[i];

            if (taxableIncome > bracketStart) {
                const taxableInBracket = bracketEnd === null 
                    ? taxableIncome - bracketStart
                    : Math.min(taxableIncome, bracketEnd) - bracketStart;
                tax += taxableInBracket * rate;
            }
        }
    }

    const effectiveRate = income > 0 ? (tax / income) * 100 : 0;

    document.getElementById('grossIncome').textContent = '$' + income.toLocaleString('en-US', {maximumFractionDigits: 2});
    document.getElementById('deduction').textContent = '$' + standardDed.toLocaleString('en-US', {maximumFractionDigits: 2});
    document.getElementById('exemptions').textContent = '$' + totalExemptions.toLocaleString('en-US', {maximumFractionDigits: 2});
    document.getElementById('taxableIncome').textContent = '$' + taxableIncome.toLocaleString('en-US', {maximumFractionDigits: 2});
    document.getElementById('totalTax').textContent = '$' + tax.toLocaleString('en-US', {maximumFractionDigits: 2});
    document.getElementById('effectiveRate').textContent = effectiveRate.toFixed(2) + '%';

    document.getElementById('results').style.display = 'block';
    document.getElementById('results').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Nav toggle
document.querySelector('.nav-toggle').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.nav-links').classList.toggle('active');
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !expanded);
});

// Dropdown toggle
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', function(e) {
        e.preventDefault();
        const parent = this.closest('.dropdown');
        parent.classList.toggle('active');
        const expanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !expanded);
    });
});

// Calculate on load
window.addEventListener('load', calculateTax);
    </script>
</body>
</html>`;
  
  fs.writeFileSync(path.join('/data/workspace/toolpulse', filename), html);
  console.log(`✅ ${filename}`);
});

console.log(`\n✅ Generated ${states.length} state tax calculator pages`);
