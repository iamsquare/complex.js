---
sidebar_position: 1
---

# Arithmetic Operations

Arithmetic operations perform basic mathematical operations on complex numbers.

## add

Adds two complex numbers.

```typescript
add(z: Complex, w: Complex): Complex
```

### Parameters

- `z` - First complex number
- `w` - Second complex number

### Returns

A new `Complex` number representing `z + w`.

### Example

```typescript
import { Complex, add } from '@iamsquare/complex.js';

const z = new Complex(1, 2);
const w = new Complex(3, 4);
const result = add(z, w);
console.log(result.toString()); // => "4 + 6i"
```

---

## subtract

Subtracts one complex number from another.

```typescript
subtract(z: Complex, w: Complex): Complex
```

### Parameters

- `z` - The complex number to subtract from
- `w` - The complex number to subtract

### Returns

A new `Complex` number representing `z - w`.

### Example

```typescript
import { Complex, subtract } from '@iamsquare/complex.js';

const z = new Complex(5, 6);
const w = new Complex(2, 3);
const result = subtract(z, w);
console.log(result.toString()); // => "3 + 3i"
```

---

## multiply

Multiplies two complex numbers.

```typescript
multiply(z: Complex, w: Complex): Complex
```

### Parameters

- `z` - First complex number
- `w` - Second complex number

### Returns

A new `Complex` number representing `z × w`.

### Example

```typescript
import { Complex, multiply } from '@iamsquare/complex.js';

const z = new Complex(1, 2);
const w = new Complex(3, 4);
const result = multiply(z, w);
console.log(result.toString()); // => "-5 + 10i"
```

---

## divide

Divides one complex number by another.

```typescript
divide(z: Complex, w: Complex): Complex
```

### Parameters

- `z` - The dividend (complex number to be divided)
- `w` - The divisor (complex number to divide by)

### Returns

A new `Complex` number representing `z / w`.

### Example

```typescript
import { Complex, divide } from '@iamsquare/complex.js';

const z = new Complex(1, 2);
const w = new Complex(3, 4);
const result = divide(z, w);
console.log(result.toString()); // => "0.44 + 0.08i"
```

---

## negate

Negates a complex number (multiplies by -1).

```typescript
negate(z: Complex): Complex
```

### Parameters

- `z` - The complex number to negate

### Returns

A new `Complex` number representing `-z`.

### Example

```typescript
import { Complex, negate } from '@iamsquare/complex.js';

const z = new Complex(3, 4);
const result = negate(z);
console.log(result.toString()); // => "-3 - 4i"
```
