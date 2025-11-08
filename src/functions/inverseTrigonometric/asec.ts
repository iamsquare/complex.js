import Complex from '~/complex';
import inverse from '~/functions/inverse';
import acos from '~/functions/inverseTrigonometric/acos';

/**
 * Calculates the arcsecant (inverse secant) of a complex number: arcsec(z).
 *
 * Returns the principal value of the inverse secant function. Computed using the identity:
 * arcsec(z) = arccos(1/z).
 *
 * @param z - The complex number.
 * @returns A new Complex number representing arcsec(z).
 *
 * @example
 * ```typescript
 * const z = new Complex(1, 0);
 * const result = asec(z);
 * console.log(result.toString()); // => approximately "0 + 0i"
 * ```
 */
export default function asec(z: Complex) {
  return acos(inverse(z));
}
