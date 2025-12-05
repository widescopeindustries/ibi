import { getAllPosts } from '@/lib/mdx'
import BlogCard from '@/components/blog/BlogCard'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Blog - A Rep Near Me',
    description: 'Tips, trends, and product reviews from the world of direct sales. Find out what\'s hot and connect with local reps.',
}

export default function BlogIndex() {
    const posts = getAllPosts(['title', 'date', 'slug', 'author', 'excerpt'])

    return (
        <div className="bg-gray-50 min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <p className="text-primary-600 font-medium tracking-wide uppercase text-sm mb-3">
                        The Edit
                    </p>
                    <h1 className="font-serif text-4xl md:text-5xl text-gray-900 mb-6">
                        Latest from the Blog
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Discover the hottest products, success stories, and tips for finding the perfect direct sales representative near you.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post: any) => (
                        <BlogCard key={post.slug} post={post} />
                    ))}
                </div>
            </div>
        </div>
    )
}
