import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wave VM — Ride your own systems.",
  description: "A simpler way to create and manage virtual machines. Wave VM is a free, open-source project in development.",
};
export const viewport: Viewport = { themeColor: "#06182B" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
