/**
 * Structured Settlement Calculator
 * Calculates the present value of future structured settlement payments
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculateBtn');
    const resetBtn = document.getElementById('resetBtn');
    const resultsSection = document.getElementById('results');

    // Set default values
    document.getElementById('settlementAmount').value = '100000';
    document.getElementById('annualPayment').value = '20000';
    document.getElementById('yearsRemaining').value = '10';
    document.getElementById('discountRate').value = '5.5';

    // Calculate button click handler
    calculateBtn.addEventListener('click', calculatePresentValue);
    
    // Reset button click handler
    resetBtn.addEventListener('click', resetCalculator);

    // Also allow Enter key to trigger calculation
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculatePresentValue();
        }
    });
});

/**
 * Calculate the present value of structured settlement payments
 */
function calculatePresentValue() {
    // Get input values
    const settlementAmount = parseFloat(document.getElementById('settlementAmount').value) || 0;
    const annualPayment = parseFloat(document.getElementById('annualPayment').value) || 0;
    const yearsRemaining = parseInt(document.getElementById('yearsRemaining').value) || 0;
    const discountRate = parseFloat(document.getElementById('discountRate').value) || 0;

    // Validate inputs
    if (settlementAmount <= 0 || annualPayment <= 0 || yearsRemaining <= 0 || discountRate <= 0) {
        alert('Please enter valid positive numbers for all fields.');
        return;
    }

    // Calculate total future payments
    const totalFuturePayments = annualPayment * yearsRemaining;

    // Calculate present value using discount rate
    let presentValue = 0;
    for (let year = 1; year <= yearsRemaining; year++) {
        presentValue += annualPayment / Math.pow(1 + (discountRate / 100), year);
    }

    // Calculate potential loss (difference between total future payments and present value)
    const potentialLoss = totalFuturePayments - presentValue;

    // Calculate suggested minimum offer (typically 85-95% of present value)
    const minOffer = presentValue * 0.9;

    // Display results
    document.getElementById('totalFuturePayments').textContent = '$' + totalFuturePayments.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('presentValue').textContent = '$' + presentValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('potentialLoss').textContent = '$' + potentialLoss.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('minOffer').textContent = '$' + minOffer.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});

    // Show results section
    resultsSection.style.display = 'block';

    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Track calculation event for analytics
    trackEvent('structured_settlement_calculation', {
        settlement_amount: settlementAmount,
        annual_payment: annualPayment,
        years_remaining: yearsRemaining,
        discount_rate: discountRate,
        present_value: presentValue,
        timestamp: new Date().toISOString()
    });
}

/**
 * Reset the calculator to default values
 */
function resetCalculator() {
    document.getElementById('settlementAmount').value = '100000';
    document.getElementById('annualPayment').value = '20000';
    document.getElementById('yearsRemaining').value = '10';
    document.getElementById('discountRate').value = '5.5';
    resultsSection.style.display = 'none';

    // Focus on first input field
    document.getElementById('settlementAmount').focus();
}

/**
 * Format currency for display
 */
function formatCurrency(value) {
    return '$' + parseFloat(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calculatePresentValue, resetCalculator, formatCurrency };
}