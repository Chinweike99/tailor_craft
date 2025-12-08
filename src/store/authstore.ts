

import apiClient from "@/_utils/api";
import { USER_ROLES } from "@/_utils/constants";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: keyof typeof USER_ROLES;
  isVerified: boolean;
  profileImage?: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  isHydrated: boolean;
};

type AuthActions = {
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => Promise<void>;
  clearAuth: () => void;
  syncAuthState: () => void;
  setHydrated: () => void;
};

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  isHydrated: false,
};

// Helper function to get cookie value
const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  const cookies = document.cookie.split(';');
  const cookie = cookies.find(c => c.trim().startsWith(`${name}=`));
  return cookie ? cookie.split('=')[1] : null;
};

// Helper function to set cookie
const setCookie = (name: string, value: string, maxAge?: number) => {
  if (typeof document === 'undefined') return;
  const maxAgeStr = maxAge ? `; max-age=${maxAge}` : '';
  const isProduction = process.env.NODE_ENV === 'production';
  const secureFlag = isProduction ? '; secure' : '';
  const cookieString = `${name}=${value}; path=/${secureFlag}; samesite=lax${maxAgeStr}`;
  if (process.env.NODE_ENV === 'development') {
    console.log("🍪 Setting cookie:", cookieString.substring(0, 100));
  }
  document.cookie = cookieString;
};

// Helper function to delete cookie
const deleteCookie = (name: string) => {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      setUser: (user) => {
        if (process.env.NODE_ENV === 'development') {
          console.log("👤 setUser called with:", user);
        }
        set({ user, isAuthenticated: !!user });
        // Also store role in a separate cookie for middleware access
        if (user?.role) {
          setCookie('user-role', user.role, 7 * 24 * 60 * 60);
        } else {
          deleteCookie('user-role');
        }
      },
      setToken: (token) => {
        if (process.env.NODE_ENV === 'development') {
          console.log("🔑 setToken called with token (first 20 chars):", token?.substring(0, 20));
        }
        set({ token });
        // Also set/clear the auth cookie when token changes
        if (token) {
          setCookie('auth', token, 7 * 24 * 60 * 60); // 7 days
        } else {
          deleteCookie('auth');
        }
      },
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      setHydrated: () => set({ isHydrated: true }),
      syncAuthState: () => {
        const state = get();
        const cookieToken = getCookie('auth');
        const cookieRole = getCookie('user-role');
        
        if (process.env.NODE_ENV === 'development') {
          console.log("🔄 syncAuthState - State token:", state.token?.substring(0, 20));
          console.log("🔄 syncAuthState - Cookie token:", cookieToken?.substring(0, 20));
          console.log("🔄 syncAuthState - User role in state:", state.user?.role);
          console.log("🔄 syncAuthState - User role in cookie:", cookieRole);
        }
        
        // If we have user and token in state but missing cookies, set the cookies
        if (state.token && state.user && (!cookieToken || !cookieRole)) {
          if (process.env.NODE_ENV === 'development') {
            console.log("✅ syncAuthState - Setting cookies from state");
          }
          if (!cookieToken) {
            setCookie('auth', state.token, 7 * 24 * 60 * 60);
          }
          if (!cookieRole && state.user.role) {
            setCookie('user-role', state.user.role, 7 * 24 * 60 * 60);
          }
        }
        // If we have cookies but no state, update the state (partial - token only)
        else if (cookieToken && !state.token) {
          if (process.env.NODE_ENV === 'development') {
            console.log("✅ syncAuthState - Setting state from cookie token");
          }
          set({ token: cookieToken, isAuthenticated: true });
        }
        // If neither exists, ensure we're logged out
        else if (!cookieToken && !state.token) {
          if (process.env.NODE_ENV === 'development') {
            console.log("⚠️ syncAuthState - No token found, clearing auth");
          }
          set({ user: null, token: null, isAuthenticated: false });
          deleteCookie('user-role');
        } else if (process.env.NODE_ENV === 'development') {
          console.log("✅ syncAuthState - State and cookies in sync");
        }
      },
      clearAuth: () => {
        // Clear cookies
        deleteCookie('auth');
        deleteCookie('user-role');
        // Clear state
        set({ ...initialState, isHydrated: true });
      },
      logout: async () => {
        const { clearAuth } = get();
        try {
          // Call logout endpoint
          await apiClient.post("/auth/logout");
        } catch (error) {
          console.error("Error calling logout endpoint:", error);
        } finally {
          // Clear auth state regardless of API call success
          clearAuth();
          // Force redirect to login page
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ 
        token: state.token, 
        user: state.user,
        isAuthenticated: state.isAuthenticated 
      }),
      onRehydrateStorage: () => (state) => {
        // After rehydration, sync with cookie and mark as hydrated
        if (state) {
          state.syncAuthState();
          state.setHydrated();
        }
      },
    }
  )
);

