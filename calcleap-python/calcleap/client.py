import urllib.request
import urllib.parse
import json

class CalcLeap:
    """Python client for CalcLeap API - 2,900+ free calculators"""
    
    def __init__(self, base_url="https://calcleap-api.onrender.com", timeout=10):
        self.base_url = base_url.rstrip('/')
        self.timeout = timeout
    
    def _request(self, endpoint, params):
        """Make API request"""
        query = urllib.parse.urlencode(params)
        url = f"{self.base_url}/api/{endpoint}?{query}"
        
        try:
            with urllib.request.urlopen(url, timeout=self.timeout) as response:
                data = json.loads(response.read().decode())
                if 'error' in data:
                    raise Exception(data['error'])
                return data.get('result')
        except urllib.error.HTTPError as e:
            raise Exception(f"HTTP {e.code}: {e.reason}")
        except urllib.error.URLError as e:
            raise Exception(f"URL Error: {e.reason}")
    
    def mortgage(self, principal, rate, years):
        """Calculate monthly mortgage payment
        
        Args:
            principal: Loan amount in dollars
            rate: Annual interest rate (percentage)
            years: Loan term in years
            
        Returns:
            dict with monthlyPayment, totalPaid, totalInterest
        """
        return self._request('mortgage', {
            'principal': principal,
            'rate': rate,
            'years': years
        })
    
    def bmi(self, weight, height, unit='imperial'):
        """Calculate Body Mass Index
        
        Args:
            weight: Weight in lbs (imperial) or kg (metric)
            height: Height in inches (imperial) or cm (metric)
            unit: 'imperial' or 'metric' (default: imperial)
            
        Returns:
            dict with bmi, category, healthyRange
        """
        return self._request('bmi', {
            'weight': weight,
            'height': height,
            'unit': unit
        })
    
    def compound(self, principal, rate, years, compound='annually'):
        """Calculate compound interest
        
        Args:
            principal: Initial investment
            rate: Annual interest rate (percentage)
            years: Investment period in years
            compound: Compounding frequency (default: annually)
            
        Returns:
            dict with futureValue, totalInterest
        """
        return self._request('compound', {
            'principal': principal,
            'rate': rate,
            'years': years,
            'compound': compound
        })
    
    def loan(self, amount, rate, months):
        """Calculate loan payment
        
        Args:
            amount: Loan amount
            rate: Annual interest rate (percentage)
            months: Loan term in months
            
        Returns:
            dict with monthlyPayment, totalPaid, totalInterest
        """
        return self._request('loan', {
            'amount': amount,
            'rate': rate,
            'months': months
        })
    
    def retirement(self, current_age, retire_age, savings, monthly_contribution, rate):
        """Calculate retirement savings
        
        Args:
            current_age: Your current age
            retire_age: Target retirement age
            savings: Current savings
            monthly_contribution: Monthly contribution amount
            rate: Expected annual return (percentage)
            
        Returns:
            dict with projections and retirement income
        """
        return self._request('retirement', {
            'currentAge': current_age,
            'retireAge': retire_age,
            'savings': savings,
            'monthlyContribution': monthly_contribution,
            'rate': rate
        })
    
    def tip(self, bill, percent, people=1):
        """Calculate tip amount
        
        Args:
            bill: Bill amount
            percent: Tip percentage
            people: Number of people splitting (default: 1)
            
        Returns:
            dict with tip amounts and totals
        """
        return self._request('tip', {
            'bill': bill,
            'percent': percent,
            'people': people
        })
    
    def percentage(self, value, total):
        """Calculate percentage
        
        Args:
            value: The value
            total: The total
            
        Returns:
            dict with percentage result
        """
        return self._request('percentage', {
            'value': value,
            'total': total
        })
    
    def insurance(self, age, coverage, insurance_type='term', term=20):
        """Estimate insurance premium
        
        Args:
            age: Your age
            coverage: Coverage amount in dollars
            insurance_type: 'term', 'whole', or 'universal' (default: term)
            term: Term length in years (default: 20)
            
        Returns:
            dict with premium estimates
        """
        return self._request('insurance', {
            'age': age,
            'coverage': coverage,
            'type': insurance_type,
            'term': term
        })
