#!/usr/bin/env node
// Build 50 state-specific student loan repayment calculator pages for SmartCalc
const fs = require('fs');
const path = require('path');

const states = [
  { abbr: 'AL', name: 'Alabama', avgDebt: 37338, avgSalary: 46479, costIdx: 87, forgiveness: 'Alabama Student Assistance Program (ASAP) for healthcare workers', rate: 5.50 },
  { abbr: 'AK', name: 'Alaska', avgDebt: 31955, avgSalary: 55847, costIdx: 125, forgiveness: 'Alaska WWAMI Medical Education Program loan repayment', rate: 5.50 },
  { abbr: 'AZ', name: 'Arizona', avgDebt: 25409, avgSalary: 49810, costIdx: 97, forgiveness: 'Arizona Teacher Student Loan Forgiveness Program', rate: 5.50 },
  { abbr: 'AR', name: 'Arkansas', avgDebt: 33452, avgSalary: 43150, costIdx: 86, forgiveness: 'Arkansas State Teacher Education Program (STEP)', rate: 5.50 },
  { abbr: 'CA', name: 'California', avgDebt: 22585, avgSalary: 62356, costIdx: 142, forgiveness: 'California Student Loan Repayment Program for healthcare, teachers & public defenders', rate: 5.50 },
  { abbr: 'CO', name: 'Colorado', avgDebt: 27820, avgSalary: 56680, costIdx: 105, forgiveness: 'Colorado Health Service Corps loan repayment', rate: 5.50 },
  { abbr: 'CT', name: 'Connecticut', avgDebt: 38650, avgSalary: 59980, costIdx: 115, forgiveness: 'Connecticut Health Professional Loan Repayment Program', rate: 5.50 },
  { abbr: 'DE', name: 'Delaware', avgDebt: 39750, avgSalary: 51150, costIdx: 104, forgiveness: 'Delaware State Loan Repayment Program for healthcare workers', rate: 5.50 },
  { abbr: 'FL', name: 'Florida', avgDebt: 24947, avgSalary: 48590, costIdx: 100, forgiveness: 'Florida Teacher Loan Forgiveness & Nursing Student Loan Forgiveness', rate: 5.50 },
  { abbr: 'GA', name: 'Georgia', avgDebt: 30984, avgSalary: 49620, costIdx: 93, forgiveness: 'Georgia HOPE & Zell Miller Scholarships, Teacher Loan Forgiveness', rate: 5.50 },
  { abbr: 'HI', name: 'Hawaii', avgDebt: 24554, avgSalary: 53200, costIdx: 192, forgiveness: 'Hawaii State Loan Repayment Program (SLRP) for healthcare workers', rate: 5.50 },
  { abbr: 'ID', name: 'Idaho', avgDebt: 28040, avgSalary: 44910, costIdx: 93, forgiveness: 'Idaho Rural Physician Incentive Program', rate: 5.50 },
  { abbr: 'IL', name: 'Illinois', avgDebt: 29855, avgSalary: 52740, costIdx: 96, forgiveness: 'Illinois Teachers and Child Care Providers Loan Repayment', rate: 5.50 },
  { abbr: 'IN', name: 'Indiana', avgDebt: 30340, avgSalary: 47150, costIdx: 90, forgiveness: 'Indiana Nursing Scholarship & Next Generation Hoosier Educators', rate: 5.50 },
  { abbr: 'IA', name: 'Iowa', avgDebt: 30045, avgSalary: 47190, costIdx: 90, forgiveness: 'Iowa Health Professional Recruitment Program', rate: 5.50 },
  { abbr: 'KS', name: 'Kansas', avgDebt: 28920, avgSalary: 46810, costIdx: 89, forgiveness: 'Kansas Bridging the Gap Program & Rural Opportunity Zones', rate: 5.50 },
  { abbr: 'KY', name: 'Kentucky', avgDebt: 29840, avgSalary: 43730, costIdx: 87, forgiveness: 'Kentucky Coal County Scholarship & Large Animal Veterinary Loan', rate: 5.50 },
  { abbr: 'LA', name: 'Louisiana', avgDebt: 27230, avgSalary: 44090, costIdx: 91, forgiveness: 'Louisiana State Loan Repayment Program for healthcare professionals', rate: 5.50 },
  { abbr: 'ME', name: 'Maine', avgDebt: 32450, avgSalary: 47610, costIdx: 101, forgiveness: 'Maine State Grant Program & Educators for Maine Program', rate: 5.50 },
  { abbr: 'MD', name: 'Maryland', avgDebt: 30950, avgSalary: 56570, costIdx: 113, forgiveness: 'Maryland Loan Assistance Repayment Program (LARP) for multiple professions', rate: 5.50 },
  { abbr: 'MA', name: 'Massachusetts', avgDebt: 33250, avgSalary: 62050, costIdx: 130, forgiveness: 'Massachusetts Loan Repayment Program for Health Professionals', rate: 5.50 },
  { abbr: 'MI', name: 'Michigan', avgDebt: 33150, avgSalary: 49150, costIdx: 91, forgiveness: 'Michigan State Loan Repayment Program & MI Student Aid', rate: 5.50 },
  { abbr: 'MN', name: 'Minnesota', avgDebt: 33800, avgSalary: 53350, costIdx: 99, forgiveness: 'Minnesota Rural Pharmacist & Health Professional Loan Forgiveness', rate: 5.50 },
  { abbr: 'MS', name: 'Mississippi', avgDebt: 31738, avgSalary: 39680, costIdx: 83, forgiveness: 'Mississippi Rural Dentists & Physicians Scholarship Programs', rate: 5.50 },
  { abbr: 'MO', name: 'Missouri', avgDebt: 29290, avgSalary: 46770, costIdx: 89, forgiveness: 'Missouri Primary Care Resource Initiative & Teacher Education Scholarship', rate: 5.50 },
  { abbr: 'MT', name: 'Montana', avgDebt: 27610, avgSalary: 45290, costIdx: 96, forgiveness: 'Montana Rural Physician Incentive Program', rate: 5.50 },
  { abbr: 'NE', name: 'Nebraska', avgDebt: 27190, avgSalary: 47820, costIdx: 91, forgiveness: 'Nebraska Loan Repayment Program for Rural Health Professionals', rate: 5.50 },
  { abbr: 'NV', name: 'Nevada', avgDebt: 22960, avgSalary: 47870, costIdx: 104, forgiveness: 'Nevada State Loan Repayment Program for healthcare workers', rate: 5.50 },
  { abbr: 'NH', name: 'New Hampshire', avgDebt: 39950, avgSalary: 52370, costIdx: 112, forgiveness: 'New Hampshire State Loan Repayment Program (SLRP)', rate: 5.50 },
  { abbr: 'NJ', name: 'New Jersey', avgDebt: 35447, avgSalary: 56340, costIdx: 120, forgiveness: 'New Jersey Primary Care Practitioner Loan Redemption & NJCLASS', rate: 5.50 },
  { abbr: 'NM', name: 'New Mexico', avgDebt: 22460, avgSalary: 44530, costIdx: 93, forgiveness: 'New Mexico Health Professional Loan Repayment & Teacher Loan Forgiveness', rate: 5.50 },
  { abbr: 'NY', name: 'New York', avgDebt: 31850, avgSalary: 57150, costIdx: 126, forgiveness: 'New York Get On Your Feet Loan Forgiveness & NYS LRAP for public service', rate: 5.50 },
  { abbr: 'NC', name: 'North Carolina', avgDebt: 29380, avgSalary: 48840, costIdx: 94, forgiveness: 'NC Teaching Fellows, NC Forgivable Education Loans for Service (FELS)', rate: 5.50 },
  { abbr: 'ND', name: 'North Dakota', avgDebt: 31830, avgSalary: 47750, costIdx: 91, forgiveness: 'North Dakota TEACH, Nurse, and Health Professional Loan Repayment', rate: 5.50 },
  { abbr: 'OH', name: 'Ohio', avgDebt: 30730, avgSalary: 48120, costIdx: 90, forgiveness: 'Ohio Physician Loan Repayment Program & Nurse Education Assistance', rate: 5.50 },
  { abbr: 'OK', name: 'Oklahoma', avgDebt: 27410, avgSalary: 44580, costIdx: 86, forgiveness: 'Oklahoma Physician Manpower Training Commission & Rural Medical Education', rate: 5.50 },
  { abbr: 'OR', name: 'Oregon', avgDebt: 29790, avgSalary: 51150, costIdx: 113, forgiveness: 'Oregon Health Care Provider Incentive & Educator Advancement Council', rate: 5.50 },
  { abbr: 'PA', name: 'Pennsylvania', avgDebt: 39027, avgSalary: 51150, costIdx: 98, forgiveness: 'Pennsylvania Primary Care Loan Repayment Program', rate: 5.50 },
  { abbr: 'RI', name: 'Rhode Island', avgDebt: 36500, avgSalary: 52540, costIdx: 113, forgiveness: 'Rhode Island Health Professional Loan Repayment Program', rate: 5.50 },
  { abbr: 'SC', name: 'South Carolina', avgDebt: 35490, avgSalary: 45230, costIdx: 92, forgiveness: 'SC Teacher Loan Program & Rural Physician & Nursing Programs', rate: 5.50 },
  { abbr: 'SD', name: 'South Dakota', avgDebt: 31250, avgSalary: 44050, costIdx: 92, forgiveness: 'South Dakota Health Professional Recruitment Incentive & Critical Teaching Needs', rate: 5.50 },
  { abbr: 'TN', name: 'Tennessee', avgDebt: 27000, avgSalary: 46350, costIdx: 89, forgiveness: 'Tennessee Graduate Nursing Loan Forgiveness & Minority Teaching Fellows', rate: 5.50 },
  { abbr: 'TX', name: 'Texas', avgDebt: 28240, avgSalary: 50490, costIdx: 92, forgiveness: 'Texas Physician Education Loan Repayment Program (PELRP) & TEACH Grant', rate: 5.50 },
  { abbr: 'UT', name: 'Utah', avgDebt: 19750, avgSalary: 48460, costIdx: 100, forgiveness: 'Utah Centennial Scholarship & UHEAA Loan Repayment for medical professionals', rate: 5.50 },
  { abbr: 'VT', name: 'Vermont', avgDebt: 36710, avgSalary: 48330, costIdx: 111, forgiveness: 'Vermont Educational Loan Repayment Program for healthcare in underserved areas', rate: 5.50 },
  { abbr: 'VA', name: 'Virginia', avgDebt: 30390, avgSalary: 53030, costIdx: 103, forgiveness: 'Virginia Loan Repayment Program for Behavioral Health & Teacher Scholarships', rate: 5.50 },
  { abbr: 'WA', name: 'Washington', avgDebt: 26630, avgSalary: 57480, costIdx: 110, forgiveness: 'Washington Health Professional Loan Repayment & Conditional Scholarship', rate: 5.50 },
  { abbr: 'WV', name: 'West Virginia', avgDebt: 29290, avgSalary: 40344, costIdx: 84, forgiveness: 'West Virginia Underwood-Smith Teacher Scholarship & Health Sciences Scholarship', rate: 5.50 },
  { abbr: 'WI', name: 'Wisconsin', avgDebt: 31705, avgSalary: 49080, costIdx: 93, forgiveness: 'Wisconsin Health Professions Loan Assistance & Minority Teacher Loan', rate: 5.50 },
  { abbr: 'WY', name: 'Wyoming', avgDebt: 24350, avgSalary: 48050, costIdx: 95, forgiveness: 'Wyoming Investment in Nursing Program & State Loan Repayment', rate: 5.50 },
];

