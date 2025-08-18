import { create } from "zustand";

type UIState = {
  sidebarOpen: boolean;
  mobileSidebarOpen: boolean;
  activeNavItem: string;
};

type UIActions = {
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  setActiveNavItem: (item: string) => void;
};

export const useUIStore = create<UIState & UIActions>((set) => ({
  sidebarOpen: true,
  mobileSidebarOpen: false,
  activeNavItem: "dashboard",
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleMobileSidebar: () =>
    set((state) => ({ mobileSidebarOpen: !state.mobileSidebarOpen })),
  setActiveNavItem: (item) => set({ activeNavItem: item }),
}));