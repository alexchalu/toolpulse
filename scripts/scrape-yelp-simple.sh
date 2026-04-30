#!/bin/bash
# Simple Yelp scraper using curl + grep
# No Python dependencies needed

TERM="$1"
LOCATION="$2"
OUTPUT="$3"

if [ -z "$TERM" ] || [ -z "$LOCATION" ]; then
    echo "Usage: $0 <search_term> <location> <output_file>"
    exit 1
fi

URL="https://www.yelp.com/search?find_desc=$(echo $TERM | sed 's/ /%20/g')&find_loc=$(echo $LOCATION | sed 's/ /%20/g')"

echo "Scraping: $URL"
curl -s -A "Mozilla/5.0" "$URL" | \
    grep -oP '(?<="name":")[^"]+' | \
    head -50 | \
    tee "${OUTPUT:-/tmp/yelp-results.txt}"
