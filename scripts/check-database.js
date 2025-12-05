require('dotenv').config({ path: '../.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkDatabase() {
  console.log('🔍 Checking database...\n');

  // Check companies
  const { data: companies, error: companiesError } = await supabase
    .from('companies')
    .select('*');

  if (companiesError) {
    console.error('❌ Error fetching companies:', companiesError);
  } else {
    console.log(`✅ Companies: ${companies?.length || 0} found`);
    companies?.forEach(c => console.log(`   - ${c.name}`));
  }

  console.log('');

  // Check profiles
  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('*, rep_companies(companies(*))');

  if (profilesError) {
    console.error('❌ Error fetching profiles:', profilesError);
  } else {
    console.log(`✅ Profiles: ${profiles?.length || 0} found`);

    // Count by company
    const byCompany = {};
    profiles?.forEach(p => {
      p.rep_companies?.forEach(rc => {
        const company = rc.companies?.name || 'Unknown';
        byCompany[company] = (byCompany[company] || 0) + 1;
      });
    });

    Object.entries(byCompany).forEach(([company, count]) => {
      console.log(`   - ${company}: ${count} reps`);
    });
  }
}

checkDatabase().catch(console.error);
