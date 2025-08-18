

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
};

type AuthActions = {
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => Promise<void>;
  clearAuth: () => void;
};

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => {
        set({ token });
        // Also set/clear the auth cookie when token changes
        if (token) {
          document.cookie = `auth=${token}; path=/; max-age=${7 * 24 * 60 * 60}`; // 7 days
        } else {
          document.cookie = 'auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        }
      },
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      clearAuth: () => {
        // Clear cookie
        document.cookie = 'auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        // Clear state
        set(initialState);
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
          window.location.href = '/login';
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
    }
  )
);

