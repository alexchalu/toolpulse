#!/usr/bin/env node
// Build mortgage-related calculators for SmartCalc
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, 'smartcalc');

const head = (title, desc, keywords, canonical) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} — Free Online | SmartCalc</title>
    <meta name="description" content="${desc}">
    <meta name="keywords" content="${keywords}">
    <link rel="canonical" href="https://alexchalu.github.io/smartcalc/${canonical}">
    <meta property="og:title" content="${title} — SmartCalc">
    <meta property="og:description" content="${desc}">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💰</text></svg>">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3112605892426625" crossorigin="anonymous"></script>
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"WebApplication","name":"${title}","description":"${desc}","url":"https://alexchalu.github.io/smartcalc/${canonical}","applicationCategory":"FinanceApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}
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
        input[type="number"],select,input[type="text"]{width:100%;padding:.8rem 1rem;background:var(--surface2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-size:.95rem;outline:none}
        input:focus,select:focus{border-color:var(--accent);box-shadow:0 0 0 3px var(--glow)}
        .row{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
        .row3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem}
        .btn{display:inline-flex;padding:.75rem 1.5rem;background:var(--accent);color:#fff;border:none;border-radius:8px;font-size:.95rem;font-weight:600;cursor:pointer}
        .btn:hover{background:var(--accent2)}
        .results{margin-top:2rem;display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:1rem}
        .stat{background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:1rem;text-align:center}
        .stat .val{font-size:1.5rem;font-weight:800;color:var(--accent)}
        .stat .lbl{font-size:.8rem;color:var(--muted)}
        .ad{max-width:900px;margin:1.5rem auto;padding:0 1.5rem}
        .faq{margin-top:3rem;padding:2rem;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius)}
        .faq h2{font-size:1.2rem;margin-bottom:1rem}
        .faq h3{font-size:1rem;margin:1rem 0 .5rem;color:var(--accent)}
        .faq p{color:var(--muted);font-size:.9rem;line-height:1.7}
        .compare{margin-top:2rem;overflow-x:auto}
        .compare table{width:100%;border-collapse:collapse}
        .compare th,.compare td{padding:.75rem 1rem;text-align:left;border-bottom:1px solid var(--border);font-size:.9rem}
        .compare th{background:var(--surface2);font-weight:600;color:var(--accent)}
        .compare tr:hover{background:var(--surface2)}
        .more{margin-top:3rem}
        .more h2{font-size:1.2rem;margin-bottom:1rem}
        .mgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:.75rem}
        .mcard{background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:1rem;text-decoration:none;color:var(--text);transition:.2s}
        .mcard:hover{border-color:var(--accent)}
        .mcard h4{font-size:.9rem}
        .mcard p{font-size:.75rem;color:var(--muted)}
        footer{text-align:center;padding:2rem;color:var(--muted);font-size:.85rem;border-top:1px solid var(--border);margin-top:3rem}
        footer a{color:var(--accent);text-decoration:none}
        @media(max-width:600px){.row,.row3{grid-template-columns:1fr}.tag{display:none}.results{grid-template-columns:1fr 1fr}}
    </style>
</head>`;

const header = `<body>
    <header><div class="hi"><a href="index.html" class="logo">💰 SmartCalc</a><p class="tag">Free financial calculators</p><button class="tb" id="tb">🌙</button></div></header>
    <div class="ad"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3112605892426625" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div>`;

const footer = (relatedLinks) => `
    <div class="ad"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3112605892426625" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div>
    <div class="more" style="max-width:900px;margin:2rem auto;padding:0 1.5rem">
        <h2>Related Calculators</h2>
        <div class="mgrid">
            ${relatedLinks}
        </div>
    </div>
    <footer>
        <p>© 2026 <a href="index.html">SmartCalc</a> — Free Financial Calculators</p>
        <p style="margin-top:.5rem">
            <a href="mortgage-calculator.html">Mortgage</a> · <a href="loan-calculator.html">Loan</a> · <a href="investment-calculator.html">Investment</a> · <a href="retirement-calculator.html">Retirement</a> · <a href="tax-calculator.html">Tax</a>
        </p>
    </footer>
    <script>
    const tb=document.getElementById('tb');
    tb?.addEventListener('click',()=>{const t=document.documentElement.getAttribute('data-theme')==='light'?'':'light';document.documentElement.setAttribute('data-theme',t);tb.textContent=t==='light'?'🌙':'☀️';localStorage.setItem('theme',t)});
    if(localStorage.getItem('theme')==='light'){document.documentElement.setAttribute('data-theme','light');if(tb)tb.textContent='🌙';}
    </script>
</body></html>`;

const fmt = `function fmt(n){return n>=1e6?'$'+(n/1e6).toFixed(2)+'M':n>=1e3?'$'+n.toLocaleString('en-US',{maximumFractionDigits:0}):'$'+n.toFixed(2)}`;

const mortgageLinks = `
<a class="mcard" href="mortgage-calculator.html"><h4>🏠 Mortgage Calculator</h4><p>Monthly payment & amortization</p></a>
<a class="mcard" href="fha-loan-calculator.html"><h4>🏘️ FHA Loan Calculator</h4><p>Low down payment FHA loans</p></a>
<a class="mcard" href="va-loan-calculator.html"><h4>🎖️ VA Loan Calculator</h4><p>Zero down VA home loans</p></a>
<a class="mcard" href="mortgage-refinance-calculator.html"><h4>🔄 Refinance Calculator</h4><p>Should you refinance?</p></a>
<a class="mcard" href="arm-vs-fixed-calculator.html"><h4>📊 ARM vs Fixed</h4><p>Compare loan types</p></a>
<a class="mcard" href="pmi-calculator.html"><h4>🛡️ PMI Calculator</h4><p>Private mortgage insurance costs</p></a>
<a class="mcard" href="closing-costs-calculator.html"><h4>📋 Closing Costs</h4><p>Estimate total closing costs</p></a>
<a class="mcard" href="down-payment-calculator.html"><h4>💵 Down Payment</h4><p>How much to put down</p></a>
<a class="mcard" href="home-affordability-calculator.html"><h4>🏡 Affordability</h4><p>How much home can you afford</p></a>
<a class="mcard" href="rent-vs-buy-calculator.html"><h4>🔑 Rent vs Buy</h4><p>Compare renting to buying</p></a>`;

