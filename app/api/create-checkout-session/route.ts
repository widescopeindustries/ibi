import { createClient } from '@/lib/supabase/server'
import { stripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get billing period from request body (default to monthly)
    let billingPeriod = 'monthly'
    try {
      const body = await request.json()
      billingPeriod = body.billingPeriod || 'monthly'
    } catch {
      // No body or invalid JSON, use default
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id, first_name, last_name')
      .eq('id', user.id)
      .single()

    let customerId = profile?.stripe_customer_id

    // Create Stripe customer if doesn't exist
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          supabase_user_id: user.id,
        },
        name: `${profile?.first_name || ''} ${profile?.last_name || ''}`.trim(),
      })

      customerId = customer.id

      // Save customer ID to profile
      await supabase
        .from('profiles')
        .update({ stripe_customer_id: customerId })
        .eq('id', user.id)
    }

    // Select the correct price ID based on billing period
    const priceId = billingPeriod === 'annual'
      ? process.env.STRIPE_PRO_ANNUAL_PRICE_ID || process.env.STRIPE_PRO_MONTHLY_PRICE_ID!
      : process.env.STRIPE_PRO_MONTHLY_PRICE_ID!

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: 7,
        metadata: {
          billing_period: billingPeriod,
        },
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/subscription?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/subscription?canceled=true`,
      metadata: {
        supabase_user_id: user.id,
        billing_period: billingPeriod,
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error: unknown) {
    console.error(error)
    const errorMessage = error instanceof Error ? error.message : 'An error occurred'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
