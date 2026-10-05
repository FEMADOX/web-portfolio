/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    useTypeScriptCli: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    unoptimized: true
  }
}

export default nextConfig
