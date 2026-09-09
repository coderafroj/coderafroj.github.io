import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const SITE_URL = "https://coderafroj.me";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Codarafroj — Self-Taught Developer & Programmer",
    template: "%s | Codarafroj",
  },
  description:
    "Codarafroj (Afroj Ahmad) is a 100% self-taught developer building full-stack web apps, AI-integrated tools, and clean interfaces — no coaching, just code. Explore projects, skills, and available builds.",
  keywords: [
    "Codarafroj",
    "coderafroj",
    "Afroj Ahmad",
    "self taught developer",
    "full stack developer India",
    "BCA developer portfolio",
    "React developer",
    "Python developer",
    "web developer portfolio",
    "buy web app",
  ],
  authors: [{ name: "Codarafroj", url: SITE_URL }],
  creator: "Codarafroj",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Codarafroj",
    title: "Codarafroj — Self-Taught Developer & Programmer",
    description:
      "100% self-taught developer building full-stack web apps and AI-integrated tools from scratch.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Codarafroj — Self-Taught Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Codarafroj — Self-Taught Developer & Programmer",
    description:
      "100% self-taught developer building full-stack web apps and AI-integrated tools from scratch.",
    images: ["/og-image.png"],
    creator: "@codarafroj",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Afroj Ahmad",
  alternateName: "Codarafroj",
  url: SITE_URL,
  jobTitle: "Self-Taught Software Developer",
  description:
    "100% self-taught developer building full-stack web apps and AI-integrated tools.",
  sameAs: [
    "https://github.com/coderafroj",
    "https://www.linkedin.com/in/afroj-ahmad-6a626729a",
    "https://x.com/codarafroj",
  ],
  knowsAbout: [
    "Python",
    "Java",
    "C++",
    "JavaScript",
    "React",
    "SQL",
    "Machine Learning",
    "Web Development",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${bricolage.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased bg-bg text-fg`}
      >
        <div className="grain-bg" />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