// 1. FHA Loan Calculator
function buildFHA() {
    const html = `${head('FHA Loan Calculator', 'Calculate your FHA loan payment with low down payment options. See MIP costs, compare FHA vs conventional loans, and determine FHA loan eligibility.', 'FHA loan calculator, FHA mortgage calculator, FHA loan payment, FHA down payment, FHA MIP calculator, FHA loan limits', 'fha-loan-calculator.html')}
${header}
    <main>
        <nav style="margin-bottom:1rem"><a href="index.html" style="color:var(--accent);font-weight:600;text-decoration:none">← All Calculators</a></nav>
        <h1>FHA Loan Calculator</h1>
        <p class="sub">Calculate your FHA loan payment with as little as 3.5% down. See upfront and annual MIP costs, and compare to conventional loans.</p>
        <div class="calc">
            <div class="row">
                <div class="field"><label class="label">Home Price</label><input type="number" id="price" value="350000"></div>
                <div class="field"><label class="label">Down Payment (%)</label><input type="number" id="downPct" value="3.5" step="0.5" min="3.5"></div>
            </div>
            <div class="row">
                <div class="field"><label class="label">Interest Rate (%)</label><input type="number" id="rate" value="6.25" step="0.125"></div>
                <div class="field"><label class="label">Loan Term</label><select id="term"><option value="30">30 years</option><option value="15">15 years</option></select></div>
            </div>
            <div class="row">
                <div class="field"><label class="label">Property Tax ($/year)</label><input type="number" id="tax" value="4200"></div>
                <div class="field"><label class="label">Home Insurance ($/year)</label><input type="number" id="ins" value="1800"></div>
            </div>
            <button class="btn" onclick="calc()">Calculate FHA Payment</button>
            <div class="results" id="out">
                <div class="stat"><div class="val" id="monthly">—</div><div class="lbl">Monthly Payment</div></div>
                <div class="stat"><div class="val" id="mip">—</div><div class="lbl">Monthly MIP</div></div>
                <div class="stat"><div class="val" id="upfront">—</div><div class="lbl">Upfront MIP</div></div>
                <div class="stat"><div class="val" id="total">—</div><div class="lbl">Total Cost (30yr)</div></div>
                <div class="stat"><div class="val" id="loan">—</div><div class="lbl">Loan Amount</div></div>
                <div class="stat"><div class="val" id="downAmt">—</div><div class="lbl">Down Payment</div></div>
            </div>
        </div>
        <div class="faq">
            <h2>Understanding FHA Loans</h2>
            <h3>What is an FHA Loan?</h3>
            <p>An FHA loan is a mortgage insured by the Federal Housing Administration. It's designed for borrowers who may not qualify for conventional loans, offering lower down payment requirements (as low as 3.5%) and more lenient credit score requirements.</p>
            <h3>What is MIP (Mortgage Insurance Premium)?</h3>
            <p>FHA loans require two types of mortgage insurance: an upfront MIP of 1.75% of the loan amount (which can be rolled into the loan), and an annual MIP of 0.55% for most borrowers with 30-year terms and less than 10% down payment. This annual MIP is paid monthly for the life of the loan.</p>
            <h3>FHA vs Conventional Loans</h3>
            <p>FHA loans offer lower down payments (3.5% vs 5-20%) and accept lower credit scores (580+ vs 620+). However, FHA requires mortgage insurance for the life of the loan, while conventional PMI can be removed at 80% LTV. For borrowers with strong credit and 20%+ down, conventional is usually cheaper.</p>
            <h3>2026 FHA Loan Limits</h3>
            <p>FHA loan limits vary by county. The standard floor is $498,257 for single-family homes, while high-cost areas can go up to $1,149,825. Check your county's specific limit on the HUD website.</p>
        </div>
    </main>
${footer(mortgageLinks)}
<script>
${fmt}
function calc(){
    const price=+document.getElementById('price').value;
    const downPct=+document.getElementById('downPct').value/100;
    const down=price*downPct;
    const base=price-down;
    const upfrontMIP=base*0.0175;
    const loanAmt=base+upfrontMIP;
    const r=(+document.getElementById('rate').value/100)/12;
    const n=+document.getElementById('term').value*12;
    const pmt=loanAmt*(r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
    const annualMIP=base*0.0055;
    const monthlyMIP=annualMIP/12;
    const tax=+document.getElementById('tax').value/12;
    const ins=+document.getElementById('ins').value/12;
    const total=pmt+monthlyMIP+tax+ins;
    document.getElementById('monthly').textContent=fmt(total);
    document.getElementById('mip').textContent=fmt(monthlyMIP);
    document.getElementById('upfront').textContent=fmt(upfrontMIP);
    document.getElementById('total').textContent=fmt(total*n);
    document.getElementById('loan').textContent=fmt(loanAmt);
    document.getElementById('downAmt').textContent=fmt(down);
}
calc();
</script>`;
    fs.writeFileSync(path.join(OUT, 'fha-loan-calculator.html'), html);
    console.log('✅ fha-loan-calculator.html');
}

// 2. VA Loan Calculator
function buildVA() {
    const html = `${head('VA Loan Calculator', 'Calculate your VA loan payment with zero down payment. See VA funding fee, compare VA vs conventional loans for veterans and active military.', 'VA loan calculator, VA mortgage calculator, VA loan payment, VA home loan, VA funding fee calculator, veteran home loan', 'va-loan-calculator.html')}
${header}
    <main>
        <nav style="margin-bottom:1rem"><a href="index.html" style="color:var(--accent);font-weight:600;text-decoration:none">← All Calculators</a></nav>
        <h1>VA Loan Calculator</h1>
        <p class="sub">Calculate your VA loan payment with $0 down. No PMI required. Estimate your VA funding fee and monthly payments for veteran home loans.</p>
        <div class="calc">
            <div class="row">
                <div class="field"><label class="label">Home Price</label><input type="number" id="price" value="400000"></div>
                <div class="field"><label class="label">Down Payment ($)</label><input type="number" id="down" value="0"></div>
            </div>
            <div class="row">
                <div class="field"><label class="label">Interest Rate (%)</label><input type="number" id="rate" value="5.75" step="0.125"></div>
                <div class="field"><label class="label">Loan Term</label><select id="term"><option value="30">30 years</option><option value="15">15 years</option></select></div>
            </div>
            <div class="row">
                <div class="field"><label class="label">First-time VA Loan?</label><select id="first"><option value="yes">Yes — First Use</option><option value="no">No — Subsequent Use</option></select></div>
                <div class="field"><label class="label">Service Type</label><select id="service"><option value="regular">Regular Military</option><option value="reserves">Reserves/Guard</option><option value="disabled">VA Disability Exempt</option></select></div>
            </div>
            <div class="row">
                <div class="field"><label class="label">Property Tax ($/year)</label><input type="number" id="tax" value="4800"></div>
                <div class="field"><label class="label">Home Insurance ($/year)</label><input type="number" id="ins" value="1800"></div>
            </div>
            <button class="btn" onclick="calc()">Calculate VA Payment</button>
            <div class="results" id="out">
                <div class="stat"><div class="val" id="monthly">—</div><div class="lbl">Monthly Payment</div></div>
                <div class="stat"><div class="val" id="funding">—</div><div class="lbl">VA Funding Fee</div></div>
                <div class="stat"><div class="val" id="total">—</div><div class="lbl">Total Cost</div></div>
                <div class="stat"><div class="val" id="savings">—</div><div class="lbl">PMI Savings</div></div>
                <div class="stat"><div class="val" id="loan">—</div><div class="lbl">Loan Amount</div></div>
                <div class="stat"><div class="val" id="downPct">—</div><div class="lbl">Down Payment %</div></div>
            </div>
        </div>
        <div class="faq">
            <h2>Understanding VA Loans</h2>
            <h3>What is a VA Loan?</h3>
            <p>A VA loan is a mortgage backed by the U.S. Department of Veterans Affairs, available to veterans, active-duty service members, and eligible surviving spouses. Key benefits include zero down payment, no PMI, competitive interest rates, and limited closing costs.</p>
            <h3>VA Funding Fee</h3>
            <p>Most VA loans require a one-time funding fee (which can be rolled into the loan). For first-time use with no down payment, the fee is 2.15% for regular military and 2.4% for reserves. Veterans with service-connected disabilities are exempt from the funding fee.</p>
            <h3>VA vs Conventional Loans</h3>
            <p>VA loans offer zero down payment and no monthly PMI, potentially saving thousands per year. VA rates are typically 0.25-0.5% lower than conventional rates. The main cost is the one-time funding fee, which is still usually cheaper than years of PMI payments.</p>
        </div>
    </main>
${footer(mortgageLinks)}
<script>
${fmt}
function calc(){
    const price=+document.getElementById('price').value;
    const down=+document.getElementById('down').value;
    const base=price-down;
    const first=document.getElementById('first').value==='yes';
    const service=document.getElementById('service').value;
    const downPct=down/price;
    let feeRate=0;
    if(service!=='disabled'){
        if(downPct<0.05) feeRate=first?0.0215:0.033;
        else if(downPct<0.10) feeRate=first?0.015:0.015;
        else feeRate=first?0.0125:0.0125;
        if(service==='reserves') feeRate+=0.0025;
    }
    const fundingFee=base*feeRate;
    const loanAmt=base+fundingFee;
    const r=(+document.getElementById('rate').value/100)/12;
    const n=+document.getElementById('term').value*12;
    const pmt=loanAmt*(r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
    const tax=+document.getElementById('tax').value/12;
    const ins=+document.getElementById('ins').value/12;
    const total=pmt+tax+ins;
    const pmiSavings=base*0.007/12*n; // estimated PMI savings vs conventional
    document.getElementById('monthly').textContent=fmt(total);
    document.getElementById('funding').textContent=fmt(fundingFee);
    document.getElementById('total').textContent=fmt(total*n);
    document.getElementById('savings').textContent=fmt(pmiSavings);
    document.getElementById('loan').textContent=fmt(loanAmt);
    document.getElementById('downPct').textContent=(downPct*100).toFixed(1)+'%';
}
calc();
</script>`;
    fs.writeFileSync(path.join(OUT, 'va-loan-calculator.html'), html);
    console.log('✅ va-loan-calculator.html');
}

