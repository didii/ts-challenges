# TypeScript challenges

This is a simple collection of some relatively exotic usages of TypeScripts stupidly powerful typing system.
It is designed to show the power of TypeScript.
Whether this power is a good or bad thing, is up to you to decide.

If you do plan to make use of the most complex parts of its type system, please only do such that you can reduce the complexity to any client of your code.
That is probably the only valid use-case for any exotic usage of this typing system.

The examples here are most of the time pretty unnecessary and will only cause headaches along the way.
These are simply meant as examples to show the power of TypeScript.
Please use this power responsibly.

## Setup

### For all setups

1. Install [Node.js](https://nodejs.org/en/)
2. Run `npm install`

### For TS-supporting IDE users

Just start coding, no additional configuration or installs required.
It will automatically show you any compiler errors and provide auto-complete.
For VSCode: press F5 while in a `.ts`-file to execute it and have it stop at breakpoints.

### For non-IDE users

You can use `npx ts-node-dev --respawn <yourfilehere>` to compile and run the file on every change.
More about `ts-node-dev` [here](https://github.com/whitecolor/ts-node-dev#readme).

## Challenges

These challenges are sort-of ordered from easy to hard.
Your experience might vary, depending on your knowledge of Java- and TypeScript.

### 01. Typed SimpleChanges

Make Angulars `SimpleChanges` typed, that `ngOnChanges` accept, properly typed.

[Click here](./src/simple-changes/readme.md) to start.

### Simple Dependency Injection container

Create a simple DI container that can resolve classes without dependencies by its own type, a different type, a factory function or plain value.

[Click here](./src/di-container/readme.md) to start.

### Options for a specific object

Create mapping rules for an object by transforming its property types to some wrapper.
It should distinguish between a primary type (`string`, `Date`) and other types (any other object).
The primary types should be configurable.
E.g. `{ id: number, name: string }` becomes `{ id: Options<number>, name: Options<string> }`.

[Click here](#) to start.

### Validator for method parameters

Create a super generic validator that accepts the methods name, all arguments that either does not return due to wrong parameters, or outputs the parameters again but auto-corrected.

[Click here](#) to start.

### Create method that accepts some amount of parameters and returns them again

Create some method that accepts any number and type of method and returns them in some form of another.
