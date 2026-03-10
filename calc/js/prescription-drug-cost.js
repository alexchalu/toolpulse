(function(){
const c=document.getElementById('calculator');
c.innerHTML=`<h2 style="font-size:20px;font-weight:700;margin-bottom:20px">Compare Prescription Drug Costs</h2>
<div class="form-row"><div class="form-group"><label>Drug Category</label>
<select id="drug"><option value="cholesterol">Cholesterol (Statins)</option><option value="blood-pressure">Blood Pressure</option><option value="diabetes">Diabetes (Insulin)</option><option value="antidepressant">Antidepressants</option><option value="antibiotic">Antibiotics</option><option value="pain">Pain Management</option><option value="allergy">Allergy / Antihistamine</option><option value="acid-reflux">Acid Reflux / PPI</option><option value="thyroid">Thyroid</option><option value="birth-control">Birth Control</option></select></div>
<div class="form-group"><label>Brand vs Generic</label>
<select id="type"><option value="generic">Generic</option><option value="brand">Brand Name</option></select></div></div>
<div class="form-row"><div class="form-group"><label>Insurance Coverage</label>
<select id="ins"><option value="good">Good Rx Coverage</option><option value="basic">Basic Coverage</option><option value="medicare-d">Medicare Part D</option><option value="none">No Insurance</option></select></div>
<div class="form-group"><label>Supply Duration</label>
<select id="supply"><option value="30">30-Day Supply</option><option value="90">90-Day Supply</option><option value="365">Annual (12 months)</option></select></div></div>
<button class="btn" onclick="calculate()">Compare Costs</button>
<div class="results" id="results"></div>`;

const drugs={cholesterol:{brand:350,generic:15,name:'Atorvastatin (Lipitor)'},
'blood-pressure':{brand:280,generic:12,name:'Lisinopril (Zestril)'},
diabetes:{brand:800,generic:60,name:'Insulin/Metformin'},
antidepressant:{brand:400,generic:20,name:'Sertraline (Zoloft)'},
antibiotic:{brand:120,generic:10,name:'Amoxicillin'},
pain:{brand:250,generic:8,name:'Ibuprofen/Naproxen'},
allergy:{brand:30,generic:8,name:'Cetirizine (Zyrtec)'},
'acid-reflux':{brand:300,generic:18,name:'Omeprazole (Prilosec)'},
thyroid:{brand:150,generic:12,name:'Levothyroxine (Synthroid)'},
'birth-control':{brand:80,generic:15,name:'Oral Contraceptive'}};

window.calculate=function(){
const d=drugs[document.getElementById('drug').value];
const type=document.getElementById('type').value;
const ins=document.getElementById('ins').value;
const supply=+document.getElementById('supply').value;
const months=supply/30;

let retailPrice=(type==='brand'?d.brand:d.generic)*months;
let copay=0,yourCost=0;
if(ins==='good'){copay=type==='brand'?35:10;yourCost=copay*months;}
else if(ins==='basic'){copay=type==='brand'?50:15;yourCost=copay*months;}
else if(ins==='medicare-d'){copay=type==='brand'?45:8;yourCost=copay*months;}
else{yourCost=retailPrice*0.85;}

let annualRetail=retailPrice*(365/supply);
let annualYou=yourCost*(365/supply);
let annualSavings=annualRetail-annualYou;

const r=document.getElementById('results');r.style.display='block';
r.innerHTML=`<h3>💊 ${d.name} — Cost Comparison</h3>
<div class="result-row"><span class="result-label">Retail Price (${supply}-day)</span><span class="result-value">$${retailPrice.toFixed(0)}</span></div>
<div class="result-row"><span class="result-label">Your Cost (${supply}-day)</span><span class="result-value highlight">$${yourCost.toFixed(0)}</span></div>
<div class="result-row"><span class="result-label">Annual Retail Cost</span><span class="result-value">$${annualRetail.toFixed(0)}</span></div>
<div class="result-row"><span class="result-label">Annual Your Cost</span><span class="result-value highlight">$${annualYou.toFixed(0)}</span></div>
<div class="result-row"><span class="result-label">Annual Savings</span><span class="result-value" style="color:#34c759">$${annualSavings.toFixed(0)}</span></div>
${type==='brand'?`<div style="margin-top:16px;padding:12px;background:#fff3e0;border-radius:8px;font-size:13px">💡 <strong>Tip:</strong> Switching to generic could save you $${((d.brand-d.generic)*12).toLocaleString()}/year!</div>`:''}
<div class="chart-container"><p style="font-weight:600;margin-bottom:12px">Brand vs Generic (Annual)</p>
<div class="bar" style="width:100%;background:#ff3b30">Brand: $${(d.brand*12).toLocaleString()}/yr</div>
<div class="bar" style="width:${d.generic/d.brand*100}%;background:#34c759;min-width:80px">Generic: $${(d.generic*12).toLocaleString()}/yr</div></div>`;};

document.getElementById('content').innerHTML=`<h2>How to Save on Prescription Drugs</h2>
<p>Americans spend over $370 billion annually on prescription drugs — the highest per-capita spending in the world. The average American fills 12 prescriptions per year, costing $1,300+ out of pocket.</p>
<h2>Top Money-Saving Strategies</h2>
<ul><li><strong>Always ask for generic:</strong> FDA requires generics to be therapeutically equivalent. Saves 80-85% on average.</li>
<li><strong>Use GoodRx or RxSaver:</strong> Free discount cards that can beat insurance copays</li>
<li><strong>90-day supplies:</strong> Often cheaper per-pill than 30-day fills</li>
<li><strong>Mail-order pharmacies:</strong> 20-40% cheaper than retail for maintenance meds</li>
<li><strong>Manufacturer coupons:</strong> Brand-name makers often offer copay cards ($0-$30/month)</li>
<li><strong>Patient assistance programs:</strong> Free meds for qualifying low-income patients</li>
<li><strong>Costco pharmacy:</strong> Open to non-members, often cheapest retail option</li>
<li><strong>Mark Cuban's Cost Plus Drugs:</strong> Transparent pricing, often 50-90% cheaper</li></ul>`;

document.getElementById('faq').innerHTML=`<h3 style="font-size:20px;font-weight:700;margin-bottom:16px">Prescription Drug FAQs</h3>
<details><summary>Are generic drugs safe?</summary><div class="faq-body">Yes. The FDA requires generic drugs to have the same active ingredient, strength, dosage form, and route of administration as the brand-name drug. They undergo rigorous testing for bioequivalence.</div></details>
<details><summary>Why are brand-name drugs so expensive?</summary><div class="faq-body">Brand-name drugs include R&D costs ($2.6 billion average per drug), marketing expenses, and patent protection that prevents competition. Once patents expire, generics enter the market at 80-85% lower prices.</div></details>
<details><summary>What is the Medicare Part D donut hole?</summary><div class="faq-body">The coverage gap where you pay a higher percentage of drug costs after initial coverage limit ($5,030 in 2026) until catastrophic coverage kicks in ($8,000). The Inflation Reduction Act is closing this gap.</div></details>`;

document.getElementById('related').innerHTML=`<h3>Related Calculators</h3><div class="related-grid">
<a href="/calc/medical-bill-estimator.html">💊 Medical Bill Estimator</a>
<a href="/calc/health-insurance-deductible.html">📋 Deductible Calculator</a>
<a href="/calc/therapy-cost-calculator.html">🧠 Therapy Cost</a>
<a href="/calc/dental-cost-calculator.html">🦷 Dental Cost</a></div>`;
})();
