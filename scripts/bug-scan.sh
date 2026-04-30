#!/bin/bash
# CalcLeap Automated Bug Scanner
# Runs every heartbeat cycle. Finds NEW bugs, never reports old ones.

cd /data/workspace/toolpulse
echo "$(date -u '+%Y-%m-%dT%H:%M:%SZ') === BUG SCAN START ==="

BUGS_FOUND=0
BUG_DETAILS=""

# 1. Run structural audit
AUDIT_RESULT=$(python3 audit.py 2>&1)
AUDIT_FAILS=$(echo "$AUDIT_RESULT" | grep -c "FAIL\|ERROR" || true)
if [ "$AUDIT_FAILS" -gt 0 ]; then
    BUGS_FOUND=$((BUGS_FOUND + AUDIT_FAILS))
    BUG_DETAILS="$BUG_DETAILS\nAUDIT: $AUDIT_FAILS structural failures"
fi

# 2. Check 10 random quality pages
for f in $(grep -o 'calcleap.com/[^<]*' sitemap.xml | sed 's|calcleap.com/||' | shuf | head -10); do
    if [ -f "$f" ]; then
        issues=""
        grep -qc '<style>\|gold.css' "$f" || issues="$issues NO_CSS"
        grep -q 'background:#1a1a2e' "$f" && issues="$issues DARK_THEME"
        grep -q '<nav\|class="nav"' "$f" || issues="$issues NO_NAV"
        grep -q 'noindex' "$f" && issues="$issues NOINDEXED_QUALITY"
        grep -q 'G-Y5W5SEPQWV' "$f" || issues="$issues NO_GA4"
        grep -q 'CalcLeap Editorial Team' "$f" || issues="$issues NO_BYLINE"
        
        h1_count=$(grep -c '<h1' "$f" 2>/dev/null || echo 0)
        [ "$h1_count" -gt 1 ] && issues="$issues DUP_H1($h1_count)"
        
        if [ -n "$issues" ]; then
            BUGS_FOUND=$((BUGS_FOUND + 1))
            BUG_DETAILS="$BUG_DETAILS\nPAGE: $f —$issues"
        fi
    fi
done

# 3. Verify 5 live pages load
for url in $(grep -o 'calcleap.com/[^<]*' sitemap.xml | sed 's|calcleap.com/||' | shuf | head -5); do
    http=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "https://calcleap.com/$url" 2>/dev/null)
    if [ "$http" != "200" ]; then
        BUGS_FOUND=$((BUGS_FOUND + 1))
        BUG_DETAILS="$BUG_DETAILS\nLIVE: $url returns HTTP $http"
    fi
done

# 4. Check for broken CSS references
BROKEN_CSS=$(grep -rl 'href="assets/css\|href="css/\|href="styles.css"' --include="*.html" . 2>/dev/null | grep -v OLD | wc -l)
if [ "$BROKEN_CSS" -gt 0 ]; then
    BUGS_FOUND=$((BUGS_FOUND + BROKEN_CSS))
    BUG_DETAILS="$BUG_DETAILS\nCSS: $BROKEN_CSS pages with broken CSS paths"
fi

# 5. Check for empty toolContent divs
EMPTY_DIVS=$(grep -rl 'id="toolContent"></div>' *.html 2>/dev/null | wc -l)
if [ "$EMPTY_DIVS" -gt 0 ]; then
    BUGS_FOUND=$((BUGS_FOUND + EMPTY_DIVS))
    BUG_DETAILS="$BUG_DETAILS\nEMPTY_DIV: $EMPTY_DIVS pages with empty toolContent"
fi

# 6. Check sitemap validity
SITEMAP_URLS=$(grep -c '<url>' sitemap.xml 2>/dev/null || echo 0)
if [ "$SITEMAP_URLS" -lt 1000 ]; then
    BUG_DETAILS="$BUG_DETAILS\nWARNING: Sitemap only has $SITEMAP_URLS URLs (expected 1200+)"
fi

echo "$(date -u '+%Y-%m-%dT%H:%M:%SZ') === BUG SCAN END ==="
echo "Bugs found: $BUGS_FOUND"
if [ "$BUGS_FOUND" -gt 0 ]; then
    echo -e "Details:$BUG_DETAILS"
fi

# Output for parsing
echo "SCAN_RESULT:$BUGS_FOUND"
