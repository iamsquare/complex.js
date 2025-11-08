import Complex from '~/complex';
import { isInfinite, isNaNC, isZero } from '~/operations';

/**
 * Calculates the tangent of a complex number: tan(z).
 *
 * Computed as tan(z) = sin(z) / cos(z), with optimizations to avoid numerical cancellation.
 *
 * @param z - The complex number.
 * @returns A new Complex number representing tan(z).
 *
 * @example
 * ```typescript
 * const z = new Complex(0, 0);
 * const result = tan(z);
 * console.log(result.toString()); // => "0"
 * ```
 */
export default function tan(z: Complex) {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.ZERO;

  // We avoid numeric cancellation by expanding the denominator and simplifying with trigonometric rules.
  const a2 = 2 * z.getRe();
  const b2 = 2 * z.getIm();
  const d = Math.cos(a2) + Math.cosh(b2);

  return new Complex(Math.sin(a2) / d, Math.sinh(b2) / d);
}
