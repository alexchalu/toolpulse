#!/usr/bin/env python3
"""
DEFINITIVE fix — addresses ALL remaining quality issues:
1. Strip excess ads (keep max 3 per page)
2. Remove duplicate H1s (keep only the page-title one)
3. Inject gold CSS where missing
4. Inject page-title where missing
5. Inject footer where missing
6. Inject comprehensive CSS where missing
"""
import os, re

SKIP = {'index.html', 'BingSiteAuth.xml', 'sitemap.xml', 'robots.txt', 'ads.txt',
        'a1b2c3d4e5f6g7h8.txt', 'CNAME', 'README.md', 'bmi-calculator.html'}

# Read gold CSS from bmi page
with open('bmi-calculator.html') as f:
    bmi = f.read()
GOLD_CSS = re.search(r'<style>([\s\S]*?)</style>', bmi).group(1)

# Read comprehensive CSS
with open('comprehensive-css-fix.js') as f:
    js_content = f.read()
comp_match = re.search(r"const EXTRA_CSS = `([\s\S]*?)`;", js_content)
COMP_CSS = comp_match.group(1) if comp_match else ''

FOOTER_TMPL = '''<footer class="footer">
  <div class="footer-inner">
    <div>
      <a class="logo" href="{prefix}index.html">Calc<span>Leap</span></a>
      <p style="margin-top:.4rem">Fast, beautiful, private calculators. Free forever.</p>
    </div>
    <div>
      <h5>Popular</h5>
      <a href="{prefix}bmi-calculator.html">BMI Calculator</a>
      <a href="{prefix}calc/mortgage-payment.html">Mortgage</a>
      <a href="{prefix}income-tax-calculator.html">Income Tax</a>
    </div>
    <div>
      <h5>Categories</h5>
      <a href="{prefix}index.html#finance">Financial</a>
      <a href="{prefix}index.html#insurance">Insurance</a>
      <a href="{prefix}index.html#health">Health</a>
    </div>
    <div>
      <h5>Company</h5>
      <a href="{prefix}about.html">About</a>
      <a href="{prefix}privacy.html">Privacy</a>
      <a href="{prefix}contact.html">Contact</a>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2026 CalcLeap. For informational purposes only.</p>
  </div>
</footer>'''

NAV_TMPL = '''<nav class="nav">
  <div class="nav-inner">
    <a href="{prefix}index.html" class="logo">Calc<span>Leap</span></a>
    <div class="nav-links">
      <a href="{prefix}index.html#finance">Finance</a>
      <a href="{prefix}index.html#insurance">Insurance</a>
      <a href="{prefix}index.html#tax">Tax</a>
      <a href="{prefix}index.html#health">Health</a>
      <a href="{prefix}index.html#converters">Converters</a>
      <a href="{prefix}index.html#dev">Dev Tools</a>
      <a href="{prefix}about.html">About</a>
    </div>
  </div>
</nav>'''

stats = {'ads_fixed': 0, 'h1_fixed': 0, 'css_injected': 0, 'title_added': 0, 
         'footer_added': 0, 'comp_css': 0, 'total_modified': 0}