const dir = path.join(__dirname, 'smartcalc');

function slug(name) {
  return name.toLowerCase().replace(/\s+/g, '-');
}

function fmt(n) {
  return n.toLocaleString('en-US');
}

function buildPage(st) {
  const sn = slug(st.name);
  const monthlyPayment = ((st.avgDebt * (st.rate/100/12)) / (1 - Math.pow(1 + st.rate/100/12, -120))).toFixed(0);
  const totalPaid = (monthlyPayment * 120);
  const totalInterest = totalPaid - st.avgDebt;
  const dtiRatio = ((monthlyPayment * 12 / st.avgSalary) * 100).toFixed(1);
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${st.name} Student Loan Repayment Calculator — SmartCalc</title>
<meta name="description" content="Calculate student loan payments in ${st.name}. Average debt: $${fmt(st.avgDebt)}. Compare repayment plans, find ${st.name} forgiveness programs, and estimate your monthly payments.">
<meta name="keywords" content="${st.name} student loan calculator, ${st.name} student debt, ${st.name} loan repayment, ${st.name} student loan forgiveness, ${st.abbr} student loans">
<link rel="canonical" href="https://alexchalu.github.io/smartcalc/student-loans-${sn}.html">
<meta property="og:title" content="${st.name} Student Loan Repayment Calculator — SmartCalc">
<meta property="og:description" content="Calculate student loan payments in ${st.name}. Average debt: $${fmt(st.avgDebt)}. Compare repayment plans and find forgiveness programs.">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎓</text></svg>">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3112605892426625" crossorigin="anonymous"></script>
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"WebApplication","name":"${st.name} Student Loan Repayment Calculator","description":"Calculate student loan payments in ${st.name}. Average debt: $${fmt(st.avgDebt)}. Compare repayment plans and forgiveness programs.","url":"https://alexchalu.github.io/smartcalc/student-loans-${sn}.html","applicationCategory":"FinanceApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}
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
.results{margin-top:2rem;display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:1rem}
.stat{background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:1rem;text-align:center}
.stat .val{font-size:1.4rem;font-weight:800;color:var(--accent)}
.stat .lbl{font-size:.8rem;color:var(--muted)}
.comparison{margin-top:2rem}
.comparison h3{font-size:1.1rem;margin-bottom:1rem}
table{width:100%;border-collapse:collapse;font-size:.9rem}
th,td{padding:.6rem .8rem;border:1px solid var(--border);text-align:left}
th{background:var(--surface2);font-weight:600;font-size:.8rem;color:var(--muted)}
td{background:var(--surface)}
.highlight{background:var(--glow) !important;font-weight:600}
.info-box{margin-top:2rem;padding:1.25rem;background:var(--surface2);border:1px solid var(--border);border-radius:var(--radius);border-left:4px solid var(--accent)}
.info-box h3{font-size:1rem;margin-bottom:.5rem;color:var(--accent)}
.info-box p,.info-box li{font-size:.9rem;color:var(--muted);line-height:1.7}
.info-box ul{margin:.5rem 0;padding-left:1.5rem}
.state-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin:2rem 0}
.ss{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:1.25rem;text-align:center}
.ss .num{font-size:1.6rem;font-weight:800;color:var(--accent)}
.ss .desc{font-size:.8rem;color:var(--muted);margin-top:.25rem}
.faq{margin-top:3rem;padding:2rem;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius)}
.faq h2{font-size:1.2rem;margin-bottom:1rem}
.faq h3{font-size:1rem;margin:1rem 0 .5rem;color:var(--accent)}
.faq p{color:var(--muted);font-size:.9rem;line-height:1.7}
.ad{max-width:900px;margin:1.5rem auto;padding:0 1.5rem}
.more{margin-top:2rem}
.more h2{font-size:1.2rem;margin-bottom:1rem}
.more-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:.75rem}
.more-grid a{display:block;padding:.75rem 1rem;background:var(--surface);border:1px solid var(--border);border-radius:8px;color:var(--accent);text-decoration:none;font-size:.9rem;font-weight:500}
.more-grid a:hover{border-color:var(--accent);background:var(--glow)}
footer{text-align:center;padding:2rem;color:var(--muted);font-size:.85rem;border-top:1px solid var(--border);margin-top:3rem}
footer a{color:var(--accent);text-decoration:none}
@media(max-width:640px){.row,.row3{grid-template-columns:1fr}.results{grid-template-columns:1fr 1fr}}
</style>
</head>
<body>
<header><div class="hi"><a href="index.html" class="logo">SmartCalc</a><span class="tag">${st.name} Student Loans</span><button class="tb" onclick="document.documentElement.dataset.theme=document.documentElement.dataset.theme==='light'?'':'light'">🌓</button></div></header>

