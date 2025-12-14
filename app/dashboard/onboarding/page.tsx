'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function OnboardingPage() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [userId, setUserId] = useState<string | null>(null)

    // Profile State
    const [profile, setProfile] = useState({
        first_name: '',
        last_name: '',
        bio: '',
        city: '',
        state: '',
        zip_code: '',
        personal_website_url: '',
    })

    // Company State
    const [allCompanies, setAllCompanies] = useState<any[]>([])
    const [selectedCompanies, setSelectedCompanies] = useState<number[]>([])

    useEffect(() => {
        loadInitialData()
    }, [])

    const loadInitialData = async () => {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            router.push('/auth/login')
            return
        }

        setUserId(user.id)

        // Load existing profile data
        const { data: existingProfile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()

        if (existingProfile) {
            setProfile({
                first_name: existingProfile.first_name || '',
                last_name: existingProfile.last_name || '',
                bio: existingProfile.bio || '',
                city: existingProfile.city || '',
                state: existingProfile.state || '',
                zip_code: existingProfile.zip_code || '',
                personal_website_url: existingProfile.personal_website_url || '',
            })
        }

        // Load all companies
        const { data: companies } = await supabase
            .from('companies')
            .select('*')
            .order('name')

        setAllCompanies(companies || [])

        // Load selected companies
        const { data: repCompanies } = await supabase
            .from('rep_companies')
            .select('company_id')
            .eq('rep_id', user.id)

        setSelectedCompanies(repCompanies?.map(rc => rc.company_id) || [])

        setLoading(false)
    }

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        const supabase = createClient()

        // Basic validation
        if (!profile.city || !profile.state || !profile.zip_code) {
            alert('Please fill in your location details')
            setSaving(false)
            return
        }

        const { error } = await supabase
            .from('profiles')
            .update(profile)
            .eq('id', userId)

        if (error) {
            alert('Failed to save profile')
        } else {
            setStep(2)
            window.scrollTo(0, 0)
        }

        setSaving(false)
    }

    const handleFinalize = async () => {
        setSaving(true)
        // Companies are toggled in real-time or we could batch save here.
        // Given the previous pattern, let's assume they are correct in state, 
        // but the previous component toggled them one by one. 
        // For onboarding, it's safer to just proceed to dashboard if they selected at least one.

        if (selectedCompanies.length === 0) {
            const confirm = window.confirm('You haven\'t selected any companies. Are you sure you want to proceed associated with no brands?')
            if (!confirm) {
                setSaving(false)
                return
            }
        }

        router.push('/dashboard')
        router.refresh()
    }

    const handleToggleCompany = async (companyId: number) => {
        if (!userId) return

        const supabase = createClient()
        const isSelected = selectedCompanies.includes(companyId)

        // Optimistic UI update
        if (isSelected) {
            setSelectedCompanies(prev => prev.filter(id => id !== companyId))
            await supabase
                .from('rep_companies')
                .delete()
                .eq('rep_id', userId)
                .eq('company_id', companyId)
        } else {
            setSelectedCompanies(prev => [...prev, companyId])
            await supabase
                .from('rep_companies')
                .insert({
                    rep_id: userId,
                    company_id: companyId,
                })
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-600">Loading your setup...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Progress Steps */}
                <div className="mb-8">
                    <div className="flex items-center justify-center space-x-4">
                        <div className={`flex items-center ${step >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-primary-600 bg-primary-50' : 'border-gray-300'}`}>
                                1
                            </div>
                            <span className="ml-2 font-medium">Profile</span>
                        </div>
                        <div className="w-16 h-0.5 bg-gray-300"></div>
                        <div className={`flex items-center ${step >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-primary-600 bg-primary-50' : 'border-gray-300'}`}>
                                2
                            </div>
                            <span className="ml-2 font-medium">Companies</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-8">
                        {step === 1 ? (
                            <div className="space-y-6">
                                <div className="text-center">
                                    <h1 className="text-2xl font-bold text-gray-900">Complete Your Profile</h1>
                                    <p className="text-gray-600 mt-2">Tell customers about yourself and where you're located.</p>
                                </div>

                                <form onSubmit={handleProfileSubmit} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={profile.first_name}
                                                onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
                                                className="input"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={profile.last_name}
                                                onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
                                                className="input"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                                        <textarea
                                            rows={4}
                                            value={profile.bio}
                                            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                            className="input"
                                            placeholder="I have been a consultant for 5 years..."
                                        />
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                                            <input
                                                type="text"
                                                required
                                                value={profile.city}
                                                onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                                                className="input"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">State (Abbr)</label>
                                            <input
                                                type="text"
                                                required
                                                maxLength={2}
                                                value={profile.state}
                                                onChange={(e) => setProfile({ ...profile, state: e.target.value.toUpperCase() })}
                                                className="input"
                                                placeholder="TX"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                                            <input
                                                type="text"
                                                required
                                                maxLength={5}
                                                value={profile.zip_code}
                                                onChange={(e) => setProfile({ ...profile, zip_code: e.target.value })}
                                                className="input"
                                                placeholder="12345"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Personal Website</label>
                                            <input
                                                type="url"
                                                value={profile.personal_website_url}
                                                onChange={(e) => setProfile({ ...profile, personal_website_url: e.target.value })}
                                                className="input"
                                                placeholder="https://..."
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="w-full btn btn-primary py-3 text-lg"
                                    >
                                        {saving ? 'Saving...' : 'Next Step'}
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="text-center">
                                    <h1 className="text-2xl font-bold text-gray-900">Select Your Companies</h1>
                                    <p className="text-gray-600 mt-2">Which brands do you represent?</p>
                                </div>

                                <div className="max-h-[400px] overflow-y-auto space-y-3 p-2 border rounded-md">
                                    {allCompanies.map((company) => (
                                        <label
                                            key={company.id}
                                            className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${selectedCompanies.includes(company.id)
                                                    ? 'border-primary-500 bg-primary-50'
                                                    : 'border-gray-200 hover:bg-gray-50'
                                                }`}
                                        >
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{company.name}</h3>
                                                <p className="text-sm text-gray-500">{company.category}</p>
                                            </div>
                                            <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${selectedCompanies.includes(company.id)
                                                    ? 'bg-primary-600 border-primary-600'
                                                    : 'border-gray-300'
                                                }`}>
                                                {selectedCompanies.includes(company.id) && (
                                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </div>
                                            <input
                                                type="checkbox"
                                                className="hidden"
                                                checked={selectedCompanies.includes(company.id)}
                                                onChange={() => handleToggleCompany(company.id)}
                                            />
                                        </label>
                                    ))}
                                </div>

                                <button
                                    onClick={handleFinalize}
                                    disabled={saving}
                                    className="w-full btn btn-primary py-3 text-lg"
                                >
                                    {saving ? 'Finalizing...' : 'Complete Setup'}
                                </button>
                                <button
                                    onClick={() => setStep(1)}
                                    className="w-full text-gray-500 text-sm hover:underline"
                                >
                                    Back to Profile
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
