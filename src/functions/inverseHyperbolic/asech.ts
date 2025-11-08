import Complex from '~/complex';
import inverse from '~/functions/inverse';
import acosh from '~/functions/inverseHyperbolic/acosh';

/**
 * Calculates the inverse hyperbolic secant of a complex number: arsech(z).
 *
 * Returns the principal value of the inverse hyperbolic secant function. Computed using the identity:
 * arsech(z) = arcosh(1/z).
 *
 * @param z - The complex number.
 * @returns A new Complex number representing arsech(z).
 *
 * @example
 * ```typescript
 * const z = new Complex(1, 0);
 * const result = asech(z);
 * console.log(result.toString()); // => approximately "0 + 0i"
 * ```
 */
export default function asech(z: Complex) {
  return acosh(inverse(z));
}
