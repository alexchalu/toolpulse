#!/usr/bin/env python3
"""Check content quality signals on all CalcLeap pages for AdSense approval."""

import os
import re
import sys
from collections import defaultdict

TOOLPULSE = "/data/workspace/toolpulse"

# Extract URLs from sitemap and convert to file paths
def get_pages_from_sitemap():
    sitemap_path = os.path.join(TOOLPULSE, "sitemap.xml")
    with open(sitemap_path, "r") as f:
        content = f.read()
    urls = re.findall(r'<loc>(https://calcleap\.com/(.+?))</loc>', content)
    pages = []
    for full_url, path in urls:
        filepath = os.path.join(TOOLPULSE, path)
        pages.append((path, filepath))
    return pages

# Determine page category from filename
def categorize_page(filename):
    fn = filename.lower()
    
    # Skip non-calculator pages
    skip_pages = ['index.html', 'about.html', 'contact.html', 'privacy.html', 'terms.html',
                  'api-docs.html', 'TEMPLATE.html', 'embed.html', 'embed-generator.html']
    if filename in skip_pages:
        return 'skip'
    
    # Blog pages
    if fn.startswith('blog/'):
        return 'blog'
    
    # Tax pages
    tax_keywords = ['tax', '1099', 'payroll', 'capital-gains', 'mileage-deduction', 
                    'home-office-deduction', 'business-deduction', 'llc-tax', 's-corp-tax',
                    'quarterly-tax', 'federal-income']
    for kw in tax_keywords:
        if kw in fn:
            return 'tax'
    
    # Health/BMI pages
    health_keywords = ['bmi', 'calorie', 'body-fat', 'ideal-weight', 'health-savings',
                       'hsa', 'cobra', 'medicare', 'prescription', 'dental-insurance',
                       'health-insurance', 'medical', 'therapy-cost', 'surgery-cost',
                       'ivf-cost', 'childbirth', 'er-visit', 'long-term-care']
    for kw in health_keywords:
        if kw in fn:
            return 'health'
    
    # Insurance pages
    insurance_keywords = ['insurance', 'renters-insurance']
    for kw in insurance_keywords:
        if kw in fn:
            return 'insurance'
    
    # Mortgage/Real Estate pages
    mortgage_keywords = ['mortgage', 'heloc', 'home-equity', 'home-value', 'home-appreciation',
                         'property', 'closing-cost', 'fha-loan', 'va-loan', 'jumbo-loan',
                         'house-flip', 'reverse-mortgage', 'rent-vs-buy', 'rental-income',
                         'rental-property', 'cash-out-refinance', 'cap-rate', 'noi-',
                         'real-estate', 'home-addition', 'home-energy']
    for kw in mortgage_keywords:
        if kw in fn:
            return 'mortgage'
    
    # Retirement/Investment pages
    retire_keywords = ['401k', '403b', '457', 'roth', 'ira', 'retirement', 'pension',
                       'annuity', 'social-security', 'required-minimum', 'backdoor-roth',
                       'mega-backdoor', 'sep-ira', 'simple-ira', 'early-retirement']
    for kw in retire_keywords:
        if kw in fn:
            return 'retirement'
    
    # Investment pages
    invest_keywords = ['compound-interest', 'dividend', 'investment', 'dollar-cost',
                       'bitcoin', 'ethereum', 'crypto', 'dogecoin', 'stock-portfolio',
                       'bond-yield', 'roi-calculator']
    for kw in invest_keywords:
        if kw in fn:
            return 'investment'
    
    # Loan/Debt pages
    loan_keywords = ['loan', 'debt', 'credit-card', 'balance-transfer', 'bankruptcy',
                     'garnishment', 'insolvency', 'collection-agency', 'foreclosure',
                     'repossession', 'short-sale', 'deed-in-lieu', 'payday', 'title-loan',
                     'credit-utilization', 'minimum-payment', 'credit-counseling',
                     'nonprofit-debt', 'debt-validation', 'judgment']
    for kw in loan_keywords:
        if kw in fn:
            return 'loan'
    
    # Conversion pages
    if fn.startswith('convert') or fn.startswith('convert/'):
        return 'conversion'
    
    # Cost of living pages
    if 'cost-of-living' in fn or fn.startswith('col/'):
        return 'cost_of_living'
    
    # Compare salary pages
    if fn.startswith('compare/') and 'salary' in fn:
        return 'salary_compare'
    
    # Compare tax pages
    if fn.startswith('compare-') and 'taxes' in fn:
        return 'tax_compare'
    
    # State tax hub pages
    state_tax_hub = ['-tax.html']
    for kw in state_tax_hub:
        if fn.endswith(kw) and not fn.endswith('-income-tax.html') and not fn.endswith('-property-tax.html') and not fn.endswith('-sales-tax.html'):
            return 'tax'
    
    # Car/Vehicle pages
    car_keywords = ['car-', 'auto-', 'vehicle', 'car-mpg', 'ev-vs-gas', 'lease-vs-buy',
                    'gas-savings']
    for kw in car_keywords:
        if kw in fn:
            return 'auto'
    
    # Business pages
    biz_keywords = ['business', 'startup', 'break-even', 'cash-flow', 'conversion-rate',
                    'customer-lifetime', 'gross-profit', 'inventory-turnover', 'revenue-per',
                    'invoice', 'freelance-rate']
    for kw in biz_keywords:
        if kw in fn:
            return 'business'
    
    # Family/Legal pages
    family_keywords = ['divorce', 'child-support', 'alimony', 'custody', 'prenup', 'postnup',
                       'adoption', 'guardianship', 'marital', 'spousal', 'legal-separation',
                       'mediation', 'domestic-partnership', 'paternity', 'retirement-division',
                       'wedding']
    for kw in family_keywords:
        if kw in fn:
            return 'family_legal'
    
    # Legal/Settlement pages
    legal_keywords = ['settlement', 'malpractice', 'personal-injury', 'workers-comp',
                      'wrongful-death', 'mesothelioma', 'slip-and-fall', 'car-accident',
                      'ssdi']
    for kw in legal_keywords:
        if kw in fn:
            return 'legal'
    
    # Dev/Tech tools
    tech_keywords = ['json', 'css-minifier', 'javascript-minifier', 'base64', 'hash',
                     'html-encoder', 'regex', 'markdown', 'lorem-ipsum', 'diff-checker',
                     'url-encoder', 'image-to-base64', 'number-base', 'uuid', 'qr-code',
                     'password-generator', 'word-counter', 'text-case', 'color-converter',
                     'unix-timestamp', 'embed-generator']
    for kw in tech_keywords:
        if kw in fn:
            return 'tech_tool'
    
    # Date/Time tools
    date_keywords = ['age-calculator', 'days-between', 'add-days', 'week-number',
                     'timezone', 'countdown']
    for kw in date_keywords:
        if kw in fn:
            return 'date_time'
    
    # Math tools
    math_keywords = ['percentage', 'unit-converter', 'recipe-scal']
    for kw in math_keywords:
        if kw in fn:
            return 'math'
    
    # Energy/Utility pages
    energy_keywords = ['electricity', 'solar', 'propane', 'natural-gas', 'air-conditioning',
                       'home-energy-audit', 'water-heater', 'energy-cost']
    for kw in energy_keywords:
        if kw in fn:
            return 'energy'
    
    # Home improvement
    home_keywords = ['bathroom-remodel', 'kitchen-remodel', 'roof-replacement', 'fence-cost',
                     'flooring', 'painting-cost', 'deck-cost', 'concrete', 'window-replacement',
                     'hvac', 'home-addition']
    for kw in home_keywords:
        if kw in fn:
            return 'home_improvement'
    
    # Education
    edu_keywords = ['college', 'student-loan', 'fafsa', 'grad-plus', 'parent-plus',
                    'income-driven-repayment', '529']
    for kw in edu_keywords:
        if kw in fn:
            return 'education'
    
    # Savings
    savings_keywords = ['savings', 'best-savings', 'best-credit']
    for kw in savings_keywords:
        if kw in fn:
            return 'savings'
    
    # Salary/Income
    salary_keywords = ['salary', 'paycheck', 'hourly', 'income-tax-calculator', 'net-pay',
                       'airbnb-income']
    for kw in salary_keywords:
        if kw in fn:
            return 'salary'
    
    return 'other'

