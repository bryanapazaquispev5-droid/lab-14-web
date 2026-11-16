import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getPostBySlug, getPublishedPosts } from "../../../lib/content.js";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Artículo no encontrado" };

  return {
    title: `${post.title} | Mi Sitio Optimizado`,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      images: ["/images/seo-image.png"],
      type: "article",
      url: `/blog/${post.slug}`,
      ...(post.publishedAt ? { publishedTime: post.publishedAt } : {}),
    },
  };
}

async function BlogPostContent({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      <p>{post.body}</p>
    </article>
  );
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <Suspense fallback={<p>Cargando artículo...</p>}>
      <BlogPostContent params={params} />
    </Suspense>
  );
}
