import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar"

export default function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage src="https://pujan.pm/favicon-96x96.png" alt="Pujan Modha" />
      <AvatarFallback>PM</AvatarFallback>
    </Avatar>
  )
}
