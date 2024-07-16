#!/usr/bin/env node
'use strict'

const path = require('path')
const fs = require('fs-extra')
const task = require('./task')

const componentName = process.argv[2]

async function updateMainIndex(componentName) {
  const mainIndexPath = path.join('src', 'index.tsx');
  let content = '';

  if (await fs.pathExists(mainIndexPath)) {
    content = await fs.readFile(mainIndexPath, 'utf8');
  }

  const exportLine = `export { default as ${componentName} } from "./${componentName}";`;

  if (content.includes(exportLine)) {
    content = content.replace(exportLine + '\n', '');
    await fs.writeFile(mainIndexPath, content);
    console.info(`✅ Removed export for ${componentName} from src/index.tsx`);
    console.info(`============================================`)
  } else {
    console.info(`✅ Export for ${componentName} not found in src/index.tsx`);
    console.info(`============================================`)
  }
}

module.exports = task('delete-component', async () => {
  if (!componentName) {
    throw new Error(
      '❌ Missing component name argument, use: `npm run delete-component [ComponentName]`',
    )
  }

  const componentDir = path.join('src', componentName)

  if (await fs.pathExists(componentDir)) {
    await fs.remove(componentDir)
    console.info(`✅ Deleted component directory: ${componentName}`)
    console.info(`============================================`)
    await updateMainIndex(componentName);
  } else {
    console.info(`❌ Component directory does not exist: ${componentName}`)
    console.info(`============================================`)
  }
})