---
sidebar_position: 1
---

# Introduction

**Complex.js** is a powerful, type-safe complex numbers library for JavaScript and TypeScript. It provides a comprehensive set of operations and functions for complex number arithmetic, trigonometry, hyperbolic functions, and more. Built with TypeScript, it includes full type definitions out of the box.

## Features

- **Complete Complex Number Operations** - Addition, subtraction, multiplication, division, and more
- **Trigonometric Functions** - sin, cos, tan, sec, csc, cot and their inverses
- **Hyperbolic Functions** - sinh, cosh, tanh, sech, csch, coth and their inverses
- **Mathematical Functions** - Exponentiation, logarithms, powers, square roots, principal values (n-th roots)
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
import { Complex, add, sum, multiply, sin, exp } from '@iamsquare/complex.js';

// Create complex numbers
const z = new Complex(1, -1);
const w = new Complex({ x: 1, y: -3 });
const k = new Complex({ r: 1, p: Math.PI / 2 });

// Perform operations
const addition = add(z, w);
const total = sum(z, w, k);
const product = multiply(z, w);
const sine = sin(z);
const exponential = exp(z);

console.log(addition.toString()); // => "2 - 4i"
```

## Creating Complex Numbers

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

## Basic Arithmetic Operations

```typescript
import { Complex, add, sum, subtract, multiply, divide, negate } from '@iamsquare/complex.js';

const z = new Complex(1, -1);
const w = new Complex(1, -3);

// Addition
const addition = add(z, w);
console.log(addition.toString()); // => "2 - 4i"

// Sum multiple numbers
const z1 = new Complex(1, 2);
const z2 = new Complex(3, 4);
const z3 = new Complex(5, 6);
const total = sum(z1, z2, z3);
console.log(total.toString()); // => "9 + 12i"

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

## Accessing Parts

```typescript
const z = new Complex(3, 4);

// Get real and imaginary parts
const realPart = z.getRe(); // 3
const imagPart = z.getIm(); // 4

// Convert to different representations
const cartesian = z.toCartesian(); // { x: 3, y: 4 }
const polar = z.toPolar(); // { r: 5, p: 0.9272952180016122 }
```

## Mathematical Functions

```typescript
import {
  Complex,
  exp,
  log,
  pow,
  sqrt,
  principal,
  sin,
  cos,
  tan,
  sinh,
  cosh,
  tanh,
  asin,
  asinh,
} from '@iamsquare/complex.js';

const z = new Complex(1, 1);

// Exponential and logarithmic functions
const e = exp(z);
const ln = log(z);
const power = pow(z, new Complex(2, 0));
const root = sqrt(z);
const cubeRoot = principal(z, 3);

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

## Utility Operations

```typescript
import {
  Complex,
  modulus,
  argument,
  conjugate,
  unit,
  equals,
  isApproximatelyEqual,
  isReal,
  isZero,
} from '@iamsquare/complex.js';

const z = new Complex(3, 4);

// Modulus (absolute value)
const mod = modulus(z); // 5

// Argument (phase)
const arg = argument(z); // 0.9272952180016122

// Complex conjugate
const conj = conjugate(z); // 3 - 4i

// Unit vector
const unitVec = unit(z); // 0.6 + 0.8i

// Equality checks (uses epsilon-based comparison for floating-point precision)
const isEqual = equals(z, new Complex(3, 4)); // true
const isRealNum = isReal(z); // false
const isZeroNum = isZero(z); // false

