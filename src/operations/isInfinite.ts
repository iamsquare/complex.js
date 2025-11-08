import Complex from '~/complex';
import isNaNC from '~/operations/isNaNC';

/**
 * Checks if a complex number is infinite: z === ∞.
 *
 * A complex number is infinite if either its real or imaginary part is infinite
 * (and it is not NaN).
 *
 * @param z - The complex number to check.
 * @returns `true` if z is infinite, `false` otherwise.
 *
 * @example
 * ```typescript
 * const z1 = Complex.INFINITY;
 * console.log(isInfinite(z1)); // => true
 *
 * const z2 = new Complex(Infinity, 0);
 * console.log(isInfinite(z2)); // => true
 *
 * const z3 = new Complex(1, 2);
 * console.log(isInfinite(z3)); // => false
 * ```
 */
export default function isInfinite(z: Complex) {
  return !isNaNC(z) && (!Number.isFinite(z.getRe()) || !Number.isFinite(z.getIm()));
}
