import type { Metadata } from "next";
import { Inter, Anonymous_Pro } from "next/font/google";
import Script from "next/script";
import "../globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CalendlyAssets } from "@/components/calendly-assets";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const anonymousPro = Anonymous_Pro({
  variable: "--font-anonymous-pro",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Lumon Studios — Course systems for coaches who mean business.",
  description:
    "Custom-built platforms, funnels, and websites for coaches, consultants, and training organisations. No templates. No handoffs. Just work that quietly does its job.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${anonymousPro.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-[#1d1f2c]">
        <CalendlyAssets />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
