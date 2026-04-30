#!/bin/bash
# Fix missing page-title class on H1 tags

cd /data/workspace/toolpulse

while IFS= read -r file; do
  file_clean=$(echo "$file" | sed 's|^\./||')
  
  # Check if H1 exists without page-title class
  if grep -q '<h1[^>]*>' "$file_clean" && ! grep -q 'class="page-title"' "$file_clean"; then
    # Replace <h1> with <h1 class="page-title">
    sed -i 's|<h1>|<h1 class="page-title">|g' "$file_clean"
    # Also handle h1 with existing classes
    sed -i 's|<h1 class="\([^"]*\)">|<h1 class="\1 page-title">|g' "$file_clean"
    echo "✅ Fixed: $file_clean"
  fi
done < /tmp/needs_page_title.txt

echo ""
echo "Re-running audit to verify..."
python3 audit.py 2>&1 | grep -E "Passing|Missing page-title"
