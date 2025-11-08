import { Complex } from '~/complex';
import { isInfinite, isNaNC, isZero } from '~/operations';

/**
 * Calculates the exponential of a complex number: e^z.
 *
 * For z = a + ib, this is computed as e^a * (cos(b) + i*sin(b)) using Euler's formula.
 * The result is in polar form: e^a with phase b.
 *
 * @param z - The complex number.
 * @returns A new Complex number representing e^z.
 *
 * @example
 * ```typescript
 * const z = new Complex(1, Math.PI);
 * const result = exp(z);
 * console.log(result.toString()); // => approximately "-2.718 + 0i" (e^1 * e^(iπ) = -e)
 * ```
 */
export function exp(z: Complex) {
  if (isNaNC(z) || isInfinite(z)) return Complex.NAN;
  if (isZero(z)) return Complex.ONE;

  return new Complex({ r: Math.exp(z.getRe()), p: z.getIm() });
}
