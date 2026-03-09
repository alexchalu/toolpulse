#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// High-volume speed conversions
const conversions = [
  { from: 'mph', to: 'kph', name: 'MPH to KPH', category: 'Speed', fromFull: 'Miles Per Hour', toFull: 'Kilometers Per Hour' },
  { from: 'kph', to: 'mph', name: 'KPH to MPH', category: 'Speed', fromFull: 'Kilometers Per Hour', toFull: 'Miles Per Hour' },
  { from: 'mph', to: 'ms', name: 'MPH to Meters/Second', category: 'Speed', fromFull: 'Miles Per Hour', toFull: 'Meters Per Second' },
  { from: 'kph', to: 'ms', name: 'KPH to Meters/Second', category: 'Speed', fromFull: 'Kilometers Per Hour', toFull: 'Meters Per Second' },
  { from: 'ms', to: 'mph', name: 'Meters/Second to MPH', category: 'Speed', fromFull: 'Meters Per Second', toFull: 'Miles Per Hour' },
  { from: 'ms', to: 'kph', name: 'Meters/Second to KPH', category: 'Speed', fromFull: 'Meters Per Second', toFull: 'Kilometers Per Hour' },
  { from: 'knots', to: 'mph', name: 'Knots to MPH', category: 'Speed', fromFull: 'Knots', toFull: 'Miles Per Hour' },
  { from: 'knots', to: 'kph', name: 'Knots to KPH', category: 'Speed', fromFull: 'Knots', toFull: 'Kilometers Per Hour' },
  { from: 'mph', to: 'knots', name: 'MPH to Knots', category: 'Speed', fromFull: 'Miles Per Hour', toFull: 'Knots' },
  { from: 'kph', to: 'knots', name: 'KPH to Knots', category: 'Speed', fromFull: 'Kilometers Per Hour', toFull: 'Knots' },
  { from: 'mach', to: 'mph', name: 'Mach to MPH', category: 'Speed', fromFull: 'Mach', toFull: 'Miles Per Hour' },
  { from: 'mach', to: 'kph', name: 'Mach to KPH', category: 'Speed', fromFull: 'Mach', toFull: 'Kilometers Per Hour' },
  { from: 'mph', to: 'fps', name: 'MPH to Feet/Second', category: 'Speed', fromFull: 'Miles Per Hour', toFull: 'Feet Per Second' },
  { from: 'fps', to: 'mph', name: 'Feet/Second to MPH', category: 'Speed', fromFull: 'Feet Per Second', toFull: 'Miles Per Hour' },
  { from: 'kph', to: 'fps', name: 'KPH to Feet/Second', category: 'Speed', fromFull: 'Kilometers Per Hour', toFull: 'Feet Per Second' },
];

// Conversion formulas
const formulas = {
  'mph-kph': (mph) => (mph * 1.60934).toFixed(2),
  'kph-mph': (kph) => (kph / 1.60934).toFixed(2),
  'mph-ms': (mph) => (mph * 0.44704).toFixed(2),
  'kph-ms': (kph) => (kph / 3.6).toFixed(2),
  'ms-mph': (ms) => (ms / 0.44704).toFixed(2),
  'ms-kph': (ms) => (ms * 3.6).toFixed(2),
  'knots-mph': (knots) => (knots * 1.15078).toFixed(2),
  'knots-kph': (knots) => (knots * 1.852).toFixed(2),
  'mph-knots': (mph) => (mph / 1.15078).toFixed(2),
  'kph-knots': (kph) => (kph / 1.852).toFixed(2),
  'mach-mph': (mach) => (mach * 767.269).toFixed(2),
  'mach-kph': (mach) => (mach * 1234.8).toFixed(2),
  'mph-fps': (mph) => (mph * 1.46667).toFixed(2),
  'fps-mph': (fps) => (fps / 1.46667).toFixed(2),
  'kph-fps': (kph) => (kph * 0.911344).toFixed(2),
};

