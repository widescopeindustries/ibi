require('dotenv').config({ path: '../.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

const maryKayBatch2 = [
    {
        "title": "Independent Beauty Consultant with Mary Kay",
        "reviewsCount": 0,
        "website": "https://www.marykay.com/illusionh/en-us/",
        "categoryName": "Cosmetics industry"
    },
    {
        "title": "Mary Kay Aimee M. Garza beauty consultant",
        "totalScore": 5,
        "reviewsCount": 1,
        "street": "2014 Winding View",
        "city": "San Antonio",
        "state": "Texas",
        "countryCode": "US",
        "categoryName": "Beauty products wholesaler"
    },
    {
        "title": "Dawn Mallery, Sales Director with Mary Kay",
        "reviewsCount": 0,
        "street": "525 W 5th St Suite 131",
        "city": "Covington",
        "state": "Kentucky",
        "countryCode": "US",
        "website": "http://www.marykay.com/dmallery",
        "phone": "(859) 394-8829",
        "categoryName": "Cosmetics industry"
    },
    {
        "title": "Maria DiCaro, Independent Mary Kay Beauty Consultant",
        "reviewsCount": 0,
        "street": "385 Old Maple Rd",
        "city": "South Weber",
        "state": "Utah",
        "countryCode": "US",
        "website": "https://www.marykay.com/mdicaro",
        "phone": "(801) 910-1613",
        "categoryName": "Health and beauty shop"
    },
    {
        "title": "Christine McKnight, Mary Kay, Beauty Consultant, Rep, Star Team Builder",
        "reviewsCount": 0,
        "street": "5147 Blackcloud Loop",
        "city": "Colorado Springs",
        "state": "Colorado",
        "countryCode": "US",
        "website": "https://www.marykay.com/cmcknight70",
        "phone": "(719) 650-5659",
        "categoryName": "Consultant"
    },
    {
        "title": "Stacy Welch, Mary Kay Beauty Consultant",
        "totalScore": 5,
        "reviewsCount": 13,
        "street": "6655 W Jewell Ave",
        "city": "Lakewood",
        "state": "Colorado",
        "countryCode": "US",
        "website": "https://www.marykay.com/swelch0518",
        "phone": "(720) 299-6095",
        "categoryName": "Cosmetics store"
    },
    {
        "title": "Araceli Gutierrez Directora de Ventas Independiente Mary Kay, Madison Wi Usa",
        "reviewsCount": 0,
        "street": null,
        "city": "Madison",
        "state": "Wisconsin",
        "countryCode": "US",
        "website": "http://www.marykay.com/agutierrez95",
        "phone": "(608) 215-4681",
        "categoryName": "Cosmetics wholesaler"
    },
    {
        "title": "Mary Kay- Roz Okeke Independent Skincare Consultant",
        "totalScore": 5,
        "reviewsCount": 1,
        "street": "3649 Stubai Trail",
        "city": "Rockford",
        "state": "Illinois",
        "countryCode": "US",
        "website": "https://www.marykay.com/rozokeke",
        "phone": "(815) 218-4120",
        "categoryName": "Cosmetics store"
    },
    {
        "title": "Mary kay",
        "reviewsCount": 0,
        "street": "714 Locust St",
        "city": "Clayton",
        "state": "New Mexico",
        "countryCode": "US",
        "website": "http://www.marykay.com/astory1",
        "phone": "(505) 705-2231",
        "categoryName": "Cosmetics industry"
    },
    {
        "title": "Mary Kay, Independent Beauty Consultant Terri Karle",
        "totalScore": 5,
        "reviewsCount": 3,
        "street": "187 Blue Sky Ln",
        "city": "Springtown",
        "state": "Texas",
        "countryCode": "US",
        "website": "http://www.marykay.com/tkarle",
        "phone": "(405) 251-0120",
        "categoryName": "Health and beauty shop"
    },
    {
        "title": "Latisha Price, Mary Kay Skincare Expert",
        "totalScore": 5,
        "reviewsCount": 25,
        "street": "770 Water St Suite 302",
        "city": "Biloxi",
        "state": "Mississippi",
        "countryCode": "US",
        "website": "http://www.marykay.com/latishalewisprice",
        "phone": "(228) 617-0188",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "MARY KAY Independant SR. SALES DIRECTOR LISA THOMPSON, DESTIN, FL",
        "reviewsCount": 0,
        "street": "4076 Indian Bayou N",
        "city": "Destin",
        "state": "Florida",
        "countryCode": "US",
        "website": "https://marykay.com/LThompson",
        "phone": "(850) 902-8880",
        "categoryName": "Cosmetics industry"
    },
    {
        "title": "Mary Kay Cosmetics Online",
        "reviewsCount": 0,
        "street": "2148 Montgomery Hwy",
        "city": "Dothan",
        "state": "Alabama",
        "countryCode": "US",
        "website": "https://www.marykay.com/vspeights",
        "phone": "(470) 462-7788",
        "categoryName": "Cosmetics wholesaler"
    },
    {
        "title": "Mary Kay",
        "reviewsCount": 0,
        "street": "702 Majestic Prince Ct",
        "city": "Crestview",
        "state": "Florida",
        "countryCode": "US",
        "website": "http://www.marykay.com/vlake",
        "phone": "(850) 240-0515",
        "categoryName": "Skin care clinic"
    },
    {
        "title": "Samantha Tate-Alan Mary Kay Independent Beauty Consultant",
        "reviewsCount": 0,
        "street": "1146 Co Rd 49",
        "city": "Midland City",
        "state": "Alabama",
        "countryCode": "US",
        "website": "https://www.marykay.com/STate-Alan",
        "phone": "(334) 350-9541",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Mary Kay Cosmetics",
        "reviewsCount": 0,
        "street": "685 Maple Ct",
        "city": "Elk Grove Village",
        "state": "Illinois",
        "countryCode": "US",
        "categoryName": "Cosmetics store"
    },
    {
        "title": "Independent Mary Kay Consultant",
        "totalScore": 5,
        "reviewsCount": 1,
        "street": "2189 N Broad St",
        "city": "Galesburg",
        "state": "Illinois",
        "countryCode": "US",
        "website": "http://www.marykay.com/vdowers",
        "phone": "(309) 335-3377",
        "categoryName": "Skin care clinic"
    },
    {
        "title": "Lynnise Finney Brown Mary Kay Sales Director Beauty Consultant",
        "reviewsCount": 0,
        "street": "19162 Borzik Rd",
        "city": "Saucier",
        "state": "Mississippi",
        "countryCode": "US",
        "website": "http://www.marykay.com/lynnisebfit",
        "phone": "(228) 365-1765",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Sarah's Mary Kay",
        "totalScore": 5,
        "reviewsCount": 6,
        "street": "1748 Union Center Maine Hwy",
        "city": "Endicott",
        "state": "New York",
        "countryCode": "US",
        "website": "http://www.marykay.com/SSimonds",
        "phone": "(607) 725-4588",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Mary Kay Beauty Consultant - Loretta Long",
        "reviewsCount": 0,
        "street": "220 Creek Rd",
        "city": "Bath",
        "state": "Pennsylvania",
        "countryCode": "US",
        "website": "http://www.marykay.com/LLong3",
        "categoryName": "Cosmetics store"
    },
    {
        "title": "Mary Kay Associate",
        "reviewsCount": 0,
        "street": "Destiny USA Dr",
        "city": "Syracuse",
        "state": "NY",
        "countryCode": "US",
        "website": "https://www.marykay.com/en-us/find-an-independent-beauty-consultant/profile",
        "phone": "(315) 427-3928",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Marilyn Patrick-Mary Kay Independent Beauty Consultant",
        "reviewsCount": 0,
        "website": "https://www.marykay.com/MJBPatrick",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Mary Kay By Danielle Curry",
        "reviewsCount": 0,
        "street": "1419 N Fairway Rd",
        "city": "Liberty Lake",
        "state": "Washington",
        "countryCode": "US",
        "website": "https://www.marykay.com/DCURRY92",
        "phone": "(509) 842-6391",
        "categoryName": "Make-up artist"
    },
    {
        "title": "Shalynne Barr Integrated Creations, LLC and Mary Kay Independent Beauty Consultant",
        "totalScore": 5,
        "reviewsCount": 1,
        "street": "43100 12 Oaks Crescent Dr",
        "city": "Novi",
        "state": "Michigan",
        "countryCode": "US",
        "website": "http://www.marykay.com/shalynnebarr",
        "phone": "(248) 509-0096",
        "categoryName": "Knitting instructor"
    },
    {
        "title": "Shelley Bottiaux Independent Mary Kay Director",
        "reviewsCount": 0,
        "street": "31306 Spoonbill Rd",
        "city": "Spanish Fort",
        "state": "Alabama",
        "countryCode": "US",
        "website": "http://www.marykay.com/sbottiaux",
        "phone": "(251) 753-9313",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Mary Kay On A Budget",
        "totalScore": 5,
        "reviewsCount": 1,
        "street": "10909 Sabo Rd #128",
        "city": "Houston",
        "state": "Texas",
        "countryCode": "US",
        "website": "http://www.marykay.com/ybejaran",
        "phone": "(713) 562-0584",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Rita Montesano Mary Kay Consultora de Belleza",
        "reviewsCount": 0,
        "street": "1314 S Maple Dr",
        "city": "Katy",
        "state": "Texas",
        "countryCode": "US",
        "website": "https://www.marykay.com/rmontesano/es-US/",
        "phone": "(832) 665-5967",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Becky L. Spaeth, Mary Kay Independent Sales Director",
        "totalScore": 4.8,
        "reviewsCount": 4,
        "street": "221 Floss Rd",
        "city": "San Antonio",
        "state": "Texas",
        "countryCode": "US",
        "website": "http://www.marykay.com/bspaeth",
        "phone": "(210) 710-5167",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Mary kay Consultora Independiente",
        "totalScore": 5,
        "reviewsCount": 5,
        "website": "https://www.marykay.com/rosyrosita",
        "phone": "(281) 966-8798",
        "categoryName": "Health and beauty shop"
    },
    {
        "title": "Mary Kay Consultant",
        "reviewsCount": 0,
        "website": "https://www.marykay.com/MHarken",
        "phone": "(248) 318-6779",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Mary Kay Independent Beauty Consultant",
        "reviewsCount": 0,
        "website": "https://www.marykay.com/rrlopez",
        "phone": "(210) 764-9215",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Consultora de Belleza Mary Kay",
        "reviewsCount": 0,
        "street": "140 Watchung Ave",
        "city": "West Orange",
        "state": "New Jersey",
        "countryCode": "US",
        "website": "https://www.marykay.com/APerez78731",
        "phone": "(914) 223-2970",
        "categoryName": "Beauty supply store"
    },
    {
        "title": "Savela Mary kay Beauty",
        "totalScore": 5,
        "reviewsCount": 1,
        "street": "27697 Blue Mesa Dr",
        "city": "Corona",
        "state": "California",
        "countryCode": "US",
        "website": "https://marykay.com/sandravela",
        "phone": "(714) 499-7950",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Aracely Garcia Mary Kay Beauty Consultant",
        "totalScore": 5,
        "reviewsCount": 1,
        "website": "https://www.marykay.com/AGarcia%20160141",
        "phone": "(714) 598-8230",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Lori Isaacson-Mary Kay Independent Beauty Consultant",
        "totalScore": 5,
        "reviewsCount": 1,
        "street": "W Sunrise Blvd",
        "city": "Plantation",
        "state": "Florida",
        "countryCode": "US",
        "website": "http://www.marykay.com/lori1",
        "phone": "(954) 816-0214",
        "categoryName": "Beauty supply store"
    },
    {
        "title": "Mary Kay Beauty Consultant",
        "totalScore": 5,
        "reviewsCount": 5,
        "website": "http://www.marykay.com/doreenlevy",
        "phone": "(561) 214-0744",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Catalina Muro, Mary Kay Beauty Consultant",
        "reviewsCount": 0,
        "street": "10395 NW 41st St Suite 250",
        "city": "Miami",
        "state": "Florida",
        "countryCode": "US",
        "website": "http://www.marykay.com/cmuro",
        "phone": "(305) 972-2730",
        "categoryName": "Beauty products wholesaler"
    },
    {
        "title": "Mary Kay",
        "reviewsCount": 0,
        "street": "2000 Ponce de Leon",
        "city": "Coral Gables",
        "state": "Florida",
        "countryCode": "US",
        "website": "http://marykay.com/epadron1",
        "phone": "(786) 718-9147",
        "categoryName": "Skin care products vending machine"
    },
    {
        "title": "Mary Kay Beauty Consultant-Nichole Fleming",
        "reviewsCount": 0,
        "street": "1802 Benham Dr",
        "city": "Fort Wayne",
        "state": "Indiana",
        "countryCode": "US",
        "phone": "(260) 223-4596",
        "categoryName": "Consultant"
    },
    {
        "title": "Emily Comisford Mary Kay Consultant",
        "totalScore": 5,
        "reviewsCount": 1,
        "street": "18600 Marne Rd",
        "city": "Nashport",
        "state": "Ohio",
        "countryCode": "US",
        "website": "https://www.marykay.com/ecomisford",
        "phone": "(740) 334-1484",
        "categoryName": "Make-up artist"
    },
    {
        "title": "Mary Kay cosmetics",
        "reviewsCount": 0,
        "street": "2665 Latonia Ave",
        "city": "Dayton",
        "state": "Ohio",
        "countryCode": "US",
        "phone": "(513) 836-4169",
        "categoryName": "Beauty supply store"
    },
    {
        "title": "Mary Kay by Abby",
        "totalScore": 1,
        "reviewsCount": 1,
        "street": "2278 Woodville Pike",
        "city": "Goshen",
        "state": "Ohio",
        "countryCode": "US",
        "website": "https://www.marykay.com/aheist",
        "categoryName": "Cosmetic products manufacturer"
    },
    {
        "title": "Kristen Howard, Mary Kay Independent Beauty Consultant",
        "reviewsCount": 0,
        "website": "http://www.marykay.com/khoward46179",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Mary Kay by Maria Karantonis",
        "totalScore": 5,
        "reviewsCount": 3,
        "street": "431 E Derry Rd Apt. 1W",
        "city": "Hershey",
        "state": "Pennsylvania",
        "countryCode": "US",
        "website": "http://www.marykay.com/mkarantonis/en-us/",
        "phone": "(717) 571-8357",
        "categoryName": "Consultant"
    },
    {
        "title": "Mary Kay Cosmetics",
        "reviewsCount": 0,
        "street": "1632 W Clearfield St",
        "city": "Philadelphia",
        "state": "Pennsylvania",
        "countryCode": "US",
        "website": "http://www.marykay.com/oohlalagorgeous",
        "phone": "(215) 239-5221",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Mary Kay Tracy Potochny",
        "totalScore": 5,
        "reviewsCount": 19,
        "street": "1429 Stonecutter Cir",
        "city": "Hummelstown",
        "state": "Pennsylvania",
        "countryCode": "US",
        "website": "http://www.marykay.com/tpotochny",
        "phone": "(717) 880-1770",
        "categoryName": "Consultant"
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
        "categoryName": "Cosmetics store"
    },
    {
        "title": "Mary kay Products by Yamiliz G",
        "reviewsCount": 0,
        "street": "Wabank St",
        "city": "Lancaster",
        "state": "Pennsylvania",
        "countryCode": "US",
        "website": "https://www.marykay.com/YGerena",
        "phone": "(717) 352-5525",
        "categoryName": "Skin care products vending machine"
    },
    {
        "title": "Monica and Mary Kay",
        "reviewsCount": 0,
        "street": "2005 Harwood Rd",
        "city": "District Heights",
        "state": "Maryland",
        "countryCode": "US",
        "website": "http://www.marykay.com/Mspann",
        "phone": "(301) 806-6898",
        "categoryName": "Make-up artist"
    },
    {
        "title": "Mary Kay",
        "reviewsCount": 0,
        "street": "301 N Progress Ave Apt H2",
        "city": "Harrisburg",
        "state": "Pennsylvania",
        "countryCode": "US",
        "website": "http://marykay.com/FMorales34",
        "phone": "(717) 343-8252",
        "categoryName": "Beauty supply store"
    },
    {
        "title": "MARY KAY - Indep Beauty Consultant/Sales Director)",
        "reviewsCount": 0,
        "street": "23 Bryce Ln",
        "city": "Manahawkin",
        "state": "New Jersey",
        "countryCode": "US",
        "website": "http://www.marykay.com/Sandee",
        "phone": "(602) 697-6529",
        "categoryName": "Cosmetics store"
    },
    {
        "title": "Mary Kay cosmetics and skin care",
        "reviewsCount": 0,
        "street": "45460 Yeager Dr",
        "city": "Wellsville",
        "state": "Ohio",
        "countryCode": "US",
        "website": "http://www.marykay.com/bobbibryson",
        "phone": "(330) 383-5366",
        "categoryName": "Cosmetics industry"
    },
    {
        "title": "Michelle Schutzeus, Mary Kay Independent Beauty Consultant",
        "reviewsCount": 0,
        "website": "http://www.marykay.com/mschutzeus",
        "phone": "(615) 582-1364",
        "categoryName": "Consultant"
    },
    {
        "title": "Mary Kay Independent Sales Director Terriann P Bonfini",
        "reviewsCount": 0,
        "street": "56769 Jordan Run Rd",
        "city": "Bellaire",
        "state": "Ohio",
        "countryCode": "US",
        "website": "https://www.marykay.com/tbonfini",
        "phone": "(304) 280-9498",
        "categoryName": "Skin care clinic"
    }
];

// Helper function to extract name from title
function extractName(title) {
    // Clean up the title
    let cleanTitle = title
        .replace(/Mary Kay|MaryKay/gi, '')
        .replace(/Independent|Beauty|Consultant|Cosmetics|Inc\.|Senior|Sales Director|\/|,/gi, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    // Extract the most likely name
    const parts = cleanTitle.split(' ').filter(p => p && p.length > 1);

    if (parts.length >= 2) {
        return {
            first_name: parts[0].substring(0, 30),
            last_name: parts.slice(1).join(' ').substring(0, 30)
        };
    } else if (parts.length === 1) {
        return {
            first_name: parts[0].substring(0, 30),
            last_name: 'MK Consultant'
        };
    } else {
        return null;
    }
}

// Helper to get state abbreviation
function getStateAbbr(state) {
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
        'Wisconsin': 'WI', 'Wyoming': 'WY', 'GA': 'GA', 'NY': 'NY'
    };

    return states[state] || state.substring(0, 2).toUpperCase();
}

async function seedMaryKayBatch2() {
    console.log('🎁 MARY KAY BATCH 2! Starting import of 50+ more consultants...\n');

    // Get Mary Kay company
    const { data: company, error: companyError } = await supabase
        .from('companies')
        .select('id')
        .eq('slug', 'mary-kay')
        .single();

    if (companyError || !company) {
        console.error('❌ Mary Kay company not found:', companyError);
        return;
    }

    console.log(`✅ Found Mary Kay company ID: ${company.id}\n`);

    let successCount = 0;
    let errorCount = 0;
    let skippedCount = 0;

    for (let i = 0; i < maryKayBatch2.length; i++) {
        const consultant = maryKayBatch2[i];

        try {
            const name = extractName(consultant.title);
            if (!name) {
                console.log(`⏭️  Skipping ${consultant.title} - couldn't extract name`);
                skippedCount++;
                continue;
            }

            const stateAbbr = getStateAbbr(consultant.state);
            const timestamp = Date.now() + i; // Unique timestamp
            const email = `${name.first_name.toLowerCase().replace(/[^a-z0-9]/g, '')}.${name.last_name.toLowerCase().replace(/[^a-z0-9]/g, '')}.${timestamp}@marykay.temp`;

            // Create auth user
            const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
                email: email,
                email_confirm: true,
                user_metadata: {
                    first_name: name.first_name,
                    last_name: name.last_name
                }
            });

            if (authError) {
                console.error(`❌ ${name.first_name} ${name.last_name}:`, authError.message);
                errorCount++;
                continue;
            }

            // Update profile (no phone field)
            const { error: profileError } = await supabase
                .from('profiles')
                .update({
                    bio: consultant.categoryName || null,
                    city: consultant.city || null,
                    state: stateAbbr,
                    personal_website_url: consultant.website || null
                })
                .eq('id', authUser.user.id);

            if (profileError) {
                console.error(`❌ Profile update failed:`, profileError.message);
                errorCount++;
                continue;
            }

            // Link to Mary Kay
            const { error: repError } = await supabase
                .from('rep_companies')
                .insert({
                    rep_id: authUser.user.id,
                    company_id: company.id
                });

            if (repError) {
                console.error(`❌ Rep link failed:`, repError.message);
                errorCount++;
                continue;
            }

            console.log(`✅ ${name.first_name} ${name.last_name} from ${consultant.city || 'Unknown'}, ${stateAbbr || 'N/A'}${consultant.totalScore ? ` (⭐ ${consultant.totalScore})` : ''}`);
            successCount++;

            // Rate limiting
            await new Promise(resolve => setTimeout(resolve, 100));

        } catch (error) {
            console.error(`❌ Unexpected error:`, error.message);
            errorCount++;
        }
    }

    console.log('\n🎁 MARY KAY BATCH 2 SUMMARY:');
    console.log(`✅ Successfully imported: ${successCount} consultants`);
    console.log(`⏭️  Skipped: ${skippedCount}`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`\n🎄 MORE Mary Kay pages for SEO: ${successCount}!`);
    console.log(`🚀 Combined total with Batch 1: ~${69 + successCount} Mary Kay consultants!\n`);
}

seedMaryKayBatch2().catch(console.error);
