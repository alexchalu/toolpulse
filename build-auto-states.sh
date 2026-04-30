#!/bin/bash
cd /data/workspace/healthcalcs/auto

# Remaining 25 states with data
declare -A STATE_DATA
# Format: "Full Name|Abbrev|AvgPremium|MinCoverage|MonthlyAvg|PenaltyInfo"
STATE_DATA[alabama]="Alabama|AL|1,950|25/50/25|163|Fines up to $500, license suspension, and SR-22 requirement"
STATE_DATA[alaska]="Alaska|AK|1,520|50/100/25|127|Fines up to $500 and license/registration suspension"
STATE_DATA[arkansas]="Arkansas|AR|2,080|25/50/25|173|Fines up to $1,000, license suspension, and vehicle impoundment"
STATE_DATA[delaware]="Delaware|DE|1,890|25/50/10|158|Fines up to $1,500, license suspension, and registration revocation"
STATE_DATA[hawaii]="Hawaii|HI|1,340|20/40/10|112|Fines up to $5,000 and license suspension"
STATE_DATA[idaho]="Idaho|ID|1,280|25/50/15|107|Fines up to $1,000 and license/registration suspension"
STATE_DATA[iowa]="Iowa|IA|1,410|20/40/15|118|Fines up to $1,000, license suspension, and vehicle impoundment"
STATE_DATA[kansas]="Kansas|KS|1,680|25/50/25|140|Fines up to $1,000, license suspension, and SR-22 requirement"
STATE_DATA[kentucky]="Kentucky|KY|2,240|25/50/25|187|Fines up to $1,000, license suspension, and vehicle registration revocation"
STATE_DATA[louisiana]="Louisiana|LA|2,890|15/30/25|241|Fines up to $1,000, license suspension, and vehicle impoundment"
STATE_DATA[maine]="Maine|ME|1,120|50/100/25|93|Fines up to $500, license suspension, and registration revocation"
STATE_DATA[mississippi]="Mississippi|MS|1,960|25/50/25|163|Fines up to $1,000, license suspension, and vehicle impoundment"
STATE_DATA[montana]="Montana|MT|1,540|25/50/20|128|Fines up to $500, license suspension, and SR-22 requirement"
STATE_DATA[nebraska]="Nebraska|NE|1,580|25/50/25|132|Fines up to $500, license/registration suspension"
STATE_DATA[new-hampshire]="New Hampshire|NH|1,290|25/50/25|108|Financial responsibility required if in an accident — potential license suspension"
STATE_DATA[new-mexico]="New Mexico|NM|1,720|25/50/10|143|Fines up to $1,000, license suspension, and community service"
STATE_DATA[north-dakota]="North Dakota|ND|1,310|25/50/25|109|Fines up to $500 and license/registration suspension"
STATE_DATA[oklahoma]="Oklahoma|OK|2,150|25/50/25|179|Fines up to $1,000, license suspension, and vehicle impoundment"
STATE_DATA[rhode-island]="Rhode Island|RI|2,010|25/50/25|168|Fines up to $500, license suspension, and community service"
STATE_DATA[south-dakota]="South Dakota|SD|1,350|25/50/25|113|Fines up to $500 and license/registration suspension"
STATE_DATA[utah]="Utah|UT|1,610|25/65/15|134|Fines up to $1,000, license/registration suspension"
STATE_DATA[vermont]="Vermont|VT|1,180|25/50/10|98|Fines up to $500 and license/registration suspension"
STATE_DATA[west-virginia]="West Virginia|WV|1,780|25/50/25|148|Fines up to $200, license suspension, and registration revocation"
STATE_DATA[wisconsin]="Wisconsin|WI|1,340|25/50/10|112|Fines up to $500 and license/registration suspension"
STATE_DATA[wyoming]="Wyoming|WY|1,420|25/50/20|118|Fines up to $750 and license/registration suspension"

