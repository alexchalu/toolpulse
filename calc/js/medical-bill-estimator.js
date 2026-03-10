// Medical Bill Estimator Calculator
(function(){
const calc = document.getElementById('calculator');
calc.innerHTML = `
<h2 style="font-size:20px;font-weight:700;margin-bottom:20px">Estimate Your Medical Bill</h2>
<div class="form-row">
<div class="form-group"><label>Procedure Type</label>
<select id="procedure"><option value="office">Office Visit</option><option value="specialist">Specialist Visit</option><option value="er">Emergency Room</option><option value="urgent">Urgent Care</option><option value="imaging">Imaging (MRI/CT/X-Ray)</option><option value="lab">Lab Work / Blood Tests</option><option value="minor-surgery">Minor Outpatient Surgery</option><option value="major-surgery">Major Surgery (Inpatient)</option><option value="physical-therapy">Physical Therapy Session</option><option value="mental-health">Mental Health Session</option></select></div>
<div class="form-group"><label>Insurance Status</label>
<select id="insurance"><option value="employer">Employer Insurance</option><option value="marketplace">ACA Marketplace</option><option value="medicare">Medicare</option><option value="medicaid">Medicaid</option><option value="none">Uninsured</option></select></div>
</div>
<div class="form-row">
<div class="form-group"><label>Annual Deductible ($)</label><input type="number" id="deductible" value="1500" min="0"></div>
<div class="form-group"><label>Deductible Already Met ($)</label><input type="number" id="deductibleMet" value="0" min="0"></div>
</div>
<div class="form-row">
<div class="form-group"><label>Coinsurance Rate (%)</label><input type="number" id="coinsurance" value="20" min="0" max="100"></div>
<div class="form-group"><label>Out-of-Pocket Maximum ($)</label><input type="number" id="oopMax" value="8700" min="0"></div>
</div>
<div class="form-group"><label>Already Paid Toward OOP Max ($)</label><input type="number" id="oopPaid" value="0" min="0"></div>
<button class="btn" onclick="calculate()">Estimate My Bill</button>
<div class="results" id="results"></div>
`;

const costs = {office:250,specialist:400,er:3500,urgent:350,imaging:2500,lab:500,'minor-surgery':8000,'major-surgery':45000,'physical-therapy':150,'mental-health':200};
const labels = {office:'Office Visit',specialist:'Specialist Visit',er:'Emergency Room',urgent:'Urgent Care',imaging:'Imaging (MRI/CT/X-Ray)',lab:'Lab Work','minor-surgery':'Minor Outpatient Surgery','major-surgery':'Major Surgery (Inpatient)','physical-therapy':'Physical Therapy Session','mental-health':'Mental Health Session'};

window.calculate = function(){
  const proc = document.getElementById('procedure').value;
  const ins = document.getElementById('insurance').value;
  const ded = +document.getElementById('deductible').value;
  const dedMet = +document.getElementById('deductibleMet').value;
  const coins = +document.getElementById('coinsurance').value / 100;
  const oopMax = +document.getElementById('oopMax').value;
  const oopPaid = +document.getElementById('oopPaid').value;

  let totalCost = costs[proc];
  let discount = 1;
  if(ins==='medicare') discount=0.6;
  if(ins==='medicaid') discount=0.35;
  if(ins==='none') discount=0.7; // self-pay discount

  let chargedAmount = totalCost;
  let negotiatedRate = totalCost * discount;
  let yourCost = 0;

  if(ins==='none'){
    yourCost = negotiatedRate;
  } else if(ins==='medicaid'){
    yourCost = Math.min(negotiatedRate * 0.05, 50);
  } else {
    let dedRemaining = Math.max(0, ded - dedMet);
    let appliedToDed = Math.min(negotiatedRate, dedRemaining);
    let afterDed = negotiatedRate - appliedToDed;
    let coinsAmt = afterDed * coins;
    yourCost = appliedToDed + coinsAmt;
    let oopRemaining = Math.max(0, oopMax - oopPaid);
    yourCost = Math.min(yourCost, oopRemaining);
  }

  let insurancePays = negotiatedRate - yourCost;
  let savings = chargedAmount - yourCost;

  const r = document.getElementById('results');
  r.style.display = 'block';
  r.innerHTML = `
  <h3>💊 Cost Estimate: ${labels[proc]}</h3>
  <div class="result-row"><span class="result-label">Facility Charge (List Price)</span><span class="result-value">$${chargedAmount.toLocaleString()}</span></div>
  <div class="result-row"><span class="result-label">Negotiated / Allowed Amount</span><span class="result-value">$${negotiatedRate.toLocaleString(undefined,{maximumFractionDigits:0})}</span></div>
  <div class="result-row"><span class="result-label">Insurance Pays</span><span class="result-value" style="color:#34c759">$${insurancePays.toLocaleString(undefined,{maximumFractionDigits:0})}</span></div>
  <div class="result-row"><span class="result-label">Your Estimated Cost</span><span class="result-value highlight">$${yourCost.toLocaleString(undefined,{maximumFractionDigits:0})}</span></div>
  <div class="result-row"><span class="result-label">Total Savings vs List Price</span><span class="result-value" style="color:#34c759">$${savings.toLocaleString(undefined,{maximumFractionDigits:0})}</span></div>
  <div class="chart-container">
    <p style="font-weight:600;margin-bottom:12px">Cost Breakdown</p>
    <div class="bar" style="width:100%;background:#0071e3">Your Cost: $${yourCost.toLocaleString(undefined,{maximumFractionDigits:0})} (${(yourCost/chargedAmount*100).toFixed(1)}%)</div>
    <div class="bar" style="width:${insurancePays/chargedAmount*100}%;background:#34c759">Insurance: $${insurancePays.toLocaleString(undefined,{maximumFractionDigits:0})}</div>
    <div class="bar" style="width:${(chargedAmount-negotiatedRate)/chargedAmount*100}%;background:#86868b">Discount: $${(chargedAmount-negotiatedRate).toLocaleString(undefined,{maximumFractionDigits:0})}</div>
  </div>`;
};

// Content
document.getElementById('content').innerHTML = `
<h2>Understanding Medical Bills in the United States</h2>
<p>Medical bills in America are notoriously complex and often surprising. The average American family spends over $22,000 per year on healthcare, including premiums, deductibles, and out-of-pocket costs. Understanding how medical billing works can save you thousands of dollars.</p>
<h2>How Medical Billing Works</h2>
<p>When you receive medical care, the facility charges a "list price" (also called chargemaster rate). This is rarely what anyone actually pays. Insurance companies negotiate lower rates, Medicare sets fixed reimbursement rates, and uninsured patients can often negotiate significant discounts.</p>
<ul>
<li><strong>Deductible:</strong> The amount you pay before insurance kicks in ($1,500-$8,000 typical)</li>
<li><strong>Coinsurance:</strong> Your share after meeting the deductible (typically 20%)</li>
<li><strong>Copay:</strong> Fixed amount per visit ($20-$50 typical)</li>
<li><strong>Out-of-Pocket Maximum:</strong> The most you pay per year ($8,700 individual, $17,400 family in 2026)</li>
</ul>
<h2>Tips to Reduce Your Medical Bills</h2>
<ul>
<li>Always ask for an itemized bill and check for errors (up to 80% of bills contain mistakes)</li>
<li>Request the self-pay or uninsured discount (often 30-50% off)</li>
<li>Negotiate payment plans — most hospitals offer interest-free options</li>
<li>Compare prices using tools like Healthcare Bluebook before procedures</li>
<li>Choose urgent care over the ER when possible (saves $2,000-$3,000 average)</li>
<li>Ask about generic medications (saves 80-85% on prescriptions)</li>
<li>Check if your procedure qualifies for outpatient instead of inpatient</li>
</ul>
<h2>Average Procedure Costs (2026)</h2>
<ul>
<li>Office visit: $150-$300</li>
<li>Emergency room visit: $2,500-$5,000+</li>
<li>MRI scan: $1,200-$4,000</li>
<li>CT scan: $800-$3,000</li>
<li>Lab work (blood panel): $200-$800</li>
<li>Minor surgery: $5,000-$15,000</li>
<li>Major surgery: $20,000-$100,000+</li>
<li>Childbirth (vaginal): $10,000-$15,000</li>
<li>Childbirth (C-section): $15,000-$25,000</li>
</ul>`;

// FAQ
document.getElementById('faq').innerHTML = `
<h3 style="font-size:20px;font-weight:700;margin-bottom:16px">Frequently Asked Questions</h3>
<details><summary>Can I negotiate my medical bill?</summary><div class="faq-body">Yes! Most hospitals and providers will negotiate, especially for uninsured patients. Ask for the self-pay discount (30-50% off), request a payment plan, or ask about financial assistance programs. Many hospitals are required by law to offer charity care.</div></details>
<details><summary>What if I can't afford my medical bill?</summary><div class="faq-body">Options include: payment plans (most providers offer 0% interest), financial assistance programs, medical bill negotiation services, medical credit cards (CareCredit), and in some cases, bankruptcy protection. Never ignore medical bills — they can go to collections and damage your credit.</div></details>
<details><summary>How long do I have to pay a medical bill?</summary><div class="faq-body">Most providers allow 30-90 days before sending to collections. However, you can negotiate longer payment plans. The No Surprises Act (2022) also protects you from surprise out-of-network bills in emergency situations.</div></details>
<details><summary>Are medical bills tax deductible?</summary><div class="faq-body">Yes, if your total medical expenses exceed 7.5% of your adjusted gross income (AGI), you can deduct the excess amount. This includes premiums, deductibles, copays, prescriptions, dental, vision, and travel costs for medical care.</div></details>
<details><summary>What's the difference between in-network and out-of-network?</summary><div class="faq-body">In-network providers have negotiated rates with your insurance, meaning lower costs for you. Out-of-network providers can charge any amount, and your insurance may cover little or nothing. Always verify network status before receiving care.</div></details>
<details><summary>How do I check for billing errors?</summary><div class="faq-body">Request an itemized bill (not just a summary). Look for: duplicate charges, services you didn't receive, incorrect procedure codes, charges for cancelled procedures, and incorrect insurance information. Up to 80% of medical bills contain errors.</div></details>`;

// Related
document.getElementById('related').innerHTML = `
<h3>Related Calculators</h3>
<div class="related-grid">
<a href="/calc/surgery-cost-calculator.html">🏥 Surgery Cost Calculator</a>
<a href="/calc/health-insurance-deductible.html">📋 Insurance Deductible Calculator</a>
<a href="/calc/prescription-drug-cost.html">💊 Prescription Drug Cost</a>
<a href="/calc/er-visit-cost.html">🚑 ER Visit Cost Calculator</a>
<a href="/calc/dental-cost-calculator.html">🦷 Dental Cost Calculator</a>
<a href="/calc/therapy-cost-calculator.html">🧠 Therapy Cost Calculator</a>
<a href="/calc/childbirth-cost-calculator.html">👶 Childbirth Cost Calculator</a>
<a href="/calc/ivf-cost-calculator.html">🧬 IVF Cost Calculator</a>
</div>`;
})();
