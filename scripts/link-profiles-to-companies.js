require('dotenv').config({ path: '../.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Load the raw Apify data to get company info
const rawData = JSON.parse(fs.readFileSync('apify-data-raw.json', 'utf8'));

async function linkProfilesToCompanies() {
    console.log('🔗 Linking profiles to companies...\n');

    // Get all companies
    const { data: companies } = await supabase
        .from('companies')
        .select('id, name, slug');

    console.log(`✅ Found ${companies.length} companies\n`);

    // Get all profiles
    const { data: profiles } = await supabase
        .from('profiles')
        .select('id, first_name, last_name');

    console.log(`✅ Found ${profiles.length} profiles\n`);

    let linked = 0;
    let notFound = 0;

    // For each profile, find matching raw data and infer company
    for (const profile of profiles) {
        // Find in raw data by matching name
        const rawRecord = rawData.find(r => {
            const title = r.title || '';
            return title.includes(profile.first_name) && title.includes(profile.last_name);
        });

        if (!rawRecord) {
            notFound++;
            continue;
        }

        // Infer company from title or searchString
        const title = (rawRecord.title || '').toLowerCase();
        const searchString = (rawRecord.searchString || '').toLowerCase();

        let companyId = null;

        // Check for company keywords
        if (title.includes('mary kay') || searchString.includes('mary kay')) {
            companyId = companies.find(c => c.slug === 'mary-kay')?.id;
        } else if (title.includes('scentsy') || searchString.includes('scentsy')) {
            companyId = companies.find(c => c.slug === 'scentsy')?.id;
        } else if (title.includes('pampered chef') || searchString.includes('pampered chef')) {
            companyId = companies.find(c => c.slug === 'pampered-chef')?.id;
        } else if (title.includes('avon') || searchString.includes('avon')) {
            companyId = companies.find(c => c.slug === 'avon')?.id;
        }

        if (!companyId) {
            console.log(`⚠️  No company match for: ${profile.first_name} ${profile.last_name} (${title.substring(0, 50)})`);
            notFound++;
            continue;
        }

        // Link profile to company
        const { error } = await supabase
            .from('rep_companies')
            .insert({
                rep_id: profile.id,
                company_id: companyId
            });

        if (error) {
            if (error.code === '23505') {
                // Already linked, skip
                continue;
            }
            console.error(`❌ Error linking ${profile.first_name}: ${error.message}`);
        } else {
            linked++;
            const company = companies.find(c => c.id === companyId);
            console.log(`✅ ${linked}/${profiles.length}: Linked ${profile.first_name} ${profile.last_name} → ${company.name}`);
        }
    }

    console.log(`\n🎉 LINKING COMPLETE!`);
    console.log(`✅ Linked: ${linked}`);
    console.log(`❌ Not found/matched: ${notFound}`);
}

linkProfilesToCompanies().catch(console.error);
