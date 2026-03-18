import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	webpack(config) {
		config.resolve = config.resolve ?? {};
		config.resolve.alias = config.resolve.alias ?? {};
		config.resolve.alias["@vercel/analytics/next"] = "@vercel/analytics/react";
		return config;
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "pub-de50afb5e9934f62ad9c809976d139d8.r2.dev",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;

// Enable calling `getCloudflareContext()` in `next dev`.
// See https://opennext.js.org/cloudflare/bindings#local-access-to-bindings.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
