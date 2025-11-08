import Complex from '~/complex';
import inverse from '~/functions/inverse';
import atanh from '~/functions/inverseHyperbolic/atanh';

/**
 * Calculates the inverse hyperbolic cotangent of a complex number: arcoth(z).
 *
 * Returns the principal value of the inverse hyperbolic cotangent function. Computed using the identity:
 * arcoth(z) = artanh(1/z).
 *
 * @param z - The complex number.
 * @returns A new Complex number representing arcoth(z).
 *
 * @example
 * ```typescript
 * const z = new Complex(2, 0);
 * const result = acoth(z);
 * console.log(result.toString()); // => approximately "0.549 + 0i"
 * ```
 */
export default function acoth(z: Complex) {
  return atanh(inverse(z));
}
