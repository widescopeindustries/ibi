'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import Link from 'next/link'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface ProfileData {
  id: string
  is_pro_subscriber: boolean
  subscription_type?: string
  subscription_start_date?: string
  subscription_end_date?: string
  trial_end_date?: string
  stripe_customer_id?: string
}

const MONTHLY_PRICE = 19
const ANNUAL_PRICE = 190 // 2 months free

const benefits = [
  'Priority placement in search results',
  'PRO badge on your profile',
  'Enhanced profile visibility',
  'Featured on homepage',
  'Review notifications',
  'Analytics dashboard',
]

export default function SubscriptionPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [processing, setProcessing] = useState(false)
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly')
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [modalAction, setModalAction] = useState<'cancel' | 'switch' | null>(null)

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      router.push('/auth/login')
      return
    }

    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    setProfile(data)
    setLoading(false)
  }

  const handleSubscribe = async (period: 'monthly' | 'annual') => {
    setProcessing(true)

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ billingPeriod: period }),
      })

      const { sessionId, error } = await response.json()

      if (error) {
        alert(error)
        return
      }

      const stripe = await stripePromise

      if (stripe) {
        const { error: stripeError } = await stripe.redirectToCheckout({ sessionId })
        if (stripeError) {
          console.error(stripeError)
        }
      }
    } catch (error) {
      console.error(error)
      alert('An error occurred. Please try again.')
    }

    setProcessing(false)
  }

  const handleManageSubscription = async () => {
    setProcessing(true)

    try {
      const response = await fetch('/api/create-portal-session', {
        method: 'POST',
      })

      const { url, error } = await response.json()

      if (error) {
        alert(error)
        return
      }

      window.location.href = url
    } catch (error) {
      console.error(error)
      alert('An error occurred. Please try again.')
    }

    setProcessing(false)
  }

  const handleSwitchPlan = async () => {
    setProcessing(true)
    setShowConfirmModal(false)

    try {
      const newPeriod = profile?.subscription_type === 'pro_monthly' ? 'annual' : 'monthly'
      const response = await fetch('/api/switch-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPeriod }),
      })

      const { success, error } = await response.json()

      if (error) {
        alert(error)
        return
      }

      if (success) {
        alert('Plan updated successfully!')
        loadProfile()
      }
    } catch (error) {
      console.error(error)
      alert('An error occurred. Please try again.')
    }

    setProcessing(false)
  }

  const getSubscriptionStatus = () => {
    if (!profile) return null

    if (profile.trial_end_date) {
      const trialEnd = new Date(profile.trial_end_date)
      const now = new Date()
      const daysLeft = Math.ceil((trialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

      if (daysLeft > 0) {
        return {
          type: 'trial',
          message: `Trial ends in ${daysLeft} day${daysLeft > 1 ? 's' : ''}`,
          color: 'yellow',
        }
      }
    }

    if (profile.is_pro_subscriber) {
      const isAnnual = profile.subscription_type === 'pro_annual'
      return {
        type: isAnnual ? 'pro_annual' : 'pro_monthly',
        message: `Pro ${isAnnual ? 'Annual' : 'Monthly'} Member`,
        color: 'green',
      }
    }

    return {
      type: 'free',
      message: 'Free Plan',
      color: 'gray',
    }
  }

  const status = getSubscriptionStatus()
  const currentPrice = billingPeriod === 'monthly' ? MONTHLY_PRICE : Math.round(ANNUAL_PRICE / 12)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary-600 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Subscription</h1>
          <p className="text-gray-600 mt-1">Manage your Pro membership</p>
        </div>

        {/* Current Status Card */}
        {status && (
          <div className={`mb-8 p-4 rounded-lg border-2 ${
            status.color === 'green' ? 'bg-green-50 border-green-200' :
            status.color === 'yellow' ? 'bg-yellow-50 border-yellow-200' :
            'bg-gray-50 border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  status.color === 'green' ? 'bg-green-100' :
                  status.color === 'yellow' ? 'bg-yellow-100' :
                  'bg-gray-100'
                }`}>
                  {status.type.includes('pro') ? (
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ) : status.type === 'trial' ? (
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{status.message}</p>
                  {profile?.subscription_end_date && (
                    <p className="text-sm text-gray-600">
                      Next billing: {new Date(profile.subscription_end_date).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>

              {profile?.is_pro_subscriber && (
                <button
                  onClick={handleManageSubscription}
                  disabled={processing}
                  className="btn btn-secondary text-sm"
                >
                  Manage Billing
                </button>
              )}
            </div>
          </div>
        )}

        {profile?.is_pro_subscriber ? (
          /* Active Subscriber View */
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Pro Benefits</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Switch Plan Option */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Switch Billing Period</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className={`flex-1 p-4 rounded-lg border-2 ${
                  profile.subscription_type === 'pro_monthly' ? 'border-primary-500 bg-primary-50' : 'border-gray-200'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">Monthly</p>
                      <p className="text-2xl font-bold text-gray-900">${MONTHLY_PRICE}<span className="text-sm font-normal text-gray-600">/mo</span></p>
                    </div>
                    {profile.subscription_type === 'pro_monthly' && (
                      <span className="text-xs bg-primary-600 text-white px-2 py-1 rounded-full">Current</span>
                    )}
                  </div>
                  {profile.subscription_type !== 'pro_monthly' && (
                    <button
                      onClick={() => { setModalAction('switch'); setShowConfirmModal(true); }}
                      disabled={processing}
                      className="btn btn-secondary w-full text-sm mt-2"
                    >
                      Switch to Monthly
                    </button>
                  )}
                </div>

                <div className={`flex-1 p-4 rounded-lg border-2 ${
                  profile.subscription_type === 'pro_annual' ? 'border-primary-500 bg-primary-50' : 'border-gray-200'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">Annual</p>
                      <p className="text-2xl font-bold text-gray-900">${ANNUAL_PRICE}<span className="text-sm font-normal text-gray-600">/year</span></p>
                      <p className="text-sm text-green-600 font-medium">Save $38/year</p>
                    </div>
                    {profile.subscription_type === 'pro_annual' && (
                      <span className="text-xs bg-primary-600 text-white px-2 py-1 rounded-full">Current</span>
                    )}
                  </div>
                  {profile.subscription_type !== 'pro_annual' && (
                    <button
                      onClick={() => { setModalAction('switch'); setShowConfirmModal(true); }}
                      disabled={processing}
                      className="btn btn-primary w-full text-sm mt-2"
                    >
                      Switch to Annual
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Cancel Info */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Need to cancel? You can manage your subscription through the{' '}
                <button
                  onClick={handleManageSubscription}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  billing portal
                </button>
                . Your benefits will continue until the end of your billing period.
              </p>
            </div>
          </div>
        ) : (
          /* Non-Subscriber Upgrade View */
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Upgrade to Pro
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Get more visibility and connect with more customers
              </p>

              {/* Billing Toggle */}
              <div className="inline-flex items-center bg-gray-100 rounded-lg p-1 mb-8">
                <button
                  onClick={() => setBillingPeriod('monthly')}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition ${
                    billingPeriod === 'monthly'
                      ? 'bg-white text-gray-900 shadow'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingPeriod('annual')}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition ${
                    billingPeriod === 'annual'
                      ? 'bg-white text-gray-900 shadow'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Annual
                  <span className="ml-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                    Save 17%
                  </span>
                </button>
              </div>

              {/* Price Display */}
              <div className="mb-8">
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  ${currentPrice}
                  <span className="text-2xl text-gray-600 font-normal">/month</span>
                </div>
                {billingPeriod === 'annual' && (
                  <p className="text-green-600 font-medium">
                    Billed annually (${ANNUAL_PRICE}/year) - Save $38!
                  </p>
                )}
              </div>
            </div>

            {/* Benefits List */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="font-semibold text-gray-900 mb-4">What&apos;s included:</h3>
              <ul className="space-y-3 mb-8">
                {benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {benefit}
                  </li>
                ))}
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  7-day free trial
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Cancel anytime
                </li>
              </ul>

              <button
                onClick={() => handleSubscribe(billingPeriod)}
                disabled={processing}
                className="btn btn-primary w-full text-lg py-3 disabled:opacity-50"
              >
                {processing ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  `Start 7-Day Free Trial`
                )}
              </button>
              <p className="text-center text-sm text-gray-500 mt-3">
                No credit card required to start your trial
              </p>
            </div>

            {/* Comparison Link */}
            <div className="mt-8 text-center">
              <Link href="/pricing" className="text-primary-600 hover:text-primary-700 font-medium">
                Compare plans in detail →
              </Link>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Common Questions</h3>
          <div className="space-y-4">
            <div>
              <p className="font-medium text-gray-900">Can I cancel anytime?</p>
              <p className="text-gray-600 text-sm">Yes! Cancel through the billing portal and keep benefits until period ends.</p>
            </div>
            <div>
              <p className="font-medium text-gray-900">How does the trial work?</p>
              <p className="text-gray-600 text-sm">Get full Pro access for 7 days. Cancel before trial ends to avoid charges.</p>
            </div>
            <div>
              <p className="font-medium text-gray-900">Can I switch between monthly and annual?</p>
              <p className="text-gray-600 text-sm">Yes, you can switch at any time. Changes take effect at the next billing cycle.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {modalAction === 'switch' ? 'Switch Plan?' : 'Cancel Subscription?'}
            </h3>
            <p className="text-gray-600 mb-6">
              {modalAction === 'switch'
                ? 'Your new billing period will start at the end of your current cycle.'
                : 'You will lose access to Pro features at the end of your billing period.'}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="btn btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                onClick={modalAction === 'switch' ? handleSwitchPlan : handleManageSubscription}
                className="btn btn-primary flex-1"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
