#!/usr/bin/env python3
"""Add gold.css link to all HTML files that need it"""

import os
from pathlib import Path

def add_gold_css(filepath):
    """Add gold.css link to a file if not present"""
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # Check if gold.css is already linked
    if 'gold.css' in content:
        return False  # Already has it
    
    # Find the first </head> tag and insert before it
    if '</head>' in content:
        content = content.replace('</head>', '<link rel="stylesheet" href="gold.css">\n</head>')
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    
    return False

def main():
    os.chdir('/data/workspace/toolpulse')
    
    # Get all HTML files in root and common subdirectories
    html_files = list(Path('.').glob('*.html'))
    html_files += list(Path('calc').glob('*.html'))
    html_files += list(Path('blog').glob('*.html'))
    html_files += list(Path('tools').glob('*.html'))
    
    fixed_count = 0
    for filepath in html_files:
        filepath_str = str(filepath)
        if filepath.name in ['index.html', 'sitemap.xml', '404.html']:
            continue
        
        if add_gold_css(filepath_str):
            print(f"✓ Added gold.css to {filepath_str}")
            fixed_count += 1
    
    print(f"\n✅ Fixed {fixed_count} files")

if __name__ == '__main__':
    main()
