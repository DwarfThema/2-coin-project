import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import RecoilRootProvider from "./util/recoilRoot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "2 Coin Proejct",
  description: "VIVLE-THEME-MUSEUM : 2 Coin Project by JeongEun Park",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilRootProvider>{children}</RecoilRootProvider>
      </body>
    </html>
  );
}
