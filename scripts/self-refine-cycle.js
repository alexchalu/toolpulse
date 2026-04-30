#!/usr/bin/env node
/**
 * SELF-REFINE CYCLE
 * Runs every heartbeat. Reads state, measures, analyzes, proposes improvements.
 * This is the closed-loop optimization engine.
 */

const fs = require('fs');
const https = require('https');
const { execSync } = require('child_process');

const STATE_DIR = '/data/workspace/state';
const METRICS_FILE = `${STATE_DIR}/metrics.json`;
const EXPERIMENTS_FILE = `${STATE_DIR}/experiments.json`;
const LEARNINGS_FILE = `${STATE_DIR}/learnings.json`;

function readJSON(file) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch(e) { return null; }
}

function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function log(msg) {
  const ts = new Date().toISOString();
  console.log(`[${ts}] ${msg}`);
}

async function measureTraffic() {
  try {
    const result = execSync('gh api repos/alexchalu/toolpulse/traffic/views 2>/dev/null', { encoding: 'utf8' });
    const data = JSON.parse(result);
    return { views: data.count, uniques: data.uniques };
  } catch(e) {
    return { views: 0, uniques: 0 };
  }
}

async function measureGumroad() {
  try {
    const result = execSync(
      'curl -s "https://api.gumroad.com/v2/products?access_token=4SLj5Hnr-hgKqt_XlXVUeM2W7vG6n4z5QfQTmfOJje0"',
      { encoding: 'utf8' }
    );
    const data = JSON.parse(result);
    let totalSales = 0, totalRevenue = 0;
    for (const p of data.products || []) {
      totalSales += p.sales_count;
      totalRevenue += p.sales_usd_cents / 100;
    }
    return { sales: totalSales, revenue: totalRevenue };
  } catch(e) {
    return { sales: 0, revenue: 0 };
  }
}

async function measureSEO() {
  try {
    const result = execSync(
      'cd /data/workspace/toolpulse && find . -name "*.html" -type f | wc -l',
      { encoding: 'utf8' }
    );
    return { total_pages: parseInt(result.trim()) };
  } catch(e) {
    return { total_pages: 0 };
  }
}

async function measureOutreach() {
  try {
    const sent = readJSON('/data/workspace/outreach-sent.json') || {};
    return { total_sent: Object.keys(sent).length };
  } catch(e) {
    return { total_sent: 0 };
  }
}

async function runCycle() {
  log('=== SELF-REFINE CYCLE START ===');
  
  const prevMetrics = readJSON(METRICS_FILE);
  const experiments = readJSON(EXPERIMENTS_FILE);
  const learnings = readJSON(LEARNINGS_FILE);
  
  // 1. MEASURE
  log('PHASE 1: MEASURE');
  const traffic = await measureTraffic();
  const gumroad = await measureGumroad();
  const seo = await measureSEO();
  const outreach = await measureOutreach();
  
  const newMetrics = {
    last_updated: new Date().toISOString(),
    cycle: (prevMetrics?.cycle || 0) + 1,
    traffic: {
      calcleap_views_14d: traffic.views,
      calcleap_unique_14d: traffic.uniques,
    },
    revenue: {
      gumroad_sales: gumroad.sales,
      gumroad_revenue: gumroad.revenue,
    },
    seo: {
      total_pages: seo.total_pages,
      domain_age_days: Math.floor((Date.now() - new Date('2026-03-10').getTime()) / 86400000),
    },
    outreach: {
      emails_sent_total: outreach.total_sent,
    }
  };
  
  writeJSON(METRICS_FILE, newMetrics);
  log(`  Traffic: ${traffic.views} views, ${traffic.uniques} unique`);
  log(`  Gumroad: ${gumroad.sales} sales, $${gumroad.revenue}`);
  log(`  Pages: ${seo.total_pages}`);
  log(`  Outreach: ${outreach.total_sent} emails sent`);
  
  // 2. ANALYZE — Compare to previous
  log('PHASE 2: ANALYZE');
  if (prevMetrics) {
    const trafficDelta = traffic.views - (prevMetrics.traffic?.calcleap_views_14d || 0);
    const revenueDelta = gumroad.revenue - (prevMetrics.revenue?.gumroad_revenue || 0);
    log(`  Traffic delta: ${trafficDelta > 0 ? '+' : ''}${trafficDelta}`);
    log(`  Revenue delta: ${revenueDelta > 0 ? '+$' : '$'}${revenueDelta}`);
    
    if (trafficDelta > 10) {
      log('  📈 SIGNIFICANT TRAFFIC INCREASE — investigate what caused it');
    }
    if (revenueDelta > 0) {
      log('  💰 REVENUE! Alert Alex immediately');
    }
  }
  
  // 3. CHECK EXPERIMENTS
  log('PHASE 3: CHECK EXPERIMENTS');
  if (experiments) {
    const today = new Date().toISOString().split('T')[0];
    for (const exp of experiments.active_experiments) {
      if (exp.measure_date <= today && exp.status === 'running') {
        log(`  ⏰ EXPERIMENT ${exp.id} "${exp.name}" is due for evaluation`);
        exp.status = 'needs_evaluation';
      } else if (exp.status === 'running') {
        const daysLeft = Math.ceil((new Date(exp.measure_date) - new Date()) / 86400000);
        log(`  🔬 ${exp.id}: "${exp.name}" — ${daysLeft} days until evaluation`);
      }
    }
    writeJSON(EXPERIMENTS_FILE, experiments);
  }
  
  // 4. GENERATE NEXT ACTIONS
  log('PHASE 4: NEXT ACTIONS');
  const actions = [];
  
  if (traffic.views === 0) {
    actions.push('CRITICAL: Zero traffic. Send more outreach emails.');
  }
  if (gumroad.sales === 0) {
    actions.push('No Gumroad sales. Promote product link in outreach.');
  }
  if (outreach.total_sent < 50) {
    actions.push(`Only ${outreach.total_sent} emails sent. Target 50+.`);
  }
  
  for (const action of actions) {
    log(`  → ${action}`);
  }
  
  log('=== SELF-REFINE CYCLE END ===');
  
  return { metrics: newMetrics, actions };
}

runCycle().catch(console.error);
