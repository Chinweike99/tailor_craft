import { useAppStore } from "@/store"
import { useEffect } from "react";



export const useTheme = () => {
    const {themeMode, setThemeMode, toggleThemeMode} = useAppStore();

    useEffect(()=>{
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        // Set the initial theme based on system preferences if not explicitly set
        const handleChange =()=>{
            const systemPreference = mediaQuery.matches ? "dark" : "light";
            document.documentElement.classList.toggle("dark", systemPreference === "dark")
        };
        mediaQuery.addEventListener("change", handleChange);

        //Apply the current theme
        document.documentElement.classList.toggle("dark", themeMode === "dark");
        return ()=> mediaQuery.removeEventListener('change', handleChange);
    }, [themeMode]);

    return {themeMode, setThemeMode, toggleThemeMode};
}

