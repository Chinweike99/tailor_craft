"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authstore";

export function AuthInitializer() {
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const syncAuthState = useAuthStore((state) => state.syncAuthState);

  useEffect(() => {
    // Wait for store to be hydrated from localStorage
    if (isHydrated) {
      if (process.env.NODE_ENV === 'development') {
        console.log("🔄 AuthInitializer - Store hydrated, syncing auth state");
      }
      syncAuthState();
    }
  }, [isHydrated, syncAuthState]);

  return null;
}
