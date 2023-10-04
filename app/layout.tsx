import "bootstrap/dist/css/bootstrap.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kiddoart!",
  description: "Image gnerating game for kids, powered by DALL-E",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html suppressHydrationWarning={true} lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </>
  );
}
