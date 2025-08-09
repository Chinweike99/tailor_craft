"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";
// import { StoreProvider } from "../_store/store-provider";
import { ReactNode, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { StoreProvider } from "@/store/storeprovider";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }) 
  );

  return (
    // <SessionProvider>
      <StoreProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class" defaultTheme="light">
            {children}
            <ToastContainer position="top-right" autoClose={5000} />
            <ReactQueryDevtools initialIsOpen={false} />
          </ThemeProvider>
        </QueryClientProvider>
      </StoreProvider>
    // </SessionProvider>
  );
}