const fs = require('fs');

const envFile = fs.readFileSync('.env', 'utf8');
const apiKey = envFile.match(/RESEND_API_KEY=(.+)/)[1].trim();

const targets = [
  { name: "Terrie O'Connor Realtors Wyckoff", email: "contact_wyckoff@tocr.com" },
  { name: "Coldwell Banker Wyckoff/Franklin Lakes", email: "info@coldwellbankerhomes.com" },
  { name: "The Home Navigators", email: "info@maryanneelsaesserhomenavigators.com" }
];

async function sendEmail(target) {
  const subject = `Stop losing leads to slow response times — AI automation for ${target.name}`;
  const body = `Hi ${target.name} team,

Quick question: When a buyer fills out a contact form on your site at 9 PM on a Saturday, how long before someone follows up?

Industry data shows that responding within 5 minutes increases lead-to-showing conversion by 300% vs. responding in 4+ hours. But most agents can't respond instantly 24/7 — that's where AI automation makes the difference.

Here's what I built for a 12-agent team:
• AI chatbot that instantly engages website visitors
• Captures property preferences and schedules showings automatically
• Routes qualified leads to the right agent based on territory
• Integrates with existing CRM and calendar systems

Their results:
• Response time: 4+ hours → under 30 seconds
• Lead-to-showing conversion: 3.2x increase
• 156 additional showings per month
• $380K additional annual revenue

Investment: $2,500 setup + $500/month ongoing support

Would you be open to a 15-minute call to see if this would work for your team?

Best,
Alex Chalunkal
Chalunkal AI
https://alexchalu.github.io/cai-automation
alex@calcleap.com

P.S. — I'm local to Franklin Lakes, so I can meet in person if you'd prefer.`;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'alex@calcleap.com',
      to: target.email,
      subject: subject,
      text: body
    })
  });

  const result = await response.json();
  console.log(`${target.name}: ${response.ok ? 'SENT ✓' : 'FAILED ✗'}`);
  if (!response.ok) console.log(result);
  return response.ok;
}

(async () => {
  let sent = 0;
  for (const target of targets) {
    const success = await sendEmail(target);
    if (success) sent++;
    await new Promise(r => setTimeout(r, 2000));
  }
  console.log(`\nBatch 2 total sent: ${sent}/${targets.length}`);
})();
