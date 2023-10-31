import "./globals.css";
import type { Metadata } from "next";
import { Tai_Heritage_Pro } from "next/font/google";
import RecoilRootProvider from "./util/recoilRoot";
import { Analytics } from "@vercel/analytics/react";
import GoogleAnalytics from "./src/googleAnalytics";

const tai = Tai_Heritage_Pro({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.2europroject.com/"),
  title: "2 Euro Proejct",
  description: "THEME-MUSEUM : 2 Euro Proejct by Jeongeun Park",
  openGraph: {
    title: "2 Euro Proejct",
    description: "THEME-MUSEUM : 2 Euro Proejct by Jeongeun Park",
    url: "https://www.2europroject.com/",
    images: [
      {
        url: "/Thumbnail.jpg",
        width: 800,
        height: 600,
      },
      {
        url: "/Thumbnail.jpg",
        width: 1800,
        height: 1600,
        alt: "My custom alt",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "2 Euro Proejct",
    description: "THEME-MUSEUM : 2 Euro Proejct by Jeongeun Park",
    creator: "Jeongeun Park & Junho Park",
    images: ["/Thumbnail.jpg"],
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={tai.className}>
        <Analytics />
        <GoogleAnalytics />
        <RecoilRootProvider>{children}</RecoilRootProvider>
      </body>
    </html>
  );
}
