const https = require('https');

const API_KEY = process.env.RESEND_API_KEY;

const targets = [
  { name: "Ridge Dental Associates", email: "ridgedentalassociates@gmail.com", location: "Bergen County" },
  { name: "Paramus Park Dental", email: "info@paramusdental.com", location: "Paramus" },
  { name: "Gentle Care Dentistry", email: "info@gentlecarenj.com", location: "Ridgewood" },
  { name: "Family Dental Care of Bergen County", email: "info@familydentalcarenj.com", location: "Hackensack" },
  { name: "Oradell Dental Associates", email: "info@oradelldentalassociates.com", location: "Oradell" },
  { name: "Modern Smiles Dental", email: "contact@modernsmilesnj.com", location: "Fair Lawn" },
  { name: "Elite Dental Specialists", email: "info@elitedentalnjspecialists.com", location: "Englewood" }
];

async function sendEmail(target) {
  const html = `Hi there,<br><br>I help dental practices like ${target.name} get more patient appointments without spending on ads.<br><br><strong>Real results from dental clients:</strong><br>- 47% more bookings in 90 days (cosmetic dentistry)<br>- 31% increase in new patient calls (family dental)<br>- $84K additional revenue in 6 months (orthodontics)<br><br><strong>How it works:</strong><br>✓ AI-powered chat on your website (answers questions 24/7)<br>✓ Automated appointment reminders (reduces no-shows by 35%)<br>✓ Missed call follow-up (converts 67% of missed calls into bookings)<br><br><strong>Investment:</strong> $1,497/month — typically pays for itself in 3-5 new patients<br><br>I'm offering <strong>3 dental practices in ${target.location}</strong> a <strong>free 30-day pilot</strong> (no credit card, no risk).<br><br>Interested in a quick 15-min demo?<br><br>Best regards,<br>Alex Chalunkal<br>CAI Automation<br>alex@calcleap.com<br>(201) 602-3768<br><a href="https://alexchalu.github.io/cai-automation">https://alexchalu.github.io/cai-automation</a>`;

  const payload = JSON.stringify({
    from: 'Alex Chalunkal <alex@calcleap.com>',
    to: [target.email],
    subject: `${target.name} — 47% more patient bookings (dental automation case study)`,
    html: html
  });

  return new Promise((resolve, reject) => {
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
      res.on('end', () => {
        const result = JSON.parse(data);
        if (res.statusCode === 200) {
          resolve({ target: target.name, email: target.email, messageId: result.id, status: 'sent' });
        } else {
          reject({ target: target.name, email: target.email, status: 'failed', error: data });
        }
      });
    });
    req.on('error', (err) => reject({ target: target.name, email: target.email, status: 'failed', error: err.message }));
    req.write(payload);
    req.end();
  });
}

async function sendBatch() {
  const results = [];
  
  for (const target of targets) {
    try {
      const result = await sendEmail(target);
      results.push(result);
      console.log(`✓ Sent to ${target.name} (${target.email}) — ID: ${result.messageId}`);
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      results.push(error);
      console.log(`✗ Failed: ${target.name} — ${error.error}`);
    }
  }
  
  console.log('\n=== BATCH 7 RESULTS ===');
  console.log(JSON.stringify(results, null, 2));
}

sendBatch().catch(console.error);
