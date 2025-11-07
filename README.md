![Logo](https://raw.githubusercontent.com/iamsquare/complex.js/master/logo.png)

# [ℂomplex.js](https://complex-js.iamsquare.it)

[![NPM](https://img.shields.io/npm/v/@iamsquare/complex.js.svg?style=flat-square)](https://www.npmjs.com/package/@iamsquare/complex.js) [![Travis (.org) branch](https://img.shields.io/travis/iamsquare/complex.js/master.svg?style=flat-square)](https://travis-ci.org/iamsquare/complex.js/branches) [![GitHub issues](https://img.shields.io/github/issues-raw/iamsquare/complex.js.svg?style=flat-square)](https://github.com/iamsquare/complex.js/issues) [![GitHub License](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/iamsquare/complex.js/blob/master/LICENSE) [![NPM](https://nodei.co/npm/@iamsquare/complex.js.png?mini=true)](https://nodei.co/npm/@iamsquare/complex.js)

> A simple complex-numbers library for browsers and Node.js.

This library was created as solution for [this](http://www.rosettacode.org/wiki/Arithmetic/Complex) RosettaCode task. It has been moved to its own repo as a way to learn TDD with Travis-CI.

# Getting started

Complex.js can be used in both the browser and Node.js:

Install complex.js using [npm](https://www.npmjs.com/package/@iamsquare/complex.js) or [pnpm](https://pnpm.io/):

```shell
npm i @iamsquare/complex.js
# or
pnpm add @iamsquare/complex.js
```

> Since this library is compiled from Typescript, type definition files are provided by default. No additional @types installation required!

## Building

Just clone this repo and build the library:

```shell
git clone --depth=0 https://github.com/iamsquare/complex.js
cd complex.js/
pnpm install
pnpm run prod
```

`pnpm run prod` will run Vitest with coverage and build the library only if it passes all tests. To build without testing:

```shell
pnpm run build
```

> **Note**: This project uses [pnpm](https://pnpm.io/) as its package manager. The `preinstall` script will enforce this.

# Usage

Just import the Complex class and the operations/functions you want to use in your JavaScript or TypeScript project:

```js
import { Complex, add, log, pow, asinh, ...} from '@iamsquare/complex.js';
```

## Documentation

The library documentation can be found [here](https://complex-js.iamsquare.it).

## Examples

### Declaration

```typescript
const z: Complex = new Complex(1, -1); // Numeric arguments
const w: Complex = new Complex({ x: 1, y: -3 }); // Cartesian argument
const k: Complex = new Complex({ r: 1, p: Math.PI / 2 }); // Polar argument
const zz: Complex = new Complex(z); // Complex argument

// Access real and imaginary parts using getter methods
const realPart = z.getRe(); // Returns the real part
const imagPart = z.getIm(); // Returns the imaginary part
```

### Addition

```typescript
const a: Complex = add(z, w);
console.log(a.toString()); // => "2 - 4i"
console.log(a.getRe(), a.getIm()); // => 2, -4
```

### Subtraction

```typescript
const s: Complex = subtract(z, w);
console.log(s.toString()); // => "0 + 2i"
console.log(s.getRe(), s.getIm()); // => 0, 2
```

### Multiplication

```typescript
const m: Complex = multiply(z, w);
console.log(m.toString()); // => "-2 - 4i"
console.log(m.getRe(), m.getIm()); // => -2, -4
```

### Division

```typescript
const d: Complex = divide(z, w);
console.log(d.toString()); // => "0.4 + 0.2i"
console.log(d.getRe(), d.getIm()); // => 0.4, 0.2
```

These are just the four basic operations. Check the [documentation](https://complex-js.iamsquare.it) to know more.

# TODO

- [x] ~~Support for trig functions.~~
- [x] ~~Support for hyperbolic functions.~~
- [x] ~~Support for powers.~~
- [ ] Support for nth-roots (n√z).
- [ ] Refactor tests.
- [x] ~~Refactor the Complex class.~~

# Built With

- [TypeScript](https://www.typescriptlang.org/) ([github](https://github.com/Microsoft/TypeScript)) - Main language.
- [Vitest](https://vitest.dev/) ([github](https://github.com/vitest-dev/vitest)) - Testing framework.
- [Rollup](https://rollupjs.org/) ([github](https://github.com/rollup/rollup)) - Module bundler.
- [TypeDoc](https://typedoc.org/) ([github](https://github.com/TypeStrong/typedoc)) - Documentation generator for TypeScript projects.
- [pnpm](https://pnpm.io/) ([github](https://github.com/pnpm/pnpm)) - Fast, disk space efficient package manager.

# Licensing

The code in this project is licensed under MIT License.
