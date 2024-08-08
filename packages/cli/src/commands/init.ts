import { existsSync, promises as fs } from "fs"
import path from "path"
import {
  DEFAULT_COMPONENTS,
  DEFAULT_TAILWIND_CONFIG,
  DEFAULT_TAILWIND_CSS,
  DEFAULT_UTILS,
  getConfig,
  rawConfigSchema,
  resolveConfigPaths,
  type Config,
} from "@/src/utils/get-config"
import { getPackageManager } from "@/src/utils/get-package-manager"
import { getProjectConfig, preFlight } from "@/src/utils/get-project-info"
import { handleError } from "@/src/utils/handle-error"
import { logger } from "@/src/utils/logger"
import { getRegistryBaseColor } from "@/src/utils/registry"
import * as templates from "@/src/utils/templates"
import chalk from "chalk"
import { Command } from "commander"
import { execa } from "execa"
import template from "lodash.template"
import ora from "ora"
import prompts from "prompts"
import { z } from "zod"

const PROJECT_DEPENDENCIES = [
  "tailwindcss-animate",
  "class-variance-authority",
  "clsx",
  "tailwind-merge",
]

const initOptionsSchema = z.object({
  cwd: z.string(),
  yes: z.boolean(),
  defaults: z.boolean(),
})

export const init = new Command()
  .name("init")
  .description("initialize your project and install dependencies")
  .option("-y, --yes", "skip confirmation prompt.", false)
  .option("-d, --defaults,", "use default configuration.", false)
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd()
  )
  .action(async (opts) => {
    try {
      const options = initOptionsSchema.parse(opts)
      const cwd = path.resolve(options.cwd)

      // Ensure target directory exists.
      if (!existsSync(cwd)) {
        logger.error(`The path ${cwd} does not exist. Please try again.`)
        process.exit(1)
      }

      preFlight(cwd)

      const projectConfig = await getProjectConfig(cwd)
      if (projectConfig) {
        const config = await promptForMinimalConfig(
          cwd,
          projectConfig,
          opts.defaults
        )
        await runInit(cwd, config)
      } else {
        // Read config.
        const existingConfig = await getConfig(cwd)
        const config = await promptForConfig(cwd, existingConfig, options.yes)
        await runInit(cwd, config)
      }

      logger.info("")
      logger.info(
        `${chalk.green(
          "Success!"
        )} Project initialization completed. You may now add components.`
      )
      logger.info("")
    } catch (error) {
      handleError(error)
    }
  })

export async function promptForConfig(
  cwd: string,
  defaultConfig: Config | null = null,
  skip = false
) {
  const highlight = (text: string) => chalk.cyan(text)

  const options = await prompts([
    {
      type: "toggle",
      name: "typescript",
      message: `Would you like to use ${highlight(
        "TypeScript"
      )} (recommended)?`,
      initial: defaultConfig?.tsx ?? true,
      active: "yes",
      inactive: "no",
    },
    {
      type: "text",
      name: "tailwindCss",
      message: `Where is your ${highlight("global CSS")} file?`,
      initial: defaultConfig?.tailwind.css ?? DEFAULT_TAILWIND_CSS,
    },
    {
      type: "text",
      name: "tailwindConfig",
      message: `Where is your ${highlight("tailwind.config.ts")} located?`,
      initial: defaultConfig?.tailwind.config ?? DEFAULT_TAILWIND_CONFIG,
    },
    {
      type: "text",
      name: "components",
      message: `Configure the import alias for ${highlight("components")}:`,
      initial: defaultConfig?.aliases["components"] ?? DEFAULT_COMPONENTS,
    },
    {
      type: "text",
      name: "utils",
      message: `Configure the import alias for ${highlight("utils")}:`,
      initial: defaultConfig?.aliases["utils"] ?? DEFAULT_UTILS,
    },
    {
      type: "toggle",
      name: "rsc",
      message: `Are you using ${highlight("React Server Components")}?`,
      initial: defaultConfig?.rsc ?? true,
      active: "yes",
      inactive: "no",
    },
  ])

  const config = rawConfigSchema.parse({
    $schema: "https://ui.pujan.pm/schema.json",
    style: "default",
    tailwind: {
      config: options.tailwindConfig,
      css: options.tailwindCss,
      cssVariables: true,
      prefix: "",
    },
    rsc: options.rsc,
    tsx: options.typescript,
    aliases: {
      utils: options.utils,
      components: options.components,
    },
  })

  if (!skip) {
    const { proceed } = await prompts({
      type: "confirm",
      name: "proceed",
      message: `Write configuration to ${highlight(
        "components.json"
      )}. Proceed?`,
      initial: true,
    })

    if (!proceed) {
      process.exit(0)
    }
  }

  // Write to file.
  logger.info("")
  const spinner = ora(`Writing components.json...`).start()
  const targetPath = path.resolve(cwd, "components.json")
  await fs.writeFile(targetPath, JSON.stringify(config, null, 2), "utf8")
  spinner.succeed()

  return await resolveConfigPaths(cwd, config)
}

