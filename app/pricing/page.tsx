'use client'

import { useState } from 'react'
import Link from 'next/link'

const features = [
  { name: 'Profile listing', free: true, pro: true },
  { name: 'Searchable by location', free: true, pro: true },
  { name: 'Company associations', free: true, pro: true },
  { name: 'Customer reviews', free: true, pro: true },
  { name: 'Profile photo', free: true, pro: true },
  { name: 'Personal website link', free: true, pro: true },
  { name: 'Priority search placement', free: false, pro: true },
  { name: 'PRO badge on profile', free: false, pro: true },
  { name: 'Featured on homepage', free: false, pro: true },
  { name: 'Enhanced visibility', free: false, pro: true },
  { name: 'Review notifications', free: false, pro: true },
  { name: 'Analytics dashboard', free: false, pro: true },
]

const faqs = [
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes! There are no long-term contracts. You can cancel your Pro subscription at any time from your dashboard, and you will continue to have Pro benefits until the end of your billing period.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover) through our secure payment processor, Stripe.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'New Pro subscribers get a 7-day free trial to experience all Pro benefits. You can cancel before the trial ends and won\'t be charged.',
  },
  {
    question: 'What happens to my profile if I downgrade?',
    answer: 'Your profile stays active! You\'ll just lose the Pro benefits like priority placement and the PRO badge. All your reviews and company associations remain.',
  },
  {
    question: 'Can I upgrade or downgrade at any time?',
    answer: 'Absolutely. You can upgrade to Pro instantly, and downgrades take effect at the end of your current billing period.',
  },
  {
    question: 'Do you offer annual billing?',
    answer: 'Yes! Annual billing is coming soon with 2 months free (pay for 10 months, get 12). Join our waitlist to be notified.',
  },
]

