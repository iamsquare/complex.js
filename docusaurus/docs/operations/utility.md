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

## pythagoras

Calculates the modulus squared (magnitude squared) of a complex number: $|z|^2$.

This is equivalent to $a^2 + b^2$ for $z = a + ib$. It avoids the square root operation
and is useful when comparing magnitudes or when only the squared value is needed.

```typescript
pythagoras(z: Complex): number
```

### Parameters

- `z` - The complex number

### Returns

The modulus squared as a real number.

### Example

```typescript
import { Complex, pythagoras, modulus } from '@iamsquare/complex.js';

const z = new Complex(3, 4);
const modSquared = pythagoras(z);
console.log(modSquared); // => 25

// pythagoras(z) is equivalent to modulus(z)²
const mod = modulus(z);
console.log(mod * mod); // => 25 (same as pythagoras(z))
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

## flip

Flips a complex number by swapping its real and imaginary parts.

For a complex number $z = a + ib$, flip($z$) = $b + ia$. This operation swaps
the real and imaginary parts of the number.

**Algebraic Description:** This operation is equivalent to multiplying the complex conjugate of $z$ by the imaginary unit $i$, i.e., $i \cdot \overline{z}$, where $\overline{z}$ is the complex conjugate $a - ib$. Performing this multiplication gives:

$$i(a - ib) = ia - i^2b = ia - (-1)b = b + ia$$

Thus, flip($z$) = $i \cdot \overline{z}$.

```typescript
flip(z: Complex): Complex
```

### Parameters

- `z` - The complex number to flip

### Returns

A new Complex number with swapped real and imaginary parts.

### Example

```typescript
import { Complex, flip } from '@iamsquare/complex.js';

const z = new Complex(3, 4);
const result = flip(z);
console.log(result.toString()); // => "4 + 3i"
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

Uses a robust floating-point comparison that combines absolute and relative error
to account for floating-point precision errors. For values near zero, uses absolute error:
$|a - b| < \epsilon$. For values away from zero, uses relative error:
$|a - b| < \epsilon \cdot \max(|a|, |b|)$. Two numbers are considered equal if both their
real and imaginary parts are approximately equal using this method.

**Special cases:**

- Two infinite numbers are considered equal.
- NaN is never equal to anything, including itself.

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

const z4 = Complex.INFINITY;
const z5 = Complex.INFINITY;
console.log(equals(z4, z5)); // => true
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

---

## Type Definitions and Type Guards

Helper functions and types for working with coordinate representations.

### Cartesian

Type definition for Cartesian coordinates.

Represents a complex number in Cartesian form with `x` (real part) and `y` (imaginary part).

```typescript
type Cartesian = {
  x: number;
  y: number;
};
```

### Polar

Type definition for Polar coordinates.

Represents a complex number in polar form with `r` (modulus/radius) and `p` (phase/argument in radians).

```typescript
type Polar = {
  r: number;
  p: number;
};
```

### isCartesian

Checks if an object is a Cartesian coordinate.

```typescript
isCartesian(obj?: unknown): obj is Cartesian
```

#### Parameters

- `obj` - The object to check

#### Returns

`true` if obj is a Cartesian coordinate (has `x` and `y` number properties), `false` otherwise.

#### Example

```typescript
import { isCartesian, Complex } from '@iamsquare/complex.js';

const coord = { x: 1, y: 2 };
console.log(isCartesian(coord)); // => true

const notCoord = { a: 1, b: 2 };
console.log(isCartesian(notCoord)); // => false

// Works with Complex.toCartesian()
const z = new Complex(3, 4);
const cartesian = z.toCartesian();
console.log(isCartesian(cartesian)); // => true
```

---

### isPolar

Checks if an object is a Polar coordinate.

```typescript
isPolar(obj?: unknown): obj is Polar
```

#### Parameters

- `obj` - The object to check

#### Returns

`true` if obj is a Polar coordinate (has `r` and `p` number properties), `false` otherwise.

#### Example

```typescript
import { isPolar, Complex } from '@iamsquare/complex.js';

const coord = { r: 1, p: Math.PI / 2 };
console.log(isPolar(coord)); // => true

const notCoord = { radius: 1, phase: Math.PI / 2 };
console.log(isPolar(notCoord)); // => false

// Works with Complex.toPolar()
const z = new Complex(3, 4);
const polar = z.toPolar();
console.log(isPolar(polar)); // => true
```
