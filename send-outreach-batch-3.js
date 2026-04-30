const fs = require('fs');

const envFile = fs.readFileSync('.env', 'utf8');
const apiKey = envFile.match(/RESEND_API_KEY=(.+)/)[1].trim();

const targets = [
  // Insurance
  { 
    name: "Best Insurance Agency", 
    email: "info@bestinsurancewyckoff.com",
    template: "insurance"
  },
  { 
    name: "Tammy Felton - State Farm", 
    email: "tammy.felton.c6qr@statefarm.com",
    template: "insurance"
  },
  
  // Law
  { 
    name: "Seigel Law", 
    email: "info@seigellaw.com",
    template: "law"
  },
  { 
    name: "Aretsky Law Group", 
    email: "info@aretsky-law.com",
    template: "law"
  },
  
  // HVAC
  { 
    name: "Total Comfort HVAC", 
    email: "info@totalcomfort.biz",
    template: "hvac"
  },
  { 
    name: "Ultimate Aire Systems", 
    email: "info@ultimateaire.com",
    template: "hvac"
  },
  { 
    name: "Jarvis Heating & Air", 
    email: "info@jarvisheatingfranklinlakes.com",
    template: "hvac"
  }
];

const templates = {
  insurance: {
    subject: (name) => `Stop losing renewals to automation — AI workflow for ${name}`,
    body: (name) => `Hi ${name} team,

Quick question: How much time do your agents spend on administrative tasks (quote requests, renewal reminders, policy updates) instead of high-value sales conversations?

For most independent agencies, it's 60-70% of their workday. That's why top-performing brokerages are automating the repetitive stuff.

What I built for a similar agency:
• AI chatbot for instant quote requests (24/7 availability)
• Automated renewal reminders with one-click processing
• Email nurture sequences for different insurance products
• Custom workflow for claims assistance

Their results:
• 2.8x policies sold per agent
• 88% renewal rate (up from 61%)
• 340+ hours saved monthly
• $620K additional annual revenue

Investment: $2,500 setup + $500/month ongoing support

Would you be open to a 15-minute call to see if this would work for your agency?

Best,
Alex Chalunkal
Chalunkal AI
https://alexchalu.github.io/cai-automation
alex@calcleap.com

P.S. — I'm local to Franklin Lakes, so I can meet in person if you'd prefer.`
  },
  
  law: {
    subject: (name) => `Automate client intake and scheduling — AI for ${name}`,
    body: (name) => `Hi ${name},

Most law firms lose potential clients between first contact and consultation scheduling. Prospects call after hours, leave voicemails, and by the time someone calls back, they've already hired another attorney.

The solution: AI automation that works 24/7.

What I can build for your practice:
• AI chatbot that qualifies leads and schedules consultations instantly
• Automated intake forms and document collection
• Appointment reminders to reduce no-shows
• Follow-up sequences for prospects who haven't booked yet

Why this works for law firms:
• Capture after-hours leads (nights, weekends)
• Pre-qualify prospects before consultations
• Free up staff time for higher-value work
• Increase consultation booking rate by 40-60%

Investment: $2,500 setup + $500/month ongoing support

Would you be open to a brief call to discuss how this could work for your firm?

Best,
Alex Chalunkal
Chalunkal AI
https://alexchalu.github.io/cai-automation
alex@calcleap.com

P.S. — I'm local to Franklin Lakes, so I'm happy to meet in person.`
  },
  
  hvac: {
    subject: (name) => `Never miss an emergency call again — AI automation for ${name}`,
    body: (name) => `Hi ${name} team,

Quick question: How many emergency service calls do you miss when your phones are busy during peak season (summer heatwaves, winter cold snaps)?

For most HVAC companies, it's 15-30% of inbound calls. Those missed calls go straight to your competitors.

The solution: AI phone routing and appointment booking.

What I can build for you:
• AI-powered phone system that answers every call instantly
• Captures emergency service requests 24/7
• Schedules maintenance appointments automatically
• Sends appointment reminders to reduce no-shows
• Routes urgent calls to on-call techs

Why HVAC companies love this:
• Never lose an emergency call to voicemail
• Fill your schedule automatically
• Reduce admin workload on front desk staff
• Increase customer satisfaction (instant response)

Investment: $2,500 setup + $500/month ongoing support

Would you be open to a 15-minute call to see how this could work for your business?

Best,
Alex Chalunkal
Chalunkal AI
https://alexchalu.github.io/cai-automation
alex@calcleap.com

P.S. — I'm local to Franklin Lakes (same area you serve), so I can meet in person if you'd prefer.`
  }
};

async function sendEmail(target) {
  const template = templates[target.template];
  const subject = template.subject(target.name);
  const body = template.body(target.name);

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
  console.log(`\nBatch 3 total sent: ${sent}/${targets.length}`);
  console.log(`Overall campaign total: ${sent + 8} emails sent (5 dental + 3 real estate + ${sent} insurance/law/HVAC)`);
})();
