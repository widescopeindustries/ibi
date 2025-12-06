require('dotenv').config({ path: '../.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function wipeAllProfiles() {
    console.log('⚠️  WARNING: This will DELETE ALL profiles from the database!');
    console.log('⚠️  This action CANNOT be undone!\n');

    // Fetch all profiles
    const { data: profiles, error: fetchError } = await supabase
        .from('profiles')
        .select('id, first_name, last_name');

    if (fetchError) {
        console.error('❌ Error fetching profiles:', fetchError);
        return;
    }

    console.log(`📊 Found ${profiles.length} profiles to delete\n`);

    if (profiles.length === 0) {
        console.log('✅ Database is already empty!');
        return;
    }

    // If --confirm flag is not passed, show warning
    if (!process.argv.includes('--confirm')) {
        console.log('🛑 To confirm deletion, run:');
        console.log('   node scripts/wipe-database.js --confirm\n');
        return;
    }

    console.log('🗑️  Deleting all profiles...\n');

    // Delete in batches to avoid timeout
    const batchSize = 50;
    let deleted = 0;

    for (let i = 0; i < profiles.length; i += batchSize) {
        const batch = profiles.slice(i, i + batchSize);
        const ids = batch.map(p => p.id);

        const { error: deleteError } = await supabase
            .from('profiles')
            .delete()
            .in('id', ids);

        if (deleteError) {
            console.error(`❌ Error deleting batch ${i / batchSize + 1}:`, deleteError);
        } else {
            deleted += batch.length;
            console.log(`✅ Deleted ${deleted}/${profiles.length} profiles...`);
        }
    }

    console.log(`\n✅ COMPLETE! Deleted ${deleted} profiles`);
    console.log('🎯 Database is now clean and ready for fresh import!');
}

wipeAllProfiles().catch(console.error);
