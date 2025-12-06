require('dotenv').config({ path: '../.env.local' });
const { ApifyClient } = require('apify-client');
const fs = require('fs');

// Initialize Apify client
const client = new ApifyClient({
    token: process.env.APIFY_API_TOKEN
});

async function fetchApifyData(datasetId = null) {
    console.log('🔄 Fetching data from Apify...\n');

    try {
        let items = [];

        if (datasetId) {
            // Fetch from specific dataset
            console.log(`📥 Fetching from dataset: ${datasetId}`);
            const dataset = await client.dataset(datasetId).listItems();
            items = dataset.items;
        } else {
            // List recent datasets
            console.log('📋 Listing your recent datasets...\n');
            const datasets = await client.datasets().list({ limit: 20 });

            console.log(`Found ${datasets.items.length} datasets:\n`);
            datasets.items.forEach((dataset, index) => {
                console.log(`${index + 1}. ID: ${dataset.id}`);
                console.log(`   Name: ${dataset.name || 'Unnamed'}`);
                console.log(`   Items: ${dataset.itemCount}`);
                console.log(`   Created: ${new Date(dataset.createdAt).toLocaleString()}`);
                console.log('');
            });

            console.log('\nTo fetch data from a specific dataset, use:');
            console.log('node scripts/fetch-apify-data.js <datasetId>');
            return;
        }

        console.log(`\n✅ Fetched ${items.length} records\n`);

        // Save to file
        const outputFile = 'apify-data-raw.json';
        fs.writeFileSync(outputFile, JSON.stringify(items, null, 2));
        console.log(`💾 Saved to: ${outputFile}`);

        console.log('\n🎯 Next steps:');
        console.log('1. Preprocess: python scripts/preprocess_apify.py apify-data-raw.json apify-data-simplified.json');
        console.log('2. Enrich: python scripts/enrich_data.py apify-data-simplified.json apify-data-clean.json --company "Multiple"');
        console.log('3. Wipe DB: node scripts/wipe-database.js --confirm');
        console.log('4. Import: node scripts/import-clean-data.js apify-data-clean.json');

    } catch (error) {
        console.error('❌ Error:', error.message);
        if (error.message.includes('Invalid authentication token')) {
            console.error('\n⚠️  Check your APIFY_API_TOKEN in .env.local');
        }
    }
}

// Get dataset ID from command line
const datasetId = process.argv[2] || null;

fetchApifyData(datasetId).catch(console.error);
