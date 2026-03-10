#!/usr/bin/env node
/**
 * V3 Fix — Clean up the broken migration artifacts.
 * 
 * Problems to fix:
 * 1. Duplicate H1: migration added an H1 + orphan </div> before the real content
 * 2. Extra ad slots: migration added cl-ad divs on top of existing ads
 * 3. No page container: content is not wrapped in a max-width container
 * 4. Wrong CSS: old V2 migration CSS with undefined vars
 * 5. Update to gold standard design system (matching BMI/Sleep pages)
 * 
 * Strategy: 
 * - Replace the <style> block with the gold standard CSS
 * - Replace the nav with the gold standard nav
 * - Remove the duplicate H1 + orphan p/div that migration injected
 * - Remove extra cl-ad divs (keep only existing page ads, max 3)
 * - Wrap content in <div class="page"> container
 * - Ensure proper footer
 */
const fs = require('fs');
const path = require('path');

const GOLD_CSS = fs.readFileSync('/data/workspace/toolpulse/bmi-calculator.html', 'utf8')
  .match(/<style>([\s\S]*?)<\/style>/)[1];

let fixed = 0, skipped = 0, errors = 0;

function fixFile(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  const basename = path.basename(filePath);
  
  // Skip already-fixed gold standard pages and special pages
  if (['index.html','about.html','privacy.html','contact.html','404.html','bmi-calculator.html'].includes(basename)) return false;
  if (filePath.includes('calc/sleep-calculator.html')) return false;
  if (!basename.endsWith('.html')) return false;
  if (basename.startsWith('google') || basename === 'BingSiteAuth.xml') return false;
  
  // Already gold standard?
  if (html.includes('class="page-title"') && html.includes('#f5f5f7')) return false;
  
  const isSubdir = filePath.includes('/calc/') || filePath.includes('/blog/') || filePath.includes('/percent/');
  const prefix = isSubdir ? '../' : '';
  
  // === EXTRACT KEY PARTS ===
  
  // Get title
  const titleMatch = html.match(/<title>([^<]*)<\/title>/);
  const fullTitle = titleMatch ? titleMatch[1] : 'CalcLeap';
  
  // Get meta description
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  const metaDesc = descMatch ? descMatch[1] : '';
  
  // Get canonical
  const canonMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i);
  const canonical = canonMatch ? canonMatch[1] : '';
  
  // Get OG tags
  const ogTitleMatch = html.match(/<meta\s+property="og:title"\s+content="([^"]*)"/i);
  const ogDescMatch = html.match(/<meta\s+property="og:description"\s+content="([^"]*)"/i);
  
  // Get schema JSON-LD
  const schemaMatch = html.match(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/i);
  const schema = schemaMatch ? schemaMatch[0] : '';
  
  // Get page title from first H1 in the actual content (not the migration-injected one)
  // The migration pattern is: </nav> ... <h1>Title</h1>\n  <p>desc</p>\n</div> ... then the real content
  // We need the REAL h1 from inside the original content
  
  // Find all H1 tags
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  let pageTitle = '', pageDesc = '';
  
  if (h1s.length >= 2) {
    // First H1 is the migration artifact, second is the real one
    pageTitle = h1s[0][1].replace(/<[^>]*>/g, '').replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '').trim();
    // Get desc from the orphan <p> after the first H1
    const afterH1 = html.substring(html.indexOf(h1s[0][0]) + h1s[0][0].length);
    const pMatch = afterH1.match(/^\s*<p[^>]*>([\s\S]*?)<\/p>/i);
    if (pMatch) pageDesc = pMatch[1].trim();
  } else if (h1s.length === 1) {
    pageTitle = h1s[0][1].replace(/<[^>]*>/g, '').replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '').trim();
  }
  
  if (!pageTitle) {
    pageTitle = fullTitle.replace(/\s*[—–|].*$/, '').trim();
  }
  if (!pageDesc && metaDesc) {
    pageDesc = metaDesc;
  }
  
  // Detect category for breadcrumb
  const f = basename.toLowerCase();
  let catName = 'Tools', catId = 'tools';
  if (f.includes('insurance')) { catName = 'Insurance'; catId = 'insurance'; }
  else if (f.includes('tax') || f.includes('income-tax')) { catName = 'Tax'; catId = 'tax'; }
  else if (f.includes('mortgage') || f.includes('loan') || f.includes('401k') || f.includes('roth') || f.includes('retirement') || f.includes('paycheck') || f.includes('compound') || f.includes('roi') || f.includes('debt') || f.includes('invest') || f.includes('savings') || f.includes('heloc') || f.includes('annuity') || f.includes('pension') || f.includes('profit-margin') || f.includes('personal-loan')) { catName = 'Finance'; catId = 'finance'; }
  else if (f.includes('bmi') || f.includes('calorie') || f.includes('body-fat') || f.includes('pregnancy') || f.includes('sleep') || f.includes('bac') || f.includes('pace') || f.includes('weight') || f.includes('health')) { catName = 'Health'; catId = 'health'; }
  else if (f.includes('convert-')) { catName = 'Converters'; catId = 'converters'; }
  else if (f.includes('json') || f.includes('base64') || f.includes('hash') || f.includes('uuid') || f.includes('password') || f.includes('regex') || f.includes('css-') || f.includes('javascript') || f.includes('html-') || f.includes('diff') || f.includes('qr-code') || f.includes('url-') || f.includes('markdown')) { catName = 'Dev Tools'; catId = 'dev'; }
  else if (f.includes('bitcoin') || f.includes('ethereum') || f.includes('crypto') || f.includes('dogecoin')) { catName = 'Crypto'; catId = 'crypto'; }
  else if (f.includes('business') || f.includes('startup') || f.includes('freelance') || f.includes('payroll') || f.includes('inventory') || f.includes('break-even') || f.includes('cash-flow')) { catName = 'Business'; catId = 'business'; }
  else if (f.includes('age-') || f.includes('days-between') || f.includes('week-') || f.includes('unix') || f.includes('timezone') || f.includes('add-days')) { catName = 'Date & Time'; catId = 'date'; }
  else if (f.includes('word-counter') || f.includes('text-case') || f.includes('lorem') || f.includes('color-converter')) { catName = 'Text'; catId = 'text'; }
  else if (f.includes('solar') || f.includes('electric') || f.includes('gas-') || f.includes('concrete') || f.includes('screen-') || f.includes('recipe')) { catName = 'Home'; catId = 'home'; }
  else if (f.includes('fraction') || f.includes('square') || f.includes('scientific') || f.includes('gpa') || f.includes('percent')) { catName = 'Math'; catId = 'math'; }
  
  // === EXTRACT THE REAL CONTENT ===
  // Everything between the nav/breadcrumb/hero mess and the footer/scripts
  
  // Find where the actual calculator content starts
  // Pattern: after the migration artifacts (nav, breadcrumb, dup h1, orphan p/div, cl-ad),
  // there's either <main>, <div class="container">, or directly the calculator HTML
  
  // Remove the migration-injected parts
  // 1. Remove the duplicate H1 + orphan p + orphan </div> + cl-ad that migration added
  html = html.replace(/<div class="cl-breadcrumb">[\s\S]*?<\/div>\s*/i, '');
  html = html.replace(/<div class="cl-hero">[\s\S]*?<\/div>\s*/i, '');
  
  // Remove migration-added bare H1 followed by orphan p/div
  // Pattern: </nav>\n\n<h1>...</h1>\n  <p>...</p>\n</div>\n\n<div class="cl-ad">...
  html = html.replace(/<\/nav>\s*\n\s*<h1>[^<]*<\/h1>\s*\n\s*<p>[^<]*<\/p>\s*\n\s*<\/div>\s*/i, '</nav>\n');
  // Also try without </div>
  html = html.replace(/<\/nav>\s*\n\s*<h1>[^<]*<\/h1>\s*\n\s*<p>[\s\S]*?<\/p>\s*\n\s*<\/div>\s*/i, '</nav>\n');
  
  // Remove ALL cl-ad divs (we'll add exactly 2 back)
  html = html.replace(/<div class="cl-ad">[\s\S]*?<\/div>\s*/gi, '');
  
  // Remove the old cl-footer
  html = html.replace(/<footer class="cl-footer">[\s\S]*?<\/footer>/i, '');
  
  // Now extract: everything between </nav> and </body>
  const navEnd = html.indexOf('</nav>');
  const bodyEnd = html.indexOf('</body>');
  if (navEnd === -1 || bodyEnd === -1) return false;
  
  let content = html.substring(navEnd + '</nav>'.length, bodyEnd).trim();
  
  // Remove any remaining orphan bare H1 at the start of content
  content = content.replace(/^\s*<h1>[^<]*<\/h1>\s*(<p>[^<]*<\/p>\s*)?(<\/div>\s*)?/i, '');
  
  // Count and limit ad slots in content to max 3
  let adCount = 0;
  content = content.replace(/<div[^>]*>\s*<ins class="adsbygoogle"[\s\S]*?<\/script>\s*<\/div>/gi, (match) => {
    adCount++;
    if (adCount <= 3) return match;
    return ''; // Remove excess ads
  });
  // Also catch inline ads without wrapper div
  content = content.replace(/<ins class="adsbygoogle"[\s\S]*?<\/script>/gi, (match) => {
    adCount++;
    if (adCount <= 3) return `<div class="ad-slot">${match}</div>`;
    return '';
  });
  
  // === REBUILD THE PAGE ===
  const head = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${fullTitle}</title>
