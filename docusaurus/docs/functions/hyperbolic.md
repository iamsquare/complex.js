---
sidebar_position: 4
---

# Hyperbolic Functions

Hyperbolic functions extended to complex numbers.

## sinh

Calculates the hyperbolic sine of a complex number: $\sinh(z)$.

For $z = a + ib$:

$$\sinh(z) = \sinh(a)\cos(b) + i\cosh(a)\sin(b)$$

```typescript
sinh(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new Complex number representing $\sinh(z)$.

### Example

```typescript
import { Complex, sinh } from '@iamsquare/complex.js';

const z = new Complex(0, 0);
const result = sinh(z);
console.log(result.toString()); // => "0"
```

---

## cosh

Calculates the hyperbolic cosine of a complex number: $\cosh(z)$.

For $z = a + ib$:

$$\cosh(z) = \cosh(a)\cos(b) + i\sinh(a)\sin(b)$$

```typescript
cosh(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new Complex number representing $\cosh(z)$.

### Example

```typescript
import { Complex, cosh } from '@iamsquare/complex.js';

const z = new Complex(0, 0);
const result = cosh(z);
console.log(result.toString()); // => "1"
```

---

## tanh

Calculates the hyperbolic tangent of a complex number: $\tanh(z)$.

Computed as $\tanh(z) = \frac{\sinh(z)}{\cosh(z)}$, with optimizations to avoid numerical cancellation.

```typescript
tanh(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new Complex number representing $\tanh(z)$.

### Example

```typescript
import { Complex, tanh } from '@iamsquare/complex.js';

const z = new Complex(0, 0);
const result = tanh(z);
console.log(result.toString()); // => "0"
```

---

## sech

Calculates the hyperbolic secant of a complex number: $\text{sech}(z)$.

The hyperbolic secant is the reciprocal of hyperbolic cosine: $\text{sech}(z) = \frac{1}{\cosh(z)}$.
Uses optimized computation to avoid numerical cancellation.

```typescript
sech(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new `Complex` number representing $\text{sech}(z) = \frac{1}{\cosh(z)}$.

### Example

```typescript
import { Complex, sech } from '@iamsquare/complex.js';

const z = new Complex(0, 0);
const result = sech(z);
console.log(result.toString()); // => "1 + 0i"
```

---

## csch

Calculates the hyperbolic cosecant of a complex number: $\text{csch}(z)$.

The hyperbolic cosecant is the reciprocal of hyperbolic sine: $\text{csch}(z) = \frac{1}{\sinh(z)}$.
Uses optimized computation to avoid numerical cancellation.

```typescript
csch(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new `Complex` number representing $\text{csch}(z) = \frac{1}{\sinh(z)}$.

### Example

```typescript
import { Complex, csch } from '@iamsquare/complex.js';

const z = new Complex(1, 0);
const result = csch(z);
console.log(result.toString()); // => "0.8509181282393216 + 0i" (approximately)
```

---

## coth

Calculates the hyperbolic cotangent of a complex number: $\coth(z)$.

The hyperbolic cotangent is the reciprocal of hyperbolic tangent: $\coth(z) = \frac{1}{\tanh(z)} = \frac{\cosh(z)}{\sinh(z)}$.
Uses optimized computation to avoid numerical cancellation.

```typescript
coth(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new `Complex` number representing $\coth(z) = \frac{1}{\tanh(z)}$.

### Example

```typescript
import { Complex, coth } from '@iamsquare/complex.js';

const z = new Complex(1, 0);
const result = coth(z);
console.log(result.toString()); // => "1.3130352854993312 + 0i" (approximately)
```