// 3. Mortgage Refinance Calculator
function buildRefinance() {
    const html = `${head('Mortgage Refinance Calculator', 'Calculate if refinancing your mortgage saves money. Compare your current loan vs new loan terms, see break-even point and total savings.', 'mortgage refinance calculator, refinance calculator, should I refinance, refinance break even, mortgage refinance savings', 'mortgage-refinance-calculator.html')}
${header}
    <main>
        <nav style="margin-bottom:1rem"><a href="index.html" style="color:var(--accent);font-weight:600;text-decoration:none">← All Calculators</a></nav>
        <h1>Mortgage Refinance Calculator</h1>
        <p class="sub">Should you refinance? Compare your current mortgage to a new loan and see how much you could save. Find your break-even point.</p>
        <div class="calc">
            <h3 style="margin-bottom:1rem;color:var(--accent)">Current Mortgage</h3>
            <div class="row">
                <div class="field"><label class="label">Remaining Balance</label><input type="number" id="balance" value="320000"></div>
                <div class="field"><label class="label">Current Rate (%)</label><input type="number" id="oldRate" value="7.0" step="0.125"></div>
            </div>
            <div class="row">
                <div class="field"><label class="label">Remaining Years</label><input type="number" id="oldYears" value="27"></div>
                <div class="field"><label class="label">Current Payment (P&I)</label><input type="number" id="oldPmt" value="2200" disabled style="opacity:0.7"></div>
            </div>
            <h3 style="margin:1.5rem 0 1rem;color:var(--accent)">New Loan</h3>
            <div class="row">
                <div class="field"><label class="label">New Rate (%)</label><input type="number" id="newRate" value="5.75" step="0.125"></div>
                <div class="field"><label class="label">New Term</label><select id="newTerm"><option value="30">30 years</option><option value="20">20 years</option><option value="15">15 years</option></select></div>
            </div>
            <div class="field"><label class="label">Closing Costs ($)</label><input type="number" id="costs" value="6000"></div>
            <button class="btn" onclick="calc()">Compare Loans</button>
            <div class="results" id="out">
                <div class="stat"><div class="val" id="newPmt">—</div><div class="lbl">New Payment</div></div>
                <div class="stat"><div class="val" id="savings">—</div><div class="lbl">Monthly Savings</div></div>
                <div class="stat"><div class="val" id="breakeven">—</div><div class="lbl">Break-even</div></div>
                <div class="stat"><div class="val" id="totalSave">—</div><div class="lbl">Lifetime Savings</div></div>
                <div class="stat"><div class="val" id="oldTotal">—</div><div class="lbl">Current Total Remaining</div></div>
                <div class="stat"><div class="val" id="newTotal">—</div><div class="lbl">New Total Cost</div></div>
            </div>
        </div>
        <div class="faq">
            <h2>Mortgage Refinance Guide</h2>
            <h3>When Should You Refinance?</h3>
            <p>Generally, refinancing makes sense when you can lower your rate by at least 0.5-1%, plan to stay in the home past the break-even point, and the closing costs are reasonable (typically 2-5% of the loan). Also consider refinancing to switch from ARM to fixed, remove PMI, or shorten your loan term.</p>
            <h3>What is the Break-Even Point?</h3>
            <p>The break-even point is how many months it takes for your monthly savings to cover the closing costs. If you plan to stay in the home longer than the break-even period, refinancing usually makes financial sense.</p>
            <h3>Cash-Out Refinance</h3>
            <p>A cash-out refinance lets you borrow more than your remaining balance and pocket the difference. This can be useful for home improvements, debt consolidation, or major expenses, but it increases your loan balance and potentially your rate.</p>
        </div>
    </main>
${footer(mortgageLinks)}
<script>
${fmt}
function calc(){
    const bal=+document.getElementById('balance').value;
    const oldR=(+document.getElementById('oldRate').value/100)/12;
    const oldN=+document.getElementById('oldYears').value*12;
    const oldPmt=bal*(oldR*Math.pow(1+oldR,oldN))/(Math.pow(1+oldR,oldN)-1);
    document.getElementById('oldPmt').value=Math.round(oldPmt);
    const newR=(+document.getElementById('newRate').value/100)/12;
    const newN=+document.getElementById('newTerm').value*12;
    const costs=+document.getElementById('costs').value;
    const newPmt=bal*(newR*Math.pow(1+newR,newN))/(Math.pow(1+newR,newN)-1);
    const monthlySave=oldPmt-newPmt;
    const breakeven=monthlySave>0?Math.ceil(costs/monthlySave):Infinity;
    const oldTotal=oldPmt*oldN;
    const newTotal=newPmt*newN+costs;
    const totalSave=oldTotal-newTotal;
    document.getElementById('newPmt').textContent=fmt(newPmt);
    document.getElementById('savings').textContent=monthlySave>0?fmt(monthlySave):'-'+fmt(-monthlySave);
    document.getElementById('breakeven').textContent=breakeven<999?breakeven+' months':'N/A';
    document.getElementById('totalSave').textContent=totalSave>0?fmt(totalSave):'-'+fmt(-totalSave);
    document.getElementById('oldTotal').textContent=fmt(oldTotal);
    document.getElementById('newTotal').textContent=fmt(newTotal);
}
calc();
</script>`;
    fs.writeFileSync(path.join(OUT, 'mortgage-refinance-calculator.html'), html);
    console.log('✅ mortgage-refinance-calculator.html');
}

