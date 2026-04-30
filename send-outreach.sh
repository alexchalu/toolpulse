#!/bin/bash
API_KEY="re_Xr5JGTdH_EhXBchwbUPPgvbcQVbTi3ufF"

send_email() {
  local to="$1"
  local subject="$2"
  local html="$3"
  
  result=$(curl -s -X POST "https://api.resend.com/emails" \
    -H "Authorization: Bearer $API_KEY" \
    -H "Content-Type: application/json" \
    -d "{
      \"from\": \"Alex from CalcLeap <alex@calcleap.com>\",
      \"to\": [\"$to\"],
      \"subject\": \"$subject\",
      \"html\": \"$html\"
    }")
  
  echo "$to → $result"
  sleep 2  # Rate limiting
}

echo "=== CalcLeap Outreach Campaign ==="
echo "Started: $(date -u)"
echo ""

# 1. MyCalcul - "Top Calculator Websites 2025" article
send_email "support@mycalcul.com" \
  "CalcLeap — 2,800+ Free Calculators for Your Top Calculator Websites List" \
  "<p>Hi there,</p><p>I came across your excellent article <em>Top Calculator Websites 2025</em> — really well-researched roundup.</p><p>I recently launched <a href='https://calcleap.com'>CalcLeap</a>, which now has <strong>2,800+ free online calculators</strong> covering finance, insurance (all 50 US states), health, math, cooking, and more.</p><p>What makes CalcLeap different:</p><ul><li>2,800+ calculators (one of the largest collections online)</li><li>Every calculator includes educational content, visual charts, and FAQ sections</li><li>State-specific insurance calculators for auto, home, health, and life</li><li>Free embeddable widgets for bloggers</li><li>Free calculator API for developers</li><li>No signup required, no paywalls</li></ul><p>Would you consider adding CalcLeap to your list? I think your readers would find it genuinely useful.</p><p>Happy to answer any questions!</p><p>Best,<br>Alex<br><a href='https://calcleap.com'>CalcLeap.com</a></p>"

# 2. financeplaan.com
send_email "pnhasan358@gmail.com" \
  "Free Financial Calculator Resource for Your 2026 Tools Article" \
  "<p>Hi,</p><p>Loved your article on <em>Free Financial Planning Tools in 2026</em> — great resource for people looking to manage their finances better.</p><p>I wanted to suggest <a href='https://calcleap.com'>CalcLeap</a> for your list. We offer 2,800+ free calculators including:</p><ul><li>Mortgage calculator with full amortization schedule</li><li>Compound interest calculator with visual growth charts</li><li>Retirement planning calculator (4% rule)</li><li>Tax bracket calculator (2026 brackets)</li><li>401(k) and investment return calculators</li><li>Insurance estimators for all 50 states</li></ul><p>Everything is free, no signup required, and each calculator includes educational content explaining the math behind it.</p><p>Would love to be included in your article or a future roundup!</p><p>Best,<br>Alex<br><a href='https://calcleap.com'>CalcLeap.com</a></p>"

echo ""
echo "=== Batch 1 Complete ==="
