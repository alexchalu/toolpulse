#!/usr/bin/env python3
"""
COMPREHENSIVE SEO & AdSense Audit for CalcLeap.com
Checks all 10 requirements with detailed reporting
"""
import os
import re
import xml.etree.ElementTree as ET
from pathlib import Path
from collections import defaultdict
import json

ADSENSE_ID_FULL = "ca-pub-3112605892426625"
ADSENSE_ID_SHORT = "pub-3112605892426625"
ADSENSE_ID_NUM = "3112605892426625"
SITEMAP_URL = "https://calcleap.com/sitemap.xml"
CANONICAL_DOMAIN = "calcleap.com"
WRONG_DOMAINS = ["alexchalu.github.io"]

issues = {}
stats = defaultdict(int)

def add_issue(category, detail):
    if category not in issues:
        issues[category] = []
    issues[category].append(detail)

print("="*80)
print("COMPREHENSIVE SEO & AdSense AUDIT - CalcLeap.com")
print("="*80)

os.chdir('/data/workspace/toolpulse')

# ============================================================================
# 1. ROBOTS.TXT
# ============================================================================
print("\n[1/10] Checking robots.txt...")
try:
    with open('robots.txt', 'r') as f:
        robots_content = f.read()
    
    if SITEMAP_URL in robots_content:
        print(f"  ✓ Sitemap URL correct: {SITEMAP_URL}")
        stats['robots_sitemap_ok'] = 1
    else:
        add_issue("1_ROBOTS", f"Sitemap URL missing or incorrect. Expected: {SITEMAP_URL}")
        print(f"  ✗ Sitemap URL issue")
    
    disallow_important = []
    for line in robots_content.split('\n'):
        if line.strip().startswith('Disallow:') and line.strip() != 'Disallow:':
            path = line.split(':', 1)[1].strip()
            if not path.startswith('/scripts') and not path.startswith('/*.js'):
                disallow_important.append(line.strip())
    
    if disallow_important:
        for rule in disallow_important:
            add_issue("1_ROBOTS", f"Potentially blocking important content: {rule}")
        print(f"  ⚠  {len(disallow_important)} disallow rules found")
    else:
        print("  ✓ No important pages blocked")
        
except Exception as e:
    add_issue("1_ROBOTS", f"Error reading robots.txt: {e}")
    print(f"  ✗ Error reading robots.txt")

