# Create new Project

### Create a new repository on the command line:

[GitHub Repository](git@github.com:VitGT73/ts_tensor.git)

```bash
echo "# ts_tensor" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:VitGT73/ts_tensor.git
git push -u origin main
```

##### Add .gitignore

```
node_modules/
/test-results/
/playwright-report/
/blob-report/
/playwright/.cache/

# System Files
.DS_Store
Thumbs.db

.env
```
## Install Playwright

```bash
npm init playwright@latest
```

* Typescript
* tests
* y (We need a GitHub actions file yet.)
* y (We need the browsers, we're testing the UI)


## Install other tools

### Donenv

```bash
npm install dotenv --save
```

### [Настройка ESLint && Prettier && Husky](https://playwrightsolutions.com/the-definitive-guide-to-api-test-automation-with-playwright-part-8-adding-eslint-prettier-and-husky/)

#### [ESLint (typescript-eslint)](https://typescript-eslint.io/getting-started)

##### Install
```
npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint typescript
```
##### add .eslintignore
```yml
# Playwright Specific
node_modules/
/test-results/
/playwright-report/
/blob-report/
/playwright/.cache/
summary.json

# IDE - VSCode
.vscode/*

# System Files
.DS_Store
Thumbs.db
{"mode":"full","isActive":false}
```
##### Add .eslintrc.cjs
```cjs
/* eslint-env node */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/stylistic",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  root: true,
  rules: {
    "@typescript-eslint/no-explicit-any": 0,
    "no-console": 0,
    "no-restricted-syntax": [
      "error",
      // {
      //   selector: "CallExpression[callee.property.name='only']",
      //   message: "We don't want to leave .only on our tests😱",
      // },
    ],
  },
};
```

##### Run Eslinter
Только проверка без исправлений:
```
npx eslint .
```

Исправление ошибок:
```
npx eslint . --fix
```

* [Как отключить ESLint для некоторых строк, файлов или папок](https://learn.coderslang.com/0023-eslint-disable-for-specific-lines-files-and-folders/)


#### [Prettier](https://prettier.io/docs/en/install)

##### Install Prettier
Отключает настройки ESLint, конфликтующие с Prettier
```
npm install --save-dev eslint-config-prettier
```
Установка Prettier
```
npm install --save-dev --save-exact prettier
```

##### Add .prettierrc
```cjs
{
  "tabWidth": 2,
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "printWidth": 120,
  "overrides": [
    {
      "files": ["*.py"],
      "options": {
        "tabWidth": 4
      }
    }
  ]
}
```
##### Add .prettierignore
```yml
# Playwright Specific
node_modules/
/test-results/
/playwright-report/
/blob-report/
/playwright/.cache/
summary.json

package-lock.json
package.json

# IDE - VSCode
.vscode/*

# System Files
.DS_Store
Thumbs.db
{"mode":"full","isActive":false}

/docs/
README.md
```

##### Run Prettier
Run w/o fix problems:
```
npx prettier . --check
```

Fix problems
```
npx prettier . --write
```

#### [Husky](https://typicode.github.io/husky/get-started.html)

##### Install Husky

```npx husky-init && npm install```

##### Settings Husky
Add to ```.husky/pre-commit```
```npm run lint && npm run prettier```

##### Run Husky
Если все таки нужно срочно закоммитить:
```git commit -m "forcing the commit" --no-verify```
