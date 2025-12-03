import Stripe from 'stripe'

// Lazy initialization to avoid build-time errors when env vars aren't available
let stripeInstance: Stripe | null = null

export function getStripe(): Stripe {
  if (!stripeInstance) {
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2024-04-10',
      typescript: true,
    })
  }
  return stripeInstance
}

// Backward-compatible export (getter that lazily initializes)
export const stripe = {
  get webhooks() { return getStripe().webhooks },
  get checkout() { return getStripe().checkout },
  get billingPortal() { return getStripe().billingPortal },
  get customers() { return getStripe().customers },
  get subscriptions() { return getStripe().subscriptions },
}
