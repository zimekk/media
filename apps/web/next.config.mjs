/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds and Linting.
 */
// !process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  output: "standalone",
  reactStrictMode: true,
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: ["@dev/audio", "@dev/hello"],
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: !!process.env.CI },
  typescript: { ignoreBuildErrors: !!process.env.CI },
  webpack: (config) =>
    Object.assign(config, {
      resolve: Object.assign(config.resolve, {
        alias: {
          ...(config.resolve.alias || {}),
          // Transform all direct `react-native` imports to `react-native-web`
          "react-native$": "react-native-web",
        },
        extensions: [
          ".web.ts",
          ".web.tsx",
          ".ts",
          ".tsx",
          ".web.js",
          ".web.jsx",
          ".js",
          ".jsx",
          ...config.resolve.extensions,
        ],
      }),
    }),
};

export default config;
