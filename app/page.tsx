import type { Metadata } from "next";
import Image from "next/image";
import LazyLoadedComponent from "./LazyLoadedComponent";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "SEO y rendimiento en Next.js | Mi Sitio Optimizado",
    description:
      "Aprende sobre optimización SEO y rendimiento en Next.js.",
    keywords: ["Next.js", "SEO", "optimización web"],
    verification: {
      google: "0yC0MSddv8cYB07YBfKp1vergU7VvN-jBMUGHZEIyz8",
    },
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: "SEO y rendimiento en Next.js",
      description:
        "Descubre técnicas avanzadas para mejorar tu web con Next.js.",
      images: ["/images/seo-image.png"],
      type: "website",
      url: "/",
    },
  };
}

export default function Home() {
  return (
    <>
      <h1>Bienvenido a mi página optimizada</h1>
      <p>Aprende cómo mejorar el rendimiento y SEO en Next.js.</p>
      <Image
        src="/images/seo-image.png"
        width={800}
        height={400}
        alt="Ejemplo de imagen optimizada"
        priority
      />
      <LazyLoadedComponent />
    </>
  );
}
