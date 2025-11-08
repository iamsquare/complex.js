---
sidebar_position: 4
---

# Inverse Hyperbolic Functions

Inverse hyperbolic functions extended to complex numbers.

## asinh

Calculates the inverse hyperbolic sine of a complex number.

```typescript
asinh(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new `Complex` number representing arcsinh(z).

### Example

```typescript
import { Complex, sinh, asinh } from '@iamsquare/complex.js';

const z = new Complex(1, 1);
const hypSine = sinh(z);
const invHypSine = asinh(hypSine);
console.log(invHypSine.toString()); // => "1 + 1i" (approximately)
```

---

## acosh

Calculates the inverse hyperbolic cosine of a complex number.

```typescript
acosh(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new `Complex` number representing arccosh(z).

### Example

```typescript
import { Complex, cosh, acosh } from '@iamsquare/complex.js';

const z = new Complex(1, 0);
const hypCosine = cosh(z);
const invHypCosine = acosh(hypCosine);
console.log(invHypCosine.toString()); // => "1 + 0i" (approximately)
```

---

## atanh

Calculates the inverse hyperbolic tangent of a complex number.

```typescript
atanh(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new `Complex` number representing arctanh(z).

### Example

```typescript
import { Complex, tanh, atanh } from '@iamsquare/complex.js';

const z = new Complex(0.5, 0);
const hypTangent = tanh(z);
const invHypTangent = atanh(hypTangent);
console.log(invHypTangent.toString()); // => "0.5 + 0i" (approximately)
```

---

## asech

Calculates the inverse hyperbolic secant of a complex number.

```typescript
asech(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new `Complex` number representing arcsech(z).

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

Calculates the inverse hyperbolic cosecant of a complex number.

```typescript
acsch(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new `Complex` number representing arccsch(z).

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

Calculates the inverse hyperbolic cotangent of a complex number.

```typescript
acoth(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new `Complex` number representing arccoth(z).

### Example

```typescript
import { Complex, coth, acoth } from '@iamsquare/complex.js';

const z = new Complex(2, 0);
const hypCotangent = coth(z);
const invHypCotangent = acoth(hypCotangent);
console.log(invHypCotangent.toString()); // => "2 + 0i" (approximately)
```

---

## Round-trip Example

```typescript
import { Complex, sinh, asinh, cosh, acosh, tanh, atanh } from '@iamsquare/complex.js';

// Verify inverse relationships
const z = new Complex(0.5, 0.3);

// sinh(asinh(z)) ≈ z
const invHypSine = asinh(z);
const sinhResult = sinh(invHypSine);
console.log(sinhResult.toString()); // => "0.5 + 0.3i" (approximately)

// cosh(acosh(z)) ≈ z
const invHypCosine = acosh(z);
const coshResult = cosh(invHypCosine);
console.log(coshResult.toString()); // => "0.5 + 0.3i" (approximately)

// tanh(atanh(z)) ≈ z
const invHypTangent = atanh(z);
const tanhResult = tanh(invHypTangent);
console.log(tanhResult.toString()); // => "0.5 + 0.3i" (approximately)
```
