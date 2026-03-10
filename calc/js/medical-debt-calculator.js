(function(){
const c=document.getElementById('calculator');
c.innerHTML=`<h2 style="font-size:20px;font-weight:700;margin-bottom:20px">Medical Debt Repayment Planner</h2>
<div class="form-row"><div class="form-group"><label>Total Medical Debt ($)</label><input type="number" id="debt" value="5000" min="0"></div>
<div class="form-group"><label>Monthly Payment Budget ($)</label><input type="number" id="payment" value="200" min="0"></div></div>
<div class="form-row"><div class="form-group"><label>Interest Rate (%)</label><input type="number" id="rate" value="0" min="0" step="0.1">
<small style="color:#86868b">Most hospitals offer 0% plans</small></div>
<div class="form-group"><label>Negotiation Discount (%)</label><input type="number" id="discount" value="0" min="0" max="80">
<small style="color:#86868b">Ask for 20-50% discount</small></div></div>
<button class="btn" onclick="calculate()">Plan My Repayment</button>
<div class="results" id="results"></div>`;

window.calculate=function(){
const debt=+document.getElementById('debt').value;
const payment=+document.getElementById('payment').value;
const rate=+document.getElementById('rate').value/100/12;
const discount=+document.getElementById('discount').value/100;
const negotiated=debt*(1-discount);
const saved=debt-negotiated;

let months=0,totalPaid=0,balance=negotiated;
if(rate===0){months=Math.ceil(negotiated/payment);totalPaid=negotiated;}
else{while(balance>0&&months<360){const interest=balance*rate;balance=balance+interest-payment;totalPaid+=payment;months++;if(balance<0){totalPaid+=balance;break;}}}

const r=document.getElementById('results');r.style.display='block';
r.innerHTML=`<h3>📊 Repayment Plan</h3>
<div class="result-row"><span class="result-label">Original Bill</span><span class="result-value">$${debt.toLocaleString()}</span></div>
${discount>0?`<div class="result-row"><span class="result-label">After Negotiation (${(discount*100).toFixed(0)}% off)</span><span class="result-value" style="color:#34c759">$${negotiated.toLocaleString(undefined,{maximumFractionDigits:0})}</span></div>
<div class="result-row"><span class="result-label">Negotiation Savings</span><span class="result-value" style="color:#34c759">$${saved.toLocaleString(undefined,{maximumFractionDigits:0})}</span></div>`:''}
<div class="result-row"><span class="result-label">Monthly Payment</span><span class="result-value">$${payment.toLocaleString()}</span></div>
<div class="result-row"><span class="result-label">Months to Pay Off</span><span class="result-value highlight">${months} months</span></div>
<div class="result-row"><span class="result-label">Total Paid</span><span class="result-value">$${totalPaid.toLocaleString(undefined,{maximumFractionDigits:0})}</span></div>
<div class="result-row"><span class="result-label">Payoff Date</span><span class="result-value">${new Date(Date.now()+months*30*86400000).toLocaleDateString('en-US',{month:'long',year:'numeric'})}</span></div>
<div class="chart-container"><p style="font-weight:600;margin-bottom:12px">Debt Reduction Timeline</p>
<div class="bar" style="width:100%;background:#ff3b30">Original: $${debt.toLocaleString()}</div>
${discount>0?`<div class="bar" style="width:${negotiated/debt*100}%;background:#ff9500;min-width:60px">After Negotiation: $${negotiated.toLocaleString(undefined,{maximumFractionDigits:0})}</div>`:''}
<div class="bar" style="width:${payment/debt*100*5}%;background:#34c759;min-width:60px">Monthly: $${payment}/mo × ${months} months</div></div>`;};

document.getElementById('content').innerHTML=`<h2>Managing Medical Debt</h2>
<p>100 million Americans carry medical debt — it's the #1 cause of bankruptcy in the US. But most medical debt can be reduced or eliminated with the right strategy.</p>
<h2>Steps to Manage Medical Debt</h2>
<ul><li><strong>Step 1:</strong> Request an itemized bill and check for errors (80% have mistakes)</li>
<li><strong>Step 2:</strong> Negotiate — ask for 20-50% discount for lump sum payment</li>
<li><strong>Step 3:</strong> Set up a 0% payment plan (most hospitals offer them)</li>
<li><strong>Step 4:</strong> Apply for financial assistance / charity care programs</li>
<li><strong>Step 5:</strong> Check if you qualify for Medicaid retroactively (covers bills from past 3 months)</li>
<li><strong>Step 6:</strong> As a last resort, consider medical debt consolidation</li></ul>
<h2>Important Protections</h2>
<ul><li>Medical debt under $500 no longer appears on credit reports (2023 change)</li>
<li>Paid medical debt is removed from credit reports</li>
<li>Nonprofit hospitals must offer financial assistance programs</li>
<li>Many states have laws limiting medical debt collection practices</li></ul>`;

document.getElementById('faq').innerHTML=`<h3 style="font-size:20px;font-weight:700;margin-bottom:16px">Medical Debt FAQs</h3>
<details><summary>Can medical debt affect my credit score?</summary><div class="faq-body">As of 2023, medical debt under $500 and paid medical collections are removed from credit reports. Unpaid medical debt over $500 can still appear after 1 year of non-payment.</div></details>
<details><summary>Can I negotiate medical bills?</summary><div class="faq-body">Absolutely. Studies show 57% of people who negotiate their medical bills succeed. Ask for itemized bills, dispute errors, request self-pay discounts, and negotiate payment plans.</div></details>
<details><summary>Should I use a credit card for medical bills?</summary><div class="faq-body">Generally no. Medical providers typically offer 0% interest payment plans. Credit cards charge 20-30% interest. Only use a credit card if you can pay it off within the 0% promo period.</div></details>`;

document.getElementById('related').innerHTML=`<h3>Related Calculators</h3><div class="related-grid">
<a href="/calc/medical-bill-estimator.html">💊 Medical Bill Estimator</a>
<a href="/calc/surgery-cost-calculator.html">🏥 Surgery Cost</a>
<a href="/calc/health-insurance-deductible.html">📋 Deductible Calculator</a>
<a href="/calc/er-visit-cost.html">🚑 ER Visit Cost</a></div>`;
})();
