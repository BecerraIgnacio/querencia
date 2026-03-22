/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@querencia/core-domain",
    "@querencia/contracts",
    "@querencia/authz",
    "@querencia/map-hex",
  ],
};

export default nextConfig;
