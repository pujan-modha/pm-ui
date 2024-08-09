"use client"

import * as React from "react"

import { getColorFormat, type Color } from "@/lib/colors"
import { cn } from "@/lib/utils"
import { useColors } from "@/hooks/use-colors"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select"
import { Skeleton } from "@/registry/default/ui/skeleton"

export function ColorFormatSelector({
  color,
  className,
  ...props
}: Omit<React.ComponentProps<typeof SelectTrigger>, "color"> & {
  color: Color
}) {
  const { format, setFormat, isLoading } = useColors()
  const formats = React.useMemo(() => getColorFormat(color), [color])

  if (isLoading) {
    return <ColorFormatSelectorSkeleton />
  }
}

export function ColorFormatSelectorSkeleton({
  className,
  ...props
}: React.ComponentProps<typeof Skeleton>) {
  return (
    <Skeleton
      className={cn("h-7 w-[116px] gap-1.5 rounded-lg", className)}
      {...props}
    />
  )
}
