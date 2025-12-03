import Stripe from 'stripe'

let stripeInstance: Stripe | null = null

export const stripe = (() => {
  if (!stripeInstance) {
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2024-04-10',
      typescript: true,
    })
  }
  return stripeInstance
})()
