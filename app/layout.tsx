import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk-sans-serif",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter-sans-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Games Library Homepage",
  description: "A landing page for the games library page.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${spaceGrotesk.variable} ${inter.variable}`}>
      <body className={`font-inter antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
