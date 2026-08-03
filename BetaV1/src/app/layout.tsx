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
  title: "GVG OS — Beta V1 Neural Link",
  description:
    "Beta V1 workspace based on the original Neural Link cinematic experience.",
  applicationName: "GVG OS Beta V1",
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
