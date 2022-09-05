#!/usr/bin/env node

import { readFileSync } from "fs"
import { join } from "path"
import { ask, createFile } from "./creation"
import { setup } from "./git"

const run = async () => {
  setup()
  const { selected: chosenFile } = await ask()
  createFile(
    readFileSync(chosenFile).toString("utf8"),
    join(process.cwd(), ".gitignore")
  )
}

run()
