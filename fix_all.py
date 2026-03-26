#!/usr/bin/env python3
"""
Fix all CalcLeap audit errors:
1. Add orphaned pages to homepage
2. Fix pages with too many ads (>3)
3. Add missing footers
4. Add missing page-title classes
"""

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

def fix_missing_page_title(filepath):
    """Add class='page-title' to H1 if missing"""
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # Find H1 without page-title class
    if '<h1' in content and 'class="page-title"' not in content:
        # Add class to first H1
        content = re.sub(r'<h1([^>]*)>', r'<h1\1 class="page-title">', content, count=1)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def fix_missing_footer(filepath):
    """Add footer if missing"""
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    if '<footer' not in content:
        # Add footer before </body>
        if '</body>' in content:
            content = content.replace('</body>', f'{FOOTER_HTML}\n</body>')
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
    return False

def fix_excess_ads(filepath):
    """Remove ad slots beyond the first 3"""
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # Find all ad containers
    ad_pattern = r'<div class="ad-container">.*?</div>\s*<script>.*?</script>\s*</div>'
    ads = list(re.finditer(ad_pattern, content, re.DOTALL))
    
    if len(ads) > 3:
        # Remove ads after the 3rd one
        for ad_match in reversed(ads[3:]):
            content = content[:ad_match.start()] + content[ad_match.end():]
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    os.chdir('/data/workspace/toolpulse')
    
    # Get all HTML files
    html_files = list(Path('.').glob('*.html')) + list(Path('calc').glob('*.html')) + list(Path('blog').glob('*.html'))
    
    stats = {
        'page_title_fixed': 0,
        'footer_fixed': 0,
        'ads_fixed': 0
    }
    
    for filepath in html_files:
        filepath_str = str(filepath)
        
        # Skip index.html and certain special pages
        if filepath.name in ['index.html', 'sitemap.xml']:
            continue
        
        # Fix missing page-title
        if fix_missing_page_title(filepath_str):
            stats['page_title_fixed'] += 1
            print(f"✓ Added page-title to {filepath_str}")
        
        # Fix missing footer
        if fix_missing_footer(filepath_str):
            stats['footer_fixed'] += 1
            print(f"✓ Added footer to {filepath_str}")
        
        # Fix excess ads
        if fix_excess_ads(filepath_str):
            stats['ads_fixed'] += 1
            print(f"✓ Fixed excess ads in {filepath_str}")
    
    print(f"\n{'='*60}")
    print("FIXES APPLIED:")
    print(f"  Page titles fixed: {stats['page_title_fixed']}")
    print(f"  Footers added: {stats['footer_fixed']}")
    print(f"  Excess ads removed: {stats['ads_fixed']}")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
