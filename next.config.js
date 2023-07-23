/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "artblocks-mainnet.s3.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.artblocks.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.airstack.xyz",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "chromie-squiggles.com",
        pathname: "/imgs/**",
      },
      {
        protocol: "https",
        hostname: "openseauserdata.com",
        pathname: "/files/**",
      },
    ],
  },
};

module.exports = nextConfig;
