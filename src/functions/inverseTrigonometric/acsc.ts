import Complex from '~/complex';
import inverse from '~/functions/inverse';
import asin from '~/functions/inverseTrigonometric/asin';

/**
 * Calculates the arccosecant (inverse cosecant) of a complex number: arccsc(z).
 *
 * Returns the principal value of the inverse cosecant function. Computed using the identity:
 * arccsc(z) = arcsin(1/z).
 *
 * @param z - The complex number.
 * @returns A new Complex number representing arccsc(z).
 *
 * @example
 * ```typescript
 * const z = new Complex(1, 0);
 * const result = acsc(z);
 * console.log(result.toString()); // => approximately "1.571 + 0i" (π/2)
 * ```
 */
export default function acsc(z: Complex) {
  return asin(inverse(z));
}
