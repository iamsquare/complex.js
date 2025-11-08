---
sidebar_position: 3
---

# Inverse Trigonometric Functions

Inverse trigonometric functions (arc functions) extended to complex numbers.

## asin

Calculates the arcsine (inverse sine) of a complex number.

```typescript
asin(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new `Complex` number representing arcsin(z).

### Example

```typescript
import { Complex, sin, asin } from '@iamsquare/complex.js';

const z = new Complex(1, 0);
const sine = sin(z);
const arcsine = asin(sine);
console.log(arcsine.toString()); // => "1 + 0i" (approximately)
```

---

## acos

Calculates the arccosine (inverse cosine) of a complex number.

```typescript
acos(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new `Complex` number representing arccos(z).

### Example

```typescript
import { Complex, cos, acos } from '@iamsquare/complex.js';

const z = new Complex(0, 0);
const cosine = cos(z);
const arccosine = acos(cosine);
console.log(arccosine.toString()); // => "0 + 0i" (approximately)
```

---

## atan

Calculates the arctangent (inverse tangent) of a complex number.

```typescript
atan(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new `Complex` number representing arctan(z).

### Example

```typescript
import { Complex, tan, atan } from '@iamsquare/complex.js';

const z = new Complex(1, 0);
const tangent = tan(z);
const arctangent = atan(tangent);
console.log(arctangent.toString()); // => "1 + 0i" (approximately)
```

---

## asec

Calculates the arcsecant (inverse secant) of a complex number.

```typescript
asec(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new `Complex` number representing arcsec(z).

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

Calculates the arccosecant (inverse cosecant) of a complex number.

```typescript
acsc(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new `Complex` number representing arccsc(z).

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

Calculates the arccotangent (inverse cotangent) of a complex number.

```typescript
acot(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new `Complex` number representing arccot(z).

### Example

```typescript
import { Complex, cot, acot } from '@iamsquare/complex.js';

const z = new Complex(1, 0);
const cotangent = cot(z);
const arccotangent = acot(cotangent);
console.log(arccotangent.toString()); // => "1 + 0i" (approximately)
```

---

## Round-trip Example

```typescript
import { Complex, sin, asin, cos, acos, tan, atan } from '@iamsquare/complex.js';

// Verify inverse relationships
const z = new Complex(0.5, 0.3);

// sin(asin(z)) ≈ z
const arcsine = asin(z);
const sinResult = sin(arcsine);
console.log(sinResult.toString()); // => "0.5 + 0.3i" (approximately)

// cos(acos(z)) ≈ z
const arccosine = acos(z);
const cosResult = cos(arccosine);
console.log(cosResult.toString()); // => "0.5 + 0.3i" (approximately)

// tan(atan(z)) ≈ z
const arctangent = atan(z);
const tanResult = tan(arctangent);
console.log(tanResult.toString()); // => "0.5 + 0.3i" (approximately)
```