${metaDesc ? `<meta name="description" content="${metaDesc.replace(/"/g, '&quot;')}">` : ''}
${canonical ? `<link rel="canonical" href="${canonical}">` : ''}
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>">
${ogTitleMatch ? `<meta property="og:title" content="${ogTitleMatch[1]}">` : ''}
${ogDescMatch ? `<meta property="og:description" content="${ogDescMatch[1]}">` : ''}
<meta property="og:type" content="website">
${canonical ? `<meta property="og:url" content="${canonical}">` : ''}
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3112605892426625" crossorigin="anonymous"><\/script>
${schema}
<style>
${GOLD_CSS}
</style>
</head>
<body>

<nav class="nav">
  <div class="nav-inner">
    <a href="${prefix}index.html" class="logo">Calc<span>Leap</span></a>
    <div class="nav-links">
      <a href="${prefix}index.html#finance">Finance</a>
      <a href="${prefix}index.html#insurance">Insurance</a>
      <a href="${prefix}index.html#tax">Tax</a>
      <a href="${prefix}index.html#health">Health</a>
      <a href="${prefix}index.html#converters">Converters</a>
      <a href="${prefix}index.html#dev">Dev Tools</a>
      <a href="${prefix}about.html">About</a>
    </div>
  </div>
</nav>

