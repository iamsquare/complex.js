import Complex from '~/complex';

/**
 * Checks if a complex number is zero: z === 0.
 *
 * A complex number is zero if both its real and imaginary parts are exactly zero.
 *
 * @param z - The complex number to check.
 * @returns `true` if z is zero (0 + 0i), `false` otherwise.
 *
 * @example
 * ```typescript
 * const z1 = new Complex(0, 0);
 * console.log(isZero(z1)); // => true
 *
 * const z2 = new Complex(0, 1);
 * console.log(isZero(z2)); // => false
 * ```
 */
export default function isZero(z: Complex) {
  return z.getRe() === 0 && z.getIm() === 0;
}
