#!/usr/bin/env node
// Build 50-state solar panel ROI calculators for SmartCalc
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'smartcalc', 'solar');
fs.mkdirSync(outDir, { recursive: true });

const states = [
  { name: 'Alabama', slug: 'alabama', abbr: 'AL', avgSunHrs: 4.8, elecRate: 0.138, avgSystem: 22000, stateCredit: 0, netMetering: 'Limited', avgBill: 155, icon: '🏠' },
  { name: 'Alaska', slug: 'alaska', abbr: 'AK', avgSunHrs: 3.2, elecRate: 0.237, avgSystem: 24000, stateCredit: 0, netMetering: 'Yes', avgBill: 145, icon: '🏔️' },
  { name: 'Arizona', slug: 'arizona', abbr: 'AZ', avgSunHrs: 6.5, elecRate: 0.136, avgSystem: 20000, stateCredit: 0.10, netMetering: 'Yes', avgBill: 145, icon: '🌵' },
  { name: 'Arkansas', slug: 'arkansas', abbr: 'AR', avgSunHrs: 4.9, elecRate: 0.118, avgSystem: 21000, stateCredit: 0, netMetering: 'Yes', avgBill: 120, icon: '🏠' },
  { name: 'California', slug: 'california', abbr: 'CA', avgSunHrs: 5.8, elecRate: 0.285, avgSystem: 22000, stateCredit: 0, netMetering: 'NEM 3.0', avgBill: 215, icon: '🌴' },
  { name: 'Colorado', slug: 'colorado', abbr: 'CO', avgSunHrs: 5.5, elecRate: 0.145, avgSystem: 21000, stateCredit: 0, netMetering: 'Yes', avgBill: 110, icon: '⛰️' },
  { name: 'Connecticut', slug: 'connecticut', abbr: 'CT', avgSunHrs: 4.2, elecRate: 0.268, avgSystem: 26000, stateCredit: 0, netMetering: 'Yes', avgBill: 180, icon: '🏠' },
  { name: 'Delaware', slug: 'delaware', abbr: 'DE', avgSunHrs: 4.5, elecRate: 0.145, avgSystem: 23000, stateCredit: 0, netMetering: 'Yes', avgBill: 125, icon: '🏖️' },
  { name: 'Florida', slug: 'florida', abbr: 'FL', avgSunHrs: 5.6, elecRate: 0.145, avgSystem: 20000, stateCredit: 0, netMetering: 'Yes', avgBill: 155, icon: '🌊' },
  { name: 'Georgia', slug: 'georgia', abbr: 'GA', avgSunHrs: 5.0, elecRate: 0.135, avgSystem: 21000, stateCredit: 0, netMetering: 'Limited', avgBill: 140, icon: '🍑' },
  { name: 'Hawaii', slug: 'hawaii', abbr: 'HI', avgSunHrs: 5.4, elecRate: 0.430, avgSystem: 25000, stateCredit: 0.35, netMetering: 'CSS', avgBill: 185, icon: '🌺' },
  { name: 'Idaho', slug: 'idaho', abbr: 'ID', avgSunHrs: 4.8, elecRate: 0.105, avgSystem: 21000, stateCredit: 0.40, netMetering: 'Yes', avgBill: 100, icon: '🥔' },
  { name: 'Illinois', slug: 'illinois', abbr: 'IL', avgSunHrs: 4.3, elecRate: 0.155, avgSystem: 23000, stateCredit: 0, netMetering: 'Yes', avgBill: 115, icon: '🌽' },
  { name: 'Indiana', slug: 'indiana', abbr: 'IN', avgSunHrs: 4.2, elecRate: 0.142, avgSystem: 22000, stateCredit: 0, netMetering: 'Limited', avgBill: 130, icon: '🏠' },
  { name: 'Iowa', slug: 'iowa', abbr: 'IA', avgSunHrs: 4.4, elecRate: 0.135, avgSystem: 22000, stateCredit: 0.15, netMetering: 'Yes', avgBill: 120, icon: '🌾' },
  { name: 'Kansas', slug: 'kansas', abbr: 'KS', avgSunHrs: 5.1, elecRate: 0.138, avgSystem: 21000, stateCredit: 0, netMetering: 'Yes', avgBill: 130, icon: '🌻' },
  { name: 'Kentucky', slug: 'kentucky', abbr: 'KY', avgSunHrs: 4.3, elecRate: 0.122, avgSystem: 22000, stateCredit: 0, netMetering: 'Yes', avgBill: 125, icon: '🐎' },
  { name: 'Louisiana', slug: 'louisiana', abbr: 'LA', avgSunHrs: 5.0, elecRate: 0.118, avgSystem: 21000, stateCredit: 0, netMetering: 'Yes', avgBill: 130, icon: '⚜️' },
  { name: 'Maine', slug: 'maine', abbr: 'ME', avgSunHrs: 4.1, elecRate: 0.225, avgSystem: 25000, stateCredit: 0, netMetering: 'Yes', avgBill: 115, icon: '🦞' },
  { name: 'Maryland', slug: 'maryland', abbr: 'MD', avgSunHrs: 4.5, elecRate: 0.155, avgSystem: 23000, stateCredit: 0, netMetering: 'Yes', avgBill: 135, icon: '🦀' },
  { name: 'Massachusetts', slug: 'massachusetts', abbr: 'MA', avgSunHrs: 4.2, elecRate: 0.285, avgSystem: 27000, stateCredit: 0.15, netMetering: 'Yes', avgBill: 160, icon: '🏠' },
  { name: 'Michigan', slug: 'michigan', abbr: 'MI', avgSunHrs: 3.8, elecRate: 0.175, avgSystem: 23000, stateCredit: 0, netMetering: 'Yes', avgBill: 125, icon: '🏠' },
  { name: 'Minnesota', slug: 'minnesota', abbr: 'MN', avgSunHrs: 4.2, elecRate: 0.145, avgSystem: 23000, stateCredit: 0, netMetering: 'Yes', avgBill: 115, icon: '❄️' },
  { name: 'Mississippi', slug: 'mississippi', abbr: 'MS', avgSunHrs: 4.9, elecRate: 0.128, avgSystem: 21000, stateCredit: 0, netMetering: 'Limited', avgBill: 135, icon: '🏠' },
  { name: 'Missouri', slug: 'missouri', abbr: 'MO', avgSunHrs: 4.6, elecRate: 0.125, avgSystem: 21000, stateCredit: 0, netMetering: 'Yes', avgBill: 130, icon: '🏠' },
  { name: 'Montana', slug: 'montana', abbr: 'MT', avgSunHrs: 4.6, elecRate: 0.118, avgSystem: 22000, stateCredit: 0, netMetering: 'Yes', avgBill: 105, icon: '🏔️' },
  { name: 'Nebraska', slug: 'nebraska', abbr: 'NE', avgSunHrs: 4.8, elecRate: 0.118, avgSystem: 21000, stateCredit: 0, netMetering: 'Limited', avgBill: 115, icon: '🌽' },
  { name: 'Nevada', slug: 'nevada', abbr: 'NV', avgSunHrs: 6.2, elecRate: 0.128, avgSystem: 20000, stateCredit: 0, netMetering: 'Yes', avgBill: 130, icon: '🎰' },
  { name: 'New Hampshire', slug: 'new-hampshire', abbr: 'NH', avgSunHrs: 4.1, elecRate: 0.235, avgSystem: 26000, stateCredit: 0, netMetering: 'Yes', avgBill: 130, icon: '🏔️' },
  { name: 'New Jersey', slug: 'new-jersey', abbr: 'NJ', avgSunHrs: 4.4, elecRate: 0.175, avgSystem: 24000, stateCredit: 0, netMetering: 'Yes', avgBill: 120, icon: '🏖️' },
  { name: 'New Mexico', slug: 'new-mexico', abbr: 'NM', avgSunHrs: 6.3, elecRate: 0.138, avgSystem: 20000, stateCredit: 0.10, netMetering: 'Yes', avgBill: 95, icon: '🌵' },
  { name: 'New York', slug: 'new-york', abbr: 'NY', avgSunHrs: 4.0, elecRate: 0.225, avgSystem: 26000, stateCredit: 0.25, netMetering: 'Yes', avgBill: 130, icon: '🗽' },
  { name: 'North Carolina', slug: 'north-carolina', abbr: 'NC', avgSunHrs: 5.0, elecRate: 0.128, avgSystem: 21000, stateCredit: 0, netMetering: 'Yes', avgBill: 125, icon: '🏠' },
  { name: 'North Dakota', slug: 'north-dakota', abbr: 'ND', avgSunHrs: 4.5, elecRate: 0.118, avgSystem: 22000, stateCredit: 0, netMetering: 'Yes', avgBill: 115, icon: '🌾' },
  { name: 'Ohio', slug: 'ohio', abbr: 'OH', avgSunHrs: 3.9, elecRate: 0.145, avgSystem: 22000, stateCredit: 0, netMetering: 'Yes', avgBill: 120, icon: '🏠' },
  { name: 'Oklahoma', slug: 'oklahoma', abbr: 'OK', avgSunHrs: 5.2, elecRate: 0.118, avgSystem: 21000, stateCredit: 0, netMetering: 'Limited', avgBill: 125, icon: '🏠' },
  { name: 'Oregon', slug: 'oregon', abbr: 'OR', avgSunHrs: 4.0, elecRate: 0.125, avgSystem: 23000, stateCredit: 0, netMetering: 'Yes', avgBill: 115, icon: '🌲' },
  { name: 'Pennsylvania', slug: 'pennsylvania', abbr: 'PA', avgSunHrs: 4.1, elecRate: 0.155, avgSystem: 23000, stateCredit: 0, netMetering: 'Yes', avgBill: 130, icon: '🔔' },
  { name: 'Rhode Island', slug: 'rhode-island', abbr: 'RI', avgSunHrs: 4.2, elecRate: 0.265, avgSystem: 26000, stateCredit: 0, netMetering: 'Yes', avgBill: 130, icon: '🏠' },
  { name: 'South Carolina', slug: 'south-carolina', abbr: 'SC', avgSunHrs: 5.1, elecRate: 0.138, avgSystem: 21000, stateCredit: 0.25, netMetering: 'Yes', avgBill: 145, icon: '🌴' },
  { name: 'South Dakota', slug: 'south-dakota', abbr: 'SD', avgSunHrs: 4.8, elecRate: 0.125, avgSystem: 22000, stateCredit: 0, netMetering: 'Yes', avgBill: 120, icon: '🏔️' },
  { name: 'Tennessee', slug: 'tennessee', abbr: 'TN', avgSunHrs: 4.6, elecRate: 0.118, avgSystem: 21000, stateCredit: 0, netMetering: 'Limited', avgBill: 130, icon: '🎸' },
  { name: 'Texas', slug: 'texas', abbr: 'TX', avgSunHrs: 5.5, elecRate: 0.138, avgSystem: 20000, stateCredit: 0, netMetering: 'Varies', avgBill: 145, icon: '🤠' },
  { name: 'Utah', slug: 'utah', abbr: 'UT', avgSunHrs: 5.5, elecRate: 0.115, avgSystem: 21000, stateCredit: 0, netMetering: 'Yes', avgBill: 95, icon: '🏔️' },
  { name: 'Vermont', slug: 'vermont', abbr: 'VT', avgSunHrs: 3.9, elecRate: 0.205, avgSystem: 25000, stateCredit: 0, netMetering: 'Yes', avgBill: 110, icon: '🍁' },
  { name: 'Virginia', slug: 'virginia', abbr: 'VA', avgSunHrs: 4.6, elecRate: 0.138, avgSystem: 22000, stateCredit: 0, netMetering: 'Yes', avgBill: 135, icon: '🏠' },
  { name: 'Washington', slug: 'washington', abbr: 'WA', avgSunHrs: 3.6, elecRate: 0.115, avgSystem: 23000, stateCredit: 0, netMetering: 'Yes', avgBill: 105, icon: '🌲' },
  { name: 'West Virginia', slug: 'west-virginia', abbr: 'WV', avgSunHrs: 4.1, elecRate: 0.125, avgSystem: 22000, stateCredit: 0, netMetering: 'Yes', avgBill: 130, icon: '⛰️' },
  { name: 'Wisconsin', slug: 'wisconsin', abbr: 'WI', avgSunHrs: 4.0, elecRate: 0.155, avgSystem: 23000, stateCredit: 0, netMetering: 'Yes', avgBill: 115, icon: '🧀' },
  { name: 'Wyoming', slug: 'wyoming', abbr: 'WY', avgSunHrs: 5.2, elecRate: 0.118, avgSystem: 22000, stateCredit: 0, netMetering: 'Yes', avgBill: 110, icon: '🏔️' },
];

