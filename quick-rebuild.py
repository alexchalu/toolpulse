#!/usr/bin/env python3
"""
Quick rebuild script for CalcLeap pages.
Ensures proper CSS linking and structure.
"""

import os
import re
import sys
from pathlib import Path

def rebuild_page(filename):
    """Rebuild a single page to ensure proper structure."""
    
    filepath = Path(filename)
    if not filepath.exists():
        print(f"✗ {filename} not found")
        return False
    
    # Read content
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Ensure gold.css is linked
    if 'gold.css' not in content:
        # Find the first </head> and insert gold.css link before it
        if '</head>' in content:
            content = content.replace('</head>', 
                '    <link rel="stylesheet" href="css/gold.css">\n    </head>')
        else:
            # Add before </title> if no head
            if '</title>' in content:
                content = content.replace('</title>', '</title>\n    <link rel="stylesheet" href="css/gold.css">')
    
    # Ensure style.css is linked
    if 'style.css' not in content:
        if '</head>' in content:
            content = content.replace('</head>', 
                '    <link rel="stylesheet" href="css/style.css">\n    </head>')
    
    # Ensure calculator.css is linked
    if 'calculator.css' not in content:
        if '</head>' in content:
            content = content.replace('</head>', 
                '    <link rel="stylesheet" href="css/calculator.css">\n    </head>')
    
    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    return True

def test_page(filename):
    """Test that a page has proper structure."""
    
    filepath = Path(filename)
    if not filepath.exists():
        print(f"✗ {filename} not found")
        return False
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    checks = [
        ('gold.css link', 'gold.css' in content),
        ('style.css link', 'style.css' in content),
        ('calculator.css link', 'calculator.css' in content),
        ('structured-settlement.css link', 'structured-settlement.css' in content),
        ('structured-settlement.js script', 'structured-settlement.js' in content),
    ]
    
    all_passed = True
    for check_name, passed in checks:
        if passed:
            print(f"✓ {filename} contains {check_name}")
        else:
            print(f"✗ {filename} missing {check_name}")
            all_passed = False
    
    return all_passed

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 quick-rebuild.py <filename.html>")
        return
    
    filename = sys.argv[1]
    
    print(f"Rebuilding {filename}...")
    rebuilt = rebuild_page(filename)
    
    if rebuilt:
        print(f"✓ Rebuilt {filename}")
        print("Testing...")
        test_page(filename)
    else:
        print(f"✗ Failed to rebuild {filename}")

if __name__ == "__main__":
    main()
