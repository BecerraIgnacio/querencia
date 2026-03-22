import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Querencia — Veterinary Avian Surveillance",
  description:
    "AI-assisted avian surveillance and response software for veterinarians and veterinary networks.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className="bg-surface text-ink font-body" style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
