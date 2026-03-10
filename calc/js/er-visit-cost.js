(function(){
const c=document.getElementById('calculator');
c.innerHTML=`<h2 style="font-size:20px;font-weight:700;margin-bottom:20px">Emergency Room vs Urgent Care Cost</h2>
<div class="form-row"><div class="form-group"><label>Reason for Visit</label>
<select id="reason"><option value="chest-pain">Chest Pain / Heart</option><option value="broken-bone">Broken Bone / Fracture</option><option value="laceration">Cut / Laceration</option><option value="fever">High Fever</option><option value="infection">Infection / UTI</option><option value="sprain">Sprain / Strain</option><option value="headache">Severe Headache</option><option value="abdominal">Abdominal Pain</option><option value="breathing">Difficulty Breathing</option><option value="allergic">Allergic Reaction</option></select></div>
<div class="form-group"><label>Insurance</label>
<select id="ins"><option value="insured">Insured (met deductible)</option><option value="deductible">Insured (deductible not met)</option><option value="none">Uninsured</option></select></div></div>
<button class="btn" onclick="calculate()">Compare Costs</button>
<div class="results" id="results"></div>`;

const costs={'chest-pain':{er:8500,uc:null,erOnly:true},'broken-bone':{er:4200,uc:350},'laceration':{er:2800,uc:250},fever:{er:2200,uc:200},infection:{er:2000,uc:180},sprain:{er:2500,uc:220},headache:{er:3200,uc:280},abdominal:{er:5500,uc:null,erOnly:true},breathing:{er:6000,uc:null,erOnly:true},allergic:{er:3800,uc:350}};

window.calculate=function(){
const d=costs[document.getElementById('reason').value];
const ins=document.getElementById('ins').value;
let erCost=d.er,ucCost=d.uc;
let yourER=erCost,yourUC=ucCost;
if(ins==='insured'){yourER=erCost*0.2;yourUC=ucCost?ucCost*0.2:null;}
else if(ins==='deductible'){yourER=erCost*0.7;yourUC=ucCost?ucCost*0.7:null;}
else{yourER=erCost*0.65;yourUC=ucCost?ucCost*0.65:null;}

const r=document.getElementById('results');r.style.display='block';
let html=`<h3>🚑 Cost Comparison</h3>
<div class="result-row"><span class="result-label">ER Total Charge</span><span class="result-value">$${erCost.toLocaleString()}</span></div>
<div class="result-row"><span class="result-label">Your ER Cost</span><span class="result-value highlight" style="color:#ff3b30">$${yourER.toLocaleString(undefined,{maximumFractionDigits:0})}</span></div>`;
if(ucCost){
const savings=yourER-yourUC;
html+=`<div class="result-row"><span class="result-label">Urgent Care Charge</span><span class="result-value">$${ucCost.toLocaleString()}</span></div>
<div class="result-row"><span class="result-label">Your Urgent Care Cost</span><span class="result-value highlight" style="color:#34c759">$${yourUC.toLocaleString(undefined,{maximumFractionDigits:0})}</span></div>
<div class="result-row"><span class="result-label">You Save by Choosing Urgent Care</span><span class="result-value" style="color:#34c759;font-size:20px">$${savings.toLocaleString(undefined,{maximumFractionDigits:0})}</span></div>
<div class="chart-container"><p style="font-weight:600;margin-bottom:12px">ER vs Urgent Care</p>
<div class="bar" style="width:100%;background:#ff3b30">ER: $${yourER.toLocaleString(undefined,{maximumFractionDigits:0})}</div>
<div class="bar" style="width:${yourUC/yourER*100}%;background:#34c759;min-width:80px">Urgent Care: $${yourUC.toLocaleString(undefined,{maximumFractionDigits:0})}</div></div>`;}
else{html+=`<div style="margin-top:16px;padding:12px;background:#ffebee;border-radius:8px;font-size:14px">⚠️ <strong>ER recommended.</strong> This condition typically requires emergency department evaluation and is not suitable for urgent care.</div>`;}
r.innerHTML=html;};

document.getElementById('content').innerHTML=`<h2>ER vs Urgent Care: When to Go Where</h2>
<p>The average ER visit costs $2,200 — nearly 10x the cost of urgent care ($250). Choosing the right facility can save you thousands.</p>
<h2>Go to the ER for:</h2><ul><li>Chest pain or suspected heart attack</li><li>Difficulty breathing</li><li>Severe abdominal pain</li><li>Head injuries or loss of consciousness</li><li>Stroke symptoms (face drooping, arm weakness, speech difficulty)</li><li>Severe allergic reactions (anaphylaxis)</li><li>Heavy bleeding that won't stop</li></ul>
<h2>Urgent Care is Fine for:</h2><ul><li>Minor cuts and lacerations</li><li>Sprains and strains</li><li>Fever or flu symptoms</li><li>Urinary tract infections</li><li>Minor fractures</li><li>Ear infections</li><li>Rashes and skin conditions</li></ul>`;

document.getElementById('faq').innerHTML=`<h3 style="font-size:20px;font-weight:700;margin-bottom:16px">FAQs</h3>
<details><summary>Why are ER visits so expensive?</summary><div class="faq-body">ER facility fees ($1,000-$3,000 just to walk in), 24/7 staffing, specialized equipment, and legal requirements to treat everyone regardless of ability to pay all drive costs up.</div></details>
<details><summary>Can urgent care handle broken bones?</summary><div class="faq-body">Yes, many urgent cares have X-ray capabilities and can treat simple fractures. Complex fractures or open fractures still need the ER.</div></details>`;

document.getElementById('related').innerHTML=`<h3>Related Calculators</h3><div class="related-grid">
<a href="/calc/medical-bill-estimator.html">💊 Medical Bill Estimator</a>
<a href="/calc/surgery-cost-calculator.html">🏥 Surgery Cost</a>
<a href="/calc/health-insurance-deductible.html">📋 Deductible Calculator</a></div>`;
})();
