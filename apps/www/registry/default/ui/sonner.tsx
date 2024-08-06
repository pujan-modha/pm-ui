"use client"

import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-popover group-[.toaster]:text-primary !rounded-2xl group-[.toaster]:border-2 group-[.toaster]:border-primary group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-primary",
          actionButton:
            "group-[.toast]:!bg-destructive/10 group-[.toast]:!text-destructive group-[.toast]:!rounded-full group-[.toast]:!font-medium",
          cancelButton:
            "group-[.toast]:!bg-primary group-[.toast]:!text-background group-[.toast]:!rounded-full group-[.toast]:!font-medium",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
