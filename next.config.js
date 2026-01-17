/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/performers',
        destination: '/comedians',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig 