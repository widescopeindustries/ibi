/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  // ESLint and TypeScript checks are now enabled during builds
  // This ensures code quality and catches errors early
}

module.exports = nextConfig
