import type { MetadataRoute } from "next";
import { guides, templates } from "@/lib/marketing";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const paths = ["/", "/pricing", "/templates", "/guides", "/use-cases/acx-narrator-workspace", "/use-cases/producer-narrator-workspace", "/software-for-audiobook-narration", "/blog/why-audiobook-narrators-need-project-workspaces-not-more-spreadsheets", ...templates.map((t) => `/templates/${t.slug}`), ...guides.map((g) => `/guides/${g.slug}`)];
  return paths.map((path) => ({ url: `${base}${path}`, lastModified: new Date() }));
}
