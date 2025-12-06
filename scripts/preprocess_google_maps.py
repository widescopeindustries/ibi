#!/usr/bin/env python3
"""
Preprocessor for Google Maps scraped data.
Extracts only the fields needed for enrichment.
"""

import json
import sys

def preprocess_google_maps_data(input_file, output_file):
    """Extract simplified format from Google Maps scrape."""
    print(f"📥 Loading Google Maps data from: {input_file}")
    
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            raw_data = json.load(f)
    except json.JSONDecodeError as e:
        print(f"❌ JSON error: {e}")
        print("Attempting to read line-by-line (JSONL format)...")
        
        # Try reading as JSONL (one JSON object per line)
        raw_data = []
        with open(input_file, 'r', encoding='utf-8') as f:
            for line_num, line in enumerate(f, 1):
                line = line.strip()
                if not line:
                    continue
                try:
                    obj = json.loads(line)
                    raw_data.append(obj)
                except json.JSONDecodeError:
                    print(f"Skipping invalid JSON at line {line_num}")
                    continue
    
    if isinstance(raw_data, dict):
        raw_data = [raw_data]  # Wrap single object in array
    
    print(f"✅ Loaded {len(raw_data)} records\n")
    
    simplified = []
    
    for record in raw_data:
        # Extract fields from Google Maps format
        title = record.get('title', '')
        city = record.get('city', record.get('address', ''))
        state = record.get('state', '')
        website = record.get('website', record.get('url', ''))
        rating = record.get('totalScore', record.get('rating'))
        
        # Build simplified record
        simple = {
            'title': title,
            'city': city,
            'state': state,
        }
        
        if website:
            simple['website'] = website
        if rating:
            simple['rating'] = rating
        
        simplified.append(simple)
    
    # Write output
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(simplified, f, indent=2, ensure_ascii=False)
    
    print(f"✅ Preprocessed data saved to: {output_file}")
    print(f"🎯 Ready for enrichment script!")

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print("Usage: python preprocess_google_maps.py input.json output.json")
        sys.exit(1)
    
    preprocess_google_maps_data(sys.argv[1], sys.argv[2])
