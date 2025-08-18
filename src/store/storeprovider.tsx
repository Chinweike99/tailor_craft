"use client";

import React, { useRef, createContext, useContext } from "react";
import { StoreApi } from "zustand";
import { useAuthStore } from "./authstore";

export const StoreContext = createContext<StoreApi<any> | null>(null);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<StoreApi<any> | null>(null);

  if (!storeRef.current) {
    storeRef.current = useAuthStore;
  }

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
};

export function useStoreContext<T>(selector: (state: any) => T): T {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error("Missing StoreProvider");
  }

  // useAuthStore itself is a hook already – no need for store parameter
  return useAuthStore(selector);
}
