import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Button } from "@/registry/default/ui/button"
import { Announcement } from "@/components/announcement"
import { ExamplesNav } from "@/components/examples-nav"
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import MailPage from "@/app/(app)/examples/mail/page"

export default function IndexPage() {
  return (
    <div className="container relative">
      <PageHeader>
        <Announcement />
        <PageHeaderHeading>Build your component library</PageHeaderHeading>
        <PageHeaderDescription>
          Beautifully designed components that you can copy and paste into your
          apps.
        </PageHeaderDescription>
        <PageActions>
          <Button asChild size="sm">
            <Link href="/docs">Get Started</Link>
          </Button>
          <Button asChild size="sm" variant="ghost">
            <Link
              target="_blank"
              rel="noreferrer"
              href={siteConfig.links.github}
            >
              GitHub
            </Link>
          </Button>
        </PageActions>
      </PageHeader>
      <ExamplesNav className="[&>a:first-child]:text-primary" />
      <section className="block overflow-hidden rounded bg-background shadow md:hidden md:rounded-2xl md:border-2">
        <Image
          src="/examples/mail.png"
          width={1368}
          height={802}
          alt="Mail"
          className="block"
        />
      </section>
      <section className="hidden md:block">
        <div className="overflow-hidden rounded-2xl border-2 bg-background shadow">
          <MailPage />
        </div>
      </section>
    </div>
  )
}
