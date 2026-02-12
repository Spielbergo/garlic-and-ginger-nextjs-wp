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
  metadataBase: new URL('https://garlicandginger.ca'),
  title: {
    default: 'Garlic and Ginger - Spicy Recipes & Bold Flavors',
    template: '%s | Garlic and Ginger'
  },
  description: 'Discover bold, spicy recipes featuring garlic and ginger from cuisines around the world. From fiery noodles to comforting soups and zesty spice blends.',
  keywords: ['garlic recipes', 'ginger recipes', 'spicy food', 'hot recipes', 'chili recipes', 'asian recipes', 'garlic and ginger', 'bold flavors', 'spice blends', 'cooking with garlic', 'cooking with ginger'],
  authors: [{ name: 'Garlic and Ginger Team' }],
  creator: 'Garlic and Ginger',
  publisher: 'Garlic and Ginger',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://garlicandginger.ca',
    siteName: 'Garlic and Ginger',
    title: 'Garlic and Ginger - Spicy Recipes & Bold Flavors',
    description: 'Discover bold, spicy recipes featuring garlic and ginger from cuisines around the world.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Garlic and Ginger - Spicy Recipes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Garlic and Ginger - Spicy Recipes & Bold Flavors',
    description: 'Discover bold, spicy recipes featuring garlic and ginger from cuisines around the world.',
    images: ['/og-image.jpg'],
    creator: '@garlicandginger',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export default function RootLayout({ children }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Garlic and Ginger",
    "url": "https://garlicandginger.ca",
    "logo": "https://garlicandginger.ca/favicon.svg",
    "description": "Bold, spicy recipes featuring garlic and ginger from cuisines around the world",
    "sameAs": [
      "https://www.facebook.com/garlicandginger",
      "https://www.instagram.com/garlicandginger",
      "https://twitter.com/garlicandginger"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Garlic and Ginger",
    "url": "https://garlicandginger.ca",
    "description": "Bold, spicy recipes featuring garlic and ginger from cuisines around the world",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://garlicandginger.ca/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body
        className={`${inter.variable} ${annieFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
