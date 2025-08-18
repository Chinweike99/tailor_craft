// import { useAppStore } from "@/store";
// import { useEffect } from "react";

// // Define a type for theme variables
// export type ThemeColors = {
//   background: string;
//   text: string;
//   primary: string;
//   secondary: string;
//   accent: string;
// };

// // Define theme palettes
// const lightTheme: ThemeColors = {
//   background: 'bg-white',
//   text: 'text-black/90',
//   primary: 'bg-blue-600',
//   secondary: 'bg-gray-200',
//   accent: 'bg-amber-500'
// };

// const darkTheme: ThemeColors = {
//   background: 'bg-gray-900',
//   text: 'text-white',
//   primary: 'bg-blue-400',
//   secondary: 'bg-gray-700',
//   accent: 'bg-amber-400'
// };

// export const useTheme = () => {
//   const { themeMode, setThemeMode, toggleThemeMode } = useAppStore();

//   useEffect(() => {
//     const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

//     // Set the initial theme based on system preferences if not explicitly set
//     const handleChange = () => {
//       const systemPreference = mediaQuery.matches ? "dark" : "light";
//       document.documentElement.classList.toggle("dark", systemPreference === "dark");
//     };
//     mediaQuery.addEventListener("change", handleChange);

//     // Apply the current theme
//     document.documentElement.classList.toggle("dark", themeMode === "dark");
//     return () => mediaQuery.removeEventListener('change', handleChange);
//   }, [themeMode]);

//   // Get the current theme colors based on mode
//   const getThemeColors = (): ThemeColors => {
//     return themeMode === 'dark' ? darkTheme : lightTheme;
//   };

//   // Create a utility function to get specific component styles
//   const getComponentColors = (component: string): Record<string, string> => {
//     // You can define component-specific overrides here
//     const componentOverrides: Record<string, Record<string, Record<string, string>>> = {
//       navbar: {
//         light: {
//           background: 'bg-white shadow-md',
//           text: 'text-gray-800'
//         },
//         dark: {
//           background: 'bg-gray-800 shadow-md',
//           text: 'text-gray-100'
//         }
//       },
//       sidebar: {
//         light: {
//           background: 'bg-gray-100',
//           text: 'text-gray-800'
//         },
//         dark: {
//           background: 'bg-gray-800',
//           text: 'text-gray-200'
//         }
//       },
//       card: {
//         light: {
//           background: 'bg-white shadow',
//           text: 'text-gray-700'
//         },
//         dark: {
//           background: 'bg-gray-800 shadow-lg',
//           text: 'text-gray-200'
//         }
//       },
//       footer: {
//         light: {
//           background: 'bg-gray-200',
//           text: 'text-gray-700'
//         },
//         dark: {
//           background: 'bg-gray-800',
//           text: 'text-gray-300'
//         }
//       }
//       // Add more component styles as needed
//     };

//     return componentOverrides[component]?.[themeMode] || {};
//   };

//   return {
//     themeMode,
//     setThemeMode,
//     toggleThemeMode,
//     colors: getThemeColors(),
//     getComponentColors
//   };
// };




import { useAppStore } from "@/store";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Define a type for theme variables
export type ThemeColors = {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  accent: string;
};

// Define theme palettes
const lightTheme: ThemeColors = {
  background: 'bg-white',
  text: 'text-black/90',
  primary: 'bg-blue-600',
  secondary: 'bg-gray-200',
  accent: 'bg-amber-500'
};

const darkTheme: ThemeColors = {
  background: 'bg-gray-900',
  text: 'text-white',
  primary: 'bg-blue-400',
  secondary: 'bg-gray-700',
  accent: 'bg-amber-400'
};

// Normal web colors for excluded pages (standard light theme)
const normalTheme: ThemeColors = {
  background: 'bg-white',
  text: 'text-gray-900',
  primary: 'bg-blue-600',
  secondary: 'bg-gray-100',
  accent: 'bg-blue-500'
};

export const useTheme = () => {
  const { themeMode, setThemeMode, toggleThemeMode } = useAppStore();
  const pathname = usePathname();

  // Pages that should always use normal web colors
  const excludedRoutes = [
    '/auth',
    '/login', 
    '/register',
    '/forgot-password',
    '/reset-password',
    '/admin',
    '/client'
  ];

  const isExcludedRoute = excludedRoutes.some(route => 
    pathname.startsWith(route)
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      // Only apply system preference if not on excluded route
      if (!isExcludedRoute) {
        const systemPreference = mediaQuery.matches ? "dark" : "light";
        document.documentElement.classList.toggle("dark", systemPreference === "dark");
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    if (isExcludedRoute) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.toggle("dark", themeMode === "dark");
    }

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themeMode, pathname, isExcludedRoute]);

  const getThemeColors = (): ThemeColors => {
    if (isExcludedRoute) {
      return normalTheme;
    }
    return themeMode === 'dark' ? darkTheme : lightTheme;
  };
  const getComponentColors = (component: string): Record<string, string> => {
    if (isExcludedRoute) {
      const normalComponentStyles: Record<string, Record<string, string>> = {
        navbar: {
          background: 'bg-white shadow-md',
          text: 'text-gray-800'
        },
        sidebar: {
          background: 'bg-gray-50',
          text: 'text-gray-800'
        },
        card: {
          background: 'bg-white shadow',
          text: 'text-gray-700'
        },
        footer: {
          background: 'bg-gray-100',
          text: 'text-gray-700'
        }
      };
      return normalComponentStyles[component] || {};
    }

    const componentOverrides: Record<string, Record<string, Record<string, string>>> = {
      navbar: {
        light: {
          background: 'bg-white shadow-md',
          text: 'text-gray-800'
        },
        dark: {
          background: 'bg-gray-800 shadow-md',
          text: 'text-gray-100'
        }
      },
      sidebar: {
        light: {
          background: 'bg-gray-100',
          text: 'text-gray-800'
        },
        dark: {
          background: 'bg-gray-800',
          text: 'text-gray-200'
        }
      },
      card: {
        light: {
          background: 'bg-white shadow',
          text: 'text-gray-700'
        },
        dark: {
          background: 'bg-gray-800 shadow-lg',
          text: 'text-gray-200'
        }
      },
      footer: {
        light: {
          background: 'bg-gray-200',
          text: 'text-gray-700'
        },
        dark: {
          background: 'bg-gray-800',
          text: 'text-gray-300'
        }
      }
    };

    return componentOverrides[component]?.[themeMode] || {};
  };

  const safeToggleThemeMode = () => {
    if (!isExcludedRoute) {
      toggleThemeMode();
    }
  };

  return {
    themeMode: isExcludedRoute ? 'light' : themeMode,
    setThemeMode: isExcludedRoute ? () => {} : setThemeMode,
    toggleThemeMode: safeToggleThemeMode,
    colors: getThemeColors(),
    getComponentColors,
    isExcludedRoute 
  };
};