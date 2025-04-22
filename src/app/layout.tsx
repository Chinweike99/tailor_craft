import type { Metadata } from "next";
import { Outfit} from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit", // optional: for Tailwind or global CSS use
});

export const metadata: Metadata = {
  title: "Tailor Craft",
  description: "Build the Outfit you desire",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable}  antialiased p-32`}
      >
        {children}
      </body>
    </html>
  );
}
