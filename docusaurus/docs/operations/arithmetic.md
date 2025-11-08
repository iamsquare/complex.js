---
sidebar_position: 1
---

# Arithmetic Operations

Arithmetic operations perform basic mathematical operations on complex numbers.

## add

Adds two complex numbers: $z + w$.

Performs component-wise addition:

$$(a + ib) + (c + id) = (a + c) + i(b + d)$$

```typescript
add(z: Complex, w: Complex): Complex
```

### Parameters

- `z` - The first complex number
- `w` - The second complex number

### Returns

A new Complex number representing $z + w$.

### Example

```typescript
import { Complex, add } from '@iamsquare/complex.js';

const z = new Complex(3, 4);
const w = new Complex(1, 2);
const sum = add(z, w);
console.log(sum.toString()); // => "4 + 6i"
```

---

## subtract

Subtracts two complex numbers: $z - w$.

Performs component-wise subtraction:

$$(a + ib) - (c + id) = (a - c) + i(b - d)$$

```typescript
subtract(z: Complex, w: Complex): Complex
```

### Parameters

- `z` - The complex number to subtract from (minuend)
- `w` - The complex number to subtract (subtrahend)

### Returns

A new Complex number representing $z - w$.

### Example

```typescript
import { Complex, subtract } from '@iamsquare/complex.js';

const z = new Complex(5, 6);
const w = new Complex(2, 3);
const diff = subtract(z, w);
console.log(diff.toString()); // => "3 + 3i"
```

---

## multiply

Multiplies two complex numbers or a complex number with a real number: $z \cdot w$.

Performs complex multiplication:

$$(a + ib) \cdot (c + id) = (ac - bd) + i(ad + bc)$$

Also accepts real numbers, which are treated as complex numbers with zero imaginary part.

```typescript
multiply(z: Complex | number, w: Complex | number): Complex
```

### Parameters

- `z` - The first complex number or real number
- `w` - The second complex number or real number

### Returns

A new Complex number representing $z \cdot w$.

### Example

```typescript
import { Complex, multiply } from '@iamsquare/complex.js';

const z = new Complex(1, 2);
const w = new Complex(3, 4);
const product = multiply(z, w);
console.log(product.toString()); // => "-5 + 10i"

// Multiply with a real number
const realProduct = multiply(z, 5);
console.log(realProduct.toString()); // => "5 + 10i"
```

---

## divide

Divides two complex numbers or a complex number by a real number: $\frac{z}{w}$.

Uses a [modified Smith's Method](http://forge.scilab.org/index.php/p/compdiv/source/tree/21/doc/improved_cdiv.pdf)
to avoid numerical overflow and underflow issues in complex division.
Also accepts real numbers, which are treated as complex numbers with zero imaginary part.

```typescript
divide(z: Complex | number, w: Complex | number): Complex
```

### Parameters

- `z` - The complex number to divide (dividend)
- `w` - The complex number or real number to divide by (divisor)

### Returns

A new Complex number representing $\frac{z}{w}$.

### Example

```typescript
import { Complex, divide } from '@iamsquare/complex.js';

const z = new Complex(1, 2);
const w = new Complex(3, 4);
const quotient = divide(z, w);
console.log(quotient.toString()); // => "0.44 + 0.08i" (approximately)

// Divide by a real number
const realQuotient = divide(z, 2);
console.log(realQuotient.toString()); // => "0.5 + 1i"
```

---

## negate

Negates a complex number: $-z$.

Returns the additive inverse:

$$-(a + ib) = -a - ib$$

```typescript
negate(z: Complex): Complex
```

### Parameters

- `z` - The complex number to negate

### Returns

A new Complex number representing $-z$.

### Example

```typescript
import { Complex, negate } from '@iamsquare/complex.js';

const z = new Complex(3, 4);
const neg = negate(z);
console.log(neg.toString()); // => "-3 - 4i"
```
