---
sidebar_position: 4
---

# Hyperbolic Functions

Hyperbolic functions extended to complex numbers.

## sinh

Calculates the hyperbolic sine of a complex number.

```typescript
sinh(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new `Complex` number representing sinh(z).

### Example

```typescript
import { Complex, sinh } from '@iamsquare/complex.js';

const z = new Complex(0, 0);
const result = sinh(z);
console.log(result.toString()); // => "0 + 0i"
```

---

## cosh

Calculates the hyperbolic cosine of a complex number.

```typescript
cosh(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new `Complex` number representing cosh(z).

### Example

```typescript
import { Complex, cosh } from '@iamsquare/complex.js';

const z = new Complex(0, 0);
const result = cosh(z);
console.log(result.toString()); // => "1 + 0i"
```

---

## tanh

Calculates the hyperbolic tangent of a complex number.

```typescript
tanh(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new `Complex` number representing tanh(z).

### Example

```typescript
import { Complex, tanh } from '@iamsquare/complex.js';

const z = new Complex(0, 0);
const result = tanh(z);
console.log(result.toString()); // => "0 + 0i"
```

---

## sech

Calculates the hyperbolic secant of a complex number.

```typescript
sech(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new `Complex` number representing sech(z) = 1/cosh(z).

### Example

```typescript
import { Complex, sech } from '@iamsquare/complex.js';

const z = new Complex(0, 0);
const result = sech(z);
console.log(result.toString()); // => "1 + 0i"
```

---

## csch

Calculates the hyperbolic cosecant of a complex number.

```typescript
csch(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new `Complex` number representing csch(z) = 1/sinh(z).

### Example

```typescript
import { Complex, csch } from '@iamsquare/complex.js';

const z = new Complex(1, 0);
const result = csch(z);
console.log(result.toString()); // => "0.8509181282393216 + 0i" (approximately)
```

---

## coth

Calculates the hyperbolic cotangent of a complex number.

```typescript
coth(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new `Complex` number representing coth(z) = 1/tanh(z).

### Example

```typescript
import { Complex, coth } from '@iamsquare/complex.js';

const z = new Complex(1, 0);
const result = coth(z);
console.log(result.toString()); // => "1.3130352854993312 + 0i" (approximately)
```