for state_slug in "${!STATE_DATA[@]}"; do
  IFS='|' read -r full_name abbrev avg_premium min_coverage monthly_avg penalty_info <<< "${STATE_DATA[$state_slug]}"
  
  cat > "${state_slug}-auto-insurance.html" << ENDOFHTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${full_name} Auto Insurance Calculator 2026 - Free Car Insurance Estimate</title>
    <meta name="description" content="Calculate car insurance costs in ${full_name}. Free ${abbrev} auto insurance calculator with coverage options, discounts, and quotes.">
    <meta name="keywords" content="${full_name} auto insurance, ${abbrev} car insurance calculator, ${full_name} car insurance cost, cheap car insurance ${abbrev}">
    <link rel="stylesheet" href="/style.css">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3112605892426625" crossorigin="anonymous"></script>
    <style>
      .auto-container { max-width: 900px; margin: 2rem auto; padding: 0 2rem; }
      .calc-card { background: white; border-radius: 12px; padding: 2rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin: 2rem 0; }
      .input-group { margin: 1.5rem 0; }
      .input-group label { display: block; font-weight: 600; margin-bottom: 0.5rem; color: #34495e; }
      .input-group input, .input-group select { width: 100%; padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 6px; font-size: 1rem; }
      .calc-button { background: #e74c3c; color: white; border: none; padding: 1rem 2rem; border-radius: 6px; font-size: 1.1rem; font-weight: 600; cursor: pointer; width: 100%; margin-top: 1rem; }
      .calc-button:hover { background: #c0392b; }
      .result-box { background: #e8f5e9; border-left: 4px solid #4caf50; padding: 2rem; margin: 2rem 0; border-radius: 6px; display: none; }
      .result-value { font-size: 2.5rem; font-weight: bold; color: #1b5e20; margin: 1rem 0; }
      .coverage-table { width: 100%; margin: 1.5rem 0; border-collapse: collapse; }
      .coverage-table th, .coverage-table td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e0e0e0; }
      .coverage-table th { background: #f8f9fa; font-weight: 600; }
      .ad-container { margin: 2rem 0; text-align: center; min-height: 90px; }
      .info-box { background: #fff3e0; border-left: 4px solid #ff9800; padding: 1.5rem; margin: 2rem 0; border-radius: 6px; }
      .stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 2rem 0; }
      .stat-card { background: #f8f9fa; padding: 1.5rem; border-radius: 8px; text-align: center; }
      .stat-card .value { font-size: 1.8rem; font-weight: bold; color: #e74c3c; }
    </style>
</head>
<body>
    <div class="auto-container">
        <h1>🚗 ${full_name} Auto Insurance Calculator</h1>
        <p>Calculate car insurance costs in ${full_name} (${abbrev}). Get estimated premiums based on coverage, vehicle, and driver profile.</p>

        <div class="ad-container">
            <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3112605892426625" data-ad-slot="1234567890" data-ad-format="auto" data-full-width-responsive="true"></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        </div>

        <div class="stat-grid">
            <div class="stat-card">
                <div class="value">\$${avg_premium}</div>
                <div>Avg. ${abbrev} Premium/Year</div>
            </div>
            <div class="stat-card">
                <div class="value">${min_coverage}</div>
                <div>Min. Coverage Required</div>
            </div>
            <div class="stat-card">
                <div class="value">\$${monthly_avg}</div>
                <div>Avg. Monthly Payment</div>
            </div>
        </div>

        <div class="calc-card">
            <h2>Calculate Your ${abbrev} Auto Insurance Cost</h2>
            
            <div class="input-group">
                <label>Your Age</label>
                <select id="age">
                    <option value="18">18-24</option>
                    <option value="30" selected>25-35</option>
                    <option value="40">36-50</option>
                    <option value="55">51-65</option>
                    <option value="70">65+</option>
                </select>
            </div>

            <div class="input-group">
                <label>Driving Record</label>
                <select id="record">
                    <option value="clean" selected>Clean (no tickets/accidents)</option>
                    <option value="ticket">1 ticket in past 3 years</option>
                    <option value="accident">1 accident in past 3 years</option>
                    <option value="multiple">Multiple tickets/accidents</option>
                </select>
            </div>

            <div class="input-group">
                <label>Coverage Level</label>
                <select id="coverage">
                    <option value="minimum">Minimum Required (${min_coverage})</option>
                    <option value="basic">Basic (50/100/50)</option>
                    <option value="standard" selected>Standard (100/300/100)</option>
                    <option value="full">Full Coverage (250/500/100 + Comp/Coll)</option>
                </select>
            </div>

            <div class="input-group">
                <label>Vehicle Type</label>
                <select id="vehicle">
                    <option value="sedan" selected>Sedan</option>
                    <option value="suv">SUV/Truck</option>
                    <option value="sports">Sports Car</option>
                    <option value="luxury">Luxury Vehicle</option>
                </select>
            </div>

            <div class="input-group">
                <label>Annual Mileage</label>
                <select id="mileage">
                    <option value="low">Under 7,500 miles</option>
                    <option value="medium" selected>7,500-15,000 miles</option>
                    <option value="high">Over 15,000 miles</option>
                </select>
            </div>

            <button class="calc-button" onclick="calculate()">Calculate Insurance Cost</button>

            <div id="results" class="result-box">
                <h3>Your Estimated ${abbrev} Auto Insurance Cost</h3>
                <div class="result-value" id="annualPremium"></div>
                <p id="monthlyPremium"></p>
                
                <table class="coverage-table">
                    <tr>
                        <th>Coverage Component</th>
                        <th>Estimated Cost</th>
                    </tr>
                    <tbody id="coverageBreakdown"></tbody>
                </table>
            </div>
        </div>

        <div class="ad-container">
            <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3112605892426625" data-ad-slot="1234567890" data-ad-format="auto" data-full-width-responsive="true"></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        </div>

        <div class="info-box">
            <h3>${full_name} Auto Insurance Requirements</h3>
            <p><strong>Minimum Coverage:</strong> ${min_coverage} (Bodily Injury per person / per accident / Property Damage)</p>
            <p><strong>Average Premium:</strong> \$${avg_premium}/year (\$${monthly_avg}/month)</p>
            <p><strong>Penalties:</strong> Driving without insurance in ${full_name} can result in ${penalty_info}.</p>
        </div>

        <h2>How to Lower Your ${full_name} Car Insurance</h2>
        <ul>
            <li><strong>Shop around:</strong> Get quotes from 3-5 insurance companies - rates vary by 50%+</li>
            <li><strong>Increase deductible:</strong> Raising from \$500 to \$1,000 can save 15-30%</li>
            <li><strong>Bundle policies:</strong> Combine auto + home insurance for 10-25% discount</li>
            <li><strong>Good driver discount:</strong> 3+ years accident-free = 10-20% savings</li>
            <li><strong>Safety features:</strong> Anti-theft, airbags, ABS = 5-15% discount</li>
            <li><strong>Low mileage:</strong> Under 7,500 miles/year = 5-10% savings</li>
        </ul>

        <div class="ad-container">
            <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3112605892426625" data-ad-slot="1234567890" data-ad-format="auto" data-full-width-responsive="true"></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        </div>

        <h2>Related Insurance Calculators</h2>
        <ul>
            <li><a href="/car-insurance.html">General Car Insurance Calculator</a></li>
            <li><a href="/home-insurance.html">Home Insurance Calculator</a></li>
            <li><a href="/auto/">All State Auto Insurance Calculators</a></li>
            <li><a href="/">All Calculators</a></li>
        </ul>

        <p><a href="/">← Back to HealthCalcs</a></p>
    </div>

    <script>
    function calculate() {
        const age = parseInt(document.getElementById('age').value);
        const record = document.getElementById('record').value;
        const coverage = document.getElementById('coverage').value;
        const vehicle = document.getElementById('vehicle').value;
        const mileage = document.getElementById('mileage').value;

        let basePremium = ${avg_premium//,/};

        if (age === 18) basePremium *= 1.8;
        else if (age === 70) basePremium *= 1.2;
        else if (age === 55) basePremium *= 0.85;

        const recordMultipliers = { clean: 1, ticket: 1.15, accident: 1.3, multiple: 1.6 };
        basePremium *= recordMultipliers[record];

        const coverageMultipliers = { minimum: 0.6, basic: 0.85, standard: 1, full: 1.8 };
        basePremium *= coverageMultipliers[coverage];

        const vehicleMultipliers = { sedan: 1, suv: 1.1, sports: 1.5, luxury: 1.4 };
        basePremium *= vehicleMultipliers[vehicle];

        const mileageMultipliers = { low: 0.9, medium: 1, high: 1.15 };
        basePremium *= mileageMultipliers[mileage];

        const annualPremium = Math.round(basePremium);
        const monthlyPremium = Math.round(basePremium / 12);

        const liability = Math.round(annualPremium * 0.35);
        const collision = coverage === 'full' ? Math.round(annualPremium * 0.30) : 0;
        const comprehensive = coverage === 'full' ? Math.round(annualPremium * 0.20) : 0;
        const uninsured = Math.round(annualPremium * 0.10);
        const pip = Math.round(annualPremium * 0.05);

        document.getElementById('annualPremium').textContent = '\$' + annualPremium.toLocaleString() + '/year';
        document.getElementById('monthlyPremium').textContent = 'Monthly payment: \$' + monthlyPremium.toLocaleString();
        
        let breakdown = '<tr><td>Liability Coverage</td><td>\$' + liability.toLocaleString() + '</td></tr>';
        if (collision > 0) breakdown += '<tr><td>Collision Coverage</td><td>\$' + collision.toLocaleString() + '</td></tr>';
        if (comprehensive > 0) breakdown += '<tr><td>Comprehensive Coverage</td><td>\$' + comprehensive.toLocaleString() + '</td></tr>';
        breakdown += '<tr><td>Uninsured Motorist</td><td>\$' + uninsured.toLocaleString() + '</td></tr>';
        breakdown += '<tr><td>Personal Injury Protection</td><td>\$' + pip.toLocaleString() + '</td></tr>';
        
        document.getElementById('coverageBreakdown').innerHTML = breakdown;
        document.getElementById('results').style.display = 'block';
        document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
    }
    </script>
</body>
</html>
ENDOFHTML

  echo "Created ${state_slug}-auto-insurance.html"
done

echo "Done! All 25 remaining states created."
