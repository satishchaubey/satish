import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout/page";
import { ToastProvider } from "@/components/ui/toast";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Roboto({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"], // Include multiple weights for better performance
});

// Replace these with your actual information
const personalData = {
  name: "Satish Kumar Chaubey",
  jobTitle: "Software Engineer",
  description: "Skilled Full Stack Engineer with hands-on experience in building scalable and high-performance web applications. Proficient in frontend technologies like Next.js, React.js, TailwindCSS, ShadCN, and Framer Motion to deliver modern, responsive, and engaging UIs. On the backend, experienced with NestJS, Node.js, Express, and BullMQ to design reliable APIs and workflow systems. Strong knowledge of databases including SQL and MongoDB, ensuring robust data management. Adept at integrating APIs, optimizing performance, and delivering clean, maintainable, and reusable code.",
  siteUrl: "http://satishchaubey.vercel.app/", // Replace with your actual domain
  socialHandle: "satish-chaubey/", // Replace with your actual social media handle
  image: "/images/og-image.jpg",
};

export const metadata: Metadata = {
  title: {
    default: `${personalData.name} - ${personalData.jobTitle}`,
    template: `%s | ${personalData.name}`
  },
  description: personalData.description,
  keywords: [
    "MERN stack developer",
    "MongoDB",
    "Express.js",
    "React",
    "Node.js",
    "full stack developer",
    "JavaScript developer",
    "web developer",
    "software engineer",
    "frontend developer",
    "backend developer",
    "React developer",
    "Node.js developer",
    "MongoDB developer",
    "Express.js developer",
    "web development services",
    "freelance web developer",
    "hire MERN developer",
    "JavaScript expert",
    "responsive web design",
    "RESTful API development",
    "single page applications",
    "progressive web apps",
    "database management",
    "cloud deployment"
  ],
  authors: [{ name: personalData.name }],
  creator: personalData.name,
  publisher: personalData.name,
  metadataBase: new URL(personalData.siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_in',
    url: personalData.siteUrl,
    title: personalData.name,
    description: personalData.description,
    siteName: `${personalData.name}'s Portfolio`,
    images: [
      {
        url: personalData.image,
        width: 1200,
        height: 630,
        alt: `${personalData.name} - ${personalData.jobTitle}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: personalData.name,
    description: personalData.description,
    creator: personalData.socialHandle,
    images: [personalData.image],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
};

// Generate structured data for better SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: personalData.name,
  jobTitle: personalData.jobTitle,
  url: personalData.siteUrl,
  sameAs: [
    `https://github.com/satishchaubey/satishchaubey`,
    `https://linkedin.com/in/${personalData.socialHandle.replace('@', '')}`,
  ],
  knowsAbout: ["Full Stack Development",
    "Next.js",
    "React.js",
    "TailwindCSS",
    "ShadCN",
    "Framer Motion",
    "NestJS",
    "Node.js",
    "BullMQ",
    "MongoDB",
    "SQL"]
};

import UniversalChatbot from "@/components/AIPlayground/UniversalChatbot";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ToastProvider>
            <Layout>
              {children}
            </Layout>
            <UniversalChatbot />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}