---
sidebar_position: 2
---

# Utility Operations

Utility operations provide useful transformations and comparisons for complex numbers.

## modulus

Calculates the modulus (absolute value or magnitude) of a complex number.

```typescript
modulus(z: Complex): number
```

### Parameters

- `z` - The complex number

### Returns

A `number` representing the modulus (distance from origin in the complex plane).

### Example

```typescript
import { Complex, modulus } from '@iamsquare/complex.js';

const z = new Complex(3, 4);
const result = modulus(z);
console.log(result); // => 5
```

---

## argument

Calculates the argument (phase or angle) of a complex number.

```typescript
argument(z: Complex): number
```

### Parameters

- `z` - The complex number

### Returns

A `number` representing the argument in radians (angle from positive real axis).

### Example

```typescript
import { Complex, argument } from '@iamsquare/complex.js';

const z = new Complex(1, 1);
const result = argument(z);
console.log(result); // => 0.7853981633974483 (π/4)
```

---

## conjugate

Calculates the complex conjugate of a complex number.

```typescript
conjugate(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new `Complex` number representing the conjugate (real part unchanged, imaginary part negated).

### Example

```typescript
import { Complex, conjugate } from '@iamsquare/complex.js';

const z = new Complex(3, 4);
const result = conjugate(z);
console.log(result.toString()); // => "3 - 4i"
```

---

## unit

Calculates the unit vector (normalized) of a complex number.

```typescript
unit(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new `Complex` number with the same direction but magnitude of 1.

### Example

```typescript
import { Complex, unit } from '@iamsquare/complex.js';

const z = new Complex(3, 4);
const result = unit(z);
console.log(result.toString()); // => "0.6 + 0.8i"
console.log(modulus(result)); // => 1
```

---

## equals

Checks if two complex numbers are equal.

```typescript
equals(z: Complex, w: Complex): boolean
```

### Parameters

- `z` - First complex number
- `w` - Second complex number

### Returns

`true` if the numbers are equal, `false` otherwise.

### Example

```typescript
import { Complex, equals } from '@iamsquare/complex.js';

const z = new Complex(3, 4);
const w = new Complex(3, 4);
const result = equals(z, w);
console.log(result); // => true
```

---

## notEquals

Checks if two complex numbers are not equal.

```typescript
notEquals(z: Complex, w: Complex): boolean
```

### Parameters

- `z` - First complex number
- `w` - Second complex number

### Returns

`true` if the numbers are not equal, `false` otherwise.

### Example

```typescript
import { Complex, notEquals } from '@iamsquare/complex.js';

const z = new Complex(3, 4);
const w = new Complex(1, 2);
const result = notEquals(z, w);
console.log(result); // => true
```
