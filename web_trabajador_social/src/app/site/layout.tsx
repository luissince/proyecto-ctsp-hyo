import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css"; // Importar globals.css desde la raíz

import NavBar from "@/app/site/components/NavBar";
import Footer from "@/app/site/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// La metadata se puede definir aquí si es específica de esta sección, o mantenerla en el layout raíz si es global.
// export const metadata: Metadata = {
//   title: "Título Web Pública",
//   description: "Descripción Web Pública",
// };

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      <main className="pt-0">
        {children}
      </main>
      <Footer />
    </>
  );
} 