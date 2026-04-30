#!/usr/bin/env python3
"""Auto-submit calcleap.com to free web directories via their submission forms."""
import urllib.request, urllib.parse, json, time, ssl

ctx = ssl.create_default_context()

site_info = {
    "url": "https://calcleap.com",
    "title": "CalcLeap - Free Online Calculators for Finance, Health, Math & More",
    "description": "CalcLeap offers 2,800+ free online calculators covering finance, insurance, health, math, cooking, fitness, and more. Professional tools with educational content, charts, and instant results. No signup required.",
    "category": "Computers/Internet/Tools",
    "keywords": "calculator, online calculator, finance calculator, BMI calculator, mortgage calculator, insurance calculator, health calculator, math calculator",
    "email": "alexmathewc@gmail.com",
    "owner": "CalcLeap"
}

# Top directories that accept automated submissions or have simple forms
# We'll try GET-based ping/submit endpoints
directories_with_ping = [
    "https://www.somuch.com/submit-links/",
    "https://www.cipinet.com/addurl.html",
    "https://www.addurl.nu/",
    "https://www.freewebsubmission.com/",
]

# Search engine submissions
search_engines = [
    f"https://www.google.com/ping?sitemap=https://calcleap.com/sitemap.xml",
    f"https://www.bing.com/indexnow?url=https://calcleap.com&key=a1b2c3d4e5f6g7h8",
]

results = []

# Submit to search engines
for url in search_engines:
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "CalcLeap-Bot/1.0"})
        resp = urllib.request.urlopen(req, timeout=10, context=ctx)
        results.append(f"✅ {url[:60]}... → {resp.status}")
    except Exception as e:
        results.append(f"⚠️ {url[:60]}... → {e}")
    time.sleep(1)

# Try IndexNow to multiple engines
indexnow_endpoints = [
    "https://api.indexnow.org/IndexNow",
    "https://www.bing.com/IndexNow",
    "https://yandex.com/indexnow",
]
top_pages = [
    "https://calcleap.com/",
    "https://calcleap.com/bmi-calculator.html",
    "https://calcleap.com/calc/mortgage-calculator.html",
    "https://calcleap.com/calc/auto-insurance-calculator.html",
    "https://calcleap.com/calc/compound-interest-calculator.html",
    "https://calcleap.com/calc/retirement-savings-calculator.html",
    "https://calcleap.com/calc/tax-bracket-calculator.html",
    "https://calcleap.com/calc/home-insurance-calculator.html",
    "https://calcleap.com/calc/life-insurance-calculator.html",
    "https://calcleap.com/calc/pregnancy-due-date-calculator.html",
    "https://calcleap.com/calc/sleep-calculator.html",
]

for endpoint in indexnow_endpoints:
    payload = {
        "host": "calcleap.com",
        "key": "a1b2c3d4e5f6g7h8",
        "keyLocation": "https://calcleap.com/a1b2c3d4e5f6g7h8.txt",
        "urlList": top_pages
    }
    try:
        data = json.dumps(payload).encode()
        req = urllib.request.Request(endpoint, data=data, 
            headers={"Content-Type": "application/json", "User-Agent": "CalcLeap-Bot/1.0"})
        resp = urllib.request.urlopen(req, timeout=15, context=ctx)
        results.append(f"✅ IndexNow {endpoint} → {resp.status}")
    except Exception as e:
        results.append(f"⚠️ IndexNow {endpoint} → {e}")
    time.sleep(1)

for r in results:
    print(r)

print(f"\nTotal submissions attempted: {len(results)}")
