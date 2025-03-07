import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
 
};

export default nextConfig;


module.exports = {
  async headers() {
      return [
          {
              source: "/(.*)",
              headers: [
                  { key: "X-Frame-Options", value: "ALLOWALL" }, 
                  { key: "Content-Security-Policy", value: "frame-ancestors *" }
              ],
          },
      ];
  },
};
