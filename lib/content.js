const samplePosts = [
  {
    slug: "seo-en-nextjs",
    title: "SEO en Next.js: guía práctica",
    description:
      "Aprende a configurar metadatos, sitemap e imágenes optimizadas en Next.js.",
    publishedAt: "2026-11-16",
    body: "Configurar metadatos por página, publicar un sitemap y optimizar imágenes ayuda a que los buscadores comprendan mejor tu sitio.",
    published: true,
  },
  {
    slug: "fuentes-optimizadas",
    title: "Cómo optimizar fuentes web con Next.js",
    description:
      "Usa next/font para servir fuentes optimizadas desde tu aplicación Next.js.",
    publishedAt: "2026-11-16",
    body: "next/font descarga y aloja las fuentes durante la compilación para servirlas desde tu propia aplicación y evitar solicitudes del navegador a Google Fonts.",
    published: true,
  },
];

function normalizePosts(data) {
  if (!Array.isArray(data)) return null;

  return data
    .filter(
      (post) =>
        post &&
        post.published !== false &&
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(post.slug || "")) &&
        post.title,
    )
    .map((post) => ({
      slug: String(post.slug),
      title: String(post.title),
      description: String(post.description || post.title),
      publishedAt:
        post.publishedAt || post.updatedAt
          ? new Date(post.publishedAt || post.updatedAt).toISOString()
          : null,
      body: String(post.body || post.content || ""),
      published: true,
    }));
}

export async function getPublishedPosts() {
  const cmsApiUrl = process.env.CMS_API_URL;
  if (!cmsApiUrl) return samplePosts;

  try {
    const response = await fetch(cmsApiUrl, {
      cache: "no-store",
      headers: process.env.CMS_API_TOKEN
        ? { Authorization: `Bearer ${process.env.CMS_API_TOKEN}` }
        : undefined,
    });

    if (!response.ok) throw new Error(`CMS respondió ${response.status}`);

    const posts = normalizePosts(await response.json());
    return posts ?? samplePosts;
  } catch (error) {
    console.error("No se pudo consultar el CMS; se usará el contenido local.", error);
    return samplePosts;
  }
}

export async function getPostBySlug(slug) {
  const posts = await getPublishedPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}
