//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * Cloudflare D1 болон бусад платформын функцуудыг Local орчинд proxy хийх функц.
 * TypeScript-ийн 'implicit any' алдаанаас сэргийлж JSDoc ашиглав.
 * * @param {import('next').NextConfig} nextConfig
 * @returns {import('next').NextConfig}
 */
const withCloudflareDev = (nextConfig) => {
  if (process.env.NODE_ENV === 'development') {
    try {
      const {
        setupDevPlatform,
      } = require('@cloudflare/next-on-pages/next-dev');
      // wrangler.toml-ийг уншиж, D1 холболтыг (process.env.DB) үүсгэнэ
      setupDevPlatform().catch((err) => {
        console.error(
          '❌ Cloudflare Dev Platform-ийг асаахад алдаа гарлаа:',
          err,
        );
      });
    } catch (e) {
      console.warn(
        '⚠️ @cloudflare/next-on-pages олдохгүй байна. "yarn add -D @cloudflare/next-on-pages" ажиллуулна уу.',
      );
    }
  }
  return nextConfig;
};

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Nx-specific options
  },
  // Drizzle болон бусад сангуудыг Next.js bundle-д оруулахгүй, шууд Node.js/Edge-ээр ажиллуулна
  serverExternalPackages: ['drizzle-orm'],
};

const plugins = [
  // Nx тохиргоог нэмэх
  withNx,
  // Cloudflare D1 Proxy-г нэмэх
  withCloudflareDev,
];

module.exports = composePlugins(...plugins)(nextConfig);
