import { getPostBySlug, getAllPosts } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import ProductCTA from '@/components/blog/ProductCTA'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const components = {
    ProductCTA,
    Image,
    Link,
}

export async function generateStaticParams() {
    const posts = getAllPosts(['slug'])
    return posts.map((post: any) => ({
        slug: post.slug,
    }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const post = getPostBySlug(params.slug, ['title', 'excerpt', 'date', 'author'])

    if (!post.title) {
        return {
            title: 'Post Not Found',
        }
    }

    return {
        title: `${post.title} | A Rep Near Me`,
        description: post.excerpt,
        openGraph: {
            type: 'article',
            publishedTime: post.date,
            authors: [post.author],
        },
    }
}

export default async function Post({ params }: { params: { slug: string } }) {
    const post = getPostBySlug(params.slug, ['title', 'date', 'slug', 'author', 'content', 'excerpt'])

    if (!post.content) {
        notFound()
    }

    return (
        <div className="bg-white min-h-screen">
            <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <header className="mb-12 text-center">
                    <div className="flex items-center justify-center text-sm text-gray-500 mb-6 space-x-2">
                        <time dateTime={post.date}>{post.date}</time>
                        <span>•</span>
                        <span>{post.author}</span>
                    </div>
                    <h1 className="font-serif text-4xl md:text-5xl text-gray-900 mb-6 leading-tight">
                        {post.title}
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        {post.excerpt}
                    </p>
                </header>

                <div className="prose prose-lg prose-indigo mx-auto">
                    <MDXRemote source={post.content} components={components} />
                </div>

                <div className="mt-16 pt-8 border-t border-gray-100 text-center">
                    <Link
                        href="/blog"
                        className="text-primary-600 font-medium hover:text-primary-800 transition-colors"
                    >
                        ← Back to all posts
                    </Link>
                </div>
            </article>
        </div>
    )
}
