import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { getPublishedPosts } from "../../lib/content.js";

export const metadata: Metadata = {
  title: "Blog de SEO y Next.js | Mi Sitio Optimizado",
  description:
    "Consejos prácticos sobre SEO, rendimiento y desarrollo web con Next.js.",
  openGraph: {
    title: "Blog de SEO y Next.js",
    description:
      "Consejos prácticos sobre SEO, rendimiento y desarrollo web con Next.js.",
    images: ["/images/seo-image.png"],
    type: "website",
  },
};

async function BlogContent() {
  const posts = await getPublishedPosts();

  return (
    <>
      <h1>Blog de SEO y Next.js</h1>
      <p>Artículos sobre optimización web y Next.js.</p>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <article>
              <h2>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p>{post.description}</p>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={<p>Cargando artículos...</p>}>
      <BlogContent />
    </Suspense>
  );
}
