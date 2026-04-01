# Insurance Calculator Pages - Lead Wizard Replacement

## Summary
Fixed 13 insurance calculator pages by replacing lead-capture wizards with real working calculators.

## Problem
These pages showed a 3-step lead capture form (ZIP code → coverage type → name/email/phone → PolicyGenius redirect) instead of actual calculators. Users got zero value.

## Solution
Replaced each lead wizard with a real calculator matching the life-insurance-calculator.html design pattern:
- CalcLeap Apple design system (white cards, grid inputs, blue buttons, stat cards)
- Real calculation logic with industry-standard formulas
- Auto-calculate on page load with sensible defaults
- 5 relevant FAQ items per page
- Complete removal of all lead wizard HTML and JavaScript

## Pages Fixed

### 1. boat-insurance-calculator.html
**Inputs:** Boat value, length, type (pontoon/powerboat/sailboat/fishing/jetski/yacht), year built, engine HP, deductible  
**Outputs:** Annual premium, monthly estimate, coverage recommendation (agreed value vs ACV)  
**Formula:** Base = value × 1.5%, type/age/HP/length/deductible multipliers

### 2. business-insurance-calculator.html
**Inputs:** Business type, annual revenue, # employees, industry risk level  
**Outputs:** General Liability, Workers' Comp, BOP bundle estimates  
**Formula:** GL = (revenue/1000) × type rate × risk. WC = payroll rate × industry factor

### 3-4. car-insurance-calculator.html + car-insurance-estimator.html
**Inputs:** Vehicle year/type, driver age, ZIP, coverage type, driving record  
**Outputs:** Monthly premium, annual premium, 6-month policy cost  
**Formula:** Base by coverage level, multipliers for vehicle type/age/driver age/record

### 5. earthquake-insurance-calculator.html
**Inputs:** Home value, seismic zone, foundation type, stories, year built, deductible %  
**Outputs:** Annual premium, deductible amount ($), monthly cost  
**Formula:** Rate per $1K varies by zone, foundation/age/deductible multipliers

### 6. flood-insurance-calculator.html
**Inputs:** Home value, flood zone (A/AE/V/B/C), foundation, building type, coverage amounts  
**Outputs:** NFIP annual premium, monthly cost, private flood estimate  
**Formula:** NFIP-style rates per $100 by zone, foundation/building type multipliers

### 7. long-term-care-insurance-calculator.html
**Inputs:** Age, gender, daily benefit amount, benefit period, elimination period, inflation protection  
**Outputs:** Monthly premium, annual premium, total lifetime benefit  
**Formula:** Base per $100/day escalates exponentially with age, women pay 1.5x

### 8. motorcycle-insurance-calculator.html
**Inputs:** Motorcycle value, engine CC, year, riding experience, coverage type, motorcycle type  
**Outputs:** Monthly premium, annual premium, seasonal savings estimate  
**Formula:** Base by coverage, CC/type/experience/age multipliers (sport bikes 1.6x!)

### 9. pet-insurance-calculator.html
**Inputs:** Pet type, breed size, age, coverage level, deductible, reimbursement rate  
**Outputs:** Monthly premium, annual premium, annual max benefit  
**Formula:** Base (dog $45, cat $30) × breed/age/coverage/deductible/reimbursement factors

### 10. renters-insurance-calculator.html
**Inputs:** Personal property value, deductible, liability coverage, location risk, building type, pets  
**Outputs:** Monthly premium, annual premium, daily cost  
**Formula:** $5.50 per $1K property × risk/building/deductible/liability/pet multipliers

### 11. rv-insurance-calculator.html
**Inputs:** RV type (Class A/B/C/trailer/fifth wheel), value, year, usage, deductible  
**Outputs:** Annual premium, monthly cost, full-time vs recreational comparison  
**Formula:** Base 2% of value × type/usage/age/deductible multipliers

### 12. travel-insurance-calculator.html
**Inputs:** Trip cost, duration, traveler age, destination, # travelers  
**Outputs:** Total premium, per-person cost, % of trip cost  
**Formula:** 4-8% of trip cost × age/duration/destination multipliers × travelers

### 13. umbrella-insurance-calculator.html
**Inputs:** Current auto/home liability, net worth, # properties, # drivers, risk factors  
**Outputs:** Recommended coverage, annual premium, cost per $1M  
**Formula:** First $1M ~$200, additional $1M ~$100, adjusted for properties/drivers/risk

## Verification
- ✅ Zero files contain `lw-step active` (wizard HTML)
- ✅ Zero files contain `lwSubmit_`, `lwNext_`, `lwBack_` (wizard JS)
- ✅ All calculators auto-calculate on page load
- ✅ All pages have 5 relevant FAQ items
- ✅ All pages match CalcLeap design system

## Deployment
Committed and pushed to GitHub (alexchalu/toolpulse main branch).  
Changes deployed via GitHub Pages to calcleap.com.

## Git Commit
```
63536c1d - Replace lead-capture wizards with real calculators on 13 insurance pages
```

Date: 2026-03-30  
Files changed: 13  
Insertions: +1,717  
Deletions: -4,248