# Methodology keywords that indicate specific categories
METHODOLOGY_INDICATORS = {
    'health': ['CDC', 'BMI', 'body mass', 'WHO', 'NIH', 'calorie', 'metabolic', 'health',
               'clinical', 'medical', 'dietary', 'nutrition', 'body fat', 'weight'],
    'tax': ['IRS', 'tax bracket', 'tax rate', 'standard deduction', 'itemized', 'W-2', '1099',
            'Schedule C', 'FICA', 'marginal rate', 'progressive tax', 'tax code', 'Internal Revenue',
            'tax law', 'taxable income'],
    'mortgage': ['amortization', 'PMI', 'down payment', 'interest rate', 'APR', 'LTV',
                 'loan-to-value', 'PITI', 'escrow', 'principal', 'Freddie Mac', 'Fannie Mae',
                 'mortgage rate'],
    'insurance': ['premium', 'deductible', 'coverage', 'underwriting', 'actuarial', 'policy',
                  'claim', 'liability', 'NAIC'],
    'investment': ['compound interest', 'annual return', 'yield', 'portfolio', 'diversification',
                   'S&P', 'market', 'stock', 'bond', 'dividend'],
    'retirement': ['401(k)', '403(b)', 'IRA', 'Roth', 'contribution limit', 'RMD', 
                   'Social Security', 'pension', 'vesting'],
    'conversion': ['conversion factor', 'metric', 'imperial', 'unit', 'formula'],
}

