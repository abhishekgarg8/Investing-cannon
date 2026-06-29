import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Investing Canon | Learnings from the Greatest Investors",
  description: "Investment wisdom and learnings from 27+ legendary investors. Explore their philosophies, greatest trades, mental models, and investment strategies.",
  openGraph: {
    title: "Investing Canon",
    description: "Investment wisdom from the greatest investors",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background">{children}</body>
    </html>
  );
}
