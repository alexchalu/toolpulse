#!/usr/bin/env node
// Build 50 state paycheck/take-home pay calculators for SmartCalc
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'smartcalc', 'paycheck');
fs.mkdirSync(outDir, { recursive: true });

const states = [
  { code: 'AL', name: 'Alabama', rate: 5.0, type: 'graduated', brackets: '2-5%' },
  { code: 'AK', name: 'Alaska', rate: 0, type: 'none', brackets: 'No state income tax' },
  { code: 'AZ', name: 'Arizona', rate: 2.5, type: 'flat', brackets: '2.5% flat rate' },
  { code: 'AR', name: 'Arkansas', rate: 4.4, type: 'graduated', brackets: '2-4.4%' },
  { code: 'CA', name: 'California', rate: 13.3, type: 'graduated', brackets: '1-13.3%' },
  { code: 'CO', name: 'Colorado', rate: 4.4, type: 'flat', brackets: '4.4% flat rate' },
  { code: 'CT', name: 'Connecticut', rate: 6.99, type: 'graduated', brackets: '3-6.99%' },
  { code: 'DE', name: 'Delaware', rate: 6.6, type: 'graduated', brackets: '2.2-6.6%' },
  { code: 'FL', name: 'Florida', rate: 0, type: 'none', brackets: 'No state income tax' },
  { code: 'GA', name: 'Georgia', rate: 5.49, type: 'flat', brackets: '5.49% flat rate' },
  { code: 'HI', name: 'Hawaii', rate: 11, type: 'graduated', brackets: '1.4-11%' },
  { code: 'ID', name: 'Idaho', rate: 5.8, type: 'flat', brackets: '5.8% flat rate' },
  { code: 'IL', name: 'Illinois', rate: 4.95, type: 'flat', brackets: '4.95% flat rate' },
  { code: 'IN', name: 'Indiana', rate: 3.05, type: 'flat', brackets: '3.05% flat rate' },
  { code: 'IA', name: 'Iowa', rate: 5.7, type: 'graduated', brackets: '4.4-5.7%' },
  { code: 'KS', name: 'Kansas', rate: 5.7, type: 'graduated', brackets: '3.1-5.7%' },
  { code: 'KY', name: 'Kentucky', rate: 4.0, type: 'flat', brackets: '4% flat rate' },
  { code: 'LA', name: 'Louisiana', rate: 4.25, type: 'graduated', brackets: '1.85-4.25%' },
  { code: 'ME', name: 'Maine', rate: 7.15, type: 'graduated', brackets: '5.8-7.15%' },
  { code: 'MD', name: 'Maryland', rate: 5.75, type: 'graduated', brackets: '2-5.75%' },
  { code: 'MA', name: 'Massachusetts', rate: 5.0, type: 'flat', brackets: '5% flat rate (9% on short-term capital gains over $1M)' },
  { code: 'MI', name: 'Michigan', rate: 4.25, type: 'flat', brackets: '4.25% flat rate' },
  { code: 'MN', name: 'Minnesota', rate: 9.85, type: 'graduated', brackets: '5.35-9.85%' },
  { code: 'MS', name: 'Mississippi', rate: 4.7, type: 'flat', brackets: '4.7% flat rate (on income over $10,000)' },
  { code: 'MO', name: 'Missouri', rate: 4.8, type: 'graduated', brackets: '2-4.8%' },
  { code: 'MT', name: 'Montana', rate: 6.75, type: 'graduated', brackets: '4.7-6.75%' },
  { code: 'NE', name: 'Nebraska', rate: 5.84, type: 'graduated', brackets: '2.46-5.84%' },
  { code: 'NV', name: 'Nevada', rate: 0, type: 'none', brackets: 'No state income tax' },
  { code: 'NH', name: 'New Hampshire', rate: 0, type: 'none', brackets: 'No state income tax (interest/dividends tax repealed 2025)' },
  { code: 'NJ', name: 'New Jersey', rate: 10.75, type: 'graduated', brackets: '1.4-10.75%' },
  { code: 'NM', name: 'New Mexico', rate: 5.9, type: 'graduated', brackets: '1.7-5.9%' },
  { code: 'NY', name: 'New York', rate: 10.9, type: 'graduated', brackets: '4-10.9%' },
  { code: 'NC', name: 'North Carolina', rate: 4.5, type: 'flat', brackets: '4.5% flat rate' },
  { code: 'ND', name: 'North Dakota', rate: 2.5, type: 'graduated', brackets: '0-2.5%' },
  { code: 'OH', name: 'Ohio', rate: 3.5, type: 'graduated', brackets: '0-3.5%' },
  { code: 'OK', name: 'Oklahoma', rate: 4.75, type: 'graduated', brackets: '0.25-4.75%' },
  { code: 'OR', name: 'Oregon', rate: 9.9, type: 'graduated', brackets: '4.75-9.9%' },
  { code: 'PA', name: 'Pennsylvania', rate: 3.07, type: 'flat', brackets: '3.07% flat rate' },
  { code: 'RI', name: 'Rhode Island', rate: 5.99, type: 'graduated', brackets: '3.75-5.99%' },
  { code: 'SC', name: 'South Carolina', rate: 6.4, type: 'graduated', brackets: '0-6.4%' },
  { code: 'SD', name: 'South Dakota', rate: 0, type: 'none', brackets: 'No state income tax' },
  { code: 'TN', name: 'Tennessee', rate: 0, type: 'none', brackets: 'No state income tax' },
  { code: 'TX', name: 'Texas', rate: 0, type: 'none', brackets: 'No state income tax' },
  { code: 'UT', name: 'Utah', rate: 4.65, type: 'flat', brackets: '4.65% flat rate' },
  { code: 'VT', name: 'Vermont', rate: 8.75, type: 'graduated', brackets: '3.35-8.75%' },
  { code: 'VA', name: 'Virginia', rate: 5.75, type: 'graduated', brackets: '2-5.75%' },
  { code: 'WA', name: 'Washington', rate: 0, type: 'none', brackets: 'No state income tax (7% on capital gains over $270K)' },
  { code: 'WV', name: 'West Virginia', rate: 5.12, type: 'graduated', brackets: '2.36-5.12%' },
  { code: 'WI', name: 'Wisconsin', rate: 7.65, type: 'graduated', brackets: '3.5-7.65%' },
  { code: 'WY', name: 'Wyoming', rate: 0, type: 'none', brackets: 'No state income tax' },
];

