---
sidebar_position: 1
---

# Exponential and Logarithmic Functions

Functions for exponential, logarithmic, power, and root operations on complex numbers.

## exp

Calculates the exponential of a complex number: $e^z$.

For $z = a + ib$, this is computed as $e^a \cdot (\cos(b) + i\sin(b))$ using Euler's formula.
The result is in polar form: $e^a$ with phase $b$.

```typescript
exp(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new Complex number representing $e^z$.

### Example

```typescript
import { Complex, exp } from '@iamsquare/complex.js';

const z = new Complex(1, Math.PI);
const result = exp(z);
console.log(result.toString()); // => approximately "-2.718 + 0i" (e^1 * e^(iπ) = -e)
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

Calculates the natural logarithm (principal value) of a complex number: $\ln(z)$.

Returns the [principal value](https://en.wikipedia.org/wiki/Principal_value) of the complex logarithm.
For $z = r \cdot e^{i\theta}$:

$$\ln(z) = \ln(r) + i\theta$$

where $r$ is the modulus and $\theta$ is the argument.

```typescript
log(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new Complex number representing the principal value of $\ln(z)$.

### Example

```typescript
import { Complex, log } from '@iamsquare/complex.js';

const z = new Complex(Math.E, 0);
const result = log(z);
console.log(result.toString()); // => approximately "1 + 0i"

const z2 = new Complex(0, 1);
const result2 = log(z2);
console.log(result2.toString()); // => approximately "0 + 1.571i" (iπ/2)
```

---

## pow

Calculates the power of a complex number: $z^w$.

Computes $z$ raised to the power of $w$. Also accepts real numbers, which are treated
as complex numbers with zero imaginary part. The result is computed using the formula:

$$z^w = e^{w \cdot \ln(z)}$$

```typescript
pow(z: Complex | number, w: Complex | number): Complex
```

### Parameters

- `z` - The base complex number or real number
- `w` - The exponent complex number or real number

### Returns

A new Complex number representing $z^w$.

### Example

```typescript
import { Complex, pow } from '@iamsquare/complex.js';

const z = new Complex(1, 1);
const w = new Complex(2, 0);
const result = pow(z, w);
console.log(result.toString()); // => "0 + 2i" (approximately)

// Real number exponent
const result2 = pow(z, 2);
console.log(result2.toString()); // => same as above
```

---

## sqrt

Calculates the square root (principal value) of a complex number: $\sqrt{z}$.

Returns the [principal value](https://en.wikipedia.org/wiki/Principal_value) of the square root.
For $z = r \cdot e^{i\theta}$:

$$\sqrt{z} = \sqrt{r} \cdot e^{i\theta/2}$$

where $r$ is the modulus and $\theta$ is the argument.

```typescript
sqrt(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new Complex number representing the principal square root of $z$.

### Example

```typescript
import { Complex, sqrt } from '@iamsquare/complex.js';

const z = new Complex(4, 0);
const result = sqrt(z);
console.log(result.toString()); // => "2 + 0i"

const z2 = new Complex(-1, 0);
const result2 = sqrt(z2);
console.log(result2.toString()); // => "0 + 1i" (i)
```

---

## inverse

Calculates the multiplicative inverse (reciprocal) of a complex number: $\frac{1}{z}$.

For $z = a + ib$, the inverse is:

$$\frac{1}{z} = \frac{a - ib}{a^2 + b^2}$$

which is the conjugate divided by the modulus squared.

```typescript
inverse(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new Complex number representing $\frac{1}{z}$.

### Example

```typescript
import { Complex, inverse, multiply } from '@iamsquare/complex.js';

const z = new Complex(2, 3);
const inv = inverse(z);
const product = multiply(z, inv);
console.log(product.toString()); // => approximately "1 + 0i"
```
