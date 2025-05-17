import type { Metadata } from "next";
import "./globals.css";
import { iranyekanXpro } from "@/app/assets/fonts";

export const metadata: Metadata = {
  title: "To Do App",
  description: "A simple to do app built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`h-screen w-screen text-stone-900 ${iranyekanXpro.className}`}
      >
        <main className="min-h-screen w-screen">{children}</main>
      </body>
    </html>
  );
}
