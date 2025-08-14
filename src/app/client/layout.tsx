import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";
import { Providers } from "../_providers/providers";
import ClientSidebar from "@/app/client/client-sidebar";
import ClientHeader from "./client-header";
import { Toaster } from "@/components/ui/components/toaster";
import { useAuthStore } from "@/store/authstore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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

  const { isAuthenticated, loading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <div>Loading...</div>; // or a spinner
  }

  return (
    <div className={inter.className}>
      <Providers>
        <div className="flex h-screen overflow-hidden bg-gray-50">
          {/* Client Sidebar - will take up its natural width on desktop */}
          <ClientSidebar />
          
          {/* Main content area - will flex to fill remaining space */}
          <div className="flex flex-col flex-1 overflow-hidden min-w-0">
            <ClientHeader />
            <main className="flex-1 overflow-y-auto p-4 md:p-6">
              {children}
            </main>
          </div>
        </div>
        <Toaster />
      </Providers>
    </div>
  );
}