// 4. ARM vs Fixed Rate Calculator
function buildARM() {
    const html = `${head('ARM vs Fixed Rate Mortgage Calculator', 'Compare adjustable-rate (ARM) vs fixed-rate mortgages. See payment projections, worst-case scenarios, and find which loan type saves you more.', 'ARM vs fixed rate calculator, adjustable rate mortgage, ARM mortgage calculator, 5/1 ARM, 7/1 ARM, fixed vs variable rate mortgage', 'arm-vs-fixed-calculator.html')}
${header}
    <main>
        <nav style="margin-bottom:1rem"><a href="index.html" style="color:var(--accent);font-weight:600;text-decoration:none">← All Calculators</a></nav>
        <h1>ARM vs Fixed Rate Calculator</h1>
        <p class="sub">Compare adjustable-rate mortgages to fixed-rate loans. See payment projections over time and find which option is better for your situation.</p>
        <div class="calc">
            <div class="row">
                <div class="field"><label class="label">Loan Amount</label><input type="number" id="loan" value="350000"></div>
                <div class="field"><label class="label">Loan Term</label><select id="term"><option value="30">30 years</option><option value="15">15 years</option></select></div>
            </div>
            <h3 style="margin:1rem 0 .75rem;color:var(--accent)">Fixed Rate Loan</h3>
            <div class="field"><label class="label">Fixed Rate (%)</label><input type="number" id="fixedRate" value="6.5" step="0.125"></div>
            <h3 style="margin:1rem 0 .75rem;color:var(--accent)">Adjustable Rate Loan (ARM)</h3>
            <div class="row">
                <div class="field"><label class="label">ARM Type</label><select id="armType"><option value="5">5/1 ARM</option><option value="7">7/1 ARM</option><option value="10">10/1 ARM</option></select></div>
                <div class="field"><label class="label">Initial ARM Rate (%)</label><input type="number" id="armRate" value="5.5" step="0.125"></div>
            </div>
            <div class="row">
                <div class="field"><label class="label">Expected Rate After Adjustment (%)</label><input type="number" id="adjRate" value="7.5" step="0.125"></div>
                <div class="field"><label class="label">Rate Cap (%)</label><input type="number" id="cap" value="11.5" step="0.5"></div>
            </div>
            <button class="btn" onclick="calc()">Compare Loans</button>
            <div class="results" id="out">
                <div class="stat"><div class="val" id="fixPmt">—</div><div class="lbl">Fixed Monthly</div></div>
                <div class="stat"><div class="val" id="armPmt">—</div><div class="lbl">ARM Initial Monthly</div></div>
                <div class="stat"><div class="val" id="armAdj">—</div><div class="lbl">ARM After Adjustment</div></div>
                <div class="stat"><div class="val" id="fixTotal">—</div><div class="lbl">Fixed Total Cost</div></div>
                <div class="stat"><div class="val" id="armTotal">—</div><div class="lbl">ARM Total Cost</div></div>
                <div class="stat"><div class="val" id="winner">—</div><div class="lbl">Better Option</div></div>
            </div>
        </div>
        <div class="faq">
            <h2>ARM vs Fixed Rate Guide</h2>
            <h3>What is an ARM?</h3>
            <p>An adjustable-rate mortgage (ARM) has a fixed initial rate period (e.g., 5 years for a 5/1 ARM), after which the rate adjusts annually based on a market index. ARMs typically start 0.5-1.5% lower than fixed rates but carry the risk of rate increases.</p>
            <h3>When Does an ARM Make Sense?</h3>
            <p>ARMs work best when: you plan to sell or refinance before the adjustment period, rates are expected to drop, or the initial savings are significant. If you plan to stay 10+ years and rates are reasonable, fixed is usually safer.</p>
            <h3>ARM Rate Caps</h3>
            <p>Most ARMs have three caps: initial adjustment cap (how much the rate can change at first adjustment), periodic cap (max change per year after), and lifetime cap (maximum rate ever). A typical structure is 2/2/5, meaning 2% initial, 2% periodic, 5% lifetime cap above the initial rate.</p>
        </div>
    </main>
${footer(mortgageLinks)}
<script>
${fmt}
function calc(){
    const loan=+document.getElementById('loan').value;
    const n=+document.getElementById('term').value*12;
    const fixR=(+document.getElementById('fixedRate').value/100)/12;
    const fixPmt=loan*(fixR*Math.pow(1+fixR,n))/(Math.pow(1+fixR,n)-1);
    const armYears=+document.getElementById('armType').value;
    const armR=(+document.getElementById('armRate').value/100)/12;
    const adjR=(+document.getElementById('adjRate').value/100)/12;
    const armPmt=loan*(armR*Math.pow(1+armR,n))/(Math.pow(1+armR,n)-1);
    // Calculate ARM: initial period then adjusted
    const initMonths=armYears*12;
    let bal=loan;
    let armTotalCost=0;
    for(let i=0;i<initMonths&&i<n;i++){
        const int=bal*armR;
        const princ=armPmt-int;
        bal-=princ;
        armTotalCost+=armPmt;
    }
    const remMonths=n-initMonths;
    if(remMonths>0&&bal>0){
        const adjPmt=bal*(adjR*Math.pow(1+adjR,remMonths))/(Math.pow(1+adjR,remMonths)-1);
        armTotalCost+=adjPmt*remMonths;
        document.getElementById('armAdj').textContent=fmt(adjPmt);
    }else{
        document.getElementById('armAdj').textContent='N/A';
    }
    const fixTotal=fixPmt*n;
    document.getElementById('fixPmt').textContent=fmt(fixPmt);
    document.getElementById('armPmt').textContent=fmt(armPmt);
    document.getElementById('fixTotal').textContent=fmt(fixTotal);
    document.getElementById('armTotal').textContent=fmt(armTotalCost);
    document.getElementById('winner').textContent=fixTotal<armTotalCost?'Fixed Rate':'ARM';
    document.getElementById('winner').style.color=fixTotal<armTotalCost?'var(--accent)':'#f59e0b';
}
calc();
</script>`;
    fs.writeFileSync(path.join(OUT, 'arm-vs-fixed-calculator.html'), html);
    console.log('✅ arm-vs-fixed-calculator.html');
}

