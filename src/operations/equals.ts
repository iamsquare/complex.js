import { Complex } from '~/complex';
import { isInfinite } from '~/operations/isInfinite';
import { isNaNC } from '~/operations/isNaNC';

/**
 * Checks if two complex numbers are equal: z === w.
 *
 * Uses floating-point comparison with epsilon tolerance (Complex.EPSILON) to account
 * for floating-point precision errors. Two numbers are considered equal if both their
 * real and imaginary parts differ by at most Complex.EPSILON.
 *
 * @param z - The first complex number.
 * @param w - The second complex number.
 * @returns `true` if z and w are equal (within epsilon tolerance), `false` otherwise.
 *
 * @example
 * ```typescript
 * const z1 = new Complex(1, 2);
 * const z2 = new Complex(1, 2);
 * console.log(equals(z1, z2)); // => true
 *
 * const z3 = new Complex(1.0000001, 2);
 * console.log(equals(z1, z3)); // => true (within epsilon)
 * ```
 */
export function equals(z: Complex, w: Complex) {
  if (isInfinite(z) && isInfinite(w)) return true;
  if (isNaNC(z) || isNaNC(w)) return false;

  const a = z.getRe();
  const b = z.getIm();
  const c = w.getRe();
  const d = w.getIm();

  // TODO: check if it should be done like this
  return Math.abs(a - c) <= Complex.EPSILON && Math.abs(b - d) <= Complex.EPSILON;
}
