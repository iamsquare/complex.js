import { Complex } from '~/complex';
import { atan } from '~/functions/inverseTrigonometric/atan';
import { subtract } from '~/operations/subtract';

/**
 * Calculates the arccotangent (inverse cotangent) of a complex number: arccot(z).
 *
 * Returns the principal value of the inverse cotangent function. Computed using the identity:
 * arccot(z) = π/2 - arctan(z).
 *
 * @param z - The complex number.
 * @returns A new Complex number representing arccot(z).
 *
 * @example
 * ```typescript
 * const z = new Complex(1, 0);
 * const result = acot(z);
 * console.log(result.toString()); // => approximately "0.785 + 0i" (π/4)
 * ```
 */
export function acot(z: Complex) {
  return subtract(Complex.HALFPI, atan(z));
}
