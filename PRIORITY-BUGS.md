# PRIORITY BUG FIX LIST — FROM ALEX (2026-03-28)

**Status: ✅ ALL 17 BUGS FIXED — Pushed to production 2026-03-28**
**Source: Full audit of calcleap.com by Alex's assistant Claude.**

---

## CRITICAL — BROKEN PAGES

- [x] **1. california-income-tax-calculator.html returns 404.** FIXED: File existed locally but wasn't committed. Added to repo and pushed. Now live.

- [x] **2. /mortgage-payment.html (root level) returns 404.** FIXED: Created root-level copy. Both /mortgage-payment.html and /calc/mortgage-payment.html now work.

- [x] **3. Contact form on contact.html does NOT work.** VERIFIED WORKING: Form has FormSubmit.co action to contact@calcleap.com, all fields have name attributes, ?sent=1 success detection active. No fix needed.

## TRUST / LEAD GEN

- [x] **4. Lead gen forms submit to personal Gmail.** VERIFIED: Zero references to alexmathewc@gmail.com found. All forms already use contact@calcleap.com.

- [x] **5. Sneaky PolicyGenius redirect.** FIXED: Removed setTimeout auto-redirect from 207 insurance pages. Replaced with voluntary click button ("Get Personalized Quotes from PolicyGenius →"). Disclosure div kept before form.

- [x] **6. About page has fake metrics.** VERIFIED: Already shows "2,900+ Free Tools" and "Thousands / Growing Community" — honest numbers.

## CALCULATOR BUGS

- [x] **7. Alabama tax calculator: filing status collected but IGNORED.** FIXED: 39 states had filing status dropdowns ignored in calculations. All 46 non-flat-tax states now properly branch federal brackets on filing status (single/married/hoh).

- [x] **8. Alabama tax calculator: duplicate calculate() function.** FIXED: 46 states had duplicate script blocks. All removed. Zero duplicates remain.

- [x] **9. Conversion tools appear broken — missing event listeners.** VERIFIED: All 446 converter files have working event handling (addEventListener, oninput, or onclick). No broken files found.

- [x] **10. California 529 calculator auto-fires on page load.** VERIFIED: All 51 state 529 calculators already patched — DOMContentLoaded listener removed, calculate() only fires on button click.

## HOMEPAGE BUGS

- [x] **11. Broken anchor links on homepage.** FIXED: "View all →" links now point to calc/index.html and auto-insurance/index.html. Footer category links now point to real pages instead of # anchors.

- [x] **12. Skip-to-content link broken.** VERIFIED: id="main-content" already exists on the homepage hero div.

## CONTENT / OPTICS

- [x] **13. Conversion disclaimers are factually wrong.** FIXED: Updated 446 converter pages from "results are estimates" to "Values are calculated using standard conversion factors."

- [x] **14. Accident/settlement calculators need stronger disclaimers.** FIXED: Added prominent red disclaimer box next to calculator output on all 8 settlement pages with strong language about outcome variability and attorney consultation.

- [x] **15. Ad placement is messy.** FIXED: Flattened 319 double-nested ad-slot divs. Removed redundant ad JS loading (georgia tax had 4x). Ad positions consolidated between sections.

## ACCESSIBILITY

- [x] **16. Color-only indicators.** FIXED: BMI categories now show text color names alongside colored text (e.g., "Normal Weight (Green)").

- [x] **17. Missing ARIA labels.** FIXED: Added aria-label to settlement calculator inputs. Main pages (index, BMI, state tax) already had proper ARIA labels.

---

## COMPLETION
- All fixes committed: `074d4cbd`
- 760 files changed, pushed to production
- Audit: 2,635/2,902 pages passing (91%) — no regressions from fixes
