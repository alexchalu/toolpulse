#!/usr/bin/env python3
"""Submit changed pages to IndexNow"""

import subprocess
import json
import requests

# Get all changed HTML files
result = subprocess.run(
    ['git', 'diff', '--name-only', 'HEAD~1'],
    capture_output=True,
    text=True,
    cwd='/data/workspace/toolpulse'
)

html_files = [f for f in result.stdout.strip().split('\n') if f.endswith('.html')]

# Build full URLs
base_url = "https://calcleap.com"
urls = [f"{base_url}/{f}" for f in html_files]

# IndexNow API key (from CalcLeap root)
api_key = "a1b2c3d4e5f6g7h8"

# Submit to IndexNow
payload = {
    "host": "calcleap.com",
    "key": api_key,
    "urlList": urls
}

print(f"Submitting {len(urls)} URLs to IndexNow...")
print(f"Sample URLs: {urls[:5]}")

response = requests.post(
    "https://api.indexnow.org/IndexNow",
    headers={"Content-Type": "application/json"},
    json=payload
)

print(f"\nIndexNow Response: {response.status_code}")
if response.status_code == 200:
    print("✅ Successfully submitted to IndexNow!")
    print(f"   {len(urls)} pages submitted for indexing")
elif response.status_code == 202:
    print("✅ Accepted by IndexNow (202)")
    print(f"   {len(urls)} pages queued for indexing")
else:
    print(f"❌ Error: {response.text}")
