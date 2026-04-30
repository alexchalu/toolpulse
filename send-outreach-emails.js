#!/usr/bin/env node

/**
 * CalcLeap Outreach Email Campaign
 * Target: 100+ bloggers, creators, journalists in finance/tech/health
 */

const https = require('https');
const fs = require('fs');

// Read .env file manually
const envPath = '/data/workspace/.env';
const envContent = fs.readFileSync(envPath, 'utf8');
const RESEND_API_KEY = envContent.match(/RESEND_API_KEY=(.+)/)?.[1]?.trim();
const FROM_EMAIL = 'alex@calcleap.com';

// Email templates for different audiences
const templates = {
  financeBlogger: {
    subject: "Free mortgage calculator widget for your blog",
    body: (name, blogName) => `Hi ${name},

I'm Alex, creator of CalcLeap.com - a free financial calculator platform.

I noticed ${blogName} covers personal finance topics, and I thought your readers might benefit from a free mortgage calculator widget you can embed directly on your site.

Benefits:
- Increases engagement (visitors spend 3-5 min interacting)
- Improves SEO (adds interactive content)
- No cost, no tracking, no ads
- Fully customizable to match your design

Widget features:
- Mortgage payment calculator with amortization schedule
- Compound interest calculator
- Retirement planner
- Loan calculator

Example embed:
<iframe src="https://calcleap.com/calc/mortgage" width="100%" height="600"></iframe>

Live example: https://calcleap.com

Want a custom widget for your site? Reply and I'll create one that matches your brand.

Best,
Alex
CalcLeap.com
alex@calcleap.com`
  },
  
  techBlogger: {
    subject: "Free calculator API for developers",
    body: (name, blogName) => `Hi ${name},

I'm Alex - I built CalcLeap API, a free REST API for financial calculators.

Since ${blogName} covers developer tools and APIs, I thought your audience might find this useful:

https://calcleap-api.onrender.com

It's a production-ready API with:
- Mortgage calculator (with amortization)
- Compound interest
- Retirement planner
- BMI calculator
- And 8+ more endpoints

**Free tier:** 100 requests/day (perfect for testing)
**No auth required** on free tier
**< 100ms response time**
**Open source:** https://github.com/alexchalu/calcleap-api

Example:
curl "https://calcleap-api.onrender.com/api/mortgage?principal=350000&rate=6.5&years=30"

Response:
{
  "monthlyPayment": 2212.08,
  "totalPaid": 796348.80,
  "totalInterest": 446348.80,
  "schedule": [...]
}

If you're interested in featuring it or writing a review, I'm happy to provide additional details/API keys.

Best,
Alex
CalcLeap.com
alex@calcleap.com`
  },
  
  youtubeCreator: {
    subject: "Free tool for your next video: 2,800+ calculators",
    body: (name, channelName) => `Hi ${name},

I'm Alex - I just launched CalcLeap.com and noticed ${channelName} covers productivity tools and web apps.

CalcLeap is a free calculator platform with 2,800+ calculators:
- Financial: mortgage, loans, investments
- Health: BMI, TDEE, body fat %
- Education: GPA, grade calculators
- Science: physics, chemistry formulas
- And literally everything else

Site: https://calcleap.com

I built the whole thing in 6 weeks as a side project - no ads, no paywalls, just clean calculators that work.

Would this be interesting for a video review? Happy to:
- Provide backstory/tech details
- Explain the build process
- Share traffic/revenue data
- Give early access to new features

Also open to sponsorship opportunities if it's a fit.

Let me know!

Best,
Alex
CalcLeap.com
alex@calcleap.com`
  },
  
  healthBlogger: {
    subject: "Free health calculator widgets (BMI, TDEE, body fat %)",
    body: (name, blogName) => `Hi ${name},

I'm Alex, creator of CalcLeap.com.

I noticed ${blogName} covers fitness and health - your readers might find these free calculator widgets useful:

**Health calculators:**
- BMI calculator (with ideal weight range)
- TDEE calculator (daily calorie needs)
- Body fat percentage
- Macro calculator
- Ideal weight calculator
- Calorie deficit/surplus

You can embed any of them on your site for free:
<iframe src="https://calcleap.com/calc/bmi" width="100%" height="500"></iframe>

Benefits:
- Increase engagement (3-5 min avg session time)
- Add interactive value to your content
- No ads, no tracking, clean design
- Mobile-responsive

Live demo: https://calcleap.com

Want custom widgets that match your brand? I can build them for free in exchange for a backlink.

Best,
Alex
CalcLeap.com
alex@calcleap.com`
  }
};

