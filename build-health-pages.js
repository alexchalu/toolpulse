const fs = require('fs');
const path = '/data/workspace/healthcalcs-build';

const adSlot = `<div class="ad-slot"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3112605892426625" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div>`;

const footer = `<footer><p><a href="index.html">HealthCalcs</a> — Free Health Calculators</p><p style="margin-top:8px"><a href="https://alexchalu.github.io/toolpulse/">ToolPulse</a> · <a href="https://alexchalu.github.io/smartcalc/">SmartCalc</a> · <a href="https://alexchalu.github.io/writefast/">WriteFast</a></p></footer>`;

const relatedLinks = `<div class="related"><h3>More Calculators</h3><div class="related-grid"><a href="bmi-calculator.html">BMI Calculator</a><a href="calorie-calculator.html">Calorie Calculator</a><a href="blood-pressure-checker.html">Blood Pressure Checker</a><a href="heart-rate-zones.html">Heart Rate Zones</a><a href="ideal-weight-calculator.html">Ideal Weight</a><a href="bmr-calculator.html">BMR Calculator</a></div></div>`;

function makeHead(title, desc, keywords, canonical) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} | HealthCalcs</title><meta name="description" content="${desc}"><meta name="keywords" content="${keywords}"><link rel="canonical" href="https://alexchalu.github.io/healthcalcs/${canonical}"><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3112605892426625" crossorigin="anonymous"></script><script type="application/ld+json">{"@context":"https://schema.org","@type":"WebApplication","name":"${title}","url":"https://alexchalu.github.io/healthcalcs/${canonical}","description":"${desc}","applicationCategory":"HealthApplication","operatingSystem":"All","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}</script>`;
}

const styles = `<style>*{margin:0;padding:0;box-sizing:border-box}:root{--bg:#0c1222;--surface:#162032;--border:#1e3a5f;--text:#e2e8f0;--muted:#8899aa;--accent:#10b981;--accent2:#06b6d4}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:var(--bg);color:var(--text);line-height:1.6}.container{max-width:900px;margin:0 auto;padding:20px}header{text-align:center;padding:30px 0;border-bottom:1px solid var(--border)}header h1{font-size:1.9em;margin-bottom:8px;background:linear-gradient(135deg,var(--accent),var(--accent2));-webkit-background-clip:text;-webkit-text-fill-color:transparent}header p{color:var(--muted);font-size:1.05em}.logo-link{text-decoration:none;color:var(--muted);font-size:0.9em;display:inline-block;margin-bottom:10px}.content{margin:24px 0}h2{color:var(--accent);margin:28px 0 12px;font-size:1.4em}h3{color:var(--accent2);margin:20px 0 10px;font-size:1.15em}p{margin:10px 0;line-height:1.8;color:var(--text)}table{width:100%;border-collapse:collapse;margin:16px 0;background:var(--surface);border-radius:8px;overflow:hidden}th{background:rgba(16,185,129,0.15);color:var(--accent);padding:12px 16px;text-align:left;font-weight:600;font-size:0.9em}td{padding:10px 16px;border-bottom:1px solid var(--border);font-size:0.95em}tr:last-child td{border-bottom:none}tr:hover td{background:rgba(16,185,129,0.05)}.highlight{background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);border-radius:8px;padding:16px;margin:16px 0}.warning{background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);border-radius:8px;padding:16px;margin:16px 0}.tip{background:rgba(6,182,212,0.1);border:1px solid rgba(6,182,212,0.3);border-radius:8px;padding:16px;margin:16px 0}ul,ol{margin:12px 0 12px 24px}li{margin:6px 0;line-height:1.7}.ad-slot{margin:20px 0;min-height:90px;text-align:center}.related{margin:40px 0}.related h3{margin-bottom:16px;color:var(--muted)}.related-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px}.related-grid a{display:block;padding:14px;background:var(--surface);border:1px solid var(--border);border-radius:8px;text-decoration:none;color:var(--text);transition:all .2s}.related-grid a:hover{border-color:var(--accent);transform:translateY(-2px)}.disclaimer{color:var(--muted);font-size:0.8em;text-align:center;margin:20px 0;padding:16px;border:1px solid var(--border);border-radius:8px}footer{text-align:center;padding:40px 0;color:var(--muted);border-top:1px solid var(--border);margin-top:40px}footer a{color:var(--accent);text-decoration:none}.faq{margin:30px 0}.faq details{background:var(--surface);border:1px solid var(--border);border-radius:8px;margin:8px 0;padding:16px}.faq summary{cursor:pointer;font-weight:600;color:var(--accent)}@media(max-width:600px){.container{padding:12px}header h1{font-size:1.5em}table{font-size:0.85em}th,td{padding:8px}}</style>`;

