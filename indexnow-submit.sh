#!/bin/bash
API_KEY="1d8e4f2a9c3b6e7f5a8d2c4b9e6f3a7d"
HOST="calcleap.com"

urls=(
  "https://calcleap.com/state-tax-calculator-alabama.html"
  "https://calcleap.com/state-tax-calculator-alaska.html"
  "https://calcleap.com/state-tax-calculator-arizona.html"
  "https://calcleap.com/state-tax-calculator-arkansas.html"
  "https://calcleap.com/state-tax-calculator-colorado.html"
  "https://calcleap.com/state-tax-calculator-connecticut.html"
  "https://calcleap.com/state-tax-calculator-delaware.html"
  "https://calcleap.com/state-tax-calculator-florida.html"
  "https://calcleap.com/state-tax-calculator-georgia.html"
  "https://calcleap.com/state-tax-calculator-hawaii.html"
  "https://calcleap.com/state-tax-calculator-idaho.html"
  "https://calcleap.com/state-tax-calculator-illinois.html"
  "https://calcleap.com/state-tax-calculator-indiana.html"
  "https://calcleap.com/state-tax-calculator-iowa.html"
  "https://calcleap.com/state-tax-calculator-kansas.html"
  "https://calcleap.com/state-tax-calculator-kentucky.html"
  "https://calcleap.com/state-tax-calculator-louisiana.html"
  "https://calcleap.com/state-tax-calculator-maine.html"
  "https://calcleap.com/state-tax-calculator-maryland.html"
  "https://calcleap.com/state-tax-calculator-massachusetts.html"
  "https://calcleap.com/state-tax-calculator-michigan.html"
  "https://calcleap.com/state-tax-calculator-minnesota.html"
  "https://calcleap.com/state-tax-calculator-mississippi.html"
  "https://calcleap.com/state-tax-calculator-missouri.html"
  "https://calcleap.com/state-tax-calculator-montana.html"
  "https://calcleap.com/state-tax-calculator-nebraska.html"
  "https://calcleap.com/state-tax-calculator-nevada.html"
  "https://calcleap.com/state-tax-calculator-new-hampshire.html"
  "https://calcleap.com/state-tax-calculator-new-jersey.html"
  "https://calcleap.com/state-tax-calculator-new-mexico.html"
  "https://calcleap.com/state-tax-calculator-north-carolina.html"
  "https://calcleap.com/state-tax-calculator-north-dakota.html"
  "https://calcleap.com/state-tax-calculator-ohio.html"
  "https://calcleap.com/state-tax-calculator-oklahoma.html"
  "https://calcleap.com/state-tax-calculator-oregon.html"
  "https://calcleap.com/state-tax-calculator-pennsylvania.html"
  "https://calcleap.com/state-tax-calculator-rhode-island.html"
  "https://calcleap.com/state-tax-calculator-south-carolina.html"
  "https://calcleap.com/state-tax-calculator-south-dakota.html"
  "https://calcleap.com/state-tax-calculator-tennessee.html"
  "https://calcleap.com/state-tax-calculator-texas.html"
  "https://calcleap.com/state-tax-calculator-utah.html"
  "https://calcleap.com/state-tax-calculator-vermont.html"
  "https://calcleap.com/state-tax-calculator-virginia.html"
  "https://calcleap.com/state-tax-calculator-washington.html"
  "https://calcleap.com/state-tax-calculator-west-virginia.html"
  "https://calcleap.com/state-tax-calculator-wisconsin.html"
  "https://calcleap.com/state-tax-calculator-wyoming.html"
)

url_list=$(printf ',"%s"' "${urls[@]}")
url_list="[${url_list:1}]"

payload=$(cat <<EOF
{
  "host": "$HOST",
  "key": "$API_KEY",
  "urlList": $url_list
}
EOF
)

echo "Submitting 48 state tax calculator pages to IndexNow..."
curl -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json" \
  -d "$payload" \
  -w "\nHTTP Status: %{http_code}\n"

echo "✅ IndexNow submission complete"
