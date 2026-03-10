(function(){
const calc = document.getElementById('calculator');
calc.innerHTML = `
<h2 style="font-size:20px;font-weight:700;margin-bottom:20px">Estimate Surgery Costs</h2>
<div class="form-row">
<div class="form-group"><label>Surgery Type</label>
<select id="surgery"><option value="appendectomy">Appendectomy</option><option value="gallbladder">Gallbladder Removal</option><option value="hernia">Hernia Repair</option><option value="knee-replacement">Knee Replacement</option><option value="hip-replacement">Hip Replacement</option><option value="cataract">Cataract Surgery</option><option value="tonsillectomy">Tonsillectomy</option><option value="acl">ACL Reconstruction</option><option value="spinal-fusion">Spinal Fusion</option><option value="heart-bypass">Heart Bypass (CABG)</option><option value="csection">C-Section</option><option value="hysterectomy">Hysterectomy</option></select></div>
<div class="form-group"><label>Facility Type</label>
<select id="facility"><option value="hospital">Hospital Inpatient</option><option value="outpatient">Outpatient Surgery Center</option><option value="teaching">Teaching Hospital</option></select></div>
</div>
<div class="form-row">
<div class="form-group"><label>Insurance Coverage</label>
<select id="insurance"><option value="good">Good (80/20 plan)</option><option value="basic">Basic (70/30 plan)</option><option value="hdhp">High-Deductible (60/40)</option><option value="medicare">Medicare</option><option value="none">Uninsured</option></select></div>
<div class="form-group"><label>Region</label>
<select id="region"><option value="northeast">Northeast (High Cost)</option><option value="west">West Coast (High Cost)</option><option value="midwest">Midwest (Average)</option><option value="south">South (Below Average)</option><option value="rural">Rural (Low Cost)</option></select></div>
</div>
<div class="form-row">
<div class="form-group"><label>Deductible ($)</label><input type="number" id="deductible" value="2000" min="0"></div>
<div class="form-group"><label>Deductible Already Met ($)</label><input type="number" id="dedMet" value="0" min="0"></div>
</div>
<button class="btn" onclick="calculate()">Calculate Surgery Cost</button>
<div class="results" id="results"></div>`;

const surgeryData = {
  appendectomy:{base:33000,days:1,anesthesia:3500},gallbladder:{base:25000,days:1,anesthesia:3000},hernia:{base:18000,days:0,anesthesia:2500},
  'knee-replacement':{base:50000,days:3,anesthesia:5000},'hip-replacement':{base:55000,days:3,anesthesia:5000},cataract:{base:5000,days:0,anesthesia:1500},
  tonsillectomy:{base:10000,days:0,anesthesia:2000},acl:{base:35000,days:1,anesthesia:4000},'spinal-fusion':{base:110000,days:4,anesthesia:8000},
  'heart-bypass':{base:150000,days:7,anesthesia:12000},csection:{base:25000,days:3,anesthesia:4000},hysterectomy:{base:40000,days:2,anesthesia:5000}
};
const regionMult = {northeast:1.3,west:1.25,midwest:1.0,south:0.9,rural:0.75};
const facilityMult = {hospital:1.0,outpatient:0.6,teaching:1.15};

window.calculate = function(){
  const s = surgeryData[document.getElementById('surgery').value];
  const rm = regionMult[document.getElementById('region').value];
  const fm = facilityMult[document.getElementById('facility').value];
  const ins = document.getElementById('insurance').value;
  const ded = +document.getElementById('deductible').value;
  const dedMet = +document.getElementById('dedMet').value;

  let surgeonFee = s.base * 0.35 * rm;
  let facilityFee = s.base * 0.45 * rm * fm;
  let anesthesia = s.anesthesia * rm;
  let otherCosts = s.base * 0.2 * rm;
  let totalCost = surgeonFee + facilityFee + anesthesia + otherCosts;

  let yourCost = totalCost;
  const coinsRates = {good:0.2,basic:0.3,hdhp:0.4,medicare:0.2,none:1.0};
  const discounts = {good:0.5,basic:0.55,hdhp:0.6,medicare:0.4,none:0.65};

  if(ins !== 'none'){
    let negotiated = totalCost * discounts[ins];
    let dedRemaining = Math.max(0, ded - dedMet);
    let appliedDed = Math.min(negotiated, dedRemaining);
    let afterDed = negotiated - appliedDed;
    yourCost = appliedDed + (afterDed * coinsRates[ins]);
    yourCost = Math.min(yourCost, 8700);
  } else {
    yourCost = totalCost * 0.65;
  }

  const r = document.getElementById('results');
  r.style.display='block';
  r.innerHTML=`
  <h3>🏥 Surgery Cost Breakdown</h3>
  <div class="result-row"><span class="result-label">Surgeon Fee</span><span class="result-value">$${surgeonFee.toLocaleString(undefined,{maximumFractionDigits:0})}</span></div>
  <div class="result-row"><span class="result-label">Facility / Hospital Fee</span><span class="result-value">$${facilityFee.toLocaleString(undefined,{maximumFractionDigits:0})}</span></div>
  <div class="result-row"><span class="result-label">Anesthesia</span><span class="result-value">$${anesthesia.toLocaleString(undefined,{maximumFractionDigits:0})}</span></div>
  <div class="result-row"><span class="result-label">Other (Labs, Meds, Supplies)</span><span class="result-value">$${otherCosts.toLocaleString(undefined,{maximumFractionDigits:0})}</span></div>
  <div class="result-row"><span class="result-label">Total Facility Charges</span><span class="result-value">$${totalCost.toLocaleString(undefined,{maximumFractionDigits:0})}</span></div>
  <div class="result-row"><span class="result-label">Your Estimated Out-of-Pocket</span><span class="result-value highlight">$${yourCost.toLocaleString(undefined,{maximumFractionDigits:0})}</span></div>
  ${s.days > 0 ? `<div class="result-row"><span class="result-label">Expected Hospital Stay</span><span class="result-value">${s.days} day${s.days>1?'s':''}</span></div>` : ''}
  <div class="chart-container">
    <p style="font-weight:600;margin-bottom:12px">Cost Components</p>
    <div class="bar" style="width:${surgeonFee/totalCost*100}%;background:#0071e3;min-width:60px">Surgeon ${(surgeonFee/totalCost*100).toFixed(0)}%</div>
    <div class="bar" style="width:${facilityFee/totalCost*100}%;background:#5856d6;min-width:60px">Facility ${(facilityFee/totalCost*100).toFixed(0)}%</div>
    <div class="bar" style="width:${anesthesia/totalCost*100}%;background:#34c759;min-width:60px">Anesthesia ${(anesthesia/totalCost*100).toFixed(0)}%</div>
    <div class="bar" style="width:${otherCosts/totalCost*100}%;background:#ff9500;min-width:60px">Other ${(otherCosts/totalCost*100).toFixed(0)}%</div>
  </div>`;
};

document.getElementById('content').innerHTML=`
<h2>Understanding Surgery Costs in America</h2>
<p>Surgery costs in the United States are among the highest in the world. A knee replacement that costs $50,000 in the US might cost $12,000 in Germany or $8,000 in Mexico. Understanding the components of your surgery bill can help you plan financially and negotiate better rates.</p>
<h2>Components of a Surgery Bill</h2>
<ul>
<li><strong>Surgeon's fee (30-40%):</strong> The operating surgeon's professional charges</li>
<li><strong>Facility fee (40-50%):</strong> Hospital or surgery center operating room, nursing, equipment</li>
<li><strong>Anesthesia (8-12%):</strong> Anesthesiologist fees, typically billed separately</li>
<li><strong>Other costs (10-20%):</strong> Lab work, medications, imaging, supplies, pathology</li>
</ul>
<h2>Ways to Save on Surgery</h2>
<ul>
<li>Compare prices between hospitals and outpatient surgery centers (can save 40-60%)</li>
<li>Ask about bundled pricing — one price for everything</li>
<li>Choose an outpatient facility when medically appropriate</li>
<li>Time your surgery to maximize insurance benefits (beginning of year if deductible is met)</li>
<li>Get pre-authorization from your insurance company</li>
<li>Ask for the cash/self-pay discount even if insured</li>
<li>Consider medical tourism for elective procedures</li>
</ul>`;

document.getElementById('faq').innerHTML=`
<h3 style="font-size:20px;font-weight:700;margin-bottom:16px">Surgery Cost FAQs</h3>
<details><summary>Why is surgery so expensive in the US?</summary><div class="faq-body">US surgery costs include high facility fees, malpractice insurance, administrative overhead, expensive medical devices, and lack of price regulation. The US spends 17% of GDP on healthcare vs 10-12% in other developed nations.</div></details>
<details><summary>Is outpatient surgery cheaper?</summary><div class="faq-body">Yes, significantly. Outpatient surgery centers charge 40-60% less than hospitals for the same procedure because of lower overhead. Many common surgeries (hernia, cataract, knee arthroscopy) can be done outpatient.</div></details>
<details><summary>Can I get a price estimate before surgery?</summary><div class="faq-body">Yes. Under the No Surprises Act and hospital price transparency rules, hospitals must provide good-faith cost estimates. Ask for an "advanced beneficiary notice" and get pre-authorization from your insurer.</div></details>
<details><summary>What if I need surgery but have no insurance?</summary><div class="faq-body">Ask about self-pay discounts (30-50% off), payment plans, financial assistance programs, and charity care. Some surgery centers offer flat-rate packages for uninsured patients that are significantly cheaper than hospital prices.</div></details>`;

document.getElementById('related').innerHTML=`
<h3>Related Calculators</h3>
<div class="related-grid">
<a href="/calc/medical-bill-estimator.html">💊 Medical Bill Estimator</a>
<a href="/calc/health-insurance-deductible.html">📋 Insurance Deductible</a>
<a href="/calc/er-visit-cost.html">🚑 ER Visit Cost</a>
<a href="/calc/dental-cost-calculator.html">🦷 Dental Cost Calculator</a>
<a href="/calc/childbirth-cost-calculator.html">👶 Childbirth Cost</a>
<a href="/calc/ivf-cost-calculator.html">🧬 IVF Cost Calculator</a>
</div>`;
})();
