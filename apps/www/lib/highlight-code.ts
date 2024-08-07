"use server"

import { codeToHtml } from "shiki"

export async function highlightCode(code: string) {
  const html = codeToHtml(code, {
    lang: "typescript",
    theme: "poimandres",
    transformers: [
      {
        code(node) {
          node.properties["data-line-numbers"] = ""
        },
      },
    ],
  })

  return html
}
