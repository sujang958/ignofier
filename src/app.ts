// import vegot from "vegot"

import {
  existsSync,
  lstatSync,
  readdirSync,
  readFileSync,
  unlinkSync,
} from "fs"
import { join } from "path"
import simpleGit from "simple-git"

const DIR = join(__dirname, "../git/")
const git = simpleGit(DIR)

const checkCloned = async () => existsSync(join(DIR, ".git/config"))

const cloneRepo = async () => {
  await git.clone("https://github.com/github/gitignore", ".")
}

const pullRepo = async () => {
  await git.pull("origin", "main")
}

const deleteWithoutIgnores =async () => {
  
}

const setup = async () => {
  if (await checkCloned()) pullRepo()
  else cloneRepo()


}

// cloneRepo()