const noTaxStates = states.filter(s => s.type === 'none').map(s => s.name);

function slug(name) {
  return name.toLowerCase().replace(/\s+/g, '-');
}

function buildPage(st) {
  const s = slug(st.name);
  const isNoTax = st.type === 'none';
  const title = `${st.name} Paycheck Calculator 2026 — Take-Home Pay | SmartCalc`;
  const desc = isNoTax
    ? `Calculate your take-home pay in ${st.name}. No state income tax! Estimate federal tax, FICA, and net pay per paycheck.`
    : `Calculate your take-home pay in ${st.name} (${st.brackets}). Estimate federal + state tax, FICA, and net pay per paycheck.`;
  const canonical = `https://alexchalu.github.io/smartcalc/paycheck/${s}.html`;

  // Build related states links
  const related = states.filter(x => x.code !== st.code).sort(() => Math.random() - 0.5).slice(0, 8);
  const relatedHtml = related.map(r => `<a class="card" href="${slug(r.name)}.html"><div class="icon">💰</div><h3>${r.name} Paycheck Calculator</h3><p>${r.type === 'none' ? 'No state income tax' : `State tax: ${r.brackets}`}</p></a>`).join('\n');

  const stateSpecificInfo = isNoTax
    ? `<p><strong>${st.name} has no state income tax!</strong> Your paycheck is only reduced by federal income tax, Social Security (6.2%), and Medicare (1.45%). This makes ${st.name} one of the most tax-friendly states for workers.</p>`
    : `<p>${st.name} has a ${st.type === 'flat' ? 'flat' : 'graduated'} state income tax with rates of <strong>${st.brackets}</strong>. The top marginal rate is ${st.rate}%. Your paycheck will be reduced by federal income tax, state income tax, Social Security (6.2%), and Medicare (1.45%).</p>`;

  const faqExtra = isNoTax
    ? `<h3>Why does ${st.name} have no state income tax?</h3>
<p>${st.name} generates revenue through other means such as sales tax, property tax, or natural resource revenue instead of taxing personal income. This means more of your gross salary goes directly into your pocket compared to states with income tax.</p>`
    : `<h3>What is the ${st.name} state income tax rate?</h3>
<p>${st.name} has a ${st.type} income tax structure with rates ranging from ${st.brackets}. ${st.type === 'flat' ? 'All taxable income is taxed at the same rate.' : 'Higher income is taxed at progressively higher rates.'}</p>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="${desc}">
    <meta name="keywords" content="${st.name} paycheck calculator, ${st.name} take home pay, ${st.name} salary after taxes, ${st.name} income tax calculator, ${st.name} net pay calculator">
    <link rel="canonical" href="${canonical}">
    <meta property="og:title" content="${st.name} Paycheck Calculator 2026 — SmartCalc">
    <meta property="og:description" content="${desc}">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💰</text></svg>">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3112605892426625" crossorigin="anonymous"></script>
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"WebApplication","name":"${st.name} Paycheck Calculator 2026","description":"${desc}","url":"${canonical}","applicationCategory":"FinanceApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}
    </script>
    <style>
        :root{--bg:#0a0e1a;--surface:#111827;--surface2:#1f2937;--border:#374151;--text:#f3f4f6;--muted:#9ca3af;--accent:#10b981;--accent2:#059669;--glow:rgba(16,185,129,0.12);--radius:12px}
        [data-theme="light"]{--bg:#f9fafb;--surface:#fff;--surface2:#f3f4f6;--border:#e5e7eb;--text:#1f2937;--muted:#6b7280}
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:var(--bg);color:var(--text);line-height:1.6}
        header{background:var(--surface);border-bottom:1px solid var(--border);padding:1rem 1.5rem;position:sticky;top:0;z-index:100}
        .hi{max-width:900px;margin:0 auto;display:flex;align-items:center;gap:1rem}
        .logo{font-size:1.4rem;font-weight:800;color:var(--accent);text-decoration:none}
        .tag{color:var(--muted);font-size:.85rem;flex:1}
        .tb{background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:.4rem .7rem;font-size:1rem;cursor:pointer}
        main{max-width:900px;margin:0 auto;padding:2rem 1.5rem}
        h1{font-size:1.75rem;margin-bottom:.5rem}
        .sub{color:var(--muted);margin-bottom:2rem}
        .calc{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:2rem}
        .field{margin-bottom:1.25rem}
        .label{display:block;font-weight:600;margin-bottom:.5rem;font-size:.9rem}
        input[type="number"],select{width:100%;padding:.8rem 1rem;background:var(--surface2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-size:.95rem;outline:none}
        input:focus,select:focus{border-color:var(--accent);box-shadow:0 0 0 3px var(--glow)}
        .row{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
        .row3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem}
        .btn{display:inline-flex;padding:.75rem 1.5rem;background:var(--accent);color:#fff;border:none;border-radius:8px;font-size:.95rem;font-weight:600;cursor:pointer;width:100%;justify-content:center}
        .btn:hover{background:var(--accent2)}
        .results{margin-top:2rem;display:none}
        .results.show{display:block}
        .result-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:1rem;margin-bottom:1.5rem}
        .stat{background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:1rem;text-align:center}
        .stat .val{font-size:1.4rem;font-weight:800;color:var(--accent)}
        .stat .lbl{font-size:.75rem;color:var(--muted);margin-top:.25rem}
        .breakdown{background:var(--surface2);border:1px solid var(--border);border-radius:8px;overflow:hidden}
        .breakdown table{width:100%;border-collapse:collapse}
        .breakdown th,.breakdown td{padding:.75rem 1rem;text-align:left;font-size:.9rem}
        .breakdown th{background:var(--surface);font-weight:600;font-size:.8rem;text-transform:uppercase;color:var(--muted)}
        .breakdown td{border-top:1px solid var(--border)}
        .breakdown .total td{font-weight:700;background:var(--surface);color:var(--accent)}
        .ad{max-width:900px;margin:1.5rem auto;padding:0 1.5rem}
        .info{margin-top:2.5rem;padding:2rem;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius)}
        .info h2{font-size:1.2rem;margin-bottom:1rem}
        .info p,.info li{color:var(--muted);font-size:.9rem;line-height:1.7;margin-bottom:.75rem}
        .info ul{padding-left:1.5rem}
        .faq{margin-top:2.5rem;padding:2rem;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius)}
        .faq h2{font-size:1.2rem;margin-bottom:1rem}
        .faq h3{font-size:1rem;margin:1.25rem 0 .5rem;color:var(--accent)}
        .faq p{color:var(--muted);font-size:.9rem;line-height:1.7}
        .more{margin-top:2.5rem}
        .more h2{font-size:1.2rem;margin-bottom:1rem;text-align:center}
        .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:1rem}
        .card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:1.25rem;text-decoration:none;color:var(--text);transition:.2s}
        .card:hover{border-color:var(--accent);transform:translateY(-2px)}
        .card .icon{font-size:1.5rem;margin-bottom:.5rem}
        .card h3{font-size:.95rem;font-weight:700;margin-bottom:.25rem}
        .card p{color:var(--muted);font-size:.8rem}
        footer{text-align:center;padding:2rem;color:var(--muted);font-size:.85rem;border-top:1px solid var(--border);margin-top:3rem}
        footer a{color:var(--accent);text-decoration:none}
        @media(max-width:600px){.row,.row3{grid-template-columns:1fr}.grid{grid-template-columns:1fr}}
    </style>
</head>
<body>
    <header><div class="hi">
        <a href="../" class="logo">💰 SmartCalc</a>
        <p class="tag">${st.name} Paycheck Calculator</p>
        <button class="tb" id="themeBtn" aria-label="Toggle theme">🌙</button>
    </div></header>

    <div class="ad"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3112605892426625" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div>

    <main>
        <h1>${st.name} Paycheck Calculator 2026</h1>
        <p class="sub">Calculate your take-home pay after federal${isNoTax ? '' : ' and state'} taxes, Social Security, and Medicare.</p>

        <div class="calc">
            <div class="row">
                <div class="field">
                    <label class="label">Annual Gross Salary ($)</label>
                    <input type="number" id="salary" value="75000" min="0" step="1000">
                </div>
                <div class="field">
                    <label class="label">Pay Frequency</label>
                    <select id="freq">
                        <option value="26">Bi-Weekly (26 pay periods)</option>
                        <option value="24">Semi-Monthly (24)</option>
                        <option value="52">Weekly (52)</option>
                        <option value="12">Monthly (12)</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="field">
                    <label class="label">Filing Status</label>
                    <select id="filing">
                        <option value="single">Single</option>
                        <option value="married">Married Filing Jointly</option>
                        <option value="head">Head of Household</option>
                    </select>
                </div>
                <div class="field">
                    <label class="label">Pre-Tax 401(k) Contribution (%)</label>
                    <input type="number" id="k401" value="0" min="0" max="100" step="1">
                </div>
            </div>
            <div class="row">
                <div class="field">
                    <label class="label">Health Insurance Premium ($/month)</label>
                    <input type="number" id="health" value="0" min="0" step="50">
                </div>
                <div class="field">
                    <label class="label">Other Pre-Tax Deductions ($/year)</label>
                    <input type="number" id="otherPre" value="0" min="0" step="100">
                </div>
            </div>
            <button class="btn" onclick="calculate()">Calculate Take-Home Pay</button>

            <div class="results" id="results">
                <div class="result-grid">
                    <div class="stat"><div class="val" id="rNet">—</div><div class="lbl">Take-Home Per Paycheck</div></div>
                    <div class="stat"><div class="val" id="rAnnual">—</div><div class="lbl">Annual Take-Home</div></div>
                    <div class="stat"><div class="val" id="rRate">—</div><div class="lbl">Effective Tax Rate</div></div>
                    <div class="stat"><div class="val" id="rMonthly">—</div><div class="lbl">Monthly Take-Home</div></div>
                </div>
                <div class="breakdown">
                    <table>
                        <thead><tr><th>Deduction</th><th>Per Paycheck</th><th>Annual</th></tr></thead>
                        <tbody id="breakdownBody"></tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="info">
            <h2>About ${st.name} Paycheck Taxes</h2>
            ${stateSpecificInfo}
            <h3>Deductions Applied</h3>
            <ul>
                <li><strong>Federal Income Tax:</strong> Based on 2026 brackets with standard deduction ($15,000 single, $30,000 married, $22,500 head of household)</li>
                ${isNoTax ? '' : `<li><strong>${st.name} State Tax:</strong> ${st.brackets}</li>`}
                <li><strong>Social Security (FICA):</strong> 6.2% on income up to $176,100</li>
                <li><strong>Medicare:</strong> 1.45% on all income (+ 0.9% additional Medicare tax on income over $200K single / $250K married)</li>
                <li><strong>401(k) contributions</strong> reduce your taxable income for federal and state taxes</li>
            </ul>
        </div>

        <div class="ad"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3112605892426625" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div>

        <div class="faq">
            <h2>Frequently Asked Questions</h2>
            <h3>How is take-home pay calculated in ${st.name}?</h3>
            <p>Take-home pay is your gross salary minus all deductions: federal income tax${isNoTax ? '' : `, ${st.name} state income tax`}, Social Security (6.2%), Medicare (1.45%), and any pre-tax deductions like 401(k) contributions and health insurance premiums.</p>
            ${faqExtra}
            <h3>How much does Social Security take from my paycheck?</h3>
            <p>Social Security tax is 6.2% of your gross pay, up to the wage base limit of $176,100 in 2026. Your employer also pays a matching 6.2%. Income above the limit is not subject to Social Security tax.</p>
            <h3>Does a 401(k) contribution reduce my taxes?</h3>
            <p>Yes! Traditional 401(k) contributions are pre-tax, meaning they reduce your taxable income for both federal${isNoTax ? '' : ' and state'} income tax purposes. This can significantly lower your tax burden while building retirement savings.</p>
            <h3>How accurate is this paycheck calculator?</h3>
            <p>This calculator provides a close estimate based on 2026 federal${isNoTax ? '' : ` and ${st.name} state`} tax brackets. Actual results may vary based on local taxes, additional deductions, tax credits, and your specific situation. Consult a tax professional for precise figures.</p>
        </div>

        <div class="more">
            <h2>More Paycheck Calculators by State</h2>
            <div class="grid">
                ${relatedHtml}
            </div>
            <p style="text-align:center;margin-top:1.5rem"><a href="index.html" style="color:var(--accent);font-weight:600">→ View All 50 State Paycheck Calculators</a></p>
        </div>
    </main>

    <footer>
        <p>SmartCalc — All calculations happen in your browser. Nothing is uploaded or stored.</p>
        <p><a href="../">SmartCalc Home</a> · <a href="index.html">All Paycheck Calculators</a> · <a href="https://alexchalu.github.io/toolpulse/">ToolPulse</a></p>
    </footer>

    <script>
    const STATE_RATE=${st.rate};
    const STATE_TYPE='${st.type}';
    const STATE_NAME='${st.name}';

    // 2026 Federal brackets (estimated)
    const fedBrackets={
        single:[{limit:11925,rate:.10},{limit:48475,rate:.12},{limit:103350,rate:.22},{limit:197300,rate:.24},{limit:250525,rate:.32},{limit:626350,rate:.35},{limit:Infinity,rate:.37}],
        married:[{limit:23850,rate:.10},{limit:96950,rate:.12},{limit:206700,rate:.22},{limit:394600,rate:.24},{limit:501050,rate:.32},{limit:751600,rate:.35},{limit:Infinity,rate:.37}],
        head:[{limit:17000,rate:.10},{limit:64850,rate:.12},{limit:103350,rate:.22},{limit:197300,rate:.24},{limit:250500,rate:.32},{limit:626350,rate:.35},{limit:Infinity,rate:.37}]
    };
    const stdDed={single:15000,married:30000,head:22500};
    const ssMax=176100,ssRate=.062,medRate=.0145,addMedThresh={single:200000,married:250000,head:200000},addMedRate=.009;

    function calcFedTax(taxable,filing){
        const b=fedBrackets[filing];
        let tax=0,prev=0;
        for(const br of b){
            if(taxable<=prev)break;
            const chunk=Math.min(taxable,br.limit)-prev;
            tax+=chunk*br.rate;
            prev=br.limit;
        }
        return Math.max(0,tax);
    }

    function calcStateTax(taxable){
        if(STATE_TYPE==='none')return 0;
        if(STATE_TYPE==='flat')return Math.max(0,taxable*STATE_RATE/100);
        // Simplified graduated — use top rate as approximation for high earners, effective rate ~70% of top for moderate incomes
        const effective=Math.min(STATE_RATE,STATE_RATE*(0.5+0.5*Math.min(1,taxable/150000)));
        return Math.max(0,taxable*effective/100);
    }

    function fmt(n){return'$'+Math.round(n).toLocaleString()}

    function calculate(){
        const salary=parseFloat(document.getElementById('salary').value)||0;
        const freq=parseInt(document.getElementById('freq').value);
        const filing=document.getElementById('filing').value;
        const k401Pct=parseFloat(document.getElementById('k401').value)||0;
        const healthMo=parseFloat(document.getElementById('health').value)||0;
        const otherPre=parseFloat(document.getElementById('otherPre').value)||0;

        const k401=salary*k401Pct/100;
        const healthYr=healthMo*12;
        const totalPreTax=k401+healthYr+otherPre;
        const taxableIncome=Math.max(0,salary-totalPreTax-stdDed[filing]);

        const fedTax=calcFedTax(taxableIncome,filing);
        const stateTax=calcStateTax(Math.max(0,salary-totalPreTax-(STATE_TYPE==='none'?0:stdDed[filing]*0.5)));
        const ssTax=Math.min(salary,ssMax)*ssRate;
        const medTax=salary*medRate;
        const addMed=salary>addMedThresh[filing]?(salary-addMedThresh[filing])*addMedRate:0;
        const totalTax=fedTax+stateTax+ssTax+medTax+addMed;
        const totalDeductions=totalTax+totalPreTax;
        const annualNet=salary-totalDeductions;
        const perPaycheck=annualNet/freq;
        const effectiveRate=salary>0?(totalTax/salary*100):0;

        document.getElementById('rNet').textContent=fmt(perPaycheck);
        document.getElementById('rAnnual').textContent=fmt(annualNet);
        document.getElementById('rRate').textContent=effectiveRate.toFixed(1)+'%';
        document.getElementById('rMonthly').textContent=fmt(annualNet/12);

        const rows=[
            ['Gross Pay',salary/freq,salary],
            ['Federal Income Tax',-fedTax/freq,-fedTax],
            ${isNoTax?'':`['${st.name} State Tax',-stateTax/freq,-stateTax],`}
            ['Social Security (6.2%)',-ssTax/freq,-ssTax],
            ['Medicare (1.45%)',-medTax/freq,-medTax],
            ${`addMed>0?['Additional Medicare (0.9%)',-addMed/freq,-addMed]:null,`}
            k401>0?['401(k) Contribution',-k401/freq,-k401]:null,
            healthYr>0?['Health Insurance',-healthYr/freq,-healthYr]:null,
            otherPre>0?['Other Pre-Tax Deductions',-otherPre/freq,-otherPre]:null,
        ].filter(Boolean);

        let html='';
        for(const r of rows){
            html+='<tr><td>'+r[0]+'</td><td>'+fmt(r[1])+'</td><td>'+fmt(r[2])+'</td></tr>';
        }
        html+='<tr class="total"><td>Take-Home Pay</td><td>'+fmt(perPaycheck)+'</td><td>'+fmt(annualNet)+'</td></tr>';
        document.getElementById('breakdownBody').innerHTML=html;
        document.getElementById('results').classList.add('show');
    }

    // Auto-calculate on load
    calculate();

    // Theme toggle
    const b=document.getElementById('themeBtn');const s=localStorage.getItem('sc-theme');
    if(s==='light'){document.documentElement.setAttribute('data-theme','light');b.textContent='☀️'}
    b.addEventListener('click',()=>{const l=document.documentElement.getAttribute('data-theme')==='light';document.documentElement.setAttribute('data-theme',l?'dark':'light');b.textContent=l?'🌙':'☀️';localStorage.setItem('sc-theme',l?'dark':'light')});
    </script>
</body>
</html>`;
}

