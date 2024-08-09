"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-4 flex items-center space-x-2 lg:mr-6">
        <Icons.logo className="h-6 w-6" />
        <span className="text-primary hidden font-bold lg:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <Link
          href="/docs"
          className={cn(
            "hover:text-primary transition-colors",
            pathname === "/docs"
              ? "font-medium underline underline-offset-2"
              : "text-primary"
          )}
        >
          Docs
        </Link>
        <Link
          href="/docs/components"
          className={cn(
            "hover:text-primary transition-colors",
            pathname?.startsWith("/docs/components") &&
              !pathname?.startsWith("/docs/component/chart")
              ? "font-medium underline underline-offset-2"
              : "text-primary"
          )}
        >
          Components
        </Link>
        <Link
          href="/docs/theming"
          className={cn(
            "hover:text-primary transition-colors",
            pathname?.startsWith("/docs/theming")
              ? "font-medium underline underline-offset-2"
              : "text-primary"
          )}
        >
          Theming
        </Link>
        <Link
          href="/examples"
          className={cn(
            "hover:text-primary transition-colors",
            pathname?.startsWith("/examples")
              ? "font-medium underline underline-offset-2"
              : "text-primary"
          )}
        >
          Examples
        </Link>
        <Link
          href="/colors"
          className={cn(
            "hover:text-primary transition-colors",
            pathname?.startsWith("/colors")
              ? "font-medium underline underline-offset-2"
              : "text-primary"
          )}
        >
          Colors
        </Link>
      </nav>
    </div>
  )
}
