import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.gstatic.com https://apis.google.com https://*.cloudflare.com https://static.cloudflareinsights.com https://challenges.cloudflare.com *.vercel-scripts.com vercel.live",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.gstatic.com",
              "img-src 'self' data: https: blob: https://*.googleusercontent.com https://*.gstatic.com https://firebasestorage.googleapis.com https://*.cloudflare.com",
              "font-src 'self' data: https://fonts.gstatic.com https://*.gstatic.com",
              "connect-src 'self' https://*.googleapis.com https://*.firebaseio.com wss://*.firebaseio.com https://*.firebase.com https://*.gstatic.com https://*.cloudflare.com https://cloudflareinsights.com https://firestore.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://www.googleapis.com https://storage.googleapis.com https://wa.me https://api.whatsapp.com https://vercel.live",
              "frame-src 'self' https://*.firebaseapp.com https://*.firebase.com https://challenges.cloudflare.com",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;