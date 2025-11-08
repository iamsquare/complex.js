import Complex from '~/complex';
import asin from '~/functions/inverseTrigonometric/asin';
import subtract from '~/operations/subtract';

/**
 * Calculates the arccosine (inverse cosine) of a complex number: arccos(z).
 *
 * Returns the principal value of the inverse cosine function. Computed using the identity:
 * arccos(z) = π/2 - arcsin(z).
 *
 * @param z - The complex number.
 * @returns A new Complex number representing arccos(z).
 *
 * @example
 * ```typescript
 * const z = new Complex(1, 0);
 * const result = acos(z);
 * console.log(result.toString()); // => approximately "0 + 0i"
 * ```
 */
export default function acos(z: Complex) {
  return subtract(Complex.HALFPI, asin(z));
}
