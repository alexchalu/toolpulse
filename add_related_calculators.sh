#!/bin/bash

# Related Calculators Component Adder
# Usage: ./add_related_calculators.sh

# Configuration
PAGES_DIR="/data/workspace/toolpulse/"
TEMPLATE_FILE="/data/workspace/toolpulse/RELATED_CALCULATORS_TEMPLATE.html"

# Check if template file exists
if [[ ! -f "$TEMPLATE_FILE" ]]; then
  echo "❌ Template file not found: $TEMPLATE_FILE"
  echo "Creating template..."
  
  # Create a template HTML file for the "Related Calculators" component
  cat > "$TEMPLATE_FILE" << 'EOF'
<div class="related-calculators" style="margin: 2rem 0; padding: 1.5rem; background: var(--white); border: 1px solid var(--border); border-radius: var(--r); box-shadow: var(--shadow);">
    <h3 style="font-size: 1.1rem; font-weight: 700; letter-spacing: -.02em; margin-bottom: 1rem; color: var(--text);">🔗 Related Calculators</h3>
    <p style="margin-bottom: 1.5rem; color: var(--text-2); font-size: .9rem; line-height: 1.6;">
        Explore more tools in our collection. These calculators are related to your current topic and may provide additional insights.
    </p>
    <div class="calculator-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: .75rem;">
        <!-- Related Calculator Cards -->
        <!-- Example: -->
        <!-- <a href="marital-property-division-calculator.html" class="calculator-card" style="display: block; padding: .85rem 1rem; background: var(--white); border: 1px solid var(--border); border-radius: var(--r-sm); transition: all .2s; text-decoration: none; color: var(--text);"> -->
        <!--     <h4 style="font-weight: 600; margin: 0 0 .25rem 0; font-size: .875rem;">Marital Property Division</h4> -->
        <!--     <p style="font-size: .78rem; color: var(--text-3); margin: 0;">Calculate how assets are split in a divorce.</p> -->
        <!-- </a> -->
    </div>
</div>
EOF
fi

# Check if pages directory exists
if [[ ! -d "$PAGES_DIR" ]]; then
  echo "❌ Pages directory not found: $PAGES_DIR"
  exit 1
fi

# Find all calculator pages (HTML files in root or calc/ directory)
CALCULATOR_PAGES=(
  $(find "$PAGES_DIR" -maxdepth 1 -type f -name '*.html' | grep -v 'index.html' | grep -v '404.html' | grep -v 'privacy.html' | grep -v 'terms.html' | grep -v 'about.html' | grep -v 'contact.html' | grep -v 'sitemap.xml' | grep -v 'robots.txt' | sort)
  $(find "$PAGES_DIR" -maxdepth 2 -path '*/calc/*.html' -type f | sort)
  $(find "$PAGES_DIR" -maxdepth 2 -path '*/mortgage/*.html' -type f | sort)
  $(find "$PAGES_DIR" -maxdepth 2 -path '*/tax/*.html' -type f | sort)
  $(find "$PAGES_DIR" -maxdepth 2 -path '*/insurance/*.html' -type f | sort)
  $(find "$PAGES_DIR" -maxdepth 2 -path '*/health/*.html' -type f | sort)
)

# Remove duplicates from the array
mapfile -t CALCULATOR_PAGES < <(printf '%s\n' "${CALCULATOR_PAGES[@]}" | sort -u)

echo "Found ${#CALCULATOR_PAGES[@]} calculator pages."
echo "Adding 'Related Calculators' component to top pages..."

# Add the component to the top 20 pages
SUCCESS_COUNT=0
FAILURE_COUNT=0

for PAGE_PATH in "${CALCULATOR_PAGES[@]:0:20}"; do
  
  # Skip the template file itself
  if [[ "$PAGE_PATH" == *"RELATED_CALCULATORS_TEMPLATE.html"* ]]; then
    continue
  fi
  
  echo "Processing: $PAGE_PATH"
  
  # Check if the page already has a "related-calculators" class (skip to avoid duplicates)
  if grep -q "related-calculators" "$PAGE_PATH"; then
    echo "  ⚠️  'Related Calculators' component already exists. Skipping."
    ((SUCCESS_COUNT++))
    continue
  fi
  
  # Check if the page has a closing </div> for the main content (to insert before footer)
  if grep -q "</div>" "$PAGE_PATH" && ! grep -q "</div>" "$PAGE_PATH" | head -n 1 | grep -q "</div>"; then
    
    # Create a backup
    cp "$PAGE_PATH" "${PAGE_PATH}.bak.$(date +%s)" 2>/dev/null || echo "  ⚠️  Could not create backup. Proceeding anyway."
    
    # Insert the "Related Calculators" component before the closing </body> tag
    # Using a here-document and sed to insert the content
    sed -i "/<\/body>/i\\$(cat "$TEMPLATE_FILE")" "$PAGE_PATH" 2>/dev/null || {
      echo "  ❌  Failed to insert component using sed."
      ((FAILURE_COUNT++))
      continue
    }
    
    echo "  ✅  'Related Calculators' component added successfully."
    ((SUCCESS_COUNT++))
    
  else
    echo "  ⚠️  Could not find a suitable insertion point. Skipping."
    ((FAILURE_COUNT++))
  fi
  
done

echo ""
echo "✅ Summary:"
echo "   Pages processed: ${#CALCULATOR_PAGES[@]:0:20}"
echo "   Success: $SUCCESS_COUNT"
echo "   Failures: $FAILURE_COUNT"

if [[ $SUCCESS_COUNT -gt 0 ]]; then
  echo ""
  echo "🎉 'Related Calculators' component added to key pages!"
  echo "   Next steps: Monitor search engine indexing progress."
  exit 0
else
  echo ""
  echo "❌  Failed to add 'Related Calculators' component to any pages."
  exit 1
fi