<main>
<h1>🎓 ${st.name} Student Loan Repayment Calculator</h1>
<p class="sub">Calculate your student loan payments with ${st.name}-specific data. Average student debt in ${st.name}: <strong>$${fmt(st.avgDebt)}</strong>.</p>

<div class="state-stats">
<div class="ss"><div class="num">$${fmt(st.avgDebt)}</div><div class="desc">Avg Student Debt in ${st.abbr}</div></div>
<div class="ss"><div class="num">$${fmt(st.avgSalary)}</div><div class="desc">Avg Starting Salary</div></div>
<div class="ss"><div class="num">${st.costIdx}%</div><div class="desc">Cost of Living Index</div></div>
<div class="ss"><div class="num">${dtiRatio}%</div><div class="desc">Avg Debt-to-Income</div></div>
</div>

<div class="ad"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3112605892426625" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({})</script></div>

<div class="calc">
<div class="row">
<div class="field"><label class="label">Total Loan Balance ($)</label><input type="number" id="balance" value="${st.avgDebt}" min="1000" step="500"></div>
<div class="field"><label class="label">Interest Rate (%)</label><input type="number" id="rate" value="${st.rate}" min="0" max="15" step="0.01"></div>
</div>
<div class="row3">
<div class="field"><label class="label">Repayment Plan</label><select id="plan">
<option value="standard">Standard (10 yr)</option>
<option value="extended">Extended (25 yr)</option>
<option value="graduated">Graduated (10 yr)</option>
<option value="ibr">IBR Plan</option>
<option value="paye">PAYE Plan</option>
<option value="repaye">SAVE/REPAYE Plan</option>
</select></div>
<div class="field"><label class="label">Annual Income ($)</label><input type="number" id="income" value="${st.avgSalary}" min="0" step="1000"></div>
<div class="field"><label class="label">Family Size</label><select id="family"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option></select></div>
</div>
<div class="row">
<div class="field"><label class="label">Extra Monthly Payment ($)</label><input type="number" id="extra" value="0" min="0" step="25"></div>
<div class="field"><label class="label">Annual Salary Growth (%)</label><input type="number" id="salaryGrowth" value="3" min="0" max="10" step="0.5"></div>
</div>
<button class="btn" onclick="calculate()">Calculate Payments</button>

