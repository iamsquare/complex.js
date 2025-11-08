---
sidebar_position: 2
---

# Trigonometric Functions

Standard trigonometric functions extended to complex numbers.

## sin

Calculates the sine of a complex number: $\sin(z)$.

For $z = a + ib$:

$$\sin(z) = \sin(a)\cosh(b) + i\cos(a)\sinh(b)$$

```typescript
sin(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new Complex number representing $\sin(z)$.

### Example

```typescript
import { Complex, sin } from '@iamsquare/complex.js';

const z = new Complex(Math.PI / 2, 0);
const result = sin(z);
console.log(result.toString()); // => approximately "1 + 0i"
```

---

## cos

Calculates the cosine of a complex number: $\cos(z)$.

For $z = a + ib$:

$$\cos(z) = \cos(a)\cosh(b) - i\sin(a)\sinh(b)$$

```typescript
cos(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new Complex number representing $\cos(z)$.

### Example

```typescript
import { Complex, cos } from '@iamsquare/complex.js';

const z = new Complex(0, 0);
const result = cos(z);
console.log(result.toString()); // => "1"
```

---

## tan

Calculates the tangent of a complex number: $\tan(z)$.

Computed as $\tan(z) = \frac{\sin(z)}{\cos(z)}$, with optimizations to avoid numerical cancellation.

```typescript
tan(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new Complex number representing $\tan(z)$.

### Example

```typescript
import { Complex, tan } from '@iamsquare/complex.js';

const z = new Complex(0, 0);
const result = tan(z);
console.log(result.toString()); // => "0"
```

---

## sec

Calculates the secant of a complex number: $\sec(z)$.

The secant is the reciprocal of cosine: $\sec(z) = \frac{1}{\cos(z)}$.
Uses optimized computation to avoid numerical cancellation.

```typescript
sec(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new Complex number representing $\sec(z)$.

### Example

```typescript
import { Complex, sec } from '@iamsquare/complex.js';

const z = new Complex(0, 0);
const result = sec(z);
console.log(result.toString()); // => "1"
```

---

## csc

Calculates the cosecant of a complex number: $\csc(z)$.

The cosecant is the reciprocal of sine: $\csc(z) = \frac{1}{\sin(z)}$.
Uses optimized computation to avoid numerical cancellation.

```typescript
csc(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new Complex number representing $\csc(z)$.

### Example

```typescript
import { Complex, csc } from '@iamsquare/complex.js';

const z = new Complex(Math.PI / 2, 0);
const result = csc(z);
console.log(result.toString()); // => approximately "1 + 0i"
```

---

## cot

Calculates the cotangent of a complex number: $\cot(z)$.

The cotangent is the reciprocal of tangent: $\cot(z) = \frac{1}{\tan(z)} = \frac{\cos(z)}{\sin(z)}$.
Uses optimized computation to avoid numerical cancellation.

```typescript
cot(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new Complex number representing $\cot(z)$.

### Example

```typescript
import { Complex, cot } from '@iamsquare/complex.js';

const z = new Complex(Math.PI / 2, 0);
const result = cot(z);
console.log(result.toString()); // => approximately "0 + 0i"
```
