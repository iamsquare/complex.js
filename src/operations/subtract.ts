import { Complex } from '~/complex';
import { subtractStable } from '~/lib/subtractStable';
import { isInfinite } from '~/operations/isInfinite';
import { isNaNC } from '~/operations/isNaNC';

/**
 * Subtracts two complex numbers: z - w.
 *
 * Performs component-wise subtraction: (a + ib) - (c + id) = (a - c) + i(b - d).
 *
 * @param z - The complex number to subtract from (minuend).
 * @param w - The complex number to subtract (subtrahend).
 * @returns A new Complex number representing z - w.
 *
 * @example
 * ```typescript
 * const z = new Complex(5, 6);
 * const w = new Complex(2, 3);
 * const diff = subtract(z, w);
 * console.log(diff.toString()); // => "3 + 3i"
 * ```
 */
export function subtract(z: Complex, w: Complex) {
  if (isNaNC(z) || isNaNC(w) || (isInfinite(z) && isInfinite(w))) {
    return Complex.NAN;
  }
  if (isInfinite(z) || isInfinite(w)) return Complex.INFINITY;

  const { re: a, im: b } = z.getComponents();
  const { re: c, im: d } = w.getComponents();

  return new Complex(subtractStable(a, c), subtractStable(b, d));
}