const pages = [
  {
    file: 'blood-pressure-chart.html',
    title: 'Blood Pressure Chart by Age — Normal Ranges',
    desc: 'Complete blood pressure chart by age. Learn normal, elevated, and high blood pressure ranges for adults, children, and seniors.',
    keywords: 'blood pressure chart, normal blood pressure by age, bp chart, blood pressure ranges',
    body: `<h2>Blood Pressure Chart by Age</h2>
<p>Blood pressure is measured in millimeters of mercury (mmHg) with two numbers: systolic (when the heart beats) over diastolic (when the heart rests). Here are the normal ranges by age group.</p>
<table><thead><tr><th>Age Group</th><th>Normal Systolic (mmHg)</th><th>Normal Diastolic (mmHg)</th><th>Category</th></tr></thead><tbody>
<tr><td>Newborn (0-1 month)</td><td>60-90</td><td>20-60</td><td>Normal</td></tr>
<tr><td>Infant (1-12 months)</td><td>87-105</td><td>53-66</td><td>Normal</td></tr>
<tr><td>Toddler (1-5 years)</td><td>95-110</td><td>53-69</td><td>Normal</td></tr>
<tr><td>Child (6-13 years)</td><td>97-112</td><td>57-71</td><td>Normal</td></tr>
<tr><td>Adolescent (14-18)</td><td>112-128</td><td>66-80</td><td>Normal</td></tr>
<tr><td>Young Adult (19-40)</td><td>95-135</td><td>60-80</td><td>Normal</td></tr>
<tr><td>Middle Age (41-60)</td><td>110-145</td><td>70-90</td><td>Normal</td></tr>
<tr><td>Senior (61+)</td><td>95-145</td><td>70-90</td><td>Normal</td></tr></tbody></table>

<h2>Blood Pressure Categories (Adults)</h2>
<table><thead><tr><th>Category</th><th>Systolic (mmHg)</th><th></th><th>Diastolic (mmHg)</th></tr></thead><tbody>
<tr><td>Normal</td><td>Less than 120</td><td>and</td><td>Less than 80</td></tr>
<tr><td>Elevated</td><td>120-129</td><td>and</td><td>Less than 80</td></tr>
<tr><td>High BP Stage 1</td><td>130-139</td><td>or</td><td>80-89</td></tr>
<tr><td>High BP Stage 2</td><td>140+</td><td>or</td><td>90+</td></tr>
<tr><td>Hypertensive Crisis</td><td>180+</td><td>and/or</td><td>120+</td></tr></tbody></table>

<div class="highlight"><strong>💡 Key Takeaway:</strong> A normal blood pressure reading is below 120/80 mmHg. Readings consistently above 130/80 mmHg are considered high blood pressure (hypertension) and may need medical attention.</div>

<h2>What Affects Blood Pressure?</h2>
<ul>
<li><strong>Age:</strong> Blood pressure naturally increases with age as arteries become stiffer</li>
<li><strong>Weight:</strong> Being overweight increases strain on the heart</li>
<li><strong>Diet:</strong> High sodium intake raises blood pressure; potassium helps lower it</li>
<li><strong>Exercise:</strong> Regular physical activity helps maintain healthy levels</li>
<li><strong>Stress:</strong> Chronic stress contributes to elevated readings</li>
<li><strong>Genetics:</strong> Family history plays a significant role</li>
<li><strong>Smoking:</strong> Raises blood pressure and damages blood vessels</li>
<li><strong>Alcohol:</strong> Excessive drinking increases blood pressure</li>
</ul>

<h2>How to Lower Blood Pressure Naturally</h2>
<ol>
<li>Reduce sodium intake to under 2,300 mg/day (ideally 1,500 mg)</li>
<li>Exercise at least 150 minutes per week (brisk walking counts)</li>
<li>Maintain a healthy weight (even losing 5-10 lbs helps)</li>
<li>Follow the DASH diet (fruits, vegetables, whole grains, lean protein)</li>
<li>Limit alcohol to 1 drink/day for women, 2 for men</li>
<li>Manage stress through meditation, deep breathing, or yoga</li>
<li>Quit smoking</li>
<li>Monitor your blood pressure at home regularly</li>
</ol>`
  },
  {
    file: 'bmi-chart.html',
    title: 'BMI Chart — Body Mass Index Table for Adults',
    desc: 'Complete BMI chart and table. Find your BMI by height and weight. Includes BMI ranges for underweight, normal, overweight, and obese.',
    keywords: 'bmi chart, bmi table, body mass index chart, bmi by height and weight',
    body: `<h2>BMI Table — Find Your BMI by Height and Weight</h2>
<p>Use this BMI chart to quickly find your Body Mass Index. Find your height on the left, then read across to your weight. The number where they meet is your BMI.</p>
<div style="overflow-x:auto"><table><thead><tr><th>Height</th><th>100 lb</th><th>120 lb</th><th>140 lb</th><th>160 lb</th><th>180 lb</th><th>200 lb</th><th>220 lb</th><th>240 lb</th><th>260 lb</th></tr></thead><tbody>
<tr><td>4'10"</td><td>20.9</td><td>25.1</td><td>29.3</td><td>33.5</td><td>37.7</td><td>41.8</td><td>46.0</td><td>50.2</td><td>54.4</td></tr>
<tr><td>5'0"</td><td>19.5</td><td>23.4</td><td>27.3</td><td>31.2</td><td>35.2</td><td>39.1</td><td>43.0</td><td>46.9</td><td>50.8</td></tr>
<tr><td>5'2"</td><td>18.3</td><td>22.0</td><td>25.6</td><td>29.3</td><td>32.9</td><td>36.6</td><td>40.2</td><td>43.9</td><td>47.5</td></tr>
<tr><td>5'4"</td><td>17.2</td><td>20.6</td><td>24.0</td><td>27.5</td><td>30.9</td><td>34.3</td><td>37.8</td><td>41.2</td><td>44.6</td></tr>
<tr><td>5'6"</td><td>16.1</td><td>19.4</td><td>22.6</td><td>25.8</td><td>29.0</td><td>32.3</td><td>35.5</td><td>38.7</td><td>41.9</td></tr>
<tr><td>5'8"</td><td>15.2</td><td>18.2</td><td>21.3</td><td>24.3</td><td>27.4</td><td>30.4</td><td>33.4</td><td>36.5</td><td>39.5</td></tr>
<tr><td>5'10"</td><td>14.3</td><td>17.2</td><td>20.1</td><td>22.9</td><td>25.8</td><td>28.7</td><td>31.5</td><td>34.4</td><td>37.3</td></tr>
<tr><td>6'0"</td><td>13.6</td><td>16.3</td><td>19.0</td><td>21.7</td><td>24.4</td><td>27.1</td><td>29.8</td><td>32.6</td><td>35.3</td></tr>
<tr><td>6'2"</td><td>12.8</td><td>15.4</td><td>18.0</td><td>20.5</td><td>23.1</td><td>25.7</td><td>28.2</td><td>30.8</td><td>33.4</td></tr>
<tr><td>6'4"</td><td>12.2</td><td>14.6</td><td>17.0</td><td>19.5</td><td>21.9</td><td>24.3</td><td>26.7</td><td>29.2</td><td>31.6</td></tr></tbody></table></div>

<h2>BMI Categories</h2>
<table><thead><tr><th>BMI Range</th><th>Category</th><th>Health Risk</th></tr></thead><tbody>
<tr><td>Below 18.5</td><td>Underweight</td><td>Increased risk of nutritional deficiency</td></tr>
<tr><td>18.5 – 24.9</td><td>Normal Weight</td><td>Lowest health risk</td></tr>
<tr><td>25.0 – 29.9</td><td>Overweight</td><td>Moderate risk of health issues</td></tr>
<tr><td>30.0 – 34.9</td><td>Obese Class I</td><td>High risk</td></tr>
<tr><td>35.0 – 39.9</td><td>Obese Class II</td><td>Very high risk</td></tr>
<tr><td>40.0+</td><td>Obese Class III</td><td>Extremely high risk</td></tr></tbody></table>

<div class="tip"><strong>📊 Quick BMI Formula:</strong><br>BMI = (Weight in pounds × 703) ÷ (Height in inches)²<br>Or: BMI = Weight in kg ÷ (Height in meters)²</div>

<h2>BMI Limitations</h2>
<ul>
<li>Doesn't distinguish between muscle and fat (athletes may show high BMI)</li>
<li>Doesn't account for age, gender, or ethnicity differences</li>
<li>Doesn't measure body fat distribution (waist circumference matters too)</li>
<li>May underestimate health risks in older adults who've lost muscle mass</li>
</ul>
<p>For a more complete picture, combine BMI with <a href="waist-hip-ratio.html">waist-to-hip ratio</a>, <a href="body-fat-calculator.html">body fat percentage</a>, and <a href="ideal-weight-calculator.html">ideal weight calculations</a>.</p>`
  },
  {
    file: 'normal-heart-rate-chart.html',
    title: 'Normal Heart Rate by Age — Resting Heart Rate Chart',
    desc: 'Find normal resting heart rate by age. Complete chart for infants, children, teens, adults, and seniors. Plus target heart rate zones for exercise.',
    keywords: 'normal heart rate, resting heart rate by age, heart rate chart, average heart rate',
    body: `<h2>Normal Resting Heart Rate by Age</h2>
<p>Your resting heart rate (RHR) is the number of times your heart beats per minute while at rest. It's one of the simplest indicators of cardiovascular health.</p>
<table><thead><tr><th>Age Group</th><th>Normal Resting HR (bpm)</th><th>Average</th></tr></thead><tbody>
<tr><td>Newborn (0-1 month)</td><td>70-190</td><td>140</td></tr>
<tr><td>Infant (1-11 months)</td><td>80-160</td><td>130</td></tr>
<tr><td>Toddler (1-2 years)</td><td>80-130</td><td>110</td></tr>
<tr><td>Preschool (3-4 years)</td><td>80-120</td><td>100</td></tr>
<tr><td>School Age (5-6 years)</td><td>75-115</td><td>96</td></tr>
<tr><td>School Age (7-9 years)</td><td>70-110</td><td>90</td></tr>
<tr><td>Child (10-15 years)</td><td>60-100</td><td>80</td></tr>
<tr><td>Adult (18-65 years)</td><td>60-100</td><td>72</td></tr>
<tr><td>Senior (65+ years)</td><td>60-100</td><td>72</td></tr>
<tr><td>Well-trained athlete</td><td>40-60</td><td>50</td></tr></tbody></table>

<h2>What's a Good Resting Heart Rate?</h2>
<table><thead><tr><th>Resting HR (Adults)</th><th>Fitness Level</th></tr></thead><tbody>
<tr><td>Below 60 bpm</td><td>Excellent (athletic)</td></tr>
<tr><td>60-70 bpm</td><td>Good</td></tr>
<tr><td>70-80 bpm</td><td>Average</td></tr>
<tr><td>80-90 bpm</td><td>Below average</td></tr>
<tr><td>90-100 bpm</td><td>Poor — consider lifestyle changes</td></tr>
<tr><td>Above 100 bpm</td><td>Tachycardia — see a doctor</td></tr></tbody></table>

<div class="highlight"><strong>💡 Did You Know?</strong> Every 10 bpm reduction in resting heart rate is associated with a 15-20% lower risk of cardiovascular death. Regular aerobic exercise is the most effective way to lower your RHR.</div>

<h2>Target Heart Rate Zones for Exercise</h2>
<p>Maximum heart rate (MHR) is estimated as 220 minus your age.</p>
<table><thead><tr><th>Age</th><th>Max HR</th><th>Moderate (50-70%)</th><th>Vigorous (70-85%)</th></tr></thead><tbody>
<tr><td>20</td><td>200</td><td>100-140</td><td>140-170</td></tr>
<tr><td>25</td><td>195</td><td>98-137</td><td>137-166</td></tr>
<tr><td>30</td><td>190</td><td>95-133</td><td>133-162</td></tr>
<tr><td>35</td><td>185</td><td>93-130</td><td>130-157</td></tr>
<tr><td>40</td><td>180</td><td>90-126</td><td>126-153</td></tr>
<tr><td>45</td><td>175</td><td>88-123</td><td>123-149</td></tr>
<tr><td>50</td><td>170</td><td>85-119</td><td>119-145</td></tr>
<tr><td>55</td><td>165</td><td>83-116</td><td>116-140</td></tr>
<tr><td>60</td><td>160</td><td>80-112</td><td>112-136</td></tr>
<tr><td>65</td><td>155</td><td>78-109</td><td>109-132</td></tr>
<tr><td>70</td><td>150</td><td>75-105</td><td>105-128</td></tr></tbody></table>

<h2>How to Lower Your Resting Heart Rate</h2>
<ol>
<li><strong>Exercise regularly</strong> — 30+ minutes of cardio, 5 days/week</li>
<li><strong>Stay hydrated</strong> — dehydration makes the heart work harder</li>
<li><strong>Manage stress</strong> — meditation, deep breathing, yoga</li>
<li><strong>Sleep well</strong> — aim for 7-9 hours per night</li>
<li><strong>Limit caffeine</strong> — especially after noon</li>
<li><strong>Quit smoking</strong> — smoking raises resting HR significantly</li>
<li><strong>Maintain healthy weight</strong> — excess weight strains the heart</li>
</ol>

<h2>When to See a Doctor</h2>
<div class="warning"><strong>⚠️ Seek medical attention if:</strong>
<ul>
<li>Resting heart rate consistently above 100 bpm</li>
<li>Resting heart rate below 60 bpm with symptoms (dizziness, fatigue)</li>
<li>Irregular heartbeat (skipping, racing, fluttering)</li>
<li>Heart rate doesn't increase with exercise</li>
<li>Sudden changes in resting heart rate</li>
</ul></div>`
  },
  {
    file: 'ideal-weight-chart.html',
    title: 'Ideal Weight Chart by Height — Men & Women',
    desc: 'Find your ideal body weight by height and gender. Comprehensive chart with healthy weight ranges for men and women based on multiple medical formulas.',
    keywords: 'ideal weight chart, ideal body weight, healthy weight by height, weight chart for men women',
    body: `<h2>Ideal Weight Chart — Men</h2>
<table><thead><tr><th>Height</th><th>Small Frame</th><th>Medium Frame</th><th>Large Frame</th></tr></thead><tbody>
<tr><td>5'2"</td><td>128-134 lbs</td><td>131-141 lbs</td><td>138-150 lbs</td></tr>
<tr><td>5'3"</td><td>130-136 lbs</td><td>133-143 lbs</td><td>140-153 lbs</td></tr>
<tr><td>5'4"</td><td>132-138 lbs</td><td>135-145 lbs</td><td>142-156 lbs</td></tr>
<tr><td>5'5"</td><td>134-140 lbs</td><td>137-148 lbs</td><td>144-160 lbs</td></tr>
<tr><td>5'6"</td><td>136-142 lbs</td><td>139-151 lbs</td><td>146-164 lbs</td></tr>
<tr><td>5'7"</td><td>138-145 lbs</td><td>142-154 lbs</td><td>149-168 lbs</td></tr>
<tr><td>5'8"</td><td>140-148 lbs</td><td>145-157 lbs</td><td>152-172 lbs</td></tr>
<tr><td>5'9"</td><td>142-151 lbs</td><td>148-160 lbs</td><td>155-176 lbs</td></tr>
<tr><td>5'10"</td><td>144-154 lbs</td><td>151-163 lbs</td><td>158-180 lbs</td></tr>
<tr><td>5'11"</td><td>146-157 lbs</td><td>154-166 lbs</td><td>161-184 lbs</td></tr>
<tr><td>6'0"</td><td>149-160 lbs</td><td>157-170 lbs</td><td>164-188 lbs</td></tr>
<tr><td>6'1"</td><td>152-164 lbs</td><td>160-174 lbs</td><td>168-192 lbs</td></tr>
<tr><td>6'2"</td><td>155-168 lbs</td><td>164-178 lbs</td><td>172-197 lbs</td></tr>
<tr><td>6'3"</td><td>158-172 lbs</td><td>167-182 lbs</td><td>176-202 lbs</td></tr>
<tr><td>6'4"</td><td>162-176 lbs</td><td>171-187 lbs</td><td>181-207 lbs</td></tr></tbody></table>

<h2>Ideal Weight Chart — Women</h2>
<table><thead><tr><th>Height</th><th>Small Frame</th><th>Medium Frame</th><th>Large Frame</th></tr></thead><tbody>
<tr><td>4'10"</td><td>102-111 lbs</td><td>109-121 lbs</td><td>118-131 lbs</td></tr>
<tr><td>4'11"</td><td>103-113 lbs</td><td>111-123 lbs</td><td>120-134 lbs</td></tr>
<tr><td>5'0"</td><td>104-115 lbs</td><td>113-126 lbs</td><td>122-137 lbs</td></tr>
<tr><td>5'1"</td><td>106-118 lbs</td><td>115-129 lbs</td><td>125-140 lbs</td></tr>
<tr><td>5'2"</td><td>108-121 lbs</td><td>118-132 lbs</td><td>128-143 lbs</td></tr>
<tr><td>5'3"</td><td>111-124 lbs</td><td>121-135 lbs</td><td>131-147 lbs</td></tr>
<tr><td>5'4"</td><td>114-127 lbs</td><td>124-138 lbs</td><td>134-151 lbs</td></tr>
<tr><td>5'5"</td><td>117-130 lbs</td><td>127-141 lbs</td><td>137-155 lbs</td></tr>
<tr><td>5'6"</td><td>120-133 lbs</td><td>130-144 lbs</td><td>140-159 lbs</td></tr>
<tr><td>5'7"</td><td>123-136 lbs</td><td>133-147 lbs</td><td>143-163 lbs</td></tr>
<tr><td>5'8"</td><td>126-139 lbs</td><td>136-150 lbs</td><td>146-167 lbs</td></tr>
<tr><td>5'9"</td><td>129-142 lbs</td><td>139-153 lbs</td><td>149-170 lbs</td></tr>
<tr><td>5'10"</td><td>132-145 lbs</td><td>142-156 lbs</td><td>152-173 lbs</td></tr>
<tr><td>5'11"</td><td>135-148 lbs</td><td>145-159 lbs</td><td>155-176 lbs</td></tr></tbody></table>

<div class="highlight"><strong>💡 Note:</strong> These ranges are based on Metropolitan Life Insurance tables and the Hamwi formula. Your ideal weight depends on many factors including muscle mass, bone structure, and overall health. Use our <a href="bmi-calculator.html">BMI Calculator</a> and <a href="body-fat-calculator.html">Body Fat Calculator</a> for additional assessments.</div>

<h2>Ideal Weight Formulas</h2>
<h3>Hamwi Formula</h3>
<ul>
<li><strong>Men:</strong> 106 lbs for first 5 feet + 6 lbs per additional inch</li>
<li><strong>Women:</strong> 100 lbs for first 5 feet + 5 lbs per additional inch</li>
</ul>
<h3>Devine Formula</h3>
<ul>
<li><strong>Men:</strong> 110 lbs + 5.1 lbs per inch over 5 feet</li>
<li><strong>Women:</strong> 100.1 lbs + 5.1 lbs per inch over 5 feet</li>
</ul>
<h3>Robinson Formula</h3>
<ul>
<li><strong>Men:</strong> 114.4 lbs + 4.2 lbs per inch over 5 feet</li>
<li><strong>Women:</strong> 108.4 lbs + 3.7 lbs per inch over 5 feet</li>
</ul>`
  },
  {
    file: 'calorie-chart.html',
    title: 'Daily Calorie Needs by Age, Gender & Activity Level',
    desc: 'How many calories do you need per day? Complete calorie chart by age, gender, and activity level. Includes calorie needs for weight loss and weight gain.',
    keywords: 'daily calorie needs, calorie chart, calories per day, how many calories should I eat',
    body: `<h2>Daily Calorie Needs — Men</h2>
<table><thead><tr><th>Age</th><th>Sedentary</th><th>Moderately Active</th><th>Active</th></tr></thead><tbody>
<tr><td>2-3</td><td>1,000</td><td>1,000-1,400</td><td>1,000-1,400</td></tr>
<tr><td>4-8</td><td>1,200-1,400</td><td>1,400-1,600</td><td>1,600-2,000</td></tr>
<tr><td>9-13</td><td>1,600-2,000</td><td>1,800-2,200</td><td>2,000-2,600</td></tr>
<tr><td>14-18</td><td>2,000-2,400</td><td>2,400-2,800</td><td>2,800-3,200</td></tr>
<tr><td>19-25</td><td>2,400</td><td>2,600-2,800</td><td>3,000</td></tr>
<tr><td>26-35</td><td>2,400</td><td>2,600</td><td>3,000</td></tr>
<tr><td>36-45</td><td>2,200</td><td>2,400</td><td>2,800</td></tr>
<tr><td>46-55</td><td>2,200</td><td>2,400</td><td>2,800</td></tr>
<tr><td>56-65</td><td>2,200</td><td>2,400</td><td>2,600</td></tr>
<tr><td>66-75</td><td>2,000</td><td>2,200</td><td>2,600</td></tr>
<tr><td>76+</td><td>2,000</td><td>2,200</td><td>2,400</td></tr></tbody></table>

<h2>Daily Calorie Needs — Women</h2>
<table><thead><tr><th>Age</th><th>Sedentary</th><th>Moderately Active</th><th>Active</th></tr></thead><tbody>
<tr><td>2-3</td><td>1,000</td><td>1,000-1,200</td><td>1,000-1,400</td></tr>
<tr><td>4-8</td><td>1,200</td><td>1,400-1,600</td><td>1,400-1,800</td></tr>
<tr><td>9-13</td><td>1,400-1,600</td><td>1,600-2,000</td><td>1,800-2,200</td></tr>
<tr><td>14-18</td><td>1,800</td><td>2,000</td><td>2,400</td></tr>
<tr><td>19-25</td><td>2,000</td><td>2,200</td><td>2,400</td></tr>
<tr><td>26-35</td><td>1,800</td><td>2,000</td><td>2,400</td></tr>
<tr><td>36-45</td><td>1,800</td><td>2,000</td><td>2,200</td></tr>
<tr><td>46-55</td><td>1,600</td><td>1,800</td><td>2,200</td></tr>
<tr><td>56-65</td><td>1,600</td><td>1,800</td><td>2,000</td></tr>
<tr><td>66-75</td><td>1,600</td><td>1,800</td><td>2,000</td></tr>
<tr><td>76+</td><td>1,600</td><td>1,800</td><td>2,000</td></tr></tbody></table>

<div class="highlight"><strong>📊 Activity Levels Explained:</strong>
<ul>
<li><strong>Sedentary:</strong> Little to no exercise, desk job</li>
<li><strong>Moderately Active:</strong> Light exercise 3-5 days/week, some walking</li>
<li><strong>Active:</strong> Hard exercise 6-7 days/week, physically demanding job</li>
</ul></div>

<h2>Calories for Weight Loss & Weight Gain</h2>
<table><thead><tr><th>Goal</th><th>Calorie Adjustment</th><th>Expected Rate</th></tr></thead><tbody>
<tr><td>Lose 0.5 lb/week</td><td>-250 calories/day</td><td>Slow, sustainable</td></tr>
<tr><td>Lose 1 lb/week</td><td>-500 calories/day</td><td>Recommended rate</td></tr>
<tr><td>Lose 2 lbs/week</td><td>-1,000 calories/day</td><td>Aggressive (may lose muscle)</td></tr>
<tr><td>Maintain weight</td><td>0 (eat at TDEE)</td><td>Stable</td></tr>
<tr><td>Gain 0.5 lb/week</td><td>+250 calories/day</td><td>Lean bulk</td></tr>
<tr><td>Gain 1 lb/week</td><td>+500 calories/day</td><td>Standard bulk</td></tr></tbody></table>

<div class="warning"><strong>⚠️ Important:</strong> Never eat below 1,200 calories/day (women) or 1,500 calories/day (men) without medical supervision. Very low calorie diets can cause nutrient deficiencies, muscle loss, and metabolic slowdown.</div>

<p>For a personalized calculation, use our <a href="calorie-calculator.html">Daily Calorie Calculator</a> or <a href="bmr-calculator.html">BMR Calculator</a>.</p>`
  },
  {
    file: 'vitamin-daily-intake-chart.html',
    title: 'Daily Vitamin & Mineral Requirements Chart',
    desc: 'Complete chart of recommended daily vitamin and mineral intake by age and gender. RDA values for Vitamin A, B, C, D, E, K, Iron, Calcium, Zinc, and more.',
    keywords: 'daily vitamin requirements, vitamin chart, rda vitamins, mineral daily intake, vitamin d daily dose',
    body: `<h2>Essential Vitamins — Recommended Daily Intake</h2>
<table><thead><tr><th>Vitamin</th><th>Men (19-50)</th><th>Women (19-50)</th><th>Pregnant</th><th>Key Function</th></tr></thead><tbody>
<tr><td>Vitamin A</td><td>900 mcg</td><td>700 mcg</td><td>770 mcg</td><td>Vision, immune system, skin</td></tr>
<tr><td>Vitamin B1 (Thiamine)</td><td>1.2 mg</td><td>1.1 mg</td><td>1.4 mg</td><td>Energy metabolism, nerve function</td></tr>
<tr><td>Vitamin B2 (Riboflavin)</td><td>1.3 mg</td><td>1.1 mg</td><td>1.4 mg</td><td>Energy, red blood cells</td></tr>
<tr><td>Vitamin B3 (Niacin)</td><td>16 mg</td><td>14 mg</td><td>18 mg</td><td>Digestion, skin, nerves</td></tr>
<tr><td>Vitamin B6</td><td>1.3 mg</td><td>1.3 mg</td><td>1.9 mg</td><td>Brain function, immunity</td></tr>
<tr><td>Vitamin B12</td><td>2.4 mcg</td><td>2.4 mcg</td><td>2.6 mcg</td><td>Nerve function, DNA synthesis</td></tr>
<tr><td>Folate (B9)</td><td>400 mcg</td><td>400 mcg</td><td>600 mcg</td><td>Cell division, pregnancy</td></tr>
<tr><td>Vitamin C</td><td>90 mg</td><td>75 mg</td><td>85 mg</td><td>Immune system, collagen</td></tr>
<tr><td>Vitamin D</td><td>600 IU</td><td>600 IU</td><td>600 IU</td><td>Bone health, calcium absorption</td></tr>
<tr><td>Vitamin E</td><td>15 mg</td><td>15 mg</td><td>15 mg</td><td>Antioxidant, skin health</td></tr>
<tr><td>Vitamin K</td><td>120 mcg</td><td>90 mcg</td><td>90 mcg</td><td>Blood clotting, bone health</td></tr></tbody></table>

<h2>Essential Minerals — Recommended Daily Intake</h2>
<table><thead><tr><th>Mineral</th><th>Men (19-50)</th><th>Women (19-50)</th><th>Pregnant</th><th>Key Function</th></tr></thead><tbody>
<tr><td>Calcium</td><td>1,000 mg</td><td>1,000 mg</td><td>1,000 mg</td><td>Bones, teeth, muscle function</td></tr>
<tr><td>Iron</td><td>8 mg</td><td>18 mg</td><td>27 mg</td><td>Oxygen transport, energy</td></tr>
<tr><td>Magnesium</td><td>400-420 mg</td><td>310-320 mg</td><td>350-360 mg</td><td>Muscle/nerve function, 300+ enzymes</td></tr>
<tr><td>Zinc</td><td>11 mg</td><td>8 mg</td><td>11 mg</td><td>Immune system, wound healing</td></tr>
<tr><td>Potassium</td><td>3,400 mg</td><td>2,600 mg</td><td>2,900 mg</td><td>Heart rhythm, blood pressure</td></tr>
<tr><td>Sodium</td><td>&lt;2,300 mg</td><td>&lt;2,300 mg</td><td>&lt;2,300 mg</td><td>Fluid balance (limit intake)</td></tr>
<tr><td>Phosphorus</td><td>700 mg</td><td>700 mg</td><td>700 mg</td><td>Bones, energy metabolism</td></tr>
<tr><td>Selenium</td><td>55 mcg</td><td>55 mcg</td><td>60 mcg</td><td>Thyroid, antioxidant</td></tr>
<tr><td>Iodine</td><td>150 mcg</td><td>150 mcg</td><td>220 mcg</td><td>Thyroid hormone production</td></tr>
<tr><td>Copper</td><td>900 mcg</td><td>900 mcg</td><td>1,000 mcg</td><td>Iron metabolism, connective tissue</td></tr></tbody></table>

<h2>Vitamin D by Age</h2>
<table><thead><tr><th>Age Group</th><th>RDA (IU/day)</th><th>Upper Limit</th></tr></thead><tbody>
<tr><td>Infants (0-12 months)</td><td>400 IU</td><td>1,000-1,500 IU</td></tr>
<tr><td>Children (1-18 years)</td><td>600 IU</td><td>2,500-4,000 IU</td></tr>
<tr><td>Adults (19-70 years)</td><td>600 IU</td><td>4,000 IU</td></tr>
<tr><td>Seniors (71+ years)</td><td>800 IU</td><td>4,000 IU</td></tr>
<tr><td>Pregnant/Lactating</td><td>600 IU</td><td>4,000 IU</td></tr></tbody></table>

<div class="tip"><strong>🔬 Common Deficiencies:</strong> The most common vitamin deficiencies worldwide are Vitamin D (42% of US adults), Vitamin B12 (especially in vegetarians/vegans), Iron (especially in women), and Magnesium (nearly 50% of Americans don't get enough).</div>`
  },
  {
    file: 'healthy-blood-sugar-levels.html',
    title: 'Normal Blood Sugar Levels Chart — Fasting & After Meals',
    desc: 'Complete blood sugar level chart. Normal, prediabetic, and diabetic glucose ranges for fasting, after meals, and A1C levels. Know your numbers.',
    keywords: 'normal blood sugar levels, blood sugar chart, glucose levels, a1c chart, diabetes ranges',
    body: `<h2>Blood Sugar Levels Chart</h2>
<table><thead><tr><th>Test / Time</th><th>Normal</th><th>Prediabetes</th><th>Diabetes</th></tr></thead><tbody>
<tr><td>Fasting (no food 8+ hrs)</td><td>70-99 mg/dL</td><td>100-125 mg/dL</td><td>126+ mg/dL</td></tr>
<tr><td>2 hrs after eating</td><td>Below 140 mg/dL</td><td>140-199 mg/dL</td><td>200+ mg/dL</td></tr>
<tr><td>Random test</td><td>Below 140 mg/dL</td><td>—</td><td>200+ mg/dL (with symptoms)</td></tr>
<tr><td>A1C test</td><td>Below 5.7%</td><td>5.7-6.4%</td><td>6.5%+</td></tr>
<tr><td>Oral Glucose Tolerance</td><td>Below 140 mg/dL</td><td>140-199 mg/dL</td><td>200+ mg/dL</td></tr></tbody></table>

<h2>A1C to Average Blood Sugar Conversion</h2>
<p>A1C measures your average blood sugar over the past 2-3 months. Here's how A1C percentages translate to estimated average glucose (eAG):</p>
<table><thead><tr><th>A1C (%)</th><th>Estimated Avg. Glucose (mg/dL)</th><th>Estimated Avg. Glucose (mmol/L)</th><th>Interpretation</th></tr></thead><tbody>
<tr><td>5.0</td><td>97</td><td>5.4</td><td>Normal</td></tr>
<tr><td>5.5</td><td>111</td><td>6.2</td><td>Normal</td></tr>
<tr><td>5.7</td><td>117</td><td>6.5</td><td>Prediabetes threshold</td></tr>
<tr><td>6.0</td><td>126</td><td>7.0</td><td>Prediabetes</td></tr>
<tr><td>6.5</td><td>140</td><td>7.8</td><td>Diabetes threshold</td></tr>
<tr><td>7.0</td><td>154</td><td>8.6</td><td>Diabetes</td></tr>
<tr><td>7.5</td><td>169</td><td>9.4</td><td>Diabetes</td></tr>
<tr><td>8.0</td><td>183</td><td>10.2</td><td>Diabetes (poor control)</td></tr>
<tr><td>9.0</td><td>212</td><td>11.8</td><td>Diabetes (high risk)</td></tr>
<tr><td>10.0</td><td>240</td><td>13.4</td><td>Diabetes (very high risk)</td></tr></tbody></table>

<div class="highlight"><strong>🎯 Target A1C Goals:</strong>
<ul>
<li>Most adults with diabetes: Below 7.0%</li>
<li>Healthy adults without diabetes: Below 5.7%</li>
<li>Older adults or those with complications: Below 8.0% (less aggressive)</li>
</ul></div>

<h2>Blood Sugar Levels During Pregnancy (Gestational Diabetes)</h2>
<table><thead><tr><th>Test Time</th><th>Target (mg/dL)</th></tr></thead><tbody>
<tr><td>Before meals (fasting)</td><td>Below 95</td></tr>
<tr><td>1 hour after meals</td><td>Below 140</td></tr>
<tr><td>2 hours after meals</td><td>Below 120</td></tr></tbody></table>

<h2>Symptoms of High Blood Sugar (Hyperglycemia)</h2>
<ul>
<li>Frequent urination</li>
<li>Excessive thirst</li>
<li>Blurred vision</li>
<li>Fatigue and weakness</li>
<li>Unexplained weight loss</li>
<li>Slow-healing wounds</li>
<li>Frequent infections</li>
</ul>

<h2>Symptoms of Low Blood Sugar (Hypoglycemia)</h2>
<div class="warning"><strong>⚠️ Below 70 mg/dL — Act immediately:</strong>
<ul>
<li>Shakiness, trembling</li>
<li>Sweating, chills</li>
<li>Confusion, difficulty concentrating</li>
<li>Rapid heartbeat</li>
<li>Dizziness, lightheadedness</li>
<li>Hunger, nausea</li>
<li>Treat with 15g of fast-acting carbs (juice, glucose tablets)</li>
</ul></div>

<p>Use our <a href="a1c-calculator.html">A1C Calculator</a> to estimate your average blood sugar from your A1C result.</p>`
  },
  {
    file: 'body-fat-percentage-chart.html',
    title: 'Body Fat Percentage Chart — Healthy Ranges by Age & Gender',
    desc: 'What is a healthy body fat percentage? Complete chart of body fat ranges for men and women by age. Learn what body fat percentage looks like at each level.',
    keywords: 'body fat percentage chart, healthy body fat, body fat ranges, body fat by age',
    body: `<h2>Body Fat Percentage Ranges — Men</h2>
<table><thead><tr><th>Category</th><th>Age 20-29</th><th>Age 30-39</th><th>Age 40-49</th><th>Age 50-59</th><th>Age 60+</th></tr></thead><tbody>
<tr><td>Essential Fat</td><td>2-5%</td><td>2-5%</td><td>2-5%</td><td>2-5%</td><td>2-5%</td></tr>
<tr><td>Athletes</td><td>6-13%</td><td>6-14%</td><td>6-16%</td><td>6-17%</td><td>6-18%</td></tr>
<tr><td>Fitness</td><td>14-17%</td><td>15-18%</td><td>17-20%</td><td>18-21%</td><td>19-22%</td></tr>
<tr><td>Average</td><td>18-24%</td><td>19-25%</td><td>21-27%</td><td>22-28%</td><td>23-29%</td></tr>
<tr><td>Obese</td><td>25%+</td><td>26%+</td><td>28%+</td><td>29%+</td><td>30%+</td></tr></tbody></table>

<h2>Body Fat Percentage Ranges — Women</h2>
<table><thead><tr><th>Category</th><th>Age 20-29</th><th>Age 30-39</th><th>Age 40-49</th><th>Age 50-59</th><th>Age 60+</th></tr></thead><tbody>
<tr><td>Essential Fat</td><td>10-13%</td><td>10-13%</td><td>10-13%</td><td>10-13%</td><td>10-13%</td></tr>
<tr><td>Athletes</td><td>14-20%</td><td>14-21%</td><td>14-23%</td><td>14-24%</td><td>14-25%</td></tr>
<tr><td>Fitness</td><td>21-24%</td><td>22-25%</td><td>24-27%</td><td>25-28%</td><td>26-29%</td></tr>
<tr><td>Average</td><td>25-31%</td><td>26-32%</td><td>28-34%</td><td>29-35%</td><td>30-36%</td></tr>
<tr><td>Obese</td><td>32%+</td><td>33%+</td><td>35%+</td><td>36%+</td><td>37%+</td></tr></tbody></table>

<div class="highlight"><strong>💡 What Does Each Level Look Like?</strong>
<ul>
<li><strong>5-9% (Men) / 14-18% (Women):</strong> Visible muscle definition, veins visible, six-pack abs. Competition bodybuilder level — not sustainable long-term.</li>
<li><strong>10-14% (Men) / 19-24% (Women):</strong> Athletic, lean. Some muscle definition visible. Healthy and sustainable for most active people.</li>
<li><strong>15-20% (Men) / 25-30% (Women):</strong> Fit appearance but less muscle definition. Most healthy people fall here.</li>
<li><strong>21-25% (Men) / 31-35% (Women):</strong> Average. Soft appearance, less definition. Not unhealthy but room for improvement.</li>
<li><strong>25%+ (Men) / 35%+ (Women):</strong> Overweight to obese range. Increased health risks.</li>
</ul></div>

<h2>How to Measure Body Fat</h2>
<table><thead><tr><th>Method</th><th>Accuracy</th><th>Cost</th><th>Availability</th></tr></thead><tbody>
<tr><td>DEXA Scan</td><td>±1-2%</td><td>$50-150</td><td>Medical facilities</td></tr>
<tr><td>Hydrostatic Weighing</td><td>±1-2%</td><td>$40-100</td><td>Universities, labs</td></tr>
<tr><td>Bod Pod</td><td>±2-3%</td><td>$40-75</td><td>Fitness centers</td></tr>
<tr><td>Skinfold Calipers</td><td>±3-5%</td><td>$5-30</td><td>Home, gyms</td></tr>
<tr><td>Bioelectric Impedance</td><td>±3-8%</td><td>$20-200</td><td>Smart scales, gyms</td></tr>
<tr><td>Navy Method (tape)</td><td>±3-5%</td><td>Free</td><td>Anywhere</td></tr></tbody></table>

<p>Estimate yours with our <a href="body-fat-calculator.html">Body Fat Calculator</a> using the Navy Method, or check your <a href="waist-hip-ratio.html">Waist-to-Hip Ratio</a>.</p>`
  },
  {
    file: 'pregnancy-week-by-week.html',
    title: 'Pregnancy Week by Week — Baby Size & Development Chart',
    desc: 'Track your pregnancy week by week. See baby size comparisons, weight, development milestones, and what to expect each week from conception to birth.',
    keywords: 'pregnancy week by week, baby size by week, pregnancy development, fetal development chart',
    body: `<h2>First Trimester (Weeks 1-13)</h2>
<table><thead><tr><th>Week</th><th>Baby Size</th><th>Length</th><th>Weight</th><th>Key Development</th></tr></thead><tbody>
<tr><td>4</td><td>Poppy seed</td><td>0.04 in</td><td>—</td><td>Implantation, cells dividing</td></tr>
<tr><td>5</td><td>Sesame seed</td><td>0.05 in</td><td>—</td><td>Heart begins to beat</td></tr>
<tr><td>6</td><td>Lentil</td><td>0.08 in</td><td>—</td><td>Brain forming, arm/leg buds</td></tr>
<tr><td>7</td><td>Blueberry</td><td>0.3 in</td><td>—</td><td>Hands/feet forming</td></tr>
<tr><td>8</td><td>Raspberry</td><td>0.6 in</td><td>0.04 oz</td><td>Fingers forming, baby moves</td></tr>
<tr><td>9</td><td>Cherry</td><td>0.9 in</td><td>0.07 oz</td><td>All essential organs formed</td></tr>
<tr><td>10</td><td>Strawberry</td><td>1.2 in</td><td>0.14 oz</td><td>Fingers/toes separate</td></tr>
<tr><td>11</td><td>Fig</td><td>1.6 in</td><td>0.25 oz</td><td>Tooth buds, nails forming</td></tr>
<tr><td>12</td><td>Lime</td><td>2.1 in</td><td>0.49 oz</td><td>Reflexes develop, can suck thumb</td></tr>
<tr><td>13</td><td>Peach</td><td>2.9 in</td><td>0.81 oz</td><td>Fingerprints forming, vocal cords</td></tr></tbody></table>

<h2>Second Trimester (Weeks 14-27)</h2>
<table><thead><tr><th>Week</th><th>Baby Size</th><th>Length</th><th>Weight</th><th>Key Development</th></tr></thead><tbody>
<tr><td>14</td><td>Lemon</td><td>3.4 in</td><td>1.5 oz</td><td>Can make facial expressions</td></tr>
<tr><td>16</td><td>Avocado</td><td>4.6 in</td><td>3.5 oz</td><td>Can hear sounds, eyes move</td></tr>
<tr><td>18</td><td>Bell pepper</td><td>5.6 in</td><td>6.7 oz</td><td>Can yawn, hiccup; gender visible</td></tr>
<tr><td>20</td><td>Banana</td><td>6.5 in</td><td>10.2 oz</td><td>Halfway point! Taste buds active</td></tr>
<tr><td>22</td><td>Papaya</td><td>7.6 in</td><td>15.2 oz</td><td>Grip is strong, eyebrows form</td></tr>
<tr><td>24</td><td>Ear of corn</td><td>8.5 in</td><td>1.3 lbs</td><td>Lungs developing, viability milestone</td></tr>
<tr><td>26</td><td>Zucchini</td><td>9.2 in</td><td>1.7 lbs</td><td>Eyes open, can respond to sound</td></tr></tbody></table>

<h2>Third Trimester (Weeks 28-40)</h2>
<table><thead><tr><th>Week</th><th>Baby Size</th><th>Length</th><th>Weight</th><th>Key Development</th></tr></thead><tbody>
<tr><td>28</td><td>Eggplant</td><td>10 in</td><td>2.2 lbs</td><td>Can blink, dream (REM sleep)</td></tr>
<tr><td>30</td><td>Cabbage</td><td>10.8 in</td><td>2.9 lbs</td><td>Brain growing rapidly</td></tr>
<tr><td>32</td><td>Squash</td><td>11.4 in</td><td>3.7 lbs</td><td>Practicing breathing, toenails</td></tr>
<tr><td>34</td><td>Cantaloupe</td><td>12 in</td><td>4.7 lbs</td><td>Lungs nearly mature</td></tr>
<tr><td>36</td><td>Honeydew</td><td>13.2 in</td><td>5.8 lbs</td><td>Dropping into birth position</td></tr>
<tr><td>37</td><td>Winter melon</td><td>13.6 in</td><td>6.3 lbs</td><td>Full term! Organs ready</td></tr>
<tr><td>38</td><td>Pumpkin</td><td>13.8 in</td><td>6.8 lbs</td><td>Brain & lungs maturing</td></tr>
<tr><td>39</td><td>Small watermelon</td><td>14 in</td><td>7.3 lbs</td><td>Building fat layer, ready for birth</td></tr>
<tr><td>40</td><td>Watermelon</td><td>14.2 in</td><td>7.6 lbs</td><td>Due date! Ready to meet world</td></tr></tbody></table>

<div class="tip"><strong>📅 Track Your Dates:</strong> Use our <a href="pregnancy-due-date.html">Pregnancy Due Date Calculator</a> to find your estimated delivery date, and our <a href="pregnancy-weight-gain.html">Pregnancy Weight Gain Calculator</a> to track healthy weight gain throughout your pregnancy.</div>

<h2>Prenatal Milestone Schedule</h2>
<table><thead><tr><th>When</th><th>Test / Milestone</th></tr></thead><tbody>
<tr><td>Week 6-8</td><td>First ultrasound, confirm heartbeat</td></tr>
<tr><td>Week 10-13</td><td>NIPT / first trimester screening</td></tr>
<tr><td>Week 12</td><td>NT scan (nuchal translucency)</td></tr>
<tr><td>Week 18-22</td><td>Anatomy scan (gender reveal possible)</td></tr>
<tr><td>Week 24-28</td><td>Glucose tolerance test</td></tr>
<tr><td>Week 28</td><td>Rh antibody screening</td></tr>
<tr><td>Week 35-37</td><td>Group B strep test</td></tr>
<tr><td>Week 37</td><td>Considered full term</td></tr>
<tr><td>Week 39-40</td><td>Due date — baby's arrival!</td></tr></tbody></table>`
  }
];

// Build all pages
const newFiles = [];
pages.forEach(p => {
  const faq = `<div class="faq"><h2>Frequently Asked Questions</h2></div>`;
  const disclaimer = `<div class="disclaimer">⚠️ For informational purposes only. Consult a healthcare professional for medical decisions.</div>`;
  const html = `${makeHead(p.title, p.desc, p.keywords, p.file)}${styles}</head><body><div class="container"><header><a href="index.html" class="logo-link">← HealthCalcs</a><h1>${p.title}</h1><p>${p.desc}</p></header>${adSlot}<div class="content">${p.body}</div>${adSlot}${disclaimer}${relatedLinks}${adSlot}${footer}</div></body></html>`;
  fs.writeFileSync(`${path}/${p.file}`, html);
  newFiles.push(p.file);
  console.log(`✅ Created ${p.file}`);
});

console.log(`\nTotal new pages: ${newFiles.length}`);
console.log(JSON.stringify(newFiles));
