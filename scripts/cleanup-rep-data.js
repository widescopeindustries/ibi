require('dotenv').config({ path: '../.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Common non-name words to flag
const invalidNamePatterns = [
    /consultant/i,
    /director/i,
    /beauty/i,
    /skincare/i,
    /sales/i,
    /independent/i,
    /\bwith\b/i,
    /\bby\b/i,
    /\binc\b/i,
    /\bmk\b/i,
    /\bhq\b/i,
    /\band\b/i,
    /^-/,
    /;/,
];

async function cleanupRepData() {
    console.log('🧹 Starting data cleanup...\n');

    // Fetch all profiles
    const { data: profiles, error } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, city, state')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching profiles:', error);
        return;
    }

    console.log(`Found ${profiles.length} total profiles\n`);

    let invalidCount = 0;
    let missingLocationCount = 0;
    const invalidProfiles = [];

    profiles.forEach(profile => {
        let issues = [];

        // Check for invalid first names
        if (profile.first_name) {
            for (const pattern of invalidNamePatterns) {
                if (pattern.test(profile.first_name)) {
                    issues.push(`Invalid first_name: "${profile.first_name}"`);
                    break;
                }
            }
        }

        // Check for invalid last names
        if (profile.last_name) {
            for (const pattern of invalidNamePatterns) {
                if (pattern.test(profile.last_name)) {
                    issues.push(`Invalid last_name: "${profile.last_name}"`);
                    break;
                }
            }
        }

        // Check for missing location
        if (!profile.city || !profile.state) {
            issues.push('Missing location');
            missingLocationCount++;
        }

        if (issues.length > 0) {
            invalidCount++;
            invalidProfiles.push({
                id: profile.id,
                first_name: profile.first_name,
                last_name: profile.last_name,
                city: profile.city,
                state: profile.state,
                issues
            });
        }
    });

    console.log('\n📊 CLEANUP SUMMARY:');
    console.log(`Total profiles: ${profiles.length}`);
    console.log(`Profiles with issues: ${invalidCount}`);
    console.log(`Missing locations: ${missingLocationCount}`);

    console.log('\n❌ INVALID PROFILES:');
    invalidProfiles.forEach(p => {
        console.log(`\nID: ${p.id}`);
        console.log(`Name: ${p.first_name} ${p.last_name}`);
        console.log(`Location: ${p.city || 'N/A'}, ${p.state || 'N/A'}`);
        console.log(`Issues: ${p.issues.join(', ')}`);
    });

    console.log('\n\n🗑️  DELETE THESE PROFILES? (y/n)');
    console.log('Run this script with --delete flag to remove invalid profiles');

    // If --delete flag is passed, delete them
    if (process.argv.includes('--delete')) {
        console.log('\n🗑️  Deleting invalid profiles...');

        for (const profile of invalidProfiles) {
            const { error } = await supabase
                .from('profiles')
                .delete()
                .eq('id', profile.id);

            if (error) {
                console.error(`❌ Failed to delete ${profile.id}:`, error.message);
            } else {
                console.log(`✅ Deleted: ${profile.first_name} ${profile.last_name}`);
            }
        }

        console.log(`\n✅ Cleanup complete! Deleted ${invalidProfiles.length} profiles`);
    } else {
        console.log('\nTo delete these profiles, run: node scripts/cleanup-rep-data.js --delete');
    }
}

cleanupRepData().catch(console.error);
