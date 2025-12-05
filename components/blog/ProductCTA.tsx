import Link from 'next/link'

interface ProductCTAProps {
    product: string
    company?: string
}

export default function ProductCTA({ product, company }: ProductCTAProps) {
    const href = company
        ? `/search?company=${encodeURIComponent(company)}`
        : `/search`

    return (
        <div className="my-12 p-8 bg-gradient-to-br from-indigo-50 to-white rounded-2xl border border-indigo-100 shadow-sm text-center">
            <h3 className="text-2xl font-serif text-gray-900 mb-3">
                Want to try {product}?
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Don&apos;t wait for shipping. Find a local {company || 'direct sales'} representative near you who can deliver it today.
            </p>
            <Link
                href={href}
                className="inline-block bg-primary-600 text-white font-bold py-4 px-8 rounded-full hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
                Find {company} Rep Near Me
            </Link>
            <p className="text-xs text-gray-400 mt-4 uppercase tracking-widest">
                Verified Local Representatives
            </p>
        </div>
    )
}
