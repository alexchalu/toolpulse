#!/usr/bin/env python3
"""Remove duplicate <script> blocks that re-declare 'const factor' in converter pages."""
import re, glob, os

os.chdir('/data/workspace/toolpulse')
fixed = 0

for f in sorted(glob.glob('convert-*.html')):
    with open(f, 'r') as fh:
        content = fh.read()
    
    # Count occurrences of 'const factor'
    count = content.count('const factor')
    if count <= 1:
        continue
    
    # Find all <script>...</script> blocks
    # We want to remove the SECOND script block that contains 'const factor'
    pattern = r'<script>\s*\n?\s*const factor.*?</script>'
    matches = list(re.finditer(pattern, content, re.DOTALL))
    
    if len(matches) >= 2:
        # Remove the second (duplicate) script block
        second = matches[1]
        content = content[:second.start()] + content[second.end():]
        
        with open(f, 'w') as fh:
            fh.write(content)
        fixed += 1
        print(f"Fixed: {f}")
    else:
        print(f"SKIP (pattern mismatch): {f}")

print(f"\nTotal fixed: {fixed}")