<div class="results" id="results" style="display:none">
<div class="stat"><div class="val" id="rMonthly">-</div><div class="lbl">Monthly Payment</div></div>
<div class="stat"><div class="val" id="rTotal">-</div><div class="lbl">Total Paid</div></div>
<div class="stat"><div class="val" id="rInterest">-</div><div class="lbl">Total Interest</div></div>
<div class="stat"><div class="val" id="rPayoff">-</div><div class="lbl">Payoff Time</div></div>
<div class="stat"><div class="val" id="rDTI">-</div><div class="lbl">Debt-to-Income</div></div>
<div class="stat"><div class="val" id="rForgiven">-</div><div class="lbl">Forgiven Amount</div></div>
</div>

<div class="comparison" id="compDiv" style="display:none">
<h3>📊 Repayment Plan Comparison</h3>
<table id="compTable">
<thead><tr><th>Plan</th><th>Monthly</th><th>Total Paid</th><th>Interest</th><th>Payoff</th><th>Forgiven</th></tr></thead>
<tbody id="compBody"></tbody>
</table>
</div>
</div>

<div class="info-box">
<h3>🏛️ ${st.name} Student Loan Forgiveness Programs</h3>
<p><strong>${st.forgiveness}.</strong></p>
<ul>
<li><strong>Federal PSLF:</strong> Work for a qualifying ${st.name} government or nonprofit employer for 10 years → remaining balance forgiven (tax-free)</li>
<li><strong>Income-Driven Forgiveness:</strong> After 20-25 years of IDR payments, remaining balance forgiven</li>
<li><strong>Teacher Loan Forgiveness:</strong> Up to $17,500 forgiven after 5 years teaching in low-income ${st.name} schools</li>
<li><strong>State Programs:</strong> ${st.forgiveness}</li>
</ul>
</div>

