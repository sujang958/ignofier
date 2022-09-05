#!/usr/bin/env node

import { readFileSync } from "fs"
import { join } from "path"
import { ask, createFile } from "./creation"
import { setup } from "./git"
import { checkVersionUpToDate } from "./version"

;["-v", "--version"].includes(process.argv[2]) &&
  (() => {
    console.log(require("../package.json").version)
    process.exit()
  })()

const ignofier = async () => {
  await checkVersionUpToDate()
  await setup()
  const { selected: chosenFile } = await ask()
  await createFile(
    readFileSync(chosenFile).toString("utf8"),
    join(process.cwd(), ".gitignore")
  )
}

ignofier()
