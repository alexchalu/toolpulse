const fs = require('fs');

const envFile = fs.readFileSync('.env', 'utf8');
const apiKey = envFile.match(/RESEND_API_KEY=(.+)/)[1].trim();

async function sendBacklinkEmail() {
  const to = 'info@geeksmint.com';
  const subject = 'Suggestion for your "Best Online Calculators" article';
  
  const body = `Hi GeeksMint team,

I came across your article "10 Best Online Calculators for Solving Basic and Advanced Problems" and wanted to reach out with a suggestion.

I recently launched CalcLeap (calcleap.com) — a free calculator platform with 2,900+ specialized calculators across finance, health, tax, insurance, and more. It's built with a focus on clean design, privacy (no signup required), and comprehensive educational content alongside each calculator.

A few highlights that might interest your readers:
• 270+ insurance calculators (auto, home, life, health, business)
• 150+ tax & financial planning tools (mortgage, retirement, 401k, etc.)
• 100+ health calculators (BMI, calorie, macros, TDEE, etc.)
• Developer-friendly (we also have a free API for developers)
• Mobile-optimized, Apple-inspired UI
• No ads, no tracking, no signup required

I think it would be a great addition to your roundup — it fills gaps that the current 10 sites don't cover (especially insurance and tax calculations).

Would you be open to adding CalcLeap to your article? Happy to provide any additional info or screenshots if helpful.

Best,
Alex Chalunkal
Founder, CalcLeap
https://calcleap.com
alex@calcleap.com`;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'alex@calcleap.com',
      to: to,
      subject: subject,
      text: body
    })
  });

  const result = await response.json();
  if (response.ok) {
    console.log('✅ Email sent to GeeksMint:', result.id);
  } else {
    console.log('❌ Failed to send:', result);
  }
}

sendBacklinkEmail();
