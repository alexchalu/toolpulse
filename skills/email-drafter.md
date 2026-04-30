---
name: email-drafter
description: Draft and send emails via Resend API
metadata:
  openclaw:
    requires:
      bins: ["node"]
---
When Alex asks to draft or send an email:

1. Draft the email content first and show to Alex for approval
2. Once approved, send using: node /data/workspace/send-email.js
3. For emails TO other people (not Alex), always ask permission first

Email style: professional, concise, structured. Match Alex's tone from USER.md.