<div class="page">
  <div class="breadcrumb">
    <a href="${prefix}index.html">Home</a><span class="sep">›</span><a href="${prefix}index.html#${catId}">${catName}</a><span class="sep">›</span>${pageTitle}
  </div>

  <h1 class="page-title">${pageTitle}</h1>
  ${pageDesc ? `<p class="page-desc">${pageDesc}</p>` : ''}

${content}

</div>

<footer class="footer">
  <div class="footer-inner">
    <div>
      <a class="logo" href="${prefix}index.html">Calc<span>Leap</span></a>
      <p style="margin-top:.4rem">Fast, beautiful, private calculators. Free forever.</p>
    </div>
    <div>
      <h5>Popular</h5>
      <a href="${prefix}bmi-calculator.html">BMI Calculator</a>
      <a href="${prefix}calc/mortgage-payment.html">Mortgage</a>
      <a href="${prefix}income-tax-calculator.html">Income Tax</a>
    </div>
    <div>
      <h5>Categories</h5>
      <a href="${prefix}index.html#finance">Financial</a>
      <a href="${prefix}index.html#insurance">Insurance</a>
      <a href="${prefix}index.html#health">Health</a>
    </div>
    <div>
      <h5>Company</h5>
      <a href="${prefix}about.html">About</a>
      <a href="${prefix}privacy.html">Privacy</a>
      <a href="${prefix}contact.html">Contact</a>
    </div>
  </div>
  <div class="footer-bottom">
    <p>© 2026 CalcLeap. For informational purposes only.</p>
  </div>
</footer>

</body>
</html>`;
  
  fs.writeFileSync(filePath, head);
  return true;
}

// Find all HTML files
function findAll(dir) {
  let results = [];
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      results = results.concat(findAll(full));
    } else if (item.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

const files = findAll('.');
for (const file of files) {
  try {
    if (fixFile(file)) fixed++;
    else skipped++;
  } catch(e) {
    errors++;
    console.error(`ERROR ${file}: ${e.message}`);
  }
}

console.log(`\nV3 Fix complete:`);
console.log(`  Fixed: ${fixed}`);
console.log(`  Skipped: ${skipped} (gold standard or special)`);
console.log(`  Errors: ${errors}`);
