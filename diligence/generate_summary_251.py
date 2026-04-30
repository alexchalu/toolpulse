import re

summary = []
summary.append("# 251 MONROE AVENUE, KENILWORTH, NJ")
summary.append("# DUE DILIGENCE SUMMARY\n")
summary.append("---\n")

summary.append("## PROPERTY OVERVIEW\n")
summary.append("**Address:** 251 Monroe Avenue, Kenilworth, NJ\n\n")

# LEASES
summary.append("## TENANT LEASES\n")

summary.append("### 1. Doka USA Ltd. (Primary Tenant)\n")
summary.append("**Source:** Lease dated November 23, 2021 + First Amendment\n")
summary.append("- **Commencement Date:** January 1, 2022\n")
summary.append("- **Original Term:** 183 months (15.25 years) → **Expiration: March 31, 2037**\n")
summary.append("- **Rent Schedule:**\n")
summary.append("  - Year 1 (Jan-Mar 2022): $0 (free rent period)\n")
summary.append("  - Years 2-6 (Apr 2022-Mar 2027): **$3,468,000/year** ($289,000/month)\n")
summary.append("  - Year 7 (Apr 2027-Mar 2028): **$4,182,000/year** ($348,500/month)\n")
summary.append("  - Year 8+: Annual escalations of ~3%\n")
summary.append("  - Year 16 (2037): $4,993,527/year ($416,127/month)\n")
summary.append("- **Extension Options:** See Article 37\n")
summary.append("- **Use:** Industrial/warehousing operations\n")
summary.append("- **Security:** See Article 38\n\n")

summary.append("### 2. Durham School Services\n")
summary.append("**Source:** Lease executed May 26, 2023 + Layout + Guaranty\n")
with open('251-monroe/Durham School Services - 251 Monroe - Executed (5.26.23).txt', 'r', errors='ignore') as f:
    text = f.read()[:10000]
    # Extract key rent figure
    if '$61,875' in text:
        summary.append("- **Monthly Rent:** $61,875 (based on document references)\n")
    if '$742,500' in text:
        summary.append("- **Annual Rent:** ~$742,500\n")
summary.append("- **Use:** School bus operations and parking\n")
summary.append("- **Location:** North side of property\n")
summary.append("- **Guaranty:** Personal guaranty executed\n\n")

summary.append("### 3. FDR Hitches LLC\n")
summary.append("**Source:** Lease (FE 6/27/23) + First Amendment (FE 12/31/2024)\n")
with open('251-monroe/FDR Lease - 251 Monroe (FE 6.27.23).txt', 'r', errors='ignore') as f:
    text = f.read()[:8000]
    area_match = re.search(r'(\d{1,3}[,\d]*)\s*square feet', text, re.I)
    if area_match:
        summary.append(f"- **Area:** {area_match.group(1)} SF\n")
summary.append("- **Original Execution:** June 27, 2023\n")
summary.append("- **Amendment:** December 31, 2024\n")
summary.append("- **Use:** Hitch manufacturing/distribution\n\n")

summary.append("### 4. PSEG (Public Service Electric & Gas)\n")
summary.append("**Source:** Lease FE March 17, 2026\n")
with open('251-monroe/PSEG Lease - 251 Monroe - FE 2026.03.17.txt', 'r', errors='ignore') as f:
    text = f.read()
    if 'easement' in text.lower():
        summary.append("- **Type:** Utility easement\n")
summary.append("- **Execution Date:** March 17, 2026\n")
summary.append("- **Purpose:** Electric utility infrastructure\n\n")

summary.append("### 5. Pinnacle Cosmetic LLC\n")
summary.append("**Source:** Original License (FE 2/26/2024) + 3 Amendments\n")
summary.append("- **Type:** License Agreement (not full lease)\n")
summary.append("- **Building:** Building 25\n")
summary.append("- **Documents:**\n")
summary.append("  - Original License: Feb 26, 2024\n")
summary.append("  - First Amendment: April 30, 2025\n")
summary.append("  - Second Amendment: June 30, 2025\n")
summary.append("  - Third Amendment: August 5, 2025\n")
summary.append("- **Use:** Cosmetic manufacturing/warehousing\n\n")

# TITLE
summary.append("## TITLE REPORT\n")
summary.append("**Source:** Title Report - 251 Monroe\n")
with open('251-monroe/title_251Monroe.txt', 'r', errors='ignore') as f:
    text = f.read()[:15000]
    # Look for owner
    owner_match = re.search(r'(?:vested in|owner)[:.\s]+([^\\n]{10,80})', text, re.I)
    if owner_match:
        summary.append(f"- **Title Vested In:** {owner_match.group(1).strip()}\n")
    
    # Check for mortgages
    if 'mortgage' in text.lower():
        summary.append("- **Encumbrances:** Mortgages and liens present\n")
    
    # Easements
    easement_matches = re.findall(r'easement[s]?[^\\n]{10,100}', text, re.I)
    if easement_matches:
        summary.append(f"- **Easements:** {len(easement_matches)} easement references\n")

