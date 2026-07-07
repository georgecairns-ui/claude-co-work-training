/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export served under claudecofounder.com/cowork-quiz — the export in
  // out/ gets copied into the claude-cofounder-site repo's public/cowork-quiz/.
  output: "export",
  basePath: "/cowork-quiz",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
