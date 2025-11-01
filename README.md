# Direct Sales Representative Directory

A modern, production-ready B2C platform where customers can find direct sales representatives (like Mary Kay, Pampered Chef, Avon) by company, location, or name. Representatives subscribe to get enhanced, searchable profiles.

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Storage:** Supabase Storage
- **Payments:** Stripe

## 📋 Features

### For Customers
- 🔍 Search representatives by company, city, state, or ZIP code
- 📍 Location-based filtering
- ⭐ View representative profiles with reviews
- 🏢 Browse companies and their representatives
- 💬 Submit reviews for representatives

### For Sales Representatives
- 👤 Create and manage profile
- 🏢 Associate with multiple companies
- 💳 Subscribe to Pro membership for enhanced visibility
- 📊 Dashboard to manage profile and settings
- ⭐ Receive and display customer reviews

### Pro Membership Benefits
- 🎯 Priority placement in search results
- 🏆 PRO badge on profile
- ✨ Featured on homepage
- 📈 Enhanced visibility

## 🗄️ Database Schema

The application uses the following database structure:

### Tables
1. **`companies`** - List of direct sales companies
2. **`profiles`** - Representative profiles (extends Supabase Auth users)
3. **`rep_companies`** - Join table linking reps to companies
4. **`reviews`** - Customer reviews for representatives

See `supabase-schema.sql` for the complete schema with RLS policies.

## 🛠️ Setup Instructions

### 1. Prerequisites

- Node.js 18+ and npm
- A Supabase account
- A Stripe account

### 2. Clone and Install

```bash
git clone <repository-url>
cd sales-rep-directory
npm install
```

### 3. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to the SQL Editor
3. Copy and paste the contents of `supabase-schema.sql`
4. Run the SQL to create all tables, policies, and seed data
5. Get your project credentials:
   - Go to Settings > API
   - Copy the Project URL
   - Copy the `anon` public key
   - Copy the `service_role` key (keep this secure!)

### 4. Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the Stripe Dashboard
3. Create a product and price for the Pro subscription:
   - Go to Products > Add Product
   - Name: "Pro Membership"
   - Price: $19/month (recurring)
   - Copy the Price ID (starts with `price_`)

4. Set up webhook endpoint:
   - Go to Developers > Webhooks
   - Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Select events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
   - Copy the webhook signing secret

### 5. Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Stripe Price IDs
STRIPE_PRO_MONTHLY_PRICE_ID=price_xxxxx

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### 7. Test Stripe Webhooks Locally (Optional)

Install Stripe CLI:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

This will give you a webhook signing secret for local testing.

## 📁 Project Structure

```
├── app/
│   ├── api/                    # API routes
│   │   ├── create-checkout-session/
│   │   ├── create-portal-session/
│   │   └── webhooks/stripe/
│   ├── auth/                   # Authentication pages
│   │   ├── login/
│   │   ├── signup/
│   │   ├── callback/
│   │   └── signout/
│   ├── companies/              # Company pages
│   │   ├── [slug]/
│   │   └── page.tsx
│   ├── dashboard/              # Rep dashboard
│   │   ├── companies/
│   │   ├── profile/
│   │   ├── subscription/
│   │   └── page.tsx
│   ├── rep/                    # Rep profile pages
│   │   └── [profileId]/
│   ├── search/                 # Search results
│   ├── pricing/                # Pricing page
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   └── globals.css
├── components/                 # Reusable components
│   ├── Footer.tsx
│   ├── HeroSearch.tsx
│   ├── Navbar.tsx
│   ├── RepCard.tsx
│   ├── StarRating.tsx
│   └── SubmitReviewForm.tsx
├── lib/                        # Utilities
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   └── stripe.ts
├── types/                      # TypeScript types
│   └── database.ts
├── supabase-schema.sql         # Database schema
├── middleware.ts               # Next.js middleware
└── package.json
```

## 🎨 Key Pages

- **`/`** - Home page with search, featured companies, and featured reps
- **`/search`** - Search results with filtering
- **`/rep/[profileId]`** - Individual representative profile
- **`/companies`** - List of all companies
- **`/companies/[slug]`** - Company profile with reps
- **`/auth/login`** - Rep login
- **`/auth/signup`** - Rep signup
- **`/dashboard`** - Rep dashboard
- **`/dashboard/profile`** - Edit profile
- **`/dashboard/companies`** - Manage company associations
- **`/dashboard/subscription`** - Subscription management
- **`/pricing`** - Pricing information

## 🔒 Security Features

- Row Level Security (RLS) policies on all tables
- Server-side authentication checks
- Secure Stripe webhook verification
- Protected dashboard routes
- Safe image uploads to Supabase Storage

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Add all environment variables
4. Deploy

### Update Stripe Webhook URL

After deployment, update your Stripe webhook endpoint URL to:
```
https://yourdomain.com/api/webhooks/stripe
```

### Update Supabase Auth URLs

In your Supabase project settings:
- Add your production URL to allowed redirect URLs
- Update site URL to your production domain

## 📝 Adding Companies

Companies are seeded in the database schema. To add more companies:

```sql
insert into public.companies (name, logo_url, description, category, slug) values
  ('Company Name', null, 'Description', 'Category', 'company-slug');
```

## 🧪 Testing

### Test User Flow
1. Sign up as a representative
2. Complete profile information
3. Add company associations
4. Subscribe to Pro (use Stripe test card: 4242 4242 4242 4242)
5. View your public profile

### Test Customer Flow
1. Search for representatives
2. View rep profiles
3. Submit a review

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
- Check the [Next.js Documentation](https://nextjs.org/docs)
- Check the [Supabase Documentation](https://supabase.com/docs)
- Check the [Stripe Documentation](https://stripe.com/docs)

## 🎯 Roadmap

- [ ] Advanced search with radius-based location filtering
- [ ] Email notifications for new reviews
- [ ] Representative messaging system
- [ ] Analytics dashboard for reps
- [ ] Mobile app
- [ ] Social media integration
- [ ] Advanced review moderation tools
- [ ] Multi-language support

---

Built with ❤️ using Next.js, Supabase, and Stripe
