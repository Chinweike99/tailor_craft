import { BookingFormData, PortfolioItem, ThemeMode } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";



interface AppState {
    themeMode: ThemeMode;
    setThemeMode: (mode: ThemeMode) => void;
    toggleThemeMode: ()=> void;
    bookingFormData: BookingFormData | null;
    setBookingFormData: (data: BookingFormData | null) => void;
    saveMeasurements: {[key: string]: string | string[]} | null;
    setSavedMeasurements: (measurements: {[key: string]: string | string[]} | null) => void;
    favoriteItems: string[];
    toggleFavorite: (itemId: string) => void;
    isFavourite: (itemId: string) => boolean;
    recentlyViewed: PortfolioItem[];
    addToRecentlyViewed: (item: PortfolioItem) => void;
}

export const useAppStore = create<AppState>()(
    persist(
        (set, get) =>({
            themeMode: 'light',
            setThemeMode: (mode) =>set({themeMode: mode}),
            toggleThemeMode: () => set((state) => ({
                themeMode: state.themeMode === 'light' ? "dark" : "light",
            })),

            //Booking form Data(for saving drafts);
            bookingFormData: null,
            setBookingFormData: (data) => set({bookingFormData: data}),

            //Saved Measurements (for returning customers)
            saveMeasurements: {},
            setSavedMeasurements: (measurements) => set({saveMeasurements: measurements}),

            // Favourite functionality
            favoriteItems:[],
            toggleFavorite: (itemId) => set((state) => ({
                favoriteItems: state.favoriteItems.includes(itemId) ?
                state.favoriteItems.filter(id=>id !== itemId)
                : [...state.favoriteItems, itemId]
            })),
            isFavourite: (itemId) => get().favoriteItems.includes(itemId),
            // Recently viewed items
      recentlyViewed: [],
      addToRecentlyViewed: (item) => set((state) => {
        // Remove the item if it already exists
        const filtered = state.recentlyViewed.filter(i => i.id !== item.id);
        // Add item to the beginning of the array and keep only the 5 most recent
        return { 
          recentlyViewed: [item, ...filtered].slice(0, 5) 
        };
      }),
        }),

        {
            name: "tailoring-app-storage",
            //only persist specific fields
            partialize: (state) => ({
                themeMode: state.themeMode,
                favoriteItems: state.favoriteItems,
                saveMeasurements: state.saveMeasurements,
                recentlyViewed: state.recentlyViewed
            })
        }
    )
)