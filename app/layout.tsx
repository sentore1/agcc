import type { Metadata } from "next";
import "./globals.css";
import ConditionalHeader from "@/components/ConditionalHeader";
import GoogleTranslate from "@/components/GoogleTranslate";

export const metadata: Metadata = {
  title: "AGCC Rwanda - Compassionate Care for Every Stage of Life",
  description: "Professional in-home healthcare services and caregiver training - Trusted care you can rely on",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-sans">
      <body className="antialiased bg-white">
        <ConditionalHeader />
        <GoogleTranslate />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
