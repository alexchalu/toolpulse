#!/usr/bin/env python3
"""
Systematically collect all file paths from the data room by navigating the structure.
This creates a comprehensive list for downloading.
"""

# Property 1: 2120 McCarter Highway, Newark, NJ
property1_files = {
    "2120_McCarter_Lease_Amazon.pdf": "Shared/7. Legal/Meadow Diligence Room/2120 McCarter Highway, Newark, NJ/Leases/Lease - Amazon - 2120-2158 McCarter Hwy - 2021.06.09.pdf",
    "2120_PhaseI_ESA.pdf": "Shared/7. Legal/Meadow Diligence Room/2120 McCarter Highway, Newark, NJ/Phase I ESA/Phase I ESA - 2120 McCarter Hwy.pdf",
    "2120_SitePlan_Approval.pdf": "Shared/7. Legal/Meadow Diligence Room/2120 McCarter Highway, Newark, NJ/Site Plan Approval/Approval Resolution/Newark Jan 9 CPB 22-31 Reso Mem.pdf",
    "2120_Survey_ALTA.pdf": "Shared/7. Legal/Meadow Diligence Room/2120 McCarter Highway, Newark, NJ/Survey/ALTA Survey - 2120 McCarter.pdf",
    "2120_Title_Report.pdf": "Shared/7. Legal/Meadow Diligence Room/2120 McCarter Highway, Newark, NJ/Title Report/Title Report - 2120 McCarter.pdf",
}

# Property 2: 251 Monroe Avenue, Kenilworth, NJ - Leases (known so far)
property2_lease_files = {
    "251_Monroe_Lease_Doka_1.pdf": "Shared/7. Legal/Meadow Diligence Room/251 Monroe Avenue, Kenilworth, NJ/Leases/Doka/251 Monroe - Doka Lease (Fully Executed)_Optimized.pdf",
    "251_Monroe_Lease_Doka_Amendment.pdf": "Shared/7. Legal/Meadow Diligence Room/251 Monroe Avenue, Kenilworth, NJ/Leases/Doka/251 Monroe - First Amendment to Lease Agreement (Executed).pdf",
    "251_Monroe_Lease_Durham_1.pdf": "Shared/7. Legal/Meadow Diligence Room/251 Monroe Avenue, Kenilworth, NJ/Leases/Durham School Services/Durham School Services - 251 Monroe - Executed (5.26.23).pdf",
    "251_Monroe_Lease_Durham_Layout.pdf": "Shared/7. Legal/Meadow Diligence Room/251 Monroe Avenue, Kenilworth, NJ/Leases/Durham School Services/Durham School Services Layout - 251 Monroe.pdf",
    "251_Monroe_Lease_Durham_Guaranty.pdf": "Shared/7. Legal/Meadow Diligence Room/251 Monroe Avenue, Kenilworth, NJ/Leases/Durham School Services/Guaranty - Durham School Services - 251 Monroe (Signed).pdf",
    "251_Monroe_Lease_FDR_1.pdf": "Shared/7. Legal/Meadow Diligence Room/251 Monroe Avenue, Kenilworth, NJ/Leases/FDR Hitches/FDR Lease - 251 Monroe (FE 6.27.23).pdf",
    "251_Monroe_Lease_FDR_Amendment.pdf": "Shared/7. Legal/Meadow Diligence Room/251 Monroe Avenue, Kenilworth, NJ/Leases/FDR Hitches/First Amendment to FDR Lease - 251 Monroe - FE 12.31.2024.pdf",
}

# Property 2: Other folders - placeholders (need to navigate to get exact paths)
property2_other = [
    "251 Monroe Avenue, Kenilworth, NJ/Leases/PSEG",
    "251 Monroe Avenue, Kenilworth, NJ/Leases/Pinnacle Cosmetic",
    "251 Monroe Avenue, Kenilworth, NJ/Phase I ESA",
    "251 Monroe Avenue, Kenilworth, NJ/Property Condition Report",
    "251 Monroe Avenue, Kenilworth, NJ/Site Plan Approval",
    "251 Monroe Avenue, Kenilworth, NJ/Survey",
    "251 Monroe Avenue, Kenilworth, NJ/Title Report",
    "251 Monroe Avenue, Kenilworth, NJ/Zoning Report",
]

# Property 3: 76 Central Avenue, Kearny, NJ - all folders
property3_folders = [
    "76 Central Avenue, Kearny, NJ/Leases",
    "76 Central Avenue, Kearny, NJ/Phase I ESA",
    "76 Central Avenue, Kearny, NJ/Site Plan Approval",
    "76 Central Avenue, Kearny, NJ/Survey",
    "76 Central Avenue, Kearny, NJ/Title Report",
]

all_files = {}
all_files.update(property1_files)
all_files.update(property2_lease_files)

print(f"Known files: {len(all_files)}")
print(f"Property 2 folders to explore: {len(property2_other)}")
print(f"Property 3 folders to explore: {len(property3_folders)}")
