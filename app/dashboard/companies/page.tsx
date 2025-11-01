'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function ManageCompaniesPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [allCompanies, setAllCompanies] = useState<any[]>([])
  const [selectedCompanies, setSelectedCompanies] = useState<number[]>([])
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      router.push('/auth/login')
      return
    }

    setUserId(user.id)

    // Load all companies
    const { data: companies } = await supabase
      .from('companies')
      .select('*')
      .order('name')

    setAllCompanies(companies || [])

    // Load user's selected companies
    const { data: repCompanies } = await supabase
      .from('rep_companies')
      .select('company_id')
      .eq('rep_id', user.id)

    setSelectedCompanies(repCompanies?.map(rc => rc.company_id) || [])
    setLoading(false)
  }

  const handleToggleCompany = async (companyId: number) => {
    if (!userId) return

    const supabase = createClient()
    const isSelected = selectedCompanies.includes(companyId)

    if (isSelected) {
      // Remove
      await supabase
        .from('rep_companies')
        .delete()
        .eq('rep_id', userId)
        .eq('company_id', companyId)

      setSelectedCompanies(selectedCompanies.filter(id => id !== companyId))
    } else {
      // Add
      await supabase
        .from('rep_companies')
        .insert({
          rep_id: userId,
          company_id: companyId,
        })

      setSelectedCompanies([...selectedCompanies, companyId])
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Companies</h1>
          <p className="text-gray-600 mt-1">
            Select the companies you represent to appear in search results
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-8">
          <div className="space-y-3">
            {allCompanies.map((company) => (
              <label
                key={company.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <div>
                  <h3 className="font-semibold text-gray-900">{company.name}</h3>
                  {company.category && (
                    <p className="text-sm text-gray-500">{company.category}</p>
                  )}
                </div>
                <input
                  type="checkbox"
                  checked={selectedCompanies.includes(company.id)}
                  onChange={() => handleToggleCompany(company.id)}
                  className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                />
              </label>
            ))}
          </div>

          <div className="mt-6">
            <button
              onClick={() => router.push('/dashboard')}
              className="btn btn-primary"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
