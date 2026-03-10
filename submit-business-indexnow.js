#!/usr/bin/env node
const https = require('https');

const urls = [
  'https://calcleap.com/business-valuation-calculator.html',
  'https://calcleap.com/break-even-analysis-calculator.html',
  'https://calcleap.com/startup-cost-calculator.html',
  'https://calcleap.com/cash-flow-calculator.html',
  'https://calcleap.com/payroll-tax-calculator.html',
  'https://calcleap.com/business-loan-calculator.html',
  'https://calcleap.com/inventory-turnover-calculator.html',
  'https://calcleap.com/freelance-rate-calculator.html',
  'https://calcleap.com/customer-lifetime-value-calculator.html',
  'https://calcleap.com/conversion-rate-calculator.html',
  'https://calcleap.com/gross-profit-margin-calculator.html',
  'https://calcleap.com/revenue-per-employee-calculator.html',
];

const payload = JSON.stringify({
  host: 'calcleap.com',
  key: 'a1b2c3d4e5f6g7h8',
  keyLocation: 'https://calcleap.com/a1b2c3d4e5f6g7h8.txt',
  urlList: urls
});

const options = {
  hostname: 'api.indexnow.org',
  port: 443,
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload)
  }
};

const req = https.request(options, (res) => {
  console.log(`✅ IndexNow response: ${res.statusCode}`);
  if (res.statusCode === 200) {
    console.log('✅ Successfully submitted 12 business calculator URLs to IndexNow (Bing + Yandex)');
  }
});

req.on('error', (error) => {
  console.error('❌ IndexNow error:', error);
});

req.write(payload);
req.end();
