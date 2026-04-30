import re
import glob

output = []
output.append("# 251 Monroe Avenue, Kenilworth, NJ - Due Diligence Summary\n")

# LEASES
output.append("## LEASES\n")

# Doka
doka_files = glob.glob("251-monroe/lease_doka_*.txt")
if doka_files:
    output.append("### Doka USA Ltd.\n")
    text = open(doka_files[0], 'r', errors='ignore').read()
    
    # Extract key terms
    term_match = re.search(r'Term[:\s]+(\d+)\s+years?|Commencement Date[:\s]+([^\\n]+)|Expiration Date[:\s]+([^\\n]+)', text, re.I)
    rent_matches = list(re.finditer(r'\$[\d,]+\.?\d*\s*per\s+(?:month|year|annum|square foot)', text, re.I))[:5]
    area_match = re.search(r'(?:premises|demised|rentable)\s+(?:area|space)[:\s]+([\\d,]+)\s+(?:square feet|SF|sq\.? ?ft)', text, re.I)
    
    if area_match:
        output.append(f"- **Premises:** {area_match.group(1)} SF\n")
    if rent_matches:
        output.append(f"- **Base Rent:** {rent_matches[0].group(0)}\n")
    
    # Try to find lease dates
    date_pattern = r'(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}'
    dates = re.findall(date_pattern, text)
    if len(dates) >= 2:
        output.append(f"- **Term:** {dates[0]} to {dates[-1]}\n")

# Durham School Services
durham_files = glob.glob("251-monroe/*durham*.txt")
if durham_files:
    output.append("\n### Durham School Services\n")
    for f in durham_files:
        if 'Executed' in f:
            text = open(f, 'r', errors='ignore').read()
            rent_matches = list(re.finditer(r'\$[\d,]+\.?\d*', text))[:10]
            area_match = re.search(r'([\\d,]+)\s+(?:square feet|SF)', text, re.I)
            if area_match:
                output.append(f"- **Area:** {area_match.group(1)} SF\n")
            if rent_matches:
                amounts = [m.group(0) for m in rent_matches if '1' in m.group(0) or '2' in m.group(0) or '3' in m.group(0)]
                if amounts:
                    output.append(f"- **Rent references:** {', '.join(amounts[:3])}\n")

# FDR Hitches
fdr_files = glob.glob("251-monroe/*fdr*.txt")
if fdr_files:
    output.append("\n### FDR Hitches\n")
    for f in fdr_files:
        if 'FE 6.27.23' in f or 'Lease' in f:
            text = open(f, 'r', errors='ignore').read()[:5000]
            output.append("- Lease executed June 27, 2023\n")
            area_match = re.search(r'([\\d,]+)\s+square feet', text, re.I)
            if area_match:
                output.append(f"- **Area:** {area_match.group(1)} SF\n")

# PSEG
pseg_files = glob.glob("251-monroe/*pseg*.txt")
if pseg_files:
    output.append("\n### PSEG\n")
    text = open(pseg_files[0], 'r', errors='ignore').read()
    output.append("- Utility easement lease\n")
    output.append("- Executed March 17, 2026\n")

# Pinnacle Cosmetic
pinnacle_files = glob.glob("251-monroe/*pinnacle*.txt")
if len(pinnacle_files) > 0:
    output.append("\n### Pinnacle Cosmetic\n")
    output.append(f"- {len(pinnacle_files)} license agreements and amendments\n")

# TITLE
output.append("\n## TITLE\n")
title_files = glob.glob("251-monroe/title*.txt")
if title_files:
    text = open(title_files[0], 'r', errors='ignore').read()[:10000]
    
    # Look for owner
    owner_match = re.search(r'(?:Owner|Vested in|Title vested)[:\s]+([^\\n]+)', text, re.I)
    if owner_match:
        output.append(f"- **Owner:** {owner_match.group(1).strip()}\n")
    
    # Look for liens/encumbrances
    if 'mortgage' in text.lower():
        output.append("- Mortgages/liens present (see report)\n")
    
    # Look for easements
    easement_count = text.lower().count('easement')
    if easement_count > 0:
        output.append(f"- {easement_count} easement references\n")

# SURVEY
output.append("\n## SURVEY\n")
survey_files = glob.glob("251-monroe/survey*.txt")
if survey_files:
    text = open(survey_files[0], 'r', errors='ignore').read()[:8000]
    
    # Look for acreage
    acre_match = re.search(r'([\\d.]+)\s+acres?', text, re.I)
    if acre_match:
        output.append(f"- **Acreage:** {acre_match.group(1)} acres\n")
    
    # Look for lot/block
    lot_match = re.search(r'Lot[:\s]+([\\d]+)[,\\s]+Block[:\s]+([\\d]+)', text, re.I)
    if lot_match:
        output.append(f"- **Lot/Block:** Lot {lot_match.group(1)}, Block {lot_match.group(2)}\n")

# ZONING
output.append("\n## ZONING\n")
zoning_files = glob.glob("251-monroe/zoning*.txt")
if zoning_files:
    text = open(zoning_files[0], 'r', errors='ignore').read()[:5000]
    
    zone_match = re.search(r'(?:Zoning|Zone|District)[:\s]+([A-Z0-9-]+)', text, re.I)
    if zone_match:
        output.append(f"- **Zone:** {zone_match.group(1)}\n")

# SITE PLAN
output.append("\n## SITE PLAN APPROVALS\n")
siteplan_files = glob.glob("251-monroe/siteplan*.txt")
output.append(f"- {len(siteplan_files)} site plan approval documents\n")
output.append("- Separate approvals for Durham (North Side) and Doka (South Side)\n")

# PROPERTY CONDITION
output.append("\n## PROPERTY CONDITION ASSESSMENT\n")
pca_files = glob.glob("251-monroe/property_condition*.txt")
if pca_files:
    output.append("- PCA Report dated July 2022\n")
    text = open(pca_files[0], 'r', errors='ignore').read()[:15000]
    
    # Look for immediate repairs
    if 'immediate' in text.lower():
        output.append("- Contains immediate repair recommendations (see report)\n")

# Write summary
with open('251-monroe/summary.md', 'w') as f:
    f.write(''.join(output))

print(''.join(output))
