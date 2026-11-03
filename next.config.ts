import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      ...["compacta", "patio", "familiar"].map((slug) => ({
        source: `/viviendas/${slug}`,
        destination: "/viviendas",
        permanent: true,
      })),
      { source: "/casos", destination: "/aplicaciones#casos", permanent: true },
      {
        source: "/casos/:slug",
        destination: "/aplicaciones/casos/:slug",
        permanent: true,
      },
      {
        source: "/financiacion",
        destination: "/viviendas/financiacion",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};
export default nextConfig;
