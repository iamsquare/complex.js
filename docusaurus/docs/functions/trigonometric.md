---
sidebar_position: 2
---

# Trigonometric Functions

Standard trigonometric functions extended to complex numbers.

## sin

Calculates the sine of a complex number.

```typescript
sin(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new `Complex` number representing sin(z).

### Example

```typescript
import { Complex, sin } from '@iamsquare/complex.js';

const z = new Complex(Math.PI / 2, 0);
const result = sin(z);
console.log(result.toString()); // => "1 + 0i" (approximately)
```

---

## cos

Calculates the cosine of a complex number.

```typescript
cos(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new `Complex` number representing cos(z).

### Example

```typescript
import { Complex, cos } from '@iamsquare/complex.js';

const z = new Complex(0, 0);
const result = cos(z);
console.log(result.toString()); // => "1 + 0i"
```

---

## tan

Calculates the tangent of a complex number.

```typescript
tan(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new `Complex` number representing tan(z).

### Example

```typescript
import { Complex, tan } from '@iamsquare/complex.js';

const z = new Complex(Math.PI / 4, 0);
const result = tan(z);
console.log(result.toString()); // => "1 + 0i" (approximately)
```

---

## sec

Calculates the secant of a complex number.

```typescript
sec(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new `Complex` number representing sec(z) = 1/cos(z).

### Example

```typescript
import { Complex, sec } from '@iamsquare/complex.js';

const z = new Complex(0, 0);
const result = sec(z);
console.log(result.toString()); // => "1 + 0i"
```

---

## csc

Calculates the cosecant of a complex number.

```typescript
csc(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new `Complex` number representing csc(z) = 1/sin(z).

### Example

```typescript
import { Complex, csc } from '@iamsquare/complex.js';

const z = new Complex(Math.PI / 2, 0);
const result = csc(z);
console.log(result.toString()); // => "1 + 0i" (approximately)
```

---

## cot

Calculates the cotangent of a complex number.

```typescript
cot(z: Complex): Complex
```

### Parameters

- `z` - The complex number

### Returns

A new `Complex` number representing cot(z) = 1/tan(z).

### Example

```typescript
import { Complex, cot } from '@iamsquare/complex.js';

const z = new Complex(Math.PI / 4, 0);
const result = cot(z);
console.log(result.toString()); // => "1 + 0i" (approximately)
```
