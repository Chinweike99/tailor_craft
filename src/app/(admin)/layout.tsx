import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "../_providers/providers";
import AdminSidebar from "./admin-sidebar";
import AdminHeader from "./admin-header";
import { Toaster } from "@/components/ui/components/toaster";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TailorCraft - Admin Dashboard",
  description: "TailorCraft Admin Dashboard",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="flex h-screen overflow-hidden bg-gray-50">
            <AdminSidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
              <AdminHeader />
              <main className="flex-1 overflow-y-auto p-4 md:p-6">
                {children}
              </main>
            </div>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}