// Compare floating-point numbers
const approxEqual = isApproximatelyEqual(0.1 + 0.2, 0.3); // true
```

## Predefined Constants

```typescript
Complex.ZERO; // 0
Complex.ONE; // 1
Complex.I; // i (imaginary unit)
Complex.PI; // π
Complex.HALFPI; // π/2
Complex.E; // e (Euler's number)
Complex.INFINITY; // ∞
Complex.NAN; // NaN
```

## Available Operations

### Arithmetic Operations

- [`add(z, w)`](/operations/arithmetic#add) - Addition
- [`sum(...numbers)`](/operations/arithmetic#sum) - Sum multiple numbers
- [`subtract(z, w)`](/operations/arithmetic#subtract) - Subtraction
- [`multiply(z, w)`](/operations/arithmetic#multiply) - Multiplication
- [`divide(z, w)`](/operations/arithmetic#divide) - Division
- [`negate(z)`](/operations/arithmetic#negate) - Negation

### Utility Operations

- [`modulus(z)`](/operations/utility#modulus) - Absolute value / magnitude
- [`argument(z)`](/operations/utility#argument) - Phase / argument
- [`conjugate(z)`](/operations/utility#conjugate) - Complex conjugate
- [`flip(z)`](/operations/utility#flip) - Swap real and imaginary parts
- [`unit(z)`](/operations/utility#unit) - Unit vector
- [`equals(z, w)`](/operations/utility#equals) - Equality check
- [`notEquals(z, w)`](/operations/utility#notequals) - Inequality check
- [`isApproximatelyEqual(a, b, epsilon?)`](/operations/utility#isapproximatelyequal) - Compare floating-point numbers

### Type Checking

- [`isReal(z)`](/operations/type-checking#isreal) - Check if real number
- [`isPureImaginary(z)`](/operations/type-checking#ispureimaginary) - Check if purely imaginary
- [`isZero(z)`](/operations/type-checking#iszero) - Check if zero
- [`isInfinite(z)`](/operations/type-checking#isinfinite) - Check if infinite
- [`isNaNC(z)`](/operations/type-checking#isnanc) - Check if NaN

## Available Functions

### Exponential and Logarithmic

- [`exp(z)`](/functions/exponential-logarithmic#exp) - Exponential function
- [`log(z)`](/functions/exponential-logarithmic#log) - Natural logarithm
- [`pow(z, w)`](/functions/exponential-logarithmic#pow) - Power function
- [`sqrt(z)`](/functions/exponential-logarithmic#sqrt) - Square root
- [`principal(z, n)`](/functions/exponential-logarithmic#principal) - Principal value (n-th root)
- [`inverse(z)`](/functions/exponential-logarithmic#inverse) - Multiplicative inverse

### Trigonometric

- [`sin(z)`](/functions/trigonometric#sin), [`cos(z)`](/functions/trigonometric#cos), [`tan(z)`](/functions/trigonometric#tan)
- [`sec(z)`](/functions/trigonometric#sec), [`csc(z)`](/functions/trigonometric#csc), [`cot(z)`](/functions/trigonometric#cot)
- [`asin(z)`](/functions/inverse-trigonometric#asin), [`acos(z)`](/functions/inverse-trigonometric#acos), [`atan(z)`](/functions/inverse-trigonometric#atan)
- [`asec(z)`](/functions/inverse-trigonometric#asec), [`acsc(z)`](/functions/inverse-trigonometric#acsc), [`acot(z)`](/functions/inverse-trigonometric#acot)

### Hyperbolic

- [`sinh(z)`](/functions/hyperbolic#sinh), [`cosh(z)`](/functions/hyperbolic#cosh), [`tanh(z)`](/functions/hyperbolic#tanh)
- [`sech(z)`](/functions/hyperbolic#sech), [`csch(z)`](/functions/hyperbolic#csch), [`coth(z)`](/functions/hyperbolic#coth)
- [`asinh(z)`](/functions/inverse-hyperbolic#asinh), [`acosh(z)`](/functions/inverse-hyperbolic#acosh), [`atanh(z)`](/functions/inverse-hyperbolic#atanh)
- [`asech(z)`](/functions/inverse-hyperbolic#asech), [`acsch(z)`](/functions/inverse-hyperbolic#acsch), [`acoth(z)`](/functions/inverse-hyperbolic#acoth)

## Next Steps

- Explore the [Operations](/operations/arithmetic) for detailed documentation
- Check out more [examples](/examples/quadratic-equation) in the documentation
- Visit the [GitHub repository](https://github.com/iamsquare/complex.js) for source code and issues
