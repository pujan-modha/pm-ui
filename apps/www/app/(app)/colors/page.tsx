import colorData from "@/public/registry/colors.json"

import ColorGroup from "@/components/color-group"

export default function ColorsPage() {
  const groupedColors = Object.entries(colorData).reduce(
    (acc, [themeName, colors]) => {
      const groupName = themeName.startsWith("theme-drac-pro")
        ? "Dracula Pro"
        : themeName.startsWith("theme-drac")
        ? "Dracula"
        : "Other"
      if (!acc[groupName]) {
        acc[groupName] = []
      }
      acc[groupName].push({ themeName, colors })
      return acc
    },
    {} as Record<
      string,
      Array<{ themeName: string; colors: Record<string, string> }>
    >
  )

  return (
    <div className="space-y-8">
      {Object.entries(groupedColors).map(([groupName, themes]) => (
        <ColorGroup key={groupName} groupName={groupName} themes={themes} />
      ))}
    </div>
  )
}
