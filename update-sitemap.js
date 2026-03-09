#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const baseUrl = 'https://alexchalu.github.io/toolpulse/';
const today = new Date().toISOString().split('T')[0];

// Get all HTML files (root + calc/ subdirectory)
const rootFiles = fs.readdirSync(__dirname)
  .filter(f => f.endsWith('.html'))
  .map(f => f);

const calcFiles = fs.existsSync(__dirname + '/calc') 
  ? fs.readdirSync(__dirname + '/calc')
      .filter(f => f.endsWith('.html'))
      .map(f => 'calc/' + f)
  : [];

const files = [...rootFiles, ...calcFiles].sort();

let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

files.forEach(file => {
  sitemap += `  <url>\n`;
  sitemap += `    <loc>${baseUrl}${file}</loc>\n`;
  sitemap += `    <lastmod>${today}</lastmod>\n`;
  sitemap += `    <changefreq>weekly</changefreq>\n`;
  sitemap += `    <priority>0.8</priority>\n`;
  sitemap += `  </url>\n`;
});

sitemap += '</urlset>';

fs.writeFileSync('sitemap.xml', sitemap);
console.log(`✅ Updated sitemap with ${files.length} pages`);