<div class="ad"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3112605892426625" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({})</script></div>

<div class="faq">
<h2>📋 Student Loans in ${st.name}: What You Need to Know</h2>
<h3>How much student debt does the average ${st.name} graduate have?</h3>
<p>The average student loan debt for ${st.name} graduates is approximately <strong>$${fmt(st.avgDebt)}</strong>, ${st.avgDebt > 30000 ? 'which is above' : st.avgDebt > 28000 ? 'which is near' : 'which is below'} the national average of ~$29,400. With an average starting salary of $${fmt(st.avgSalary)} and a cost of living index of ${st.costIdx}%, ${st.name} graduates ${st.costIdx > 100 ? 'face higher living costs that can make repayment more challenging' : 'benefit from lower living costs that can help accelerate repayment'}.</p>

<h3>What repayment plan is best for ${st.name} graduates?</h3>
<p>${st.avgSalary < 45000 ? 'Given lower average salaries in ' + st.name + ', income-driven plans (IBR, PAYE, SAVE) may offer significant payment relief.' : st.avgSalary > 55000 ? 'With relatively strong salaries in ' + st.name + ', the standard 10-year plan is often the most cost-effective option.' : 'For most ' + st.name + ' graduates, the standard 10-year plan offers the best balance of manageable payments and minimized interest.'} Use the calculator above to compare all options with your specific numbers.</p>

