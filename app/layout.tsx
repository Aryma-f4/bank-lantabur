import type { Metadata } from "next";
import { DM_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import "./dashboard.css";
const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });
export const metadata: Metadata = {
  title: "Bank Lantabur · Demo AI Financing | amantech.id",
  description: "Prototipe dashboard integrasi sistem bank dan AI credit scoring dengan data fiktif, dibuat oleh amantech.id.",
  robots: { index: false, follow: false },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id" className={`${sans.variable} ${mono.variable}`}><body>{children}</body></html>;
}
