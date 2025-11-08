import type { Complex } from '~/complex';

/**
 * Calculates the modulus (absolute value) of a complex number: |z|.
 *
 * The modulus is the distance from the origin to the point representing the complex number.
 * For z = a + ib, the modulus is √(a² + b²).
 *
 * @param z - The complex number.
 * @returns The modulus (magnitude) of z as a real number.
 *
 * @example
 * ```typescript
 * const z = new Complex(3, 4);
 * const mod = modulus(z);
 * console.log(mod); // => 5
 * ```
 */
export function modulus(z: Complex) {
  return Math.hypot(z.getRe(), z.getIm());
}
