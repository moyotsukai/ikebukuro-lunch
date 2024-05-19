import { readdirSync } from "fs"

const directories = readdirSync("src/components").map((it) => ({
  name: it,
  value: it
}))

export default function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  plop.setGenerator("component", {
    description: "Create a new component",
    prompts: [
      {
        type: "list",
        name: "parentPath",
        message: "folder path",
        choices: directories
      },
      {
        type: "input",
        name: "name",
        message: "component name"
      }
    ],
    actions: [
      {
        type: "add",
        path: "src/components/{{parentPath}}/{{pascalCase name}}/index.ts",
        templateFile: "plop-templates/component/index.ts.hbs"
      },
      {
        type: "add",
        path: "src/components/{{parentPath}}/{{pascalCase name}}/{{pascalCase name}}.tsx",
        templateFile: "plop-templates/component/Component.tsx.hbs"
      },
      {
        type: "add",
        path: "src/components/{{parentPath}}/{{pascalCase name}}/style.module.css",
        templateFile: "plop-templates/component/style.module.css.hbs"
      }
    ]
  })
}
