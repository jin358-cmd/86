import type { Metadata, Viewport } from "next";
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
  title: "GVG OS v3.0 — Neural Link Experience",
  description:
    "Put on a Neural Link headset and enter GVG City — a cinematic interactive operating system experience.",
  applicationName: "GVG OS",
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} ${rajdhani.variable} ${jetbrains.variable} ${space.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
