import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "VBT — Tecnología que construye",
    template: "%s | Vision Building Technologies",
  },
  description:
    "Encofrado permanente de PVC para muros de hormigón armado. Tecnología, aplicaciones, proyectos y recursos para construir con VBT.",
  robots: { index: false, follow: true },
  openGraph: {
    title: "Vision Building Technologies",
    description:
      "Una forma distinta de construir. Conocé la tecnología VBT y sus aplicaciones.",
    locale: "es_AR",
    type: "website",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-AR">
      <body>
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
