#!/bin/bash
# Submit CalcLeap to multiple awesome lists on GitHub

echo "=== Forking and submitting to awesome lists ==="

# List of awesome lists to target
LISTS=(
  "sindresorhus/awesome"
  "public-apis/public-apis"
  "n0shake/Public-APIs"
  "ripienaar/free-for-dev"
  "awesome-selfhosted/awesome-selfhosted"
  "trimstray/the-book-of-secret-knowledge"
  "EbookFoundation/free-programming-books"
)

for repo in "${LISTS[@]}"; do
  echo ""
  echo "Processing: $repo"
  gh repo view "$repo" --json name,description
done
