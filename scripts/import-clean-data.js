require('dotenv').config({ path: '../.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function importCleanData(filePath) {
    console.log('📥 Importing clean data from:', filePath);

    // Load the enriched JSON
    const absolutePath = path.resolve(filePath);
    const cleanData = JSON.parse(fs.readFileSync(absolutePath, 'utf8'));

    const consultants = cleanData.consultants || cleanData;
    console.log(`\n✅ Loaded ${consultants.length} consultants`);
    console.log(`📊 Company: ${cleanData.company || 'Multiple'}\n`);

    let imported = 0;
    let errors = 0;

    for (const consultant of consultants) {
        try {
            // Create auth user
            const email = `${consultant.first_name.toLowerCase()}.${consultant.last_name.toLowerCase()}.${consultant.state.toLowerCase()}@temp.com`;

            const { data: authData, error: authError } = await supabase.auth.admin.createUser({
                email,
                email_confirm: true
            });

            if (authError) {
                console.error(`❌ Auth error for ${consultant.first_name} ${consultant.last_name}:`, authError.message);
                errors++;
                continue;
            }

            // Update profile
            const { error: profileError } = await supabase
                .from('profiles')
                .update({
                    first_name: consultant.first_name,
                    last_name: consultant.last_name,
                    city: consultant.city,
                    state: consultant.state,
                    personal_website_url: consultant.website || null,
                })
                .eq('id', authData.user.id);

            if (profileError) {
                console.error(`❌ Profile error for ${consultant.first_name} ${consultant.last_name}:`, profileError.message);
                errors++;
                continue;
            }

            imported++;
            console.log(`✅ ${imported}/${consultants.length}: ${consultant.first_name} ${consultant.last_name} (${consultant.city}, ${consultant.state})`);

        } catch (error) {
            console.error(`❌ Unexpected error:`, error.message);
            errors++;
        }
    }

    console.log(`\n🎉 IMPORT COMPLETE!`);
    console.log(`✅ Successfully imported: ${imported}`);
    console.log(`❌ Errors: ${errors}`);
    console.log(`📈 Success rate: ${(imported / consultants.length * 100).toFixed(1)}%`);
}

// Get file path from command line
const filePath = process.argv[2];

if (!filePath) {
    console.log('Usage: node scripts/import-clean-data.js path/to/cleaned-data.json');
    process.exit(1);
}

importCleanData(filePath).catch(console.error);
