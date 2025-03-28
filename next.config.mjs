// next.config.mjs
let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config.mjs').then(mod => mod.default || mod)
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Netlify specific settings
  trailingSlash: true,
  // Keep only the essential experimental features
  experimental: {
    // These features might cause issues with Netlify
    // webpackBuildWorker: true,
    // parallelServerBuildTraces: true,
    // parallelServerCompiles: true,
  },
  // This helps with Netlify deployments
  output: 'standalone',
}

// Properly merge configs and return the result
const mergedConfig = mergeConfig(nextConfig, userConfig)

function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return nextConfig
  }

  const result = { ...nextConfig }

  for (const key in userConfig) {
    if (
      typeof result[key] === 'object' &&
      !Array.isArray(result[key]) &&
      typeof userConfig[key] === 'object'
    ) {
      result[key] = {
        ...result[key],
        ...userConfig[key],
      }
    } else {
      result[key] = userConfig[key]
    }
  }

  return result
}

export default mergedConfig
