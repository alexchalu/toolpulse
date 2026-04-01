#!/usr/bin/env python3
"""
CalcLeap.com SEO & AdSense Compliance Verification
Checks all 10 requirements systematically
"""
import os
import re
import xml.etree.ElementTree as ET
from pathlib import Path
from collections import defaultdict
import json

ADSENSE_ID = "ca-pub-3112605892426625"
SITEMAP_URL = "https://calcleap.com/sitemap.xml"
CANONICAL_DOMAIN = "calcleap.com"

issues = []
warnings = []
stats = defaultdict(int)

def log_issue(category, file, detail):
    issues.append(f"[{category}] {file}: {detail}")

def log_warning(category, file, detail):
    warnings.append(f"[{category}] {file}: {detail}")

def check_robots_txt():
    """1. robots.txt verification"""
    print("1. Checking robots.txt...")
    try:
        with open('robots.txt', 'r') as f:
            content = f.read()
        
        if SITEMAP_URL not in content:
            log_issue("ROBOTS", "robots.txt", f"Missing or incorrect sitemap URL. Expected: {SITEMAP_URL}")
        
        if "Disallow:" in content and "Disallow: /" not in content:
            # Check if important pages are blocked
            disallow_lines = [l for l in content.split('\n') if l.strip().startswith('Disallow:')]
            for line in disallow_lines:
                log_warning("ROBOTS", "robots.txt", f"Found disallow rule: {line}")
        
        stats['robots_ok'] = 1
    except Exception as e:
        log_issue("ROBOTS", "robots.txt", f"Error reading: {e}")

def check_ads_txt():
    """3. ads.txt verification"""
    print("3. Checking ads.txt...")
    try:
        with open('ads.txt', 'r') as f:
            content = f.read()
        
        if ADSENSE_ID not in content:
            log_issue("ADS.TXT", "ads.txt", f"Missing AdSense publisher ID: {ADSENSE_ID}")
        else:
            stats['ads_txt_ok'] = 1
    except Exception as e:
        log_issue("ADS.TXT", "ads.txt", f"Error reading: {e}")

