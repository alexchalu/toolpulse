const https = require('https');

class CalcLeap {
  constructor(options = {}) {
    this.baseUrl = options.baseUrl || 'calcleap-api.onrender.com';
    this.timeout = options.timeout || 10000;
  }

  _request(endpoint, params) {
    return new Promise((resolve, reject) => {
      const query = new URLSearchParams(params).toString();
      const path = `/api/${endpoint}?${query}`;
      
      const options = {
        hostname: this.baseUrl,
        path: path,
        method: 'GET',
        timeout: this.timeout
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            if (json.error) {
              reject(new Error(json.error));
            } else {
              resolve(json.result);
            }
          } catch (e) {
            reject(e);
          }
        });
      });

      req.on('error', reject);
      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });
      
      req.end();
    });
  }

  mortgage(principal, rate, years) {
    return this._request('mortgage', { principal, rate, years });
  }

  bmi(weight, height, unit = 'imperial') {
    return this._request('bmi', { weight, height, unit });
  }

  compound(principal, rate, years, compound = 'annually') {
    return this._request('compound', { principal, rate, years, compound });
  }

  loan(amount, rate, months) {
    return this._request('loan', { amount, rate, months });
  }

  retirement(currentAge, retireAge, savings, monthlyContribution, rate) {
    return this._request('retirement', {
      currentAge,
      retireAge,
      savings,
      monthlyContribution,
      rate
    });
  }

  tip(bill, percent, people = 1) {
    return this._request('tip', { bill, percent, people });
  }

  percentage(value, total) {
    return this._request('percentage', { value, total });
  }

  insurance(age, coverage, type = 'term', term = 20) {
    return this._request('insurance', { age, coverage, type, term });
  }
}

module.exports = CalcLeap;
