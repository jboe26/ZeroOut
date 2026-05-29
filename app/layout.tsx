import type { Metadata } from "next";
import "./globals.css";
import Session from "./components/Providers";
import Navbar from "./components/Navbar";

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
      <body className="bg-slate-900 m-0 p-0">
        <Navbar />
        <Session>{children}</Session>
      </body>
    </html>
  );
}
