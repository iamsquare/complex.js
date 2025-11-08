---
sidebar_position: 1
---

# Solving Quadratic Equations

Complex numbers are essential for solving quadratic equations with negative discriminants.

## Example: Solving z² + 2z + 2 = 0

Using the quadratic formula: z = (-b ± √(b² - 4ac)) / 2a

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

const z1 = divide(add(negB, sqrtDisc), twoA);
const z2 = divide(subtract(negB, sqrtDisc), twoA);

console.log(z1.toString()); // => "-1 + 1i"
console.log(z2.toString()); // => "-1 - 1i"
```

## Verification

```typescript
import { Complex, add, multiply, pow } from '@iamsquare/complex.js';

const z1 = new Complex(-1, 1);
const z2 = new Complex(-1, -1);

// Verify z1² + 2z1 + 2 = 0
const z1Squared = pow(z1, new Complex(2, 0));
const twoZ1 = multiply(new Complex(2, 0), z1);
const result1 = add(add(z1Squared, twoZ1), new Complex(2, 0));
console.log(result1.toString()); // => "0 + 0i" (approximately)

// Verify z2² + 2z2 + 2 = 0
const z2Squared = pow(z2, new Complex(2, 0));
const twoZ2 = multiply(new Complex(2, 0), z2);
const result2 = add(add(z2Squared, twoZ2), new Complex(2, 0));
console.log(result2.toString()); // => "0 + 0i" (approximately)
```
