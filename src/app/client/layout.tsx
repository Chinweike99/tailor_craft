import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";
import { Providers } from "../_providers/providers";
import ClientSidebar from "@/components/client/client-sidebar";
import ClientHeader from "./client-header";
import { Toaster } from "@/components/ui/components/toaster";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TailorCraft - Client Dashboard",
  description: "TailorCraft Client Dashboard",
};

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html lang="en" suppressHydrationWarning>
      <div className={inter.className}>
        <Providers>
          <div className="flex h-screen overflow-hidden bg-gray-50">
            <ClientSidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
              <ClientHeader />
              <main className="flex-1 overflow-y-auto p-4 md:p-6">
                {children}
              </main>
            </div>
          </div>
          <Toaster />
        </Providers>
       </div>
    // </html>
  );
}