import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/providers/query-provider";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 🎯 মেটাডাটা আপনার অ্যাপ্লিকেশনের নাম (ShelfLock) অনুযায়ী আপডেট করা হলো
export const metadata: Metadata = {
  title: {
    default: "ShelfLock - Smart Expiry & Alert System",
    template: "%s | ShelfLock"
  },
  description: "Configure multi-stage automated message rules and secure your products prior to lock expiration.",
  icons: {
    icon: "/favicon.ico", // আপনার পাবলিক ফোল্ডারে ফেভিকন থাকলে এটি কাজ করবে
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <Toaster position="top-center" reverseOrder={false} />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}