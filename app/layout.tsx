import type { Metadata } from "next";
import "./globals.css";
import Session from "./components/Providers";
export const metadata: Metadata = {
  title: "ZeroOut",
  description: "Budget smarter. Get to zero faster.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Session>{children}</Session>
      </body>
    </html>
  );
}