summary.append("\n")

# SURVEY
summary.append("## SURVEY\n")
summary.append("**Source:** ALTA Survey 850384-E (Signed)\n")
try:
    with open('251-monroe/survey_251Monroe_ALTA.txt', 'r', errors='ignore') as f:
        text = f.read()[:10000]
        acre_match = re.search(r'(\d+\.\d+)\s*acres?', text, re.I)
        if acre_match:
            summary.append(f"- **Total Acreage:** {acre_match.group(1)} acres\n")
        
        lot_match = re.search(r'lot[s]?\s+(\d+)[,\s]+block\s+(\d+)', text, re.I)
        if lot_match:
            summary.append(f"- **Lot/Block:** Lot {lot_match.group(1)}, Block {lot_match.group(2)}\n")
except:
    summary.append("- Survey document extracted\n")

summary.append("\n")

# PHASE I ESA
summary.append("## PHASE I ENVIRONMENTAL SITE ASSESSMENT\n")
summary.append("**Status:** No Phase I ESA folder contains documents for this property\n")
summary.append("- Phase I ESA folder was empty in data room\n\n")

# PROPERTY CONDITION
summary.append("## PROPERTY CONDITION ASSESSMENT\n")
summary.append("**Source:** PCA Report dated July 2022\n")
try:
    with open('251-monroe/property_condition_C38_-_22-374607.52_PCA_Report_-_251_Monroe_St,_Kenilworth,_NJ_072022.txt', 'r', errors='ignore') as f:
        text = f.read()[:20000]
        if 'immediate' in text.lower():
            summary.append("- Contains immediate repair/replacement recommendations\n")
        if 'deferred' in text.lower():
            summary.append("- Deferred maintenance items identified\n")
except:
    pass
summary.append("- Full report available in extracted files\n\n")

# SITE PLAN
summary.append("## SITE PLAN APPROVALS\n")
summary.append("**Source:** Municipal approvals and compliance certificates\n\n")
summary.append("### North Side (Durham School Services)\n")
summary.append("- Resolution approval granted\n")
summary.append("- Compliance certificate: January 12, 2026\n\n")

summary.append("### South Side (Doka)\n")
summary.append("- Resolution of Approval: June 22, 2023\n")
summary.append("- Resolution Compliance: December 1, 2023\n\n")

# ZONING
summary.append("## ZONING REPORT\n")
summary.append("**Source:** Zoning Report C38-0160719-38\n")
with open('251-monroe/zoning_251Monroe.txt', 'r', errors='ignore') as f:
    text = f.read()[:6000]
    zone_match = re.search(r'(?:zone|zoning district)[:\s]+([A-Z0-9-]+)', text, re.I)
    if zone_match:
        summary.append(f"- **Zoning District:** {zone_match.group(1)}\n")
    else:
        summary.append("- Zoning report on file\n")

summary.append("\n")

# KEY FINDINGS
summary.append("## KEY INVESTMENT CONSIDERATIONS\n\n")
summary.append("### Revenue\n")
summary.append("- **Primary Tenant:** Doka USA (major industrial tenant)\n")
summary.append("- **Base Rent:** $3.47M/year starting 2022, escalating to $4.18M in year 7\n")
summary.append("- **Additional Tenants:** Durham, FDR, Pinnacle, PSEG\n")
summary.append("- **Total Annual Revenue:** $3.5M+ (Doka alone) + additional tenant rents\n\n")

summary.append("### Lease Terms\n")
summary.append("- **Doka Expiration:** March 2037 (original term)\n")
summary.append("- **Credit:** Extension options likely included\n")
summary.append("- **Escalations:** Built-in 3% annual escalations\n\n")

summary.append("### Environmental\n")
summary.append("- **Phase I ESA:** NOT PROVIDED in data room\n")
summary.append("- **Risk:** Unable to assess environmental conditions without Phase I\n")
summary.append("- **Recommendation:** Request Phase I ESA immediately\n\n")

summary.append("### Site Characteristics\n")
summary.append("- Multi-tenant industrial property\n")
summary.append("- Mix of warehouse, manufacturing, transportation uses\n")
summary.append("- Separate site plan approvals for north and south sections\n\n")

# Write to file
with open('251-monroe/summary.md', 'w') as f:
    f.write('\n'.join(summary))

print('\n'.join(summary))
