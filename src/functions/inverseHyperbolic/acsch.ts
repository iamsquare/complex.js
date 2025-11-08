import Complex from '~/complex';
import inverse from '~/functions/inverse';
import asinh from '~/functions/inverseHyperbolic/asinh';

/**
 * Calculates the inverse hyperbolic cosecant of a complex number: arcsch(z).
 *
 * Returns the principal value of the inverse hyperbolic cosecant function. Computed using the identity:
 * arcsch(z) = arsinh(1/z).
 *
 * @param z - The complex number.
 * @returns A new Complex number representing arcsch(z).
 *
 * @example
 * ```typescript
 * const z = new Complex(1, 0);
 * const result = acsch(z);
 * console.log(result.toString()); // => approximately "0.881 + 0i"
 * ```
 */
export default function acsch(z: Complex) {
  return asinh(inverse(z));
}
