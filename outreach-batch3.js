const https = require('https');
const fs = require('fs');

const RESEND_API_KEY = fs.readFileSync('.env', 'utf8').match(/RESEND_API_KEY=(.+)/)[1].trim();

const targets = [
  { email: "submissions@sitepoint.com", site: "SitePoint" },
  { email: "pitch@smashingmagazine.com", site: "Smashing Magazine" },
  { email: "hello@startupranking.com", site: "Startup Ranking" },
  { email: "info@killerstartups.com", site: "KillerStartups" },
  { email: "hello@startupbuffer.com", site: "Startup Buffer" },
  { email: "hello@toolpilot.ai", site: "ToolPilot" },
  { email: "hello@futurepedia.io", site: "Futurepedia" },
  { email: "hello@theresanaiforthat.com", site: "There's An AI For That" },
  { email: "hello@uneed.best", site: "Uneed" },
  { email: "hello@sideprojectors.com", site: "SideProjectors" },
];

const html = `<p>Hi there,</p>
<p>I'd like to submit <a href="https://calcleap.com">CalcLeap</a> for listing.</p>
<p><strong>CalcLeap</strong> — 2,900+ free calculators for finance, health, tax, insurance, crypto.</p>
<ul>
<li>Free API: <a href="https://calcleap-api.onrender.com">8 endpoints, no key needed</a></li>
<li>Covers all 50 US states for tax calculators</li>
<li>Professional financial guides blog</li>
<li>Invoice generator, financial modeling tools</li>
<li>100% free, no signup required</li>
</ul>
<p>Website: <a href="https://calcleap.com">calcleap.com</a> | GitHub: <a href="https://github.com/alexchalu/calcleap-api">calcleap-api</a></p>
<p>Best,<br>Alex Chalunkal<br><a href="mailto:alex@calcleap.com">alex@calcleap.com</a></p>`;

async function send(t) {
  const data = JSON.stringify({
    from: "Alex Chalunkal <alex@calcleap.com>", to: [t.email],
    subject: `Submit: CalcLeap — 2,900+ Free Calculators`,
    html
  });
  const opts = { hostname:'api.resend.com', path:'/emails', method:'POST',
    headers:{'Content-Type':'application/json','Authorization':`Bearer ${RESEND_API_KEY}`}};
  return new Promise((resolve) => {
    const req = https.request(opts, res => {
      let b=''; res.on('data',c=>b+=c);
      res.on('end',()=>{
        if(res.statusCode===200){console.log(`✓ ${t.site}`);resolve(true);}
        else{console.error(`✗ ${t.site}: ${res.statusCode}`);resolve(false);}
      });
    });
    req.on('error',()=>resolve(false));
    req.write(data); req.end();
  });
}

(async()=>{
  console.log(`Batch 3: ${targets.length} emails...\n`);
  let s=0;
  for(const t of targets){
    if(await send(t))s++;
    await new Promise(r=>setTimeout(r,3000));
  }
  console.log(`\n✅ ${s}/${targets.length} sent. Total today: 22+`);
  
  // Update sent tracking
  const sentFile = '/data/workspace/outreach-sent.json';
  let sent = {};
  try{sent=JSON.parse(fs.readFileSync(sentFile,'utf8'));}catch(e){}
  targets.forEach(t=>sent[t.email]=new Date().toISOString());
  fs.writeFileSync(sentFile, JSON.stringify(sent,null,2));
})();