def extract_sitemap_urls():
    """2. Extract all URLs from sitemap"""
    print("2. Parsing sitemap.xml...")
    urls = []
    try:
        tree = ET.parse('sitemap.xml')
        root = tree.getroot()
        ns = {'sm': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
        
        for url in root.findall('sm:url', ns):
            loc = url.find('sm:loc', ns)
            if loc is not None:
                urls.append(loc.text)
        
        stats['sitemap_urls'] = len(urls)
        print(f"   Found {len(urls)} URLs in sitemap")
    except Exception as e:
        log_issue("SITEMAP", "sitemap.xml", f"Error parsing: {e}")
    
    return urls

def verify_sitemap_files(sitemap_urls):
    """2. Verify all sitemap URLs point to existing files"""
    print("2. Verifying sitemap URLs point to existing files...")
    missing = []
    
    for url in sitemap_urls:
        # Extract filename from URL
        filename = url.replace('https://calcleap.com/', '')
        
        if not os.path.exists(filename):
            missing.append(filename)
    
    if missing:
        for f in missing[:10]:  # Show first 10
            log_issue("SITEMAP", f, "File does not exist on disk but listed in sitemap")
        if len(missing) > 10:
            log_issue("SITEMAP", "sitemap.xml", f"Total {len(missing)} missing files (showing first 10)")
    
    stats['missing_files'] = len(missing)
    stats['existing_files'] = len(sitemap_urls) - len(missing)

def check_html_file(filepath, sample=False):
    """Check individual HTML file for all SEO/AdSense requirements"""
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        results = {
            'has_schema': False,
            'has_canonical': False,
            'canonical_correct': False,
            'has_og_title': False,
            'has_og_description': False,
            'has_og_url': False,
            'has_viewport': False,
            'has_external_resources': False,
            'external_resources': [],
            'has_adsense': False,
            'has_noindex': False,
            'has_http_links': False,
            'http_links': []
        }
        
        # 4. Schema markup (JSON-LD)
        schema_pattern = r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>'
        schema_matches = re.findall(schema_pattern, content, re.DOTALL | re.IGNORECASE)
        if schema_matches:
            results['has_schema'] = True
            try:
                schema_data = json.loads(schema_matches[0])
                if '@context' in schema_data and '@type' in schema_data:
                    stats['schema_valid'] += 1
                else:
                    log_issue("SCHEMA", filepath, "JSON-LD missing @context or @type")
            except:
                log_issue("SCHEMA", filepath, "Invalid JSON-LD schema")
        else:
            if sample:
                log_issue("SCHEMA", filepath, "Missing JSON-LD schema markup")
        
        # 5. Canonical URL
        canonical_match = re.search(r'<link[^>]*rel=["\']canonical["\'][^>]*href=["\']([^"\']+)["\']', content, re.IGNORECASE)
        if canonical_match:
            results['has_canonical'] = True
            canonical_url = canonical_match.group(1)
            if CANONICAL_DOMAIN in canonical_url and 'alexchalu.github.io' not in canonical_url:
                results['canonical_correct'] = True
                stats['canonical_correct'] += 1
            else:
                if sample:
                    log_issue("CANONICAL", filepath, f"Wrong canonical domain: {canonical_url}")
        else:
            if sample:
                log_issue("CANONICAL", filepath, "Missing canonical URL")
        
        # 6. Open Graph tags
        if re.search(r'<meta[^>]*property=["\']og:title["\']', content, re.IGNORECASE):
            results['has_og_title'] = True
            stats['og_title'] += 1
        elif sample:
            log_issue("OG", filepath, "Missing og:title")
        
        if re.search(r'<meta[^>]*property=["\']og:description["\']', content, re.IGNORECASE):
            results['has_og_description'] = True
            stats['og_description'] += 1
        elif sample:
            log_issue("OG", filepath, "Missing og:description")
        
        if re.search(r'<meta[^>]*property=["\']og:url["\']', content, re.IGNORECASE):
            results['has_og_url'] = True
            stats['og_url'] += 1
        elif sample:
            log_issue("OG", filepath, "Missing og:url")
        
        # 7. Mobile viewport
        viewport_match = re.search(r'<meta[^>]*name=["\']viewport["\'][^>]*>', content, re.IGNORECASE)
        if viewport_match:
            if 'width=device-width' in viewport_match.group(0) and 'initial-scale=1' in viewport_match.group(0):
                results['has_viewport'] = True
                stats['viewport_ok'] += 1
            else:
                log_issue("VIEWPORT", filepath, f"Viewport tag exists but incorrect: {viewport_match.group(0)[:100]}")
        else:
            log_issue("VIEWPORT", filepath, "Missing viewport meta tag")
        
        # 8. External resources (CSS/JS)
        external_css = re.findall(r'<link[^>]*href=["\']https?://(?!calcleap\.com)[^"\']+\.css[^"\']*["\']', content, re.IGNORECASE)
        external_js = re.findall(r'<script[^>]*src=["\']https?://(?!calcleap\.com)[^"\']+["\']', content, re.IGNORECASE)
        
        # Filter out AdSense and analytics (allowed)
        external_resources = []
        for res in external_css + external_js:
            if 'googleadservices' not in res and 'google-analytics' not in res and 'googletagmanager' not in res and 'adsbygoogle' not in res and 'pagead2' not in res:
                external_resources.append(res)
        
        if external_resources:
            results['has_external_resources'] = True
            results['external_resources'] = external_resources
            if sample:
                for res in external_resources[:3]:
                    log_issue("EXTERNAL", filepath, f"External resource: {res[:100]}")
        
        # 9. AdSense code
        if ADSENSE_ID in content:
            results['has_adsense'] = True
            stats['has_adsense'] += 1
        
        # Check for noindex
        if 'noindex' in content.lower():
            results['has_noindex'] = True
            if results['has_adsense']:
                log_issue("ADSENSE", filepath, "Has AdSense code on noindexed page (wasted impressions)")
        
        # 10. HTTPS links
        http_links = re.findall(r'href=["\']http://calcleap\.com[^"\']*["\']', content, re.IGNORECASE)
        if http_links:
            results['has_http_links'] = True
            results['http_links'] = http_links
            if sample:
                for link in http_links[:3]:
                    log_issue("HTTPS", filepath, f"HTTP link to calcleap.com: {link[:100]}")
        
        return results
        
    except Exception as e:
        log_issue("FILE", filepath, f"Error reading: {e}")
        return None

def sample_pages_check(sitemap_urls, sample_size=20):
    """4-10. Sample pages for detailed checks"""
    print(f"\n4-10. Checking sample of {sample_size} pages for SEO compliance...")
    
    # Get HTML files from sitemap
    html_files = [url.replace('https://calcleap.com/', '') for url in sitemap_urls if url.endswith('.html')]
    
    # Sample evenly
    step = max(1, len(html_files) // sample_size)
    sampled = html_files[::step][:sample_size]
    
    print(f"   Sampled {len(sampled)} pages")
    
    for filepath in sampled:
        if os.path.exists(filepath):
            check_html_file(filepath, sample=True)

def check_all_viewport(sitemap_urls):
    """7. Check ALL pages for viewport (requirement says ALL)"""
    print("\n7. Checking ALL sitemap pages for viewport meta tag...")
    
    html_files = [url.replace('https://calcleap.com/', '') for url in sitemap_urls if url.endswith('.html')]
    missing_viewport = []
    
    for filepath in html_files:
        if os.path.exists(filepath):
            try:
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                
                viewport_match = re.search(r'<meta[^>]*name=["\']viewport["\'][^>]*>', content, re.IGNORECASE)
                if not viewport_match or 'width=device-width' not in viewport_match.group(0):
                    missing_viewport.append(filepath)
            except:
                pass
    
    if missing_viewport:
        for f in missing_viewport[:20]:
            log_issue("VIEWPORT", f, "Missing or incorrect viewport meta tag")
        if len(missing_viewport) > 20:
            log_issue("VIEWPORT", "ALL PAGES", f"Total {len(missing_viewport)} pages missing viewport (showing first 20)")
    
    stats['viewport_missing'] = len(missing_viewport)
    stats['viewport_checked'] = len(html_files)

def generate_report():
    """Generate final report"""
    print("\n" + "="*80)
    print("SEO & AdSense COMPLIANCE REPORT - CalcLeap.com")
    print("="*80)
    
    print("\n📊 STATISTICS:")
    print("-" * 80)
    for key, value in sorted(stats.items()):
        print(f"  {key}: {value}")
    
    if issues:
        print(f"\n❌ ISSUES FOUND ({len(issues)}):")
        print("-" * 80)
        for issue in issues:
            print(f"  {issue}")
    else:
        print("\n✅ NO CRITICAL ISSUES FOUND")
    
    if warnings:
        print(f"\n⚠️  WARNINGS ({len(warnings)}):")
        print("-" * 80)
        for warning in warnings[:50]:
            print(f"  {warning}")
        if len(warnings) > 50:
            print(f"  ... and {len(warnings) - 50} more warnings")
    
    print("\n" + "="*80)
    
    # Write detailed report
    with open('seo_compliance_report.txt', 'w') as f:
        f.write("="*80 + "\n")
        f.write("SEO & AdSense COMPLIANCE REPORT - CalcLeap.com\n")
        f.write("="*80 + "\n\n")
        
        f.write("STATISTICS:\n")
        f.write("-" * 80 + "\n")
        for key, value in sorted(stats.items()):
            f.write(f"{key}: {value}\n")
        
        f.write("\n\nISSUES:\n")
        f.write("-" * 80 + "\n")
        for issue in issues:
            f.write(issue + "\n")
        
        f.write("\n\nWARNINGS:\n")
        f.write("-" * 80 + "\n")
        for warning in warnings:
            f.write(warning + "\n")
    
    print("\nDetailed report saved to: seo_compliance_report.txt")

def main():
    os.chdir('/data/workspace/toolpulse')
    
    # Run all checks
    check_robots_txt()
    check_ads_txt()
    
    sitemap_urls = extract_sitemap_urls()
    
    if sitemap_urls:
        verify_sitemap_files(sitemap_urls)
        sample_pages_check(sitemap_urls, sample_size=20)
        check_all_viewport(sitemap_urls)
    
    generate_report()

if __name__ == '__main__':
    main()
