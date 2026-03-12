/**
 * Root layout component for the FC Zürich-Leutschenbach Squad App.
 * This component defines the overall HTML structure of the application, including the <html> and <body> tags.
 * It also sets up global styles and fonts using Next.js's font optimization features.
 * The Toaster component from Sonner is included here to provide a consistent notification system across the app.
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FC Zürich-Leutschenbach: Squad App",
  description:
    "Verwaltung von Spielern, Teams und Trainingsplänen für den FC Zürich-Leutschenbach",
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
