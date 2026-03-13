const fs = require('fs');
const path = require('path');
const glob = require('child_process').execSync('find . -name "*.html" -not -path "./node_modules/*" -not -path "./.git/*"', {encoding:'utf8'}).trim().split('\n');
const urls = glob.map(f => {
  const rel = f.replace(/^\.\//,'');
  return `  <url><loc>https://calcleap.com/${rel}</loc></url>`;
}).sort();
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;
fs.writeFileSync('sitemap.xml', xml);
console.log(`Sitemap: ${urls.length} URLs`);
