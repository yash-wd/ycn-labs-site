import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { ThemeProvider } from "@/components/ThemeProvider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ycnlabs.com"),
  title: {
    default: "YCN Labs — Websites and software. Built around your business.",
    template: "%s | YCN Labs",
  },
  description:
    "We turn business problems into digital products that help customers act, teams work clearly, and the business keep moving.",
  keywords: [
    "business websites",
    "web applications",
    "software products",
    "business automation",
    "systems integration",
    "YCN Labs",
  ],
  authors: [{ name: "YCN Labs" }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://ycnlabs.com",
    siteName: "YCN Labs",
    title: "YCN Labs — Websites and software. Built around your business.",
    description:
      "We turn business problems into digital products that help customers act, teams work clearly, and the business keep moving.",
    images: [
      {
        url: "/brand/ycn-og-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "YCN Labs — Websites and software. Built around your business.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YCN Labs — Websites and software. Built around your business.",
    description:
      "We turn business problems into digital products that help customers act, teams work clearly, and the business keep moving.",
    images: ["/brand/ycn-og-1200x630.jpg"],
  },
  icons: {
    icon: [
      { url: "/brand/favicon.ico", sizes: "any" },
      { url: "/brand/ycn-favicon-32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/brand/ycn-icon-180.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "YCN Labs",
    url: "https://ycnlabs.com",
    logo: "https://ycnlabs.com/brand/ycn-logo-dark-transparent-448.png",
    description:
      "Websites, web applications, and software products built around your business.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "GB",
    },
  };

  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <JsonLd data={orgSchema} />
      </head>
      <body className={`${spaceGrotesk.variable} ${inter.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#0470B4] focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main-content" className="flex-grow">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
