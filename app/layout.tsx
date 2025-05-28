import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
