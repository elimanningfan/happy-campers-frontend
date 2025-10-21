import type { Metadata } from "next";
import { Montserrat, Lato } from "next/font/google";
import "./globals.css";

// Font configurations - Reduced to 2 fonts for better performance
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: '--font-montserrat',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const lato = Lato({
  weight: ['400', '700'], // Only load weights we actually use
  subsets: ["latin"],
  variable: '--font-lato',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://happycampersrvrentals.com'),
  title: {
    default: "Happy Campers RV Rentals - Your Adventure Starts Here",
    template: "%s | Happy Campers RV Rentals"
  },
  description: "Premium RV rentals in the Pacific Northwest. From compact Class B vans to spacious Class C motorhomes, find your perfect home on wheels for unforgettable adventures.",
  keywords: "RV rental, motorhome rental, camper van rental, Pacific Northwest, Oregon RV rental",
  authors: [{ name: "Happy Campers RV Rentals" }],
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
  openGraph: {
    title: "Happy Campers RV Rentals",
    description: "Premium RV rentals in the Pacific Northwest",
    type: "website",
    locale: "en_US",
    url: "https://happycampersrvrentals.com",
    siteName: "Happy Campers RV Rentals",
    images: [
      {
        url: "/images/HC_Logo.png",
        width: 1200,
        height: 630,
        alt: "Happy Campers RV Rentals",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Happy Campers RV Rentals',
    description: 'Premium RV rentals in the Pacific Northwest',
    images: ['/images/HC_Logo.png'],
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${lato.variable} font-body antialiased`}>{children}</body>
    </html>
  );
}
