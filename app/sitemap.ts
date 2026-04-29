import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const base = "https://anteroom-studio.github.io/anteroom-website";
const routes = ["", "/philosophy", "/work", "/journal", "/about", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: base + r,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: r === "" ? 1 : 0.7,
  }));
}
