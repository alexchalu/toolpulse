#!/usr/bin/env python3
"""Fix pages missing page-title class and gold CSS"""
import re
from pathlib import Path

# Read the gold CSS once
gold_css_path = Path('/data/workspace/toolpulse/GOLD-CSS.txt')
if gold_css_path.exists():
    gold_css = gold_css_path.read_text().strip()
else:
    print("GOLD-CSS.txt not found")
    exit(1)

html_files = [
    './toolpulse/insolvency-calculator.html',
    './toolpulse/alabama-sales-tax-calculator.html',
]

for file_path in html_files:
    p = Path(file_path)
    if not p.exists():
        continue
    
    content = p.read_text()
    
    # Fix 1: Add page-title class to h1 if missing
    if 'class="page-title"' not in content:
        content = re.sub(
            r'(<h1[^>]*)(>)',
            r'\1 class="page-title"\2',
            content,
            count=1
        )
    
    # Fix 2: Add gold CSS if missing
    if ':root{--white:#fff' not in content:
        # Insert before </style>
        content = content.replace('</style>', f'\n\n{gold_css}\n</style>', 1)
    
    p.write_text(content)
    print(f"✓ Fixed {p.name}")

print("\n✅ Quality fixes applied")
