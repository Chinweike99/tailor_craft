"use client";

import { useEffect } from "react";

export function TokenDebugger() {
  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== 'development') return;

    const checkAuth = () => {
      const cookies = document.cookie.split(';');
      const authCookie = cookies.find(c => c.trim().startsWith('auth='));
      const authToken = authCookie ? authCookie.split('=')[1] : null;
      
      const localStorage = window.localStorage.getItem('auth-storage');
      
      console.group("🐛 Token Debugger");
      console.log("Cookie token (first 30 chars):", authToken?.substring(0, 30));
      console.log("LocalStorage:", localStorage);
      
      if (authToken) {
        try {
          const payload = JSON.parse(atob(authToken.split('.')[1]));
          console.log("Decoded token payload:", payload);
          console.log("Role from token:", payload.role || payload.user?.role);
        } catch (e) {
          console.error("Failed to decode token:", e);
        }
      }
      console.groupEnd();
    };

    // Check on mount
    checkAuth();
    
    // Check every 2 seconds
    const interval = setInterval(checkAuth, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return null;
}
