![Logo](https://raw.githubusercontent.com/iamsquare/complex.js/master/logo.png)

# [ℂomplex.js](http://iamsquare.it/complex.js)

[![NPM](https://img.shields.io/npm/v/@iamsquare/complex.js.svg?style=flat-square)](https://www.npmjs.com/package/@iamsquare/complex.js) [![Travis (.com) branch](https://img.shields.io/travis/iamsquare/complex.js/master.svg?style=flat-square)](https://travis-ci.org/iamsquare/complex.js/branches) [![GitHub issues](https://img.shields.io/github/issues-raw/iamsquare/complex.js.svg?style=flat-square)](https://github.com/iamsquare/complex.js/issues) [![GitHub License](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/iamsquare/complex.js/blob/master/LICENSE) [![NPM](https://nodei.co/npm/@iamsquare/complex.js.png?mini=true)](https://nodei.co/npm/@iamsquare/complex.js)

> A simple complex-numbers library for browsers and Node.js.

This library was created as solution for [this](http://www.rosettacode.org/wiki/Arithmetic/Complex) RosettaCode task. It has been moved to its own repo as a way to learn TDD with Travis-CI.

# Getting started

Complex.js can be used in both the browser and Node.js:

Install complex.js using [npm](https://www.npmjs.com/package/@iamsquare/complex.js):

```shell
npm i @iamsquare/complex.js
```

> Since this library is compiled from Typescript, type definition files are provided by default. No additional @types installation required!

## Building

Just clone this repo and build the library:

```shell
git clone --depth=0 https://github.com/iamsquare/complex.js
cd complex.js/
npm i
npm run prod
```
```npm run prod``` will run Jest and build the library only if it passes all tests. To build without testing:

```shell
npm run build
```
The library is compiled to UMD against this [browserslist](https://github.com/browserslist/browserslist):
```
> 1%
not dead
maintained node versions
```
> Polyfills are not included (read [Usage](#usage) to learn more).

# Usage

Just import the Complex class and the operations/functions you want to use in your Javascript (ES5/ES6/ES7) or Typescript project:

**ES6/ES7/Typescript**

```js
import { Complex } from '@iamsquare/complex.js';
import { add } from '@iamsquare/complex.js/operations';
import { log, pow } from '@iamsquare/complex.js/functions';
import { asinh } from '@iamsquare/complex.js/functions/inverseHyperbolic';
...
```

**ES5**

```js
var ComplexJS = require('@iamsquare/complex.js/lib/umd');
var Complex = ComplexJS.Complex; // This line assigns the Complex constructor to the Complex variable.
var add = ComplexJS.default.add; // This line assigns the add operation to the add variable.
...
```

**Note**: for ES5 you will probably need to polyfill the following methods and properties:

- _core-js/modules/es6.math.sinh_
- _core-js/modules/es6.math.cosh_
- _core-js/modules/es6.math.tanh_
- _core-js/modules/es6.math.hypot_
- _core-js/modules/es6.math.sign_
- _core-js/modules/es6.number.epsilon_
- _core-js/modules/es6.number.is-nan_
- _core-js/modules/es6.number.is-finite_
- _core-js/modules/es6.number.is-integer_

To keep the build as little as possible - and to let old tech die - these polyfills are NOT included in the bundle. You almost surely use Babel in your workflow anyway, so it's useless to polyfill the library beforehand (you can find a guide on how to include built-ins [here](https://babeljs.io/docs/en/babel-preset-env.html#include)).

## Documentation

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
const a: Complex = add(z, w);
console.log(a); // => Complex {re: 2, im: -4}
```

### Subtraction

```typescript
const s: Complex = subtract(z, w);
console.log(s); // => Complex {re: 0, im: 2}
```

### Multiplication

```typescript
const m: Complex = multiply(z, w);
console.log(m); // => Complex {re: -2, im: -4}
```

### Division

```typescript
const d: Complex = divide(z, w);
console.log(d); // => Complex {re: 0.39999999999999997, im: 0.2}
```

These are just the four basic operations. Check the [documentation](https://www.iamsquare.it/complex.js/) to know more.

# TODO

- [x] ~~Support for trig functions.~~
- [x] ~~Support for hyperbolic functions.~~
- [x] ~~Support for powers.~~
- [ ] Support for nth-roots (n√z).
- [ ] Refactor tests.
- [x] ~~Refactor the Complex class.~~

# Built With

- [Typescript](https://www.typescriptlang.org/) ([github](https://github.com/Microsoft/TypeScript)) - Main language.
- [Jest](https://jestjs.io/) ([github](https://github.com/facebook/jest)) - Testing framework.
- [TypeDoc](https://typedoc.org/) ([github](https://github.com/TypeStrong/typedoc)) - Documentation generator for Typescript projects.
- [Travis-CI](https://travis-ci.com) - Continuous Integration Service

# Licensing

The code in this project is licensed under MIT License.
