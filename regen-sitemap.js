const fs = require('fs');
const lines = fs.readFileSync('/tmp/all_pages.txt','utf8').trim().split('\n');
const today = '2026-03-11';
let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
lines.forEach(p => {
  const loc = p === 'index.html' ? 'https://calcleap.com/' : `https://calcleap.com/${p}`;
  const pri = p === 'index.html' ? '1.0' : p.includes('index.html') ? '0.8' : '0.6';
  xml += `<url><loc>${loc}</loc><lastmod>${today}</lastmod><priority>${pri}</priority></url>\n`;
});
xml += '</urlset>';
fs.writeFileSync('sitemap.xml', xml);
console.log(`Sitemap: ${lines.length} URLs`);
