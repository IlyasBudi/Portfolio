import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import NavigationWrapper from "@/components/NavigationWrapper";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["portfolio", "developer", "web development", "next.js", "react"],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@johndoe",
  },
  robots: {
    index: true,
    follow: true,
  },
};

function LayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div className="min-h-screen transition-colors duration-300" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
        <NavigationWrapper />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}
