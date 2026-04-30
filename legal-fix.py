#!/usr/bin/env python3
"""
Legal protection fixes for CalcLeap:
1. Add calculator disclaimers (category-specific)
2. Add cookie consent banner
3. Strengthen lead form consent language
"""
import re
import glob
import os

def categorize_page(filepath, html):
    """Determine what type of disclaimer this page needs."""
    path = filepath.lower()
    content = html.lower()
    
    if 'insurance' in path:
        return 'insurance'
    elif 'tax' in path or 'income-tax' in path or '1099' in path or 'payroll' in path:
        return 'tax'
    elif any(x in path for x in ['bmi', 'calorie', 'body-fat', 'pregnancy', 'sleep', 'bac', 'health', 'heart-rate', 'blood-pressure', 'ideal-weight']):
        return 'health'
    elif any(x in path for x in ['mortgage', 'loan', 'debt', 'retirement', 'compound', 'investment', 'roi', '401k', 'roth', 'savings', 'interest', 'payment', 'amortization', 'heloc', 'refinance', 'bitcoin', 'crypto', 'ethereum']):
        return 'finance'
    elif 'calculator' in path or 'calc' in path:
        return 'general'
    elif '<input' in content or '<select' in content:
        return 'general'
    return None

DISCLAIMERS = {
    'finance': '<div class="calc-disclaimer" style="margin:1.5rem 0;padding:1rem 1.25rem;background:#fff8e1;border-left:4px solid #f59e0b;border-radius:0 8px 8px 0;font-size:.85rem;line-height:1.6;color:#92400e"><strong>⚠️ Disclaimer:</strong> This calculator provides estimates for educational and informational purposes only. Results are not financial advice and should not be relied upon for making financial decisions. Actual results may vary based on individual circumstances, market conditions, and other factors. Always consult a qualified financial advisor, CPA, or licensed professional before making financial decisions. CalcLeap is not a financial institution and does not provide financial advisory services.</div>',
    
    'insurance': '<div class="calc-disclaimer" style="margin:1.5rem 0;padding:1rem 1.25rem;background:#fff8e1;border-left:4px solid #f59e0b;border-radius:0 8px 8px 0;font-size:.85rem;line-height:1.6;color:#92400e"><strong>⚠️ Disclaimer:</strong> This calculator provides rough estimates for educational purposes only. Actual insurance premiums vary significantly based on your specific circumstances, claims history, coverage options, and insurer. These estimates are not quotes and do not guarantee any rate or coverage. Always obtain official quotes from licensed insurance agents or carriers. CalcLeap is not an insurance company, broker, or agent and does not sell, solicit, or negotiate insurance.</div>',
    
    'health': '<div class="calc-disclaimer" style="margin:1.5rem 0;padding:1rem 1.25rem;background:#fff8e1;border-left:4px solid #f59e0b;border-radius:0 8px 8px 0;font-size:.85rem;line-height:1.6;color:#92400e"><strong>⚠️ Disclaimer:</strong> This calculator is for informational and educational purposes only. Results are not medical advice and should not be used to diagnose, treat, or prevent any health condition. Individual health needs vary. Always consult a qualified healthcare provider or physician before making health-related decisions. CalcLeap does not provide medical services or advice.</div>',
    
    'tax': '<div class="calc-disclaimer" style="margin:1.5rem 0;padding:1rem 1.25rem;background:#fff8e1;border-left:4px solid #f59e0b;border-radius:0 8px 8px 0;font-size:.85rem;line-height:1.6;color:#92400e"><strong>⚠️ Disclaimer:</strong> This calculator provides estimates for educational purposes only and is not tax advice. Tax laws are complex and change frequently. Results may not reflect your actual tax liability. Always consult a qualified CPA, tax attorney, or enrolled agent for tax advice specific to your situation. CalcLeap is not a tax preparation service and does not file taxes.</div>',
    
    'general': '<div class="calc-disclaimer" style="margin:1.5rem 0;padding:1rem 1.25rem;background:#fff8e1;border-left:4px solid #f59e0b;border-radius:0 8px 8px 0;font-size:.85rem;line-height:1.6;color:#92400e"><strong>⚠️ Disclaimer:</strong> This tool provides estimates for informational and educational purposes only. Results may not reflect actual values and should be verified independently. CalcLeap makes no warranties regarding the accuracy or completeness of any calculations. Use at your own discretion.</div>'
}

