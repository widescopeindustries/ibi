#!/usr/bin/env python3
"""
Universal Data Enrichment Script for Rep Import
Takes ANY consultant JSON data and cleans/validates/enriches it.

Usage:
    python enrich_data.py input.json output.json --company "Mary Kay"
"""

import json
import re
import sys
import argparse
from typing import Dict, List, Optional, Tuple

# Invalid name patterns (words that indicate non-names)
INVALID_NAME_PATTERNS = [
    r'\bconsultant\b',
    r'\bdirector\b',
    r'\bbeauty\b',
    r'\bskincare\b',
    r'\bsales\b',
    r'\bindependent\b',
    r'\bsenior\b',
    r'\brepresentative\b',
    r'\brep\b',
    r'\bmk\b',
    r'\bhq\b',
    r'\binc\b',
    r'\bllc\b',
    r'^with\b',
    r'^by\b',
    r'^and\b',
    r'^-',
    r';',
    r'\d{3}-\d{3}-\d{4}',  # Phone numbers
]

# US States (for validation)
US_STATES = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
]

def is_valid_name(name: str) -> bool:
    """Check if a name string is valid (not a title/company/junk)."""
    if not name or len(name) < 2:
        return False
    
    # Check against invalid patterns
    for pattern in INVALID_NAME_PATTERNS:
        if re.search(pattern, name, re.IGNORECASE):
            return False
    
    return True

def extract_name(full_name: str) -> Optional[Tuple[str, str]]:
    """
    Extract first and last name from full name string.
    Returns (first_name, last_name) or None if invalid.
    """
    if not full_name:
        return None
    
    # Clean up the name
    name = full_name.strip()
    name = re.sub(r'\s+', ' ', name)  # Normalize whitespace
    
    # Remove common prefixes/suffixes
    name = re.sub(r'\b(with|by|and)\b', '', name, flags=re.IGNORECASE).strip()
    name = re.sub(r'^[-;]+', '', name).strip()
    name = re.sub(r'[-;]+$', '', name).strip()
    
    # Split into parts
    parts = name.split()
    
    if len(parts) < 2:
        return None  # Need at least first and last name
    
    # Extract first and last (ignore middle names/titles for now)
    first_name = parts[0]
    last_name = parts[-1]
    
    # Validate both names
    if not is_valid_name(first_name) or not is_valid_name(last_name):
        return None
    
    return (first_name.capitalize(), last_name.capitalize())

def normalize_state(state: str) -> Optional[str]:
    """Normalize state to 2-letter code."""
    if not state:
        return None
    
    state_upper = state.strip().upper()
    
    # Already a valid code
    if state_upper in US_STATES:
        return state_upper
    
    # State name to code mapping (add more as needed)
    state_map = {
        'ALABAMA': 'AL', 'ALASKA': 'AK', 'ARIZONA': 'AZ', 'ARKANSAS': 'AR',
        'CALIFORNIA': 'CA', 'COLORADO': 'CO', 'CONNECTICUT': 'CT', 'DELAWARE': 'DE',
        'FLORIDA': 'FL', 'GEORGIA': 'GA', 'HAWAII': 'HI', 'IDAHO': 'ID',
        'ILLINOIS': 'IL', 'INDIANA': 'IN', 'IOWA': 'IA', 'KANSAS': 'KS',
        'KENTUCKY': 'KY', 'LOUISIANA': 'LA', 'MAINE': 'ME', 'MARYLAND': 'MD',
        'MASSACHUSETTS': 'MA', 'MICHIGAN': 'MI', 'MINNESOTA': 'MN', 'MISSISSIPPI': 'MS',
        'MISSOURI': 'MO', 'MONTANA': 'MT', 'NEBRASKA': 'NE', 'NEVADA': 'NV',
        'NEW HAMPSHIRE': 'NH', 'NEW JERSEY': 'NJ', 'NEW MEXICO': 'NM', 'NEW YORK': 'NY',
        'NORTH CAROLINA': 'NC', 'NORTH DAKOTA': 'ND', 'OHIO': 'OH', 'OKLAHOMA': 'OK',
        'OREGON': 'OR', 'PENNSYLVANIA': 'PA', 'RHODE ISLAND': 'RI', 'SOUTH CAROLINA': 'SC',
        'SOUTH DAKOTA': 'SD', 'TENNESSEE': 'TN', 'TEXAS': 'TX', 'UTAH': 'UT',
        'VERMONT': 'VT', 'VIRGINIA': 'VA', 'WASHINGTON': 'WA', 'WEST VIRGINIA': 'WV',
        'WISCONSIN': 'WI', 'WYOMING': 'WY'
    }
    
    return state_map.get(state_upper)

