// Stock Portfolio Calculator
function calculatePortfolio() {
    // Get input values
    const initialInvestment = parseFloat(document.getElementById('initialInvestment').value) || 0;
    const monthlyContribution = parseFloat(document.getElementById('monthlyContribution').value) || 0;
    const years = parseInt(document.getElementById('years').value) || 0;
    const expectedReturn = parseFloat(document.getElementById('expectedReturn').value) || 0;
    
    const stocksPercent = parseInt(document.getElementById('stocks').value) || 0;
    const bondsPercent = parseInt(document.getElementById('bonds').value) || 0;
    const cashPercent = parseInt(document.getElementById('cash').value) || 0;
    
    // Calculate total months
    const totalMonths = years * 12;
    
    // Calculate monthly return rate
    const monthlyReturn = Math.pow(1 + expectedReturn / 100, 1/12) - 1;
    
    // Calculate future value using compound interest formula
    let futureValue = initialInvestment;
    
    for (let month = 1; month <= totalMonths; month++) {
        futureValue = (futureValue + monthlyContribution) * (1 + monthlyReturn);
    }
    
    // Calculate total contributions
    const totalContributions = initialInvestment + (monthlyContribution * totalMonths);
    
    // Calculate total returns
    const totalReturns = futureValue - totalContributions;
    
    // Calculate annualized return
    const annualizedReturn = (Math.pow(futureValue / initialInvestment, 1/years) - 1) * 100;
    
    // Calculate portfolio breakdown
    const stocksValue = futureValue * (stocksPercent / 100);
    const bondsValue = futureValue * (bondsPercent / 100);
    const cashValue = futureValue * (cashPercent / 100);
    
    // Display results
    document.getElementById('finalValue').textContent = formatCurrency(futureValue);
    document.getElementById('totalContributions').textContent = formatCurrency(totalContributions);
    document.getElementById('totalReturns').textContent = formatCurrency(totalReturns);
    document.getElementById('annualizedReturn').textContent = annualizedReturn.toFixed(2) + '%';
    
    document.getElementById('stocksFinal').textContent = formatCurrency(stocksValue);
    document.getElementById('bondsFinal').textContent = formatCurrency(bondsValue);
    document.getElementById('cashFinal').textContent = formatCurrency(cashValue);
    
    // Add result styling
    document.querySelector('.calculator-result').style.display = 'block';
    
    // Scroll to results
    document.querySelector('.calculator-result').scrollIntoView({ behavior: 'smooth' });
}

function formatCurrency(value) {
    return '$' + value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Set up event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Set default values
    document.getElementById('initialInvestment').value = 10000;
    document.getElementById('monthlyContribution').value = 500;
    document.getElementById('years').value = 10;
    document.getElementById('expectedReturn').value = 7;
    document.getElementById('stocks').value = 60;
    document.getElementById('bonds').value = 30;
    document.getElementById('cash').value = 10;
    
    // Update displayed values
    document.getElementById('stocksValue').textContent = '60';
    document.getElementById('bondsValue').textContent = '30';
    document.getElementById('cashValue').textContent = '10';
    
    // Set up calculate button
    document.getElementById('calculateBtn').addEventListener('click', calculatePortfolio);
    
    // Allow Enter key to calculate
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculatePortfolio();
        }
    });
});