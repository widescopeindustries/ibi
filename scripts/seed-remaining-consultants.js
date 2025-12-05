require('dotenv').config({ path: '../.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client with service role key for admin operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const remainingConsultants = [
  {
    "imageUrl": "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=O_eJwOGbhjt9KJr98B4UrA&cb_client=search.gws-prod.gps&w=408&h=240&yaw=265.0059&pitch=0&thumbfov=100",
    "title": "Mary Kay Consultant",
    "totalScore": 5,
    "reviewsCount": 1,
    "street": "11332 S Marathon Ln",
    "city": "Plainfield",
    "state": "Illinois",
    "countryCode": "US",
    "website": "https://www.marykay.com/EIsac",
    "phone": "(307) 277-9736",
    "categoryName": "Beauty product supplier",
    "url": "https://www.google.com/maps/search/?api=1&query=Mary%20Kay%20Consultant&query_place_id=ChIJsbGCmvP3DogRX1x-lVor2HU"
  },
  {
    "imageUrl": "https://lh3.googleusercontent.com/p/AF1QipMFOwR0yxhtcYoPbsqK1Hv_UeKMvZb_pATRc05v=w408-h341-k-no",
    "title": "Mary Kay Cosmetics",
    "totalScore": 5,
    "reviewsCount": 1,
    "website": "https://marykay.com/feliciasfacials",
    "phone": "(281) 297-8775",
    "categoryName": "Beauty product supplier",
    "url": "https://www.google.com/maps/search/?api=1&query=Mary%20Kay%20Cosmetics&query_place_id=ChIJTQ23M_O__CERplEH7d3f41Y"
  },
  {
    "imageUrl": "https://lh3.googleusercontent.com/p/AF1QipPozKD-jb0Ig8wz58nV0yoLR256ZEvlB2gFLkE=w408-h390-k-no",
    "title": "Mary Kay consultant",
    "reviewsCount": 0,
    "street": "Joslin Branch Rd",
    "city": "White Bluff",
    "state": "Tennessee",
    "countryCode": "US",
    "website": "https://www.marykay.com/jwaggoner4",
    "phone": "(615) 268-0492",
    "categoryName": "Beauty product supplier",
    "url": "https://www.google.com/maps/search/?api=1&query=Mary%20Kay%20consultant&query_place_id=ChIJTWD_Eeq9ZIgRVN41kOSGWiE"
  },
  {
    "imageUrl": "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=iagdOJr59YE7BoylfM-t0Q&cb_client=search.gws-prod.gps&w=408&h=240&yaw=302.7103&pitch=0&thumbfov=100",
    "title": "Mary Kay Independent Beauty Consultant",
    "totalScore": 5,
    "reviewsCount": 1,
    "street": "1103 Mockingbird Ln",
    "city": "Carterville",
    "state": "Illinois",
    "countryCode": "US",
    "website": "http://www.marykay.com/sabrina.stewart",
    "phone": "(618) 713-5813",
    "categoryName": "Health and beauty shop",
    "url": "https://www.google.com/maps/search/?api=1&query=Mary%20Kay%20Independent%20Beauty%20Consultant&query_place_id=ChIJFztmYecXd4gRhEVNytxR7E8"
  },
  {
    "title": "Mary Kay Cosmetics",
    "reviewsCount": 0,
    "street": "1929 Holly St",
    "city": "Harrisburg",
    "state": "Pennsylvania",
    "countryCode": "US",
    "website": "https://www.marykay.com/en-us/",
    "phone": "(717) 343-8252",
    "categoryName": "Cosmetics store",
    "url": "https://www.google.com/maps/search/?api=1&query=Mary%20Kay%20Cosmetics&query_place_id=ChIJlyZeIQDByIkRMbe4tUAsxhk"
  },
  {
    "imageUrl": "https://lh3.googleusercontent.com/p/AF1QipO0JF2ww6ZslxDQAiVZb6v09F1KMmHJMK05i9w5=w408-h425-k-no",
    "title": "Mary Kay",
    "reviewsCount": 0,
    "street": "301 N Progress Ave Apt H2",
    "city": "Harrisburg",
    "state": "Pennsylvania",
    "countryCode": "US",
    "website": "http://marykay.com/FMorales34",
    "phone": "(717) 343-8252",
    "categoryName": "Beauty supply store",
    "url": "https://www.google.com/maps/search/?api=1&query=Mary%20Kay&query_place_id=ChIJ_yiDnbHHyIkRukek4vkVfoQ"
  },
  {
    "imageUrl": "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=az5wpOGeXTx7URIYrmwQYg&cb_client=search.gws-prod.gps&w=408&h=240&yaw=274.77222&pitch=0&thumbfov=100",
    "title": "Studio Pink (Mary Kay)",
    "totalScore": 5,
    "reviewsCount": 1,
    "street": "30 Union St",
    "city": "Elizabeth",
    "state": "New Jersey",
    "countryCode": "US",
    "website": "http://www.marykay.com/jwalker2019",
    "phone": "(908) 419-5857",
    "categoryName": "Cosmetics industry",
    "url": "https://www.google.com/maps/search/?api=1&query=Studio%20Pink%20(Mary%20Kay)&query_place_id=ChIJYSqnLQBNwokRaTiohsQvwQ8"
  },
  {
    "title": "Mary kay",
    "reviewsCount": 0,
    "street": "1877 Narrows Branch",
    "city": "Hardy",
    "state": "Kentucky",
    "countryCode": "US",
    "website": "http://www.marykay.com/AWolford",
    "phone": "(606) 471-4991",
    "categoryName": "Cosmetics store",
    "url": "https://www.google.com/maps/search/?api=1&query=Mary%20kay&query_place_id=ChIJyRQCwxV9RYgRTdmpVjzhwbE"
  },
  {
    "title": "MARY KAY",
    "reviewsCount": 0,
    "website": "https://www.marykay.com/HEATHERDEBTER",
    "phone": "(423) 298-7432",
    "categoryName": "Cosmetics store",
    "url": "https://www.google.com/maps/search/?api=1&query=MARY%20KAY&query_place_id=ChIJqRTqotqtYYgRbPyVH4L8CMA"
  },
  {
    "imageUrl": "https://lh3.googleusercontent.com/p/AF1QipMFOwR0yxhtcYoPbsqK1Hv_UeKMvZb_pATRc05v=w408-h341-k-no",
    "title": "Mary Kay Skincare/Cosmetics",
    "reviewsCount": 0,
    "website": "http://www.marykay.com/stephj720",
    "phone": "(718) 308-1808",
    "categoryName": "Beauty product supplier",
    "url": "https://www.google.com/maps/search/?api=1&query=Mary%20Kay%20Skincare%2FCosmetics&query_place_id=ChIJC8siRf1FQIgRKxV945CRgSY"
  }
];

// Helper function to extract username from website URL
function extractUsernameFromWebsite(website) {
  if (!website) return null;
  // Extract the last part of the URL which is usually the username
  const match = website.match(/marykay\.com\/([^\/\?]+)/i);
  return match ? match[1] : null;
}

// Helper function to generate unique name
function generateName(consultant, index) {
  const username = extractUsernameFromWebsite(consultant.website);

  if (username) {
    // If we have a username, use it
    return {
      first_name: username.substring(0, 20),
      last_name: 'MK Rep'
    };
  }

  // Otherwise use city + index
  const city = consultant.city || 'Location';
  return {
    first_name: city.substring(0, 20),
    last_name: `MK Rep ${index + 1}`
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
  console.log('🚀 Starting to seed remaining consultants...');

  // First, get Mary Kay company ID
  const { data: company, error: companyError } = await supabase
    .from('companies')
    .select('id')
    .eq('slug', 'mary-kay')
    .single();

  if (companyError || !company) {
    console.error('❌ Error finding Mary Kay company:', companyError);
    return;
  }

  console.log(`✅ Found Mary Kay company with ID: ${company.id}`);

  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < remainingConsultants.length; i++) {
    const consultant = remainingConsultants[i];
    try {
      const name = generateName(consultant, i);
      const stateAbbr = getStateAbbreviation(consultant.state);

      // Create a unique email
      const timestamp = Date.now();
      const email = `${name.first_name.toLowerCase().replace(/\s+/g, '')}.${name.last_name.toLowerCase().replace(/\s+/g, '')}.${timestamp}@marykay.temp`;

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

      // Associate with Mary Kay company
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
  console.log(`✅ Successfully added: ${successCount} consultants`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log('🎉 Seeding complete!');
}

// Run the seeding
seedConsultants().catch(console.error);
