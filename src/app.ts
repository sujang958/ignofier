#!/usr/bin/env node

import { readFileSync } from "fs"
import { join } from "path"
import { ask, createFile } from "./creation"
import { checkCloned, cloneRepo, isRepoUpToDate, updateRepo } from "./git"
import { checkVersionUpToDate } from "./version"
import sade from "sade"

const ignofier = sade("ignofier", true)

ignofier
  .version(require("../package.json").version)
  .describe("Create a .gitignore file")
  .option("-u --update", "Update the gitignore repo")
  .action(async (options) => {
    if (options.update) return await updateRepo()
    if (!(await checkCloned())) await cloneRepo()

    const { selected: chosenFile } = await ask()
    await createFile(
      "# This file was created with ignofier \n\n" +
        readFileSync(chosenFile).toString("utf8"),
      join(process.cwd(), ".gitignore")
    )

    if (!(await isRepoUpToDate()))
      console.log(
        "The gitignore repository is not up to date with the remote gitignore repository. You can type `ignofier -u` to update it."
      )

    await checkVersionUpToDate()
  })

ignofier.parse(process.argv)
