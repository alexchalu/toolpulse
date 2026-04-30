#!/usr/bin/env python3
"""
Yelp Business Scraper for Agency Outreach
Scrapes business listings from Yelp for target industries and locations
"""

import json
import time
import re
from urllib.parse import quote
import requests
from bs4 import BeautifulSoup

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Connection': 'keep-alive',
}

def scrape_yelp_search(term, location, start=0):
    """Scrape one page of Yelp search results"""
    url = f"https://www.yelp.com/search?find_desc={quote(term)}&find_loc={quote(location)}&start={start}"
    
    try:
        response = requests.get(url, headers=HEADERS, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html.parser')
        
        businesses = []
        
        # Yelp uses JSON-LD structured data
        scripts = soup.find_all('script', type='application/ld+json')
        for script in scripts:
            try:
                data = json.loads(script.string)
                if isinstance(data, dict) and data.get('@type') == 'LocalBusiness':
                    business = {
                        'name': data.get('name', ''),
                        'phone': data.get('telephone', ''),
                        'address': data.get('address', {}).get('streetAddress', ''),
                        'website': data.get('url', ''),
                        'rating': data.get('aggregateRating', {}).get('ratingValue', 'N/A')
                    }
                    businesses.append(business)
            except:
                continue
        
        # Fallback: parse HTML structure
        if not businesses:
            biz_containers = soup.find_all('div', {'data-testid': re.compile('serp-ia-card')})
            for container in biz_containers:
                try:
                    name_elem = container.find('a', {'class': re.compile('businessname')})
                    phone_elem = container.find('div', string=re.compile(r'\(\d{3}\)'))
                    
                    business = {
                        'name': name_elem.text.strip() if name_elem else 'Unknown',
                        'phone': phone_elem.text.strip() if phone_elem else '',
                        'address': '',
                        'website': name_elem.get('href', '') if name_elem else '',
                        'rating': 'N/A'
                    }
                    businesses.append(business)
                except:
                    continue
        
        return businesses
    
    except Exception as e:
        print(f"Error scraping {term} in {location}: {e}")
        return []

def scrape_business_website_for_email(url):
    """Try to extract email from business website"""
    if not url or not url.startswith('http'):
        return None
    
    try:
        response = requests.get(url, headers=HEADERS, timeout=5)
        text = response.text
        
        # Common email patterns
        email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        emails = re.findall(email_pattern, text)
        
        # Filter out common noise
        filtered = [e for e in emails if not any(x in e.lower() for x in ['example', 'test', 'noreply', 'wix', 'squarespace'])]
        
        return filtered[0] if filtered else None
    except:
        return None

def generate_common_emails(business_name, domain):
    """Generate common email patterns for a business"""
    clean_name = business_name.lower().replace(' ', '').replace(',', '').replace('.', '')
    base_domain = domain.replace('www.', '').split('/')[0]
    
    return [
        f"info@{base_domain}",
        f"contact@{base_domain}",
        f"hello@{base_domain}",
        f"admin@{base_domain}",
    ]

if __name__ == '__main__':
    # Test scrape
    print("Testing Yelp scraper...")
    results = scrape_yelp_search("dentist", "Franklin Lakes, NJ", 0)
    print(f"Found {len(results)} businesses")
    for biz in results[:3]:
        print(json.dumps(biz, indent=2))
