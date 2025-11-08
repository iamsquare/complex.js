---
sidebar_position: 1
---

# Solving Quadratic Equations

Complex numbers are essential for solving quadratic equations with negative discriminants.

## Example: Solving x² + 2x + 2 = 0

Using the quadratic formula: x = (-b ± √(b² - 4ac)) / 2a

```typescript
import { Complex, add, pow, subtract, multiply, divide, sqrt } from '@iamsquare/complex.js';

// Coefficients: a = 1, b = 2, c = 2
const a = new Complex(1, 0);
const b = new Complex(2, 0);
const c = new Complex(2, 0);

// Calculate square root of discriminant
const b2 = pow(b, 2);
const fourAC = multiply(4, multiply(a, c));
const sqrtDisc = sqrt(subtract(b2, fourAC));

// Calculate solutions
const negB = multiply(-1, b);
const twoA = multiply(2, a);

const x1 = divide(add(negB, sqrtDisc), twoA);
const x2 = divide(subtract(negB, sqrtDisc), twoA);

console.log(x1.toString()); // => "-1 + 1i"
console.log(x2.toString()); // => "-1 - 1i"
```

## Verification

```typescript
import { Complex, add, multiply, pow } from '@iamsquare/complex.js';

const x1 = new Complex(-1, 1);
const x2 = new Complex(-1, -1);

// Verify x1² + 2x1 + 2 = 0
const x1Squared = pow(x1, 2);
const twoX1 = multiply(2, x1);
const result1 = add(add(x1Squared, twoX1), new Complex(2, 0));
console.log(result1.toString()); // => "0" (approximately)

// Verify x2² + 2x2 + 2 = 0
const x2Squared = pow(x2, 2);
const twoX2 = multiply(new Complex(2, 0), x2);
const result2 = add(add(x2Squared, twoX2), new Complex(2, 0));
```
