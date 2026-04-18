# IndexNow Submission Script

## Overview

This script automates submission of new or updated pages to the IndexNow API for immediate indexing by search engines.

## Files

- `submit-new-page-indexnow.py` - Main Python script for IndexNow submissions
- `INDEXNOW-KEY.txt` - IndexNow API key verification file (contains the key value)

## Usage

### Single URL Submission
```bash
python3 submit-new-page-indexnow.py https://calcleap.com/new-page.html
```

### Multiple URL Submission
```bash
python3 submit-new-page-indexnow.py https://calcleap.com/page1.html https://calcleap.com/page2.html
```

### Environment Variables
- `INDEXNOW_KEY` - Override the default IndexNow key
- `INDEXNOW_HOST` - Override the default host (calcleap.com)

## Key Verification

The key file must be accessible at:
```
https://calcleap.com/INDEXNOW-KEY.txt
```

The file should contain just the key value on a single line.

## IndexNow API

- Endpoint: `https://api.indexnow.org/indexnow`
- Protocol: HTTPS POST with JSON payload
- Response: 200 OK on success

## Testing

```bash
# Test the key file is accessible
curl -I https://calcleap.com/e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855.txt

# Test the submission script
python3 submit-new-page-indexnow.py https://calcleap.com/test-page.html
```

## Notes

- All URLs must be absolute (include https://)
- URLs will be normalized to https:// format
- The script validates URLs before submission
- Batch submissions are supported
