---
sidebar_position: 3
---

# Type Checking Operations

Type checking operations help identify special properties of complex numbers.

## isReal

Checks if a complex number is a real number (has zero imaginary part).

```typescript
isReal(z: Complex): boolean
```

### Parameters

- `z` - The complex number to check

### Returns

`true` if the number is real (imaginary part is zero), `false` otherwise.

### Example

```typescript
import { Complex, isReal } from '@iamsquare/complex.js';

const z = new Complex(5, 0);
const w = new Complex(5, 1);
console.log(isReal(z)); // => true
console.log(isReal(w)); // => false
```

---

## isPureImaginary

Checks if a complex number is purely imaginary (has zero real part).

```typescript
isPureImaginary(z: Complex): boolean
```

### Parameters

- `z` - The complex number to check

### Returns

`true` if the number is purely imaginary (real part is zero), `false` otherwise.

### Example

```typescript
import { Complex, isPureImaginary } from '@iamsquare/complex.js';

const z = new Complex(0, 5);
const w = new Complex(1, 5);
console.log(isPureImaginary(z)); // => true
console.log(isPureImaginary(w)); // => false
```

---

## isZero

Checks if a complex number is zero.

```typescript
isZero(z: Complex): boolean
```

### Parameters

- `z` - The complex number to check

### Returns

`true` if the number is zero (both real and imaginary parts are zero), `false` otherwise.

### Example

```typescript
import { Complex, isZero } from '@iamsquare/complex.js';

const z = new Complex(0, 0);
const w = new Complex(0, 1);
console.log(isZero(z)); // => true
console.log(isZero(w)); // => false
```

---

## isInfinite

Checks if a complex number is infinite.

```typescript
isInfinite(z: Complex): boolean
```

### Parameters

- `z` - The complex number to check

### Returns

`true` if the number is infinite, `false` otherwise.

### Example

```typescript
import { Complex, isInfinite } from '@iamsquare/complex.js';

const z = Complex.INFINITY;
const w = new Complex(1, 2);
console.log(isInfinite(z)); // => true
console.log(isInfinite(w)); // => false
```

---

## isNaNC

Checks if a complex number is NaN (Not a Number).

```typescript
isNaNC(z: Complex): boolean
```

### Parameters

- `z` - The complex number to check

### Returns

`true` if the number is NaN, `false` otherwise.

### Example

```typescript
import { Complex, isNaNC } from '@iamsquare/complex.js';

const z = Complex.NAN;
const w = new Complex(1, 2);
console.log(isNaNC(z)); // => true
console.log(isNaNC(w)); // => false
```
