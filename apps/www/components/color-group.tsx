"use client"

import { useState } from "react"
import { Clipboard, ClipboardCheck } from "lucide-react"

type ColorGroupProps = {
  groupName: string
  themes: Array<{ themeName: string; colors: Record<string, string> }>
}

export default function ColorGroup({ groupName, themes }: ColorGroupProps) {
  const [copiedTheme, setCopiedTheme] = useState<string | null>(null)

  const handleCopy = (themeName: string, colors: Record<string, string>) => {
    const colorString = Object.entries(colors)
      .map(([key, value]) => `--${key}: ${value};`)
      .join("\n")
    navigator.clipboard.writeText(colorString)
    setCopiedTheme(themeName)
    setTimeout(() => setCopiedTheme(null), 2000)
  }

  const formatThemeName = (themeName: string) => {
    return themeName
      .replace(/^theme-/, "")
      .replace(/^drac-/, "")
      .replace(/^pro-/, "")
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{groupName}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {themes.map(({ themeName, colors }) => (
          <div key={themeName} className="bg-popover border-2 rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">
                {formatThemeName(themeName)}
              </h3>
              {copiedTheme === themeName ? (
                <ClipboardCheck className="h-4 w-4" />
              ) : (
                <Clipboard
                  className="h-4 w-4 cursor-pointer"
                  onClick={() => handleCopy(themeName, colors)}
                />
              )}
            </div>
            <div className="flex space-x-2 mb-2">
              {Object.entries(colors).map(([key, value]) => (
                <div
                  key={key}
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: `hsl(${value})` }}
                  title={key}
                />
              ))}
            </div>
            <pre className="text-sm overflow-x-auto bg-background p-2 rounded-2xl select-all">
              {Object.entries(colors)
                .map(([key, value]) => `--${key}: ${value};`)
                .join("\n")}
            </pre>
          </div>
        ))}
      </div>
    </div>
  )
}
