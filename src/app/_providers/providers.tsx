"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";
import { ReactNode, useState } from "react";
// import { SessionProvider } from "next-auth/react";
import { StoreProvider } from "@/store/storeprovider";
import { AuthInitializer } from "@/components/AuthInitializer";
import { TokenDebugger } from "@/components/TokenDebugger";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: 1,
          },
        },
      }) 
  );

  return (
    // <SessionProvider>
      <StoreProvider>
        <AuthInitializer />
        {process.env.NODE_ENV === 'development' && <TokenDebugger />}
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class" defaultTheme="light">
            {children}
            <ToastContainer position="top-right" autoClose={3000} limit={3} />
            {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
          </ThemeProvider>
        </QueryClientProvider>
      </StoreProvider>
    // </SessionProvider>
  );
}