export async function promptForMinimalConfig(
  cwd: string,
  defaultConfig: Config,
  defaults = false
) {
  const config = rawConfigSchema.parse({
    $schema: defaultConfig?.$schema,
    style: "default",
    tailwind: {
      ...defaultConfig?.tailwind,
      cssVariables: true,
    },
    rsc: defaultConfig?.rsc,
    tsx: defaultConfig?.tsx,
    aliases: defaultConfig?.aliases,
  })

  // Write to file.
  logger.info("")
  const spinner = ora(`Writing components.json...`).start()
  const targetPath = path.resolve(cwd, "components.json")
  await fs.writeFile(targetPath, JSON.stringify(config, null, 2), "utf8")
  spinner.succeed()

  return await resolveConfigPaths(cwd, config)
}

export async function runInit(cwd: string, config: Config) {
  const spinner = ora(`Initializing project...`)?.start()

  // Ensure all resolved paths directories exist.
  for (const [key, resolvedPath] of Object.entries(config.resolvedPaths)) {
    // Determine if the path is a file or directory.
    // TODO: is there a better way to do this?
    let dirname = path.extname(resolvedPath)
      ? path.dirname(resolvedPath)
      : resolvedPath

    // If the utils alias is set to something like "@/lib/utils",
    // assume this is a file and remove the "utils" file name.
    // TODO: In future releases we should add support for individual utils.
    if (key === "utils" && resolvedPath.endsWith("/utils")) {
      // Remove /utils at the end.
      dirname = dirname.replace(/\/utils$/, "")
    }

    if (!existsSync(dirname)) {
      await fs.mkdir(dirname, { recursive: true })
    }
  }

  const extension = config.tsx ? "ts" : "js"

  const tailwindConfigExtension = path.extname(
    config.resolvedPaths.tailwindConfig
  )

  let tailwindConfigTemplate: string
  if (tailwindConfigExtension === ".ts") {
    tailwindConfigTemplate = templates.TAILWIND_CONFIG_TS_WITH_VARIABLES
  } else {
    tailwindConfigTemplate = templates.TAILWIND_CONFIG_WITH_VARIABLES
  }

  // Write tailwind config.
  await fs.writeFile(
    config.resolvedPaths.tailwindConfig,
    template(tailwindConfigTemplate)({
      extension,
      prefix: config.tailwind.prefix,
    }),
    "utf8"
  )

  // Write css file.
  // const baseColor = await getRegistryBaseColor(config.tailwind.baseColor)
  // if (baseColor) {
  //   await fs.writeFile(
  //     config.resolvedPaths.tailwindCss,
  //     config.tailwind.cssVariables
  //       ? config.tailwind.prefix
  //         ? applyPrefixesCss(baseColor.cssVarsTemplate, config.tailwind.prefix)
  //         : baseColor.cssVarsTemplate
  //       : baseColor.inlineColorsTemplate,
  //     "utf8"
  //   )
  // }

  // Write css file but with my themes.
  await getRegistryBaseColor(config)

  // Write cn file.
  await fs.writeFile(
    `${config.resolvedPaths.utils}.${extension}`,
    extension === "ts" ? templates.UTILS : templates.UTILS_JS,
    "utf8"
  )

  spinner?.succeed()

  // Install dependencies.
  const dependenciesSpinner = ora(`Installing dependencies...`)?.start()
  const packageManager = await getPackageManager(cwd)

  // TODO: add support for other icon libraries.
  const deps = [...PROJECT_DEPENDENCIES, "lucide-react"]

  await execa(
    packageManager,
    [packageManager === "npm" ? "install" : "add", ...deps],
    {
      cwd,
    }
  )
  dependenciesSpinner?.succeed()
}
