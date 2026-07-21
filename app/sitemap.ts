import type { MetadataRoute } from "next";
import { pages } from "@/lib/site-content";

const routes = ["/", ...Object.keys(pages).map((path) => `/${path}`)];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({ url: `https://digitalarchitecture.trusted-eco.org${path}`, changeFrequency: "monthly", priority: path === "/" ? 1 : 0.7 }));
}
