---
sidebar_position: 4
---

# Discrete Fourier Transform

Complex numbers are fundamental to signal processing and the Fourier Transform.

## Basic DFT Implementation

```typescript
import { Complex, add, multiply, exp } from '@iamsquare/complex.js';

import { Complex, add, multiply, exp } from '@iamsquare/complex.js';

function dft(signal: number[]): Complex[] {
  const N = signal.length;
  const result: Complex[] = [];

  for (let k = 0; k < N; k++) {
    let sum = Complex.ZERO;

    for (let t = 0; t < N; t++) {
      const eit = exp(new Complex(0, (2 * Math.PI * k * t) / N));

      sum = add(sum, multiply(signal[t], eit));
    }

    result.push(sum);
  }

  return result;
}

dft([1, 0, -1, 0]); // => [0, 2, 0, 2] (approximately)
```

## Inverse DFT

```typescript
import { Complex, add, multiply, exp } from '@iamsquare/complex.js';

function idft(spectrum: Complex[]): number[] {
  const N = spectrum.length;
  const result: number[] = [];

  for (let n = 0; n < N; n++) {
    let sum = Complex.ZERO;

    for (let k = 0; k < N; k++) {
      const eit = exp(new Complex(0, (2 * Math.PI * k * n) / N));

      sum = add(sum, multiply(spectrum[k], eit));
    }

    result.push(divide(sum, N).getRe());
  }

  return result;
}

const signal = [1, 0, -1, 0];
const spectrum = dft(signal);
const reconstructed = idft(spectrum);

console.log('Reconstructed:', reconstructed); // => [ 1, 0, -1, 0 ] (approximately)
```
