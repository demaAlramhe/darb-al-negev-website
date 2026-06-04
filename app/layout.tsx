import type { Metadata } from "next";
import Script from "next/script";
import { Cairo, Heebo } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import { A11Y_INIT_SCRIPT } from "@/lib/accessibility";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
});

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "درب النقب | דרך הנגב — Darb Al Negev",
  description:
    "مكتب سياحة وسفر — رحلات وبكجات داخل البلاد وخارجها. משרד תיירות ונסיעות — טיולים וחבילות בארץ ובחו״ל.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${heebo.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full antialiased" suppressHydrationWarning>
        <Script
          id="a11y-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: A11Y_INIT_SCRIPT }}
        />
        <LanguageProvider>
          {children}
          <AccessibilityWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}
