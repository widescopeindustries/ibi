import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'

interface OldRepPageProps {
    params: {
        id: string
    }
}

// Helper to slugify text
function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
}

export default async function OldRepPage({ params }: OldRepPageProps) {
    const supabase = await createClient()

    // Fetch the rep to build new URL
    const { data: profile } = await supabase
        .from('profiles')
        .select(`
      *,
      rep_companies (
        companies (
          slug
        )
      )
    `)
        .eq('id', params.id)
        .single()

    if (!profile || !profile.rep_companies || profile.rep_companies.length === 0) {
        notFound()
    }

    // Build new semantic URL
    const companySlug = profile.rep_companies[0].companies.slug
    const locationSlug = `${slugify(profile.city)}-${profile.state?.toLowerCase()}`
    const nameSlug = slugify(`${profile.first_name} ${profile.last_name}`)

    const newUrl = `/${companySlug}/${locationSlug}/${nameSlug}`

    // 301 redirect to new URL
    redirect(newUrl)
}