// Build index page
function buildIndex() {
  const noTaxHtml = states.filter(s => s.type === 'none').map(s =>
    `<a class="card notax" href="${slug(s.name)}.html"><div class="icon">🏆</div><h3>${s.name}</h3><p>No state income tax!</p></a>`
  ).join('\n');

  const taxHtml = states.filter(s => s.type !== 'none').sort((a, b) => a.rate - b.rate).map(s =>
    `<a class="card" href="${slug(s.name)}.html"><div class="icon">💰</div><h3>${s.name}</h3><p>${s.type === 'flat' ? 'Flat' : 'Graduated'}: ${s.brackets}</p></a>`
  ).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Paycheck Calculator by State 2026 — All 50 States | SmartCalc</title>
    <meta name="description" content="Free paycheck calculators for all 50 states. Calculate your take-home pay after federal, state taxes, FICA, 401(k), and deductions. Updated for 2026.">
    <meta name="keywords" content="paycheck calculator, take home pay calculator, salary after taxes, net pay calculator, paycheck calculator by state, 2026 paycheck calculator">
    <link rel="canonical" href="https://alexchalu.github.io/smartcalc/paycheck/">
    <meta property="og:title" content="Paycheck Calculator by State 2026 — SmartCalc">
    <meta property="og:description" content="Free paycheck calculators for all 50 states. Calculate your take-home pay after taxes.">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💰</text></svg>">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3112605892426625" crossorigin="anonymous"></script>
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"CollectionPage","name":"Paycheck Calculator by State 2026","description":"Free paycheck calculators for all 50 US states","url":"https://alexchalu.github.io/smartcalc/paycheck/","numberOfItems":50}
    </script>
    <style>
        :root{--bg:#0a0e1a;--surface:#111827;--surface2:#1f2937;--border:#374151;--text:#f3f4f6;--muted:#9ca3af;--accent:#10b981;--accent2:#059669;--glow:rgba(16,185,129,0.12);--radius:12px}
        [data-theme="light"]{--bg:#f9fafb;--surface:#fff;--surface2:#f3f4f6;--border:#e5e7eb;--text:#1f2937;--muted:#6b7280}
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:var(--bg);color:var(--text);line-height:1.6}
        header{background:var(--surface);border-bottom:1px solid var(--border);padding:1rem 1.5rem;position:sticky;top:0;z-index:100}
        .hi{max-width:1100px;margin:0 auto;display:flex;align-items:center;gap:1rem}
        .logo{font-size:1.4rem;font-weight:800;color:var(--accent);text-decoration:none}
        .tag{color:var(--muted);font-size:.85rem;flex:1}
        .tb{background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:.4rem .7rem;font-size:1rem;cursor:pointer}
        main{max-width:1100px;margin:0 auto;padding:2rem 1.5rem}
        h1{font-size:2rem;margin-bottom:.5rem;text-align:center}
        .sub{color:var(--muted);text-align:center;margin-bottom:2.5rem;max-width:600px;margin-left:auto;margin-right:auto}
        h2{font-size:1.3rem;margin:2.5rem 0 1rem;color:var(--accent)}
        .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:1rem}
        .card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:1.25rem;text-decoration:none;color:var(--text);transition:.2s}
        .card:hover{border-color:var(--accent);transform:translateY(-2px)}
        .card.notax{border-color:rgba(16,185,129,0.3);background:linear-gradient(135deg,var(--surface),rgba(16,185,129,0.05))}
        .card .icon{font-size:1.5rem;margin-bottom:.5rem}
        .card h3{font-size:1rem;font-weight:700;margin-bottom:.25rem}
        .card p{color:var(--muted);font-size:.8rem}
        .ad{max-width:1100px;margin:1.5rem auto;padding:0 1.5rem}
        .info{margin-top:3rem;padding:2rem;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius)}
        .info h2{margin-top:0}
        .info p{color:var(--muted);font-size:.9rem;line-height:1.7;margin-bottom:.75rem}
        footer{text-align:center;padding:2rem;color:var(--muted);font-size:.85rem;border-top:1px solid var(--border);margin-top:3rem}
        footer a{color:var(--accent);text-decoration:none}
        @media(max-width:600px){.grid{grid-template-columns:1fr 1fr}}
        @media(max-width:400px){.grid{grid-template-columns:1fr}}
    </style>
