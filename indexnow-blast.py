import json, urllib.request, time

# Read all URLs from sitemap
import re
with open("sitemap.xml") as f:
    content = f.read()
urls = re.findall(r'<loc>(https://calcleap\.com/[^<]*)</loc>', content)
print(f"Total URLs to submit: {len(urls)}")

# IndexNow accepts batches of up to 10,000
key = "a1b2c3d4e5f6g7h8"
host = "calcleap.com"

# Submit in batches of 500
batch_size = 500
submitted = 0
for i in range(0, len(urls), batch_size):
    batch = urls[i:i+batch_size]
    payload = {
        "host": host,
        "key": key,
        "keyLocation": f"https://{host}/{key}.txt",
        "urlList": batch
    }
    data = json.dumps(payload).encode()
    req = urllib.request.Request(
        "https://api.indexnow.org/IndexNow",
        data=data,
        headers={"Content-Type": "application/json; charset=utf-8"},
        method="POST"
    )
    try:
        resp = urllib.request.urlopen(req)
        print(f"Batch {i//batch_size + 1}: {len(batch)} URLs → HTTP {resp.status}")
        submitted += len(batch)
    except Exception as e:
        print(f"Batch {i//batch_size + 1}: ERROR → {e}")
    time.sleep(1)

print(f"\nTotal submitted: {submitted}/{len(urls)}")
