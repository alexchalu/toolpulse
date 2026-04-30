const fs = require('fs');
const envFile = fs.readFileSync('.env', 'utf8');
const apiKey = envFile.match(/RESEND_API_KEY=(.+)/)[1].trim();

const target = {
  name: "The Penny Hoarder",
  email: "editorial@thepennyhoarder.com",
  traffic: "20M visits/month",
  da: "88"
};

const subject = "Free calculator embed for Penny Hoarder readers";
const body = `Hi Penny Hoard editorial team,

I run CalcLeap (calcleap.com), a free calculator site with 2,900+ tools covering personal finance, insurance, taxes, and more.

I noticed Penny Hoarder frequently references calculators in articles (mortgage, budget, income tax, etc.). I'd love to offer:

1. **Free embeds** — Drop our calculators into your articles (iframe or JS widget)
2. **Custom calculators** — If you need something specific, I'll build it
3. **Backlinks** — We'll link back to relevant Penny Hoarder articles from our site

**Why this works for you:**
- Keeps readers on your site longer (better engagement metrics)
- No ads on embedded calculators (clean UX)
- Free forever — no strings attached
- Already mobile-optimized and fast

**Examples of what we have:**
- Mortgage, loan, retirement calculators
- Income tax, capital gains, 1099 tax estimators
- Insurance cost calculators (auto, home, life, health)
- Budget, savings, debt payoff tools

Check it out: https://calcleap.com

Would you be open to trying an embed in an upcoming article? I can send you the code in 5 minutes.

Best,
Alex Chalunkal
CalcLeap
alex@calcleap.com`;

(async () => {
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
  if (!response.ok) console.log(JSON.stringify(result, null, 2));
  else console.log(`Email ID: ${result.id}`);
})();
