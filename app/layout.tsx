import type { Metadata } from "next";
import { Geist, Geist_Mono, Kalam, Permanent_Marker } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const kalam = Kalam({
  variable: "--font-kalam",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const permanentMarker = Permanent_Marker({
  variable: "--font-permanent-marker",
  subsets: ["latin"],
  weight: "400",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stone AFEDJOU | Portfolio",
  description: "Portfolio de Stone AFEDJOU, Développeur Full Stack web & mobile",
   verification: {
    google: "jAsd9_qlq1C-Vl-CI3ResvVeQVkfV1Y2R4_JNKlVHew",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} ${kalam.variable} ${permanentMarker.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col antialiased bg-stone-100 dark:bg-[#151311] transition-colors duration-500">
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
