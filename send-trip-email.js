const https = require('https');
const fs = require('fs');

const API_KEY = process.env.RESEND_API_KEY;

// Read the markdown and convert to HTML
const md = fs.readFileSync('/home/node/.openclaw/workspace/Switzerland-Family-Trip-2026.md', 'utf8');

// Convert markdown to simple HTML
function mdToHtml(text) {
  let html = text
    // Escape HTML entities first
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

    // Headers
    .replace(/^######\s+(.+)$/gm, '<h6>$1</h6>')
    .replace(/^#####\s+(.+)$/gm, '<h5>$1</h5>')
    .replace(/^####\s+(.+)$/gm, '<h4 style="color:#1a5276;margin-top:16px;">$1</h4>')
    .replace(/^###\s+(.+)$/gm, '<h3 style="color:#1a5276;margin-top:20px;">$1</h3>')
    .replace(/^##\s+(.+)$/gm, '<h2 style="color:#0e4a6e;border-bottom:2px solid #ddd;padding-bottom:6px;margin-top:28px;">$1</h2>')
    .replace(/^#\s+(.+)$/gm, '<h1 style="color:#0b3d5c;text-align:center;margin-bottom:20px;">$1</h1>')

    // Bold and italic
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')

    // Horizontal rules
    .replace(/^---$/gm, '<hr style="border:none;border-top:2px solid #ccc;margin:24px 0;">')

    // Blockquotes
    .replace(/^&gt;\s+(.+)$/gm, '<blockquote style="border-left:4px solid #3498db;padding:8px 16px;margin:12px 0;background:#f0f7fd;color:#333;">$1</blockquote>')

    // Checkboxes
    .replace(/^- \[ \]\s+(.+)$/gm, '<div style="margin:4px 0;">☐ $1</div>')
    .replace(/^- \[x\]\s+(.+)$/gm, '<div style="margin:4px 0;">☑ $1</div>')

    // Unordered list items (handle nested with spaces)
    .replace(/^- (.+)$/gm, '<li>$1</li>')

    // Warning/info markers
    .replace(/⚠️/g, '⚠️')
    .replace(/✅/g, '✅')
    .replace(/❌/g, '❌')

    // Line breaks - double newline = paragraph break
    .replace(/\n\n/g, '</p><p style="margin:8px 0;">')
    .replace(/\n/g, '<br>');

  // Wrap in paragraphs
  html = '<p style="margin:8px 0;">' + html + '</p>';

  // Clean up list items - wrap consecutive <li> in <ul>
  html = html.replace(/(<li>.*?<\/li>(<br>)?)+/g, (match) => {
    return '<ul style="margin:8px 0;padding-left:24px;">' + match.replace(/<br>/g, '') + '</ul>';
  });

  // Handle tables - convert pipe-delimited to HTML tables
  // This is a simplified approach
  html = html.replace(/\|(.+)\|/g, (match, content) => {
    if (content.match(/^[\s\-|]+$/)) return ''; // separator row
    const cells = content.split('|').map(c => c.trim());
    const row = cells.map(c => `<td style="padding:6px 12px;border:1px solid #ddd;">${c}</td>`).join('');
    return `<tr>${row}</tr>`;
  });

  // Wrap consecutive <tr> in <table>
  html = html.replace(/(<tr>.*?<\/tr>(<br>|<\/p><p[^>]*>)?)+/g, (match) => {
    const cleaned = match.replace(/<br>/g, '').replace(/<\/p><p[^>]*>/g, '');
    return `<table style="border-collapse:collapse;margin:12px 0;width:100%;font-size:14px;">${cleaned}</table>`;
  });

  return html;
}

const htmlBody = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:Arial,Helvetica,sans-serif;max-width:800px;margin:0 auto;padding:20px;color:#333;line-height:1.6;font-size:15px;">
${mdToHtml(md)}
</body>
</html>`;

const payload = JSON.stringify({
  from: 'Rando <onboarding@resend.dev>',
  to: ['alexmathewc@gmail.com'],
  subject: '🇨🇭 Switzerland Family Trip — Memorial Day 2026 (Complete Plan)',
  html: htmlBody
});

const req = https.request({
  hostname: 'api.resend.com',
  path: '/emails',
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + API_KEY,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload)
  }
}, (res) => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => console.log(res.statusCode, data));
});
req.on('error', (e) => console.error('Error:', e.message));
req.write(payload);
req.end();
