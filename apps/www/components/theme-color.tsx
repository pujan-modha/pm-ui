const { create } = require("zustand")

type ThemeColorStore = {
  themeColor: string
  setThemeColor: (color: string) => void
}

export const useThemeColorStore = create<ThemeColorStore>((set: any) => ({
  themeColor: "drac-pro-cyan",
  setThemeColor: (color: string) => set({ themeColor: color }),
}))
