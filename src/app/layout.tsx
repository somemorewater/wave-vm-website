import type { Metadata, Viewport } from "next";

import favicon from "@/assets/favicon.svg";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Wave VM — Ride your own systems.",
    template: "%s — Wave VM",
  },
  description:
    "A local-first desktop virtual machine manager in development. Wave VM is built with Tauri 2, Rust, and a vanilla web frontend.",
  icons: {
    icon: favicon.src,
  },
};

export const viewport: Viewport = {
  themeColor: "#06182B",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
