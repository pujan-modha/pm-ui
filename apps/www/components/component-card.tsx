import React from "react"

import { cn } from "@/lib/utils"
import { AspectRatio } from "@/registry/default/ui/aspect-ratio"

export function ComponentCard({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <AspectRatio ratio={1 / 1} asChild>
      <div
        className={cn(
          "flex items-center justify-center rounded-2xl border-2 p-8",
          className
        )}
        {...props}
      />
    </AspectRatio>
  )
}