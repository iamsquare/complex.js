![Logo](https://raw.githubusercontent.com/iamsquare/complex.js/master/logo.png)

# [ℂomplex.js](https://complex-js.iamsquare.it)

[![NPM](https://img.shields.io/npm/v/@iamsquare/complex.js.svg?style=flat-square)](https://www.npmjs.com/package/@iamsquare/complex.js)
[![GitHub issues](https://img.shields.io/github/issues-raw/iamsquare/complex.js.svg?style=flat-square)](https://github.com/iamsquare/complex.js/issues)
[![GitHub License](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/iamsquare/complex.js/blob/master/LICENSE)
[![Coverage](https://img.shields.io/github/actions/workflow/status/iamsquare/complex.js/coverage.yml?label=coverage&style=flat-square)](https://github.com/iamsquare/complex.js/actions/workflows/coverage.yml)
[![NPM](https://nodei.co/npm/@iamsquare/complex.js.png?mini=true)](https://nodei.co/npm/@iamsquare/complex.js)

> A powerful, type-safe complex numbers library for JavaScript and TypeScript. Works seamlessly in browsers and Node.js.

**Complex.js** provides a comprehensive set of operations and functions for complex number arithmetic, trigonometry, hyperbolic functions, and more. Built with TypeScript, it includes full type definitions out of the box.

## Features

- **Complete Complex Number Operations** - Addition, subtraction, multiplication, division, and more
- **Trigonometric Functions** - sin, cos, tan, sec, csc, cot and their inverses
- **Hyperbolic Functions** - sinh, cosh, tanh, sech, csch, coth and their inverses
- **Mathematical Functions** - Exponentiation, logarithms, powers, square roots
- **Numerically Stable** - Uses robust floating-point comparisons (combining absolute and relative error) and stable algorithms to handle precision errors
- **TypeScript Support** - Full type definitions included, no `@types` package needed
- **Universal** - Works in both browsers and Node.js
- **Zero Dependencies** - Lightweight and fast
- **Multiple Representations** - Create from Cartesian, polar, or numeric coordinates

## Installation

Install Complex.js using [npm](https://www.npmjs.com/package/@iamsquare/complex.js) or [pnpm](https://pnpm.io/):

```bash
npm i @iamsquare/complex.js
# or
pnpm i @iamsquare/complex.js
```

## Quick Start

```typescript
import { Complex, add, multiply, sin, exp } from '@iamsquare/complex.js';

// Create complex numbers
const z = new Complex(1, -1);
const w = new Complex({ x: 1, y: -3 });
const k = new Complex({ r: 1, p: Math.PI / 2 });

// Perform operations
const sum = add(z, w);
const product = multiply(z, w);
const sine = sin(z);
const exponential = exp(z);

console.log(sum.toString()); // => "2 - 4i"
```

## Usage

### Creating Complex Numbers

Complex numbers can be created in several ways:

```typescript
// Numeric arguments (real, imaginary)
const z = new Complex(1, -1);

// Cartesian coordinates
const w = new Complex({ x: 1, y: -3 });

// Polar coordinates (radius, phase in radians)
const k = new Complex({ r: 1, p: Math.PI / 2 });

// From another Complex number
const zz = new Complex(z);
```

### Accessing Parts

```typescript
const z = new Complex(3, 4);

// Get real and imaginary parts
const realPart = z.getRe(); // 3
const imagPart = z.getIm(); // 4

// Convert to different representations
const cartesian = z.toCartesian(); // { x: 3, y: 4 }
const polar = z.toPolar(); // { r: 5, p: 0.9272952180016122 }
```

### Basic Arithmetic Operations

```typescript
import { Complex, add, subtract, multiply, divide, negate } from '@iamsquare/complex.js';

const z = new Complex(1, -1);
const w = new Complex(1, -3);

// Addition
const sum = add(z, w);
console.log(sum.toString()); // => "2 - 4i"

// Subtraction
const diff = subtract(z, w);
console.log(diff.toString()); // => "0 + 2i"

// Multiplication
const product = multiply(z, w);
console.log(product.toString()); // => "-2 - 4i"

// Division
const quotient = divide(z, w);
console.log(quotient.toString()); // => "0.4 + 0.2i"

// Negation
const negated = negate(z);
console.log(negated.toString()); // => "-1 + 1i"
```

### Mathematical Functions

```typescript
import { Complex, exp, log, pow, sqrt, sin, cos, tan, sinh, cosh, tanh, asin, asinh } from '@iamsquare/complex.js';

const z = new Complex(1, 1);

// Exponential and logarithmic functions
const e = exp(z);
const ln = log(z);
const power = pow(z, new Complex(2, 0));
const root = sqrt(z);

// Trigonometric functions
const sine = sin(z);
const cosine = cos(z);
const tangent = tan(z);

// Hyperbolic functions
const hypSine = sinh(z);
const hypCosine = cosh(z);
const hypTangent = tanh(z);

// Inverse functions
const arcSine = asin(z);
const arcHyperSine = asinh(z);
```

### Utility Operations

```typescript
import { Complex, modulus, argument, conjugate, unit, equals, isReal, isZero } from '@iamsquare/complex.js';

const z = new Complex(3, 4);

// Modulus (absolute value)
const mod = modulus(z); // 5

// Argument (phase)
const arg = argument(z); // 0.9272952180016122

// Complex conjugate
const conj = conjugate(z); // 3 - 4i

// Unit vector
const unitVec = unit(z); // 0.6 + 0.8i

// Equality checks
const isEqual = equals(z, new Complex(3, 4)); // true
const isRealNum = isReal(z); // false
const isZeroNum = isZero(z); // false
```

### Predefined Constants

```typescript
Complex.ZERO; // 0
Complex.ONE; // 1
Complex.I; // i (imaginary unit)
Complex.PI; // π
Complex.HALFPI; // π/2
Complex.E; // e (Euler's number)
Complex.INFINITY; // ∞
Complex.NAN; // NaN
Complex.EPSILON; // Machine epsilon
```

## 📖 Documentation

Comprehensive documentation is available at **[https://complex-js.iamsquare.it](https://complex-js.iamsquare.it)**.

The documentation includes:

- Complete API reference
- Detailed examples
- Mathematical background
- Usage guides

### Local Documentation Development

The documentation website is built using [Docusaurus](https://docusaurus.io/). To work with the documentation locally:

```bash
cd docusaurus
pnpm install
pnpm start
```

This starts a local development server. Most changes are reflected live without restarting the server.

To build the documentation:

```bash
cd docusaurus
pnpm build
```

## Development

### Building from Source

Clone the repository and build the library:

```bash
git clone https://github.com/iamsquare/complex.js.git
cd complex.js
pnpm install
pnpm run prod
```

`pnpm run prod` runs tests with coverage and builds the library only if all tests pass. To build without testing:

```bash
pnpm run build
```

> **Note**: This project uses [pnpm](https://pnpm.io/) as its package manager. The `preinstall` script will enforce this.

### Available Scripts

- `pnpm test` - Run tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Run tests with coverage
- `pnpm build` - Build the library
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues
- `pnpm prod` - Clean, test with coverage, build, and generate docs

## Roadmap

- [ ] Support for nth-roots (n√z)
- [ ] Additional utility functions
- [ ] Performance optimizations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the [MIT License](LICENSE).

## Built With

- [TypeScript](https://www.typescriptlang.org/) - Main language
- [Vitest](https://vitest.dev/) - Testing framework
- [Rollup](https://rollupjs.org/) - Module bundler
- [Docusaurus](https://docusaurus.io/) - Documentation website framework
- [pnpm](https://pnpm.io/) - Fast, disk space efficient package manager

---

Made with ❤️ by [iamsquare](https://iamsquare.it)
