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
          <Button size="icon" variant="ghost">
            <PaletteIcon size={18} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="mr-1 mt-2 border-2">
          <p className="mb-2 font-semibold">Dracula Pro</p>
          <div className="grid grid-cols-3 justify-between gap-2 border-b-2 pb-2">
            {[
              "drac-pro-white",
              "drac-pro-cyan",
              "drac-pro-green",
              "drac-pro-orange",
              "drac-pro-pink",
              "drac-pro-purple",
              "drac-pro-red",
              "drac-pro-yellow",
              "drac-pro-light",
            ].map((color) => (
              <Button
                key={color}
                size="sm"
                onClick={() => changeThemeColor(color)}
                className={`${color} capitalize`}
              >
                {color.replace("drac-pro-", "")}
              </Button>
            ))}
          </div>
          <p className="my-2 font-semibold">Dracula</p>
          <div className="grid grid-cols-3 justify-between gap-2 border-b-2 pb-2">
            {[
              "drac-white",
              "drac-cyan",
              "drac-green",
              "drac-orange",
              "drac-pink",
              "drac-purple",
              "drac-red",
              "drac-yellow",
            ].map((color) => (
              <Button
                key={color}
                size="sm"
                onClick={() => changeThemeColor(color)}
                className={`${color} capitalize`}
              >
                {color.replace("drac-", "")}
              </Button>
            ))}
          </div>
          <p className="my-2 font-semibold">Nord</p>
          <div className="grid grid-cols-3 justify-between gap-2 border-b-2 pb-2">
            <pre>Coming soon...</pre>
          </div>
          <p className="my-2 font-semibold">Catppuccin</p>
          <div className="grid grid-cols-3 justify-between gap-2 pb-2">
            <pre>Coming soon...</pre>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default ThemeColorSwitcher
