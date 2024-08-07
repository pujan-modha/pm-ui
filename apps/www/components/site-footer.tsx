import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Button } from "@/registry/default/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip"

export function SiteFooter() {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-primary text-center text-sm leading-loose md:text-left">
          Made with{" "}
          <span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  asChild
                  className="animate-pulse cursor-pointer"
                >
                  <span className="bg-primary bg-clip-text text-transparent">🤍</span>
                </TooltipTrigger>
                <TooltipContent className="rounded-full">
                  <Link
                    href="https://github.com/shadcn-ui/ui"
                    target="_blank"
                    rel="noreferrer"
                  >
                    shadcn/ui
                  </Link>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </span>{" "}
          by{" "}
          <a
            href="https://pujan.pm"
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary font-medium underline underline-offset-1"
          >
            Pujan Modha
          </a>
          .
          {/* . The source code is available on{" "}
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          . */}
        </p>
      </div>
    </footer>
  )
}
