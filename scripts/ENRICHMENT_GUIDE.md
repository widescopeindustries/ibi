# Data Enrichment Script - Usage Guide

## Purpose
Universal Python script to clean, validate, and format ANY consultant JSON data for import into the database.

## What It Does
✅ Validates names (removes "consultant", "MK", "by", "with", etc.)  
✅ Extracts proper first/last names  
✅ Validates locations (must have city + state)  
✅ Normalizes state codes (CA, TX, NY, etc.)  
✅ Filters out junk data  
✅ Outputs clean JSON ready for import

## Usage

```bash
python scripts/enrich_data.py input.json output.json --company "Company Name"
```

### Examples:

**Mary Kay:**
```bash
python scripts/enrich_data.py mary-kay-raw.json mary-kay-clean.json --company "Mary Kay"
```

**Avon:**
```bash
python scripts/enrich_data.py avon-raw.json avon-clean.json --company "Avon"
```

**Any Company:**
```bash
python scripts/enrich_data.py raw-data.json cleaned-data.json -c "Pampered Chef"
```

## Input Format

The script accepts JSON in multiple formats:

### Format 1: Array of objects
```json
[
  {
    "title": "Jane Smith Mary Kay Consultant",
    "city": "Dallas",
    "state": "TX",
    "website": "https://example.com",
    "rating": 4.8
  }
]
```

###Format 2: Object with consultants array
```json
{
  "consultants": [
    {
      "title": "John Doe",
      "city": "Houston",
      "state": "Texas"
    }
  ]
}
```

## Output Format

Clean, validated JSON:

```json
{
  "company": "Mary Kay",
  "total_records": 200,
  "valid_records": 135,
  "skipped_records": 65,
  "success_rate": "67.5%",
  "consultants": [
    {
      "first_name": "Jane",
      "last_name": "Smith",
      "city": "Dallas",
      "state": "TX",
      "company": "Mary Kay",
      "website": "https://example.com",
      "rating": 4.8
    }
  ]
}
```

## What Gets Filtered Out

❌ **Invalid Names:**
- "Sales MK Consultant"
- "with Tay"
- "by Maria"
- ";Kimeco Green"
- "-Jessica Black"
- "Consultant Director"

❌ **Missing Data:**
- No city
- No state
- Invalid state code

## Validation Rules

### Name Validation:
- Must have first AND last name
- Cannot contain: consultant, director, beauty, skincare, sales, independent, MK, HQ, Inc, LLC
- Cannot start with: with, by, and, -
- Must be at least 2 characters

### Location Validation:
- City: Required, properly capitalized
- State: Must be valid US state (2-letter code)
- Automatically converts "Texas" → "TX", "California" → "CA", etc.

## After Enrichment

Use the cleaned JSON with import scripts:

```javascript
// In your seed script
const cleanedData = require('./mary-kay-clean.json');

for (const consultant of cleanedData.consultants) {
  // Import to database
  const { data: user } = await supabase.auth.admin.createUser({
    email: `${consultant.first_name}.${consultant.last_name}@temp.com`,
    email_confirm: true
  });
  
  await supabase.from('profiles').update({
    first_name: consultant.first_name,
    last_name: consultant.last_name,
    city: consultant.city,
    state: consultant.state,
    personal_website_url: consultant.website
  }).eq('id', user.user.id);
}
```

## Tips

1. **Always run enrichment FIRST** before creating import scripts
2. **Check the success rate** - should be 60%+ (lower means bad source data)
3. **Review skipped records** - sometimes valid data gets filtered
4. **Multiple passes** - you can run the script multiple times on different data sources

## Workflow

```
Raw Data (200 records)
    ↓
python enrich_data.py
    ↓
Cleaned Data (135 valid records)
    ↓
Import Script
    ↓
Database (135 new reps!)
```

This is your **data quality gate** before scaling to 2000+ reps!
