import Complex from '~/complex';
import { argument, isInfinite, isNaNC, isZero, modulus } from '~/operations';

/**
 * Calculates the square root (principal value) of a complex number: √z.
 *
 * Returns the [principal value](https://en.wikipedia.org/wiki/Principal_value) of the square root.
 * For z = r * e^(iθ), √z = √r * e^(iθ/2), where r is the modulus and θ is the argument.
 *
 * @param z - The complex number.
 * @returns A new Complex number representing the principal square root of z.
 *
 * @example
 * ```typescript
 * const z = new Complex(4, 0);
 * const result = sqrt(z);
 * console.log(result.toString()); // => "2 + 0i"
 *
 * const z2 = new Complex(-1, 0);
 * const result2 = sqrt(z2);
 * console.log(result2.toString()); // => "0 + 1i" (i)
 * ```
 *
 * @todo Test if this implementation is better than the commented algebraic formula.
 */
export default function sqrt(z: Complex) {
  if (isNaNC(z)) return Complex.NAN;
  if (isInfinite(z)) return Complex.INFINITY;
  if (isZero(z)) return Complex.ZERO;

  const r = modulus(z);
  const p = argument(z);

  return new Complex((r / Math.sqrt(r)) * Math.cos(p / 2), (r / Math.sqrt(r)) * Math.sin(p / 2));
}
