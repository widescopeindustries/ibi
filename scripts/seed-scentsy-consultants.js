require('dotenv').config({ path: '../.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client with service role key for admin operations
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

const rawConsultants = [
    // Note: I've filtered to 100+ US-only consultants, removing corporate HQ and duplicate "Denise Steele"
    { title: "Wickless Scents - Carol Hauch- Scentsy Fragrance", city: "Meridian", state: "ID", postalCode: "83646", website: "http://www.carolbh.com/", phone: "(208) 939-4746" },
    { title: "Kristen Atkinson, Independent Scentsy Consultant-Tuttle, OK", city: "Tuttle", state: "OK", postalCode: "73089", website: "http://kmascents.scentsy.us/", phone: "(405) 313-6117" },
    { title: "Cindy's Little Wax Warmer Shop - Independent Scentsy Consultant", city: "San Antonio", state: "TX", website: "https://waxwarmershop.com/", phone: "(210) 872-4406" },
    { title: "Scentsy Fragrance Consultant-Pam Lewing-Myers", city: "Kirbyville", state: "TX", postalCode: "75956", website: "http://pamlewing.scentsy.us/", phone: "(409) 293-7288" },
    { title: "So Fresh With Nia - Scentsy Fragrance Consultant", city: "San Diego", state: "CA", website: "https://sosofresh.scentsy.us/", phone: "(858) 365-0329" },
    { title: "Sonya Pritchett-Arnason - Independent Scentsy Consultant", city: "Derby", state: "KS", postalCode: "67037", website: "http://flameislame.com/", phone: "(316) 644-1155" },
    { title: "Amanda Baker - Scentsy Fragrance Consultant", city: "Lancaster", state: "OH", website: "http://amandabaker77.scentsy.us/", phone: "(740) 503-1488" },
    { title: "Shannon Carder: Lexington SC Independent Scentsy SuperStar Director", city: "Lexington", state: "SC", website: "http://www.shannoncarder.com/" },
    { title: "Scents by Crysta - Independent Scentsy Consultant", website: "https://scentsbycrysta.com/", phone: "(760) 828-8794" },
    { title: "Fragrance with Mrs. Elliott- Independent Scentsy Consultant", website: "https://boards.com/a/isEti9.dbwtIu", phone: "(760) 417-7267" },
    { title: "Jana Bennett - Independent Scentsy Superstar Director", website: "https://janab.scentsy.us/" },
    { title: "Gina Marioni - Scented By Gina - Independent Scentsy Consultant", city: "Cibolo", state: "TX", website: "http://www.scentedbygina.com/", phone: "(682) 310-5682" },
    { title: "The WicklessTwist on Fragrance: Melissa Gratz - Independent Scentsy Consultant", city: "South Lyon", state: "MI", website: "https://www.wicklesstwist.com/", phone: "(248) 789-3109" },
    { title: "Lauren - Independent Scentsy Consultant", city: "Austin", state: "TX", website: "http://latelywithlaurenevans.com/" },
    { title: "Christi Webb, Scentsy Independent Consultant", city: "Temecula", state: "CA", website: "https://christiwebb.scentsy.us/", phone: "(714) 313-1019" },
    { title: "Jenny Hubbs, Independent Scentsy Consultant", website: "https://genyliz73.scentsy.us/", phone: "(925) 421-5309" },
    { title: "Chelli Smith, Texas Independent Scentsy Consultant", website: "http://smellychelli.com/", phone: "(240) 319-4499" },
    { title: "Christal Bonnette, Independent Scentsy Director", website: "http://christalbonnette.scentsy.us/", phone: "(208) 586-3826" },
    { title: "Jasmine Grocher - Independent Scentsy Consultant", website: "http://myscentsquad.com/" },
    { title: "Michelle Brooks - Independent Scentsy Consultant", website: "http://mbrooks.scentsy.us/", phone: "(702) 499-0046" },
    { title: "Jessica Hallberg Independent Scentsy Director", city: "Oxford", state: "OH", website: "http://www.waxfam.com/", phone: "(513) 991-7200" },
    { title: "Toni Ridley - Independent Scentsy Star Director", website: "http://toniridley.scentsy.us/", phone: "(402) 205-5907" },
    { title: "Independent Scentsy Consultant -Lauren Handegard (Beckwith)", website: "https://scentsbylolo.scentsy.us/", phone: "(425) 633-5390" },
    { title: "Courtney Stanley - Independent Scentsy Consultant", website: "https://courtneystanley.scentsy.us/", phone: "(765) 716-2894" },
    { title: "Lacey Perkins- Scentsy Independent Consultant", website: "http://www.laceyperkins.com/", phone: "(513) 480-9800" },
    { title: "Independent Scentsy Consultant -April Sohayda", website: "https://4payton.scentsy.us/" },
    { title: "The Powers' of Scent | Independent Scentsy Consultant", city: "Bakersfield", state: "CA", website: "http://scent2me.scentsy.us/", phone: "(661) 205-0385" },
    { title: "Scentsy Independent Consultant-Vanessa Montoya", phone: "(661) 557-7333" },
    { title: "Melissa Hristovski, Independent Scentsy Consultant", city: "Ashland", state: "OH" },
    { title: "Chasity Robinson-Independent Scentsy SuperStar Director", website: "https://chasityrobinson.scentsy.us/", phone: "(910) 729-9887" },
    { title: "Scentsy Independent Consultant-AngelieShrader", city: "Meridian", state: "ID", website: "http://www.livelifescented.com/", phone: "(208) 284-4800" },
    { title: "Samantha Wolske, Independent Scentsy Consultant", city: "Bedford", state: "OH", website: "http://www.samanthawolske.scentsy.us/" },
    { title: "Scentsy independent consultant Allison Darvis", city: "Alliance", state: "OH", website: "http://adarvis.scentsy.us/" },
    { title: "Fallons scentsy sensations", city: "Saltsburg", state: "PA", website: "https://fallontaylor.scentsy.us/" },
    { title: "Samantha Lipscomb-Independent Scentsy Consultant", website: "http://samanthayoung07.scentsy.us/", phone: "(979) 676-1103" },
    { title: "Jamie Wright Independent Scentsy Consultant", city: "Kansas City", state: "MO", website: "https://jamwright.scentsy.us/", phone: "(816) 216-9418" },
    { title: "Shirley McCallum - Independent Scentsy Director", city: "Tacoma", state: "WA", website: "http://shirleymccallum.scentsy.us/", phone: "(253) 576-9945" },
    { title: "April Campana- Scentsy Fragrance Consultant", city: "Grantsburg", state: "WI", website: "https://aprilcampana.scentsy.us/join", phone: "(715) 494-4014" },
    { title: "Denise Steele- Scentsy Fragrance Consultant", city: "Silverdale", state: "WA", website: "https://denisemompreneur.com/" },
    { title: "Scentsy - Northern Lights - Jannessa Luerra - Independent Scentsy Consultant", city: "Juneau", state: "AK", website: "https://thebest.scentsy.us/", phone: "(907) 723-8389" },
    { title: "Deb Lynch Independent Scentsy Consultant Olney IL", city: "Olney", state: "IL", website: "https://crazyscentlady.com/", phone: "(618) 843-3470" },
    { title: "Kaylee Beebes Scents - Independent Scentsy SuperStar Consultant", city: "Milford", state: "UT", website: "http://kayleejbeebe.scentsy.us/", phone: "(435) 421-4826" },
    { title: "Pawsitively Scented, Randi Hedges Director with Scentsy", city: "Gahanna", state: "OH", website: "https://randi2017.scentsy.us/", phone: "(614) 678-9852" },
    { title: "Jennifer Hartzell - Independent Scentsy Consultant", website: "http://jenniferhartzell.scentsy.us/", phone: "(937) 641-9865" },
    { title: "Scentsy by Linda M. Doherty", city: "Northbridge", state: "MA", website: "https://lindamdoherty.scentsy.us/", phone: "(508) 266-0018" },
    { title: "Laurie Berard Independent Scentsy Consultant -True Fragrance", city: "Bennington", state: "VT", website: "https://truefragrance.scentsy.us/" },
    { title: "Theresa Mahoney, Independent Scentsy Consultant", website: "http://theresamahoney.com/", phone: "(617) 785-7883" },
    { title: "Marianna Nichols - Independent Scentsy Consultant", website: "http://shop.mariannamelts.com/", phone: "(203) 994-6494" },
    { title: "Destiny Jackson Scentsy Consultant", website: "http://dj.scentsy.us/", phone: "(865) 282-1968" },
    { title: "Wickfree Kerri ~ Independent Scentsy Consultant", city: "Concord", state: "NC", website: "https://wickfreekerri.scentsy us/", phone: "(980) 689-0014" },
    { title: "Ashley Kimbleton- Independent Scentsy Consultant", website: "http://ashk.scentsy.us/" },
    { title: "Scentsy with Carrie Williams", city: "Moneta", state: "VA", website: "https://loveforscent.scentsy.us/", phone: "(540) 598-8280" },
    { title: "Scentsy Independent Consultant- Stacey", city: "Elliston", state: "VA", website: "https://scentsandsensability.scentsy.us/", phone: "(540) 765-9824" },
    { title: "Bridget Devine Independent Scentsy Consultant", city: "Maynard", state: "MA", website: "https://bridgetdevine.scentsy.us/", phone: "(781) 760-9994" },
    { title: "Nikki Frey- Independent SCENTSY Consultant", website: "https://nikkiwickless.scentsy.us/", phone: "(307) 679-4531" },
    { title: "Sapphire Scents Independent Scentsy Consultant", website: "https://sapphire.scentsy.us/", phone: "(423) 413-7334" },
    { title: "Jacqui Schlotterbeck Independent Scentsy Director", city: "Central City", state: "IA", website: "https://jacquischlotterbeck.scentsy.us/", phone: "(319) 360-2630" },
    { title: "Lisa Kirby Independent Scentsy Director", city: "Coggon", state: "IA", website: "http://lisakirby.scentsy.us/", phone: "(319) 361-2312" },
    { title: "Scentsy Independent Consultant Mindy Carr", city: "Manchester", state: "IA", website: "http://mindycarr.scentsy.us/", phone: "(919) 397-9121" },
    { title: "Victoria Mitchell - Independent Scentsy Consultant", website: "https://victoriamitchell.scentsy.us/", phone: "(925) 374-2202" },
    { title: "Jessica Jensen- Independent Scentsy Consultant", website: "http://jessjensen.scentsy.us/", phone: "(510) 688-6965" },
    { title: "Scentsy Independent - Stephanie", website: "https://stephanieeann.scentsy.us/party/14167505/stephanies-scents", phone: "(925) 354-2091" },
    { title: "Samantha Romero Independent Scentsy Consultant", city: "Wahiawa", state: "HI", website: "http://www.samantharomero.scentsy.us/", phone: "(917) 325-6327" },
    { title: "Karol Wheeler- Independent Scentsy Consultant", website: "https://karolwheeler.scentsy.us/" },
    { title: "Independent Scentsy consultant Jessica Cuevas", city: "Rosamond", state: "CA", website: "http://www.cuevasjess.scentsy.us/", phone: "(661) 972-4397" },
    { title: "Stephanie Beasley - Independent Scentsy Consultant", city: "Cordova", state: "TN", website: "https://sbeasley.scentsy.us/", phone: "(901) 450-4504" },
    { title: "Patricia Capito-Independent Scentsy Director", website: "https://patriciacapito.scentsy.us/", phone: "(409) 363-1987" },
    { title: "Scented Living with Kris - Scentsy Fragrance Consultant", website: "https://scentabout.scentsy.us/", phone: "(503) 701-8788" },
    { title: "Trisha Kuiee - Independent Scentsy Consultant", website: "https://trishakuiee.scentsy.us/", phone: "(419) 306-7796" },
    { title: "Independent Scentsy Consultant, Robyn Hazelwood", city: "Ashburn", state: "VA", website: "https://sweetrld.scentsy.us/", phone: "(571) 309-7278" },
    { title: "Mike and Becky Scentsy independent consultant", city: "Glendale", state: "AZ", website: "https://azparties.scentsy.us/", phone: "(623) 696-0977" },
    { title: "Melissa Brown ~ Independent Scentsy Consultant", website: "https://melissabrown.scentsy.us/", phone: "(480) 363-5477" },
    { title: "Annmarie Independent Scentsy Consultant", city: "Wahiawa", state: "HI", website: "http://www.annmariecornier.scentsy.us/", phone: "(912) 432-2303" },
    { title: "Scentsy Wickless Candles", city: "Honolulu", state: "HI", phone: "(832) 405-3729" },
    { title: "Lystra Longsworth - Independent Scentsy Consultant", website: "https://scentsbylystra.scentsy.us/", phone: "(210) 313-5509" },
    { title: "Courtney Willard - Independent Scentsy Consultant", website: "http://thatsmellsogoodstuff.scentsy.us/", phone: "(214) 437-2385" },
    { title: "Arizona Scentsy Guys- Independent Scentsy Consultant", website: "http://tbdb.scentsy.us/", phone: "(520) 771-7844" },
    { title: "Carrie's independent scentsy", city: "Bloomsburg", state: "PA", phone: "(570) 441-7850" },
    { title: "Becky Vassar Independent Scentsy Director", city: "Elyria", state: "OH", website: "http://beckyvassar.scentsy.us/", phone: "(440) 731-4123" },
    { title: "Amy Osborne--Independent Scentsy Consultant", city: "Cypress", state: "TX", website: "https://amyosborne.scentsy.us/", phone: "(832) 795-7592" },
    { title: "Anne Howell Scentsy My Sita Marie Independent Scentsy Consultant", city: "Katy", state: "TX", website: "https://mysitamarie.scentsy.us/", phone: "(832) 987-5075" },
    { title: "Alicia Regnault - Independent Scentsy Consultant", city: "Gas City", state: "IN", website: "https://alicia-regnault.scentsy.us/", phone: "(765) 667-0814" },
    { title: "Karlee Neiman - Independent Scentsy Consultant", city: "Filion", state: "MI", website: "https://karneiman.scentsy.com/", phone: "(989) 975-1874" },
    { title: "Megan McDonald Independent Scentsy Consultant", city: "Canton Township", state: "MI", website: "https://mcnoodle.scentsy.us/", phone: "(734) 419-4706" },
    { title: "Carola Russell- Independent Scentsy Consultant", city: "Bradenton", state: "FL", website: "https://carolarussell.scentsy.us/party/17442242/august-online-orders", phone: "(941) 465-2298" },
    { title: "Janey Angus, Independent Scentsy Consultant", city: "Seminole", state: "FL", website: "http://janeyangus.com/", phone: "(901) 626-1196" },
    { title: "Independent Scentsy Director", city: "Loxahatchee", state: "FL", website: "https://wax2themax.scentsy.us/", phone: "(954) 558-8341" },
    { title: "Shelby Greenway: Port St. Lucie, FL Independent Scentsy Director", city: "Port St. Lucie", state: "FL", website: "https://sirenscents.scentsy.us/", phone: "(772) 224-9188" },
    { title: "Scentsy with Jessica Hefton-Dillon", city: "Erie", state: "PA", website: "https://jessica579.scentsy.us/", phone: "(814) 969-2764" },
    { title: "Erica Stiles - Independent Scentsy Consultant", city: "Port Allegany", state: "PA", website: "https://ericastiles19.scentsy.us/", phone: "(814) 331-5629" },
    { title: "Natalie Young Independent Scentsy Consultant", city: "Hornell", state: "NY", website: "http://natalieyoung.scentsy.us/", phone: "(585) 610-9025" },
    { title: "Kira Carr (Estes)- Independent Scentsy Consultant", website: "https://kiraestes.scentsy.us/" },
    { title: "Nelly and Jose Scentsy Independent Star Consultants", city: "Houston", state: "TX", website: "https://nellyjose.scentsy.us/", phone: "(832) 620-9652" },
    { title: "Christy Spencer - Independent Scentsy Consultant", city: "Radcliff", state: "KY", website: "https://cspencer.scentsy.us/", phone: "(270) 319-3967" },
    { title: "Independent Scentsy Consultant Jessica Maurer", city: "Cumberland Furnace", state: "TN", website: "https://jessicamaurer1984.scentsy.us/", phone: "(931) 436-0807" },
    { title: "Scentsy Independent Consultant - Erin Kellems", city: "Owensboro", state: "KY", website: "http://www.ifusion.scentsy.us/", phone: "(270) 993-3940" },
    { title: "Julie Gazley, Independant Scentsy Consultant", city: "Huntingdon", state: "TN", website: "https://juliegazley.scentsy.us/", phone: "(731) 336-1226" },
    { title: "Jackie Vierra- Independent Scentsy Consultant", website: "http://www.jackievierra.scentsy.us/" },
    { title: "Scentsy Director-Jaana Neunteufel", city: "West Chicago", state: "IL", website: "http://jaana.scentsy.us/" },
    { title: "Scentsy by Shannon Independent Consultant", city: "Knoxville", state: "TN", website: "https://shannonrosa99.scentsy.us/" },
    { title: "Magical Scents by Karina (Independent Scentsy Consultant)", city: "Princeton", state: "IN", website: "http://magicalscentsbykarina.com/" },
    { title: "Scentsy Independent Sales Consultant", city: "Georgetown", state: "IN", phone: "(812) 596-1810" },
    { title: "Kelly Nunley your Independent Scentsy Consultant", city: "Grayson", state: "KY", website: "https://kellynunley.scentsy.us/", phone: "(606) 225-9850" }
];

console.log(`Processing ${rawConsultants.length} Scentsy representatives`);

function extractName(title) {
    const cleaned = title
        .replace(/Scentsy/gi, '')
        .replace(/Independent/gi, '')
        .replace(/Consultant/gi, '')
        .replace(/Fragrance/gi, '')
        .replace(/Director/gi, '')
        .replace(/SuperStar/gi, '')
        .replace(/Wickless Scents/gi, '')
        .replace(/So Fresh With/gi, '')
        .replace(/Little Wax Warmer Shop/gi, '')
        .replace(/Star/gi, '')
        .replace(/Sales/gi, '')
        .replace(/:/g, '')
        .replace(/,/g, '')
        .replace(/-/g, ' ')
        .replace(/'/g, '')
        .replace(/\./g, '')
        .replace(/\(/g, '')
        .replace(/\)/g, '')
        .replace(/&/g, 'and')
        .replace(/~/g, '')
        .replace(/'/g, '')
        .replace(/️/g, '')
        .replace(/⭐/g, '')
        .trim();

    const parts = cleaned.split(' ').filter(p => p.length > 0 && p.length < 20);

    if (parts.length === 0) {
        return { first_name: 'Scentsy', last_name: 'Representative' };
    }

    return {
        first_name: parts[0] || 'Scentsy',
        last_name: parts.slice(1).join(' ') || 'Representative'
    };
}

async function seedConsultants() {
    console.log('🚀 Starting to seed Scentsy consultants...');

    const { data: company, error: companyError } = await supabase
        .from('companies')
        .select('id')
        .eq('slug', 'scentsy')
        .single();

    if (companyError || !company) {
        console.error('❌ Scentsy company not found. Please create it first.');
        return;
    }

    console.log(`✅ Found Scentsy company with ID: ${company.id}`);

    let successCount = 0;
    let errorCount = 0;

    for (const consultant of rawConsultants) {
        try {
            const name = extractName(consultant.title);
            const timestamp = Date.now() + Math.random();
            const email = `${name.first_name.toLowerCase()}.${name.last_name.toLowerCase().replace(/\s+/g, '')}.${timestamp}@scentsy.temp`;

            const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
                email: email,
                email_confirm: true,
                user_metadata: { first_name: name.first_name, last_name: name.last_name }
            });

            if (authError) {
                console.error(`❌ Auth error for ${consultant.title}:`, authError.message);
                errorCount++;
                continue;
            }

            const { error: profileError } = await supabase
                .from('profiles')
                .update({
                    city: consultant.city || null,
                    state: consultant.state || null,
                    zip_code: consultant.postalCode || null,
                    personal_website_url: consultant.website || null,
                    bio: `Scentsy Independent Consultant serving ${consultant.city || 'your area'}`
                })
                .eq('id', authUser.user.id);

            if (profileError) {
                console.error(`❌ Profile error for ${consultant.title}:`, profileError.message);
                errorCount++;
                continue;
            }

            const { error: repCompanyError } = await supabase
                .from('rep_companies')
                .insert({ rep_id: authUser.user.id, company_id: company.id });

            if (repCompanyError) {
                console.error(`❌ Link error for ${consultant.title}:`, repCompanyError.message);
                errorCount++;
                continue;
            }

            console.log(`✅ Added: ${name.first_name} ${name.last_name} from ${consultant.city || 'Unknown'}, ${consultant.state || 'N/A'}`);
            successCount++;
            await new Promise(resolve => setTimeout(resolve, 100));

        } catch (error) {
            console.error(`❌ Error for ${consultant.title}:`, error.message);
            errorCount++;
        }
    }

    console.log('\n📊 Summary:');
    console.log(`✅ Successfully added: ${successCount} Scentsy consultants`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log('🎉 Seeding complete!');
}

seedConsultants().catch(console.error);
