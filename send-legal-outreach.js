const fs = require('fs');
const envFile = fs.readFileSync('.env', 'utf8');
const apiKey = envFile.match(/RESEND_API_KEY=(.+)/)[1].trim();

const targets = [
  { name: "Gilman & Bedigian", email: "contact@gilmanbedigian.com", focus: "Medical malpractice" },
  { name: "Fuchsberg Law Firm", email: "info@fuchsberg.com", focus: "Medical malpractice, birth injuries" },
  { name: "McLaughlin & Lauricella", email: "info@ml-law.net", focus: "Personal injury, medical malpractice" }
];

async function sendEmail(target) {
  const subject = `Free settlement calculator for ${target.focus} clients`;
  const body = `Hi ${target.name} team,

I run CalcLeap.com, a suite of free legal calculators that help people understand potential case values before consulting an attorney.

I recently built two high-quality calculators that might be useful for your clients:

1. **Medical Malpractice Settlement Calculator**
   https://calcleap.com/medical-malpractice-calculator.html
   - Estimates settlement range based on economic damages, pain & suffering multipliers, liability strength
   - Educational content explaining NPDB data, settlement timelines, state damage caps
   - Mobile-optimized, no signup required

2. **Wrongful Death Settlement Calculator**
   https://calcleap.com/wrongful-death-settlement-calculator.html
   - Calculates lost future income, non-economic damages, total compensation ranges
   - FAQ covering state laws, tax implications, statute of limitations
   - Clean, professional design matching Apple's aesthetic

**Why I'm reaching out:**

These calculators could be valuable resources for your blog or client education pages. I'm happy to:
- Let you embed them on your site (iframe or direct integration)
- Create custom-branded versions for your firm
- Add backlinks to your site from relevant calculator pages

**No cost, no catch** — I monetize through AdSense, so more usage benefits both of us. Your clients get helpful tools, you provide added value, and I get traffic.

Would you be open to featuring these on your site or linking from relevant blog posts?

Best,
Alex Chalunkal
CalcLeap.com
alex@calcleap.com`;

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
  console.log(`\nLegal blog outreach sent: ${sent}/${targets.length}`);
})();
