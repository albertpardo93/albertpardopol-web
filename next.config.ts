import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.cirujanodemano.es" }],
        destination: "https://cirujanodemano.es/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
