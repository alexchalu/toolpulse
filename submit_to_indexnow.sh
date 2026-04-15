#!/bin/bash

# IndexNow submission script for new calculator pages
# Submit to IndexNow API for immediate search engine indexing

INDEXNOW_API_KEY="d4f7e8a7b3c2d1e0f9a8b7c6d5e4f3a2"
API_URL="https://api.indexnow.org/indexnow"

# List of new/updated pages to submit
PAGES=(
    "https://calcleap.com/structured-settlement-calculator.html"
    "https://calcleap.com/calc/structured-settlement-calculator.html"
)

# Submit each page to IndexNow
for PAGE in "${PAGES[@]}"; do
    echo "Submitting to IndexNow: $PAGE"
    
    # Create JSON payload
    PAYLOAD=$(cat <<EOF
{
    "host": "calcleap.com",
    "key": "$INDEXNOW_API_KEY",
    "urlList": ["$PAGE"]
}
EOF
)
    
    # Submit via curl
    curl -X POST "$API_URL" \
         -H "Content-Type: application/json" \
         -d "$PAYLOAD"
    
    echo ""
    echo "----------------------------------------"
    echo ""
    
    # Wait 2 seconds between submissions
    sleep 2
done

echo "IndexNow submission complete!"
