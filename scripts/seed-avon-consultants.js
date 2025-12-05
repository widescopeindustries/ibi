require('dotenv').config({ path: '../.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client with service role key for admin operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const rawConsultants = [
  {
    "title": "Kim's Avon",
    "totalScore": 5,
    "reviewsCount": 1,
    "street": "141 Jamison Rdg Rd",
    "city": "Candler",
    "state": "North Carolina",
    "countryCode": "US",
    "website": "http://www.youravon.com/kjamison",
    "phone": "(828) 713-8497",
    "categoryName": "Beauty product supplier",
    "url": "https://www.google.com/maps/search/?api=1&query=Kim's%20Avon&query_place_id=ChIJPVjrFWePWYgRxAL4AJKXMKM"
  },
  {
    "title": "Cindy's Avon Beauty Center",
    "totalScore": 4.8,
    "reviewsCount": 83,
    "street": "7211 Haven Ave Suite G",
    "city": "Rancho Cucamonga",
    "state": "California",
    "countryCode": "US",
    "website": "https://www.avon.com/repstore/cindygoulet?dc_url=%2Fbrochure-second.html%3Feh%3DY&rep=cindygoulet",
    "phone": "(909) 463-0641",
    "categoryName": "Cosmetics store",
    "url": "https://www.google.com/maps/search/?api=1&query=Cindy's%20Avon%20Beauty%20Center&query_place_id=ChIJfYHWyEZJw4AR5-MU3GyqmDw"
  },
  {
    "title": "Avon Distribution Center",
    "totalScore": 5,
    "reviewsCount": 2,
    "street": "425 Horizon Dr",
    "city": "Suwanee",
    "state": "Georgia",
    "countryCode": "US",
    "website": "http://www.avon.com/",
    "phone": "(770) 271-6100",
    "categoryName": "Cosmetics store",
    "url": "https://www.google.com/maps/search/?api=1&query=Avon%20Distribution%20Center&query_place_id=ChIJpwX_1j6W9YgRnLtKwbOlGzE"
  },
  {
    "title": "Silvia your Avon representative",
    "reviewsCount": 0,
    "street": "22 Spencer Rd",
    "city": "Candler",
    "state": "North Carolina",
    "countryCode": "US",
    "website": "http://youravon.com/silviaamaya",
    "phone": "(828) 423-3764",
    "categoryName": "Cosmetics store",
    "url": "https://www.google.com/maps/search/?api=1&query=Silvia%20your%20Avon%20representative&query_place_id=ChIJsw-L7_uPWYgRAC3w61UxuCo"
  },
  {
    "title": "Terri's Avon Outlet, Gifts & More",
    "totalScore": 5,
    "reviewsCount": 3,
    "street": "1895d Gentry Mem. Hwy",
    "city": "Easley",
    "state": "SC",
    "countryCode": "US",
    "website": "http://www.youravon.com/tkay",
    "phone": "(864) 905-6289",
    "categoryName": "Gift shop",
    "url": "https://www.google.com/maps/search/?api=1&query=Terri's%20Avon%20Outlet%2C%20Gifts%20%26%20More&query_place_id=ChIJN21tPtxPWIgR5Z6THEToMAo"
  },
  {
    "title": "Conyers AVON - In Due Season Gifts",
    "totalScore": 4.8,
    "reviewsCount": 14,
    "street": "Inside Lingering Memories Antique Shop, 1403 Old McDonough Hwy",
    "city": "Conyers",
    "state": "GA",
    "countryCode": "US",
    "website": "http://www.avon.com/?rep=vsingleton",
    "phone": "(770) 896-5225",
    "categoryName": "Health and beauty shop",
    "url": "https://www.google.com/maps/search/?api=1&query=Conyers%20AVON%20-%20In%20Due%20Season%20Gifts&query_place_id=ChIJ7ftVukys9YgR-J8JvMLsUFQ"
  },
  {
    "title": "Avon Representative - Alba Tabares",
    "totalScore": 4.8,
    "reviewsCount": 5,
    "street": "2525 Ozora Church Rd",
    "city": "Lawrenceville",
    "state": "Georgia",
    "countryCode": "US",
    "website": "https://www.avon.com/es/brochure?rep=discounts",
    "phone": "(678) 793-5545",
    "categoryName": "Health and beauty shop",
    "url": "https://www.google.com/maps/search/?api=1&query=Avon%20Representative%20-%20Alba%20Tabares&query_place_id=ChIJr_8Awy7H9YgRnyp-yi4PMf0"
  },
  {
    "title": "Avon By Charlene Poindexter",
    "reviewsCount": 0,
    "street": "2103 State Park Rd",
    "city": "Greenville",
    "state": "South Carolina",
    "countryCode": "US",
    "phone": "(864) 630-8070",
    "categoryName": "Beauty product supplier",
    "url": "https://www.google.com/maps/search/?api=1&query=Avon%20By%20Charlene%20Poindexter&query_place_id=ChIJ4wHoS1ctWIgRYVoMeyLY6OM"
  },
  {
    "title": "Avon Outlet & Boutique",
    "totalScore": 4,
    "reviewsCount": 41,
    "street": "104 N Main St",
    "city": "Fountain Inn",
    "state": "South Carolina",
    "countryCode": "US",
    "phone": "(864) 275-5854",
    "categoryName": "Beauty supply store",
    "url": "https://www.google.com/maps/search/?api=1&query=Avon%20Outlet%20%26%20Boutique&query_place_id=ChIJtRmsxxuKV4gRU8UL-xwOZVk"
  },
  {
    "title": "Avon Concerige",
    "totalScore": 5,
    "reviewsCount": 4,
    "street": "3341 Heatherwood Ln SW",
    "city": "Marietta",
    "state": "Georgia",
    "countryCode": "US",
    "website": "http://www.youravon.com/cherlyncooper",
    "phone": "(404) 861-8576",
    "categoryName": "Gift shop",
    "url": "https://www.google.com/maps/search/?api=1&query=Avon%20Concerige&query_place_id=ChIJE4FPxA899YgR2fuMeTgQAYA"
  },
  {
    "title": "Avon Representative Valeryn",
    "totalScore": 5,
    "reviewsCount": 5,
    "street": "622 Magnolia Dr",
    "city": "Loganville",
    "state": "Georgia",
    "countryCode": "US",
    "website": "http://www.youravon.com/atabares",
    "phone": "(678) 770-9167",
    "categoryName": "Health and beauty shop",
    "url": "https://www.google.com/maps/search/?api=1&query=Avon%20Representative%20Valeryn&query_place_id=ChIJcUnTlZ7J9YgRfQxrV-4SNYA"
  },
  {
    "title": "Lynn's Avon",
    "reviewsCount": 0,
    "street": "327 Patterson Rd",
    "city": "Walland",
    "state": "Tennessee",
    "countryCode": "US",
    "website": "https://www.avon.com/?rep=lynnmyoungen",
    "phone": "(865) 232-8354",
    "categoryName": "Beauty product supplier",
    "url": "https://www.google.com/maps/search/?api=1&query=Lynn's%20Avon&query_place_id=ChIJd4okcy0dXIgRhYTF2OUDItk"
  },
  {
    "title": "Avon Representative Cynthia",
    "totalScore": 5,
    "reviewsCount": 4,
    "street": "Aurora Ct",
    "city": "Denver",
    "state": "North Carolina",
    "countryCode": "US",
    "website": "https://www.avon.com/repstore/cynthiag?rep=cynthiag",
    "phone": "(704) 999-5581",
    "categoryName": "Cosmetics store",
    "url": "https://www.google.com/maps/search/?api=1&query=Avon%20Representative%20Cynthia&query_place_id=ChIJSeJ8SVPnD0QRbB6adZiApwo"
  },
  {
    "title": "AVON INDEPENDENT SALES REPRESENTATIVE ROY MCINERNEY JR.",
    "reviewsCount": 0,
    "street": null,
    "city": "Cleveland",
    "state": "Ohio",
    "countryCode": "US",
    "website": "http://www.youravon.com/rmcinerney",
    "phone": "(216) 309-5998",
    "categoryName": "Cosmetics industry",
    "url": "https://www.google.com/maps/search/?api=1&query=AVON%20INDEPENDENT%20SALES%20REPRESENTATIVE%20ROY%20MCINERNEY%20JR.&query_place_id=ChIJlyVOmafxMIgRklmC2qEUqZo"
  },
  {
    "title": "Avon Beauty Center",
    "totalScore": 4.3,
    "reviewsCount": 14,
    "street": "4954 Great Northern Blvd",
    "city": "North Olmsted",
    "state": "Ohio",
    "countryCode": "US",
    "website": "https://www.avon.com/repstore/jenniferjoseph?rep=jenniferjoseph",
    "phone": "(440) 716-9007",
    "categoryName": "Cosmetics store",
    "url": "https://www.google.com/maps/search/?api=1&query=Avon%20Beauty%20Center&query_place_id=ChIJOzXUPQuTMIgRZYAwEgYlIqU"
  },
  {
    "title": "Beauty Bound selling Avon Now by Dawn",
    "reviewsCount": 0,
    "street": null,
    "city": "Parma",
    "state": "Ohio",
    "countryCode": "US",
    "phone": "(330) 974-5981",
    "categoryName": "Beauty product supplier",
    "url": "https://www.google.com/maps/search/?api=1&query=Beauty%20Bound%20selling%20Avon%20Now%20by%20Dawn&query_place_id=ChIJc2mD-VjvMIgRNqHHWuSHMLI"
  },
  {
    "title": "Avon Products/Health & Beauty",
    "reviewsCount": 0,
    "street": "6110 Merkle Ave",
    "city": "Parma",
    "state": "Ohio",
    "countryCode": "US",
    "website": "http://www.youravon.com/rlombardo",
    "phone": "(216) 534-2678",
    "categoryName": "Beauty products wholesaler",
    "url": "https://www.google.com/maps/search/?api=1&query=Avon%20Products%2FHealth%20%26%20Beauty&query_place_id=ChIJ2SEZLn7vMIgRJs9CCgyFtM0"
  },
  {
    "title": "Mrs Dawn Fairbee's Avon Store",
    "reviewsCount": 0,
    "street": "Remote Ohio",
    "city": "Lorain",
    "state": "Ohio",
    "countryCode": "US",
    "website": "https://www.avon.com/repstore/dfairbee",
    "phone": "(440) 222-1953",
    "categoryName": "Clothing store",
    "url": "https://www.google.com/maps/search/?api=1&query=Mrs%20Dawn%20Fairbee's%20Avon%20Store&query_place_id=ChIJxw7Ds5adMIgRifImAvnNt4w"
  },
  {
    "title": "Avon with Celeste",
    "totalScore": 5,
    "reviewsCount": 3,
    "website": "http://www.youravon.com/cmaxson",
    "phone": "(216) 269-6577",
    "categoryName": "Health and beauty shop",
    "url": "https://www.google.com/maps/search/?api=1&query=Avon%20with%20Celeste&query_place_id=ChIJnVeMeuD_MIgREplnTHCRhG4"
  },
  {
    "title": "Avon with Maisha",
    "totalScore": 5,
    "reviewsCount": 2,
    "website": "https://www.youravon.com/maishalloyd",
    "phone": "(216) 225-6811",
    "categoryName": "Beauty supply store",
    "url": "https://www.google.com/maps/search/?api=1&query=Avon%20with%20Maisha&query_place_id=ChIJl-NB73biMIgRkPpbnHuXJKo"
  },
  {
    "title": "AVON SELL BY EVELYN",
    "reviewsCount": 0,
    "website": "http://www.youravon.com/ecaldero",
    "phone": "(216) 233-1029",
    "categoryName": "Beauty product supplier",
    "url": "https://www.google.com/maps/search/?api=1&query=AVON%20SELL%20BY%20EVELYN&query_place_id=ChIJ29Ed37_vMIgRtdO7tIYSBGY"
  },
  {
    "title": "Avon Beauty Products",
    "totalScore": 5,
    "reviewsCount": 3,
    "street": "16738 Lost Quail Dr",
    "city": "Missouri City",
    "state": "Texas",
    "countryCode": "US",
    "website": "https://avonbeautytoday.com/",
    "phone": "(281) 352-4650",
    "categoryName": "Beauty product supplier",
    "url": "https://www.google.com/maps/search/?api=1&query=Avon%20Beauty%20Products&query_place_id=ChIJ9_J5DPzpQIYR0FtsT2UTkvY"
  },
  {
    "title": "Avon Representative Monica Naegele",
    "totalScore": 3.4,
    "reviewsCount": 8,
    "website": "https://www.avon.com/repstore/mnaegele?rep=mnaegele",
    "phone": "(303) 979-2866",
    "categoryName": "Beauty product supplier",
    "url": "https://www.google.com/maps/search/?api=1&query=Avon%20Representative%20Monica%20Naegele&query_place_id=ChIJ96lURz15a4cRVeI1ePEUCZg"
  },
  {
    "title": "SLV Avon Representative",
    "reviewsCount": 0,
    "street": "# C-3, 8719 US Hwy 285",
    "city": "Alamosa",
    "state": "Colorado",
    "countryCode": "US",
    "categoryName": "Beauty product supplier",
    "url": "https://www.google.com/maps/search/?api=1&query=SLV%20Avon%20Representative&query_place_id=ChIJmZxI9_x7FocRqADfk6i4Lzk"
  },
  {
    "title": "Avon by Monica",
    "totalScore": 5,
    "reviewsCount": 1,
    "street": "Malory Dr",
    "city": "San Jose",
    "state": "California",
    "countryCode": "US",
    "website": "http://www.youravon.com/mpeach",
    "phone": "(408) 203-4134",
    "categoryName": "Beauty product supplier",
    "url": "https://www.google.com/maps/search/?api=1&query=Avon%20by%20Monica&query_place_id=ChIJ2chTWUwxjoARnANxWnPqK4Q"
  },
  {
    "title": "Avon Beauty Corner",
    "totalScore": 1,
    "reviewsCount": 1,
    "website": "http://www.avon.com/repstore/caguirre5",
    "phone": "(408) 821-5753",
    "categoryName": "Beauty product supplier",
    "url": "https://www.google.com/maps/search/?api=1&query=Avon%20Beauty%20Corner&query_place_id=ChIJy3GCwfbTj4AR__M3-v6PISg"
  }
];

// Filter function to identify valid Avon representatives
function isValidAvonRep(consultant) {
  const invalidCategories = [
    'shoe store',
    'convenience store',
    'optometrist',
    'bakery',
    'liquor store',
    'kiosk',
    'cell phone store',
    'hotel',
    'leather goods store',
    'grocery store',
    'candy store',
    'boutique',
    'resort hotel',
    'vacuum cleaner store',
    'home goods store'
  ];

  const invalidKeywords = [
    'boot shop',
    'dairy mart',
    'vision',
    'eye care',
    'eye design',
    'liquor',
    'amazon',
    'verizon',
    'bakery',
    'deli',
    'food mart',
    'computer services',
    'carry out'
  ];

  // Check category
  if (consultant.categoryName) {
    const category = consultant.categoryName.toLowerCase();
    if (invalidCategories.some(cat => category.includes(cat))) {
      return false;
    }
  }

  // Check title
  const title = consultant.title.toLowerCase();
  if (invalidKeywords.some(keyword => title.includes(keyword))) {
    return false;
  }

  // Must have avon-related website or be explicitly Avon representative
  const hasAvonWebsite = consultant.website &&
    (consultant.website.includes('avon.com') || consultant.website.includes('youravon.com'));

  const hasAvonTitle = title.includes('avon');

  return hasAvonWebsite || hasAvonTitle;
}

// Filter consultants
const consultants = rawConsultants.filter(isValidAvonRep);

console.log(`Filtered ${rawConsultants.length} entries down to ${consultants.length} valid Avon representatives`);

// Helper function to extract name from title
function extractName(title) {
  // Remove common Avon related words
  const cleaned = title
    .replace(/Avon/gi, '')
    .replace(/Representative/gi, '')
    .replace(/Independent Sales/gi, '')
    .replace(/Beauty Center/gi, '')
    .replace(/Beauty Products/gi, '')
    .replace(/Beauty Corner/gi, '')
    .replace(/Outlet/gi, '')
    .replace(/Store/gi, '')
    .replace(/selling/gi, '')
    .replace(/Now by/gi, '')
    .replace(/with/gi, '')
    .replace(/by/gi, '')
    .replace(/your/gi, '')
    .replace(/Mrs/gi, '')
    .replace(/,/g, '')
    .replace(/'/g, '')
    .replace(/-/g, ' ')
    .replace(/\./g, '')
    .trim();

  const parts = cleaned.split(' ').filter(p => p.length > 0);

  return {
    first_name: parts[0] || 'Avon',
    last_name: parts.slice(1).join(' ') || 'Representative'
  };
}

// Helper function to extract state abbreviation
function getStateAbbreviation(state) {
  if (!state) return null;
  if (state.length === 2) return state.toUpperCase();

  const states = {
    'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR',
    'California': 'CA', 'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE',
    'Florida': 'FL', 'Georgia': 'GA', 'Hawaii': 'HI', 'Idaho': 'ID',
    'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA', 'Kansas': 'KS',
    'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
    'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS',
    'Missouri': 'MO', 'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV',
    'New Hampshire': 'NH', 'New Jersey': 'NJ', 'New Mexico': 'NM', 'New York': 'NY',
    'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH', 'Oklahoma': 'OK',
    'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
    'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT',
    'Vermont': 'VT', 'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV',
    'Wisconsin': 'WI', 'Wyoming': 'WY'
  };

  return states[state] || state.substring(0, 2).toUpperCase();
}

async function seedConsultants() {
  console.log('🚀 Starting to seed Avon consultants...');

  // First, get Avon company ID
  const { data: company, error: companyError } = await supabase
    .from('companies')
    .select('id')
    .eq('slug', 'avon')
    .single();

  if (companyError || !company) {
    console.error('❌ Error finding Avon company:', companyError);
    return;
  }

  console.log(`✅ Found Avon company with ID: ${company.id}`);

  let successCount = 0;
  let errorCount = 0;

  for (const consultant of consultants) {
    try {
      const name = extractName(consultant.title);
      const stateAbbr = getStateAbbreviation(consultant.state);

      // Create a temporary user for this consultant
      const timestamp = Date.now() + Math.random();
      const email = `${name.first_name.toLowerCase()}.${name.last_name.toLowerCase().replace(/\s+/g, '')}.${timestamp}@avon.temp`;

      const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
        email: email,
        email_confirm: true,
        user_metadata: {
          first_name: name.first_name,
          last_name: name.last_name
        }
      });

      if (authError) {
        console.error(`❌ Error creating auth user for ${consultant.title}:`, authError.message);
        errorCount++;
        continue;
      }

      // Update the profile with additional info
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          bio: consultant.categoryName || null,
          city: consultant.city || null,
          state: stateAbbr,
          personal_website_url: consultant.website || null,
          profile_picture_url: consultant.imageUrl || null
        })
        .eq('id', authUser.user.id);

      if (profileError) {
        console.error(`❌ Error updating profile for ${consultant.title}:`, profileError.message);
        errorCount++;
        continue;
      }

      // Associate with Avon company
      const { error: repCompanyError } = await supabase
        .from('rep_companies')
        .insert({
          rep_id: authUser.user.id,
          company_id: company.id
        });

      if (repCompanyError) {
        console.error(`❌ Error linking to company for ${consultant.title}:`, repCompanyError.message);
        errorCount++;
        continue;
      }

      console.log(`✅ Added: ${name.first_name} ${name.last_name} from ${consultant.city || 'Unknown'}, ${stateAbbr || 'N/A'}`);
      successCount++;

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));

    } catch (error) {
      console.error(`❌ Unexpected error for ${consultant.title}:`, error.message);
      errorCount++;
    }
  }

  console.log('\n📊 Summary:');
  console.log(`✅ Successfully added: ${successCount} Avon consultants`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log('🎉 Seeding complete!');
}

// Run the seeding
seedConsultants().catch(console.error);
