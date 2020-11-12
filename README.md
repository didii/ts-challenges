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

Every folder in `src/` contains a challenge. Most of them will have a readme to explain the problem. Good luck!
