#!/usr/bin/env python3
"""
FULL site audit — catches everything the basic audit misses.
Run this before EVERY push. No exceptions.
"""

import os
import re
import glob
from collections import defaultdict

os.chdir('/data/workspace/toolpulse')

issues = defaultdict(list)
total = 0

for root, dirs, files in os.walk('.'):
    # Skip hidden dirs
    dirs[:] = [d for d in dirs if not d.startswith('.')]
    for f in files:
        if not f.endswith('.html'):
            continue
        fp = os.path.join(root, f)
        total += 1
        try:
            with open(fp, 'r', encoding='utf-8', errors='replace') as fh:
                content = fh.read()
        except:
            issues['unreadable'].append(fp)
            continue
        
        depth = root.count(os.sep)
        
        # 1. BROKEN NAV LINKS — relative links in subdirectories
        if depth > 0:
            # Check for relative links that should be absolute
            bad_navs = re.findall(r'href="((?:index|about|privacy|contact)\.html[^"]*)"', content)
            for link in bad_navs:
                if not link.startswith('/'):
                    issues['broken_nav_relative'].append(f"{fp}: href=\"{link}\"")
            
            # Check for calc/ references from within calc/
            if 'calc' in root:
                bad_calc = re.findall(r'href="(calc/[^"]*)"', content)
                for link in bad_calc:
                    issues['broken_calc_relative'].append(f"{fp}: href=\"{link}\"")
        
        # 2. BROKEN INTERNAL LINKS — links to pages that don't exist
        # Only check links in actual HTML, not inside <script> tags
        content_no_script = re.sub(r'<script[^>]*>.*?</script>', '', content, flags=re.DOTALL)
        internal_links = re.findall(r'href="(/[^"#]*\.html)"', content_no_script)
        for link in internal_links:
            if '+' in link or '{' in link:  # skip JS template expressions
                continue
            target = '.' + link  # convert /calc/foo.html to ./calc/foo.html
            if not os.path.exists(target):
                issues['dead_links'].append(f"{fp} → {link}")
        
        # 3. DUPLICATE H1 TAGS
        h1_count = len(re.findall(r'<h1[\s>]', content, re.IGNORECASE))
        if h1_count > 1:
            issues['duplicate_h1'].append(f"{fp}: {h1_count} H1 tags")
        elif h1_count == 0:
            issues['missing_h1'].append(fp)
        
        # 4. EXCESS AD SLOTS
        ad_count = len(re.findall(r'<ins\s+class="adsbygoogle"', content))
        if ad_count > 3:
            issues['excess_ads'].append(f"{fp}: {ad_count} ad slots")
        
        # 5. MISSING PAGE TITLE CLASS
        if '<h1' in content and 'page-title' not in content and 'class="page-title"' not in content:
            if not any(skip in fp for skip in ['index.html', 'about.html', 'privacy.html', 'contact.html', 'sitemap']):
                issues['missing_page_title_class'].append(fp)
        
        # 6. OLD BRANDING
        if 'ToolPulse' in content and 'toolpulse' not in fp.lower():
            issues['old_branding'].append(fp)
        if 'alexchalu.github.io/toolpulse' in content:
            issues['old_github_url'].append(fp)
        
        # 7. MISSING FOOTER
        if '</body>' in content and '<footer' not in content:
            issues['missing_footer'].append(fp)
        
        # 8. MISSING GOLD CSS
        if '</style>' in content and '#f5f5f7' not in content:
            issues['missing_gold_css'].append(fp)
        
        # 9. BROKEN JAVASCRIPT — unclosed functions, syntax issues
        scripts = re.findall(r'<script>(.*?)</script>', content, re.DOTALL)
        for script in scripts:
            opens = script.count('{')
            closes = script.count('}')
            if abs(opens - closes) > 2:
                issues['suspect_js'].append(f"{fp}: {{ {opens} vs }} {closes}")
        
        # 10. EMPTY/STUB PAGES (less than 1KB of content)
        if len(content) < 1000:
            issues['stub_page'].append(f"{fp}: {len(content)} bytes")
        
        # 11. MISSING CANONICAL
        if '<link rel="canonical"' not in content:
            if not any(skip in fp for skip in ['sitemap', 'robots', 'ads.txt']):
                issues['missing_canonical'].append(fp)
        
        # 12. HTTP MIXED CONTENT
        http_refs = re.findall(r'(src|href)="http://', content)
        if http_refs:
            issues['mixed_content'].append(f"{fp}: {len(http_refs)} http:// refs")

# REPORT
print(f"{'='*60}")
print(f"FULL SITE AUDIT — {total} pages scanned")
print(f"{'='*60}")

critical = 0
warnings = 0

for category, items in sorted(issues.items()):
    is_critical = category in ['broken_nav_relative', 'broken_calc_relative', 'dead_links', 'duplicate_h1', 'excess_ads', 'old_github_url', 'suspect_js']
    label = "🔴 CRITICAL" if is_critical else "🟡 WARNING"
    if is_critical:
        critical += len(items)
    else:
        warnings += len(items)
    
    print(f"\n{label}: {category} ({len(items)} issues)")
    for item in items[:5]:  # Show first 5
        print(f"  {item}")
    if len(items) > 5:
        print(f"  ... and {len(items) - 5} more")

print(f"\n{'='*60}")
print(f"SUMMARY: {total} pages | 🔴 {critical} critical | 🟡 {warnings} warnings")
if critical == 0:
    print("✅ NO CRITICAL ISSUES — safe to push")
else:
    print("❌ FIX CRITICAL ISSUES BEFORE PUSHING")
print(f"{'='*60}")
