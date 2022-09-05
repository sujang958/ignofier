import { getIgnoreFiles } from "./git"
import inquirer from "inquirer"
import inquirerPrompt from "inquirer-autocomplete-prompt"
import { existsSync, writeFileSync } from "fs"

inquirer.registerPrompt("autocomplete", inquirerPrompt)

export const ask = async (): Promise<{ selected: string }> => {
  const choices = (await getIgnoreFiles()).map(({ name, path }) => ({
    name,
    value: path,
  }))
  return await inquirer.prompt([
    {
      type: "autocomplete",
      name: "selected",
      message: "Choice a file you want to add",
      source: (_: any, input: any) =>
        choices.filter((choice) => choice.name.includes(input || "")),
      choices,
    },
  ])
}

export const createFile = async (content: string, path: string) => {
  if (existsSync(path))
    if (
      !(
        await inquirer.prompt({
          type: "confirm",
          name: "confirmed",
          message: "The file already exists, do you want to overwite?",
        })
      ).confirmed
    )
      return console.log("Canceled")

  writeFileSync(path, content)
}