def clean_record(record: Dict, company_name: str) -> Optional[Dict]:
    """
    Clean and validate a single record.
    Returns cleaned record or None if invalid.
    """
    # Extract and validate name
    title = record.get('title', '')
    name_tuple = extract_name(title)
    
    if not name_tuple:
        return None  # Invalid name
    
    first_name, last_name = name_tuple
    
    # Extract and validate location
    city = record.get('city', '').strip()
    state = normalize_state(record.get('state', ''))
    
    # Must have both city and state
    if not city or not state:
        return None
    
    # Capitalize city properly
    city = city.title()
    
    # Extract other fields
    website = record.get('website', '').strip()
    rating = record.get('rating')
    
    # Build cleaned record
    cleaned = {
        'first_name': first_name,
        'last_name': last_name,
        'city': city,
        'state': state,
        'company': company_name,
    }
    
    # Add optional fields if present
    if website:
        cleaned['website'] = website
    if rating is not None:
        try:
            cleaned['rating'] = float(rating)
        except (ValueError, TypeError):
            pass
    
    return cleaned

def enrich_data(input_file: str, output_file: str, company_name: str):
    """Main enrichment function."""
    print(f"🔄 Enriching data for {company_name}...")
    print(f"📥 Input: {input_file}")
    print(f"📤 Output: {output_file}\n")
    
    # Load input data
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            raw_data = json.load(f)
    except FileNotFoundError:
        print(f"❌ Error: File '{input_file}' not found")
        sys.exit(1)
    except json.JSONDecodeError as e:
        print(f"❌ Error: Invalid JSON in '{input_file}': {e}")
        sys.exit(1)
    
    # Handle both list and object formats
    if isinstance(raw_data, dict):
        records = raw_data.get('consultants', raw_data.get('reps', raw_data.get('data', [])))
    elif isinstance(raw_data, list):
        records = raw_data
    else:
        print(f"❌ Error: Unexpected data format")
        sys.exit(1)
    
    print(f"📊 Found {len(records)} raw records\n")
    
    # Clean each record
    cleaned_records = []
    skipped = []
    
    for i, record in enumerate(records):
        cleaned = clean_record(record, company_name)
        
        if cleaned:
            cleaned_records.append(cleaned)
        else:
            # Track why it was skipped
            reason = "Invalid name"
            if not record.get('city') or not normalize_state(record.get('state', '')):
                reason = "Missing/invalid location"
            
            skipped.append({
                'original': record,
                'reason': reason
            })
    
    # Print summary
    print(f"✅ Valid records: {len(cleaned_records)}")
    print(f"❌ Skipped records: {len(skipped)}")
    print(f"📈 Success rate: {len(cleaned_records) / len(records) * 100:.1f}%\n")
    
    # Show sample of skipped records
    if skipped and len(skipped) <= 10:
        print("🗑️  SKIPPED RECORDS:")
        for item in skipped:
            print(f"  - {item['original'].get('title', 'N/A')} ({item['reason']})")
        print()
    elif skipped:
        print(f"🗑️  First 10 skipped records:")
        for item in skipped[:10]:
            print(f"  - {item['original'].get('title', 'N/A')} ({item['reason']})")
        print(f"  ... and {len(skipped) - 10} more\n")
    
    # Write output
    output_data = {
        'company': company_name,
        'total_records': len(records),
        'valid_records': len(cleaned_records),
        'skipped_records': len(skipped),
        'success_rate': f"{len(cleaned_records) / len(records) * 100:.1f}%",
        'consultants': cleaned_records
    }
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, indent=2, ensure_ascii=False)
    
    print(f"✅ Enriched data saved to: {output_file}")
    print(f"🎯 Ready to import {len(cleaned_records)} {company_name} consultants!")

def main():
    parser = argparse.ArgumentParser(
        description='Clean and enrich consultant data for import'
    )
    parser.add_argument('input', help='Input JSON file')
    parser.add_argument('output', help='Output JSON file')
    parser.add_argument('--company', '-c', required=True, help='Company name (e.g., "Mary Kay")')
    
    args = parser.parse_args()
    
    enrich_data(args.input, args.output, args.company)

if __name__ == '__main__':
    main()
