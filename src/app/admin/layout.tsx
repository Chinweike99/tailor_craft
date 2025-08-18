"use client";

import { Afacad } from "next/font/google";
import { Providers } from "../_providers/providers";
import AdminSidebar from "./admin-sidebar";
import AdminHeader from "./admin-header";
import { Toaster } from "@/components/ui/components/toaster";
import { useAuthStore } from "@/store/authstore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const afacad = Afacad({ subsets: ["latin"] });


export default function AdminLayout({
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
    return <div>Loading...</div>;
  }
  return (
    <div className={afacad.className}>
      <Providers>
        <div className="flex h-screen overflow-hidden bg-gray-50">
          <AdminSidebar />
          <div className="flex flex-col flex-1 overflow-hidden min-w-0">
            <AdminHeader />
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