const federalCredit = 0.30; // 30% ITC through 2032

function buildStatePage(state) {
  const afterFederal = state.avgSystem * (1 - federalCredit);
  const afterState = afterFederal * (1 - state.stateCredit);
  const annualProd = state.avgSunHrs * 365 * 0.8; // kWh per kW, ~6kW system
  const systemKw = 6;
  const annualKwh = annualProd * systemKw;
  const annualSavings = annualKwh * state.elecRate;
  const paybackYears = afterState / annualSavings;
  const roi25 = ((annualSavings * 25 - afterState) / afterState * 100).toFixed(0);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${state.name} Solar Panel Calculator 2026 — ROI, Savings & Payback | SmartCalc</title>
<meta name="description" content="Calculate solar panel savings in ${state.name}. ${state.avgSunHrs} peak sun hours, $${state.elecRate.toFixed(3)}/kWh electricity. Estimate ROI, payback period, and 25-year savings with federal + state incentives.">
<meta name="keywords" content="${state.name} solar panels, ${state.name} solar calculator, ${state.abbr} solar ROI, solar panel cost ${state.name}, solar savings ${state.name}, ${state.name} solar incentives">
<link rel="canonical" href="https://alexchalu.github.io/smartcalc/solar/${state.slug}.html">
<meta property="og:title" content="${state.name} Solar Panel Calculator 2026">
<meta property="og:description" content="Calculate solar ROI in ${state.name}. ${state.avgSunHrs}h sun, $${state.elecRate.toFixed(3)}/kWh. Free calculator.">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>☀️</text></svg>">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3112605892426625" crossorigin="anonymous"></script>
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"WebApplication","name":"${state.name} Solar Panel Calculator","description":"Calculate solar panel ROI and savings in ${state.name}","url":"https://alexchalu.github.io/smartcalc/solar/${state.slug}.html","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}
</script>
<style>
:root{--bg:#0a0e1a;--surface:#111827;--surface2:#1f2937;--border:#374151;--text:#f3f4f6;--muted:#9ca3af;--accent:#f59e0b;--accent2:#d97706;--green:#10b981;--red:#ef4444;--glow:rgba(245,158,11,0.12);--radius:12px;--shadow:0 4px 24px rgba(0,0,0,0.4)}
[data-theme="light"]{--bg:#f9fafb;--surface:#fff;--surface2:#f3f4f6;--border:#e5e7eb;--text:#1f2937;--muted:#6b7280;--shadow:0 4px 24px rgba(0,0,0,0.06)}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:var(--bg);color:var(--text);line-height:1.6}
header{background:var(--surface);border-bottom:1px solid var(--border);padding:1rem 1.5rem;position:sticky;top:0;z-index:100}
.header-inner{max-width:900px;margin:0 auto;display:flex;align-items:center;gap:1rem}
.logo{font-size:1.3rem;font-weight:800;color:var(--accent);text-decoration:none}
.nav{color:var(--muted);font-size:.85rem;flex:1}
.nav a{color:var(--accent);text-decoration:none}
.theme-btn{background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:.4rem .6rem;font-size:1rem;cursor:pointer}
main{max-width:900px;margin:0 auto;padding:2rem 1.5rem}
h1{font-size:1.8rem;margin-bottom:.5rem}
.subtitle{color:var(--muted);margin-bottom:2rem;font-size:1rem}
.stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:1rem;margin-bottom:2rem}
.stat{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:1.25rem;text-align:center}
.stat .label{color:var(--muted);font-size:.8rem;text-transform:uppercase;letter-spacing:.05em}
.stat .value{font-size:1.6rem;font-weight:800;color:var(--accent);margin-top:.25rem}
.stat .detail{color:var(--muted);font-size:.75rem;margin-top:.25rem}
.calc-section{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:2rem;margin-bottom:2rem}
.calc-section h2{font-size:1.2rem;margin-bottom:1.25rem;display:flex;align-items:center;gap:.5rem}
.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.form-group{display:flex;flex-direction:column;gap:.35rem}
.form-group label{font-size:.85rem;font-weight:600;color:var(--muted)}
.form-group input,.form-group select{background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:.65rem .85rem;color:var(--text);font-size:1rem;outline:none}
.form-group input:focus,.form-group select:focus{border-color:var(--accent)}
.btn{background:linear-gradient(135deg,var(--accent),var(--accent2));color:#000;border:none;border-radius:8px;padding:.85rem 1.5rem;font-size:1rem;font-weight:700;cursor:pointer;width:100%;margin-top:1rem;transition:.2s}
.btn:hover{transform:translateY(-1px);box-shadow:0 4px 20px rgba(245,158,11,0.3)}
.results{margin-top:1.5rem;display:none}
.results.show{display:block}
.result-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin-bottom:1.5rem}
.r-card{background:var(--surface2);border-radius:var(--radius);padding:1.25rem;text-align:center}
.r-card .r-label{font-size:.8rem;color:var(--muted);text-transform:uppercase}
.r-card .r-value{font-size:1.5rem;font-weight:800;margin-top:.25rem}
.r-card .r-value.green{color:var(--green)}
.r-card .r-value.accent{color:var(--accent)}
.breakdown{width:100%;border-collapse:collapse;margin-top:1rem}
.breakdown th,.breakdown td{padding:.65rem .85rem;text-align:left;border-bottom:1px solid var(--border);font-size:.9rem}
.breakdown th{color:var(--muted);font-size:.8rem;text-transform:uppercase}
.breakdown tr:hover{background:var(--surface2)}
.info-section{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:2rem;margin-bottom:2rem}
.info-section h2{font-size:1.2rem;margin-bottom:1rem}
.info-section h3{font-size:1rem;margin:1.25rem 0 .5rem;color:var(--accent)}
.info-section p,.info-section li{color:var(--muted);font-size:.9rem;margin-bottom:.5rem}
.info-section ul{padding-left:1.25rem}
.cta-box{background:linear-gradient(135deg,rgba(245,158,11,0.1),rgba(16,185,129,0.1));border:1px solid var(--accent);border-radius:var(--radius);padding:1.5rem;text-align:center;margin:2rem 0}
.cta-box h3{color:var(--accent);margin-bottom:.5rem}
.ad-slot{max-width:900px;margin:1rem auto;padding:0 1.5rem}
footer{text-align:center;padding:2rem;color:var(--muted);font-size:.85rem;border-top:1px solid var(--border);margin-top:3rem}
footer a{color:var(--accent);text-decoration:none}
.state-links{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:1rem}
.state-links a{color:var(--accent);text-decoration:none;font-size:.8rem;padding:.2rem .5rem;background:var(--surface2);border-radius:4px}
.state-links a:hover{background:var(--accent);color:#000}
@media(max-width:600px){.form-grid{grid-template-columns:1fr}.stats-grid{grid-template-columns:1fr 1fr}}
</style>
</head>
<body>
<header><div class="header-inner">
<a href="../" class="logo">☀️ SmartCalc</a>
<p class="nav"><a href="./">Solar Calculators</a> › ${state.name}</p>
<button class="theme-btn" id="themeBtn">🌙</button>
</div></header>

<div class="ad-slot"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3112605892426625" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div>

<main>
<h1>${state.icon} ${state.name} Solar Panel Calculator 2026</h1>
<p class="subtitle">Calculate your solar panel ROI, payback period, and 25-year savings in ${state.name}. Includes federal ITC + ${state.stateCredit > 0 ? state.name + ' state incentives' : 'available incentives'}.</p>

<div class="stats-grid">
<div class="stat"><div class="label">Peak Sun Hours</div><div class="value">${state.avgSunHrs}h</div><div class="detail">daily average</div></div>
<div class="stat"><div class="label">Electricity Rate</div><div class="value">$${state.elecRate.toFixed(3)}</div><div class="detail">per kWh</div></div>
<div class="stat"><div class="label">Avg System Cost</div><div class="value">$${(state.avgSystem/1000).toFixed(0)}K</div><div class="detail">before incentives</div></div>
<div class="stat"><div class="label">Est. Payback</div><div class="value">${paybackYears.toFixed(1)}yr</div><div class="detail">after incentives</div></div>
</div>

<div class="calc-section">
<h2>☀️ Your Solar ROI Calculator</h2>
<div class="form-grid">
<div class="form-group"><label>Monthly Electric Bill ($)</label><input type="number" id="monthlyBill" value="${state.avgBill}" min="0" step="5"></div>
<div class="form-group"><label>Electricity Rate ($/kWh)</label><input type="number" id="elecRate" value="${state.elecRate.toFixed(3)}" min="0" step="0.001"></div>
<div class="form-group"><label>System Size (kW)</label><input type="number" id="systemSize" value="6" min="1" max="25" step="0.5"></div>
<div class="form-group"><label>Cost per Watt ($)</label><input type="number" id="costPerWatt" value="${(state.avgSystem/6000).toFixed(2)}" min="0" step="0.10"></div>
<div class="form-group"><label>Peak Sun Hours/Day</label><input type="number" id="sunHours" value="${state.avgSunHrs}" min="0" step="0.1"></div>
<div class="form-group"><label>System Degradation (%/yr)</label><input type="number" id="degradation" value="0.5" min="0" max="2" step="0.1"></div>
<div class="form-group"><label>Electricity Price Increase (%/yr)</label><input type="number" id="priceIncrease" value="3" min="0" max="10" step="0.5"></div>
<div class="form-group"><label>Federal Tax Credit (%)</label><input type="number" id="fedCredit" value="30" min="0" max="100" step="1"></div>
${state.stateCredit > 0 ? `<div class="form-group"><label>${state.name} State Credit (%)</label><input type="number" id="stateCredit" value="${(state.stateCredit*100).toFixed(0)}" min="0" max="100" step="1"></div>` : `<div class="form-group"><label>State/Local Rebate ($)</label><input type="number" id="stateRebate" value="0" min="0" step="100"></div>`}
<div class="form-group"><label>Loan? (years, 0=cash)</label><input type="number" id="loanYears" value="0" min="0" max="30" step="1"></div>
</div>
<button class="btn" onclick="calculate()">⚡ Calculate Solar Savings</button>

<div class="results" id="results">
<div class="result-cards">
<div class="r-card"><div class="r-label">Total System Cost</div><div class="r-value accent" id="rCost">—</div></div>
<div class="r-card"><div class="r-label">After Incentives</div><div class="r-value green" id="rNet">—</div></div>
<div class="r-card"><div class="r-label">Payback Period</div><div class="r-value accent" id="rPayback">—</div></div>
<div class="r-card"><div class="r-label">25-Year Savings</div><div class="r-value green" id="rSavings">—</div></div>
<div class="r-card"><div class="r-label">25-Year ROI</div><div class="r-value green" id="rROI">—</div></div>
<div class="r-card"><div class="r-label">Year 1 Production</div><div class="r-value accent" id="rProd">—</div></div>
</div>

<h3 style="margin:1rem 0 .5rem">📊 Year-by-Year Breakdown</h3>
<div style="overflow-x:auto"><table class="breakdown">
<thead><tr><th>Year</th><th>Production (kWh)</th><th>Elec Rate</th><th>Annual Savings</th><th>Cumulative Savings</th><th>Net Position</th></tr></thead>
<tbody id="yearlyTable"></tbody>
</table></div>
</div>
</div>

<div class="ad-slot"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3112605892426625" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div>

<div class="info-section">
<h2>☀️ Solar Energy in ${state.name} — What You Need to Know</h2>

<h3>Solar Potential</h3>
<p>${state.name} averages <strong>${state.avgSunHrs} peak sun hours per day</strong>, ${state.avgSunHrs >= 5.5 ? 'making it one of the best states for solar energy in the US' : state.avgSunHrs >= 4.5 ? 'providing good conditions for residential solar installations' : 'which is moderate but still viable for solar with the right system sizing'}. A typical 6kW residential system in ${state.name} produces approximately <strong>${Math.round(annualKwh).toLocaleString()} kWh per year</strong>.</p>

<h3>Electricity Costs</h3>
<p>The average electricity rate in ${state.name} is <strong>$${state.elecRate.toFixed(3)}/kWh</strong>, ${state.elecRate >= 0.20 ? 'significantly above the national average, making solar an excellent investment' : state.elecRate >= 0.14 ? 'near the national average' : 'below the national average, which extends payback periods but solar still provides long-term savings'}. With electricity prices rising 3-5% annually, locking in solar savings now protects against future rate increases.</p>

<h3>Incentives & Credits</h3>
<ul>
<li><strong>Federal Investment Tax Credit (ITC):</strong> 30% of system cost through 2032, stepping down to 26% in 2033 and 22% in 2034</li>
${state.stateCredit > 0 ? `<li><strong>${state.name} State Tax Credit:</strong> ${(state.stateCredit*100).toFixed(0)}% additional credit on top of the federal ITC</li>` : `<li><strong>State Incentives:</strong> Check with your local utility and state energy office for current rebates and incentives</li>`}
<li><strong>Net Metering (${state.netMetering}):</strong> ${state.netMetering === 'Yes' ? 'Full retail rate credit for excess energy sent to the grid' : state.netMetering === 'Limited' ? 'Limited net metering — credits may be below retail rate' : 'Modified net metering program — check current policies'}</li>
<li><strong>Property Tax Exemption:</strong> Many ${state.name} counties exempt solar installations from property tax increases</li>
</ul>

<h3>ROI Analysis</h3>
<p>Based on current rates and incentives, a typical solar installation in ${state.name} pays for itself in approximately <strong>${paybackYears.toFixed(1)} years</strong>. Over a 25-year panel warranty period, homeowners can expect a <strong>${roi25}% return on investment</strong>, with total savings of approximately <strong>$${Math.round(annualSavings * 25 - afterState).toLocaleString()}</strong> after accounting for system costs and incentives.</p>

<h3>Installation Tips for ${state.name}</h3>
<ul>
<li>Get at least 3 quotes from local installers — prices vary significantly</li>
<li>Check if your roof faces south or southwest for optimal production</li>
<li>Consider tree shading — even partial shade reduces output significantly</li>
<li>Ask about panel-level monitoring (microinverters or optimizers)</li>
<li>Verify your installer is NABCEP certified</li>
<li>Review your utility's interconnection process before signing</li>
</ul>
</div>

<div class="cta-box">
<h3>🔋 Ready to Go Solar in ${state.name}?</h3>
<p style="color:var(--muted)">Use the calculator above with your actual electric bill for personalized savings. Compare quotes from at least 3 local installers.</p>
</div>

<div class="info-section">
<h2>🗺️ Solar Calculators for All 50 States</h2>
<div class="state-links" id="stateLinks"></div>
</div>
</main>

<footer>
<p>SmartCalc Solar Calculator — ${state.name}. All calculations run in your browser.</p>
<p><a href="../">💰 SmartCalc</a> · <a href="./">All Solar Calculators</a> · <a href="https://alexchalu.github.io/toolpulse/">🔧 ToolPulse</a> · <a href="https://alexchalu.github.io/healthcalcs/">🏥 HealthCalcs</a></p>
</footer>

<script>
const allStates=${JSON.stringify(states.map(s=>({n:s.name,s:s.slug})))};
document.getElementById('stateLinks').innerHTML=allStates.map(s=>\`<a href="\${s.s}.html">\${s.n}</a>\`).join('');

function calculate(){
const bill=+document.getElementById('monthlyBill').value;
const rate=+document.getElementById('elecRate').value;
const size=+document.getElementById('systemSize').value;
const cpw=+document.getElementById('costPerWatt').value;
const sun=+document.getElementById('sunHours').value;
const deg=+document.getElementById('degradation').value/100;
const inc=+document.getElementById('priceIncrease').value/100;
const fed=+document.getElementById('fedCredit').value/100;
const stEl=document.getElementById('stateCredit')||document.getElementById('stateRebate');
const isCredit=${state.stateCredit > 0 ? 'true' : 'false'};
const stVal=+stEl.value;
const loanYrs=+document.getElementById('loanYears').value;

const totalCost=size*1000*cpw;
const afterFed=totalCost*(1-fed);
const netCost=isCredit?afterFed*(1-(stVal/100)):afterFed-stVal;

let cumSavings=0,rows='',paybackYr=0;
for(let y=1;y<=25;y++){
  const prod=Math.round(size*sun*365*0.8*(1-deg)**( y-1));
  const r=(rate*(1+inc)**(y-1)).toFixed(4);
  const sav=Math.round(prod*r);
  cumSavings+=sav;
  const net=cumSavings-netCost;
  if(paybackYr===0&&net>=0)paybackYr=y;
  rows+=\`<tr><td>\${y}</td><td>\${prod.toLocaleString()}</td><td>$\${r}</td><td>$\${sav.toLocaleString()}</td><td>$\${Math.round(cumSavings).toLocaleString()}</td><td style="color:\${net>=0?'var(--green)':'var(--red)'}">$\${Math.round(net).toLocaleString()}</td></tr>\`;
}

document.getElementById('rCost').textContent='$'+Math.round(totalCost).toLocaleString();
document.getElementById('rNet').textContent='$'+Math.round(netCost).toLocaleString();
document.getElementById('rPayback').textContent=paybackYr>0?paybackYr+' years':'>25 years';
document.getElementById('rSavings').textContent='$'+Math.round(cumSavings-netCost).toLocaleString();
document.getElementById('rROI').textContent=Math.round((cumSavings-netCost)/netCost*100)+'%';
document.getElementById('rProd').textContent=Math.round(size*sun*365*0.8).toLocaleString()+' kWh';
document.getElementById('yearlyTable').innerHTML=rows;
document.getElementById('results').classList.add('show');
}

calculate();

const b=document.getElementById('themeBtn');const s=localStorage.getItem('sc-theme');
if(s==='light'){document.documentElement.setAttribute('data-theme','light');b.textContent='☀️'}
b.addEventListener('click',()=>{const l=document.documentElement.getAttribute('data-theme')==='light';document.documentElement.setAttribute('data-theme',l?'dark':'light');b.textContent=l?'🌙':'☀️';localStorage.setItem('sc-theme',l?'dark':'light')});
</script>
</body>
</html>`;
}

// Build index page
function buildIndexPage() {
  const sorted = [...states].sort((a,b) => {
    const aPayback = (a.avgSystem * (1-federalCredit) * (1-a.stateCredit)) / (a.avgSunHrs * 365 * 0.8 * 6 * a.elecRate);
    const bPayback = (b.avgSystem * (1-federalCredit) * (1-b.stateCredit)) / (b.avgSunHrs * 365 * 0.8 * 6 * b.elecRate);
    return aPayback - bPayback;
  });

  const bestStates = sorted.slice(0, 10);
  const worstStates = sorted.slice(-5).reverse();

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Solar Panel Calculator by State 2026 — ROI, Savings & Payback for All 50 States | SmartCalc</title>
<meta name="description" content="Compare solar panel ROI across all 50 states. Calculate savings, payback period, and incentives. Find the best states for solar in 2026.">
<meta name="keywords" content="solar panel calculator, solar ROI by state, best states for solar, solar panel savings, solar payback period, solar incentives by state">
<link rel="canonical" href="https://alexchalu.github.io/smartcalc/solar/">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>☀️</text></svg>">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3112605892426625" crossorigin="anonymous"></script>
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"WebApplication","name":"Solar Panel Calculator by State","description":"Compare solar panel ROI across all 50 US states","url":"https://alexchalu.github.io/smartcalc/solar/","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}
</script>
<style>
:root{--bg:#0a0e1a;--surface:#111827;--surface2:#1f2937;--border:#374151;--text:#f3f4f6;--muted:#9ca3af;--accent:#f59e0b;--accent2:#d97706;--green:#10b981;--red:#ef4444;--glow:rgba(245,158,11,0.12);--radius:12px;--shadow:0 4px 24px rgba(0,0,0,0.4)}
[data-theme="light"]{--bg:#f9fafb;--surface:#fff;--surface2:#f3f4f6;--border:#e5e7eb;--text:#1f2937;--muted:#6b7280;--shadow:0 4px 24px rgba(0,0,0,0.06)}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:var(--bg);color:var(--text);line-height:1.6}
header{background:var(--surface);border-bottom:1px solid var(--border);padding:1rem 1.5rem;position:sticky;top:0;z-index:100}
.header-inner{max-width:1100px;margin:0 auto;display:flex;align-items:center;gap:1rem}
.logo{font-size:1.3rem;font-weight:800;color:var(--accent);text-decoration:none}
.nav{color:var(--muted);font-size:.85rem;flex:1}
.nav a{color:var(--accent);text-decoration:none}
.theme-btn{background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:.4rem .6rem;font-size:1rem;cursor:pointer}
main{max-width:1100px;margin:0 auto;padding:2rem 1.5rem}
h1{font-size:1.8rem;margin-bottom:.5rem}
.subtitle{color:var(--muted);margin-bottom:2rem}
.search{width:100%;padding:.75rem 1rem;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);color:var(--text);font-size:1rem;margin-bottom:1.5rem}
.search:focus{outline:none;border-color:var(--accent)}
.highlights{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:2rem}
.highlight-box{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:1.5rem}
.highlight-box h3{font-size:1rem;margin-bottom:.75rem;color:var(--accent)}
.highlight-box ul{list-style:none;padding:0}
.highlight-box li{padding:.35rem 0;display:flex;justify-content:space-between;font-size:.9rem;border-bottom:1px solid var(--border)}
.highlight-box li:last-child{border:none}
.highlight-box .st-name{font-weight:600}
.highlight-box .st-val{color:var(--green);font-weight:700}
.state-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:.75rem}
.state-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:1rem 1.25rem;text-decoration:none;color:var(--text);transition:.2s;display:flex;flex-direction:column;gap:.25rem}
.state-card:hover{border-color:var(--accent);transform:translateY(-2px);box-shadow:var(--shadow)}
.state-card .s-name{font-weight:700;font-size:1rem}
.state-card .s-detail{color:var(--muted);font-size:.8rem}
.state-card .s-payback{color:var(--green);font-weight:700;font-size:.85rem}
.ad-slot{max-width:1100px;margin:1rem auto;padding:0 1.5rem}
footer{text-align:center;padding:2rem;color:var(--muted);font-size:.85rem;border-top:1px solid var(--border);margin-top:3rem}
footer a{color:var(--accent);text-decoration:none}
@media(max-width:768px){.highlights{grid-template-columns:1fr}.state-grid{grid-template-columns:1fr 1fr}}
@media(max-width:480px){.state-grid{grid-template-columns:1fr}}
</style>
</head>
<body>
<header><div class="header-inner">
<a href="../" class="logo">☀️ SmartCalc</a>
<p class="nav"><a href="../">Home</a> › Solar Calculators</p>
<button class="theme-btn" id="themeBtn">🌙</button>
</div></header>

<div class="ad-slot"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3112605892426625" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div>

<main>
<h1>☀️ Solar Panel Calculator by State — 2026</h1>
<p class="subtitle">Compare solar panel ROI, savings, and payback periods across all 50 US states. Click any state for a detailed calculator with year-by-year projections.</p>

<input type="text" class="search" id="search" placeholder="🔍 Search states..." oninput="filterStates()">

<div class="highlights">
<div class="highlight-box">
<h3>🏆 Best States for Solar ROI</h3>
<ul>
${bestStates.map(s => {
  const payback = (s.avgSystem * (1-federalCredit) * (1-s.stateCredit)) / (s.avgSunHrs * 365 * 0.8 * 6 * s.elecRate);
  return `<li><span class="st-name">${s.icon} ${s.name}</span><span class="st-val">${payback.toFixed(1)} yr payback</span></li>`;
}).join('\n')}
</ul>
</div>
<div class="highlight-box">
<h3>⚡ Highest Electricity Rates</h3>
<ul>
${[...states].sort((a,b)=>b.elecRate-a.elecRate).slice(0,10).map(s => 
  `<li><span class="st-name">${s.icon} ${s.name}</span><span class="st-val">$${s.elecRate.toFixed(3)}/kWh</span></li>`
).join('\n')}
</ul>
</div>
</div>

<h2 style="font-size:1.2rem;margin-bottom:1rem">All 50 States</h2>
<div class="state-grid" id="stateGrid">
${sorted.map(s => {
  const payback = (s.avgSystem * (1-federalCredit) * (1-s.stateCredit)) / (s.avgSunHrs * 365 * 0.8 * 6 * s.elecRate);
  return `<a class="state-card" href="${s.slug}.html" data-name="${s.name.toLowerCase()}">
<span class="s-name">${s.icon} ${s.name}</span>
<span class="s-detail">${s.avgSunHrs}h sun · $${s.elecRate.toFixed(3)}/kWh${s.stateCredit > 0 ? ' · State credit' : ''}</span>
<span class="s-payback">⚡ ${payback.toFixed(1)} year payback</span>
</a>`;
}).join('\n')}
</div>
</main>

<div class="ad-slot"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3112605892426625" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div>

<footer>
<p>SmartCalc Solar Calculators — Compare solar ROI across all 50 states.</p>
<p><a href="../">💰 SmartCalc</a> · <a href="https://alexchalu.github.io/toolpulse/">🔧 ToolPulse</a> · <a href="https://alexchalu.github.io/healthcalcs/">🏥 HealthCalcs</a></p>
</footer>

<script>
function filterStates(){const q=document.getElementById('search').value.toLowerCase();document.querySelectorAll('.state-card').forEach(c=>{c.style.display=c.dataset.name.includes(q)?'':'none'})}
const b=document.getElementById('themeBtn');const s=localStorage.getItem('sc-theme');
if(s==='light'){document.documentElement.setAttribute('data-theme','light');b.textContent='☀️'}
b.addEventListener('click',()=>{const l=document.documentElement.getAttribute('data-theme')==='light';document.documentElement.setAttribute('data-theme',l?'dark':'light');b.textContent=l?'🌙':'☀️';localStorage.setItem('sc-theme',l?'dark':'light')});
</script>
</body>
</html>`;
}

// Generate all pages
console.log('Building solar calculator pages...');
states.forEach(state => {
  const html = buildStatePage(state);
  fs.writeFileSync(path.join(outDir, `${state.slug}.html`), html);
  console.log(`  ✅ ${state.name}`);
});

// Index page
fs.writeFileSync(path.join(outDir, 'index.html'), buildIndexPage());
console.log('  ✅ Index page');

console.log(`\nDone! Built ${states.length + 1} solar calculator pages.`);
