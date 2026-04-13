// Structured Settlement Calculator JavaScript

function calculateSettlement() {
    // Get input values
    const settlementAmount = parseFloat(document.getElementById('settlementAmount').value) || 0;
    const annualPayment = parseFloat(document.getElementById('annualPayment').value) || 0;
    const paymentYears = parseInt(document.getElementById('paymentYears').value) || 0;
    const discountRate = parseFloat(document.getElementById('discountRate').value) || 0;
    const inflationRate = parseFloat(document.getElementById('inflationRate').value) || 0;
    const paymentFrequency = document.getElementById('paymentFrequency').value;
    
    // Calculate number of payments based on frequency
    let paymentsPerYear = 1;
    switch(paymentFrequency) {
        case 'semi-annual': paymentsPerYear = 2; break;
        case 'quarterly': paymentsPerYear = 4; break;
        case 'monthly': paymentsPerYear = 12; break;
        default: paymentsPerYear = 1;
    }
    
    const totalPayments = paymentYears * paymentsPerYear;
    
    // Calculate present value for each payment
    let presentValue = 0;
    let totalFutureValue = 0;
    let cumulativeValue = 0;
    const paymentSchedule = [];
    
    for (let i = 0; i < totalPayments; i++) {
        const year = Math.floor(i / paymentsPerYear) + 1;
        const paymentAmount = annualPayment / paymentsPerYear;
        
        // Calculate present value for this payment
        const periods = i / paymentsPerYear;
        const pvFactor = Math.pow(1 + (discountRate / 100), periods);
        const pv = paymentAmount / pvFactor;
        
        presentValue += pv;
        totalFutureValue += paymentAmount;
        cumulativeValue += pv;
        
        paymentSchedule.push({
            year: year,
            paymentAmount: paymentAmount.toFixed(2),
            presentValue: pv.toFixed(2),
            cumulativeValue: cumulativeValue.toFixed(2)
        });
    }
    
    // Calculate effective rate
    const effectiveRate = ((presentValue / totalFutureValue) - 1) * 100;
    
    // Calculate average annual return
    const avgAnnualReturn = (Math.pow(totalFutureValue / settlementAmount, 1 / paymentYears) - 1) * 100;
    
    // Calculate break-even year
    let breakEvenYear = 'N/A';
    let cumulativePayments = 0;
    for (let i = 0; i < paymentSchedule.length; i++) {
        cumulativePayments += parseFloat(paymentSchedule[i].paymentAmount);
        if (cumulativePayments >= presentValue) {
            breakEvenYear = paymentSchedule[i].year;
            break;
        }
    }
    
    // Calculate lump sum offer comparison (typically 60-90% of present value)
    const lumpSumOffer = presentValue * 0.75; // Conservative estimate
    const valueDifference = lumpSumOffer - presentValue;
    
    // Display results
    document.getElementById('totalFuturePayments').textContent = '$' + totalFutureValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('presentValue').textContent = '$' + presentValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('totalDiscount').textContent = '$' + (totalFutureValue - presentValue).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('effectiveRate').textContent = effectiveRate.toFixed(2) + '%';
    document.getElementById('lumpSumOffer').textContent = '$' + lumpSumOffer.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('presentValueComparison').textContent = '$' + presentValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('valueDifference').textContent = '$' + Math.abs(valueDifference).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('numPayments').textContent = totalPayments;
    document.getElementById('totalPaymentsMade').textContent = '$' + totalFutureValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('avgAnnualReturn').textContent = avgAnnualReturn.toFixed(2) + '%';
    document.getElementById('breakEvenYear').textContent = breakEvenYear;
    
    // Populate payment table
    const tbody = document.getElementById('paymentTableBody');
    tbody.innerHTML = '';
    
    paymentSchedule.forEach(payment => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${payment.year}</td>
            <td>$${payment.paymentAmount}</td>
            <td>$${payment.presentValue}</td>
            <td>$${payment.cumulativeValue}</td>
        `;
        tbody.appendChild(row);
    });
    
    // Update chart
    updateComparisonChart(totalFutureValue, presentValue, lumpSumOffer);
    
    // Show results
    document.getElementById('resultsContainer').style.display = 'block';
    
    // Scroll to results
    document.getElementById('resultsContainer').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function updateComparisonChart(totalFuture, presentValue, lumpSum) {
    const ctx = document.getElementById('comparisonChart').getContext('2d');
    
    if (window.comparisonChart) {
        window.comparisonChart.destroy();
    }
    
    window.comparisonChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Total Future Payments', 'Present Value', 'Lump Sum Offer (75%)'],
            datasets: [{
                label: 'Dollar Amount ($)',
                data: [totalFuture, presentValue, lumpSum],
                backgroundColor: [
                    'rgba(52, 152, 219, 0.8)',
                    'rgba(39, 174, 96, 0.8)',
                    'rgba(231, 76, 60, 0.8)'
                ],
                borderColor: [
                    'rgba(52, 152, 219, 1)',
                    'rgba(39, 174, 96, 1)',
                    'rgba(231, 76, 60, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return '$' + context.parsed.y.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
                        }
                    }
                }
            }
        }
    });
}

function resetCalculator() {
    document.getElementById('settlementAmount').value = '100000';
    document.getElementById('annualPayment').value = '20000';
    document.getElementById('paymentYears').value = '10';
    document.getElementById('discountRate').value = '5.5';
    document.getElementById('inflationRate').value = '2.5';
    document.getElementById('paymentFrequency').value = 'annual';
    document.getElementById('resultsContainer').style.display = 'none';
    document.getElementById('paymentTableBody').innerHTML = '';
}

function searchCalculators() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    if (query) {
        window.location.href = '/search.html?q=' + encodeURIComponent(query);
    }
}

// Add event listeners
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calculateSettlement, resetCalculator };
}
