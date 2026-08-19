import type { MetadataRoute } from "next";
import { baseUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Token, confirmation and result routes are never indexable (spec 8.7).
      disallow: [
        "/api/",
        "/download/",
        "/en/download/",
        "/template-request-received/",
        "/en/template-request-received/",
        "/request-a-call/received/",
        "/en/request-a-call/received/",
        "/briefings/confirmed/",
        "/en/briefings/confirmed/",
        "/briefings/unsubscribe/",
        "/en/briefings/unsubscribe/",
      ],
    },
    sitemap: `${baseUrl()}/sitemap.xml`,
  };
}
