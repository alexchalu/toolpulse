// Personal Injury Settlement Calculator Logic

document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculateBtn');
    const copyResultsBtn = document.getElementById('copyResults');
    const resultsDiv = document.getElementById('results');
    const breakdownDiv = document.getElementById('breakdown');

    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateSettlement);
    }
    if (copyResultsBtn) {
        copyResultsBtn.addEventListener('click', copyResults);
    }

    function calculateSettlement() {
        // Get form values
        const medicalBills = parseFloat(document.getElementById('medicalBills').value) || 0;
        const lostWages = parseFloat(document.getElementById('lostWages').value) || 0;
        const painSuffering = parseFloat(document.getElementById('painSuffering').value) || 5;
        const propertyDamage = parseFloat(document.getElementById('propertyDamage').value) || 0;
        const futureMedical = parseFloat(document.getElementById('futureMedical').value) || 0;
        const injuryType = document.getElementById('injuryType').value;
        const liability = parseFloat(document.getElementById('liability').value) || 100;
        const contingencyFee = parseFloat(document.getElementById('contingencyFee').value) || 33;

        // Calculate multiplier based on injury type
        let multiplier = 1;
        switch(injuryType) {
            case 'minor':
                multiplier = 1.5;
                break;
            case 'moderate':
                multiplier = 3;
                break;
            case 'severe':
                multiplier = 5;
                break;
            case 'catastrophic':
                multiplier = 8;
                break;
        }

        // Calculate pain and suffering multiplier
        const painMultiplier = painSuffering / 2;
        const totalMultiplier = multiplier + painMultiplier;

        // Calculate settlement components
        const specialDamages = medicalBills + lostWages + futureMedical;
        const generalDamages = specialDamages * totalMultiplier;
        const totalSettlement = generalDamages + propertyDamage;
        
        // Apply liability percentage
        const adjustedSettlement = (totalSettlement * liability) / 100;

        // Calculate attorney fees
        const attorneyFee = (adjustedSettlement * contingencyFee) / 100;
        const netSettlement = adjustedSettlement - attorneyFee;

        // Display results
        const resultsHTML = `
            <div class="settlement-result">
                <h3>🎯 Your Estimated Settlement</h3>
                <div class="result-item">
                    <span class="label">Gross Settlement Amount:</span>
                    <span class="value">$${formatCurrency(adjustedSettlement)}</span>
                </div>
                <div class="result-item">
                    <span class="label">Attorney Contingency Fee (${contingencyFee}%):</span>
                    <span class="value">-$${formatCurrency(attorneyFee)}</span>
                </div>
                <div class="result-item total">
                    <span class="label">Your Net Compensation:</span>
                    <span class="value">$${formatCurrency(netSettlement)}</span>
                </div>
                
                <div class="settlement-range">
                    <p><strong>Settlement Range:</strong> $${formatCurrency(adjustedSettlement * 0.7)} - $${formatCurrency(adjustedSettlement * 1.3)}</p>
                    <p><small>Based on negotiation factors and evidence strength</small></p>
                </div>
                
                <div class="disclaimer">
                    <p><em>⚠️ This is an estimate only. Actual settlements vary based on specific circumstances, evidence, jurisdiction, and insurance company policies. 
                    Consult with a personal injury attorney for a professional evaluation of your case.</em></p>
                </div>
            </div>
        `;

        resultsDiv.innerHTML = resultsHTML;

        // Display breakdown
        const breakdownHTML = `
            <div class="settlement-breakdown">
                <h4>📊 Detailed Breakdown</h4>
                
                <div class="breakdown-section">
                    <h5>Special Damages (Economic Losses)</h5>
                    <ul>
                        <li><strong>Medical Bills:</strong> $${formatCurrency(medicalBills)}</li>
                        <li><strong>Lost Wages:</strong> $${formatCurrency(lostWages)}</li>
                        <li><strong>Future Medical Expenses:</strong> $${formatCurrency(futureMedical)}</li>
                        <li><strong>Subtotal Special Damages:</strong> $${formatCurrency(specialDamages)}</li>
                    </ul>
                </div>

                <div class="breakdown-section">
                    <h5>General Damages (Non-Economic)</h5>
                    <ul>
                        <li><strong>Pain & Suffering Rating:</strong> ${painSuffering}/10</li>
                        <li><strong>Injury Type Multiplier:</strong> ${multiplier.toFixed(1)}x</li>
                        <li><strong>Pain & Suffering Multiplier:</strong> ${painMultiplier.toFixed(1)}x</li>
                        <li><strong>Total Multiplier:</strong> ${totalMultiplier.toFixed(1)}x</li>
                        <li><strong>General Damages:</strong> $${formatCurrency(generalDamages)}</li>
                    </ul>
                </div>

                <div class="breakdown-section">
                    <h5>Additional Compensation</h5>
                    <ul>
                        <li><strong>Property Damage:</strong> $${formatCurrency(propertyDamage)}</li>
                        <li><strong>Total Gross Settlement:</strong> $${formatCurrency(totalSettlement)}</li>
                        <li><strong>Liability Adjustment (${liability}%):</strong> $${formatCurrency(adjustedSettlement)}</li>
                    </ul>
                </div>

                <div class="breakdown-section">
                    <h5>Attorney Fees & Net Amount</h5>
                    <ul>
                        <li><strong>Contingency Fee (${contingencyFee}%):</strong> -$${formatCurrency(attorneyFee)}</li>
                        <li><strong>Your Net Compensation:</strong> $${formatCurrency(netSettlement)}</li>
                    </ul>
                </div>
            </div>
        `;

        breakdownDiv.innerHTML = breakdownHTML;

        // Show modal for lead capture after calculation
        setTimeout(() => {
            const modal = document.getElementById('leadModal');
            if (modal) {
                modal.style.display = 'block';
            }
        }, 2000);
    }

    function formatCurrency(amount) {
        return amount.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    function copyResults() {
        const resultsText = resultsDiv.textContent || resultsDiv.innerText;
        navigator.clipboard.writeText(resultsText).then(() => {
            alert('Results copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }

    // Close modal functionality
    const modal = document.getElementById('leadModal');
    const closeBtn = document.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Lead form submission
    const leadForm = document.getElementById('leadForm');
    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('leadEmail').value;
            
            // In a real implementation, this would send to a backend
            alert('Thank you! A personal injury attorney will contact you shortly.');
            modal.style.display = 'none';
            
            // Track conversion
            if (typeof gtag !== 'undefined') {
                gtag('event', 'conversion', {'send_to': 'AW-123456789/AbCdEfGh'});
            }
        });
    }

    // Add some interactive features
    const form = document.getElementById('injuryForm');
    if (form) {
        form.addEventListener('input', function() {
            // Update multiplier display in real-time
            const injuryType = document.getElementById('injuryType').value;
            let multiplier = 1;
            switch(injuryType) {
                case 'minor': multiplier = 1.5; break;
                case 'moderate': multiplier = 3; break;
                case 'severe': multiplier = 5; break;
                case 'catastrophic': multiplier = 8; break;
            }
            
            // You could update a live preview here
        });
    }
});

