import type { Metadata } from "next";
import "./globals.css";
import { iranyekanXpro } from "@/app/assets/fonts";

export const metadata: Metadata = {
  title: "to do app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`h-full w-full text-stone-900 ${iranyekanXpro.className}`}
      >
        {children}
      </body>
    </html>
  );
}
