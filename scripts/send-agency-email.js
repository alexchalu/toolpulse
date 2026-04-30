// Send agency outreach emails via Resend API
const https = require('https');

const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_123'; // Need actual key

function sendEmail(to, subject, body) {
    const data = JSON.stringify({
        from: 'Alex Chalunkal <alex@calcleap.com>',
        to: [to],
        subject: subject,
        html: body
    });

    const options = {
        hostname: 'api.resend.com',
        port: 443,
        path: '/emails',
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let responseData = '';
            res.on('data', (chunk) => { responseData += chunk; });
            res.on('end', () => {
                if (res.statusCode === 200) {
                    resolve(JSON.parse(responseData));
                } else {
                    reject(new Error(`HTTP ${res.statusCode}: ${responseData}`));
                }
            });
        });

        req.on('error', reject);
        req.write(data);
        req.end();
    });
}

// Export for use
module.exports = { sendEmail };

// CLI usage
if (require.main === module) {
    const args = process.argv.slice(2);
    if (args.length < 3) {
        console.log('Usage: node send-agency-email.js <to> <subject> <body>');
        process.exit(1);
    }

    sendEmail(args[0], args[1], args[2])
        .then(result => console.log('✓ Sent:', JSON.stringify(result)))
        .catch(err => console.error('✗ Error:', err.message));
}
