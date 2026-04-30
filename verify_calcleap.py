#!/usr/bin/env python3
"""
CalcLeap.com Page Quality Verification Script
Checks all 1,237 pages for:
1. Broken JavaScript (onclick/function mismatches)
2. Empty result divs with no JS to populate
3. Broken internal links
4. Missing CSS files
5. Duplicate H1 tags
6. Missing meta description
"""

import xml.etree.ElementTree as ET
import re
import os
from pathlib import Path
from collections import defaultdict

def extract_urls_from_sitemap(sitemap_path):
    """Extract all URLs from sitemap.xml"""
    tree = ET.parse(sitemap_path)
    root = tree.getroot()
    ns = {'sm': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
    urls = []
    for url in root.findall('sm:url', ns):
        loc = url.find('sm:loc', ns)
        if loc is not None:
            urls.append(loc.text)
    return urls

def url_to_filepath(url, base_dir):
    """Convert URL to local filepath"""
    filename = url.replace('https://calcleap.com/', '')
    if not filename:
        filename = 'index.html'
    return os.path.join(base_dir, filename)

def check_broken_js(content, filepath):
    """Check for onclick handlers that reference non-existent functions"""
    issues = []
    
    # Find all onclick handlers
    onclick_pattern = r'onclick="([^"]+)"'
    onclicks = re.findall(onclick_pattern, content)
    
    for onclick in onclicks:
        # Extract function name (before the first parenthesis)
        func_match = re.match(r'(\w+)\s*\(', onclick)
        if func_match:
            func_name = func_match.group(1)
            # Check if function is defined in the same file
            func_def_pattern = rf'function\s+{re.escape(func_name)}\s*\('
            if not re.search(func_def_pattern, content):
                issues.append(f"onclick references undefined function: {func_name}")
    
    return issues

def check_empty_result_divs(content, filepath):
    """Check for empty result divs with no JS to populate them"""
    issues = []
    
    # Find divs with id="results" or id="toolContent"
    result_div_pattern = r'<div[^>]*id=["\'](results|toolContent)["\'][^>]*>(.*?)</div>'
    matches = re.finditer(result_div_pattern, content, re.DOTALL | re.IGNORECASE)
    
    for match in matches:
        div_id = match.group(1)
        div_content = match.group(2).strip()
        
        # Check if div is empty or only contains whitespace/comments
        if not div_content or re.match(r'^(\s|<!--.*?-->)*$', div_content, re.DOTALL):
            # Check if there's JS that populates this div
            populate_patterns = [
                rf'getElementById\(["\']({div_id})["\']\)\.innerHTML',
                rf'getElementById\(["\']({div_id})["\']\)\.textContent',
                rf'#{div_id}.*\.html\(',
                rf'#{div_id}.*\.text\(',
            ]
            
            has_js = any(re.search(pattern, content) for pattern in populate_patterns)
            
            if not has_js:
                issues.append(f"Empty div id='{div_id}' with no JS to populate it")
    
    return issues

def check_broken_internal_links(content, filepath, base_dir):
    """Check for broken internal HTML links"""
    issues = []
    
    # Find all internal links to .html files
    link_pattern = r'<a[^>]+href=["\']([^"\']+\.html)["\']'
    links = re.findall(link_pattern, content)
    
    current_dir = os.path.dirname(filepath)
    
    for link in links:
        # Skip external links
        if link.startswith('http://') or link.startswith('https://'):
            continue
        
        # Handle absolute paths (starting with /)
        if link.startswith('/'):
            target_path = os.path.join(base_dir, link.lstrip('/'))
        else:
            # Relative path
            target_path = os.path.join(current_dir, link)
        
        target_path = os.path.normpath(target_path)
        
        if not os.path.exists(target_path):
            issues.append(f"Broken internal link: {link} -> {target_path}")
    
    return issues

def check_missing_css(content, filepath, base_dir):
    """Check for missing CSS files"""
    issues = []
    
    # Find all CSS link tags
    css_pattern = r'<link[^>]+rel=["\']stylesheet["\'][^>]+href=["\']([^"\']+)["\']|<link[^>]+href=["\']([^"\']+)["\'][^>]+rel=["\']stylesheet["\']'
    matches = re.findall(css_pattern, content)
    
    current_dir = os.path.dirname(filepath)
    
    for match in matches:
        css_file = match[0] or match[1]
        
        # Skip external CSS
        if css_file.startswith('http://') or css_file.startswith('https://'):
            continue
        
        # Handle absolute paths
        if css_file.startswith('/'):
            target_path = os.path.join(base_dir, css_file.lstrip('/'))
        else:
            # Relative path
            target_path = os.path.join(current_dir, css_file)
        
        target_path = os.path.normpath(target_path)
        
        if not os.path.exists(target_path):
            issues.append(f"Missing CSS file: {css_file} -> {target_path}")
    
    return issues

def check_duplicate_h1(content, filepath):
    """Check for multiple H1 tags"""
    issues = []
    
    h1_pattern = r'<h1[^>]*>.*?</h1>'
    h1_tags = re.findall(h1_pattern, content, re.DOTALL | re.IGNORECASE)
    
    if len(h1_tags) > 1:
        issues.append(f"Duplicate H1 tags: found {len(h1_tags)} H1 tags")
    
    return issues

def check_missing_meta_description(content, filepath):
    """Check for missing meta description"""
    issues = []
    
    meta_desc_pattern = r'<meta[^>]+name=["\']description["\']'
    if not re.search(meta_desc_pattern, content, re.IGNORECASE):
        issues.append("Missing meta description tag")
    
    return issues

def main():
    base_dir = '/data/workspace/toolpulse'
    sitemap_path = os.path.join(base_dir, 'sitemap.xml')
    
    print("Extracting URLs from sitemap...", flush=True)
    urls = extract_urls_from_sitemap(sitemap_path)
    print(f"Found {len(urls)} URLs in sitemap\n", flush=True)
    
    all_issues = []
    issue_counts = defaultdict(int)
    checked = 0
    skipped = 0
    
    for url in urls:
        filepath = url_to_filepath(url, base_dir)
        
        if not os.path.exists(filepath):
            all_issues.append(f"MISSING_FILE | {filepath} | File in sitemap but not on disk")
            issue_counts['MISSING_FILE'] += 1
            skipped += 1
            continue
        
        try:
            with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
        except Exception as e:
            all_issues.append(f"READ_ERROR | {filepath} | {str(e)}")
            issue_counts['READ_ERROR'] += 1
            skipped += 1
            continue
        
        filename = os.path.basename(filepath)
        
        # Run all checks
        js_issues = check_broken_js(content, filepath)
        for issue in js_issues:
            all_issues.append(f"BROKEN_JS | {filename} | {issue}")
            issue_counts['BROKEN_JS'] += 1
        
        div_issues = check_empty_result_divs(content, filepath)
        for issue in div_issues:
            all_issues.append(f"EMPTY_RESULT_DIV | {filename} | {issue}")
            issue_counts['EMPTY_RESULT_DIV'] += 1
        
        link_issues = check_broken_internal_links(content, filepath, base_dir)
        for issue in link_issues:
            all_issues.append(f"BROKEN_LINK | {filename} | {issue}")
            issue_counts['BROKEN_LINK'] += 1
        
        css_issues = check_missing_css(content, filepath, base_dir)
        for issue in css_issues:
            all_issues.append(f"MISSING_CSS | {filename} | {issue}")
            issue_counts['MISSING_CSS'] += 1
        
        h1_issues = check_duplicate_h1(content, filepath)
        for issue in h1_issues:
            all_issues.append(f"DUPLICATE_H1 | {filename} | {issue}")
            issue_counts['DUPLICATE_H1'] += 1
        
        desc_issues = check_missing_meta_description(content, filepath)
        for issue in desc_issues:
            all_issues.append(f"MISSING_META_DESC | {filename} | {issue}")
            issue_counts['MISSING_META_DESC'] += 1
        
        checked += 1
        if checked % 100 == 0:
            print(f"Checked {checked}/{len(urls)} pages...", flush=True)
    
    # Print all issues
    print("\n" + "="*80)
    print("ALL ISSUES FOUND:")
    print("="*80 + "\n")
    
    for issue in all_issues:
        print(issue)
    
    # Print summary
    print("\n" + "="*80)
    print("SUMMARY:")
    print("="*80)
    print(f"Total pages in sitemap: {len(urls)}")
    print(f"Pages checked: {checked}")
    print(f"Pages skipped: {skipped}")
    print(f"Total issues found: {len(all_issues)}\n")
    
    for issue_type in sorted(issue_counts.keys()):
        print(f"{issue_type}: {issue_counts[issue_type]}")

if __name__ == '__main__':
    main()
