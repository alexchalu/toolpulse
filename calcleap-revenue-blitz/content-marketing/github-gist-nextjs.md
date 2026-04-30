# CalcLeap API - Next.js API Route Example

## pages/api/mortgage.js

```javascript
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { principal, rate, years } = req.query;

  if (!principal || !rate || !years) {
    return res.status(400).json({ 
      error: 'Missing required parameters: principal, rate, years' 
    });
  }

  try {
    const response = await fetch(
      `https://calcleap-api.onrender.com/api/mortgage?principal=${principal}&rate=${rate}&years=${years}`
    );

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('CalcLeap API Error:', error);
    res.status(500).json({ error: 'Failed to calculate mortgage' });
  }
}
```

## pages/mortgage.js

```jsx
import { useState } from 'react';

export default function MortgagePage() {
  const [formData, setFormData] = useState({
    principal: 350000,
    rate: 6.5,
    years: 30
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `/api/mortgage?principal=${formData.principal}&rate=${formData.rate}&years=${formData.years}`
      );
      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to calculate. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Mortgage Calculator</h1>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Loan Amount ($)</label>
          <input
            type="number"
            value={formData.principal}
            onChange={(e) => setFormData({ ...formData, principal: e.target.value })}
            required
          />
        </div>

        <div>
          <label>Interest Rate (%)</label>
          <input
            type="number"
            step="0.1"
            value={formData.rate}
            onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
            required
          />
        </div>

        <div>
          <label>Term (years)</label>
          <input
            type="number"
            value={formData.years}
            onChange={(e) => setFormData({ ...formData, years: e.target.value })}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate'}
        </button>
      </form>

      {result && (
        <div className="results">
          <h2>Results</h2>
          <p><strong>Monthly Payment:</strong> {result.monthlyPayment}</p>
          <p>Total Payment: {result.totalPayment}</p>
          <p>Total Interest: {result.totalInterest}</p>
        </div>
      )}

      <style jsx>{`
        .container { max-width: 600px; margin: 50px auto; padding: 20px; }
        form div { margin-bottom: 15px; }
        label { display: block; margin-bottom: 5px; font-weight: bold; }
        input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; }
        button { 
          width: 100%; 
          padding: 12px; 
          background: #667eea; 
          color: white; 
          border: none; 
          border-radius: 6px; 
          cursor: pointer;
          font-size: 16px;
        }
        button:disabled { background: #ccc; cursor: not-allowed; }
        .results { 
          margin-top: 25px; 
          padding: 20px; 
          background: #f5f5f5; 
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}
```

## Installation

```bash
npm install
npm run dev
```

## API Documentation

**CalcLeap API:** https://calcleap.com/api-docs.html  
**Free Tier:** 1,000 calls/month (no API key needed)  
**NPM Package:** `npm install calcleap-api-client`
