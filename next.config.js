/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  // productionBrowserSourceMaps: true,
  images: {
    loader: "akamai",
    path: "",
  }
};

module.exports = nextConfig
