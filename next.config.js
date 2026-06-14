/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin file-tracing to this project; a stray lockfile higher up the tree
  // otherwise makes Next 15 infer the wrong workspace root.
  outputFileTracingRoot: __dirname,
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