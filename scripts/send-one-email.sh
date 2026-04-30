#!/bin/bash
# Send a single email using the working send-email.js script

TO="$1"
SUBJECT="$2"
BODY="$3"

if [ -z "$TO" ] || [ -z "$SUBJECT" ] || [ -z "$BODY" ]; then
    echo "Usage: $0 <to> <subject> <html_body>"
    exit 1
fi

node /data/workspace/send-email.js "$TO" "$SUBJECT" "$BODY"
