#!/usr/bin/env python3
"""
IndexNow Submission Script for CalcLeap

Submits new or updated pages to IndexNow API for immediate indexing.
Supports batch submission and automatic key verification.

Usage:
    python submit-new-page-indexnow.py <url> [--key <key>] [--host <host>]
    python submit-new-page-indexnow.py <url1> <url2> ...

Environment Variables:
    INDEXNOW_KEY - Override the default IndexNow key
    INDEXNOW_HOST - Override the default host (calcleap.com)

Example:
    python submit-new-page-indexnow.py https://calcleap.com/new-calculator.html
    python submit-new-page-indexnow.py https://calcleap.com/tax-calculator.html https://calcleap.com/retirement-calculator.html
"""

import json
import os
import sys
import urllib.parse
from typing import List, Optional
import requests


class IndexNowSubmitter:
    """Handles submission of URLs to IndexNow API."""

    DEFAULT_KEY = "INDEXNOW-KEY.txt"
    DEFAULT_HOST = "calcleap.com"
    INDEXNOW_API_URL = "https://api.indexnow.org/indexnow"

    def __init__(
        self,
        key: Optional[str] = None,
        host: Optional[str] = None,
        api_url: Optional[str] = None,
    ):
        # If key is provided as a file path, read it
        key_value = key or os.getenv("INDEXNOW_KEY", self.DEFAULT_KEY)
        if key_value == self.DEFAULT_KEY or key_value.endswith(".txt"):
            # Read key from file
            key_file = os.path.join(os.path.dirname(__file__), key_value)
            if os.path.exists(key_file):
                with open(key_file, 'r') as f:
                    self.key = f.read().strip()
            else:
                self.key = key_value
        else:
            self.key = key_value
        
        self.host = host or os.getenv("INDEXNOW_HOST", self.DEFAULT_HOST)
        self.api_url = api_url or self.INDEXNOW_API_URL

    def validate_url(self, url: str) -> bool:
        """Validate that URL is properly formatted."""
        try:
            result = urllib.parse.urlparse(url)
            return all([result.scheme, result.netloc])
        except ValueError:
            return False

    def format_url_list(self, urls: List[str]) -> List[str]:
        """Format URLs to ensure they're absolute and properly encoded."""
        formatted = []
        for url in urls:
            # Ensure URL starts with https://
            if not url.startswith("http"):
                url = f"https://{url}"
            
            # Parse and reconstruct to normalize
            parsed = urllib.parse.urlparse(url)
            if not parsed.scheme:
                url = f"https://{url}"
            
            formatted.append(url.rstrip("/"))
        
        return formatted

    def create_submission_payload(self, urls: List[str]) -> dict:
        """Create the JSON payload for IndexNow API."""
        # Use the raw GitHub URL for key location
        # IndexNow documentation states keyLocation can be any URL that returns the key value
        key_location = f"https://raw.githubusercontent.com/alexchalu/toolpulse/main/INDEXNOW-KEY.txt"
        return {
            "host": self.host,
            "key": self.key,
            "keyLocation": key_location,
            "urlList": self.format_url_list(urls),
        }

    def submit_to_indexnow(self, payload: dict) -> dict:
        """Submit URLs to IndexNow API."""
        headers = {
            "Content-Type": "application/json",
            "User-Agent": "CalcLeap-Bot/1.0 (+https://calcleap.com/bot.html)",
        }

        try:
            response = requests.post(
                self.api_url,
                json=payload,
                headers=headers,
                timeout=30,
            )
            
            return {
                "status_code": response.status_code,
                "success": response.status_code == 200,
                "response": response.text,
            }
        except requests.exceptions.RequestException as e:
            return {
                "status_code": None,
                "success": False,
                "error": str(e),
            }

    def submit_urls(self, urls: List[str]) -> dict:
        """Submit one or more URLs to IndexNow."""
        if not urls:
            return {
                "success": False,
                "error": "No URLs provided for submission",
            }

        # Validate URLs
        invalid_urls = [url for url in urls if not self.validate_url(url)]
        if invalid_urls:
            return {
                "success": False,
                "error": f"Invalid URLs detected: {', '.join(invalid_urls)}",
            }

        # Create payload
        payload = self.create_submission_payload(urls)
        
        print(f"📤 Submitting {len(urls)} URL(s) to IndexNow...")
        print(f"🔑 Key: {self.key}")
        print(f"🌐 Host: {self.host}")
        print(f"📍 Key Location: {payload['keyLocation']}")
        print(f"🔗 URLs: {', '.join(urls)}")
        print()

        # Submit to IndexNow
        result = self.submit_to_indexnow(payload)

        return result


def main():
    """Main entry point for the script."""
    submitter = IndexNowSubmitter()

    # Parse command line arguments
    if len(sys.argv) < 2:
        print("❌ Error: No URLs provided")
        print("\nUsage:")
        print("  python submit-new-page-indexnow.py <url1> [<url2> ...]")
        print("\nExample:")
        print("  python submit-new-page-indexnow.py https://calcleap.com/new-calculator.html")
        sys.exit(1)

    urls = sys.argv[1:]

    # Submit URLs
    result = submitter.submit_urls(urls)

    # Print results
    print("=" * 60)
    if result.get("success"):
        print("✅ SUCCESS: URLs submitted to IndexNow")
        print(f"   Status Code: {result['status_code']}")
        print(f"   Response: {result['response']}")
        
        # Verify key location
        print("\n🔍 Verifying key location...")
        key_url = f"https://{submitter.host}/{submitter.key}.txt"
        try:
            key_response = requests.head(key_url, timeout=10)
            if key_response.status_code == 200:
                print(f"✅ Key file accessible at: {key_url}")
            else:
                print(f"⚠️  Key file returned status {key_response.status_code}")
        except Exception as e:
            print(f"⚠️  Could not verify key file: {e}")
        
        sys.exit(0)
    else:
        print("❌ FAILED: URL submission to IndexNow")
        if "error" in result:
            print(f"   Error: {result['error']}")
        if "response" in result:
            print(f"   Response: {result['response']}")
        sys.exit(1)


if __name__ == "__main__":
    main()