COOKIE_BANNER = '''<div id="clCookieConsent" style="display:none;position:fixed;bottom:0;left:0;right:0;background:#1a1a2e;color:#e0e0e0;padding:1rem 1.5rem;z-index:99999;font-size:.875rem;line-height:1.5;box-shadow:0 -2px 10px rgba(0,0,0,.3);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.75rem">
<p style="margin:0;flex:1;min-width:250px">We use cookies for analytics and advertising (Google AdSense). By continuing to use this site, you consent to our use of cookies. <a href="/privacy.html" style="color:#6366f1;text-decoration:underline">Privacy Policy</a></p>
<div style="display:flex;gap:.5rem;flex-shrink:0">
<button onclick="document.getElementById(\'clCookieConsent\').style.display=\'none\';localStorage.setItem(\'clCookieOk\',\'1\')" style="background:#6366f1;color:#fff;border:none;padding:.5rem 1.25rem;border-radius:6px;cursor:pointer;font-size:.875rem;font-weight:600">Accept</button>
<button onclick="document.getElementById(\'clCookieConsent\').style.display=\'none\';localStorage.setItem(\'clCookieOk\',\'0\')" style="background:transparent;color:#9ca3af;border:1px solid #4b5563;padding:.5rem 1rem;border-radius:6px;cursor:pointer;font-size:.875rem">Decline</button>
</div>
</div>
<script>if(!localStorage.getItem('clCookieOk')){document.getElementById('clCookieConsent').style.display='flex'}</script>'''

def fix_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
            html = f.read()
    except:
        return False
    
    original = html
    
    # Skip non-page files
    if '<html' not in html:
        return False
    
    # 1. Add category-specific disclaimer before footer (if not already present)
    if 'calc-disclaimer' not in html:
        category = categorize_page(filepath, html)
        if category and category in DISCLAIMERS:
            disclaimer = DISCLAIMERS[category]
            # Insert before footer
            if '<footer' in html:
                html = html.replace('<footer', disclaimer + '\n<footer', 1)
    
    # 2. Add cookie consent banner before </body> (if not already present)
    if 'clCookieConsent' not in html and '</body>' in html:
        html = html.replace('</body>', COOKIE_BANNER + '\n</body>', 1)
    
    # 3. Strengthen lead form consent (on insurance pages with forms)
    # Replace weak consent with stronger TCPA-compliant language
    old_consent = 'By clicking, you agree to be contacted by licensed agents. No obligation. Unsubscribe anytime.'
    new_consent = 'By submitting this form, you provide express written consent to be contacted by licensed insurance agents at the phone number and email provided, including via automated calls/texts. This is not a condition of purchase. You may revoke consent anytime. <a href="/privacy.html" style="color:inherit;text-decoration:underline">Privacy Policy</a> · <a href="/terms.html" style="color:inherit;text-decoration:underline">Terms</a>'
    
    if old_consent in html:
        html = html.replace(old_consent, new_consent)
    
    if html != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html)
        return True
    return False

# Process all files
html_files = glob.glob('**/*.html', recursive=True)
total = len(html_files)
fixed = 0

print(f"Adding legal protections to {total} files...")

for i, f in enumerate(html_files):
    if fix_file(f):
        fixed += 1
    if (i+1) % 500 == 0:
        print(f"  {i+1}/{total} processed, {fixed} fixed...")

print(f"\n=== COMPLETE ===")
print(f"Total: {total}")
print(f"Modified: {fixed}")
