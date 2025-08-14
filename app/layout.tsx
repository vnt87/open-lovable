import type { Metadata } from "next";
import { Bai_Jamjuree, Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";

const baiJamjuree = Bai_Jamjuree({ 
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-bai-jamjuree"
});

const atkinsonHyperlegible = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-atkinson-hyperlegible"
});

export const metadata: Metadata = {
  title: "Open Lovable",
  description: "Re-imagine any website in seconds with AI-powered website builder.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${baiJamjuree.variable} ${atkinsonHyperlegible.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
