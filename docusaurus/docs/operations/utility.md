---
sidebar_position: 2
---

# Utility Operations

Utility operations provide useful transformations and comparisons for complex numbers.

## modulus

Calculates the modulus (absolute value) of a complex number: $|z|$.

The modulus is the distance from the origin to the point representing the complex number.
For $z = a + ib$, the modulus is:

$$|z| = \sqrt{a^2 + b^2}$$

```typescript
modulus(z: Complex): number
```

### Parameters

- `z` - The complex number

### Returns

The modulus (magnitude) of z as a real number.

### Example

```typescript
import { Complex, modulus } from '@iamsquare/complex.js';

const z = new Complex(3, 4);
const result = modulus(z);
console.log(result); // => 5
```

---

## argument

Gets the argument (phase angle) of a complex number: $\arg(z)$.

The argument is the angle in radians between the positive real axis and the line
from the origin to the point representing the complex number. It is computed using
Math.atan2(imaginary, real), which returns a value in the range $[-\pi, \pi]$.

```typescript
argument(z: Complex): number
```

### Parameters

- `z` - The complex number

### Returns

The argument (phase angle) in radians, or NaN/Infinity for special cases.

### Example

```typescript
import { Complex, argument } from '@iamsquare/complex.js';

const z = new Complex(1, 1);
const result = argument(z);
console.log(result); // => ~0.785 (π/4 radians)
```

---

## conjugate

Calculates the complex conjugate of a complex number: $\overline{z}$.

The complex conjugate of $a + ib$ is $a - ib$. It reflects the number across the real axis.

```typescript
conjugate(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new Complex number representing the conjugate of z.

### Example

```typescript
import { Complex, conjugate } from '@iamsquare/complex.js';

const z = new Complex(3, 4);
const result = conjugate(z);
console.log(result.toString()); // => "3 - 4i"
```

---

## unit

Calculates the unit vector (normalized) of a complex number: $\frac{z}{|z|}$.

Returns a complex number with the same direction (argument) as $z$ but with modulus $1$.
This is equivalent to dividing $z$ by its modulus.

```typescript
unit(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new Complex number with modulus 1 and the same argument as z, or Complex.NAN if z is zero or NaN.

### Example

```typescript
import { Complex, unit, modulus, argument } from '@iamsquare/complex.js';

const z = new Complex(3, 4);
const u = unit(z);
console.log(modulus(u)); // => 1 (approximately)
console.log(argument(u)); // => same as argument(z)
```

---

## equals

Checks if two complex numbers are equal: $z = w$.

Uses floating-point comparison with epsilon tolerance (Complex.EPSILON) to account
for floating-point precision errors. Two numbers are considered equal if both their
real and imaginary parts differ by at most Complex.EPSILON.

```typescript
equals(z: Complex, w: Complex): boolean
```

### Parameters

- `z` - The first complex number
- `w` - The second complex number

### Returns

`true` if z and w are equal (within epsilon tolerance), `false` otherwise.

### Example

```typescript
import { Complex, equals } from '@iamsquare/complex.js';

const z1 = new Complex(1, 2);
const z2 = new Complex(1, 2);
console.log(equals(z1, z2)); // => true

const z3 = new Complex(1.0000001, 2);
console.log(equals(z1, z3)); // => true (within epsilon)
```

---

## notEquals

Checks if two complex numbers are not equal: $z \neq w$.

This is the logical negation of the `equals` function.

```typescript
notEquals(z: Complex, w: Complex): boolean
```

### Parameters

- `z` - The first complex number
- `w` - The second complex number

### Returns

`true` if z and w are not equal, `false` if they are equal.

### Example

```typescript
import { Complex, notEquals } from '@iamsquare/complex.js';

const z1 = new Complex(1, 2);
const z2 = new Complex(3, 4);
console.log(notEquals(z1, z2)); // => true

const z3 = new Complex(1, 2);
console.log(notEquals(z1, z3)); // => false
```
