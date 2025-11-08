import type { Complex } from '~/complex';

/**
 * Checks if a complex number is NaN: z === NaN.
 *
 * A complex number is NaN if either its real or imaginary part is NaN.
 *
 * @param z - The complex number to check.
 * @returns `true` if z is NaN, `false` otherwise.
 *
 * @example
 * ```typescript
 * const z1 = Complex.NAN;
 * console.log(isNaNC(z1)); // => true
 *
 * const z2 = new Complex(NaN, 0);
 * console.log(isNaNC(z2)); // => true
 *
 * const z3 = new Complex(1, 2);
 * console.log(isNaNC(z3)); // => false
 * ```
 */
export function isNaNC(z: Complex) {
  return Number.isNaN(z.getRe()) || Number.isNaN(z.getIm());
}
