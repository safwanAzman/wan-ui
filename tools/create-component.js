#!/usr/bin/env node
'use strict'
/**
 * This script scaffolds React component.
 *
 * For the following command:
 *
 * `npm run create-components ComponentName`
 *
 * The following file tree will be generated:
 *
 * /src/package-name
 * ├── /stories/
 * │   └── index.stories.tsx
 * └── /ui/
 * │  └── shadcn-component-name.tsx
 * └── index.tsx
 *
 */
const path = require('path')
const fs = require('fs-extra')
const task = require('./task')
const { exec } = require('child_process')

const componentTemplate = require('./component-template')
const componentStoriesTemplate = require('./component-stories-template')

const componentName = process.argv[2]

async function updateMainIndex(componentName) {
  const mainIndexPath = path.join('src', 'index.tsx')
  let content = ''

  if (await fs.pathExists(mainIndexPath)) {
    content = await fs.readFile(mainIndexPath, 'utf8')
  }

  const newExportLine = `export { default as ${componentName} } from "./${componentName}";`

  if (!content.includes(newExportLine)) {
    // Add a newline before the new export if the file is not empty
    if (content && !content.endsWith('\n')) {
      content += '\n'
    }
    content += newExportLine + '\n'
    await fs.writeFile(mainIndexPath, content)
    console.info(`✅ Updated src/index.tsx with export for ${componentName}`)
    console.info(`============================================`)
  } else {
    console.info(
      `✅ Export for ${componentName} already exists in src/index.tsx`,
    )
    console.info(`============================================`)
  }
}

function runShadcnUiCommand(componentName) {
  return new Promise((resolve, reject) => {
    exec(
      `npx shadcn-ui@latest add ${componentName.toLowerCase()}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error running shadcn-ui command: ${error}`)
          console.info(`============================================`)
          reject(error)
          return
        }
        resolve()
      },
    )
  })
}

module.exports = task('create-component', async () => {
  if (!componentName) {
    throw new Error(
      '❌ Missing component name argument, use: `npm run create-components [ComponentName]`',
    )
    console.info(`============================================`)
  }

  if (!initialIsCapital(componentName)) {
    throw new Error(
      `❌ Wrong format for '${componentName}': use CamelCase for ComponentName`,
    )
  }

  const componentDir = path.join('src', componentName)

  const componentDirExistsAlready = await fs.pathExists(componentDir)

  if (componentDirExistsAlready) {
    throw new Error(`❌ Directory already exists: ${componentName}`)
  }

  await fs.ensureDir(componentDir)

  console.info('✅ Component name will be:', componentName)
  console.info(`============================================`)

  await fs.writeFile(
    path.join('src', componentName, 'index.tsx'),
    componentTemplate({ componentName }),
  )

  await fs.ensureDir(path.join('src', componentName, 'stories'))
  await fs.writeFile(
    path.join('src', componentName, 'stories', `index.stories.tsx`),
    componentStoriesTemplate({ componentName }),
  )

  async function updateShadcnImportStatement(componentName) {
    const componentPath = path.join(
      'src',
      'ui',
      `${componentName.toLowerCase()}.tsx`,
    )
    let content = await fs.readFile(componentPath, 'utf8')

    content = content.replace('from "/lib/utils"', 'from "../lib/utils"')

    await fs.writeFile(componentPath, content)
    console.info(
      `✅ Updated import statement in ui/${componentName.toLowerCase()}.tsx `,
    )
    console.info(`============================================`)
  }

  await updateMainIndex(componentName)
  try {
    await runShadcnUiCommand(componentName)
    console.info(`✅ Successfully run shadcn-ui command for ${componentName}`)
    console.info(`============================================`)
    await updateShadcnImportStatement(componentName)
    console.info(
      `✅ Successfully Replace from "/lib/utils to from "../lib/utils`,
    )
    console.info(`============================================`)
  } catch (error) {
    console.error(`❌ Failed to run shadcn-ui command for ${componentName}`)
    console.info(`============================================`)
  }
})

function initialIsCapital(word) {
  return word[0] !== word[0].toLowerCase()
}
