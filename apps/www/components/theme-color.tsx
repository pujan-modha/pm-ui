import { create } from "zustand"

type ThemeColorStore = {
  themeColor: string
  setThemeColor: (color: string) => void
}

export const useThemeColor = create<ThemeColorStore>((set) => ({
  themeColor:
    typeof window !== "undefined"
      ? localStorage.getItem("themeColor") || "theme-poimandres"
      : "theme-poimandres",
  setThemeColor: (color: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("themeColor", color)
      document.documentElement.classList.forEach((cls) => {
        if (
          cls.startsWith("theme-")
        ) {
          document.documentElement.classList.remove(cls)
        }
      })
      document.documentElement.classList.add(color)
    }
    set({ themeColor: color })
  },
}))

// Sync store with applied theme on mount
if (typeof window !== "undefined") {
  const appliedTheme = Array.from(document.documentElement.classList).find(
    (cls) =>
      cls.startsWith("theme-")
  )
  if (appliedTheme) {
    useThemeColor.getState().setThemeColor(appliedTheme)
  }
}
