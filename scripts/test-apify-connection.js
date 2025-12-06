require('dotenv').config({ path: '.env.local' });

console.log('Testing Apify API connection...\n');

// Check if token exists
const token = process.env.APIFY_API_TOKEN;

if (!token) {
    console.error('❌ APIFY_API_TOKEN not found in .env.local');
    console.log('\nAdd this to your .env.local file:');
    console.log('APIFY_API_TOKEN=your_token_here');
    process.exit(1);
}

console.log('✅ API token found');
console.log(`   Token starts with: ${token.substring(0, 10)}...`);
console.log(`   Token length: ${token.length} characters\n`);

// Test API call
const { ApifyClient } = require('apify-client');

async function testConnection() {
    try {
        const client = new ApifyClient({ token });

        console.log('📡 Testing connection to Apify...');
        const datasets = await client.datasets().list({ limit: 5 });

        console.log(`\n✅ SUCCESS! Connected to Apify`);
        console.log(`\nFound ${datasets.items.length} recent datasets:\n`);

        datasets.items.forEach((ds, i) => {
            console.log(`${i + 1}. ${ds.id}`);
            console.log(`   Items: ${ds.itemCount}`);
            console.log(`   Created: ${new Date(ds.createdAt).toLocaleString()}\n`);
        });

    } catch (error) {
        console.error('\n❌ Connection failed:', error.message);
        console.log('\nTroubleshooting:');
        console.log('1. Verify your token at https://console.apify.com/account/integrations');
        console.log('2. Make sure it\'s copied correctly (no spaces)');
        console.log('3. Check the token is set in .env.local');
    }
}

testConnection();
