"use client"

import React from "react"
import { PaletteIcon } from "lucide-react"

import { Button } from "@/registry/default/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/default/ui/popover"
import { useThemeColor } from "@/components/theme-color"

const ThemeColorSwitcher = () => {
  const { themeColor, setThemeColor } = useThemeColor()

  const changeThemeColor = (color: string) => {
    setThemeColor(color)
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button size="icon" variant="ghost" className="h-8 w-8">
            <PaletteIcon size={16}/>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="mr-1 mt-3 w-auto max-w-[100vw] border-2">
          <p className="mb-2 font-semibold">Dracula Pro</p>
          <div className="grid grid-cols-3 justify-between gap-2 border-b-2 pb-2">
            {[
              "theme-drac-pro-white",
              "theme-drac-pro-cyan",
              "theme-drac-pro-green",
              "theme-drac-pro-orange",
              "theme-drac-pro-pink",
              "theme-drac-pro-purple",
              "theme-drac-pro-red",
              "theme-drac-pro-yellow",
              "theme-drac-pro-light",
            ].map((color) => (
              <Button
                key={color}
                size="sm"
                onClick={() => changeThemeColor(color)}
                className={`${color} capitalize`}
              >
                {color.replace("theme-drac-pro-", "")}
              </Button>
            ))}
          </div>
          <p className="my-2 font-semibold">Dracula</p>
          <div className="grid grid-cols-3 justify-between gap-2 border-b-2 pb-2">
            {[
              "theme-drac-white",
              "theme-drac-cyan",
              "theme-drac-green",
              "theme-drac-orange",
              "theme-drac-pink",
              "theme-drac-purple",
              "theme-drac-red",
              "theme-drac-yellow",
            ].map((color) => (
              <Button
                key={color}
                size="sm"
                onClick={() => changeThemeColor(color)}
                className={`${color} capitalize`}
              >
                {color.replace("theme-drac-", "")}
              </Button>
            ))}
          </div>
          <p className="my-2 font-semibold">Nord</p>
          <div className="grid grid-cols-3 justify-between gap-2 border-b-2 pb-2">
            <pre>Coming soon...</pre>
          </div>
          <p className="my-2 font-semibold">Catppuccin</p>
          <div className="grid grid-cols-3 justify-between gap-2 border-b-2 pb-2">
            <pre>Coming soon...</pre>
          </div>
          <p className="my-2 font-semibold">Other</p>
          <div className="grid grid-cols-3 justify-between gap-2 pb-2">
            {[
              "theme-poimandres",
            ].map((color) => (
              <Button
                key={color}
                size="sm"
                onClick={() => changeThemeColor(color)}
                className={`${color} capitalize`}
              >
                {color.replace("theme-", "")}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default ThemeColorSwitcher
