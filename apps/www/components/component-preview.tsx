"use client"

import * as React from "react"
import { Index } from "@/__registry__"

import { cn } from "@/lib/utils"
import { useConfig } from "@/hooks/use-config"
import { ScrollArea } from "@/registry/default/ui/scroll-area"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/default/ui/tabs"
import { CopyButton } from "@/components/copy-button"
import { Icons } from "@/components/icons"
import { ThemeWrapper } from "@/components/theme-wrapper"
import { styles } from "@/registry/styles"

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  extractClassname?: boolean
  extractedClassNames?: string
  align?: "center" | "start" | "end"
  description?: string
  hideCode?: boolean
}

export function ComponentPreview({
  name,
  children,
  className,
  extractClassname,
  extractedClassNames,
  align = "center",
  description,
  hideCode = false,
  ...props
}: ComponentPreviewProps) {
  const [config] = useConfig()
  const index = styles.findIndex((style) => style.name === config.style)

  const Codes = React.Children.toArray(children) as React.ReactElement[]
  const Code = Codes[index]

  const Preview = React.useMemo(() => {
    const Component = Index[config.style][name]?.component

    if (!Component) {
      return (
        <p className="text-sm text-primary">
          Component{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {name}
          </code>{" "}
          not found in registry.
        </p>
      )
    }

    return <Component />
  }, [name, config.style])

  const codeString = React.useMemo(() => {
    if (
      typeof Code?.props["data-rehype-pretty-code-fragment"] !== "undefined"
    ) {
      const [Button] = React.Children.toArray(
        Code.props.children
      ) as React.ReactElement[]
      return Button?.props?.value || Button?.props?.__rawString__ || null
    }
  }, [Code])

  return (
    <div
      className={cn(
        "group relative my-4 flex flex-col space-y-2 border-0",
        className
      )}
      {...props}
    >
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <div className="flex items-center justify-between pb-3">
          {!hideCode && (
            <TabsList className="w-min justify-start rounded-full border-2 bg-popover p-1">
              <TabsTrigger
                value="preview"
                className="relative rounded-full border-b-2 border-b-transparent bg-transparent px-4 py-1 font-semibold text-primary shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-background data-[state=active]:shadow-none"
              >
                Preview
              </TabsTrigger>
              <TabsTrigger
                value="code"
                className="relative rounded-full border-b-2 border-b-transparent bg-transparent px-4 py-1 font-semibold text-primary shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-background data-[state=active]:shadow-none"
              >
                Code
              </TabsTrigger>
            </TabsList>
          )}
        </div>
        <TabsContent value="preview" className="relative rounded-2xl border-2">
          <div className="flex items-center justify-between p-4">
            {/* <StyleSwitcher /> */}
            <div className="ml-auto flex items-center gap-2">
              <CopyButton
                value={codeString}
                variant="ghost"
                className="h-7 w-7 opacity-100 [&_svg]:h-3.5 [&_svg]:w-3.5"
              />
            </div>
          </div>
          <ThemeWrapper defaultTheme="zinc">
            <div
              className={cn(
                "preview flex min-h-[350px] w-full justify-center p-10",
                {
                  "items-center": align === "center",
                  "items-start": align === "start",
                  "items-end": align === "end",
                }
              )}
            >
              <React.Suspense
                fallback={
                  <div className="flex w-full items-center justify-center text-sm text-primary">
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </div>
                }
              >
                {Preview}
              </React.Suspense>
            </div>
          </ThemeWrapper>
        </TabsContent>
        <TabsContent value="code">
          <div className="flex flex-col space-y-4">
            <div className="w-full rounded-2xl [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto">
              {Code}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
