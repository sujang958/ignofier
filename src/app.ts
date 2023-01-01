#!/usr/bin/env node

import { readFileSync } from "fs"
import { join } from "path"
import { ask, createFile } from "./creation"
import { setup, updateRepo } from "./git"
import { checkVersionUpToDate } from "./version"

const ignofier = async () => {
  await checkVersionUpToDate()
  await setup()
  const { selected: chosenFile } = await ask()
  await createFile(
    readFileSync(chosenFile).toString("utf8"),
    join(process.cwd(), ".gitignore")
  )
}

const VERSION_OPTIONS = ["-v", "--version"]
const showVersion = async () => {
  console.log(require("../package.json").version)
  await checkVersionUpToDate()
}

const UPDATE_OPTIONS = ["-u", "--update"]

const main = async () => {
  const OPTION = process.argv[2].toLowerCase()

  if (VERSION_OPTIONS.includes(OPTION))
    return await showVersion()
  if (UPDATE_OPTIONS.includes(OPTION))
    return updateRepo().then((updated) => (console.log(updated ? "Updated" : "Already up-to-date")))


  ignofier()
}

main()
