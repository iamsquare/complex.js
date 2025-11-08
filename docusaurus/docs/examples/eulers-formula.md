---
sidebar_position: 2
---

# Euler's Formula

Euler's formula is one of the most beautiful equations in mathematics:

$$e^{i\theta} = \cos(\theta) + i\sin(\theta)$$

## Basic Example: $e^{i\pi} = -1$

```typescript
import { Complex, exp, multiply } from '@iamsquare/complex.js';

const result = exp(new Complex(0, Math.PI));

console.log(result.toString()); // => "-1 + 0i" (approximately)
```

## General Form: $e^{i\theta}$

```typescript
import { Complex, exp, multiply, cos, sin } from '@iamsquare/complex.js';

function eulersFormula(theta: number) {
  return exp(new Complex(0, theta));
}

function trigonometryFormula(theta: number) {
  const thetaComplex = new Complex(theta);
  const cosTheta = cos(thetaComplex);
  const sinTheta = sin(thetaComplex);

  return new Complex(
    cosTheta.getRe() + multiply(Complex.I, sinTheta).getRe(),
    cosTheta.getIm() + multiply(Complex.I, sinTheta).getIm(),
  );
}

// Example: e^(iπ/2) = i
const euler = eulersFormula(Math.PI / 2);
const trigonometric = trigonometryFormula(Math.PI / 2);

console.log(euler.toString()); // => "0 + 1i" (approximately)
console.log(trigonometric.toString()); // => "0 + 1i" (approximately)
```

## Complex Exponentials

```typescript
import { Complex, exp } from '@iamsquare/complex.js';

// e^(1 + iπ)
const z = new Complex(1, Math.PI);
const result = exp(z);

console.log(result.toString()); // => "-2.718281828459045 + 0i" (approximately -e)
```