// 5. PMI Calculator
function buildPMI() {
    const html = `${head('PMI Calculator', 'Calculate your private mortgage insurance (PMI) costs. See how PMI affects your monthly payment and when you can remove it.', 'PMI calculator, private mortgage insurance calculator, PMI removal, PMI cost, mortgage insurance calculator, how to remove PMI', 'pmi-calculator.html')}
${header}
    <main>
        <nav style="margin-bottom:1rem"><a href="index.html" style="color:var(--accent);font-weight:600;text-decoration:none">← All Calculators</a></nav>
        <h1>PMI Calculator</h1>
        <p class="sub">Estimate your private mortgage insurance costs and see when you can get rid of PMI. Calculate the true cost of putting less than 20% down.</p>
        <div class="calc">
            <div class="row">
                <div class="field"><label class="label">Home Price</label><input type="number" id="price" value="400000"></div>
                <div class="field"><label class="label">Down Payment (%)</label><input type="number" id="downPct" value="10" step="1"></div>
            </div>
            <div class="row">
                <div class="field"><label class="label">Interest Rate (%)</label><input type="number" id="rate" value="6.5" step="0.125"></div>
                <div class="field"><label class="label">PMI Rate (%/year)</label><input type="number" id="pmiRate" value="0.7" step="0.1"></div>
            </div>
            <div class="field"><label class="label">Loan Term</label><select id="term"><option value="30">30 years</option><option value="15">15 years</option></select></div>
            <button class="btn" onclick="calc()">Calculate PMI</button>
            <div class="results" id="out">
                <div class="stat"><div class="val" id="monthlyPMI">—</div><div class="lbl">Monthly PMI</div></div>
                <div class="stat"><div class="val" id="totalPMI">—</div><div class="lbl">Total PMI Cost</div></div>
                <div class="stat"><div class="val" id="dropMonth">—</div><div class="lbl">PMI Drops Off</div></div>
                <div class="stat"><div class="val" id="pmt">—</div><div class="lbl">Payment w/ PMI</div></div>
                <div class="stat"><div class="val" id="pmtNo">—</div><div class="lbl">Payment w/o PMI</div></div>
                <div class="stat"><div class="val" id="ltv">—</div><div class="lbl">Starting LTV</div></div>
            </div>
        </div>
        <div class="faq">
            <h2>Understanding PMI</h2>
            <h3>What is PMI?</h3>
            <p>Private Mortgage Insurance (PMI) is required by lenders when you put less than 20% down on a conventional mortgage. It protects the lender (not you) in case of default. PMI typically costs 0.3-1.5% of the loan amount per year.</p>
            <h3>How to Remove PMI</h3>
            <p>You can request PMI removal once your LTV reaches 80% (20% equity). PMI is automatically cancelled at 78% LTV. You can also reach 80% LTV faster through home appreciation — get a new appraisal to prove it. Some lenders allow lump-sum payments to reach the threshold sooner.</p>
            <h3>PMI vs No PMI: Is 20% Down Worth It?</h3>
            <p>Putting 20% down avoids PMI entirely but requires more cash upfront. Sometimes it's smarter to put less down and invest the difference. Compare the PMI cost to your expected investment returns to decide.</p>
        </div>
    </main>
${footer(mortgageLinks)}
<script>
${fmt}
function calc(){
    const price=+document.getElementById('price').value;
    const downPct=+document.getElementById('downPct').value/100;
    const down=price*downPct;
    const loan=price-down;
    const r=(+document.getElementById('rate').value/100)/12;
    const n=+document.getElementById('term').value*12;
    const pmiAnnual=+document.getElementById('pmiRate').value/100;
    const pmt=loan*(r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
    // Find when LTV hits 78%
    let bal=loan;let pmiMonths=0;let totalPMI=0;
    const target=price*0.78;
    for(let i=0;i<n;i++){
        if(bal<=target)break;
        const monthlyPMI=(bal*pmiAnnual)/12;
        totalPMI+=monthlyPMI;
        const interest=bal*r;
        bal-=(pmt-interest);
        pmiMonths++;
    }
    const monthlyPMI=(loan*pmiAnnual)/12;
    document.getElementById('monthlyPMI').textContent=fmt(monthlyPMI);
    document.getElementById('totalPMI').textContent=fmt(totalPMI);
    const years=Math.floor(pmiMonths/12);
    const months=pmiMonths%12;
    document.getElementById('dropMonth').textContent=years+'yr '+months+'mo';
    document.getElementById('pmt').textContent=fmt(pmt+monthlyPMI);
    document.getElementById('pmtNo').textContent=fmt(pmt);
    document.getElementById('ltv').textContent=((1-downPct)*100).toFixed(1)+'%';
}
calc();
</script>`;
    fs.writeFileSync(path.join(OUT, 'pmi-calculator.html'), html);
    console.log('✅ pmi-calculator.html');
}

