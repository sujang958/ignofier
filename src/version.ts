import vegot from "vegot"

export const checkVersionUpToDate = async () => {
  const info = JSON.parse(
    (await vegot("https://registry.npmjs.org/ignofier")).data
  )
  const latestVersion = info["dist-tags"].latest
  const currentVersion = require("../package.json").version

  if (currentVersion != latestVersion)
    console.log(`\n New Version(${latestVersion}) available \n`)
}