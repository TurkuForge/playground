# Testing with Vite

- [1. Adding Jest](#1-adding-jest)
  - [Commands run](#commands-run)
  - [Scripts run](#scripts-run)
  - [Procedure](#procedure)
- [2. ES Modules](#2-es-modules)
  - [Commands run](#commands-run-1)
  - [Scripts run](#scripts-run-1)
  - [Procedure](#procedure-1)

## 1. Adding Jest

### Commands run

```shell
npm install --save-dev jest
npx jest --init
npm install --save-dev ts-node
```

### Scripts run

```shell
npm run test
```

---

### Procedure

First and foremost, we add [Jest](https://jestjs.io/) as a `devDependency` with

```shell
npm i -D jest
```

We can then add a basic configuration file to the root of the project and a `test` command to `scripts` in `package.json` by running

```shell
npx jest --init
```

We select the following features:

![Chosen Jest features](./screenshots/1_adding_jest/chosen-jest-features.png)

Trying to run `npm run test` results in this error:

![Test script error](./screenshots/1_adding_jest/npm-run-test-error.png)

Since we want to have the Jest configuration in Typescript file format, `jest.config.ts`, we do as the error text suggests and add [`ts-node`](https://github.com/TypeStrong/ts-node) with

```shell
npm i -D ts-node
```

Running the test script again negates the error, but fails since we no tests yet.

![No tests](./screenshots/1_adding_jest/no-tests.png)

We can now add a basic JavaScript file using CommonJS modules with a corresponding specification file to successfully run tests with Jest!

```js
// example.js
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```

```js
// example.spec.js
const sum = require("./example.js");

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
```

![Test script success](./screenshots/1_adding_jest/npm-run-test-success.png)

---

## 2. ES Modules

### Commands run

```shell
npm install --save-dev babel-jest @babel/core @babel/preset-env
npm install --save-dev @types/jest
```

### Scripts run

```shell
npm run test

```

### Procedure

Running a test written with ES Modules produces the following error:

```js
// example.js
export function sum(a, b) {
  return a + b;
}
```

```js
// example.spec.js
import { sum } from "./example.js";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
```

![Unexpected token](./screenshots/2_es_modules/unexpected-token.png)

We could change the [test script to use experimental ES Module features in Node.js](https://jestjs.io/docs/ecmascript-modules), but since we want to use [Typescript](https://www.typescriptlang.org/) later on, we'll add [Babel](https://babeljs.io/) and configure it according to the instructions from Jest's documentation.

```shell
npm i -D babel-jest @babel/core @babel/preset-env

```

```js
// babel.config.js
module.exports = {
  presets: [["@babel/preset-env", { targets: { node: "current" } }]],
};
```

Running `npm run test` now succeeds!

![Test script success](./screenshots/2_es_modules/npm-run-test-success.png)
