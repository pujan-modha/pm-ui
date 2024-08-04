import { BellIcon, EyeNoneIcon, PersonIcon } from "@radix-ui/react-icons"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card"

export function DemoNotifications() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Choose what you want to be notified about.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-1">
        <div className="-mx-2 flex items-start space-x-4 rounded-2xl border-2 border-transparent p-2 transition-all hover:bg-primary hover:text-background">
          <BellIcon className="mt-px h-5 w-5" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Everything</p>
            <p className="text-sm">Email digest, mentions & all activity.</p>
          </div>
        </div>
        <div className="-mx-2 flex items-start space-x-4 rounded-2xl border-2 bg-primary p-2 text-background transition-all">
          <PersonIcon className="mt-px h-5 w-5" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Available</p>
            <p className="text-sm">Only mentions and comments.</p>
          </div>
        </div>
        <div className="-mx-2 flex items-start space-x-4 rounded-2xl border-2 border-transparent p-2 transition-all hover:bg-primary hover:text-background">
          <EyeNoneIcon className="mt-px h-5 w-5" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Ignoring</p>
            <p className="text-sm">Turn off all notifications.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