for root, dirs, files in os.walk('.'):
    if '.git' in root or 'node_modules' in root:
        continue
    dirs[:] = [d for d in dirs if not d.startswith('.')]
    for fname in files:
        if not fname.endswith('.html') or fname in SKIP:
            continue
        fpath = os.path.join(root, fname)
        if fpath == './calc/sleep-calculator.html':
            continue
        
        html = open(fpath).read()
        modified = False
        
        # Determine prefix for relative links
        depth = fpath.count('/') - 1  # ./file = 0, ./dir/file = 1
        prefix = '../' * depth if depth > 0 else ''
        
        # === FIX 1: Strip excess ads ===
        # Count adsbygoogle occurrences — keep first 3, remove rest
        ad_pattern = r'<div[^>]*>\s*<ins class="adsbygoogle"[\s\S]*?</script>\s*</div>'
        ad_matches = list(re.finditer(ad_pattern, html, re.I))
        if len(ad_matches) > 3:
            # Remove from the end
            for m in reversed(ad_matches[3:]):
                html = html[:m.start()] + html[m.end():]
            stats['ads_fixed'] += 1
            modified = True
        
        # Also catch remaining excess ads
        current_ad_count = html.count('adsbygoogle')
        if current_ad_count > 4:  # still too many (3 ad slots + the adsbygoogle.js loader)
            # Nuclear option: count and remove
            parts = re.split(r'(<ins class="adsbygoogle"[\s\S]*?</ins>\s*<script>[^<]*</script>)', html)
            ad_idx = 0
            new_parts = []
            for p in parts:
                if 'adsbygoogle' in p and '<ins' in p:
                    ad_idx += 1
                    if ad_idx <= 3:
                        new_parts.append(p)
                    # else skip it
                else:
                    new_parts.append(p)
            new_html = ''.join(new_parts)
            if new_html != html:
                html = new_html
                stats['ads_fixed'] += 1
                modified = True
        
        # === FIX 2: Remove duplicate H1 ===
        h1s = list(re.finditer(r'<h1[^>]*>[\s\S]*?</h1>', html, re.I))
        if len(h1s) > 1:
            # Keep the one with page-title class, or the first one
            keep_idx = 0
            for i, m in enumerate(h1s):
                if 'page-title' in m.group():
                    keep_idx = i
                    break
            # Remove all others (from end to preserve indices)
            for i in reversed(range(len(h1s))):
                if i != keep_idx:
                    html = html[:h1s[i].start()] + html[h1s[i].end():]
            stats['h1_fixed'] += 1
            modified = True
        
        # === FIX 3: Inject gold CSS if missing ===
        if '#f5f5f7' not in html:
            style_match = re.search(r'<style>([\s\S]*?)</style>', html)
            if style_match:
                html = html[:style_match.start()] + '<style>\n' + GOLD_CSS + '\n</style>' + html[style_match.end():]
            elif '</head>' in html:
                html = html.replace('</head>', '<style>\n' + GOLD_CSS + '\n</style>\n</head>')
            stats['css_injected'] += 1
            modified = True
        
        # === FIX 4: Add page-title class to H1 if missing ===
        if 'page-title' not in html:
            h1_match = re.search(r'<h1>([^<]*)</h1>', html)
            if h1_match:
                html = html[:h1_match.start()] + f'<h1 class="page-title">{h1_match.group(1)}</h1>' + html[h1_match.end():]
                stats['title_added'] += 1
                modified = True
            else:
                h1_match2 = re.search(r'<h1 ([^>]*)>([^<]*)</h1>', html)
                if h1_match2 and 'page-title' not in h1_match2.group(1):
                    old = h1_match2.group(0)
                    new = old.replace('<h1 ', '<h1 class="page-title" ')
                    html = html.replace(old, new, 1)
                    stats['title_added'] += 1
                    modified = True
        
        # === FIX 5: Add footer if missing ===
        if 'class="footer"' not in html:
            footer = FOOTER_TMPL.format(prefix=prefix)
            if '</body>' in html:
                html = html.replace('</body>', footer + '\n</body>')
                stats['footer_added'] += 1
                modified = True
        
        # === FIX 6: Inject comprehensive CSS if missing ===
        if 'COMPREHENSIVE COMPONENT' not in html and '</style>' in html:
            style_end = html.rfind('</style>')
            html = html[:style_end] + COMP_CSS + '\n</style>' + html[style_end + len('</style>'):]
            stats['comp_css'] += 1
            modified = True
        
        # === FIX 7: Ensure proper nav ===
        if 'class="nav"' not in html and 'cl-nav' not in html:
            nav = NAV_TMPL.format(prefix=prefix)
            body_match = re.search(r'<body[^>]*>', html)
            if body_match:
                insert_pos = body_match.end()
                html = html[:insert_pos] + '\n' + nav + '\n' + html[insert_pos:]
                modified = True
        
        # === FIX 8: Replace old cl-nav with new nav ===
        if 'cl-nav' in html and 'class="nav"' not in html:
            old_nav = re.search(r'<nav class="cl-nav">[\s\S]*?</nav>', html)
            if old_nav:
                nav = NAV_TMPL.format(prefix=prefix)
                html = html[:old_nav.start()] + nav + html[old_nav.end():]
                modified = True
        
        # === FIX 9: Wrap content in .page div if missing ===
        if '<div class="page">' not in html and 'class="page-title"' in html:
            # Find the h1 with page-title and ensure it's inside a .page div
            pass  # Skip this — too risky to auto-restructure body content
        
        if modified:
            open(fpath, 'w').write(html)
            stats['total_modified'] += 1

print("=" * 60)
print("DEFINITIVE FIX — RESULTS")
print("=" * 60)
print(f"Total files modified: {stats['total_modified']}")
print(f"  Excess ads stripped: {stats['ads_fixed']}")
print(f"  Duplicate H1 removed: {stats['h1_fixed']}")
print(f"  Gold CSS injected: {stats['css_injected']}")
print(f"  page-title class added: {stats['title_added']}")
print(f"  Footer added: {stats['footer_added']}")
print(f"  Comprehensive CSS added: {stats['comp_css']}")
