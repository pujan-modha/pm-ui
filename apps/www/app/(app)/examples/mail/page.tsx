import { cookies } from "next/headers"
import Image from "next/image"

import { Mail } from "@/app/(app)/examples/mail/components/mail"
import { accounts, mails } from "@/app/(app)/examples/mail/data"

export default function MailPage() {
  const layout = cookies().get("react-resizable-panels:layout:mail")
  const collapsed = cookies().get("react-resizable-panels:collapsed")

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/mail.png"
          width={1368}
          height={802}
          alt="Mail"
          className="block"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <Mail
          accounts={accounts}
          mails={mails}
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          navCollapsedSize={4}
        />
      </div>
    </>
  )
}
