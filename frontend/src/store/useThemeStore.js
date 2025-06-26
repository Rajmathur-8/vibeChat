import { create } from "zustand";


export const useThemeStore = create(
  (set) => ({
    theme: localStorage.getItem("chat-theme") || "dark", // Default to light theme
    setTheme: (theme) => {
        localStorage.setItem("chat-theme", theme);
        set({ theme });
    },
    
  })
);