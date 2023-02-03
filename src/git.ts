import { existsSync, mkdirSync, readdirSync } from "fs"
import { join } from "path"
import simpleGit from "simple-git"

const REPO_DIR = join(__dirname, "../git/")
!existsSync(REPO_DIR) && mkdirSync(REPO_DIR)
const git = simpleGit(REPO_DIR)

export const checkCloned = async () => existsSync(join(REPO_DIR, ".git/config"))

export const cloneRepo = async () => {
  console.log("Cloning the github/gitignore repository...")
  await git.clone("https://github.com/github/gitignore", ".")
  console.log("Done")
}

export const updateRepo = async () => {
  console.log("Updating the repository")
  if (await isRepoUpToDate()) return console.log("Already up-to-date")
  const res = await git.pull("origin", "main")
  if (res.summary.changes > 0) return console.log("Updated")
  else return console.log("Already up-to-date")
}

export const getIgnoreFiles = async () =>
  readdirSync(REPO_DIR)
    .filter((file) => file.endsWith(".gitignore"))
    .map((file) => ({
      name: file,
      path: join(REPO_DIR, file),
    }))

export const isRepoUpToDate = async () => {
  const status = await git.status()
  const behind = status.behind

  if (behind < 1) return true
  else return false
}
