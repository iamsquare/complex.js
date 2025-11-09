---
sidebar_position: 1
---

# Complex Class

The `Complex` class is the core of the library, representing complex numbers and providing methods to work with them.

## Constructor

The `Complex` class can be instantiated in several ways:

### Numeric Arguments

```typescript
new Complex(re?: number, im?: number): Complex
```

Creates a complex number from real and imaginary parts.

**Parameters:**

- `re` (optional) - The real part (defaults to 0)
- `im` (optional) - The imaginary part (defaults to 0)

**Example:**

```typescript
const z = new Complex(3, 4);
console.log(z.toString()); // => "3 + 4i"
```

### Cartesian Coordinates

```typescript
new Complex(c: { x: number, y: number }): Complex
```

Creates a complex number from Cartesian coordinates.

**Parameters:**

- `c` - An object with `x` (real part) and `y` (imaginary part) properties

**Example:**

```typescript
const z = new Complex({ x: 3, y: 4 });
console.log(z.toString()); // => "3 + 4i"
```

### Polar Coordinates

```typescript
new Complex(p: { r: number, p: number }): Complex
```

Creates a complex number from polar coordinates.

**Parameters:**

- `p` - An object with `r` (radius/magnitude) and `p` (phase/angle in radians) properties

**Example:**

```typescript
const z = new Complex({ r: 5, p: Math.PI / 4 });
console.log(z.toString()); // => "3.5355339059327373 + 3.5355339059327373i"
```

### From Another Complex Number

```typescript
new Complex(z: Complex): Complex
```

Creates a copy of an existing complex number.

**Parameters:**

- `z` - An existing Complex number

**Example:**

```typescript
const z1 = new Complex(3, 4);
const z2 = new Complex(z1);
console.log(z2.toString()); // => "3 + 4i"
```

## Instance Methods

### getRe()

Gets the real part of the complex number.

```typescript
getRe(): number
```

**Returns:** The real part as a number.

**Example:**

```typescript
const z = new Complex(3, 4);
console.log(z.getRe()); // => 3
```

### getIm()

Gets the imaginary part of the complex number.

```typescript
getIm(): number
```

**Returns:** The imaginary part as a number.

**Example:**

```typescript
const z = new Complex(3, 4);
console.log(z.getIm()); // => 4
```

### toString()

Converts the complex number to a string representation.

```typescript
toString(): string
```

**Returns:** A string in the format `"a + bi"` or `"a - bi"`.

**Example:**

```typescript
const z = new Complex(3, 4);
console.log(z.toString()); // => "3 + 4i"

const w = new Complex(3, -4);
console.log(w.toString()); // => "3 - 4i"
```

### toCartesian()

Converts the complex number to Cartesian coordinates.

```typescript
toCartesian(): { x: number, y: number }
```

**Returns:** An object with `x` (real part) and `y` (imaginary part) properties.

**Example:**

```typescript
const z = new Complex(3, 4);
const cartesian = z.toCartesian();
console.log(cartesian); // => { x: 3, y: 4 }
```

### toPolar()

Converts the complex number to polar coordinates.

```typescript
toPolar(): { r: number, p: number }
```

**Returns:** An object with `r` (magnitude) and `p` (phase in radians) properties.

**Example:**

```typescript
const z = new Complex(3, 4);
const polar = z.toPolar();
console.log(polar); // => { r: 5, p: 0.9272952180016122 }
```

## Static Constants

The `Complex` class provides several useful constants:

### Complex.ZERO

The complex number 0.

```typescript
Complex.ZERO; // => new Complex(0, 0)
```

### Complex.ONE

The complex number 1.

```typescript
Complex.ONE; // => new Complex(1, 0)
```

### Complex.I

The imaginary unit i.

```typescript
Complex.I; // => new Complex(0, 1)
```

### Complex.PI

The mathematical constant π.

```typescript
Complex.PI; // => new Complex(Math.PI, 0)
```

### Complex.HALFPI

The mathematical constant π/2.

```typescript
Complex.HALFPI; // => new Complex(Math.PI / 2, 0)
```

### Complex.E

Euler's number e.

```typescript
Complex.E; // => new Complex(Math.E, 0)
```

### Complex.INFINITY

Represents infinity in the complex plane.

```typescript
Complex.INFINITY; // => new Complex(Infinity, Infinity)
```

### Complex.NAN

Represents NaN (Not a Number).

```typescript
Complex.NAN; // => new Complex(NaN, NaN)
```

## Usage Examples

### Creating Complex Numbers

```typescript
import { Complex } from '@iamsquare/complex.js';

// Different ways to create the same number
const z1 = new Complex(3, 4);
const z2 = new Complex({ x: 3, y: 4 });
const z3 = new Complex({ r: 5, p: Math.atan2(4, 3) });
const z4 = new Complex(z1);

console.log(z1.toString()); // => "3 + 4i"
console.log(z2.toString()); // => "3 + 4i"
console.log(z3.toString()); // => "3 + 4i" (approximately)
console.log(z4.toString()); // => "3 + 4i"
```

### Working with Constants

```typescript
import { Complex, multiply, exp } from '@iamsquare/complex.js';

// Euler's identity: e^(iπ) = -1
const result = exp(multiply(Complex.I, Complex.PI));
console.log(result.toString()); // => "-1 + 0i" (approximately)
```

### Converting Between Representations

```typescript
import { Complex } from '@iamsquare/complex.js';

const z = new Complex(3, 4);

// Get parts
const real = z.getRe(); // 3
const imag = z.getIm(); // 4

// Convert to different forms
const cartesian = z.toCartesian(); // { x: 3, y: 4 }
const polar = z.toPolar(); // { r: 5, p: 0.9272952180016122 }

// Create from polar
const z2 = new Complex(polar);
console.log(z2.toString()); // => "3 + 4i" (approximately)
```
