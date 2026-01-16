import type { Metadata } from "next";
import { Inter, Annie_Use_Your_Telescope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const annieFont = Annie_Use_Your_Telescope({
  weight: "400",
  variable: "--font-annie",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Garlic and Ginger - Delicious Recipes",
  description: "A collection of delicious recipes and cooking tips",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${annieFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
