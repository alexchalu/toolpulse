#!/usr/bin/env python3
"""Fix footers that don't have class='footer'"""

import os
import re
from pathlib import Path

FOOTER_HTML = '''<footer class="footer" role="contentinfo">
  <div class="footer-inner">
    <div>
      <a class="logo" href="index.html">Calc<span>Leap</span></a>
      <p style="margin-top:.4rem">Fast, beautiful, private calculators. Free forever.</p>
    </div>
    <div>
      <h4>Popular</h4>
      <a href="bmi-calculator.html">BMI Calculator</a>
      <a href="calc/mortgage-payment.html">Mortgage</a>
      <a href="income-tax-calculator.html">Income Tax</a>
      <a href="calc/compound-interest.html">Compound Interest</a>
    </div>
    <div>
      <h4>Categories</h4>
      <a href="index.html#finance">Financial</a>
      <a href="index.html#insurance">Insurance</a>
      <a href="index.html#health">Health</a>
      <a href="index.html#converters">Converters</a>
    </div>
    <div>
      <h4>Company</h4>
      <a href="about.html">About</a>
      <a href="privacy.html">Privacy</a>
      <a href="terms.html">Terms</a>
      <a href="contact.html">Contact</a>
      <a href="blog/index.html">Blog</a>
    </div>
  </div>
  <div class="footer-bottom">
    <p>© 2026 CalcLeap. For informational purposes only.</p>
  </div>
</footer>'''

def fix_footer(filepath):
    """Replace basic footer with full class='footer' version"""
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # Check if it has class="footer" already
    if 'class="footer"' in content:
        return False
    
    # Check if it has a basic footer
    if '<footer>' in content.lower():
        # Remove old footer
        content = re.sub(r'<footer>.*?</footer>', '', content, flags=re.DOTALL | re.IGNORECASE)
    
    # Add new footer before </body>
    if '</body>' in content:
        content = content.replace('</body>', f'{FOOTER_HTML}\n</body>')
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    
    return False

def main():
    os.chdir('/data/workspace/toolpulse')
    
    # Get all HTML files
    html_files = list(Path('.').glob('*.html')) + list(Path('calc').glob('*.html')) + list(Path('blog').glob('*.html'))
    
    fixed = 0
    for filepath in html_files:
        if filepath.name in ['index.html', 'sitemap.xml']:
            continue
        
        if fix_footer(str(filepath)):
            fixed += 1
            print(f"✓ Fixed footer in {filepath}")
    
    print(f"\n{'='*60}")
    print(f"Footers fixed: {fixed}")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