def check_methodology_mismatch(page_category, methodology_text):
    """Check if methodology text matches the page category."""
    if not methodology_text:
        return None
    
    mt = methodology_text.lower()
    mismatches = []
    
    # Specific mismatch checks
    if page_category == 'tax':
        if any(w.lower() in mt for w in ['CDC', 'BMI', 'body mass', 'WHO', 'calorie', 'metabolic']):
            mismatches.append("Tax page has health/BMI methodology")
        if any(w.lower() in mt for w in ['amortization', 'PMI', 'down payment', 'LTV', 'PITI']):
            if 'deduction' not in mt and 'tax' not in mt:
                mismatches.append("Tax page has mortgage methodology")
    
    elif page_category == 'mortgage':
        if any(w.lower() in mt for w in ['CDC', 'BMI', 'body mass', 'calorie', 'metabolic']):
            mismatches.append("Mortgage page has health/BMI methodology")
        if 'tax bracket' in mt and 'property tax' not in mt and 'mortgage' not in mt:
            mismatches.append("Mortgage page has income tax methodology")
    
    elif page_category == 'health':
        if any(w.lower() in mt for w in ['amortization', 'PMI', 'mortgage', 'PITI']):
            mismatches.append("Health page has mortgage methodology")
        if 'tax bracket' in mt or 'irs' in mt:
            if 'hsa' not in mt and 'health savings' not in mt and 'tax' not in mt:
                mismatches.append("Health page has tax methodology")
    
    elif page_category == 'insurance':
        if any(w.lower() in mt for w in ['CDC', 'BMI', 'body mass', 'calorie']):
            if 'health insurance' not in mt and 'medical' not in mt:
                mismatches.append("Insurance page has health/BMI methodology")
        if 'tax bracket' in mt:
            mismatches.append("Insurance page has tax methodology")
    
    elif page_category == 'conversion':
        if any(w.lower() in mt for w in ['tax bracket', 'irs', 'amortization', 'bmi', 'cdc']):
            mismatches.append("Conversion page has unrelated methodology")
    
    elif page_category == 'auto':
        if any(w.lower() in mt for w in ['CDC', 'BMI', 'body mass', 'calorie']):
            mismatches.append("Auto page has health methodology")
    
    elif page_category == 'family_legal' or page_category == 'legal':
        if any(w.lower() in mt for w in ['CDC', 'BMI', 'body mass', 'calorie', 'metabolic']):
            mismatches.append("Legal page has health/BMI methodology")
    
    elif page_category == 'energy':
        if any(w.lower() in mt for w in ['CDC', 'BMI', 'body mass', 'tax bracket']):
            mismatches.append("Energy page has unrelated methodology")
    
    elif page_category == 'home_improvement':
        if any(w.lower() in mt for w in ['CDC', 'BMI', 'body mass', 'tax bracket', 'irs']):
            mismatches.append("Home improvement page has unrelated methodology")
    
    elif page_category == 'business':
        if any(w.lower() in mt for w in ['CDC', 'BMI', 'body mass', 'calorie']):
            mismatches.append("Business page has health methodology")
    
    elif page_category == 'date_time':
        if any(w.lower() in mt for w in ['CDC', 'BMI', 'tax bracket', 'amortization']):
            mismatches.append("Date/time page has unrelated methodology")
    
    elif page_category == 'tech_tool':
        if any(w.lower() in mt for w in ['CDC', 'BMI', 'tax bracket', 'amortization', 'calorie']):
            mismatches.append("Tech tool page has unrelated methodology")
    
    elif page_category == 'cost_of_living':
        if any(w.lower() in mt for w in ['CDC', 'BMI', 'body mass', 'calorie']):
            mismatches.append("Cost of living page has health methodology")
    
    elif page_category == 'salary' or page_category == 'salary_compare':
        if any(w.lower() in mt for w in ['CDC', 'BMI', 'body mass', 'calorie']):
            mismatches.append("Salary page has health methodology")
    
    elif page_category == 'education':
        if any(w.lower() in mt for w in ['CDC', 'BMI', 'body mass', 'calorie', 'amortization']):
            mismatches.append("Education page has unrelated methodology")
    
    return mismatches if mismatches else None

