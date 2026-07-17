import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TRUSTed Web Architecture | Websites built around your vision",
  description: "Custom website architecture, design, and guided creation support.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
