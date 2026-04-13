import { MetadataRoute } from "next";
import { LOCALES } from "@/lib/dictionaries";

const baseUrl = "https://spacesorganizers.com";

const pages: Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"];
}> = [
  { path: "",              priority: 1.0,  changeFrequency: "weekly"  },
  { path: "/services",     priority: 0.95, changeFrequency: "monthly" },
  { path: "/portfolio",    priority: 0.90, changeFrequency: "monthly" },
  { path: "/spaces",       priority: 0.88, changeFrequency: "monthly" },
  { path: "/about",        priority: 0.85, changeFrequency: "monthly" },
  { path: "/contact",      priority: 0.85, changeFrequency: "monthly" },
  { path: "/blog",         priority: 0.80, changeFrequency: "weekly"  },
  { path: "/testimonials", priority: 0.75, changeFrequency: "monthly" },
  { path: "/faq",          priority: 0.75, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // Canonical root redirect
  entries.push({
    url: `${baseUrl}/`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1.0,
  });

  // All locale × page combinations with hreflang alternates
  for (const lang of LOCALES) {
    for (const page of pages) {
      entries.push({
        url: `${baseUrl}/${lang}${page.path}`,
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l, `${baseUrl}/${l}${page.path}`])
          ),
        },
      });
    }
  }

  return entries;
}
