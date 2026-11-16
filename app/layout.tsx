import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://lab-14-web.onrender.com",
  ),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <main className={inter.className}>
          <nav aria-label="Navegación principal">
            <Link href="/">Inicio</Link> | <Link href="/blog">Blog</Link> |{" "}
            <Link href="/contacto">Contacto</Link>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}