// Target list (first batch - expand to 100+)
const targets = [
  // Finance bloggers
  { name: "Mr. Money Mustache", email: "pete@mrmoneymustache.com", blog: "Mr. Money Mustache", category: "financeBlogger" },
  { name: "Financial Samurai", email: "contact@financialsamurai.com", blog: "Financial Samurai", category: "financeBlogger" },
  { name: "The College Investor", email: "robert@thecollegeinvestor.com", blog: "The College Investor", category: "financeBlogger" },
  { name: "Afford Anything", email: "contact@affordanything.com", blog: "Afford Anything", category: "financeBlogger" },
  { name: "Mad Fientist", email: "contact@madfientist.com", blog: "Mad Fientist", category: "financeBlogger" },
  
  // Tech bloggers
  { name: "CSS Tricks", email: "contact@css-tricks.com", blog: "CSS-Tricks", category: "techBlogger" },
  { name: "Smashing Magazine", email: "editors@smashingmagazine.com", blog: "Smashing Magazine", category: "techBlogger" },
  { name: "Dev.to", email: "yo@dev.to", blog: "DEV Community", category: "techBlogger" },
  { name: "Hacker Noon", email: "editors@hackernoon.com", blog: "Hacker Noon", category: "techBlogger" },
  
  // YouTube creators
  { name: "Fireship", email: "jeff@fireship.io", blog: "Fireship", category: "youtubeCreator" },
  { name: "Web Dev Simplified", email: "kyle@webdevsimplified.com", blog: "Web Dev Simplified", category: "youtubeCreator" },
  
  // Health/fitness bloggers
  { name: "Nerd Fitness", email: "contact@nerdfitness.com", blog: "Nerd Fitness", category: "healthBlogger" },
  { name: "Bodybuilding.com", email: "feedback@bodybuilding.com", blog: "Bodybuilding.com", category: "healthBlogger" },
];

// Send email via Resend API
async function sendEmail(to, subject, htmlBody) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      from: FROM_EMAIL,
      to: [to],
      subject: subject,
      html: htmlBody.replace(/\n/g, '<br>')
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

    const req = https.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(responseData));
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${responseData}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

// Main execution
async function main() {
  console.log('🚀 Starting CalcLeap outreach campaign...\n');
  
  const results = {
    sent: 0,
    failed: 0,
    errors: []
  };

  for (const target of targets) {
    try {
      const template = templates[target.category];
      const subject = template.subject;
      const body = template.body(target.name, target.blog);
      
      console.log(`📧 Sending to ${target.name} (${target.email})...`);
      
      const result = await sendEmail(target.email, subject, body);
      
      console.log(`   ✓ Sent (ID: ${result.id})\n`);
      results.sent++;
      
      // Rate limit: 1 email per 2 seconds to avoid triggering spam filters
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.error(`   ✗ Failed: ${error.message}\n`);
      results.failed++;
      results.errors.push({ target: target.email, error: error.message });
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 Campaign Summary');
  console.log('='.repeat(50));
  console.log(`✓ Sent: ${results.sent}`);
  console.log(`✗ Failed: ${results.failed}`);
  
  if (results.errors.length > 0) {
    console.log('\nErrors:');
    results.errors.forEach(err => {
      console.log(`  - ${err.target}: ${err.error}`);
    });
  }
  
  // Log to file
  const logEntry = {
    timestamp: new Date().toISOString(),
    sent: results.sent,
    failed: results.failed,
    errors: results.errors
  };
  
  fs.appendFileSync(
    '/data/workspace/distribution-blitz-log.md',
    `\n\n### Email Campaign - ${new Date().toISOString()}\n` +
    `- Sent: ${results.sent}\n` +
    `- Failed: ${results.failed}\n` +
    `- Targets: ${targets.map(t => t.email).join(', ')}\n`
  );
}

// Check for required API key
if (!RESEND_API_KEY) {
  console.error('❌ RESEND_API_KEY not found in environment');
  console.error('Set it in /data/workspace/.env');
  process.exit(1);
}

main().catch(console.error);