function generatePage(conv) {
  const slug = `convert-${conv.from}-to-${conv.to}`;
  const formulaKey = `${conv.from}-${conv.to}`;
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${conv.name} Converter - Free Speed Conversion Tool | ToolPulse</title>
    <meta name="description" content="Convert ${conv.fromFull} to ${conv.toFull} instantly. Free ${conv.name.toLowerCase()} speed converter. Accurate, fast, easy to use.">
    <link rel="canonical" href="https://alexchalu.github.io/toolpulse/${slug}.html">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f7fa; color: #333; line-height: 1.6; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem 0; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
        .header h1 { font-size: 1.8rem; margin-bottom: 0.5rem; }
        .header p { opacity: 0.9; }
        .main { padding: 2rem 0; }
        .converter-box { background: white; border-radius: 12px; padding: 2rem; box-shadow: 0 2px 20px rgba(0,0,0,0.08); margin-bottom: 2rem; }
        .converter-box h2 { margin-bottom: 1.5rem; color: #667eea; }
        .input-group { margin-bottom: 1.5rem; }
        .input-group label { display: block; margin-bottom: 0.5rem; font-weight: 600; color: #555; }
        .input-group input { width: 100%; padding: 0.75rem; border: 2px solid #e0e6ed; border-radius: 6px; font-size: 1rem; transition: border 0.3s; }
        .input-group input:focus { outline: none; border-color: #667eea; }
        .result-box { background: #f0f4ff; border-left: 4px solid #667eea; padding: 1rem; border-radius: 6px; margin-top: 1rem; }
        .result-box strong { color: #667eea; font-size: 1.2rem; }
        .info-section { background: white; border-radius: 12px; padding: 2rem; box-shadow: 0 2px 20px rgba(0,0,0,0.08); margin-bottom: 2rem; }
        .info-section h3 { color: #667eea; margin-bottom: 1rem; }
        .info-section p { margin-bottom: 1rem; }
        .table-wrapper { overflow-x: auto; }
        .conversion-table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
        .conversion-table th, .conversion-table td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e0e6ed; }
        .conversion-table th { background: #f0f4ff; color: #667eea; font-weight: 600; }
        .conversion-table tr:hover { background: #f9fafb; }
        .ad-placeholder { background: #f0f0f0; border: 2px dashed #ccc; padding: 2rem; text-align: center; margin: 2rem 0; border-radius: 8px; min-height: 250px; display: flex; align-items: center; justify-content: center; }
        .footer { background: #2d3748; color: white; padding: 2rem 0; text-align: center; }
        .footer a { color: #667eea; text-decoration: none; }
        @media (max-width: 768px) { .header h1 { font-size: 1.5rem; } }
    </style>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3112605892426625" crossorigin="anonymous"></script>
</head>
<body>
    <div class="header">
        <div class="container">
            <h1>${conv.name} Converter</h1>
            <p>Free online ${conv.fromFull} to ${conv.toFull} speed converter</p>
        </div>
    </div>

    <div class="main container">
        <!-- Ad Slot 1 -->
        <div class="ad-placeholder">
            <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3112605892426625" data-ad-slot="1234567890" data-ad-format="auto" data-full-width-responsive="true"></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        </div>

        <div class="converter-box">
            <h2>Convert ${conv.fromFull} to ${conv.toFull}</h2>
            <div class="input-group">
                <label for="input-value">Enter ${conv.fromFull}:</label>
                <input type="number" id="input-value" placeholder="Enter speed" step="any">
            </div>
            <div class="result-box" id="result">
                <strong>Result: </strong><span id="result-value">Enter a value above</span>
            </div>
        </div>

        <!-- Ad Slot 2 -->
        <div class="ad-placeholder">
            <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3112605892426625" data-ad-slot="1234567891" data-ad-format="auto" data-full-width-responsive="true"></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        </div>

        <div class="info-section">
            <h3>About ${conv.fromFull} to ${conv.toFull} Conversion</h3>
            <p>This free online converter helps you quickly convert ${conv.fromFull} to ${conv.toFull}. Perfect for travel, driving, aviation, marine navigation, and physics calculations.</p>
            
            <h3>Quick Reference Table</h3>
            <div class="table-wrapper">
                <table class="conversion-table">
                    <thead>
                        <tr>
                            <th>${conv.fromFull}</th>
                            <th>${conv.toFull}</th>
                        </tr>
                    </thead>
                    <tbody id="reference-table"></tbody>
                </table>
            </div>
        </div>

        <!-- Ad Slot 3 -->
        <div class="ad-placeholder">
            <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3112605892426625" data-ad-slot="1234567892" data-ad-format="auto" data-full-width-responsive="true"></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        </div>

        <div class="info-section">
            <h3>More Speed & Unit Converters</h3>
            <p>Check out our other conversion tools:</p>
            <ul>
                <li><a href="index.html">ToolPulse Home - All Tools</a></li>
                <li><a href="https://alexchalu.github.io/smartcalc/">SmartCalc - Financial Calculators</a></li>
                <li><a href="https://alexchalu.github.io/healthcalcs/">HealthCalcs - Health & Wellness</a></li>
            </ul>
        </div>
    </div>

    <div class="footer">
        <div class="container">
            <p>&copy; 2026 ToolPulse. Free online tools and calculators.</p>
            <p><a href="index.html">Home</a> | <a href="https://alexchalu.github.io/smartcalc/">SmartCalc</a> | <a href="https://alexchalu.github.io/healthcalcs/">HealthCalcs</a></p>
        </div>
    </div>

    <script>
        const formulaKey = '${formulaKey}';
        const formulas = ${JSON.stringify(formulas, null, 2)};
        
        const inputEl = document.getElementById('input-value');
        const resultEl = document.getElementById('result-value');
        const tableEl = document.getElementById('reference-table');
        
        function convert(value) {
            const formula = formulas[formulaKey];
            if (!formula) return 'Error';
            return eval(formula.toString().replace(/^\\(.*?\\)\\s*=>/, 'return ') + '(' + value + ')');
        }
        
        inputEl.addEventListener('input', () => {
            const value = parseFloat(inputEl.value);
            if (isNaN(value)) {
                resultEl.textContent = 'Enter a valid number';
                return;
            }
            const result = convert(value);
            resultEl.textContent = value + ' ${conv.from} = ' + result + ' ${conv.to}';
        });
        
        // Generate reference table
        const referenceValues = ['${conv.from}' === 'mach' ? [0.5, 1, 1.5, 2, 3, 5, 10] : [10, 20, 50, 100, 200, 500, 1000]][0];
        referenceValues.forEach(val => {
            const row = document.createElement('tr');
            const result = convert(val);
            row.innerHTML = '<td>' + val + '</td><td>' + result + '</td>';
            tableEl.appendChild(row);
        });
    </script>
</body>
</html>`;
}

// Generate all pages
let count = 0;
conversions.forEach(conv => {
  const slug = `convert-${conv.from}-to-${conv.to}`;
  const html = generatePage(conv);
  fs.writeFileSync(path.join(__dirname, `${slug}.html`), html);
  count++;
  console.log(`✓ Generated ${slug}.html`);
});

console.log(`\n✅ Generated ${count} speed conversion pages`);
console.log('📝 Next: Update sitemap.xml and push to GitHub');
