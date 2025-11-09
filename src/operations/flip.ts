import { Complex } from '~/complex';
import { isInfinite } from '~/operations/isInfinite';
import { isNaNC } from '~/operations/isNaNC';

/**
 * Flips a complex number by swapping its real and imaginary parts.
 *
 * For a complex number z = a + ib, flip(z) = b + ia. This operation swaps
 * the real and imaginary parts of the number.
 *
 * @param z - The complex number to flip.
 * @returns A new Complex number with swapped real and imaginary parts.
 *
 * @example
 * ```typescript
 * const z = new Complex(3, 4);
 * const flipped = flip(z);
 * console.log(flipped.toString()); // => "4 + 3i"
 * ```
 */
export function flip(z: Complex) {
  if (isNaNC(z)) return Complex.NAN;
  if (isInfinite(z)) return Complex.INFINITY;

  return new Complex(z.getIm(), z.getRe());
}
