#!/usr/bin/env python3
"""
ADA/WCAG 2.1 AA Compliance Fix for CalcLeap
============================================
Surgical fixes — does NOT restructure body content or touch calculator JS.

Fixes:
1. Add skip-nav link after <body>
2. Add aria-label to nav
3. Add "for" attributes to labels that are missing them
4. Add aria-label to inputs/selects that have no associated label
5. Fix footer headings: h5 → h4 (proper hierarchy)
6. Add role="main" to content area
7. Add role="contentinfo" to footer
8. Add aria-label to the search/filter input on homepage
"""

import os
import re
import glob
import sys

def fix_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
            html = f.read()
    except:
        return False, "read error"
    
    original = html
    changes = []
    
    # 1. Add skip-nav link right after <body> (if not already present)
    if 'skip-to-content' not in html and '<body' in html:
        html = re.sub(
            r'(<body[^>]*>)',
            r'\1\n<a href="#main-content" class="skip-link" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;z-index:9999;padding:8px 16px;background:#0071e3;color:#fff;text-decoration:none;font-size:14px;border-radius:0 0 4px 0;" onfocus="this.style.position=\'fixed\';this.style.left=\'0\';this.style.top=\'0\';this.style.width=\'auto\';this.style.height=\'auto\';this.style.overflow=\'visible\'" onblur="this.style.position=\'absolute\';this.style.left=\'-9999px\';this.style.width=\'1px\';this.style.height=\'1px\';this.style.overflow=\'hidden\'">Skip to content</a>',
            html, count=1
        )
        changes.append("skip-nav")
    
    # 2. Add aria-label and role to nav
    if '<nav class="nav">' in html and 'aria-label' not in html.split('</nav>')[0].split('<nav')[1] if '<nav' in html else True:
        html = html.replace(
            '<nav class="nav">',
            '<nav class="nav" role="navigation" aria-label="Main navigation">'
        )
        changes.append("nav-aria")
    
    # 3. Add id="main-content" to the first .page div or first main content area
    if 'id="main-content"' not in html:
        # Try <div class="page">
        if '<div class="page">' in html:
            html = html.replace(
                '<div class="page">',
                '<div class="page" id="main-content" role="main">',
                1
            )
            changes.append("main-landmark")
        # Try <main> tag
        elif '<main' in html and 'role="main"' not in html:
            html = re.sub(r'<main([^>]*)>', r'<main\1 id="main-content" role="main">', html, count=1)
            changes.append("main-landmark")
    
    # 4. Fix labels without "for" attribute — match label followed by input/select with id
    def fix_label_for(match):
        full = match.group(0)
        label_text = match.group(1)
        input_tag = match.group(2)
        
        # Extract id from the input/select
        id_match = re.search(r'id="([^"]+)"', input_tag)
        if id_match and 'for="' not in full.split('</label>')[0]:
            input_id = id_match.group(1)
            # Add for= to label
            full = full.replace(
                f'<label>{label_text}</label>',
                f'<label for="{input_id}">{label_text}</label>'
            )
            return full
        return full
    
    # Pattern: <label>Text</label> followed (possibly with whitespace) by <input/select with id>
    pattern = r'<label>([^<]+)</label>(\s*<(?:input|select)[^>]*id="[^"]*"[^>]*>)'
    new_html = re.sub(pattern, fix_label_for, html)
    if new_html != html:
        changes.append("label-for")
        html = new_html
    
    # Also handle: <label>Text</label>\n<input...> (with newlines between)
    pattern2 = r'<label>([^<]+)</label>([\s\S]{0,50}?<(?:input|select)[^>]*id="[^"]*"[^>]*>)'
    new_html = re.sub(pattern2, fix_label_for, html)
    if new_html != html:
        changes.append("label-for-2")
        html = new_html
    
    # 5. Add aria-label to inputs/selects that still have no label association
    def add_aria_to_input(match):
        tag = match.group(0)
        if 'aria-label' in tag:
            return tag
        
        # Try to get label from placeholder
        placeholder = re.search(r'placeholder="([^"]*)"', tag)
        # Or from id
        id_match = re.search(r'id="([^"]*)"', tag)
        
        if placeholder:
            label = placeholder.group(1)
        elif id_match:
            # Convert id to readable label: "lwZip_foo" -> "ZIP", "weight-lbs" -> "Weight lbs"
            label = id_match.group(1)
            label = re.sub(r'^lw([A-Z])', r'\1', label)  # Strip lw prefix
            label = label.split('_')[0]  # Strip suffix after underscore
            label = re.sub(r'([a-z])([A-Z])', r'\1 \2', label)  # camelCase to spaces
            label = label.replace('-', ' ').replace('_', ' ').title()
        else:
            return tag
        
        # Insert aria-label before the closing >
        return tag[:-1] + f' aria-label="{label}">'
    
    # Find inputs without aria-label that aren't inside a label-for relationship
    html = re.sub(r'<input[^>]*>', add_aria_to_input, html)
    html = re.sub(r'<select[^>]*>', add_aria_to_input, html)
    if html != original:
        changes.append("aria-inputs")
    
    # 6. Fix footer h5 → h4 (inside footer only)
    footer_match = re.search(r'(<footer[\s\S]*</footer>)', html)
    if footer_match:
        footer = footer_match.group(1)
        new_footer = footer.replace('<h5>', '<h4>').replace('</h5>', '</h4>')
        if new_footer != footer:
            html = html.replace(footer, new_footer)
            changes.append("footer-headings")
    
    # 7. Add role="contentinfo" to footer
    if '<footer' in html and 'role="contentinfo"' not in html:
        html = re.sub(r'<footer([^>]*)>', r'<footer\1 role="contentinfo">', html, count=1)
        changes.append("footer-role")
    
    # 8. Add lang to html if missing
    if '<html>' in html:
        html = html.replace('<html>', '<html lang="en">')
        changes.append("lang")
    
    # 9. Ensure buttons have accessible text
    # Find buttons with only icons (no text content)
    html = re.sub(
        r'<button([^>]*)>([\s]*<(?:i|svg|span)[^>]*>[\s\S]*?</(?:i|svg|span)>[\s]*)</button>',
        lambda m: f'<button{m.group(1)} aria-label="Button">{m.group(2)}</button>' if 'aria-label' not in m.group(1) else m.group(0),
        html
    )
    
    if html != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html)
        return True, changes
    
    return False, []

# Process all HTML files
html_files = glob.glob('**/*.html', recursive=True)
total = len(html_files)
fixed = 0
errors = 0

print(f"Processing {total} HTML files for ADA compliance...")
print()

for i, f in enumerate(html_files):
    changed, changes = fix_file(f)
    if changed:
        fixed += 1
    if isinstance(changes, str) and changes == "read error":
        errors += 1
    
    if (i+1) % 500 == 0:
        print(f"  {i+1}/{total} processed, {fixed} fixed so far...")

print()
print(f"=== COMPLETE ===")
print(f"Total files: {total}")
print(f"Files modified: {fixed}")
print(f"Errors: {errors}")
