import { NextRequest, NextResponse } from 'next/server';
import { ApifyClient } from 'apify-client';
import { createClient } from '@supabase/supabase-js';

// Lazy initialization to prevent build-time errors
function getSupabaseAdmin() {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
        throw new Error('Missing Supabase environment variables');
    }

    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        }
    );
}

function getApifyClient() {
    if (!process.env.APIFY_API_TOKEN) {
        throw new Error('Missing Apify API token');
    }

    return new ApifyClient({
        token: process.env.APIFY_API_TOKEN,
    });
}

export async function POST(req: NextRequest) {
    try {
        // 1. Security Check
        const authHeader = req.headers.get('authorization');
        if (authHeader !== `Bearer ${process.env.INGEST_SECRET}`) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // 2. Fetch Latest Successful Run from Apify
        const apifyClient = getApifyClient();
        const actorId = 'jgPGyNASHz85x7DXe'; // Your Actor ID
        const runs = await apifyClient.actor(actorId).runs().list({
            desc: true,
            status: 'SUCCEEDED',
            limit: 1,
        });

        if (runs.items.length === 0) {
            return NextResponse.json({ error: 'No successful runs found' }, { status: 404 });
        }

        const lastRun = runs.items[0];
        const datasetId = lastRun.defaultDatasetId;

        console.log(`📥 Ingesting data from Run ID: ${lastRun.id} (Dataset: ${datasetId})`);

        // 3. Fetch Dataset Items
        const { items } = await apifyClient.dataset(datasetId).listItems();
        console.log(`📊 Found ${items.length} items to process`);

        let processed = 0;
        let errors = 0;

        // 4. Process & Upsert to Supabase
        for (const item of items) {
            try {
                const rep = item as any; // Cast to specific type if shared

                // Skip if critical data is missing
                if (!rep.firstName || !rep.lastName || !rep.state) {
                    continue;
                }

                // Construct unique email (or use real one if available and reliable)
                // Note: Using the temp email pattern from existing scripts to maintain consistency
                const email = rep.email || `${rep.firstName.toLowerCase()}.${rep.lastName.toLowerCase()}.${rep.state.toLowerCase()}@temp.com`;

                // Clean strings
                const firstName = rep.firstName.trim();
                const lastName = rep.lastName.trim();
                const city = rep.city ? rep.city.trim() : null;
                const state = rep.state.trim();

                // A. Create/Get Auth User
                // We use 'createUser' which returns the user if they already exist (in some configs) 
                // or we check existence first. For simplicity/speed in bulk, we'll try create and catch error.

                let userId = '';

                const supabaseAdmin = getSupabaseAdmin();

                // Check if user exists by email first to avoid error spam
                const { data: existingUser } = await supabaseAdmin.rpc('get_user_id_by_email', { email });
                // RPC might not exist, so let's try the admin ListUsers approach or just try Create.
                // Actually, admin.createUser throws if email exists.

                // Alternative: Use upsert pattern if possible, but Auth is special.
                // We will try to create; if it fails, we fetch the user by email.

                const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
                    email,
                    email_confirm: true,
                    user_metadata: { first_name: firstName, last_name: lastName }
                });

                if (createError) {
                    // If user already exists, we need their ID to update the profile
                    // There isn't a direct "getUserByEmail" in admin API easily without ListItems.
                    // We can assume if create fails, they check `createError.message`.
                    if (createError.message.includes('already registered')) {
                        // Fetch list to find them (slow but functional)
                        // Or we could rely on a lookup table if we had one.
                        // For now, let's list users with filter? admin.listUsers supports filter? No, standard listUsers is paginated.
                        // Optimization: Just don't update if they exist? Or we really want to update profile?
                        // Let's assume we want to update profile data.

                        // Note: Supabase Admin API doesn't have "getUserByEmail".
                        // We'll skip auth creation and unfortunately might miss the ID if we can't find it easily. 
                        // However, we CAN query the 'profiles' table (public) if we have the email stored there? 
                        // But profiles doesn't have email usually.

                        // Wait! The fake email algorithm is deterministic.
                        // So we don't strictly need the Auth ID *if* we can query profiles by something else?
                        // But profiles table primary key is uuid (auth.id).

                        // WORKAROUND: We will skip updating *existing* users for now to save complexity, 
                        // OR we assume we can't easily update them without a better lookup mechanism.
                        // But we CAN use `listUsers` with search?
                        // `supabase.auth.admin.listUsers({ page: 1, perPage: 1 })` isn't searchable by email easily in all versions.

                        // Actually, let's keep it simple: If create fails, we skip auth, but we try to find the profile?
                        // We can't find the profile without the ID.
                        // So we skip.
                    }
                } else {
                    userId = newUser.user.id;
                }

                if (!userId) {
                    // If we didn't create a new user, and strictly need ID, we might be stuck.
                    // BUT: We can store the email in profiles to make this easier in future?
                    // For now, let's just log and continue.
                    // Actually, let's try to query profiles by first/last/state as a fallback?
                    const { data: existingProfiles } = await supabaseAdmin
                        .from('profiles')
                        .select('id')
                        .eq('first_name', firstName)
                        .eq('last_name', lastName)
                        .eq('state', state)
                        .maybeSingle();

                    if (existingProfiles) {
                        userId = existingProfiles.id;
                    }
                }

                if (!userId) continue;

                // B. Upsert Profile
                const { error: profileError } = await supabaseAdmin
                    .from('profiles')
                    .upsert({
                        id: userId, // Link to Auth User
                        first_name: firstName,
                        last_name: lastName,
                        city: city,
                        state: state,
                        personal_website_url: rep.personalWebsite || rep.profileUrl,
                        updated_at: new Date().toISOString(),
                    });

                if (profileError) {
                    console.error(`❌ Profile error for ${firstName}:`, profileError.message);
                    errors++;
                } else {
                    processed++;
                }

            } catch (err) {
                console.error('Error processing item:', err);
                errors++;
            }
        }

        return NextResponse.json({
            success: true,
            processed,
            errors,
            message: `Ingested ${processed} reps with ${errors} errors.`
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
