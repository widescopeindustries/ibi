// Helper to slugify text
export function slugify(text: string | null | undefined): string {
    if (!text) return ''
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
}

// Generate semantic URL for a rep
export function generateRepUrl(profile: {
    city?: string | null
    state?: string | null
    first_name?: string | null
    last_name?: string | null
    rep_companies?: Array<{ companies: { slug: string } }>
}): string {
    if (!profile.city || !profile.state || !profile.first_name || !profile.last_name) {
        return '#'
    }

    const company = profile.rep_companies?.[0]?.companies?.slug
    if (!company) return '#'

    const locationSlug = `${slugify(profile.city)}-${profile.state.toLowerCase()}`
    const nameSlug = slugify(`${profile.first_name} ${profile.last_name}`)

    return `/${company}/${locationSlug}/${nameSlug}`
}
