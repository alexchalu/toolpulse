(function(){
const c=document.getElementById('calculator');
c.innerHTML=`<h2 style="font-size:20px;font-weight:700;margin-bottom:20px">Track Your Insurance Deductible & Out-of-Pocket</h2>
<div class="form-row"><div class="form-group"><label>Annual Deductible ($)</label><input type="number" id="ded" value="2000" min="0"></div>
<div class="form-group"><label>Amount Paid Toward Deductible ($)</label><input type="number" id="dedPaid" value="800" min="0"></div></div>
<div class="form-row"><div class="form-group"><label>Out-of-Pocket Maximum ($)</label><input type="number" id="oopMax" value="8700" min="0"></div>
<div class="form-group"><label>Amount Paid Toward OOP Max ($)</label><input type="number" id="oopPaid" value="1200" min="0"></div></div>
<div class="form-row"><div class="form-group"><label>Coinsurance Rate (%)</label><input type="number" id="coins" value="20" min="0" max="100"></div>
<div class="form-group"><label>Upcoming Expense ($)</label><input type="number" id="expense" value="5000" min="0"></div></div>
<button class="btn" onclick="calculate()">Calculate My Costs</button>
<div class="results" id="results"></div>`;

window.calculate=function(){
const ded=+document.getElementById('ded').value;
const dedPaid=+document.getElementById('dedPaid').value;
const oopMax=+document.getElementById('oopMax').value;
const oopPaid=+document.getElementById('oopPaid').value;
const coins=+document.getElementById('coins').value/100;
const expense=+document.getElementById('expense').value;

const dedRemaining=Math.max(0,ded-dedPaid);
const oopRemaining=Math.max(0,oopMax-oopPaid);
const dedPct=Math.min(100,dedPaid/ded*100);

let appliedToDed=Math.min(expense,dedRemaining);
let afterDed=expense-appliedToDed;
let coinsAmt=afterDed*coins;
let yourCost=appliedToDed+coinsAmt;
yourCost=Math.min(yourCost,oopRemaining);
let insPays=expense-yourCost;

const r=document.getElementById('results');r.style.display='block';
r.innerHTML=`<h3>📋 Insurance Coverage Analysis</h3>
<div class="result-row"><span class="result-label">Deductible Progress</span><span class="result-value">${dedPct.toFixed(0)}% met ($${dedPaid} of $${ded})</span></div>
<div class="result-row"><span class="result-label">Deductible Remaining</span><span class="result-value">$${dedRemaining.toLocaleString()}</span></div>
<div class="result-row"><span class="result-label">OOP Max Remaining</span><span class="result-value">$${oopRemaining.toLocaleString()}</span></div>
<div style="margin:16px 0;height:20px;background:#e8e8ed;border-radius:10px;overflow:hidden"><div style="height:100%;width:${dedPct}%;background:linear-gradient(90deg,#34c759,#0071e3);border-radius:10px;transition:width 0.6s"></div></div>
<h3 style="margin-top:20px">For Your $${expense.toLocaleString()} Expense:</h3>
<div class="result-row"><span class="result-label">Applied to Deductible</span><span class="result-value">$${appliedToDed.toLocaleString()}</span></div>
<div class="result-row"><span class="result-label">Your Coinsurance (${(coins*100).toFixed(0)}%)</span><span class="result-value">$${coinsAmt.toLocaleString(undefined,{maximumFractionDigits:0})}</span></div>
<div class="result-row"><span class="result-label">Insurance Pays</span><span class="result-value" style="color:#34c759">$${insPays.toLocaleString(undefined,{maximumFractionDigits:0})}</span></div>
<div class="result-row"><span class="result-label">Your Total Cost</span><span class="result-value highlight">$${yourCost.toLocaleString(undefined,{maximumFractionDigits:0})}</span></div>
<div class="chart-container"><p style="font-weight:600;margin-bottom:12px">Who Pays What</p>
<div class="bar" style="width:${yourCost/expense*100}%;background:#0071e3;min-width:60px">You: $${yourCost.toLocaleString(undefined,{maximumFractionDigits:0})}</div>
<div class="bar" style="width:${insPays/expense*100}%;background:#34c759;min-width:60px">Insurance: $${insPays.toLocaleString(undefined,{maximumFractionDigits:0})}</div></div>`;};

document.getElementById('content').innerHTML=`<h2>Understanding Your Health Insurance Deductible</h2>
<p>Your deductible is the amount you pay for covered healthcare services before your insurance plan starts to pay. In 2026, the average individual deductible is $1,735 for employer plans and $2,825 for marketplace plans.</p>
<h2>Key Insurance Terms Explained</h2>
<ul><li><strong>Deductible:</strong> Amount you pay before insurance starts covering costs</li>
<li><strong>Coinsurance:</strong> Your percentage share after meeting the deductible (typically 20%)</li>
<li><strong>Copay:</strong> Fixed fee per visit (e.g., $25 for doctor, $50 for specialist)</li>
<li><strong>Out-of-Pocket Maximum:</strong> The most you'll pay in a year ($9,200 individual limit for 2026 ACA plans)</li>
<li><strong>Premium:</strong> Monthly cost of your insurance plan</li></ul>
<h2>Tips to Maximize Your Insurance</h2>
<ul><li>Schedule preventive care (free under ACA — no deductible required)</li>
<li>Time elective procedures after you've met your deductible</li>
<li>If close to OOP max, consider scheduling deferred care this year</li>
<li>Use in-network providers to avoid higher out-of-network costs</li></ul>`;

document.getElementById('faq').innerHTML=`<h3 style="font-size:20px;font-weight:700;margin-bottom:16px">Insurance FAQs</h3>
<details><summary>Does my deductible reset every year?</summary><div class="faq-body">Yes, most deductibles reset on January 1 (calendar year) or your plan's anniversary date. This is why December/January medical timing matters.</div></details>
<details><summary>What doesn't count toward my deductible?</summary><div class="faq-body">Monthly premiums, out-of-network services (for HMO plans), services not covered by your plan, and copays for preventive care don't count toward your deductible.</div></details>`;

document.getElementById('related').innerHTML=`<h3>Related Calculators</h3><div class="related-grid">
<a href="/calc/medical-bill-estimator.html">💊 Medical Bill Estimator</a>
<a href="/calc/surgery-cost-calculator.html">🏥 Surgery Cost</a>
<a href="/calc/prescription-drug-cost.html">💊 Rx Drug Cost</a>
<a href="/calc/er-visit-cost.html">🚑 ER Visit Cost</a></div>`;
})();
