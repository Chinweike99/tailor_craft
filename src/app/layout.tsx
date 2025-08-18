import { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import MainLayout from '@/components/layout/MainLayout';
import { Providers } from './_providers/providers';


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
        <Providers>
        <MainLayout>{children}</MainLayout>
        
        </Providers>
      </body>
    </html>
  );
}