def check_page(filepath, filename):
    issues = []
    
    if not os.path.exists(filepath):
        issues.append(f"MISSING_FILE | {filename} | File does not exist")
        return issues
    
    with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
        content = f.read()
    
    category = categorize_page(filename)
    if category == 'skip':
        return issues
    
    # 1. Check author byline
    byline_count = content.count('CalcLeap Editorial Team')
    if byline_count == 0:
        issues.append(f"MISSING_BYLINE | {filename} | No 'CalcLeap Editorial Team' byline found")
    elif byline_count > 1:
        issues.append(f"DUPLICATE_BYLINE | {filename} | 'CalcLeap Editorial Team' appears {byline_count} times")
    
    # Check for the review text
    review_count = content.count('Reviewed by certified professionals')
    if review_count == 0:
        issues.append(f"MISSING_REVIEW | {filename} | No 'Reviewed by certified professionals' text found")
    elif review_count > 1:
        issues.append(f"DUPLICATE_REVIEW | {filename} | Review text appears {review_count} times")
    
    # 2. Check methodology section
    methodology_count = len(re.findall(r'How We Calculate This', content, re.IGNORECASE))
    if methodology_count == 0:
        issues.append(f"MISSING_METHODOLOGY | {filename} | No 'How We Calculate This' section found")
    elif methodology_count > 1:
        issues.append(f"DUPLICATE_METHODOLOGY | {filename} | 'How We Calculate This' appears {methodology_count} times")
    
    # 3. Check sources section
    sources_count = len(re.findall(r'Sources\s*(?:&amp;|&)\s*References', content, re.IGNORECASE))
    if sources_count == 0:
        issues.append(f"MISSING_SOURCES | {filename} | No 'Sources & References' section found")
    elif sources_count > 1:
        issues.append(f"DUPLICATE_SOURCES | {filename} | 'Sources & References' appears {sources_count} times")
    
    # Check for https links in sources section
    if sources_count > 0:
        # Extract sources section content
        sources_match = re.search(r'Sources\s*(?:&amp;|&)\s*References(.*?)(?:</section|</div|<footer|<section)', 
                                   content, re.IGNORECASE | re.DOTALL)
        if sources_match:
            sources_text = sources_match.group(1)
            https_links = re.findall(r'href="(https://[^"]+)"', sources_text)
            if len(https_links) == 0:
                issues.append(f"NO_SOURCE_LINKS | {filename} | Sources section has no https links")
    
    # 4. Check methodology mismatch
    if methodology_count > 0:
        # Extract methodology section content
        meth_match = re.search(r'How We Calculate This(.*?)(?:</section|</div>.*?<(?:section|div|footer)|Sources\s*(?:&amp;|&)\s*References)', 
                                content, re.IGNORECASE | re.DOTALL)
        if meth_match:
            meth_text = meth_match.group(1)
            mismatches = check_methodology_mismatch(category, meth_text)
            if mismatches:
                for m in mismatches:
                    issues.append(f"METHODOLOGY_MISMATCH | {filename} | {m} (category: {category})")
    
    # 5. Check layout issues - methodology/sources inside wrong elements
    
    # Check if methodology is inside a <script> tag
    script_blocks = re.findall(r'<script[^>]*>(.*?)</script>', content, re.DOTALL | re.IGNORECASE)
    for block in script_blocks:
        if 'How We Calculate This' in block:
            issues.append(f"LAYOUT_BROKEN | {filename} | Methodology section is inside a <script> tag")
        if 'Sources' in block and 'References' in block:
            issues.append(f"LAYOUT_BROKEN | {filename} | Sources section is inside a <script> tag")
    
    # Check if methodology is inside <nav>
    nav_blocks = re.findall(r'<nav[^>]*>(.*?)</nav>', content, re.DOTALL | re.IGNORECASE)
    for block in nav_blocks:
        if 'How We Calculate This' in block:
            issues.append(f"LAYOUT_BROKEN | {filename} | Methodology section is inside <nav>")
        if 'Sources' in block and 'References' in block:
            issues.append(f"LAYOUT_BROKEN | {filename} | Sources section is inside <nav>")
    
    # Check if methodology is inside <footer> (the page footer, not a section footer)
    footer_blocks = re.findall(r'<footer[^>]*class="[^"]*(?:site-footer|main-footer|page-footer)[^"]*"[^>]*>(.*?)</footer>', 
                                content, re.DOTALL | re.IGNORECASE)
    for block in footer_blocks:
        if 'How We Calculate This' in block:
            issues.append(f"LAYOUT_BROKEN | {filename} | Methodology section is inside page footer")
        if 'Sources' in block and 'References' in block:
            issues.append(f"LAYOUT_BROKEN | {filename} | Sources section is inside page footer")
    
    # Check if there's a footer tag that contains methodology (simpler check)
    # Look for pattern: <footer ...>...How We Calculate...</footer>
    footer_all = re.findall(r'<footer\b[^>]*>(.*?)</footer>', content, re.DOTALL | re.IGNORECASE)
    for block in footer_all:
        if 'How We Calculate This' in block:
            issues.append(f"LAYOUT_WARNING | {filename} | Methodology found inside a <footer> element")
            break
    
    return issues

