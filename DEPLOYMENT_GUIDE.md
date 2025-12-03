# 🚀 IBI Deployment Guide - Get Live in 20 Minutes!

Your code is pushed to GitHub and ready to deploy. Follow these steps to go live:

---

## Step 1: Deploy to Vercel (5 minutes)

### Option A: Using Vercel CLI (Fastest)

1. **Install Vercel CLI** (if not already installed):
```bash
npm install -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Deploy from your project directory**:
```bash
cd /c/Users/molyndon/ibi
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- What's your project's name? **ibi** (or your preferred name)
- In which directory is your code located? **./**
- Want to override settings? **N**

4. **Deploy to production**:
```bash
vercel --prod
```

### Option B: Using Vercel Dashboard (Recommended for beginners)

1. Go to **https://vercel.com**
2. Click **"Add New Project"**
3. **Import Git Repository**:
   - Select **GitHub**
   - Find **widescopeindustries/ibi**
   - Click **Import**
4. **Configure Project**:
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: **./**
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)
5. Click **"Deploy"**

Vercel will automatically:
- Install dependencies
- Build your Next.js app
- Deploy to production
- Give you a URL like: `https://ibi-xxx.vercel.app`

---

## Step 2: Configure Environment Variables (10 minutes)

Once deployed, add your environment variables in Vercel:

### In Vercel Dashboard:

1. Go to your project → **Settings** → **Environment Variables**
2. Add each variable below (one at a time)

### Required Environment Variables:

#### **Supabase Configuration**
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

**Where to find these:**
- Go to https://supabase.com → Your Project → Settings → API
- Copy Project URL
- Copy `anon` public key
- Copy `service_role` secret key

---

#### **Stripe Configuration**
```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRO_MONTHLY_PRICE_ID=price_...
```

**Where to find these:**
- Go to https://dashboard.stripe.com
- Developers → API keys
- Copy Publishable key and Secret key
- For Price ID: Products → Select "Pro Membership" → Copy Price ID

**IMPORTANT:** Use **live mode** keys for production (not test mode)

---

#### **Google Analytics**
```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Where to get this:**
- Go to https://analytics.google.com
- Admin → Data Streams → Select your web stream
- Copy Measurement ID

**Don't have GA4 yet?**
1. Create account at analytics.google.com
2. Create property for your domain
3. Add web data stream
4. Copy measurement ID

---

#### **Meta Pixel (Facebook)**
```bash
NEXT_PUBLIC_META_PIXEL_ID=1234567890123456
```

**Where to get this:**
- Go to https://business.facebook.com/events_manager
- Select your pixel (or create one)
- Copy Pixel ID (numeric)

**Don't have Meta Pixel yet?**
1. Go to Events Manager
2. Click "Connect Data Sources" → "Web"
3. Choose "Meta Pixel" → "Connect"
4. Name it and copy the ID

---

#### **Email (Resend)**
```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
EMAIL_FROM_ADDRESS=IBI Directory <hello@yourdomain.com>
```

**Where to get this:**
- Go to https://resend.com
- Sign up (free tier: 100 emails/day, 3,000/month)
- Dashboard → API Keys → Create API Key
- Copy the key

**Email address setup:**
- Free tier: Use `onboarding@resend.dev` (for testing)
- Custom domain: Add and verify your domain in Resend, then use `hello@yourdomain.com`

---

#### **Site URL**
```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

**Use your actual production domain:**
- If using Vercel domain: `https://ibi-xxx.vercel.app`
- If using custom domain: `https://yourdomain.com`

---

### Important Notes:

⚠️ **For each variable:**
- Environment: Select **Production**, **Preview**, and **Development** (check all three)
- This ensures variables work everywhere

⚠️ **After adding all variables:**
- Go to **Deployments** tab
- Click ⋯ menu on latest deployment → **Redeploy**
- Select "Use existing Build Cache" → **Redeploy**

---

## Step 3: Update Stripe Webhook URL (3 minutes)

Now that you have a production URL, update Stripe:

1. Go to https://dashboard.stripe.com
2. **Developers** → **Webhooks**
3. Find your webhook endpoint (or create new one)
4. **Endpoint URL**: `https://yourdomain.com/api/webhooks/stripe`
5. **Events to send**:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
6. Click **"Update endpoint"** or **"Add endpoint"**
7. Copy the **Signing secret** (starts with `whsec_`)
8. Add to Vercel environment variables as `STRIPE_WEBHOOK_SECRET` (if not already added)
9. Redeploy if you updated the webhook secret

---

## Step 4: Update Supabase Auth URLs (2 minutes)

Tell Supabase about your production domain:

1. Go to https://supabase.com → Your Project
2. **Authentication** → **URL Configuration**
3. **Site URL**: `https://yourdomain.com`
4. **Redirect URLs**: Add these (one per line):
   ```
   https://yourdomain.com/auth/callback
   https://yourdomain.com/auth/signout
   ```
5. Click **"Save"**

---

## Step 5: Test Your Production Site (5 minutes)

### Manual Testing Checklist:

Visit your production URL and test:

- [ ] **Homepage loads** - Trust signals animate, featured reps show
- [ ] **Search works** - Try searching by company or location
- [ ] **Rep cards display** - PRO badges, ratings, companies show
- [ ] **Pricing page loads** - 3 tiers display, toggle works
- [ ] **Signup works** - Create test account
- [ ] **Login works** - Login with test account
- [ ] **Dashboard loads** - User dashboard accessible
- [ ] **Analytics firing** - Open DevTools → Network → See GA4/Meta requests
- [ ] **SEO working** - Visit `/sitemap.xml` and `/robots.txt`

### Test Stripe Subscription (Use test mode first):

1. Temporarily switch Stripe keys to **test mode**
2. Try to subscribe to Pro
3. Use test card: `4242 4242 4242 4242`, any future date, any CVC
4. Verify subscription updates in dashboard
5. Switch back to **live mode** keys

### Check Analytics:

1. **Google Analytics**:
   - Real-time report: https://analytics.google.com → Reports → Realtime
   - Visit your site, see your visit appear

2. **Meta Pixel**:
   - Install "Meta Pixel Helper" Chrome extension
   - Visit your site
   - Extension shows green checkmark if pixel firing

---

## Step 6: Custom Domain (Optional - 10 minutes)

Want to use your own domain instead of `ibi-xxx.vercel.app`?

### In Vercel:

1. Project Settings → **Domains**
2. Enter your domain: `yourdomain.com`
3. Click **"Add"**

### In Your Domain Registrar (GoDaddy, Namecheap, etc.):

4. Add DNS records as shown by Vercel:
   - **Type**: A or CNAME
   - **Name**: @ or www
   - **Value**: (Vercel provides this)
5. Wait 5-60 minutes for DNS propagation
6. Vercel auto-provisions SSL certificate

### Update URLs After Custom Domain:

- Update `NEXT_PUBLIC_SITE_URL` in Vercel env vars
- Update Stripe webhook URL
- Update Supabase redirect URLs
- Redeploy

---

## Step 7: Submit to Search Engines (5 minutes)

### Google Search Console:

1. Go to https://search.google.com/search-console
2. Click **"Add Property"**
3. Enter your domain
4. Verify ownership (use HTML tag method - easiest)
5. Submit sitemap: `https://yourdomain.com/sitemap.xml`

### Bing Webmaster Tools:

1. Go to https://www.bing.com/webmasters
2. Add site
3. Verify ownership
4. Submit sitemap

**Note:** It takes 1-7 days for search engines to start indexing your site.

---

## Step 8: Set Up Monitoring (Optional - 5 minutes)

### Vercel Analytics (Built-in):
- Already enabled! Check **Analytics** tab in Vercel dashboard
- See real-time performance metrics

### Error Monitoring (Recommended):
Consider adding **Sentry** for error tracking:
1. Sign up at https://sentry.io (free tier available)
2. Install: `npm install @sentry/nextjs`
3. Run: `npx @sentry/wizard@latest -i nextjs`
4. Deploy

---

## 🎉 YOU'RE LIVE!

### Post-Launch Checklist:

- [ ] Site is accessible at production URL
- [ ] All pages load without errors
- [ ] Analytics tracking works
- [ ] Stripe subscriptions work (test mode tested)
- [ ] Email system configured (test welcome email)
- [ ] Custom domain configured (if applicable)
- [ ] Sitemap submitted to search engines
- [ ] Social media cards test (use https://cards-dev.twitter.com/validator)

---

## 🚀 Next Steps: Start Acquiring Customers!

Now that you're live, time to execute the customer acquisition plan from `IMPLEMENTATION_ROADMAP.md`:

### Week 1 Actions:

1. **Join Facebook Groups** (Today):
   - Search for: "Mary Kay consultants", "Avon representatives", "Pampered Chef"
   - Join 20 groups
   - Introduce yourself, provide value for 2-3 days

2. **Create Founding Member Offer** (Today):
   - First 100 reps: 60-day free trial (instead of 30)
   - Founding member badge
   - 50% off for life

3. **Soft Launch Post** (Day 3-4):
   ```
   Hey everyone! 👋 I built a tool to help us direct sales reps
   get found by local customers. It's like Yelp but specifically
   for us. Free to join, and the first 100 reps get special
   founding member perks. Would love your feedback! [link]
   ```

4. **Instagram Outreach** (Days 2-7):
   - Search hashtags: #marykay #avonrep #pamperedchef
   - DM active reps (100+ followers)
   - Personalized message about helping them get local customers

5. **Track Everything**:
   - Check Google Analytics daily
   - Monitor signup rate
   - Track free → paid conversion
   - Adjust messaging based on what works

### Target for Week 1:
- 50-100 rep signups
- 5-10 paying Pro members ($100-200 MRR)
- 500+ site visitors

---

## 🆘 Troubleshooting

### Deployment Failed?
- Check Vercel build logs for errors
- Ensure all dependencies are in `package.json`
- Try `npm run build` locally first

### Environment Variables Not Working?
- Ensure all three environments checked (Production, Preview, Development)
- Redeploy after adding variables
- Variables must start with `NEXT_PUBLIC_` to be available client-side

### Stripe Webhook Failing?
- Verify endpoint URL is correct
- Check webhook signing secret matches Vercel env var
- Test with Stripe CLI: `stripe listen --forward-to yourdomain.com/api/webhooks/stripe`

### Analytics Not Tracking?
- Check browser console for errors
- Verify measurement IDs are correct
- Disable ad blockers when testing
- Wait 24-48 hours for data to appear in dashboards

### Email Not Sending?
- Verify Resend API key is correct
- Check Resend dashboard for error logs
- Free tier limit: 100 emails/day
- Verify email FROM address format

---

## 📞 Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **Stripe Docs**: https://stripe.com/docs

---

## 🎯 Success Metrics to Track

**Week 1:**
- Site uptime: 99.9%+
- Page load time: <2 seconds
- Signup rate: 10%+ of visitors
- Free → Pro conversion: 5-10%

**Month 1:**
- 300 total reps
- 50 Pro members ($1,000 MRR)
- 5,000 monthly visitors
- 0 critical bugs

---

**YOU'VE GOT THIS! LET'S GET TO THAT MONEY! 💰**

*Last updated: 2025-12-03*
