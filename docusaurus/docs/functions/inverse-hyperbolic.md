---
sidebar_position: 4
---

# Inverse Hyperbolic Functions

Inverse hyperbolic functions extended to complex numbers.

## asinh

Calculates the inverse hyperbolic sine of a complex number: $\text{arsinh}(z)$.

Returns the principal value of the inverse hyperbolic sine function. For real $z$,
this gives the standard inverse hyperbolic sine. For complex $z$, it extends the function to the complex plane.

```typescript
asinh(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new Complex number representing $\text{arsinh}(z)$.

### Example

```typescript
import { Complex, asinh } from '@iamsquare/complex.js';

const z = new Complex(0, 0);
const result = asinh(z);
console.log(result.toString()); // => "0"
```

---

## acosh

Calculates the inverse hyperbolic cosine of a complex number: $\text{arcosh}(z)$.

Returns the principal value of the inverse hyperbolic cosine function. For real $z \geq 1$,
this gives the standard inverse hyperbolic cosine. For complex $z$, it extends the function to the complex plane.

```typescript
acosh(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new Complex number representing $\text{arcosh}(z)$.

### Example

```typescript
import { Complex, acosh } from '@iamsquare/complex.js';

const z = new Complex(1, 0);
const result = acosh(z);
console.log(result.toString()); // => approximately "0 + 0i"
```

---

## atanh

Calculates the inverse hyperbolic tangent of a complex number: $\text{artanh}(z)$.

Returns the principal value of the inverse hyperbolic tangent function. For real $z$ in $(-1, 1)$,
this gives the standard inverse hyperbolic tangent. For complex $z$, it extends the function to the complex plane.

```typescript
atanh(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new Complex number representing $\text{artanh}(z)$.

### Example

```typescript
import { Complex, atanh } from '@iamsquare/complex.js';

const z = new Complex(0, 0);
const result = atanh(z);
console.log(result.toString()); // => "0"
```

---

## asech

Calculates the inverse hyperbolic secant of a complex number: $\text{arsech}(z)$.

Returns the principal value of the inverse hyperbolic secant function. Computed using the identity:

$$\text{arsech}(z) = \text{arcosh}\left(\frac{1}{z}\right)$$

```typescript
asech(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new `Complex` number representing $\text{arsech}(z)$.

### Example

```typescript
import { Complex, sech, asech } from '@iamsquare/complex.js';

const z = new Complex(0.5, 0);
const hypSecant = sech(z);
const invHypSecant = asech(hypSecant);
console.log(invHypSecant.toString()); // => "0.5 + 0i" (approximately)
```

---

## acsch

Calculates the inverse hyperbolic cosecant of a complex number: $\text{arcsch}(z)$.

Returns the principal value of the inverse hyperbolic cosecant function. Computed using the identity:

$$\text{arcsch}(z) = \text{arsinh}\left(\frac{1}{z}\right)$$

```typescript
acsch(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new `Complex` number representing $\text{arcsch}(z)$.

### Example

```typescript
import { Complex, csch, acsch } from '@iamsquare/complex.js';

const z = new Complex(1, 0);
const hypCosecant = csch(z);
const invHypCosecant = acsch(hypCosecant);
console.log(invHypCosecant.toString()); // => "1 + 0i" (approximately)
```

---

## acoth

Calculates the inverse hyperbolic cotangent of a complex number: $\text{arcoth}(z)$.

Returns the principal value of the inverse hyperbolic cotangent function. Computed using the identity:

$$\text{arcoth}(z) = \text{artanh}\left(\frac{1}{z}\right)$$

```typescript
acoth(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new `Complex` number representing $\text{arcoth}(z)$.

### Example

```typescript
import { Complex, coth, acoth } from '@iamsquare/complex.js';

const z = new Complex(2, 0);
const hypCotangent = coth(z);
const invHypCotangent = acoth(hypCotangent);
console.log(invHypCotangent.toString()); // => "2 + 0i" (approximately)
```