<h3>Can I get my student loans forgiven in ${st.name}?</h3>
<p>Yes! Besides federal programs (PSLF, Teacher Forgiveness), ${st.name} offers state-specific programs: <strong>${st.forgiveness}.</strong> Check eligibility requirements as they vary by profession and location within the state.</p>

<h3>How does ${st.name}'s cost of living affect repayment?</h3>
<p>${st.name}'s cost of living index is ${st.costIdx}% of the national average. ${st.costIdx > 110 ? 'This higher cost means less disposable income for loan payments. Consider income-driven plans or targeting higher-paying roles.' : st.costIdx < 90 ? 'This lower cost means more disposable income available for aggressive loan repayment. Consider making extra payments to save on interest.' : 'This moderate cost of living means standard repayment is usually manageable for most graduates.'}</p>
</div>

<div class="more">
<h2>More Student Loan Calculators by State</h2>
<div class="more-grid" id="moreStates"></div>
</div>

<div class="more" style="margin-top:1.5rem">
<h2>Related SmartCalc Tools</h2>
<div class="more-grid">
<a href="student-loan-calculator.html">📚 General Student Loan Calculator</a>
<a href="index.html">🏠 All SmartCalc Tools</a>
</div>
</div>
</main>

<footer>© 2026 <a href="index.html">SmartCalc</a> — Free ${st.name} Student Loan Calculator</footer>

<script>
const povertyLine={1:15060,2:20440,3:25820,4:31200};
function calcPlan(bal,rate,plan,income,family,extra,salGrowth){
  const r=rate/100/12;let b=bal,paid=0,months=0,forgiven=0;
  const poverty=povertyLine[family]||15060;
  const maxMonths=plan==='extended'?300:plan==='ibr'||plan==='paye'||plan==='repaye'?plan==='paye'?240:300:120;
  let curIncome=income;
  while(b>0.01&&months<maxMonths){
    months++;let pmt;
    if(plan==='standard'){pmt=bal*(r/(1-Math.pow(1+r,-120)));}
    else if(plan==='extended'){pmt=bal*(r/(1-Math.pow(1+r,-300)));}
    else if(plan==='graduated'){const yr=Math.floor(months/24);pmt=bal*(r/(1-Math.pow(1+r,-120)))*Math.pow(1.08,yr);}
    else{const disc=Math.max(0,curIncome-poverty*1.5);pmt=plan==='paye'||plan==='repaye'?disc*0.10/12:disc*0.15/12;const stdPmt=bal*(r/(1-Math.pow(1+r,-120)));if(plan!=='repaye')pmt=Math.min(pmt,stdPmt);pmt=Math.max(pmt,0);}
    pmt+=extra;const interest=b*r;if(pmt<interest&&(plan==='ibr'||plan==='paye'||plan==='repaye'))pmt=interest;
    pmt=Math.min(pmt,b+b*r);b=b+b*r-pmt;paid+=pmt;
    if(months%12===0)curIncome*=(1+salGrowth/100);
  }
  if(b>0.01){forgiven=b;b=0;}
  return{monthly:(paid/months),total:paid,interest:paid-bal,months,forgiven,payoff:months>=12?Math.floor(months/12)+'y '+(months%12)+'m':months+'m'};
}
function calculate(){
  const bal=+document.getElementById('balance').value;
  const rate=+document.getElementById('rate').value;
  const plan=document.getElementById('plan').value;
  const income=+document.getElementById('income').value;
  const family=+document.getElementById('family').value;
  const extra=+document.getElementById('extra').value;
  const sg=+document.getElementById('salaryGrowth').value;
  const r=calcPlan(bal,rate,plan,income,family,extra,sg);
  document.getElementById('results').style.display='grid';
  document.getElementById('rMonthly').textContent='$'+Math.round(r.monthly).toLocaleString();
  document.getElementById('rTotal').textContent='$'+Math.round(r.total).toLocaleString();
  document.getElementById('rInterest').textContent='$'+Math.round(r.interest).toLocaleString();
  document.getElementById('rPayoff').textContent=r.payoff;
  document.getElementById('rDTI').textContent=((r.monthly*12/income)*100).toFixed(1)+'%';
  document.getElementById('rForgiven').textContent=r.forgiven>0?'$'+Math.round(r.forgiven).toLocaleString():'$0';
  // comparison
  const plans=['standard','extended','graduated','ibr','paye','repaye'];
  const labels=['Standard (10yr)','Extended (25yr)','Graduated','IBR','PAYE','SAVE/REPAYE'];
  let html='';
  plans.forEach((p,i)=>{
    const c=calcPlan(bal,rate,p,income,family,extra,sg);
    const cls=p===plan?' class="highlight"':'';
    html+='<tr'+cls+'><td>'+labels[i]+'</td><td>$'+Math.round(c.monthly).toLocaleString()+'</td><td>$'+Math.round(c.total).toLocaleString()+'</td><td>$'+Math.round(c.interest).toLocaleString()+'</td><td>'+c.payoff+'</td><td>'+(c.forgiven>0?'$'+Math.round(c.forgiven).toLocaleString():'—')+'</td></tr>';
  });
  document.getElementById('compBody').innerHTML=html;
  document.getElementById('compDiv').style.display='block';
}
// nearby states
const allStates=${JSON.stringify(states.map(s=>({abbr:s.abbr,name:s.name,debt:s.avgDebt})))};
const curState='${st.abbr}';
const el=document.getElementById('moreStates');
allStates.filter(s=>s.abbr!==curState).sort(()=>Math.random()-.5).slice(0,8).forEach(s=>{
  const a=document.createElement('a');
  a.href='student-loans-'+s.name.toLowerCase().replace(/\\s+/g,'-')+'.html';
  a.textContent='🎓 '+s.name+' ($'+s.debt.toLocaleString()+')';
  el.appendChild(a);
});
calculate();
</script>
</body>
</html>`;
}

// Build index page
function buildIndex() {
  const sorted = [...states].sort((a,b) => b.avgDebt - a.avgDebt);
  const stateRows = states.map(st => {
    const sn = slug(st.name);
    return `<tr><td><a href="student-loans-${sn}.html" style="color:var(--accent);text-decoration:none;font-weight:600">${st.name}</a></td><td>$${fmt(st.avgDebt)}</td><td>$${fmt(st.avgSalary)}</td><td>${st.costIdx}%</td><td>${((((st.avgDebt * (st.rate/100/12)) / (1 - Math.pow(1 + st.rate/100/12, -120))) * 12 / st.avgSalary) * 100).toFixed(1)}%</td></tr>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Student Loan Calculator by State — All 50 States | SmartCalc</title>
