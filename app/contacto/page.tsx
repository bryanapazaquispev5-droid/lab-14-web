import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto | Mi Sitio Optimizado",
  description:
    "Ponte en contacto con Mi Sitio Optimizado para consultas sobre SEO y Next.js.",
  alternates: {
    canonical: "/contacto",
  },
  openGraph: {
    title: "Contacto | Mi Sitio Optimizado",
    description:
      "Ponte en contacto con Mi Sitio Optimizado para consultas sobre SEO y Next.js.",
    images: ["/images/seo-image.png"],
    type: "website",
    url: "/contacto",
  },
};

export default function ContactoPage() {
  return (
    <>
      <h1>Contacto</h1>
      <p>Información para consultas sobre SEO y desarrollo con Next.js.</p>
    </>
  );
}
