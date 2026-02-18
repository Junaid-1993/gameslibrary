import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`dark ${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="font-inter antialiased">
        {children} {/* No Header or Footer here */}
      </body>
    </html>
  );
}
