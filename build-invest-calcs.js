const fs = require('fs');
const path = require('path');
const outDir = '/data/workspace/toolpulse/invest';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const calcs = [
  {
    slug: '401k-calculator',
    title: '401K Calculator 2026 — Retirement Savings Estimator',
    h1: '401(k) Retirement Calculator',
    desc: 'Calculate your 401(k) growth with employer match, contribution limits, and compound interest. Free 2026 401k calculator.',
    keywords: '401k calculator, retirement calculator, 401k contribution calculator 2026, employer match calculator',
    fields: [
      { id: 'age', label: 'Current Age', val: 30, min: 18, max: 75 },
      { id: 'retireAge', label: 'Retirement Age', val: 65, min: 30, max: 80 },
      { id: 'salary', label: 'Annual Salary ($)', val: 75000, min: 0 },
      { id: 'contribution', label: 'Your Contribution (%)', val: 10, min: 0, max: 100 },
      { id: 'matchPct', label: 'Employer Match (%)', val: 50, min: 0, max: 100 },
      { id: 'matchLimit', label: 'Match Up To (%)', val: 6, min: 0, max: 100 },
      { id: 'currentBal', label: 'Current Balance ($)', val: 25000, min: 0 },
      { id: 'annualReturn', label: 'Expected Return (%)', val: 7, min: 0, max: 30 },
      { id: 'salaryGrowth', label: 'Annual Raise (%)', val: 3, min: 0, max: 20 },
    ],
    calc: `
      const years = retireAge - age;
      let balance = currentBal;
      let totalContrib = currentBal;
      let totalMatch = 0;
      let sal = salary;
      const rows = [];
      for (let y = 1; y <= years; y++) {
        const yourC = sal * (contribution / 100);
        const matchableC = sal * (matchLimit / 100);
        const matchC = Math.min(yourC, matchableC) * (matchPct / 100);
        balance = (balance + yourC + matchC) * (1 + annualReturn / 100);
        totalContrib += yourC;
        totalMatch += matchC;
        sal *= (1 + salaryGrowth / 100);
        if (y <= 10 || y === years || y % 5 === 0) rows.push('<tr><td>'+y+'</td><td>$'+Math.round(yourC).toLocaleString()+'</td><td>$'+Math.round(matchC).toLocaleString()+'</td><td>$'+Math.round(balance).toLocaleString()+'</td></tr>');
      }
      document.getElementById('result').innerHTML = '<div class="res-cards"><div class="rc"><div class="rc-label">Estimated Balance at '+retireAge+'</div><div class="rc-val">$'+Math.round(balance).toLocaleString()+'</div></div><div class="rc"><div class="rc-label">Your Contributions</div><div class="rc-val">$'+Math.round(totalContrib).toLocaleString()+'</div></div><div class="rc"><div class="rc-label">Employer Match Total</div><div class="rc-val">$'+Math.round(totalMatch).toLocaleString()+'</div></div><div class="rc"><div class="rc-label">Investment Growth</div><div class="rc-val">$'+Math.round(balance - totalContrib - totalMatch).toLocaleString()+'</div></div></div><h3 style="margin-top:1.5rem">Year-by-Year Breakdown</h3><table class="data-table"><thead><tr><th>Year</th><th>Your Contribution</th><th>Employer Match</th><th>Balance</th></tr></thead><tbody>'+rows.join('')+'</tbody></table>';
    `,
    article: `<h2>How Does a 401(k) Work?</h2><p>A 401(k) is an employer-sponsored retirement savings plan that allows you to contribute pre-tax dollars from your paycheck. Many employers offer matching contributions, essentially giving you free money. In 2026, the contribution limit is $23,500 ($31,000 if you're 50+).</p><h2>Why Employer Match Matters</h2><p>If your employer matches 50% of contributions up to 6% of salary, and you earn $75,000 contributing 6%, your employer adds $2,250/year. Over 30 years at 7% returns, that match alone grows to over $213,000.</p><h2>Key 401(k) Strategies</h2><ul><li><strong>Always get the full match</strong> — it's a 50-100% instant return</li><li><strong>Increase contributions with raises</strong> — bump 1% each year</li><li><strong>Choose low-fee index funds</strong> — a 1% fee difference costs $100K+ over 30 years</li><li><strong>Consider Roth 401(k)</strong> — pay taxes now, withdraw tax-free later</li></ul>`
  },
  {
    slug: 'roth-ira-calculator',
    title: 'Roth IRA Calculator 2026 — Tax-Free Retirement Growth',
    h1: 'Roth IRA Calculator',
    desc: 'Calculate your Roth IRA growth and tax-free retirement income. 2026 contribution limits and income phase-out calculator.',
    keywords: 'roth ira calculator, roth ira growth calculator 2026, roth ira contribution limit, tax free retirement',
    fields: [
      { id: 'age', label: 'Current Age', val: 30, min: 18, max: 75 },
      { id: 'retireAge', label: 'Retirement Age', val: 65, min: 30, max: 80 },
      { id: 'annualContrib', label: 'Annual Contribution ($)', val: 7000, min: 0 },
      { id: 'currentBal', label: 'Current Balance ($)', val: 10000, min: 0 },
      { id: 'annualReturn', label: 'Expected Return (%)', val: 7, min: 0, max: 30 },
    ],
    calc: `
      const years = retireAge - age;
      let balance = currentBal;
      let totalContrib = currentBal;
      const rows = [];
      for (let y = 1; y <= years; y++) {
        balance = (balance + annualContrib) * (1 + annualReturn / 100);
        totalContrib += annualContrib;
        if (y <= 5 || y === years || y % 5 === 0) rows.push('<tr><td>'+y+'</td><td>$'+Math.round(totalContrib).toLocaleString()+'</td><td>$'+Math.round(balance).toLocaleString()+'</td><td>$'+Math.round(balance-totalContrib).toLocaleString()+'</td></tr>');
      }
      const monthlyIncome = Math.round((balance * 0.04) / 12);
      document.getElementById('result').innerHTML = '<div class="res-cards"><div class="rc"><div class="rc-label">Tax-Free Balance at '+retireAge+'</div><div class="rc-val">$'+Math.round(balance).toLocaleString()+'</div></div><div class="rc"><div class="rc-label">Total Contributions</div><div class="rc-val">$'+Math.round(totalContrib).toLocaleString()+'</div></div><div class="rc"><div class="rc-label">Tax-Free Growth</div><div class="rc-val">$'+Math.round(balance-totalContrib).toLocaleString()+'</div></div><div class="rc"><div class="rc-label">Monthly Income (4% Rule)</div><div class="rc-val">$'+monthlyIncome.toLocaleString()+'</div></div></div><table class="data-table"><thead><tr><th>Year</th><th>Contributed</th><th>Balance</th><th>Growth</th></tr></thead><tbody>'+rows.join('')+'</tbody></table>';
    `,
    article: `<h2>What Is a Roth IRA?</h2><p>A Roth IRA lets you contribute after-tax dollars that grow and can be withdrawn completely tax-free in retirement. In 2026, the contribution limit is $7,000 ($8,000 if 50+). Income limits apply: single filers must earn under $161,000 for full contributions.</p><h2>Roth IRA vs Traditional IRA</h2><p>With a Traditional IRA, you get a tax deduction now but pay taxes on withdrawals. With a Roth, you pay taxes now but everything — contributions AND growth — comes out tax-free after 59½. If you expect higher taxes in retirement, Roth wins.</p><h2>The Power of Tax-Free Growth</h2><p>$7,000/year invested for 35 years at 7% grows to over $1.1 million — all tax-free. The same amount in a taxable account at a 22% tax rate would leave you with roughly $860,000 after taxes.</p>`
  },
  {
    slug: 'compound-interest-calculator',
    title: 'Compound Interest Calculator — See Your Money Grow',
    h1: 'Compound Interest Calculator',
    desc: 'Free compound interest calculator with monthly/quarterly/annual compounding. See how your savings and investments grow over time.',
    keywords: 'compound interest calculator, interest calculator, investment growth calculator, savings calculator',
    fields: [
      { id: 'principal', label: 'Initial Investment ($)', val: 10000, min: 0 },
      { id: 'monthlyAdd', label: 'Monthly Addition ($)', val: 500, min: 0 },
      { id: 'rate', label: 'Annual Interest Rate (%)', val: 7, min: 0, max: 50 },
      { id: 'years', label: 'Time Period (years)', val: 20, min: 1, max: 50 },
      { id: 'compFreq', label: 'Compounding (times/year)', val: 12, min: 1, max: 365 },
    ],
    calc: `
      const n = compFreq;
      const r = rate / 100;
      let balance = principal;
      let totalDeposited = principal;
      const rows = [];
      for (let y = 1; y <= years; y++) {
        for (let p = 0; p < n; p++) {
          balance = balance * (1 + r / n) + (monthlyAdd * 12 / n);
        }
        totalDeposited += monthlyAdd * 12;
        if (y <= 5 || y === years || y % 5 === 0) rows.push('<tr><td>'+y+'</td><td>$'+Math.round(totalDeposited).toLocaleString()+'</td><td>$'+Math.round(balance).toLocaleString()+'</td><td>$'+Math.round(balance-totalDeposited).toLocaleString()+'</td></tr>');
      }
      document.getElementById('result').innerHTML = '<div class="res-cards"><div class="rc"><div class="rc-label">Final Balance</div><div class="rc-val">$'+Math.round(balance).toLocaleString()+'</div></div><div class="rc"><div class="rc-label">Total Deposited</div><div class="rc-val">$'+Math.round(totalDeposited).toLocaleString()+'</div></div><div class="rc"><div class="rc-label">Interest Earned</div><div class="rc-val">$'+Math.round(balance-totalDeposited).toLocaleString()+'</div></div><div class="rc"><div class="rc-label">Return on Investment</div><div class="rc-val">'+Math.round((balance/totalDeposited-1)*100)+'%</div></div></div><table class="data-table"><thead><tr><th>Year</th><th>Deposited</th><th>Balance</th><th>Interest</th></tr></thead><tbody>'+rows.join('')+'</tbody></table>';
    `,
    article: `<h2>The Magic of Compound Interest</h2><p>Albert Einstein reportedly called compound interest the "eighth wonder of the world." When your interest earns interest, growth becomes exponential. $10,000 at 7% becomes $76,123 in 30 years — without adding a penny.</p><h2>How Compounding Frequency Matters</h2><p>Monthly compounding earns slightly more than annual. $10,000 at 7% annually = $19,672 after 10 years. Monthly = $20,097. The difference grows with larger amounts and longer time periods.</p>`
  },
  {
    slug: 'debt-payoff-calculator',
    title: 'Debt Payoff Calculator — Become Debt Free Faster',
    h1: 'Debt Payoff Calculator',
    desc: 'Calculate how quickly you can pay off debt. See the impact of extra payments and compare avalanche vs snowball strategies.',
    keywords: 'debt payoff calculator, debt free calculator, debt snowball calculator, debt avalanche, credit card payoff',
    fields: [
      { id: 'balance', label: 'Total Debt Balance ($)', val: 25000, min: 0 },
      { id: 'apr', label: 'Interest Rate / APR (%)', val: 19.99, min: 0, max: 50 },
      { id: 'minPayment', label: 'Monthly Payment ($)', val: 500, min: 0 },
      { id: 'extraPayment', label: 'Extra Monthly Payment ($)', val: 0, min: 0 },
    ],
    calc: `
      const monthly = minPayment + extraPayment;
      const monthlyRate = apr / 100 / 12;
      let bal = balance;
      let totalPaid = 0;
      let totalInterest = 0;
      let months = 0;
      const rows = [];
      while (bal > 0 && months < 600) {
        const interest = bal * monthlyRate;
        const princPaid = Math.min(bal, monthly - interest);
        if (princPaid <= 0) { document.getElementById('result').innerHTML='<p style="color:#ef4444">Payment too low to cover interest! Increase monthly payment.</p>'; return; }
        bal = Math.max(0, bal - princPaid);
        totalPaid += Math.min(monthly, princPaid + interest);
        totalInterest += interest;
        months++;
        if (months <= 6 || bal === 0 || months % 6 === 0) rows.push('<tr><td>'+months+'</td><td>$'+Math.round(interest).toLocaleString()+'</td><td>$'+Math.round(princPaid).toLocaleString()+'</td><td>$'+Math.round(bal).toLocaleString()+'</td></tr>');
      }
      // No extra
      let bal2 = balance; let m2 = 0; let ti2 = 0;
      while (bal2 > 0 && m2 < 600) { const i2 = bal2 * monthlyRate; const p2 = Math.min(bal2, minPayment - i2); if(p2<=0)break; bal2=Math.max(0,bal2-p2); ti2+=i2; m2++; }
      const saved = ti2 - totalInterest;
      const yrs = Math.floor(months/12); const mo = months%12;
      document.getElementById('result').innerHTML = '<div class="res-cards"><div class="rc"><div class="rc-label">Debt-Free In</div><div class="rc-val">'+(yrs>0?yrs+'y ':'')+ mo+'mo</div></div><div class="rc"><div class="rc-label">Total Interest Paid</div><div class="rc-val">$'+Math.round(totalInterest).toLocaleString()+'</div></div><div class="rc"><div class="rc-label">Total Amount Paid</div><div class="rc-val">$'+Math.round(totalPaid).toLocaleString()+'</div></div>'+(extraPayment>0?'<div class="rc"><div class="rc-label">Interest Saved</div><div class="rc-val" style="color:#22c55e">$'+Math.round(saved).toLocaleString()+'</div></div>':'')+'</div><table class="data-table"><thead><tr><th>Month</th><th>Interest</th><th>Principal</th><th>Remaining</th></tr></thead><tbody>'+rows.join('')+'</tbody></table>';
    `,
    article: `<h2>How to Pay Off Debt Faster</h2><p>The average American household carries $7,951 in credit card debt at ~20% APR. At minimum payments, that takes 19 years and costs $11,000+ in interest. Adding just $100/month cuts it to 3 years and saves $8,000.</p><h2>Avalanche vs Snowball</h2><p><strong>Avalanche</strong>: Pay highest-interest debt first. Saves the most money. <strong>Snowball</strong>: Pay smallest balance first. Gives quick wins for motivation. Mathematically, avalanche always wins — but the best strategy is the one you stick with.</p>`
  },
  {
    slug: 'investment-return-calculator',
    title: 'Investment Return Calculator — CAGR & Total Return',
    h1: 'Investment Return Calculator',
    desc: 'Calculate your investment returns, CAGR, and total growth. Compare stocks, real estate, and other investments.',
    keywords: 'investment return calculator, CAGR calculator, stock return calculator, ROI calculator',
    fields: [
      { id: 'initialInvest', label: 'Initial Investment ($)', val: 50000, min: 0 },
      { id: 'finalValue', label: 'Final Value ($)', val: 125000, min: 0 },
      { id: 'years', label: 'Time Period (years)', val: 5, min: 1, max: 100 },
      { id: 'dividends', label: 'Total Dividends Received ($)', val: 5000, min: 0 },
    ],
    calc: `
      const totalReturn = ((finalValue + dividends - initialInvest) / initialInvest * 100);
      const cagr = ((Math.pow((finalValue + dividends) / initialInvest, 1/years) - 1) * 100);
      const profit = finalValue + dividends - initialInvest;
      const annualizedProfit = profit / years;
      document.getElementById('result').innerHTML = '<div class="res-cards"><div class="rc"><div class="rc-label">Total Return</div><div class="rc-val"'+(totalReturn>=0?' style="color:#22c55e"':' style="color:#ef4444"')+'>'+totalReturn.toFixed(1)+'%</div></div><div class="rc"><div class="rc-label">CAGR (Annualized)</div><div class="rc-val">'+cagr.toFixed(2)+'%</div></div><div class="rc"><div class="rc-label">Total Profit</div><div class="rc-val"'+(profit>=0?' style="color:#22c55e"':' style="color:#ef4444"')+'>$'+Math.round(profit).toLocaleString()+'</div></div><div class="rc"><div class="rc-label">Avg Annual Profit</div><div class="rc-val">$'+Math.round(annualizedProfit).toLocaleString()+'</div></div></div><div style="margin-top:1.5rem;padding:1rem;background:var(--s2);border-radius:8px"><h3>Investment Breakdown</h3><p style="margin-top:.5rem;color:var(--m)">Capital Appreciation: $'+(finalValue-initialInvest).toLocaleString()+' ('+ ((finalValue-initialInvest)/initialInvest*100).toFixed(1)+'%)</p><p style="color:var(--m)">Dividend Income: $'+dividends.toLocaleString()+' ('+((dividends/initialInvest)*100).toFixed(1)+'%)</p><p style="color:var(--m)">Annualized CAGR of '+cagr.toFixed(2)+'% means $1 invested becomes $'+(Math.pow(1+cagr/100,years)).toFixed(2)+' in '+years+' years</p></div>';
    `,
    article: `<h2>Understanding Investment Returns</h2><p>Total return includes both capital appreciation and income (dividends, interest). CAGR (Compound Annual Growth Rate) shows your smoothed annual return, making it easy to compare investments of different durations.</p><h2>Historical Benchmarks</h2><ul><li>S&P 500: ~10% CAGR (1926-2025)</li><li>Real Estate: ~3-4% CAGR (appreciation only)</li><li>Bonds: ~5% CAGR (total return)</li><li>Gold: ~7% CAGR (2000-2025)</li></ul>`
  },
  {
    slug: 'auto-loan-calculator',
    title: 'Auto Loan Calculator 2026 — Monthly Payment & Total Cost',
    h1: 'Auto Loan Calculator',
    desc: 'Calculate your monthly car payment, total interest, and compare auto loan terms. Free 2026 auto loan calculator.',
    keywords: 'auto loan calculator, car payment calculator, car loan calculator, monthly car payment',
    fields: [
      { id: 'price', label: 'Vehicle Price ($)', val: 35000, min: 0 },
      { id: 'downPayment', label: 'Down Payment ($)', val: 5000, min: 0 },
      { id: 'tradeIn', label: 'Trade-In Value ($)', val: 0, min: 0 },
      { id: 'apr', label: 'Interest Rate / APR (%)', val: 6.5, min: 0, max: 30 },
      { id: 'term', label: 'Loan Term (months)', val: 60, min: 12, max: 84 },
      { id: 'salesTax', label: 'Sales Tax (%)', val: 7, min: 0, max: 15 },
    ],
    calc: `
      const loanAmt = (price - downPayment - tradeIn) * (1 + salesTax / 100);
      const monthlyRate = apr / 100 / 12;
      const payment = monthlyRate > 0 ? loanAmt * monthlyRate / (1 - Math.pow(1 + monthlyRate, -term)) : loanAmt / term;
      const totalPaid = payment * term;
      const totalInterest = totalPaid - loanAmt;
      // Compare terms
      const terms = [36, 48, 60, 72, 84];
      let compRows = '';
      for (const t of terms) {
        const p = monthlyRate > 0 ? loanAmt * monthlyRate / (1 - Math.pow(1 + monthlyRate, -t)) : loanAmt / t;
        const ti = p * t - loanAmt;
        compRows += '<tr'+(t===term?' style="background:var(--g)"':'')+'><td>'+t+' mo</td><td>$'+Math.round(p).toLocaleString()+'</td><td>$'+Math.round(ti).toLocaleString()+'</td><td>$'+Math.round(p*t).toLocaleString()+'</td></tr>';
      }
      document.getElementById('result').innerHTML = '<div class="res-cards"><div class="rc"><div class="rc-label">Monthly Payment</div><div class="rc-val">$'+Math.round(payment).toLocaleString()+'</div></div><div class="rc"><div class="rc-label">Loan Amount</div><div class="rc-val">$'+Math.round(loanAmt).toLocaleString()+'</div></div><div class="rc"><div class="rc-label">Total Interest</div><div class="rc-val">$'+Math.round(totalInterest).toLocaleString()+'</div></div><div class="rc"><div class="rc-label">Total Cost</div><div class="rc-val">$'+Math.round(price + totalInterest + price*salesTax/100).toLocaleString()+'</div></div></div><h3 style="margin-top:1.5rem">Compare Loan Terms</h3><table class="data-table"><thead><tr><th>Term</th><th>Payment</th><th>Interest</th><th>Total</th></tr></thead><tbody>'+compRows+'</tbody></table>';
    `,
    article: `<h2>How to Get the Best Auto Loan</h2><p>The average new car loan in 2026 is $40,000+ with rates around 6-7% for good credit. Tips to save: get pre-approved from your bank/credit union before visiting dealers, aim for 48-60 month terms (72+ costs thousands more in interest), and put 20% down to avoid being underwater.</p>`
  },
  {
    slug: 'net-worth-calculator',
    title: 'Net Worth Calculator — Track Your Financial Health',
    h1: 'Net Worth Calculator',
    desc: 'Calculate your net worth by listing assets and liabilities. Free personal net worth calculator and tracker.',
    keywords: 'net worth calculator, personal net worth, financial health calculator, assets minus liabilities',
    fields: [
      { id: 'cash', label: 'Cash & Savings ($)', val: 25000, min: 0 },
      { id: 'investments', label: 'Investments & Retirement ($)', val: 150000, min: 0 },
      { id: 'realEstate', label: 'Real Estate Value ($)', val: 350000, min: 0 },
      { id: 'vehicles', label: 'Vehicle Values ($)', val: 30000, min: 0 },
      { id: 'otherAssets', label: 'Other Assets ($)', val: 10000, min: 0 },
      { id: 'mortgage', label: 'Mortgage Balance ($)', val: 250000, min: 0 },
      { id: 'carLoans', label: 'Car Loans ($)', val: 15000, min: 0 },
      { id: 'studentLoans', label: 'Student Loans ($)', val: 30000, min: 0 },
      { id: 'creditCards', label: 'Credit Card Debt ($)', val: 5000, min: 0 },
      { id: 'otherDebt', label: 'Other Debts ($)', val: 0, min: 0 },
    ],
    calc: `
      const totalAssets = cash + investments + realEstate + vehicles + otherAssets;
      const totalLiabilities = mortgage + carLoans + studentLoans + creditCards + otherDebt;
      const netWorth = totalAssets - totalLiabilities;
      const debtRatio = totalAssets > 0 ? ((totalLiabilities / totalAssets) * 100).toFixed(1) : 0;
      document.getElementById('result').innerHTML = '<div class="res-cards"><div class="rc"><div class="rc-label">Net Worth</div><div class="rc-val"'+(netWorth>=0?' style="color:#22c55e"':' style="color:#ef4444"')+'>$'+Math.round(netWorth).toLocaleString()+'</div></div><div class="rc"><div class="rc-label">Total Assets</div><div class="rc-val">$'+Math.round(totalAssets).toLocaleString()+'</div></div><div class="rc"><div class="rc-label">Total Liabilities</div><div class="rc-val">$'+Math.round(totalLiabilities).toLocaleString()+'</div></div><div class="rc"><div class="rc-label">Debt-to-Asset Ratio</div><div class="rc-val">'+debtRatio+'%</div></div></div><div style="margin-top:1.5rem"><h3>Asset Breakdown</h3><div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem;margin-top:.5rem"><div style="padding:.75rem;background:var(--s2);border-radius:8px"><span style="color:var(--m)">Cash:</span> $'+cash.toLocaleString()+'</div><div style="padding:.75rem;background:var(--s2);border-radius:8px"><span style="color:var(--m)">Investments:</span> $'+investments.toLocaleString()+'</div><div style="padding:.75rem;background:var(--s2);border-radius:8px"><span style="color:var(--m)">Real Estate:</span> $'+realEstate.toLocaleString()+'</div><div style="padding:.75rem;background:var(--s2);border-radius:8px"><span style="color:var(--m)">Vehicles:</span> $'+vehicles.toLocaleString()+'</div></div></div>';
    `,
    article: `<h2>What Is Net Worth?</h2><p>Net worth = assets minus liabilities. It's the single best measure of financial health. The median American household net worth is $192,900 (2023 Federal Reserve data). By age: 35-44 average $549,600, 55-64 average $1.56 million, 65-74 average $1.79 million.</p><h2>How to Grow Your Net Worth</h2><ul><li>Pay down high-interest debt first</li><li>Max out retirement accounts (401k + IRA = $30,500/year)</li><li>Build an emergency fund (3-6 months expenses)</li><li>Invest consistently in low-cost index funds</li><li>Track net worth quarterly to stay motivated</li></ul>`
  },
  {
    slug: 'student-loan-calculator',
    title: 'Student Loan Repayment Calculator 2026',
    h1: 'Student Loan Repayment Calculator',
    desc: 'Calculate student loan payments, total interest, and payoff timeline. Compare repayment plans and see the impact of extra payments.',
    keywords: 'student loan calculator, student loan repayment calculator, student loan payoff, student loan interest',
    fields: [
      { id: 'balance', label: 'Loan Balance ($)', val: 35000, min: 0 },
      { id: 'rate', label: 'Interest Rate (%)', val: 5.5, min: 0, max: 15 },
      { id: 'term', label: 'Repayment Term (years)', val: 10, min: 1, max: 30 },
      { id: 'extraPayment', label: 'Extra Monthly Payment ($)', val: 0, min: 0 },
    ],
    calc: `
      const months = term * 12;
      const mr = rate / 100 / 12;
      const stdPayment = mr > 0 ? balance * mr / (1 - Math.pow(1 + mr, -months)) : balance / months;
      const payment = stdPayment + extraPayment;
      let bal = balance; let totalInt = 0; let mo = 0;
      const rows = [];
      while (bal > 0.01 && mo < 600) {
        const interest = bal * mr;
        const princ = Math.min(bal, payment - interest);
        bal = Math.max(0, bal - princ);
        totalInt += interest;
        mo++;
        if (mo <= 6 || bal < 1 || mo % 12 === 0) rows.push('<tr><td>'+mo+'</td><td>$'+Math.round(interest).toLocaleString()+'</td><td>$'+Math.round(princ).toLocaleString()+'</td><td>$'+Math.round(bal).toLocaleString()+'</td></tr>');
      }
      const stdTotal = stdPayment * months;
      const saved = stdTotal - balance - totalInt;
      const yrs = Math.floor(mo/12); const mos = mo%12;
      document.getElementById('result').innerHTML = '<div class="res-cards"><div class="rc"><div class="rc-label">Monthly Payment</div><div class="rc-val">$'+Math.round(payment).toLocaleString()+'</div></div><div class="rc"><div class="rc-label">Payoff Time</div><div class="rc-val">'+(yrs>0?yrs+'y ':'')+ mos+'mo</div></div><div class="rc"><div class="rc-label">Total Interest</div><div class="rc-val">$'+Math.round(totalInt).toLocaleString()+'</div></div>'+(extraPayment>0?'<div class="rc"><div class="rc-label">Interest Saved</div><div class="rc-val" style="color:#22c55e">$'+Math.round(saved>0?saved:0).toLocaleString()+'</div></div>':'')+'</div><table class="data-table"><thead><tr><th>Month</th><th>Interest</th><th>Principal</th><th>Balance</th></tr></thead><tbody>'+rows.join('')+'</tbody></table>';
    `,
    article: `<h2>Student Loan Repayment Strategies</h2><p>The average student loan debt is $37,574. Standard repayment is 10 years, but adding just $50/month extra saves thousands in interest and shaves years off repayment. Federal loans offer income-driven plans (SAVE, IBR, PAYE) that cap payments at 10-20% of discretionary income.</p>`
  },
  {
    slug: 'savings-goal-calculator',
    title: 'Savings Goal Calculator — How Long to Save For Anything',
    h1: 'Savings Goal Calculator',
    desc: 'Calculate how long it takes to reach your savings goal, or how much to save monthly. Emergency fund, vacation, down payment calculator.',
    keywords: 'savings goal calculator, how long to save, savings calculator, emergency fund calculator',
    fields: [
      { id: 'goal', label: 'Savings Goal ($)', val: 50000, min: 0 },
      { id: 'currentSavings', label: 'Current Savings ($)', val: 5000, min: 0 },
      { id: 'monthlySave', label: 'Monthly Savings ($)', val: 1000, min: 0 },
      { id: 'rate', label: 'Savings Interest Rate (%)', val: 4.5, min: 0, max: 20 },
    ],
    calc: `
      const mr = rate / 100 / 12;
      let bal = currentSavings;
      let months = 0;
      while (bal < goal && months < 600) {
        bal = bal * (1 + mr) + monthlySave;
        months++;
      }
      const totalDeposited = currentSavings + monthlySave * months;
      const interestEarned = bal - totalDeposited;
      const yrs = Math.floor(months/12); const mo = months%12;
      // How much needed monthly to hit goal in specific timeframes
      const timeframes = [12, 24, 36, 60];
      let tfRows = '';
      for (const tf of timeframes) {
        const needed = mr > 0 ? (goal - currentSavings * Math.pow(1+mr,tf)) * mr / (Math.pow(1+mr,tf) - 1) : (goal - currentSavings) / tf;
        tfRows += '<tr><td>'+(tf/12)+' year'+(tf>12?'s':'')+'</td><td>$'+Math.round(Math.max(0,needed)).toLocaleString()+'/mo</td></tr>';
      }
      document.getElementById('result').innerHTML = '<div class="res-cards"><div class="rc"><div class="rc-label">Time to Goal</div><div class="rc-val">'+(yrs>0?yrs+'y ':'')+ mo+'mo</div></div><div class="rc"><div class="rc-label">Total Deposited</div><div class="rc-val">$'+Math.round(totalDeposited).toLocaleString()+'</div></div><div class="rc"><div class="rc-label">Interest Earned</div><div class="rc-val" style="color:#22c55e">$'+Math.round(interestEarned).toLocaleString()+'</div></div><div class="rc"><div class="rc-label">Final Balance</div><div class="rc-val">$'+Math.round(bal).toLocaleString()+'</div></div></div><h3 style="margin-top:1.5rem">Monthly Savings Needed by Timeframe</h3><table class="data-table"><thead><tr><th>Timeframe</th><th>Monthly Savings Needed</th></tr></thead><tbody>'+tfRows+'</tbody></table>';
    `,
    article: `<h2>Setting Savings Goals</h2><p>Whether it's an emergency fund (3-6 months expenses), a home down payment (20% of home price), or a dream vacation, having a specific target and timeline makes saving actionable. High-yield savings accounts now offer 4-5% APY, making your savings work harder.</p>`
  },
  {
    slug: 'home-affordability-calculator',
    title: 'Home Affordability Calculator 2026 — How Much House Can You Afford?',
    h1: 'Home Affordability Calculator',
    desc: 'Calculate how much house you can afford based on income, debts, down payment, and current mortgage rates. 2026 home buying calculator.',
    keywords: 'home affordability calculator, how much house can I afford, mortgage affordability calculator, home buying calculator 2026',
    fields: [
      { id: 'income', label: 'Annual Household Income ($)', val: 100000, min: 0 },
      { id: 'monthlyDebt', label: 'Monthly Debt Payments ($)', val: 500, min: 0 },
      { id: 'downPayment', label: 'Down Payment ($)', val: 60000, min: 0 },
      { id: 'mortgageRate', label: 'Mortgage Rate (%)', val: 6.5, min: 0, max: 15 },
      { id: 'loanTerm', label: 'Loan Term (years)', val: 30, min: 10, max: 30 },
      { id: 'propertyTax', label: 'Property Tax Rate (%)', val: 1.2, min: 0, max: 5 },
      { id: 'insurance', label: 'Monthly Insurance ($)', val: 150, min: 0 },
    ],
    calc: `
      const monthlyIncome = income / 12;
      const maxDTI = 0.36;
      const maxHousing = monthlyIncome * 0.28;
      const maxTotal = monthlyIncome * maxDTI - monthlyDebt;
      const maxPayment = Math.min(maxHousing, maxTotal);
      const mr = mortgageRate / 100 / 12;
      const n = loanTerm * 12;
      const monthlyTaxIns = insurance;
      const availForMortgage = maxPayment - monthlyTaxIns;
      const maxLoan = mr > 0 ? availForMortgage * (1 - Math.pow(1+mr, -n)) / mr : availForMortgage * n;
      // Adjust for property tax (iterative)
      let homePrice = maxLoan + downPayment;
      const monthlyPropTax = homePrice * (propertyTax / 100) / 12;
      const adjustedAvail = maxPayment - monthlyTaxIns - monthlyPropTax;
      const adjLoan = mr > 0 ? adjustedAvail * (1 - Math.pow(1+mr, -n)) / mr : adjustedAvail * n;
      homePrice = adjLoan + downPayment;
      const monthlyMortgage = mr > 0 ? adjLoan * mr / (1 - Math.pow(1+mr, -n)) : adjLoan / n;
      const totalPayment = monthlyMortgage + homePrice*(propertyTax/100)/12 + insurance;
      document.getElementById('result').innerHTML = '<div class="res-cards"><div class="rc"><div class="rc-label">Home You Can Afford</div><div class="rc-val" style="color:#22c55e">$'+Math.round(homePrice).toLocaleString()+'</div></div><div class="rc"><div class="rc-label">Monthly Payment</div><div class="rc-val">$'+Math.round(totalPayment).toLocaleString()+'</div></div><div class="rc"><div class="rc-label">Loan Amount</div><div class="rc-val">$'+Math.round(adjLoan).toLocaleString()+'</div></div><div class="rc"><div class="rc-label">Down Payment</div><div class="rc-val">$'+downPayment.toLocaleString()+' ('+(downPayment/homePrice*100).toFixed(1)+'%)</div></div></div><div style="margin-top:1.5rem;padding:1rem;background:var(--s2);border-radius:8px"><h3>Monthly Payment Breakdown</h3><p style="color:var(--m);margin-top:.5rem">Mortgage (P&I): $'+Math.round(monthlyMortgage).toLocaleString()+'</p><p style="color:var(--m)">Property Tax: $'+Math.round(homePrice*(propertyTax/100)/12).toLocaleString()+'</p><p style="color:var(--m)">Insurance: $'+insurance.toLocaleString()+'</p><p style="margin-top:.5rem;color:var(--a)">Housing ratio: '+(totalPayment/monthlyIncome*100).toFixed(1)+'% of income (recommended: ≤28%)</p><p style="color:var(--a)">Total DTI: '+((totalPayment+monthlyDebt)/monthlyIncome*100).toFixed(1)+'% (recommended: ≤36%)</p></div>';
    `,
    article: `<h2>How Much House Can You Afford?</h2><p>Lenders use two key ratios: the 28% rule (housing costs ≤28% of gross income) and the 36% rule (total debt ≤36%). With a $100K income and 6.5% rate, you can typically afford a $350-400K home. But "can afford" and "should buy" are different — many financial advisors recommend keeping housing costs to 25% of take-home pay.</p><h2>2026 Housing Market</h2><p>Mortgage rates have stabilized around 6-7%. With home prices averaging $420K nationally, affordability remains challenging. Strategies: larger down payment, shorter loan terms, buying in lower-cost markets, or considering adjustable-rate mortgages if you plan to move within 5-7 years.</p>`
  }
];

