/// <reference path="./next-pwa.d.ts" />
import withPWA from "@opensourceframework/next-pwa";

const withPWAInit = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = withPWAInit({
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  allowedDevOrigins: ['10.1.0.27', '10.1.2.30', '10.1.3.13'],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
});

export default nextConfig;
