import { Complex } from '~/complex';
import { isInfinite, isNaNC, isZero } from '~/operations';

/**
 * Calculates the hyperbolic tangent of a complex number: tanh(z).
 *
 * Computed as tanh(z) = sinh(z) / cosh(z), with optimizations to avoid numerical cancellation.
 *
 * @param z - The complex number.
 * @returns A new Complex number representing tanh(z).
 *
 * @example
 * ```typescript
 * const z = new Complex(0, 0);
 * const result = tanh(z);
 * console.log(result.toString()); // => "0"
 * ```
 */
export function tanh(z: Complex) {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.ZERO;

  // We avoid numeric cancellation by expanding the denominator and simplifying with trig rules.
  const a2 = 2 * z.getRe();
  const b2 = 2 * z.getIm();
  const d = Math.cosh(a2) + Math.cos(b2);

  return new Complex(Math.sinh(a2) / d, Math.sin(b2) / d);
}
