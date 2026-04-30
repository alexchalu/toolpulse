# CalcLeap API - React Mortgage Calculator Example

```jsx
import React, { useState } from 'react';

function MortgageCalculator() {
  const [principal, setPrincipal] = useState(350000);
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(30);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculateMortgage = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://calcleap-api.onrender.com/api/mortgage?principal=${principal}&rate=${rate}&years=${years}`
      );
      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', fontFamily: 'Arial' }}>
      <h2>Mortgage Calculator</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <label>Loan Amount: ${principal.toLocaleString()}</label>
        <input 
          type="range" 
          min="50000" 
          max="1000000" 
          step="10000"
          value={principal}
          onChange={(e) => setPrincipal(Number(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Interest Rate: {rate}%</label>
        <input 
          type="range" 
          min="3" 
          max="12" 
          step="0.1"
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Term: {years} years</label>
        <input 
          type="range" 
          min="10" 
          max="30" 
          step="5"
          value={years}
          onChange={(e) => setYears(Number(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>

      <button 
        onClick={calculateMortgage}
        disabled={loading}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Calculating...' : 'Calculate'}
      </button>

      {result && (
        <div style={{ marginTop: '25px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
          <h3>Results</h3>
          <p style={{ fontSize: '18px', margin: '10px 0' }}>
            <strong>Monthly Payment:</strong> {result.monthlyPayment}
          </p>
          <p style={{ fontSize: '14px', color: '#666', margin: '5px 0' }}>
            Total Payment: {result.totalPayment}
          </p>
          <p style={{ fontSize: '14px', color: '#666', margin: '5px 0' }}>
            Total Interest: {result.totalInterest}
          </p>
          
          {result.schedule && result.schedule.length > 0 && (
            <details style={{ marginTop: '15px' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                Amortization Schedule (First Year)
              </summary>
              <table style={{ width: '100%', marginTop: '10px', fontSize: '12px' }}>
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Payment</th>
                    <th>Principal</th>
                    <th>Interest</th>
                    <th>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {result.schedule.slice(0, 12).map((row, i) => (
                    <tr key={i}>
                      <td>{row.month}</td>
                      <td>{row.payment}</td>
                      <td>{row.principal}</td>
                      <td>{row.interest}</td>
                      <td>{row.balance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </details>
          )}
        </div>
      )}

      <p style={{ fontSize: '12px', color: '#999', marginTop: '20px', textAlign: 'center' }}>
        Powered by <a href="https://calcleap.com" target="_blank">CalcLeap API</a>
      </p>
    </div>
  );
}

export default MortgageCalculator;
```

## Installation

```bash
npm install
```

## Usage

```jsx
import MortgageCalculator from './MortgageCalculator';

function App() {
  return <MortgageCalculator />;
}
```

## API Documentation

**CalcLeap API Docs:** https://calcleap.com/api-docs.html  
**Free Tier:** 1,000 calls/month  
**NPM Package:** npm install calcleap-api-client
