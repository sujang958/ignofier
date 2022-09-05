import { existsSync, mkdirSync, readdirSync } from "fs"
import { join } from "path"
import simpleGit from "simple-git"

const DIR = join(__dirname, "../git/")
!existsSync(DIR) && mkdirSync(DIR)
const git = simpleGit(DIR)

export const checkCloned = async () => existsSync(join(DIR, ".git/config"))

export const cloneRepo = async () => {
  process.stdout.write("Cloning the repo... \r\n")
  await git.clone("https://github.com/github/gitignore", ".")
  console.log("Done")
}

export const pullRepo = async () => {
  await git.pull("origin", "main")
}

export const setup = async () => {
  if (await checkCloned()) await pullRepo()
  else await cloneRepo()
}

export const getIgnoreFiles = async () =>
  readdirSync(DIR)
    .filter((file) => file.endsWith(".gitignore"))
    .map((file) => ({
      name: file,
      path: join(DIR, file),
    }))
