import os
import re

# List of insurance calculators that need rebuilding
insurance_pages = [
    'boat-insurance-calculator.html',
    'business-insurance-calculator.html', 
    'car-insurance-calculator.html',
    'earthquake-insurance-calculator.html',
    'flood-insurance-calculator.html',
    'home-insurance-calculator.html',
    'life-insurance-calculator.html',
    'long-term-care-insurance-calculator.html',
    'motorcycle-insurance-calculator.html',
    'pet-insurance-calculator.html',
    'renters-insurance-calculator.html',
    'rv-insurance-calculator.html',
    'travel-insurance-calculator.html',
    'umbrella-insurance-calculator.html'
]

# Check which ones have the broken multi-step pattern
broken_pages = []
for page in insurance_pages:
    if os.path.exists(page):
        with open(page, 'r') as f:
            content = f.read()
            if 'lw-step-label' in content or 'Step 3 of 3' in content:
                # Check file size - lead wizard pages are bloated
                size = len(content)
                if size > 50000:  # More than 50KB = likely broken
                    broken_pages.append(page)
                    print(f"⚠️  {page} - {size:,} bytes (BLOATED)")
                
print(f"\nFound {len(broken_pages)} bloated insurance pages with lead wizard code")
print("These need rebuilding with clean calculator-only layouts")
