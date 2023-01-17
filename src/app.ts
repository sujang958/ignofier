#!/usr/bin/env node

import { readFileSync } from "fs"
import { join } from "path"
import { ask, createFile } from "./creation"
import { checkCloned, cloneRepo, updateRepo } from "./git"
import { checkVersionUpToDate } from "./version"
import sade from "sade"

const ignofier = sade("ignofier", true)

ignofier
  .version(require("../package.json").version)
  .describe("Create a .gitignore file")
  .option("-v --version", "Check the version")
  .option("-u --update", "Update the gitignore repo")
  .action(async (options) => {
    if (options.version) return await checkVersionUpToDate()
    else if (options.update) return await updateRepo()

    if (!(await checkCloned())) await cloneRepo()
    const { selected: chosenFile } = await ask()
    await createFile(
      readFileSync(chosenFile).toString("utf8"),
      join(process.cwd(), ".gitignore")
    )
  })

ignofier.parse(process.argv)
