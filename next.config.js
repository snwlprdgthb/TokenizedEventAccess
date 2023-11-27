/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ["cdn.sanity.io", "drive.google.com"],
      disableStaticImages: false
    }
  };
  
  module.exports = nextConfig;
  