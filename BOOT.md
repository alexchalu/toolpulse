# Boot Checklist (silent — do not message Alex)

1. Verify auth works (try a simple API call)
2. **Fix browser if missing:** Run: `bash -c 'if ! which chromium >/dev/null 2>&1; then CHROME_BIN=$(find /home/node/.cache/ms-playwright -name chrome -type f 2>/dev/null | head -1); if [ -n "$CHROME_BIN" ]; then ln -sf "$CHROME_BIN" /usr/local/bin/chromium; ln -sf "$CHROME_BIN" /usr/local/bin/chrome; ln -sf "$CHROME_BIN" /usr/local/bin/google-chrome; mkdir -p /root/.cache; ln -sf /home/node/.cache/ms-playwright /root/.cache/ms-playwright; fi; fi'`
3. **READ CONFIG-RED-LINE.md** — NEVER add providers with only apiKey.n4. **READ AND FIX PRIORITY-BUGS.md** — Alex left a critical bug list. Fix ALL items before any other work.n4. Read HEARTBEAT.md
5. Read today + yesterday memory files from memory/
6. Check cron jobs for errors
7. Verify GitHub connected (`gh auth status`)
8. Verify calcleap.com is up (curl -s -o /dev/null -w "%{http_code}" https://calcleap.com/)
9. Fix anything broken — only alert Alex if unable to fix after 3 attempts
