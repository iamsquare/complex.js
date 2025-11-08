import { Complex } from '~/complex';
import { argument, equals, isInfinite, isNaNC, isZero, modulus } from '~/operations';

/**
 * Calculates the natural logarithm (principal value) of a complex number: ln(z).
 *
 * Returns the [principal value](https://en.wikipedia.org/wiki/Principal_value) of the complex logarithm.
 * For z = r * e^(iθ), ln(z) = ln(r) + iθ, where r is the modulus and θ is the argument.
 *
 * @param z - The complex number.
 * @returns A new Complex number representing the principal value of ln(z).
 *
 * @example
 * ```typescript
 * const z = new Complex(Math.E, 0);
 * const result = log(z);
 * console.log(result.toString()); // => approximately "1 + 0i"
 *
 * const z2 = new Complex(0, 1);
 * const result2 = log(z2);
 * console.log(result2.toString()); // => approximately "0 + 1.571i" (iπ/2)
 * ```
 */
export function log(z: Complex) {
  if (isNaNC(z) || isZero(z)) return Complex.NAN;
  if (isInfinite(z)) return Complex.INFINITY;
  if (equals(z, Complex.ONE)) return Complex.ZERO;

  return new Complex(Math.log(modulus(z)), argument(z));
}
