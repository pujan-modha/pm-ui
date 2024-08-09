import { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/registry/default/ui/button"
import { Announcement } from "@/components/announcement"
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"

export const metadata: Metadata = {
  title: "Color Themes",
  description: "Color Themes to use in your project.",
}

export default function ColorsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container relative">
      <PageHeader>
        <Announcement />
        <PageHeaderHeading>Color Themes</PageHeaderHeading>
        <PageHeaderDescription>
          Color Themes to use in your project.
        </PageHeaderDescription>
        <PageActions>
          <Button asChild size="sm">
            <a href="#colors">Browse Colors</a>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/docs/theming">Documentation</Link>
          </Button>
        </PageActions>
      </PageHeader>
      <section id="colors" className="scroll-mt-20">
        {children}
      </section>
    </div>
  )
}
