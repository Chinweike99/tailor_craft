"use client";

import type { Metadata } from "next";
import { Afacad } from "next/font/google";
import { Providers } from "../_providers/providers";
import ClientSidebar from "@/app/client/client-sidebar";
import ClientHeader from "./client-header";
import { Toaster } from "@/components/ui/components/toaster";
import { useAuthStore } from "@/store/authstore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const afacad = Afacad({ subsets: ["latin"] });

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { isAuthenticated, loading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, loading, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={afacad.className}>
      <Providers>
        <div className="flex h-screen overflow-hidden bg-gray-50">
          <ClientSidebar />
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