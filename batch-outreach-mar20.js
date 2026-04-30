const https = require('https');

const RESEND_API_KEY = process.env.RESEND_API_KEY;

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
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
      'Content-Length': data.length
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
          reject(new Error(`HTTP ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// Email targets with standard business emails
const targets = [
  {
    email: 'info@totalcomfort.biz',
    subject: 'Booking more service calls without hiring a dispatcher',
    industry: 'HVAC',
    body: `
<p>Hi,</p>

<p>HVAC companies tell us the #1 bottleneck is appointment scheduling — especially during peak season when phones are ringing nonstop.</p>

<p>Our AI automation system handles:</p>
<ul>
  <li>Inbound service requests (24/7)</li>
  <li>Appointment scheduling with tech availability</li>
  <li>Automatic follow-ups for estimates</li>
  <li>Seasonal maintenance reminders</li>
</ul>

<p><strong>One HVAC company (3 trucks) went from missing 40% of after-hours calls to capturing 95% of leads year-round.</strong></p>

<p>$180K additional annual revenue with zero additional overhead.</p>

<p>Open to a quick 15-minute call?</p>

<p>Best,<br>
Alex Chalunkal<br>
Chalunkal AI<br>
<a href="https://alexchalu.github.io/cai-automation">alexchalu.github.io/cai-automation</a></p>
    `
  },
  {
    email: 'info@aestheticamedspanj.com',
    subject: 'How Aesthetica could book 60+ more treatments/month',
    industry: 'Med Spa',
    body: `
<p>Hi,</p>

<p>Med spas lose a shocking number of potential clients to missed calls and slow response times.</p>

<p>We build AI automation specifically for aesthetic practices:</p>
<ul>
  <li>24/7 consultation booking</li>
  <li>Automated before/after care sequences</li>
  <li>Review request automation</li>
  <li>Membership renewal reminders</li>
</ul>

<p><strong>One med spa went from 22% website-to-booking conversion to 67% — adding $85K/month in revenue.</strong></p>

<p>Would it make sense to explore how this could work for Aesthetica?</p>

<p>Best,<br>
Alex Chalunkal<br>
Chalunkal AI<br>
<a href="https://alexchalu.github.io/cai-automation">alexchalu.github.io/cai-automation</a></p>
    `
  },
  {
    email: 'info@bergencountymedicalspa.com',
    subject: 'How Lasting Impression could book 60+ more treatments/month',
    industry: 'Med Spa',
    body: `
<p>Hi,</p>

<p>Med spas lose a shocking number of potential clients to missed calls and slow response times.</p>

<p>We build AI automation specifically for aesthetic practices:</p>
<ul>
  <li>24/7 consultation booking</li>
  <li>Automated before/after care sequences</li>
  <li>Review request automation</li>
  <li>Membership renewal reminders</li>
</ul>

<p><strong>One med spa went from 22% website-to-booking conversion to 67% — adding $85K/month in revenue.</strong></p>

<p>Would it make sense to explore how this could work for Lasting Impression?</p>

<p>Best,<br>
Alex Chalunkal<br>
Chalunkal AI<br>
<a href="https://alexchalu.github.io/cai-automation">alexchalu.github.io/cai-automation</a></p>
    `
  },
  {
    email: 'info@rosemariearnold.com',
    subject: 'Never miss a PI case lead again',
    industry: 'Law Firm',
    body: `
<p>Hi,</p>

<p>Personal injury leads are time-sensitive. If someone calls your firm and gets voicemail, they're calling the next lawyer in 60 seconds.</p>

<p>We help PI firms capture every lead with:</p>
<ul>
  <li>24/7 AI intake assistant</li>
  <li>Instant case qualification</li>
  <li>Automatic follow-up sequences</li>
  <li>Direct attorney routing for qualified cases</li>
</ul>

<p><strong>One firm we worked with stopped losing evening/weekend leads entirely and added 18 cases in the first 90 days.</strong></p>

<p>Would a brief call make sense to discuss how this could help your firm?</p>

<p>Best,<br>
Alex Chalunkal<br>
Chalunkal AI<br>
<a href="https://alexchalu.github.io/cai-automation">alexchalu.github.io/cai-automation</a></p>
    `
  },
  {
    email: 'info@hassonlawoffices.com',
    subject: 'Never miss a PI case lead again',
    industry: 'Law Firm',
    body: `
<p>Hi,</p>

<p>Personal injury leads are time-sensitive. If someone calls your firm and gets voicemail, they're calling the next lawyer in 60 seconds.</p>

<p>We help PI firms capture every lead with:</p>
<ul>
  <li>24/7 AI intake assistant</li>
  <li>Instant case qualification</li>
  <li>Automatic follow-up sequences</li>
  <li>Direct attorney routing for qualified cases</li>
</ul>

<p><strong>One firm we worked with stopped losing evening/weekend leads entirely and added 18 cases in the first 90 days.</strong></p>

<p>Would a brief call make sense to discuss how this could help Hasson Law Offices?</p>

<p>Best,<br>
Alex Chalunkal<br>
Chalunkal AI<br>
<a href="https://alexchalu.github.io/cai-automation">alexchalu.github.io/cai-automation</a></p>
    `
  }
];

// Send emails sequentially with delays
async function sendBatch() {
  for (let i = 0; i < targets.length; i++) {
    const target = targets[i];
    try {
      const result = await sendEmail(target.email, target.subject, target.body);
      console.log(`✓ Email ${i+2} sent to ${target.email} (${target.industry}):`, result.id);
      // Wait 2 seconds between sends to avoid rate limits
      if (i < targets.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } catch (err) {
      console.error(`✗ Failed to send email ${i+2} to ${target.email}:`, err.message);
    }
  }
}

sendBatch().then(() => {
  console.log('\n✓ Batch complete');
}).catch(err => {
  console.error('\n✗ Batch failed:', err);
});