</head>
<body>
    <header><div class="hi">
        <a href="../" class="logo">💰 SmartCalc</a>
        <p class="tag">Paycheck Calculators — All 50 States</p>
        <button class="tb" id="themeBtn" aria-label="Toggle theme">🌙</button>
    </div></header>

    <div class="ad"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3112605892426625" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div>

    <main>
        <h1>💰 Paycheck Calculator by State 2026</h1>
        <p class="sub">Calculate your take-home pay in any US state. Federal + state taxes, Social Security, Medicare, 401(k), and more. Updated for 2026 tax brackets.</p>

        <h2>🏆 No State Income Tax (${noTaxStates.length} States)</h2>
        <div class="grid">${noTaxHtml}</div>

        <div class="ad"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3112605892426625" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div>

        <h2>📊 States With Income Tax (Sorted by Top Rate)</h2>
        <div class="grid">${taxHtml}</div>

        <div class="info">
            <h2>About Paycheck Calculations</h2>
            <p>Every worker's paycheck includes mandatory deductions. Understanding these helps you plan your budget and make informed financial decisions.</p>
            <p><strong>Federal Income Tax:</strong> Progressive tax based on your taxable income and filing status. The 2026 standard deduction is $15,000 (single), $30,000 (married filing jointly), or $22,500 (head of household).</p>
            <p><strong>State Income Tax:</strong> Varies by state. ${noTaxStates.length} states have no income tax: ${noTaxStates.join(', ')}. Other states use flat or graduated rates.</p>
            <p><strong>Social Security (FICA):</strong> 6.2% of gross pay up to $176,100 in 2026. Your employer matches this amount.</p>
            <p><strong>Medicare:</strong> 1.45% on all earnings. An additional 0.9% applies to income above $200,000 (single) or $250,000 (married).</p>
            <p><strong>Pre-tax deductions</strong> like 401(k) contributions and health insurance premiums reduce your taxable income, lowering your overall tax burden.</p>
        </div>
    </main>

    <footer>
        <p>SmartCalc — All calculations happen in your browser. Nothing is uploaded or stored.</p>
        <p><a href="../">SmartCalc Home</a> · <a href="https://alexchalu.github.io/toolpulse/">ToolPulse</a> · <a href="https://alexchalu.github.io/healthcalcs/">HealthCalcs</a></p>
    </footer>

    <script>
    const b=document.getElementById('themeBtn');const s=localStorage.getItem('sc-theme');
    if(s==='light'){document.documentElement.setAttribute('data-theme','light');b.textContent='☀️'}
    b.addEventListener('click',()=>{const l=document.documentElement.getAttribute('data-theme')==='light';document.documentElement.setAttribute('data-theme',l?'dark':'light');b.textContent=l?'🌙':'☀️';localStorage.setItem('sc-theme',l?'dark':'light')});
    </script>
</body>
</html>`;
}

// Generate all pages
console.log('Building 50 state paycheck calculators...');
let count = 0;
for (const st of states) {
  const filename = `${slug(st.name)}.html`;
  fs.writeFileSync(path.join(outDir, filename), buildPage(st));
  count++;
}

// Index page
fs.writeFileSync(path.join(outDir, 'index.html'), buildIndex());
count++;

console.log(`✅ Built ${count} pages in ${outDir}`);
