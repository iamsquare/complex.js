---
sidebar_position: 1
---

# Exponential and Logarithmic Functions

Functions for exponential, logarithmic, power, and root operations on complex numbers.

## exp

Calculates the exponential function e^z.

```typescript
exp(z: Complex): Complex
```

### Parameters

- `z` - The complex number exponent

### Returns

A new `Complex` number representing e^z.

### Example

```typescript
import { Complex, exp } from '@iamsquare/complex.js';

const z = new Complex(1, Math.PI);
const result = exp(z);
console.log(result.toString()); // => "-2.718281828459045 + 0i" (approximately -e)
```

### Euler's Formula

```typescript
import { Complex, exp, multiply } from '@iamsquare/complex.js';

// e^(iπ) = -1
const i = Complex.I;
const pi = Complex.PI;
const result = exp(multiply(i, pi));
console.log(result.toString()); // => "-1 + 0i"
```

---

## log

Calculates the natural logarithm (base e) of a complex number.

```typescript
log(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new `Complex` number representing the natural logarithm of z.

### Example

```typescript
import { Complex, log } from '@iamsquare/complex.js';

const z = new Complex(1, 0);
const result = log(z);
console.log(result.toString()); // => "0 + 0i"
```

---

## pow

Calculates z raised to the power of w.

```typescript
pow(z: Complex, w: Complex): Complex
```

### Parameters

- `z` - The base complex number
- `w` - The exponent complex number

### Returns

A new `Complex` number representing z^w.

### Example

```typescript
import { Complex, pow } from '@iamsquare/complex.js';

const z = new Complex(2, 0);
const w = new Complex(3, 0);
const result = pow(z, w);
console.log(result.toString()); // => "8 + 0i"
```

---

## sqrt

Calculates the square root of a complex number.

```typescript
sqrt(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new `Complex` number representing the square root of z.

### Example

```typescript
import { Complex, sqrt } from '@iamsquare/complex.js';

const z = new Complex(-1, 0);
const result = sqrt(z);
console.log(result.toString()); // => "0 + 1i" (or "0 - 1i")
```

---

## inverse

Calculates the multiplicative inverse (reciprocal) of a complex number.

```typescript
inverse(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new `Complex` number representing 1/z.

### Example

```typescript
import { Complex, inverse } from '@iamsquare/complex.js';

const z = new Complex(2, 3);
const result = inverse(z);
console.log(result.toString()); // => "0.15384615384615385 - 0.23076923076923078i"
```