// 6. Closing Costs Calculator
function buildClosing() {
    const html = `${head('Closing Costs Calculator', 'Estimate your total closing costs for buying a home. See a detailed breakdown of fees, taxes, and charges to expect at closing.', 'closing costs calculator, home closing costs, closing cost estimator, how much are closing costs, home buying closing fees', 'closing-costs-calculator.html')}
${header}
    <main>
        <nav style="margin-bottom:1rem"><a href="index.html" style="color:var(--accent);font-weight:600;text-decoration:none">← All Calculators</a></nav>
        <h1>Closing Costs Calculator</h1>
        <p class="sub">Estimate all closing costs when buying a home. Get a detailed breakdown of fees from lender charges to title insurance and prepaid items.</p>
        <div class="calc">
            <div class="row">
                <div class="field"><label class="label">Home Price</label><input type="number" id="price" value="400000"></div>
                <div class="field"><label class="label">Down Payment (%)</label><input type="number" id="downPct" value="20" step="1"></div>
            </div>
            <div class="row">
                <div class="field"><label class="label">Interest Rate (%)</label><input type="number" id="rate" value="6.5" step="0.125"></div>
                <div class="field"><label class="label">State</label><select id="state">
                    <option value="avg">National Average</option>
                    <option value="high">High-Cost State (NY, CA, HI)</option>
                    <option value="low">Low-Cost State (MO, IN, WI)</option>
                </select></div>
            </div>
            <button class="btn" onclick="calc()">Estimate Closing Costs</button>
            <div class="results" id="out">
                <div class="stat"><div class="val" id="total">—</div><div class="lbl">Total Closing Costs</div></div>
                <div class="stat"><div class="val" id="pct">—</div><div class="lbl">% of Home Price</div></div>
                <div class="stat"><div class="val" id="cashNeeded">—</div><div class="lbl">Cash Needed at Closing</div></div>
            </div>
            <div class="compare" id="breakdown" style="margin-top:1.5rem"></div>
        </div>
        <div class="faq">
            <h2>Closing Costs Explained</h2>
            <h3>What Are Closing Costs?</h3>
            <p>Closing costs are fees and expenses paid at the final step of a real estate transaction. They typically range from 2-5% of the home price and include lender fees, title insurance, appraisal, inspections, prepaid taxes and insurance, and government recording fees.</p>
            <h3>Who Pays Closing Costs?</h3>
            <p>Both buyers and sellers pay closing costs, but the breakdown varies. Buyers typically pay lender fees, title insurance, prepaid items, and inspections. Sellers usually pay real estate commissions and transfer taxes. Some costs are negotiable.</p>
            <h3>How to Reduce Closing Costs</h3>
            <p>Negotiate with the seller for credits, shop around for lender fees and title insurance, ask about lender credits (slightly higher rate in exchange for lower fees), consider a no-closing-cost mortgage, and close near the end of the month to reduce prepaid interest.</p>
        </div>
    </main>
${footer(mortgageLinks)}
<script>
${fmt}
function calc(){
    const price=+document.getElementById('price').value;
    const downPct=+document.getElementById('downPct').value/100;
    const loan=price*(1-downPct);
    const state=document.getElementById('state').value;
    const mult=state==='high'?1.4:state==='low'?0.7:1.0;
    const items=[
        {name:'Loan Origination Fee (1%)',amt:loan*0.01},
        {name:'Appraisal',amt:550},
        {name:'Credit Report',amt:50},
        {name:'Title Insurance',amt:price*0.005*mult},
        {name:'Title Search',amt:400},
        {name:'Attorney/Settlement Fee',amt:800*mult},
        {name:'Recording Fees',amt:250},
        {name:'Transfer Tax',amt:price*0.002*mult},
        {name:'Home Inspection',amt:500},
        {name:'Survey',amt:400},
        {name:'Prepaid Property Tax (3 months)',amt:price*0.012*0.25},
        {name:'Prepaid Insurance (1 year)',amt:1800},
        {name:'Prepaid Interest (15 days)',amt:loan*(+document.getElementById('rate').value/100)/365*15},
        {name:'Escrow Deposit (2 months)',amt:(price*0.012+1800)/12*2},
    ];
    let total=0;
    let html='<table><tr><th>Fee</th><th>Estimated Cost</th></tr>';
    items.forEach(i=>{total+=i.amt;html+='<tr><td>'+i.name+'</td><td>'+fmt(i.amt)+'</td></tr>';});
    html+='<tr style="font-weight:700;color:var(--accent)"><td>Total</td><td>'+fmt(total)+'</td></tr></table>';
    document.getElementById('breakdown').innerHTML=html;
    document.getElementById('total').textContent=fmt(total);
    document.getElementById('pct').textContent=(total/price*100).toFixed(1)+'%';
    document.getElementById('cashNeeded').textContent=fmt(price*downPct+total);
}
calc();
</script>`;
    fs.writeFileSync(path.join(OUT, 'closing-costs-calculator.html'), html);
    console.log('✅ closing-costs-calculator.html');
}

// 7. Down Payment Calculator
function buildDownPayment() {
    const html = `${head('Down Payment Calculator', 'Calculate how much down payment you need for a home. Compare 3%, 5%, 10%, and 20% down payment options and see how they affect your monthly payment.', 'down payment calculator, how much down payment, home down payment, down payment for house, mortgage down payment options', 'down-payment-calculator.html')}
${header}
    <main>
        <nav style="margin-bottom:1rem"><a href="index.html" style="color:var(--accent);font-weight:600;text-decoration:none">← All Calculators</a></nav>
        <h1>Down Payment Calculator</h1>
        <p class="sub">Compare down payment options side-by-side. See how different down payment amounts affect your monthly payment, PMI, and total cost.</p>
        <div class="calc">
            <div class="row">
                <div class="field"><label class="label">Home Price</label><input type="number" id="price" value="400000"></div>
                <div class="field"><label class="label">Interest Rate (%)</label><input type="number" id="rate" value="6.5" step="0.125"></div>
            </div>
            <div class="field"><label class="label">Monthly Savings for Down Payment</label><input type="number" id="savings" value="2000"></div>
            <button class="btn" onclick="calc()">Compare Down Payments</button>
            <div class="compare" id="out" style="margin-top:1.5rem"></div>
        </div>
        <div class="faq">
            <h2>Down Payment Guide</h2>
            <h3>How Much Down Payment Do You Need?</h3>
            <p>While 20% is the traditional recommendation (to avoid PMI), many buyers put down less. Conventional loans allow as little as 3%, FHA loans 3.5%, and VA/USDA loans 0%. The right amount depends on your savings, monthly budget, and how much PMI costs.</p>
            <h3>Saving for a Down Payment</h3>
            <p>Set up automatic transfers to a high-yield savings account. Consider down payment assistance programs in your state. Some employers offer home-buying benefits. First-time buyers may qualify for special programs allowing 3% down with reduced PMI.</p>
        </div>
    </main>
${footer(mortgageLinks)}
<script>
${fmt}
function calc(){
    const price=+document.getElementById('price').value;
    const r=(+document.getElementById('rate').value/100)/12;
    const n=360;
    const save=+document.getElementById('savings').value;
    const options=[3,5,10,15,20];
    let html='<table><tr><th>Down %</th><th>Down Payment</th><th>Loan</th><th>Monthly P&I</th><th>PMI/mo</th><th>Total Monthly</th><th>Save Time</th></tr>';
    options.forEach(pct=>{
        const down=price*pct/100;
        const loan=price-down;
        const pmt=loan*(r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
        const pmi=pct<20?(loan*0.007/12):0;
        const total=pmt+pmi;
        const months=save>0?Math.ceil(down/save):0;
        const yrs=Math.floor(months/12);
        const mos=months%12;
        html+='<tr'+(pct===20?' style="background:var(--glow)"':'')+'><td><strong>'+pct+'%</strong></td><td>'+fmt(down)+'</td><td>'+fmt(loan)+'</td><td>'+fmt(pmt)+'</td><td>'+(pmi>0?fmt(pmi):'None')+'</td><td>'+fmt(total)+'</td><td>'+yrs+'yr '+mos+'mo</td></tr>';
    });
    html+='</table>';
    document.getElementById('out').innerHTML=html;
}
calc();
</script>`;
    fs.writeFileSync(path.join(OUT, 'down-payment-calculator.html'), html);
    console.log('✅ down-payment-calculator.html');
}

