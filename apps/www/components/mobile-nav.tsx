"use client"

import * as React from "react"
import Link, { LinkProps } from "next/link"
import { useRouter } from "next/navigation"
import { ViewVerticalIcon } from "@radix-ui/react-icons"

import { docsConfig } from "@/config/docs"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/default/ui/button"
import { ScrollArea } from "@/registry/default/ui/scroll-area"
import { Separator } from "@/registry/default/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/registry/default/ui/sheet"
import { Icons } from "@/components/icons"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <svg
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
          >
            <path
              d="M3 5H11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 12H16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 19H21"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <SheetTitle />
        <MobileLink
          href="/"
          className="flex w-min flex-col pl-4"
          onOpenChange={setOpen}
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2.5rem"
              height="2.5rem"
              viewBox="0 0 256 256"
              className="fill-primary m-auto mb-1"
            >
              <path
                d="M125.695 57.857 87.297 96.258l36.223 36.223 36.224 36.222 38.527-38.527 38.527-38.527-36.094-36.097c-19.851-19.853-36.21-36.096-36.352-36.096s-17.538 17.28-38.657 38.401m9.216 9.216L105.73 96.258l27.007 27.007 27.007 27.006 29.311-29.311 29.31-29.311-26.877-26.881c-14.782-14.783-26.993-26.88-27.136-26.88s-13.391 13.133-29.441 29.185M48.762 134.79l-29.315 29.318 4.617 4.596 4.617 4.596 29.179-29.176c16.049-16.047 29.18-29.413 29.18-29.702 0-.509-8.22-8.95-8.716-8.95-.136 0-13.439 13.193-29.562 29.318m31.692 31.284c-25.593 25.596-29.298 29.493-28.842 30.335.287.531 2.287 2.679 4.442 4.772l3.919 3.805 29.532-29.531 29.532-29.532-4.609-4.609-4.609-4.609zm31.419 32.069-29.18 29.183 4.608 4.608 4.608 4.608 29.431-29.434 29.431-29.434-4.335-4.357c-2.383-2.396-4.57-4.357-4.859-4.357s-13.656 13.132-29.705 29.183"
                fillRule="evenodd"
              />
            </svg>
          </div>
          <Separator className="h-[1.5px]" />
          <span className="font-bold">{siteConfig.name}</span>
        </MobileLink>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-4">
          <div className="flex flex-col space-y-3">
            {docsConfig.mainNav?.map(
              (item) =>
                item.href && (
                  <MobileLink
                    key={item.href}
                    href={item.href}
                    onOpenChange={setOpen}
                  >
                    {item.title}
                  </MobileLink>
                )
            )}
          </div>
          <div className="flex flex-col space-y-2">
            {docsConfig.sidebarNav.map((item, index) => (
              <div key={index} className="flex flex-col space-y-3 pt-6">
                <h4 className="font-medium">{item.title}</h4>
                {item?.items?.length &&
                  item.items.map((item) => (
                    <React.Fragment key={item.href}>
                      {!item.disabled &&
                        (item.href ? (
                          <MobileLink
                            href={item.href}
                            onOpenChange={setOpen}
                            className="text-primary"
                          >
                            {item.title}
                            {item.label && (
                              <span className="bg-primary text-background ml-2 rounded-full px-1.5 py-0.5 text-xs font-medium leading-none no-underline group-hover:no-underline">
                                {item.label}
                              </span>
                            )}
                          </MobileLink>
                        ) : (
                          item.title
                        ))}
                    </React.Fragment>
                  ))}
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  )
}