<meta name="description" content="Compare student loan debt, repayment costs, and forgiveness programs across all 50 US states. Find your state's average debt and calculate payments.">
<link rel="canonical" href="https://alexchalu.github.io/smartcalc/student-loans.html">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎓</text></svg>">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3112605892426625" crossorigin="anonymous"></script>
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
h1{font-size:1.75rem;margin-bottom:.5rem}
.sub{color:var(--muted);margin-bottom:2rem;font-size:1rem}
.highlights{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem;margin:2rem 0}
.hl{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:1.25rem}
.hl h3{font-size:.9rem;color:var(--muted);margin-bottom:.5rem}
.hl .items{display:flex;flex-direction:column;gap:.4rem}
.hl .items a{color:var(--accent);text-decoration:none;font-size:.9rem;font-weight:500}
.hl .items a:hover{text-decoration:underline}
.search-box{margin:1.5rem 0}
.search-box input{width:100%;padding:.8rem 1rem;background:var(--surface2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-size:1rem;outline:none}
.search-box input:focus{border-color:var(--accent)}
table{width:100%;border-collapse:collapse;font-size:.9rem;margin-top:1rem}
th,td{padding:.6rem .8rem;border:1px solid var(--border);text-align:left}
th{background:var(--surface2);font-weight:600;font-size:.8rem;color:var(--muted);cursor:pointer}
th:hover{color:var(--accent)}
td{background:var(--surface)}
td a{font-weight:600}
.ad{max-width:1100px;margin:1.5rem auto;padding:0 1.5rem}
footer{text-align:center;padding:2rem;color:var(--muted);font-size:.85rem;border-top:1px solid var(--border);margin-top:3rem}
footer a{color:var(--accent);text-decoration:none}
</style>
</head>
<body>
<header><div class="hi"><a href="index.html" class="logo">SmartCalc</a><span class="tag">Student Loans by State</span><button class="tb" onclick="document.documentElement.dataset.theme=document.documentElement.dataset.theme==='light'?'':'light'">🌓</button></div></header>
<main>
<h1>🎓 Student Loan Calculator by State — All 50 States</h1>
<p class="sub">Compare student loan debt, monthly payments, and forgiveness programs across every US state. Click any state for a detailed calculator with repayment plan comparisons.</p>

<div class="highlights">
<div class="hl"><h3>📈 Highest Average Debt</h3><div class="items">${sorted.slice(0,5).map(s=>`<a href="student-loans-${slug(s.name)}.html">${s.name} — $${fmt(s.avgDebt)}</a>`).join('')}</div></div>
<div class="hl"><h3>📉 Lowest Average Debt</h3><div class="items">${sorted.slice(-5).reverse().map(s=>`<a href="student-loans-${slug(s.name)}.html">${s.name} — $${fmt(s.avgDebt)}</a>`).join('')}</div></div>
<div class="hl"><h3>💰 Highest Avg Salary</h3><div class="items">${[...states].sort((a,b)=>b.avgSalary-a.avgSalary).slice(0,5).map(s=>`<a href="student-loans-${slug(s.name)}.html">${s.name} — $${fmt(s.avgSalary)}</a>`).join('')}</div></div>
<div class="hl"><h3>🏠 Lowest Cost of Living</h3><div class="items">${[...states].sort((a,b)=>a.costIdx-b.costIdx).slice(0,5).map(s=>`<a href="student-loans-${slug(s.name)}.html">${s.name} — ${s.costIdx}%</a>`).join('')}</div></div>
</div>

<div class="ad"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3112605892426625" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({})</script></div>

<div class="search-box"><input type="text" id="search" placeholder="🔍 Search states..." oninput="filterStates()"></div>

<table>
<thead><tr><th onclick="sortTable(0)">State ↕</th><th onclick="sortTable(1)">Avg Debt ↕</th><th onclick="sortTable(2)">Avg Salary ↕</th><th onclick="sortTable(3)">Cost Index ↕</th><th onclick="sortTable(4)">DTI Ratio ↕</th></tr></thead>
<tbody id="stateTable">${stateRows}</tbody>
</table>

<div class="ad" style="margin-top:2rem"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3112605892426625" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({})</script></div>
</main>
<footer>© 2026 <a href="index.html">SmartCalc</a> — Student Loan Calculators for All 50 States</footer>
<script>
function filterStates(){const q=document.getElementById('search').value.toLowerCase();document.querySelectorAll('#stateTable tr').forEach(r=>{r.style.display=r.textContent.toLowerCase().includes(q)?'':'none'});}
let sortDir={};
function sortTable(col){const tb=document.getElementById('stateTable');const rows=[...tb.rows];sortDir[col]=!sortDir[col];rows.sort((a,b)=>{let av=a.cells[col].textContent.replace(/[^0-9.-]/g,''),bv=b.cells[col].textContent.replace(/[^0-9.-]/g,'');if(col===0){av=a.cells[0].textContent;bv=b.cells[0].textContent;return sortDir[col]?av.localeCompare(bv):bv.localeCompare(av);}return sortDir[col]?+av-+bv:+bv-+av;});rows.forEach(r=>tb.appendChild(r));}
</script>
</body>
</html>`;
}

// Generate all pages
let count = 0;
states.forEach(st => {
  const sn = slug(st.name);
  const html = buildPage(st);
  fs.writeFileSync(path.join(dir, `student-loans-${sn}.html`), html);
  count++;
});

// Generate index
fs.writeFileSync(path.join(dir, 'student-loans.html'), buildIndex());
count++;

console.log(`Built ${count} student loan pages`);

// Update sitemap
const sitemapPath = path.join(dir, 'sitemap.xml');
let sitemap = fs.readFileSync(sitemapPath, 'utf8');
const today = new Date().toISOString().split('T')[0];

// Add new URLs before closing tag
let newUrls = `<url><loc>https://alexchalu.github.io/smartcalc/student-loans.html</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>\n`;
states.forEach(st => {
  const sn = slug(st.name);
  newUrls += `<url><loc>https://alexchalu.github.io/smartcalc/student-loans-${sn}.html</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>\n`;
});

if (!sitemap.includes('student-loans.html')) {
  sitemap = sitemap.replace('</urlset>', newUrls + '</urlset>');
  fs.writeFileSync(sitemapPath, sitemap);
  const urlCount = (sitemap.match(/<url>/g) || []).length;
  console.log(`Sitemap updated: ${urlCount} total URLs`);
}
