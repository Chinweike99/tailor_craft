// // "use client";

// // import { createContext, useRef } from "react";
// // import { StoreApi } from "zustand";
// // // import { createStore, useStore } from "./auth-store";

// // export const StoreContext = createContext<StoreApi<any> | null>(null);

// // export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
// //   const storeRef = useRef<StoreApi<any>>();
// //   if (!storeRef.current) {
// //     storeRef.current = createStore();
// //   }

// //   return (
// //     <StoreContext.Provider value={storeRef.current}>
// //       {children}
// //     </StoreContext.Provider>
// //   );
// // };

// // export function useStoreContext<T>(selector: (state: any) => T): T {
// //   const store = useContext(StoreContext);
// //   if (!store) {
// //     throw new Error("Missing StoreProvider");
// //   }
// //   return useStore(store, selector);
// // }




// "use client";

// import { createContext, useContext, useRef } from "react";
// import { StoreApi, useStore } from "zustand";
// // import { createStore } from "./auth-store"; // Make sure this path is correct

// export const StoreContext = createContext<StoreApi<any> | null>(null);

// export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
//   const storeRef = useRef<StoreApi<any>>();
  
//   if (!storeRef.current) {
//     storeRef.current = createStore();
//   }
  
//   return (
//     <StoreContext.Provider value={storeRef.current}>
//       {children}
//     </StoreContext.Provider>
//   );
// };

// export function useStoreContext<T>(selector: (state: any) => T): T {
//   const store = useContext(StoreContext);
  
//   if (!store) {
//     throw new Error("Missing StoreProvider");
//   }
  
//   return useStore(store, selector);
// }



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