// Add some CSS for the calculator
const style = document.createElement('style');
style.textContent = `
    .settlement-result {
        background: #f8f9fa;
        padding: 20px;
        border-radius: 8px;
        margin-bottom: 20px;
    }
    
    .result-item {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        border-bottom: 1px solid #e9ecef;
    }
    
    .result-item.total {
        font-weight: bold;
        font-size: 1.2em;
        padding-top: 15px;
        border-top: 2px solid #007bff;
        margin-top: 15px;
    }
    
    .settlement-range {
        background: #e3f2fd;
        padding: 15px;
        border-radius: 8px;
        margin: 15px 0;
        text-align: center;
    }
    
    .disclaimer {
        background: #fff3cd;
        padding: 15px;
        border-radius: 8px;
        margin-top: 20px;
        border-left: 4px solid #ffc107;
    }
    
    .settlement-breakdown {
        background: white;
        padding: 20px;
        border-radius: 8px;
    }
    
    .breakdown-section {
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 1px solid #e9ecef;
    }
    
    .breakdown-section:last-child {
        border-bottom: none;
    }
    
    .legal-content h3 {
        color: #2c3e50;
        margin-top: 0;
    }
    
    .legal-content h4 {
        color: #34495e;
        margin-top: 20px;
    }
    
    .settlement-table {
        width: 100%;
        border-collapse: collapse;
        margin: 15px 0;
    }
    
    .settlement-table th,
    .settlement-table td {
        padding: 12px;
        border: 1px solid #ddd;
        text-align: left;
    }
    
    .settlement-table th {
        background-color: #f8f9fa;
        font-weight: bold;
    }
    
    .settlement-table tr:nth-child(even) {
        background-color: #f9f9f9;
    }
    
    .modal {
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
    }
    
    .modal-content {
        background-color: #fefefe;
        margin: 10% auto;
        padding: 30px;
        border-radius: 10px;
        width: 90%;
        max-width: 500px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    }
    
    .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
    }
    
    .close:hover {
        color: #000;
    }
`;

if (document.head) {
    document.head.appendChild(style);
}
