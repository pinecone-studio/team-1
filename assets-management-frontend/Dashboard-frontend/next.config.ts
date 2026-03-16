import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["docusign-esign"],
  // Турбопак-ийг идэвхжүүлэх эсвэл зүгээр л хоосон тохиргоо үлдээх
  turbopack: {},
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push("pdfkit");
    }
    return config;
  },
};

export default nextConfig;

// Enable calling `getCloudflareContext()` in `next dev`.
// See https://opennext.js.org/cloudflare/bindings#local-access-to-bindings.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
