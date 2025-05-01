// import type { Metadata } from "next";
// import { Outfit} from "next/font/google";
// import "./globals.css";
// import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/layout/Footer";

// const outfit = Outfit({
//   subsets: ["latin"],
//   variable: "--font-outfit", // optional: for Tailwind or global CSS use
// });

// export const metadata: Metadata = {
//   title: "Tailor Craft",
//   description: "Build the Outfit you desire",
// };


// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${outfit.variable}  antialiased `}
//       >
//         <Navbar />
//         {children}
//         <Footer />
//       </body>
//     </html>
//   );
// }

import { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import MainLayout from '@/components/layout/MainLayout';


export const metadata: Metadata = {
  title: 'Tailors Studio | Premium Custom Tailoring',
  description: 'Custom-fit fashion for every occasion. Book your appointment today with our professional tailoring service.',
};

 const outfit = Outfit({
   subsets: ["latin"],
   variable: "--font-outfit",  //optional: for Tailwind or global CSS use
 });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body  className={`${outfit.variable}  antialiased `}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
