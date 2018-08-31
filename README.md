![Logo-Javascript](./media/logo.png)

# [ℂomplex.js](http://iamsquare.it/complex.js)

[![NPM](https://img.shields.io/npm/v/@iamsquare/complex.js.svg?style=flat-square)](https://www.npmjs.com/package/@iamsquare/complex.js) [![Travis (.com) branch](https://img.shields.io/travis/iamsquare/complex.js/master.svg?style=flat-square)](https://travis-ci.org/iamsquare/complex.js/branches) [![GitHub issues](https://img.shields.io/github/issues-raw/iamsquare/complex.js.svg?style=flat-square)](https://github.com/iamsquare/complex.js/issues) [![GitHub License](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://opensource.org/licenses/MIT) [![NPM](https://nodei.co/npm/@iamsquare/complex.js.png?mini=true)](https://nodei.co/npm/@iamsquare/complex.js)

> A simple complex-numbers library for Javascript and Node.js.

This library was created as solution for [this](http://www.rosettacode.org/wiki/Arithmetic/Complex) Rosetta Code task. It has been moved to its own repo as a way to learn TDD with Travis-CI.

# Getting started

Complex.js can be used in both the browser and Node.js:

Install complex.js using [npm](https://www.npmjs.com/package/@iamsquare/complex.js):

```shell
npm i @iamsquare/complex.js
```

> Since this library is compiled from Typescript, type definition files are provided by default. No additional installations required!

## Building

Just clone this repo and build the library like so:

```shell
git clone --depth=0 https://github.com/iamsquare/complex.js
cd complex.js/
npm i
npm run build
```

# Usage

Just import the library in your Javascript (ES5/ES6) or Typescript project:

**ES6/Typescript**

```js
import Complex from '@iamsquare/complex';
```

**ES5**

```js
var Complex = require('@iamsquare/complex');
```

The library documentation can be found [here](https://www.iamsquare.it/complex.js/).

## Examples

### Declaration

```typescript
const z: Complex = new Complex(1, -1); // Numeric arguments
const w: Complex = new Complex({ x: 1, y: -3 }); // Cartesian argument
const k: Complex = new Complex({ r: 1, p: Math.PI / 2 }); // Polar argument
const zz: Complex = new Complex(z); // Complex argument
```

### Addition

```typescript
const a: Complex = z.plus(w);
console.log(a); // => Complex {re: 2, im: -4}
```

### Subtraction

```typescript
const s: Complex = z.minus(w);
console.log(s); // => Complex {re: 0, im: 2}
```

### Multiplication

```typescript
const m: Complex = z.times(w);
console.log(m); // => Complex {re: -2, im: -4}
```

### Division

```typescript
const d: Complex = z.divide(w);
console.log(d); // => Complex {re: 0.39999999999999997, im: 0.2}
```

These are just the four basic operators. Check the [documentation](https://www.iamsquare.it/complex.js/) to know more.

# Built With

- [Typescript](https://www.typescriptlang.org/) ([github](https://github.com/Microsoft/TypeScript)) - Main language.
- [Jest](https://jestjs.io/) ([github](https://github.com/facebook/jest)) - Testing framework.
- [Travis-CI](https://travis-ci.com) - Continuous Integration Service

# Licensing

The code in this project is licensed under MIT License.
