require('dotenv').config({ path: '.env.local' });
const { ApifyClient } = require('apify-client');

const client = new ApifyClient({ token: process.env.APIFY_API_TOKEN });

async function listAllData() {
    console.log('🔍 Searching for your Apify data...\n');

    try {
        // Check datasets
        console.log('📊 Datasets:');
        const datasets = await client.datasets().list({ limit: 20 });
        console.log(`   Found: ${datasets.items.length}`);

        if (datasets.items.length > 0) {
            datasets.items.forEach((ds, i) => {
                console.log(`\n   ${i + 1}. ID: ${ds.id}`);
                console.log(`      Items: ${ds.itemCount}`);
                console.log(`      Created: ${new Date(ds.createdAt).toLocaleString()}`);
            });
        }

        // Check key-value stores (sometimes data is here)
        console.log('\n📦 Key-Value Stores:');
        const stores = await client.keyValueStores().list({ limit: 20 });
        console.log(`   Found: ${stores.items.length}`);

        // Check actors (to see what you've run)
        console.log('\n🎬 Your Actors:');
        const actors = await client.actors().list({ limit: 10 });
        console.log(`   Found: ${actors.items.length}`);

        if (actors.items.length > 0) {
            actors.items.forEach((actor, i) => {
                console.log(`\n   ${i + 1}. ${actor.name || actor.id}`);
                console.log(`      ID: ${actor.id}`);
            });
        }

        console.log('\n💡 TIP: If you see 0 datasets, the scraped data might be:');
        console.log('   - Still running');
        console.log('   - Under a different Apify account');
        console.log('   - In the Apify store under "Storage > Datasets"');
        console.log('\nCheck https://console.apify.com/storage/datasets');

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

listAllData();
