require('dotenv').config({ path: '.env.local' });
const { ApifyClient } = require('apify-client');
const fs = require('fs');

const client = new ApifyClient({ token: process.env.APIFY_API_TOKEN });

// Your 7 dataset IDs from the runs
const datasetIds = [
    'C6mWB66xWfxegPyMY',
    'YgIljgllYAG6Fhz7d',
    'V94TJITcfH8bMP8jd',
    'NwkgP18YnCcJHG07D',
    'vNyVrclvE0MS1yuZi',
    'FIiBaRALVreR9ARTI',
    'LsymCaBHIlANmSwBQ'
];

async function fetchAllDatasets() {
    console.log('🔄 Fetching data from 7 Apify datasets...\n');

    let allItems = [];
    let totalFetched = 0;

    for (let i = 0; i < datasetIds.length; i++) {
        const datasetId = datasetIds[i];
        console.log(`📥 Dataset ${i + 1}/7: ${datasetId}`);

        try {
            const dataset = await client.dataset(datasetId).listItems();
            const items = dataset.items;

            console.log(`   ✅ Fetched ${items.length} records`);
            allItems = allItems.concat(items);
            totalFetched += items.length;

        } catch (error) {
            console.log(`   ❌ Error: ${error.message}`);
        }
    }

    console.log(`\n✅ Total records fetched: ${totalFetched}\n`);

    // Save combined data
    const outputFile = 'apify-data-raw.json';
    fs.writeFileSync(outputFile, JSON.stringify(allItems, null, 2));
    console.log(`💾 Saved to: ${outputFile}`);

    console.log('\n🎯 Next steps:');
    console.log('1. python scripts/preprocess_apify.py apify-data-raw.json apify-data-simplified.json');
    console.log('2. python scripts/enrich_data.py apify-data-simplified.json apify-data-clean.json --company "Multiple"');
    console.log('3. node scripts/wipe-database.js --confirm');
    console.log('4. node scripts/import-clean-data.js apify-data-clean.json');
}

fetchAllDatasets().catch(console.error);