// 8. Home Affordability Calculator
function buildAffordability() {
    const html = `${head('Home Affordability Calculator', 'How much house can you afford? Enter your income, debts, and down payment to see your maximum home price based on lender guidelines.', 'home affordability calculator, how much house can I afford, home buying calculator, mortgage affordability, house budget calculator', 'home-affordability-calculator.html')}
${header}
    <main>
        <nav style="margin-bottom:1rem"><a href="index.html" style="color:var(--accent);font-weight:600;text-decoration:none">← All Calculators</a></nav>
        <h1>Home Affordability Calculator</h1>
        <p class="sub">Find out how much home you can afford based on your income, debts, and down payment. Uses the 28/36 lender qualification rule.</p>
        <div class="calc">
            <div class="row">
                <div class="field"><label class="label">Annual Gross Income</label><input type="number" id="income" value="120000"></div>
                <div class="field"><label class="label">Monthly Debts (car, student loans, etc.)</label><input type="number" id="debts" value="500"></div>
            </div>
            <div class="row">
                <div class="field"><label class="label">Down Payment Available ($)</label><input type="number" id="down" value="80000"></div>
                <div class="field"><label class="label">Interest Rate (%)</label><input type="number" id="rate" value="6.5" step="0.125"></div>
            </div>
            <div class="row">
                <div class="field"><label class="label">Property Tax Rate (%/year)</label><input type="number" id="taxRate" value="1.2" step="0.1"></div>
                <div class="field"><label class="label">Home Insurance ($/year)</label><input type="number" id="ins" value="1800"></div>
            </div>
            <button class="btn" onclick="calc()">Calculate Affordability</button>
            <div class="results" id="out">
                <div class="stat"><div class="val" id="maxPrice">—</div><div class="lbl">Max Home Price</div></div>
                <div class="stat"><div class="val" id="maxPmt">—</div><div class="lbl">Max Monthly Payment</div></div>
                <div class="stat"><div class="val" id="comf">—</div><div class="lbl">Comfortable Price</div></div>
                <div class="stat"><div class="val" id="dti">—</div><div class="lbl">DTI Ratio</div></div>
            </div>
        </div>
        <div class="faq">
            <h2>Home Affordability Guide</h2>
            <h3>The 28/36 Rule</h3>
            <p>Most lenders use the 28/36 rule: your housing costs shouldn't exceed 28% of gross monthly income, and total debt payments shouldn't exceed 36%. Some lenders allow up to 43% total DTI for qualified borrowers.</p>
            <h3>Conservative vs Maximum Budget</h3>
            <p>Just because you qualify for a certain amount doesn't mean you should spend it. A comfortable budget typically uses 25% of gross income for housing, leaving room for savings, emergencies, and lifestyle expenses. The "comfortable" estimate uses this lower threshold.</p>
        </div>
    </main>
${footer(mortgageLinks)}
<script>
${fmt}
function calc(){
    const income=+document.getElementById('income').value;
    const debts=+document.getElementById('debts').value;
    const down=+document.getElementById('down').value;
    const r=(+document.getElementById('rate').value/100)/12;
    const taxRate=+document.getElementById('taxRate').value/100;
    const ins=+document.getElementById('ins').value;
    const monthlyIncome=income/12;
    const maxHousing=monthlyIncome*0.28;
    const maxTotal=monthlyIncome*0.36-debts;
    const maxPmt=Math.min(maxHousing,maxTotal);
    const n=360;
    // Solve for loan amount: pmt = L * [r(1+r)^n]/[(1+r)^n-1] + tax + ins
    // Iterative since tax depends on price
    let price=200000;
    for(let i=0;i<50;i++){
        const loan=price-down;
        if(loan<=0){price=down;break;}
        const pi=loan*(r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
        const tax=price*taxRate/12;
        const insM=ins/12;
        const totalPmt=pi+tax+insM;
        const diff=maxPmt-totalPmt;
        price+=diff*100;
        if(Math.abs(diff)<1)break;
    }
    price=Math.max(down,Math.round(price/1000)*1000);
    const comfPmt=monthlyIncome*0.25;
    let comfPrice=200000;
    for(let i=0;i<50;i++){
        const loan=comfPrice-down;
        if(loan<=0){comfPrice=down;break;}
        const pi=loan*(r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
        const tax=comfPrice*taxRate/12;
        const totalPmt=pi+tax+ins/12;
        const diff=comfPmt-totalPmt;
        comfPrice+=diff*100;
        if(Math.abs(diff)<1)break;
    }
    comfPrice=Math.max(down,Math.round(comfPrice/1000)*1000);
    const dti=((maxPmt+debts)/monthlyIncome*100).toFixed(1);
    document.getElementById('maxPrice').textContent=fmt(price);
    document.getElementById('maxPmt').textContent=fmt(maxPmt);
    document.getElementById('comf').textContent=fmt(comfPrice);
    document.getElementById('dti').textContent=dti+'%';
}
calc();
</script>`;
    fs.writeFileSync(path.join(OUT, 'home-affordability-calculator.html'), html);
    console.log('✅ home-affordability-calculator.html');
}

// 9. Rent vs Buy Calculator
function buildRentVsBuy() {
    const html = `${head('Rent vs Buy Calculator', 'Should you rent or buy? Compare the total cost of renting vs buying a home over time. See break-even point and long-term wealth building.', 'rent vs buy calculator, should I rent or buy, renting vs buying cost comparison, rent or own calculator, home buying decision', 'rent-vs-buy-calculator.html')}
${header}
    <main>
        <nav style="margin-bottom:1rem"><a href="index.html" style="color:var(--accent);font-weight:600;text-decoration:none">← All Calculators</a></nav>
        <h1>Rent vs Buy Calculator</h1>
        <p class="sub">Compare the true cost of renting vs buying over time. Factor in appreciation, investment returns, tax benefits, and maintenance.</p>
        <div class="calc">
            <div class="row">
                <div class="field"><label class="label">Monthly Rent</label><input type="number" id="rent" value="2500"></div>
                <div class="field"><label class="label">Annual Rent Increase (%)</label><input type="number" id="rentInc" value="3" step="0.5"></div>
            </div>
            <h3 style="margin:1rem 0 .75rem;color:var(--accent)">Buying Scenario</h3>
            <div class="row">
                <div class="field"><label class="label">Home Price</label><input type="number" id="price" value="450000"></div>
                <div class="field"><label class="label">Down Payment (%)</label><input type="number" id="downPct" value="20"></div>
            </div>
            <div class="row">
                <div class="field"><label class="label">Mortgage Rate (%)</label><input type="number" id="rate" value="6.5" step="0.125"></div>
                <div class="field"><label class="label">Home Appreciation (%/year)</label><input type="number" id="appre" value="3" step="0.5"></div>
            </div>
            <div class="row">
                <div class="field"><label class="label">Years to Compare</label><input type="number" id="years" value="10" min="1" max="30"></div>
                <div class="field"><label class="label">Investment Return (%/year)</label><input type="number" id="invest" value="7" step="0.5"></div>
            </div>
            <button class="btn" onclick="calc()">Compare Rent vs Buy</button>
            <div class="results" id="out">
                <div class="stat"><div class="val" id="rentTotal">—</div><div class="lbl">Total Rent Cost</div></div>
                <div class="stat"><div class="val" id="buyTotal">—</div><div class="lbl">Total Buy Cost</div></div>
                <div class="stat"><div class="val" id="equity">—</div><div class="lbl">Home Equity Built</div></div>
                <div class="stat"><div class="val" id="rentWealth">—</div><div class="lbl">Renter Investments</div></div>
                <div class="stat"><div class="val" id="winner">—</div><div class="lbl">Better Option</div></div>
                <div class="stat"><div class="val" id="diff">—</div><div class="lbl">Net Difference</div></div>
            </div>
        </div>
        <div class="faq">
            <h2>Rent vs Buy Guide</h2>
            <h3>Key Factors</h3>
            <p>The decision depends on: how long you'll stay, local market appreciation, mortgage rates, rent trends, your investment returns, tax benefits, and lifestyle flexibility. Generally, buying becomes better after 5-7 years in most markets.</p>
            <h3>Hidden Costs of Buying</h3>
            <p>Beyond the mortgage: property taxes (1-2%/year), homeowner's insurance, maintenance (1-2%/year), HOA fees, closing costs (2-5%), and selling costs (5-6% agent commissions). These add up significantly.</p>
        </div>
    </main>
${footer(mortgageLinks)}
<script>
${fmt}
function calc(){
    const rent=+document.getElementById('rent').value;
    const rentInc=+document.getElementById('rentInc').value/100;
    const price=+document.getElementById('price').value;
    const downPct=+document.getElementById('downPct').value/100;
    const down=price*downPct;
    const loan=price-down;
    const r=(+document.getElementById('rate').value/100)/12;
    const appre=+document.getElementById('appre').value/100;
    const years=+document.getElementById('years').value;
    const investR=+document.getElementById('invest').value/100;
    const n=360;
    const pmt=loan*(r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
    // Renter scenario
    let rentTotal=0;let renterInvest=down; // invests the down payment
    let monthlyRent=rent;
    for(let y=0;y<years;y++){
        for(let m=0;m<12;m++){
            rentTotal+=monthlyRent;
            const buyMonthly=pmt+price*0.012/12+150+price*0.015/12; // tax+ins+maint
            const diff=buyMonthly-monthlyRent;
            if(diff>0) renterInvest+=diff;
            renterInvest*=(1+investR/12);
        }
        monthlyRent*=(1+rentInc);
    }
    // Buyer scenario
    let bal=loan;let buyTotal=down;let homeVal=price;
    for(let y=0;y<years;y++){
        for(let m=0;m<12;m++){
            const interest=bal*r;
            bal-=(pmt-interest);
            buyTotal+=pmt+homeVal*0.012/12+150+homeVal*0.015/12;
        }
        homeVal*=(1+appre);
    }
    const equity=homeVal-Math.max(0,bal);
    const buyNet=buyTotal-equity;
    const rentNet=rentTotal-renterInvest;
    const buyBetter=buyNet<rentNet;
    document.getElementById('rentTotal').textContent=fmt(rentTotal);
    document.getElementById('buyTotal').textContent=fmt(buyTotal);
    document.getElementById('equity').textContent=fmt(equity);
    document.getElementById('rentWealth').textContent=fmt(renterInvest);
    document.getElementById('winner').textContent=buyBetter?'Buy':'Rent';
    document.getElementById('winner').style.color=buyBetter?'var(--accent)':'#f59e0b';
    document.getElementById('diff').textContent=fmt(Math.abs(buyNet-rentNet));
}
calc();
</script>`;
    fs.writeFileSync(path.join(OUT, 'rent-vs-buy-calculator.html'), html);
    console.log('✅ rent-vs-buy-calculator.html');
}