const successStories = [
  {
    name: 'Sarah M.',
    company: 'Pampered Chef',
    result: '3x more customer inquiries',
    quote: 'Within the first month of going Pro, I saw a huge increase in customers finding me through IBI.',
  },
  {
    name: 'Jennifer K.',
    company: 'Mary Kay',
    result: '150% increase in bookings',
    quote: 'The PRO badge really builds trust. Customers feel confident reaching out when they see I\'m a verified Pro member.',
  },
  {
    name: 'Michael R.',
    company: 'doTERRA',
    result: 'Top 10 in local search',
    quote: 'Priority placement put me at the top of search results in my city. Best $19 I spend each month.',
  },
]

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [roiInputs, setRoiInputs] = useState({
    avgSale: 100,
    conversionRate: 10,
  })

  const monthlyPrice = 19
  const annualPrice = 190 // 2 months free
  const currentPrice = billingPeriod === 'monthly' ? monthlyPrice : Math.round(annualPrice / 12)

  // ROI Calculator
  const calculateROI = () => {
    const additionalViews = 50 // Average additional monthly profile views for Pro members
    const inquiryRate = 0.15 // 15% of views become inquiries
    const additionalInquiries = additionalViews * inquiryRate
    const additionalSales = additionalInquiries * (roiInputs.conversionRate / 100)
    const additionalRevenue = additionalSales * roiInputs.avgSale
    const roi = ((additionalRevenue - monthlyPrice) / monthlyPrice) * 100
    return {
      additionalInquiries: Math.round(additionalInquiries),
      additionalSales: additionalSales.toFixed(1),
      additionalRevenue: Math.round(additionalRevenue),
      roi: Math.round(roi),
    }
  }

  const roi = calculateROI()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-primary-100 mb-8">
            Get more visibility, more customers, more sales
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-primary-700/50 rounded-lg p-1">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                billingPeriod === 'monthly'
                  ? 'bg-white text-primary-700'
                  : 'text-primary-100 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                billingPeriod === 'annual'
                  ? 'bg-white text-primary-700'
                  : 'text-primary-100 hover:text-white'
              }`}
            >
              Annual
              <span className="ml-1 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                Save 17%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
            <p className="text-gray-500 mb-4">Perfect for getting started</p>
            <div className="text-4xl font-bold text-gray-900 mb-6">
              $0
              <span className="text-lg text-gray-500 font-normal">/month</span>
            </div>

            <ul className="space-y-3 mb-8">
              {features.filter(f => f.free).slice(0, 6).map((feature, i) => (
                <li key={i} className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {feature.name}
                </li>
              ))}
            </ul>

            <Link href="/auth/signup" className="btn btn-secondary w-full text-center block">
              Get Started Free
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-white rounded-xl shadow-xl p-8 border-2 border-primary-600 relative transform md:scale-105">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
              Most Popular
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
            <p className="text-gray-500 mb-4">For serious representatives</p>
            <div className="text-4xl font-bold text-gray-900 mb-2">
              ${currentPrice}
              <span className="text-lg text-gray-500 font-normal">/month</span>
            </div>
            {billingPeriod === 'annual' && (
              <p className="text-sm text-green-600 mb-4">
                Billed annually (${annualPrice}/year)
              </p>
            )}

            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-gray-700">
                <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Everything in Free, plus:</span>
              </li>
              {features.filter(f => f.pro && !f.free).map((feature, i) => (
                <li key={i} className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-primary-600 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">{feature.name}</span>
                </li>
              ))}
            </ul>

            <Link href="/auth/signup" className="btn btn-primary w-full text-center block">
              Start 7-Day Free Trial
            </Link>
            <p className="text-xs text-gray-500 text-center mt-3">
              No credit card required for trial
            </p>
          </div>
        </div>
      </div>

      {/* Feature Comparison Table */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Compare Plans
        </h2>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Feature</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Free</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-primary-600">Pro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {features.map((feature, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 text-sm text-gray-700">{feature.name}</td>
                  <td className="px-6 py-4 text-center">
                    {feature.free ? (
                      <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-gray-300 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <svg className="w-5 h-5 text-primary-600 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ROI Calculator */}
      <div className="bg-primary-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
            Calculate Your ROI
          </h2>
          <p className="text-gray-600 text-center mb-8">
            See how much additional revenue Pro could generate for you
          </p>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Average Sale Value ($)
                </label>
                <input
                  type="number"
                  value={roiInputs.avgSale}
                  onChange={(e) => setRoiInputs({ ...roiInputs, avgSale: Number(e.target.value) || 0 })}
                  className="input w-full"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Inquiry to Sale Conversion Rate (%)
                </label>
                <input
                  type="number"
                  value={roiInputs.conversionRate}
                  onChange={(e) => setRoiInputs({ ...roiInputs, conversionRate: Number(e.target.value) || 0 })}
                  className="input w-full"
                  min="0"
                  max="100"
                />
              </div>
            </div>

            <div className="mt-8 p-6 bg-primary-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-4">Your Estimated Monthly Results with Pro:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-3xl font-bold text-primary-600">{roi.additionalInquiries}</p>
                  <p className="text-sm text-gray-600">Additional Inquiries</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary-600">{roi.additionalSales}</p>
                  <p className="text-sm text-gray-600">Additional Sales</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-green-600">${roi.additionalRevenue}</p>
                  <p className="text-sm text-gray-600">Additional Revenue</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-green-600">{roi.roi}%</p>
                  <p className="text-sm text-gray-600">ROI</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">
                *Based on average Pro member performance. Individual results may vary.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Success Stories
        </h2>
        <p className="text-gray-600 text-center mb-8">
          See what Pro members are saying
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {successStories.map((story, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                  PRO
                </span>
                <span className="text-green-600 font-semibold text-sm">
                  {story.result}
                </span>
              </div>
              <blockquote className="text-gray-700 italic mb-4">
                &ldquo;{story.quote}&rdquo;
              </blockquote>
              <div className="text-sm">
                <p className="font-semibold text-gray-900">{story.name}</p>
                <p className="text-gray-500">{story.company} Representative</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-lg shadow">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-primary-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of successful representatives on IBI Directory
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/auth/signup" className="btn bg-white text-primary-700 hover:bg-gray-100 px-8">
              Start Free Trial
            </Link>
            <Link href="/search" className="btn btn-outline border-white text-white hover:bg-primary-600 px-8">
              Browse Representatives
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
