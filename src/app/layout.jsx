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

export const metadata = {
  title: "Garlic and Ginger - Spicy Recipes",
  description: "Bold, spicy recipes featuring garlic and ginger from around the world",
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }) {
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
