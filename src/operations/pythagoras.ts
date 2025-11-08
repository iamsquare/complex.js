import type { Complex } from '~/complex';

/**
 * Calculates the modulus squared (magnitude squared) of a complex number: |z|².
 *
 * This is equivalent to a² + b² for z = a + ib. It avoids the square root operation
 * and is useful when comparing magnitudes or when only the squared value is needed.
 *
 * @param z - The complex number.
 * @returns The modulus squared as a real number.
 *
 * @example
 * ```typescript
 * const z = new Complex(3, 4);
 * const modSquared = pythagoras(z);
 * console.log(modSquared); // => 25
 * ```
 */
export function pythagoras(z: Complex) {
  return z.getRe() * z.getRe() + z.getIm() * z.getIm();
}
