/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/performers',
        destination: '/comedians',
        permanent: true,
      },
      {
        source: '/eag',
        destination: '/consultation?utm_source=eag&utm_medium=conference&utm_campaign=eag_london_may_2026',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig 