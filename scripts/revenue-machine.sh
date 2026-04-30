#!/bin/bash
# REVENUE MACHINE — Runs every 2 hours
# Objective: Generate money through every available channel

echo "$(date -u) — REVENUE MACHINE CYCLE START"

cd /data/workspace

# 1. Find and email 5 new outreach targets
node scripts/auto-outreach.js 2>&1

# 2. Submit new pages to IndexNow
cd toolpulse
python3 -c "
import subprocess, json
urls = ['https://calcleap.com/invoice-generator.html','https://calcleap.com/startup-financial-model.html','https://calcleap.com/student-loan-refinance-calculator.html','https://calcleap.com/sitemap.xml']
data = json.dumps({'host':'calcleap.com','key':'a1b2c3d4e5f6g7h8','urlList':urls})
subprocess.run(['curl','-s','-X','POST','https://api.indexnow.org/IndexNow','-H','Content-Type: application/json','-d',data], capture_output=True)
print('IndexNow submitted')
" 2>&1

# 3. Check traffic
cd /data/workspace
gh api repos/alexchalu/toolpulse/traffic/views 2>/dev/null | python3 -c "
import json,sys
try:
    d=json.load(sys.stdin)
    print(f'Traffic: {d[\"count\"]} views, {d[\"uniques\"]} unique')
except: print('Traffic check failed')
" 2>&1

echo "$(date -u) — REVENUE MACHINE CYCLE END"
