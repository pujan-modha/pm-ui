import Link from "next/link"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { PartyPopper } from "lucide-react"

import { Separator } from "@/registry/default/ui/separator"

export function Announcement() {
  return (
    <Link
      href="https://pujan.pm/blog/pm-ui"
      className="group inline-flex items-center px-0.5 text-sm font-medium"
    >
      <PartyPopper className="h-4 w-4" />{" "}
      <Separator className="mx-2 h-4" orientation="vertical" />{" "}
      <span className="underline-offset-4 group-hover:underline">
        pm/ui is out!!
      </span>
      <ArrowRightIcon className="ml-1 h-4 w-4" />
    </Link>
  )
}
