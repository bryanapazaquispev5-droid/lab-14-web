import { getPublishedPosts } from "../../lib/content.js";

const BASE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://lab-14-web.onrender.com"
).replace(/\/$/, "");

function escapeXml(value) {
  return String(value).replace(/[<>&'\"]/g, (character) => {
    const entities = {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      "'": "&apos;",
      '"': "&quot;",
    };
    return entities[character];
  });
}

export default async function handler(_req, res) {
  const posts = await getPublishedPosts();
  const urls = [
    { path: "/", lastModified: null },
    { path: "/blog", lastModified: null },
    { path: "/contacto", lastModified: null },
    ...posts.map((post) => ({
      path: `/blog/${post.slug}`,
      lastModified: post.publishedAt,
    })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map(
        ({ path, lastModified }) =>
          `<url><loc>${escapeXml(`${BASE_URL}${path}`)}</loc>${
            lastModified
              ? `<lastmod>${escapeXml(new Date(lastModified).toISOString())}</lastmod>`
              : ""
          }</url>`,
      )
      .join("\n    ")}
</urlset>`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "no-store, max-age=0");
  res.status(200).send(sitemap);
}