# ============================================================================
# 2. SITEMAP.XML - URL VALIDATION
# ============================================================================
print("\n[2/10] Checking sitemap.xml and file existence...")
sitemap_urls = []
try:
    tree = ET.parse('sitemap.xml')
    root = tree.getroot()
    ns = {'sm': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
    
    for url_elem in root.findall('sm:url', ns):
        loc = url_elem.find('sm:loc', ns)
        if loc is not None:
            sitemap_urls.append(loc.text)
    
    stats['sitemap_total_urls'] = len(sitemap_urls)
    print(f"  ✓ Sitemap contains {len(sitemap_urls)} URLs")
    
    # Check if files exist
    missing_files = []
    for url in sitemap_urls:
        filepath = url.replace('https://calcleap.com/', '')
        if not os.path.exists(filepath):
            missing_files.append(filepath)
    
    if missing_files:
        stats['missing_files'] = len(missing_files)
        for f in missing_files:
            add_issue("2_SITEMAP", f"File in sitemap but doesn't exist: {f}")
        print(f"  ✗ {len(missing_files)} files in sitemap don't exist on disk")
    else:
        print(f"  ✓ All {len(sitemap_urls)} sitemap URLs point to existing files")
        stats['all_files_exist'] = 1
        
except Exception as e:
    add_issue("2_SITEMAP", f"Error parsing sitemap.xml: {e}")
    print(f"  ✗ Error parsing sitemap")

# ============================================================================
# 3. ADS.TXT
# ============================================================================
print("\n[3/10] Checking ads.txt...")
try:
    with open('ads.txt', 'r') as f:
        ads_content = f.read()
    
    if ADSENSE_ID_NUM in ads_content:
        print(f"  ✓ AdSense publisher ID found: {ADSENSE_ID_NUM}")
        stats['ads_txt_ok'] = 1
    else:
        add_issue("3_ADS_TXT", f"AdSense publisher ID not found: {ADSENSE_ID_NUM}")
        print(f"  ✗ AdSense ID missing")
        
except Exception as e:
    add_issue("3_ADS_TXT", f"Error reading ads.txt: {e}")
    print(f"  ✗ ads.txt not found or error")

# ============================================================================
# 4-10. DETAILED PAGE CHECKS
# ============================================================================
print("\n[4-10] Analyzing HTML pages (sampling 30 + checking all for viewport)...")

html_files = [url.replace('https://calcleap.com/', '') for url in sitemap_urls if url.endswith('.html')]
print(f"  Total HTML files in sitemap: {len(html_files)}")

# Sample for detailed checks
sample_size = 30
step = max(1, len(html_files) // sample_size)
sampled_files = html_files[::step][:sample_size]

schema_missing = []
canonical_missing = []
canonical_wrong = []
og_missing = defaultdict(list)
external_deps = []
adsense_missing = []
http_links_found = []

print(f"  Checking sample of {len(sampled_files)} pages in detail...")

for filepath in sampled_files:
    if not os.path.exists(filepath):
        continue
        
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        # 4. Schema markup
        if 'application/ld+json' in content:
            schema_matches = re.findall(r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', content, re.DOTALL | re.IGNORECASE)
            if schema_matches:
                try:
                    schema_data = json.loads(schema_matches[0])
                    if '@context' in schema_data and '@type' in schema_data:
                        stats['schema_valid'] += 1
                    else:
                        schema_missing.append(filepath + " (missing @context/@type)")
                except:
                    schema_missing.append(filepath + " (invalid JSON-LD)")
            else:
                schema_missing.append(filepath)
        else:
            schema_missing.append(filepath)
        
        # 5. Canonical URL
        canonical_match = re.search(r'<link[^>]*rel=["\']canonical["\'][^>]*href=["\']([^"\']+)["\']', content, re.IGNORECASE)
        if canonical_match:
            canonical_url = canonical_match.group(1)
            if CANONICAL_DOMAIN not in canonical_url:
                canonical_wrong.append(f"{filepath} → {canonical_url}")
            for wrong_domain in WRONG_DOMAINS:
                if wrong_domain in canonical_url:
                    canonical_wrong.append(f"{filepath} → {canonical_url} (wrong domain!)")
            stats['has_canonical'] += 1
        else:
            canonical_missing.append(filepath)
        
        # 6. Open Graph tags
        if not re.search(r'<meta[^>]*property=["\']og:title["\']', content, re.IGNORECASE):
            og_missing['og:title'].append(filepath)
        if not re.search(r'<meta[^>]*property=["\']og:description["\']', content, re.IGNORECASE):
            og_missing['og:description'].append(filepath)
        if not re.search(r'<meta[^>]*property=["\']og:url["\']', content, re.IGNORECASE):
            og_missing['og:url'].append(filepath)
        
        # 8. External resources
        external_css = re.findall(r'<link[^>]*href=["\']https?://(?!calcleap\.com)[^"\']+\.css', content, re.IGNORECASE)
        external_js = re.findall(r'<script[^>]*src=["\']https?://(?!calcleap\.com)[^"\']+["\']', content, re.IGNORECASE)
        
        # Filter out allowed resources
        forbidden_external = []
        for res in external_css + external_js:
            if all(domain not in res.lower() for domain in ['googleadservices', 'google-analytics', 'googletagmanager', 'adsbygoogle', 'pagead2', 'googlesyndication']):
                forbidden_external.append(res)
        
        if forbidden_external:
            external_deps.append(f"{filepath}: {forbidden_external[:2]}")
        
        # 9. AdSense code
        if ADSENSE_ID_NUM not in content:
            adsense_missing.append(filepath)
        else:
            stats['has_adsense'] += 1
        
        # 10. HTTP links
        http_links = re.findall(r'href=["\']http://calcleap\.com', content, re.IGNORECASE)
        if http_links:
            http_links_found.append(f"{filepath} ({len(http_links)} links)")
            
    except Exception as e:
        add_issue("PARSE_ERROR", f"{filepath}: {e}")

# 7. Check ALL pages for viewport
print(f"  Checking ALL {len(html_files)} pages for viewport...")
viewport_missing = []

for filepath in html_files:
    if not os.path.exists(filepath):
        continue
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        viewport_match = re.search(r'<meta[^>]*name=["\']viewport["\'][^>]*>', content, re.IGNORECASE)
        if not viewport_match:
            viewport_missing.append(filepath)
        elif 'width=device-width' not in viewport_match.group(0) or 'initial-scale' not in viewport_match.group(0):
            viewport_missing.append(filepath + " (incorrect)")
        else:
            stats['viewport_ok'] += 1
    except:
        pass

stats['viewport_checked'] = len(html_files)

# ============================================================================
# REPORT FINDINGS
# ============================================================================
print("\n" + "="*80)
print("FINDINGS SUMMARY")
print("="*80)

if schema_missing:
    print(f"\n[4] SCHEMA MARKUP - {len(schema_missing)} pages missing valid JSON-LD:")
    for f in schema_missing[:10]:
        print(f"  • {f}")
        add_issue("4_SCHEMA", f)
    if len(schema_missing) > 10:
        print(f"  ... and {len(schema_missing)-10} more")

if canonical_missing:
    print(f"\n[5] CANONICAL URL - {len(canonical_missing)} pages missing canonical tag:")
    for f in canonical_missing[:10]:
        print(f"  • {f}")
        add_issue("5_CANONICAL", f"Missing: {f}")
    if len(canonical_missing) > 10:
        print(f"  ... and {len(canonical_missing)-10} more")

if canonical_wrong:
    print(f"\n[5] CANONICAL URL - {len(canonical_wrong)} pages with wrong canonical:")
    for f in canonical_wrong[:10]:
        print(f"  • {f}")
        add_issue("5_CANONICAL", f"Wrong domain: {f}")

if og_missing['og:title'] or og_missing['og:description'] or og_missing['og:url']:
    print(f"\n[6] OPEN GRAPH TAGS:")
    if og_missing['og:title']:
        print(f"  og:title missing on {len(og_missing['og:title'])} pages")
        for f in og_missing['og:title'][:5]:
            add_issue("6_OG", f"Missing og:title: {f}")
    if og_missing['og:description']:
        print(f"  og:description missing on {len(og_missing['og:description'])} pages")
        for f in og_missing['og:description'][:5]:
            add_issue("6_OG", f"Missing og:description: {f}")
    if og_missing['og:url']:
        print(f"  og:url missing on {len(og_missing['og:url'])} pages")
        for f in og_missing['og:url'][:5]:
            add_issue("6_OG", f"Missing og:url: {f}")

if viewport_missing:
    print(f"\n[7] VIEWPORT - {len(viewport_missing)} pages missing/incorrect viewport:")
    for f in viewport_missing[:10]:
        print(f"  • {f}")
        add_issue("7_VIEWPORT", f)
    if len(viewport_missing) > 10:
        print(f"  ... and {len(viewport_missing)-10} more")
else:
    print(f"\n[7] VIEWPORT - ✓ All {stats['viewport_ok']} pages have correct viewport")

if external_deps:
    print(f"\n[8] EXTERNAL RESOURCES - {len(external_deps)} pages with CDN dependencies:")
    for item in external_deps:
        print(f"  • {item}")
        add_issue("8_EXTERNAL", item)

if adsense_missing:
    print(f"\n[9] ADSENSE CODE - {len(adsense_missing)} pages missing AdSense:")
    for f in adsense_missing[:10]:
        print(f"  • {f}")
        add_issue("9_ADSENSE", f)
    if len(adsense_missing) > 10:
        print(f"  ... and {len(adsense_missing)-10} more")
else:
    print(f"\n[9] ADSENSE CODE - ✓ All sampled pages have AdSense")

if http_links_found:
    print(f"\n[10] HTTP LINKS - {len(http_links_found)} pages with http:// links:")
    for item in http_links_found:
        print(f"  • {item}")
        add_issue("10_HTTPS", item)
else:
    print(f"\n[10] HTTP LINKS - ✓ No http:// internal links found")

# ============================================================================
# STATISTICS & FINAL REPORT
# ============================================================================
print("\n" + "="*80)
print("STATISTICS")
print("="*80)
print(f"Total URLs in sitemap: {stats['sitemap_total_urls']}")
print(f"HTML files checked (sample): {len(sampled_files)}")
print(f"Viewport checked (all pages): {stats['viewport_checked']}")
print(f"Pages with valid schema: {stats['schema_valid']}/{len(sampled_files)}")
print(f"Pages with canonical: {stats['has_canonical']}/{len(sampled_files)}")
print(f"Pages with AdSense: {stats['has_adsense']}/{len(sampled_files)}")
print(f"Pages with viewport: {stats['viewport_ok']}/{stats['viewport_checked']}")

total_issues = sum(len(v) for v in issues.values())
print(f"\nTotal issues found: {total_issues}")

if total_issues > 0:
    print("\n" + "="*80)
    print("ALL ISSUES BY CATEGORY")
    print("="*80)
    for category in sorted(issues.keys()):
        print(f"\n{category} ({len(issues[category])} issues):")
        for issue in issues[category][:20]:
            print(f"  {issue}")
        if len(issues[category]) > 20:
            print(f"  ... and {len(issues[category])-20} more")

# Write detailed report
with open('seo_audit_detailed.txt', 'w') as f:
    f.write("="*80 + "\n")
    f.write("SEO & AdSense AUDIT - CalcLeap.com - DETAILED REPORT\n")
    f.write("="*80 + "\n\n")
    
    for category in sorted(issues.keys()):
        f.write(f"\n{category} ({len(issues[category])} issues):\n")
        f.write("-"*80 + "\n")
        for issue in issues[category]:
            f.write(f"{issue}\n")

print("\n✓ Detailed report saved to: seo_audit_detailed.txt")
print("="*80)
