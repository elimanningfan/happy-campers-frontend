import type { Metadata } from "next";
import { Montserrat, Lato, Roboto, Open_Sans } from "next/font/google";
import "./globals.css";

// Font configurations
const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: '--font-montserrat',
  display: 'swap',
});

const lato = Lato({ 
  weight: ['300', '400', '700'],
  subsets: ["latin"],
  variable: '--font-lato',
  display: 'swap',
});

const roboto = Roboto({ 
  weight: ['300', '400', '500', '700'],
  subsets: ["latin"],
  variable: '--font-roboto',
  display: 'swap',
});

const openSans = Open_Sans({ 
  subsets: ["latin"],
  variable: '--font-open-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Happy Campers RV Rentals - Your Adventure Starts Here",
  description: "Premium RV rentals in the Pacific Northwest. From compact Class B vans to spacious Class C motorhomes, find your perfect home on wheels for unforgettable adventures.",
  keywords: "RV rental, motorhome rental, camper van rental, Pacific Northwest, Oregon RV rental",
  authors: [{ name: "Happy Campers RV Rentals" }],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${lato.variable} ${roboto.variable} ${openSans.variable} font-body`}>{children}</body>
    </html>
  );
}
