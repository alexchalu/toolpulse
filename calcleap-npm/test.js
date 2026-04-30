const CalcLeap = require('./index');
const calc = new CalcLeap();

console.log('Testing CalcLeap API...\n');

calc.mortgage(300000, 6.5, 30)
  .then(r => console.log('✓ Mortgage:', r))
  .catch(e => console.error('✗ Mortgage:', e.message));

calc.bmi(180, 70)
  .then(r => console.log('✓ BMI:', r))
  .catch(e => console.error('✗ BMI:', e.message));
