const https = require('https');

const [to, subject, ...htmlParts] = process.argv.slice(2);
const html = htmlParts.join(' ');

function sendEmail(to, subject, html) {
  const data = JSON.stringify({
    from: 'Alex Chalunkal <alex@calcleap.com>',
    to: [to],
    subject: subject,
    html: html
  });

  const options = {
    hostname: 'api.resend.com',
    port: 443,
    path: '/emails',
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + process.env.RESEND_API_KEY,
      'Content-Type': 'application/json'
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(body));
        } else {
          reject(new Error('HTTP ' + res.statusCode + ': ' + body));
        }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

sendEmail(to, subject, html).then(r => {
  console.log('✓ Sent:', r.id);
}).catch(e => {
  console.error('✗ Error:', e.message);
});
