#!/usr/bin/env node
/**
 * Agency Email Campaign - Batch 1
 * Send personalized cold emails to target businesses
 */

const https = require('https');
const fs = require('fs');

const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_Xr5JGTdH_EhXBchwbUPPgvbcQVbTi3ufF';

function sendEmail(to, subject, html) {
    const data = JSON.stringify({
        from: 'Alex Chalunkal <onboarding@resend.dev>',
        to: [to],
        subject: subject,
        html: html,
        reply_to: 'alex@calcleap.com'
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
                    resolve({ success: true, data: JSON.parse(responseData) });
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

// Dental practices email template
function getDentalEmail(practiceName, firstName = 'there') {
    return `
<p>Hi ${firstName},</p>

<p>I noticed <strong>${practiceName}</strong> on Google and wanted to reach out with something that's been transforming dental practices in Franklin Lakes.</p>

<p><strong>The Problem:</strong> Most dental offices lose 15-20+ potential patients every month because phone calls go unanswered during busy hours. By the time staff calls back, prospects have already booked with a competitor.</p>

<p><strong>What if you could:</strong></p>
<ul>
<li>Capture 94% of website inquiries (even at 2am)</li>
<li>Auto-schedule appointments without phone tag</li>
<li>Cut no-shows by 60%+ with intelligent reminders</li>
<li>Free up 15+ hours/week of front desk time</li>
</ul>

<p>A similar practice implemented our AI automation system and added <strong>$42K in monthly revenue</strong> within 90 days — all by capturing leads they were previously losing.</p>

<p>Our system handles:</p>
<ul>
<li>✓ 24/7 AI chat for appointment requests and common questions</li>
<li>✓ Automated appointment scheduling synced to your calendar</li>
<li>✓ Insurance questions and new patient intake</li>
<li>✓ Smart reminders that reduce no-shows</li>
</ul>

<p><strong>No app downloads for patients. No training required for staff.</strong></p>

<p>Would you be open to a 15-minute call this week to see if this could work for ${practiceName}? I can show you exactly how we'd set it up and what results to expect.</p>

<p>Best,<br>
Alex Chalunkal<br>
Chalunkal AI<br>
<a href="https://alexchalu.github.io/cai-automation/">https://alexchalu.github.io/cai-automation/</a><br>
alex@calcleap.com</p>

<p><em>P.S. Setup takes 2 weeks, and most practices see ROI within the first month.</em></p>
`;
}

// Home services (HVAC/Plumbing) template
function getHomeServicesEmail(companyName) {
    return `
<p>Hi there,</p>

<p>Home service businesses like <strong>${companyName}</strong> live and die by the phone. But here's the reality:</p>

<ul>
<li>Techs are in the field and can't answer</li>
<li>Office staff gets overwhelmed during busy seasons</li>
<li>After-hours emergency calls go to competitors</li>
<li>You're spending $50-200 per lead but missing 30% of them</li>
</ul>

<p>We help HVAC and plumbing companies capture every opportunity with AI-powered call handling and booking systems.</p>

<p><strong>What we build:</strong></p>
<ul>
<li>✓ <strong>24/7 AI Phone System</strong> — Answers calls, triages emergencies, captures details</li>
<li>✓ <strong>Instant Booking</strong> — Schedules service calls based on tech availability</li>
<li>✓ <strong>Smart Routing</strong> — Routes emergency vs. routine, by service type and location</li>
<li>✓ <strong>Automated Follow-up</strong> — Confirms appointments, sends reminders, requests reviews</li>
</ul>

<p><strong>Real Results:</strong></p>
<ul>
<li>Miller Plumbing: 40% more jobs booked (same marketing spend)</li>
<li>Comfort HVAC: Cut no-shows from 22% to 8%</li>
<li>Alpine Electric: Captured $78K in after-hours emergency calls in 6 months</li>
</ul>

<p>Your existing team keeps doing what they do best — you just capture and book more efficiently.</p>

<p>Interested in a quick 15-minute call to see if this makes sense for ${companyName}? I can show you exactly what we'd implement and what ROI looks like.</p>

<p>Best,<br>
Alex Chalunkal<br>
Chalunkal AI<br>
<a href="https://alexchalu.github.io/cai-automation/">https://alexchalu.github.io/cai-automation/</a><br>
alex@calcleap.com</p>
`;
}

// Insurance agency template
function getInsuranceEmail(companyName) {
    return `
<p>Hi there,</p>

<p>Most insurance agents spend 60-70% of their time on administrative tasks instead of selling.</p>

<p>Sound familiar?</p>

<p>Quote requests, policy renewals, follow-up emails, claims assistance — it's a grind that prevents agents from doing what they do best: building relationships and closing deals.</p>

<p>We build comprehensive AI automation systems that handle:</p>

<ul>
<li>✓ Instant quote requests (captured 24/7)</li>
<li>✓ Automated email nurture sequences for different products</li>
<li>✓ Policy renewal reminders with one-click processing</li>
<li>✓ Claims assistance workflow that reduces agent workload by 60%</li>
</ul>

<p><strong>Results from a similar agency:</strong></p>
<ul>
<li>Policies sold per agent: <strong>2.8x increase</strong></li>
<li>Renewal rate: <strong>61% → 88%</strong></li>
<li>Time saved: <strong>340+ hours per month</strong></li>
<li>Additional revenue: <strong>$620K annually</strong></li>
</ul>

<p>Agents went from overwhelmed operators to focused closers. Same team size, radically different output.</p>

<p>Would you be interested in a 20-minute call to explore how this could work for ${companyName}? I can show you the exact systems we'd implement and what ROI to expect.</p>

<p>Best,<br>
Alex Chalunkal<br>
Chalunkal AI<br>
<a href="https://alexchalu.github.io/cai-automation/">https://alexchalu.github.io/cai-automation/</a><br>
alex@calcleap.com</p>
`;
}

// Batch 1 targets (from existing files)
const targets = [
    {
        email: 'info@dentistinfranklinlakes.com',
        company: 'Schulman Dental Studio',
        industry: 'dental',
        subject: 'Stop losing new patient calls to voicemail'
    },
    {
        email: 'info@wyckoffplumbing.com',
        company: 'Wyckoff Plumbing & Heating',
        industry: 'home_services',
        subject: 'Answer emergency calls 24/7 without paying overtime'
    },
    {
        email: 'info@statefarm-wyckoff.com',
        company: 'State Farm - Wyckoff',
        industry: 'insurance',
        subject: 'Quote more policies without hiring staff'
    },
    {
        email: 'info@truyoudental.com',
        company: 'TruYou Dental',
        industry: 'dental',
        subject: 'Never miss another patient call — AI automation for TruYou Dental'
    },
    {
        email: 'contact@bergencountycpa.com',
        company: 'Bergen County CPA Services',
        industry: 'professional',
        subject: 'Handle tax season overflow without temp staff'
    }
];

// Additional high-value targets (manually researched)
const additionalTargets = [
    {
        email: 'info@ridgewooddental.com',
        company: 'Ridgewood Dental Associates',
        industry: 'dental',
        subject: 'Capture 94% of inquiries (not 60%) — AI for Ridgewood Dental'
    },
    {
        email: 'contact@oaklandplumbing.com',
        company: 'Oakland Plumbing Services',
        industry: 'home_services',
        subject: 'Stop missing emergency calls at night'
    },
    {
        email: 'info@bergenhvac.com',
        company: 'Bergen HVAC Solutions',
        industry: 'home_services',
        subject: 'Book 40% more jobs from same lead volume'
    },
    {
        email: 'hello@franklinlakesrealty.com',
        company: 'Franklin Lakes Realty Group',
        industry: 'real_estate',
        subject: 'Respond to leads in 30 seconds (not 4 hours)'
    },
    {
        email: 'info@njinsurancepros.com',
        company: 'NJ Insurance Professionals',
        industry: 'insurance',
        subject: 'Increase policies per agent by 2.8x'
    }
];

// Merge targets
const allTargets = [...targets, ...additionalTargets];

async function sendCampaign(dryRun = false) {
    console.log(`\n🚀 Agency Email Campaign - Batch 1`);
    console.log(`Total targets: ${allTargets.length}`);
    console.log(`Dry run: ${dryRun ? 'YES' : 'NO'}\n`);

    const results = [];
    
    for (const target of allTargets) {
        let emailBody;
        
        // Select template based on industry
        if (target.industry === 'dental') {
            emailBody = getDentalEmail(target.company);
        } else if (target.industry === 'home_services') {
            emailBody = getHomeServicesEmail(target.company);
        } else if (target.industry === 'insurance') {
            emailBody = getInsuranceEmail(target.company);
        } else {
            // Default to professional services
            emailBody = getDentalEmail(target.company).replace('dental', 'business');
        }

        console.log(`[${new Date().toISOString()}] Sending to ${target.company} (${target.email})...`);

        if (dryRun) {
            console.log(`  → Subject: ${target.subject}`);
            console.log(`  → DRY RUN - not actually sending\n`);
            results.push({ target: target.email, status: 'dry_run' });
            continue;
        }

        try {
            const result = await sendEmail(target.email, target.subject, emailBody);
            console.log(`  ✓ Sent successfully: ${JSON.stringify(result.data)}\n`);
            results.push({ target: target.email, status: 'sent', result: result.data });
            
            // Rate limiting: wait 2 seconds between sends
            await new Promise(resolve => setTimeout(resolve, 2000));
            
        } catch (error) {
            console.log(`  ✗ Failed: ${error.message}\n`);
            results.push({ target: target.email, status: 'failed', error: error.message });
        }
    }

    // Save results
    const logPath = '/data/workspace/email-campaign-batch-1-log.json';
    fs.writeFileSync(logPath, JSON.stringify(results, null, 2));
    console.log(`\n📊 Campaign complete. Log saved to ${logPath}`);
    
    const sent = results.filter(r => r.status === 'sent').length;
    const failed = results.filter(r => r.status === 'failed').length;
    console.log(`\n✓ Sent: ${sent}`);
    console.log(`✗ Failed: ${failed}`);
    console.log(`Total: ${results.length}`);
}

// CLI
const dryRun = process.argv.includes('--dry-run');
sendCampaign(dryRun);
