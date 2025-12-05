import Link from 'next/link'

interface BlogPost {
    slug: string
    title: string
    excerpt: string
    date: string
    author: string
}

export default function BlogCard({ post }: { post: BlogPost }) {
    return (
        <Link href={`/blog/${post.slug}`} className="group block h-full">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 group-hover:shadow-md group-hover:border-primary-100 h-full flex flex-col">
                <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center text-xs text-gray-500 mb-3 space-x-2">
                        <time dateTime={post.date}>{post.date}</time>
                        <span>•</span>
                        <span>{post.author}</span>
                    </div>

                    <h3 className="font-serif text-xl text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                        {post.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                        {post.excerpt}
                    </p>

                    <span className="text-primary-600 text-sm font-medium group-hover:underline inline-flex items-center">
                        Read Article
                        <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </span>
                </div>
            </div>
        </Link>
    )
}