// Generate HTML pages
const template = (c) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${c.title}</title>
<meta name="description" content="${c.desc}">
<meta name="keywords" content="${c.keywords}">
<link rel="canonical" href="https://alexchalu.github.io/toolpulse/invest/${c.slug}.html">
<meta property="og:title" content="${c.title}">
<meta property="og:description" content="${c.desc}">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3112605892426625" crossorigin="anonymous"></script>
<style>
:root{--bg:#0a0e1a;--s:#111827;--s2:#1f2937;--b:#374151;--t:#f3f4f6;--m:#9ca3af;--a:#6366f1;--a2:#4f46e5;--g:rgba(99,102,241,.08)}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:var(--bg);color:var(--t);line-height:1.6}
header{background:var(--s);border-bottom:1px solid var(--b);padding:1rem 1.5rem;position:sticky;top:0;z-index:100}
.hi{max-width:900px;margin:0 auto;display:flex;align-items:center;gap:1rem}
.logo{font-size:1.3rem;font-weight:800;color:var(--a);text-decoration:none}
.back{color:var(--m);text-decoration:none;font-size:.9rem}
.back:hover{color:var(--a)}
main{max-width:900px;margin:0 auto;padding:2rem 1.5rem}
h1{font-size:2rem;font-weight:900;margin-bottom:.5rem;background:linear-gradient(135deg,#f3f4f6,#6366f1);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.subtitle{color:var(--m);margin-bottom:2rem;font-size:1rem}
.calc-grid{display:grid;grid-template-columns:1fr 1fr;gap:.75rem;margin-bottom:1.5rem}
.field{display:flex;flex-direction:column;gap:.25rem}
.field label{font-size:.85rem;color:var(--m);font-weight:500}
.field input{padding:.6rem .75rem;background:var(--s2);border:1px solid var(--b);border-radius:8px;color:var(--t);font-size:1rem;outline:none}
.field input:focus{border-color:var(--a)}
.btn{background:var(--a);color:#fff;border:none;padding:.75rem 2rem;border-radius:8px;font-size:1rem;font-weight:700;cursor:pointer;width:100%;margin:1rem 0}
.btn:hover{background:var(--a2)}
#result{margin-top:1.5rem}
.res-cards{display:grid;grid-template-columns:1fr 1fr;gap:.75rem}
.rc{background:var(--s);border:1px solid var(--b);border-radius:10px;padding:1rem;text-align:center}
.rc-label{font-size:.8rem;color:var(--m);margin-bottom:.25rem}
.rc-val{font-size:1.4rem;font-weight:800;color:var(--t)}
.data-table{width:100%;border-collapse:collapse;margin-top:1rem;font-size:.85rem}
.data-table th,.data-table td{padding:.5rem;text-align:right;border-bottom:1px solid var(--b)}
.data-table th{color:var(--m);font-weight:600;text-align:right}
.data-table td:first-child,.data-table th:first-child{text-align:left}
.ad{margin:2rem 0;text-align:center;min-height:90px}
article{margin-top:3rem;padding-top:2rem;border-top:1px solid var(--b)}
article h2{font-size:1.3rem;margin:1.5rem 0 .75rem;color:var(--t)}
article p{color:var(--m);margin-bottom:1rem;line-height:1.7}
article ul{color:var(--m);margin:0 0 1rem 1.5rem}
article li{margin-bottom:.5rem}
.related{margin-top:3rem;padding-top:2rem;border-top:1px solid var(--b)}
.related h3{margin-bottom:1rem}
.rel-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:.75rem}
.rel-card{background:var(--s);border:1px solid var(--b);border-radius:8px;padding:.75rem 1rem;text-decoration:none;color:var(--t);font-size:.9rem;font-weight:600}
.rel-card:hover{border-color:var(--a)}
footer{text-align:center;padding:2rem 1.5rem;color:var(--m);font-size:.8rem;border-top:1px solid var(--b);margin-top:3rem}
footer a{color:var(--a);text-decoration:none}
@media(max-width:600px){.calc-grid,.res-cards{grid-template-columns:1fr}h1{font-size:1.5rem}}
</style>
</head>
<body>
<header><div class="hi">
<a href="../index.html" class="logo">🔧 ToolPulse</a>
<a href="../index.html" class="back">← All Tools</a>
</div></header>
<main>
<h1>${c.h1}</h1>
<p class="subtitle">${c.desc}</p>
<div class="ad"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3112605892426625" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div>
<div class="calc-grid">
${c.fields.map(f => `<div class="field"><label for="${f.id}">${f.label}</label><input type="number" id="${f.id}" value="${f.val}"${f.min !== undefined ? ' min="'+f.min+'"' : ''}${f.max !== undefined ? ' max="'+f.max+'"' : ''}></div>`).join('\n')}
</div>
<button class="btn" onclick="calculate()">Calculate</button>
<div id="result"></div>
<div class="ad"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3112605892426625" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div>
<article>${c.article}</article>
<div class="related"><h3>Related Calculators</h3><div class="rel-grid">
${calcs.filter(x=>x.slug!==c.slug).slice(0,5).map(x=>`<a href="${x.slug}.html" class="rel-card">${x.h1}</a>`).join('\n')}
</div></div>
<div class="ad"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3112605892426625" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div>
</main>
<footer>
<p>&copy; 2026 ToolPulse. Free online calculators and tools.</p>
<p><a href="../index.html">All Tools</a> | <a href="../blog/">Blog</a></p>
</footer>
<script>
function gv(id){return parseFloat(document.getElementById(id).value)||0}
function calculate(){
${c.fields.map(f => `const ${f.id}=gv('${f.id}');`).join('\n')}
${c.calc}
}
calculate();
</script>
</body>
</html>`;

// Generate index page for /invest/
const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Investment & Retirement Calculators — ToolPulse</title>
<meta name="description" content="Free investment, retirement, and financial planning calculators. 401k, Roth IRA, compound interest, debt payoff, home affordability, and more.">
<link rel="canonical" href="https://alexchalu.github.io/toolpulse/invest/">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3112605892426625" crossorigin="anonymous"></script>
<style>
:root{--bg:#0a0e1a;--s:#111827;--s2:#1f2937;--b:#374151;--t:#f3f4f6;--m:#9ca3af;--a:#6366f1;--g:rgba(99,102,241,.08)}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:var(--bg);color:var(--t);line-height:1.6}
header{background:var(--s);border-bottom:1px solid var(--b);padding:1rem 1.5rem;position:sticky;top:0;z-index:100}
.hi{max-width:900px;margin:0 auto;display:flex;align-items:center;gap:1rem}
.logo{font-size:1.3rem;font-weight:800;color:var(--a);text-decoration:none}
.back{color:var(--m);text-decoration:none;font-size:.9rem}
main{max-width:900px;margin:0 auto;padding:2rem 1.5rem}
h1{font-size:2rem;font-weight:900;margin-bottom:.5rem;background:linear-gradient(135deg,#f3f4f6,#6366f1);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
p.sub{color:var(--m);margin-bottom:2rem}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:1rem}
.card{background:var(--s);border:1px solid var(--b);border-radius:12px;padding:1.5rem;text-decoration:none;color:var(--t);transition:all .2s}
.card:hover{border-color:var(--a);transform:translateY(-2px);background:var(--g)}
.card h2{font-size:1.1rem;margin-bottom:.5rem}
.card p{color:var(--m);font-size:.85rem}
.ad{margin:2rem 0;text-align:center}
footer{text-align:center;padding:2rem;color:var(--m);font-size:.8rem;border-top:1px solid var(--b);margin-top:3rem}
footer a{color:var(--a);text-decoration:none}
</style>
</head>
<body>
<header><div class="hi"><a href="../index.html" class="logo">🔧 ToolPulse</a><a href="../index.html" class="back">← All Tools</a></div></header>
<main>
<h1>💰 Investment & Retirement Calculators</h1>
<p class="sub">Free financial calculators for retirement planning, investment returns, debt payoff, and more.</p>
<div class="ad"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3112605892426625" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div>
<div class="grid">
${calcs.map(c => `<a href="${c.slug}.html" class="card"><h2>${c.h1}</h2><p>${c.desc}</p></a>`).join('\n')}
</div>
<div class="ad"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3112605892426625" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div>
</main>
<footer><p>&copy; 2026 ToolPulse</p><p><a href="../index.html">All Tools</a> | <a href="../blog/">Blog</a></p></footer>
</body>
</html>`;

// Write all files
for (const c of calcs) {
  fs.writeFileSync(path.join(outDir, c.slug + '.html'), template(c));
}
fs.writeFileSync(path.join(outDir, 'index.html'), indexHtml);
console.log('Generated ' + calcs.length + ' investment calculators + index');
console.log('Files: ' + calcs.map(c => c.slug + '.html').join(', '));
