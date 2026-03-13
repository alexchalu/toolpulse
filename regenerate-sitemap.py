import os
import datetime

base_url = "https://calcleap.com"
today = datetime.date.today().isoformat()

urls = []
for root, dirs, files in os.walk('.'):
    # Skip hidden dirs and og-images
    dirs[:] = [d for d in dirs if not d.startswith('.') and d != 'og-images' and d != 'node_modules']
    for f in files:
        if f.endswith('.html'):
            path = os.path.join(root, f)[2:]  # strip ./
            url = f"{base_url}/{path}"
            # Determine priority
            if path == 'index.html':
                priority = '1.0'
            elif '/' not in path:
                priority = '0.8'
            else:
                priority = '0.7'
            urls.append((url, priority))

urls.sort(key=lambda x: x[0])

lines = ['<?xml version="1.0" encoding="UTF-8"?>']
lines.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
for url, priority in urls:
    lines.append(f'  <url>')
    lines.append(f'    <loc>{url}</loc>')
    lines.append(f'    <lastmod>{today}</lastmod>')
    lines.append(f'    <changefreq>weekly</changefreq>')
    lines.append(f'    <priority>{priority}</priority>')
    lines.append(f'  </url>')
lines.append('</urlset>')

with open('sitemap.xml', 'w') as f:
    f.write('\n'.join(lines))

print(f"Generated sitemap with {len(urls)} URLs")
