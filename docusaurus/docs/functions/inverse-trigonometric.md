---
sidebar_position: 3
---

# Inverse Trigonometric Functions

Inverse trigonometric functions (arc functions) extended to complex numbers.

## asin

Calculates the arcsine (inverse sine) of a complex number: $\arcsin(z)$.

Returns the principal value of the inverse sine function. For real $z$ in $[-1, 1]$,
this gives the standard arcsine. For complex $z$, it extends the function to the complex plane.

```typescript
asin(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new Complex number representing $\arcsin(z)$.

### Example

```typescript
import { Complex, asin } from '@iamsquare/complex.js';

const z = new Complex(1, 0);
const result = asin(z);
console.log(result.toString()); // => approximately "1.571 + 0i" (π/2)
```

---

## acos

Calculates the arccosine (inverse cosine) of a complex number: $\arccos(z)$.

Returns the principal value of the inverse cosine function. Computed using the identity:

$$\arccos(z) = \frac{\pi}{2} - \arcsin(z)$$

```typescript
acos(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new Complex number representing $\arccos(z)$.

### Example

```typescript
import { Complex, acos } from '@iamsquare/complex.js';

const z = new Complex(1, 0);
const result = acos(z);
console.log(result.toString()); // => approximately "0 + 0i"
```

---

## atan

Calculates the arctangent (inverse tangent) of a complex number: $\arctan(z)$.

Returns the principal value of the inverse tangent function. For real $z$,
this gives the standard arctangent. For complex $z$, it extends the function to the complex plane.

```typescript
atan(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new Complex number representing $\arctan(z)$.

### Example

```typescript
import { Complex, atan } from '@iamsquare/complex.js';

const z = new Complex(1, 0);
const result = atan(z);
console.log(result.toString()); // => approximately "0.785 + 0i" (π/4)
```

---

## asec

Calculates the arcsecant (inverse secant) of a complex number: $\text{arcsec}(z)$.

Returns the principal value of the inverse secant function. Computed using the identity:

$$\text{arcsec}(z) = \arccos\left(\frac{1}{z}\right)$$

```typescript
asec(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new `Complex` number representing $\text{arcsec}(z)$.

### Example

```typescript
import { Complex, sec, asec } from '@iamsquare/complex.js';

const z = new Complex(1, 0);
const secant = sec(z);
const arcsecant = asec(secant);
console.log(arcsecant.toString()); // => "0 + 0i" (approximately)
```

---

## acsc

Calculates the arccosecant (inverse cosecant) of a complex number: $\text{arccsc}(z)$.

Returns the principal value of the inverse cosecant function. Computed using the identity:

$$\text{arccsc}(z) = \arcsin\left(\frac{1}{z}\right)$$

```typescript
acsc(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new `Complex` number representing $\text{arccsc}(z)$.

### Example

```typescript
import { Complex, csc, acsc } from '@iamsquare/complex.js';

const z = new Complex(1, 0);
const cosecant = csc(z);
const arccosecant = acsc(cosecant);
console.log(arccosecant.toString()); // => "1 + 0i" (approximately)
```

---

## acot

Calculates the arccotangent (inverse cotangent) of a complex number: $\text{arccot}(z)$.

Returns the principal value of the inverse cotangent function. Computed using the identity:

$$\text{arccot}(z) = \frac{\pi}{2} - \arctan(z)$$

```typescript
acot(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new `Complex` number representing $\text{arccot}(z)$.

### Example

```typescript
import { Complex, cot, acot } from '@iamsquare/complex.js';

const z = new Complex(1, 0);
const cotangent = cot(z);
const arccotangent = acot(cotangent);
console.log(arccotangent.toString()); // => "1 + 0i" (approximately)
```
