import type { Metadata } from "next";
import {
  JetBrains_Mono,
  Orbitron,
  Rajdhani,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["500", "700", "900"],
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  variable: "--font-rajdhani",
  weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
});

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "GVG OS — Beta 1",
  description:
    "GVG OS Beta 第1版：電影級入口與全球平台／商城骨架，供內測與迭代。",
  applicationName: "GVG OS Beta 1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body
        className={`${orbitron.variable} ${rajdhani.variable} ${jetbrains.variable} ${space.variable} min-h-screen bg-gvg-bg text-gvg-text antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
