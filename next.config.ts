import type { NextConfig } from "next";

const repo = "/anteroom-website";
const isProd = process.env.NODE_ENV === "production";

const config: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isProd ? repo : "",
  assetPrefix: isProd ? repo : "",
  trailingSlash: true,
};

export default config;