// 10. HELOC Calculator
function buildHELOC() {
    const html = `${head('HELOC Calculator', 'Calculate your home equity line of credit (HELOC) amount and payments. See how much equity you can borrow and estimate monthly costs.', 'HELOC calculator, home equity line of credit calculator, HELOC payment, home equity calculator, HELOC rates, how much can I borrow', 'heloc-calculator.html')}
${header}
    <main>
        <nav style="margin-bottom:1rem"><a href="index.html" style="color:var(--accent);font-weight:600;text-decoration:none">← All Calculators</a></nav>
        <h1>HELOC Calculator</h1>
        <p class="sub">Find out how much you can borrow with a home equity line of credit and estimate your monthly interest payments during the draw period.</p>
        <div class="calc">
            <div class="row">
                <div class="field"><label class="label">Home Value</label><input type="number" id="homeVal" value="500000"></div>
                <div class="field"><label class="label">Mortgage Balance</label><input type="number" id="balance" value="300000"></div>
            </div>
            <div class="row">
                <div class="field"><label class="label">HELOC Rate (%)</label><input type="number" id="rate" value="8.5" step="0.25"></div>
                <div class="field"><label class="label">Max LTV (%)</label><input type="number" id="ltv" value="85" step="5"></div>
            </div>
            <div class="field"><label class="label">Amount to Draw ($)</label><input type="number" id="draw" value="50000"></div>
            <button class="btn" onclick="calc()">Calculate HELOC</button>
            <div class="results" id="out">
                <div class="stat"><div class="val" id="maxLine">—</div><div class="lbl">Max HELOC Line</div></div>
                <div class="stat"><div class="val" id="equity">—</div><div class="lbl">Available Equity</div></div>
                <div class="stat"><div class="val" id="intOnly">—</div><div class="lbl">Interest-Only Payment</div></div>
                <div class="stat"><div class="val" id="fullPmt">—</div><div class="lbl">Full Payment (20yr)</div></div>
                <div class="stat"><div class="val" id="totalInt">—</div><div class="lbl">Total Interest (20yr)</div></div>
                <div class="stat"><div class="val" id="cltv">—</div><div class="lbl">Combined LTV</div></div>
            </div>
        </div>
        <div class="faq">
            <h2>HELOC Guide</h2>
            <h3>What is a HELOC?</h3>
            <p>A Home Equity Line of Credit is a revolving credit line secured by your home. You can borrow up to your credit limit, repay, and borrow again during the draw period (typically 10 years). After the draw period, you enter repayment (10-20 years) where you pay principal + interest.</p>
            <h3>HELOC vs Home Equity Loan</h3>
            <p>A HELOC is revolving (like a credit card) with variable rates. A home equity loan is a lump sum with a fixed rate. HELOCs offer flexibility; home equity loans offer predictability. Choose based on whether you need funds gradually or all at once.</p>
        </div>
    </main>
${footer(mortgageLinks)}
<script>
${fmt}
function calc(){
    const homeVal=+document.getElementById('homeVal').value;
    const bal=+document.getElementById('balance').value;
    const rate=+document.getElementById('rate').value/100;
    const maxLTV=+document.getElementById('ltv').value/100;
    const draw=+document.getElementById('draw').value;
    const maxBorrow=homeVal*maxLTV-bal;
    const equity=homeVal-bal;
    const intOnly=draw*rate/12;
    const r=rate/12;const n=240;
    const fullPmt=draw*(r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
    const totalInt=fullPmt*n-draw;
    const cltv=((bal+draw)/homeVal*100).toFixed(1);
    document.getElementById('maxLine').textContent=fmt(Math.max(0,maxBorrow));
    document.getElementById('equity').textContent=fmt(Math.max(0,equity));
    document.getElementById('intOnly').textContent=fmt(intOnly);
    document.getElementById('fullPmt').textContent=fmt(fullPmt);
    document.getElementById('totalInt').textContent=fmt(totalInt);
    document.getElementById('cltv').textContent=cltv+'%';
}
calc();
</script>`;
    fs.writeFileSync(path.join(OUT, 'heloc-calculator.html'), html);
    console.log('✅ heloc-calculator.html');
}

// Build all
buildFHA();
buildVA();
buildRefinance();
buildARM();
buildPMI();
buildClosing();
buildDownPayment();
buildAffordability();
buildRentVsBuy();
buildHELOC();

console.log('\n🏠 Built 10 mortgage calculators!');