def main():
    pages = get_pages_from_sitemap()
    print(f"Found {len(pages)} pages in sitemap.xml")
    print()
    
    all_issues = []
    pages_checked = 0
    pages_with_issues = 0
    
    # Count stats
    missing_byline = 0
    missing_methodology = 0
    missing_sources = 0
    methodology_mismatch = 0
    layout_issues = 0
    missing_files = 0
    
    for path, filepath in pages:
        issues = check_page(filepath, path)
        if issues:
            pages_with_issues += 1
            all_issues.extend(issues)
        pages_checked += 1
    
    # Print all issues
    print("=" * 100)
    print("ALL ISSUES FOUND")
    print("=" * 100)
    
    for issue in all_issues:
        print(issue)
        parts = issue.split(' | ')
        issue_type = parts[0]
        if 'MISSING_FILE' in issue_type:
            missing_files += 1
        elif 'BYLINE' in issue_type or 'REVIEW' in issue_type:
            missing_byline += 1
        elif 'METHODOLOGY_MISMATCH' in issue_type:
            methodology_mismatch += 1
        elif 'METHODOLOGY' in issue_type:
            missing_methodology += 1
        elif 'SOURCES' in issue_type or 'SOURCE_LINKS' in issue_type:
            missing_sources += 1
        elif 'LAYOUT' in issue_type:
            layout_issues += 1
    
    print()
    print("=" * 100)
    print("SUMMARY")
    print("=" * 100)
    print(f"Pages checked: {pages_checked}")
    print(f"Pages with issues: {pages_with_issues}")
    print(f"Total issues: {len(all_issues)}")
    print(f"  Missing files: {missing_files}")
    print(f"  Byline/Review issues: {missing_byline}")
    print(f"  Methodology issues: {missing_methodology}")
    print(f"  Methodology mismatches: {methodology_mismatch}")
    print(f"  Sources issues: {missing_sources}")
    print(f"  Layout issues: {layout_issues}")

if __name__ == '__main__':
    main()
