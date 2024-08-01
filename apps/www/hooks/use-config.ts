import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"

import { Style } from "@/registry/styles"
import { Theme } from "@/registry/themes"

type Config = {
  style: Style["name"]
  theme: Theme["name"]
  radius: number
}

const configAtom = atomWithStorage<Config>("config", {
  style: "default",
  theme: "yellow",
  radius: 1,
})

export function useConfig() {
  return useAtom(configAtom)
}
