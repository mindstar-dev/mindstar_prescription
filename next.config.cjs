/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /**
   * If you are using `appDir` then you must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eqaymhxmfqnbfxalgrui.supabase.co",
      },
    ],
  },
};
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheOnFrontEndNav:true,
  aggressiveFrontEndNavCaching:true,
  reloadOnOnline:true,
  disable:false,
  workboxOptions:{
    disableDevLogs:true
  }
});

module.exports = withPWA(config);
// export default config;
