import type { Metadata } from "next";
import { fontDisplay, fontBody, fontCode } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hackathon Starter Kit",
  description:
    "The ultimate hackathon playbook — guides, templates, and strategies from 36+ hackathon wins.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${fontDisplay.variable} ${fontBody.variable} ${fontCode.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
