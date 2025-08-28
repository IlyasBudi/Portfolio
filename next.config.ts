import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* opsi konfigurasi lain di sini */
  images: {
    domains: ['ilyasbudi.vercel.app'],
  },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/index.html',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
