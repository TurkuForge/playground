# Testing with Vite

- [1. Jest](#1-jest)
  - [Commands run](#commands-run)
  - [Scripts run](#scripts-run)
  - [Procedure](#procedure)
- [2. ES Modules](#2-es-modules)
  - [Commands run](#commands-run-1)
  - [Scripts run](#scripts-run-1)
  - [Procedure](#procedure-1)
- [3. TypeScript](#3-typescript)
  - [Commands run](#commands-run-2)
  - [Scripts run](#scripts-run-2)
  - [Procedure](#procedure-2)
- [4. Vue](#4-vue)
  - [Commands run](#commands-run-3)
  - [Scripts run](#scripts-run-3)
  - [Procedure](#procedure-3)

## 1. Jest

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

Trying to run `npm run test` results in the follow error:

![Test script error](./screenshots/1_adding_jest/npm-run-test-error.png)

Since we want to have the Jest configuration in TypeScript file format, `jest.config.ts`, we do as the error text suggests and add [`ts-node`](https://github.com/TypeStrong/ts-node) with

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
const sum = require("./example");

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
```

### Scripts run

```shell
npm run test
```

---

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
import { sum } from "./example";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
```

![Unexpected token](./screenshots/2_es_modules/unexpected-token.png)

We could change the [test script to use experimental ES Module features in Node.js](https://jestjs.io/docs/ecmascript-modules), but since we want to use [TypeScript](https://www.typescriptlang.org/) later on, we'll add [Babel](https://babeljs.io/) and configure it according to [the instructions from Jest's documentation](https://jestjs.io/docs/getting-started#using-babel).

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

## 3. TypeScript

### Commands run

```shell
npm install --save-dev ts-jest @types/jest
```

### Scripts run

```shell
npm run test
```

---

### Procedure

Trying to run a TypeScript test results in the follow error:

```ts
// example.ts
export function sum(a: number, b: number): number {
  return a + b;
}
```

```ts
// example.spec.ts
import { sum } from "./example";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
```

![Syntax error](./screenshots/3_typescript/syntax-error.png)

Since we want type-checking in the tests as they run and full typing when we write them, we'll add [`ts-jest`](https://github.com/kulshekhar/ts-jest) along with [`@types/jest`](https://www.npmjs.com/package/@types/jest) by running

```shell
npm i -D ts-jest @types/jest
```

To utilize the installed `@types/jest` package we'll add it to our `tsconfig.json` file.

```js
// tsconfig.json
{
  "compilerOptions": {
    //...
    "types": ["vite/client", "@types/jest"]
  }
  //...
}
```

Next step is to tell Jest how to handle `.ts` files. We'll add a modified version of the [default `transform` property](https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object)

```js
"\\.[jt]sx?$": "babel-jest"
```

in `jest.config.ts` to still use [`babel-jest`](https://www.npmjs.com/package/babel-jest) for `.js`, `jsx` and `tsx` files. For `.ts` files, we want to use `ts-jest`.

```ts
// jest.config.ts
export default {
  //...
  transform: {
    "\\.(jsx?|tsx)$": "babel-jest",
    "\\.ts$": "ts-jest",
  },
  //...
};
```

The example Typescript specification now succeeds!

![Test script success](./screenshots/3_typescript/npm-run-test-success.png)

## 4. Vue

### Commands run

```shell
npm install --save-dev @vue/test-utils@next
npm install --save-dev vue-jest@next
```

### Scripts run

```shell
npm run test
```

---

### Procedure

To run tests for `.vue` files, we'll install [Vue Test Utils](https://next.vue-test-utils.vuejs.org/) – the official unit testing utility library for Vue.js.

```shell
npm i -D @vue/test-utils@next
```

Trying to run an example specification straight away won't work since we're missing a way for Jest to load `.vue` files. We're also missing support for the common `@` alias used in Vue applications.

```vue
<!-- HelloWorld.vue -->
<template>
  <h1>{{ msg }}</h1>
  <button @click="count++">count is: {{ count }}</button>
  <Links />
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import Links from "@/components/Links.vue";

export default defineComponent({
  name: "HelloWorld",
  components: {
    Links,
  },
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
  setup: () => {
    const count = ref(0);
    return { count };
  },
});
</script>
```

```ts
// HelloWorld.spec.ts
import HelloWorld from "@/components/HelloWorld.vue";
import { mount } from "@vue/test-utils";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", async () => {
    const msg = "new message";
    const wrapper = mount(HelloWorld, {
      props: { msg },
      global: {
        stubs: ["Links"],
      },
    });

    expect(wrapper.text()).toMatch(msg);

    const button = wrapper.find("button");
    await button.trigger("click");
    expect(button.text()).toContain("1");

    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<h1>new message</h1><button>count is: 1</button>
      <links-stub></links-stub>"
    `);
  });
});
```

![Alias error](./screenshots/4_vue/alias-error.png)

Adding a regular expression–module name map to the `moduleNameMapper` option in `jest.config.ts` adds support for `@` aliases.

```ts
// jest.config.ts
export default {
  //...
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  //...
};
```

Running `npm run test` still fails since we haven't added `.vue` support for Jest just yet.

![Unexpected token](./screenshots/4_vue/unexpected-token.png)

Adding [`vue-jest`](https://github.com/vuejs/vue-jest) and modifying the `transform` and `moduleFileExtensions` properties in `jest.config.ts` accordingly enables Jest to handle `.vue` files.

```shell
npm i -D vue-jest@next
```

```ts
// jest.config.ts
export default {
  //...
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node", "vue"],
  //...
  transform: {
    "\\.(jsx?|tsx)$": "babel-jest",
    "\\.ts$": "ts-jest",
    "\\.vue$": "vue-jest",
  },
  //...
};
```

We can now successfully test `.vue` files!

![Test script success](./screenshots/4_vue/npm-run-test-success.png)
