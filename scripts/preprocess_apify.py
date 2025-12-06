#!/usr/bin/env python3
"""
Preprocessor for Apify Google Maps scraped data.
Handles Apify's specific output format.
"""

import json
import sys
import re

def extract_location(address_string):
    """Extract city and state from Apify address string."""
    if not address_string:
        return None, None
    
    # Apify addresses usually end with "City, ST ZIP, Country"
    # Examples: "Dallas, TX 75201, USA" or "123 Main St, Houston, TX 77001, United States"
    
    # Try to find pattern: City, ST
    match = re.search(r',\s*([A-Za-z\s]+),\s*([A-Z]{2})\s*\d{5}', address_string)
    if match:
        city = match.group(1).strip()
        state = match.group(2).strip()
        return city, state
    
    # Alternative: Just look for ", ST " pattern
    match = re.search(r',\s*([A-Za-z\s]+),\s*([A-Z]{2})\s', address_string)
    if match:
        city = match.group(1).strip()
        state = match.group(2).strip()
        return city, state
    
    return None, None

def preprocess_apify_data(input_file, output_file):
    """Extract simplified format from Apify Google Maps scrape."""
    print(f"📥 Loading Apify data from: {input_file}")
    
    # Apify often exports as JSONL (one JSON object per line)
    raw_data = []
    
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
        
        # Try reading as array first
        try:
            raw_data = json.loads(content)
            if not isinstance(raw_data, list):
                raw_data = [raw_data]
        except json.JSONDecodeError:
            # Try JSONL format (one object per line)
            print("Reading as JSONL format...")
            for line_num, line in enumerate(content.split('\n'), 1):
                line = line.strip()
                if not line or line.startswith('#'):
                    continue
                try:
                    obj = json.loads(line)
                    raw_data.append(obj)
                except json.JSONDecodeError:
                    # Skip invalid lines silently
                    pass
    
    print(f"✅ Loaded {len(raw_data)} records\n")
    
    simplified = []
    skipped = 0
    no_location = 0
    
    for record in raw_data:
        # Skip if not a dict
        if not isinstance(record, dict):
            skipped += 1
            continue
        
        # Apify Google Maps fields
        title = record.get('title', record.get('name', ''))
        address = record.get('address', '')
        website = record.get('website', '')
        rating = record.get('totalScore', record.get('rating'))
        location = record.get('location', {})
        
        # Extract city and state from address
        city, state = extract_location(address)
        
        # Skip if no title
        if not title:
            skipped += 1
            continue
        
        # Skip if no location
        if not city or not state:
            no_location += 1
            skipped += 1
            continue
        
        # Build simplified record
        simple = {
            'title': title.strip(),
            'city': city,
            'state': state,
        }
        
        if website and website.strip():
            simple['website'] = website.strip()
        if rating:
            try:
                simple['rating'] = float(rating)
            except (ValueError, TypeError):
                pass
        
        # Add lat/lng for potential reverse geocoding later
        if location and isinstance(location, dict):
            simple['lat'] = location.get('lat')
            simple['lng'] = location.get('lng')
        
        simplified.append(simple)
    
    print(f"✅ Extracted: {len(simplified)} records with names/websites")
    print(f"⚠️  Missing location data: {no_location} records")
    print(f"❌ Skipped: {skipped} records (no title)")
    print(f"📈 Extraction rate: {len(simplified) / len(raw_data) * 100:.1f}%\n")
    
    # Write output
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(simplified, f, indent=2, ensure_ascii=False)
    
    print(f"✅ Simplified data saved to: {output_file}")
    print(f"🎯 Ready for enrichment script!")

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print("Usage: python preprocess_apify.py input.json output.json")
        sys.exit(1)
    
    preprocess_apify_data(sys.argv[1], sys.argv[2])
