import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Valentine's Day Surprise",
  description: "A special interactive experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
