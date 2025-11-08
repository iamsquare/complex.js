import { Complex } from '~/complex';
import { isInfinite } from '~/operations/isInfinite';
import { isNaNC } from '~/operations/isNaNC';

/**
 * Adds two complex numbers: z + w.
 *
 * Performs component-wise addition: (a + ib) + (c + id) = (a + c) + i(b + d).
 *
 * @param z - The first complex number.
 * @param w - The second complex number.
 * @returns A new Complex number representing z + w.
 *
 * @example
 * ```typescript
 * const z = new Complex(3, 4);
 * const w = new Complex(1, 2);
 * const sum = add(z, w);
 * console.log(sum.toString()); // => "4 + 6i"
 * ```
 */
export function add(z: Complex, w: Complex) {
  if (isNaNC(z) || isNaNC(w) || (isInfinite(z) && isInfinite(w))) {
    return Complex.NAN;
  }
  if (isInfinite(z) || isInfinite(w)) return Complex.INFINITY;

  const a = z.getRe();
  const b = z.getIm();
  const c = w.getRe();
  const d = w.getIm();

  return new Complex(a + c, b + d);
}
