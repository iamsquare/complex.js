---
sidebar_position: 3
---

# Working with Polar Coordinates

Complex numbers can be represented in both Cartesian ($x + yi$) and polar ($r \cdot e^{i\theta}$) forms.

## Creating Complex Numbers from Polar Coordinates

```typescript
import { Complex, modulus, argument } from '@iamsquare/complex.js';

// Create from polar coordinates: r = 5, θ = π/4
const z = new Complex({ r: 5, p: Math.PI / 4 });
console.log(z.toString()); // => "3.5355339059327373 + 3.5355339059327373i"

// Verify the conversion
const r = modulus(z);
const theta = argument(z);
console.log(`r = ${r}, θ = ${theta}`); // r = 5, θ ≈ π/4
```

## Converting Between Forms

```typescript
import { Complex } from '@iamsquare/complex.js';

const z = new Complex(3, 4);

// Convert to polar
const polar = z.toPolar();
console.log(polar); // => { r: 5, p: 0.9272952180016122 }

// Create new complex from polar
const z2 = new Complex(polar);
console.log(z2.toString()); // => "3 + 4i" (approximately)
```

## Operations in Polar Form

```typescript
import { Complex, multiply, divide, pow, modulus, argument } from '@iamsquare/complex.js';

// Multiplication in polar form: multiply magnitudes, add angles
const z1 = new Complex({ r: 2, p: Math.PI / 4 });
const z2 = new Complex({ r: 3, p: Math.PI / 6 });
const product = multiply(z1, z2);

console.log(`Product magnitude: ${modulus(product)}`); // => 6 (2 × 3)
console.log(`Product angle: ${argument(product)}`); // ≈ 5π/12 (π/4 + π/6)

// Division in polar form: divide magnitudes, subtract angles
const quotient = divide(z1, z2);
console.log(`Quotient magnitude: ${modulus(quotient)}`); // ≈ 0.667 (2 / 3)
console.log(`Quotient angle: ${argument(quotient)}`); // ≈ π/12 (π/4 - π/6)

// Power in polar form: raise magnitude to power, multiply angle
const power = pow(z1, new Complex(2, 0));
console.log(`Power magnitude: ${modulus(power)}`); // => 4 (2²)
console.log(`Power angle: ${argument(power)}`); // ≈ π/2 (2 × π/4)
```
