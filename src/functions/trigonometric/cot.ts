import { Complex } from '~/complex';
import { isInfinite, isNaNC, isZero } from '~/operations';

/**
 * Calculates the cotangent of a complex number: cot(z).
 *
 * The cotangent is the reciprocal of tangent: cot(z) = 1 / tan(z) = cos(z) / sin(z).
 * Uses optimized computation to avoid numerical cancellation.
 *
 * @param z - The complex number.
 * @returns A new Complex number representing cot(z).
 *
 * @example
 * ```typescript
 * const z = new Complex(Math.PI / 2, 0);
 * const result = cot(z);
 * console.log(result.toString()); // => approximately "0 + 0i"
 * ```
 */
export function cot(z: Complex) {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.INFINITY;

  // We avoid numeric cancellation by expanding the denominator and simplifying with trigonometric rules.
  const a2 = 2 * z.getRe();
  const b2 = 2 * z.getIm();
  const d = Math.cosh(b2) - Math.cos(a2);

  return new Complex(Math.sin(a2) / d, -Math.sinh(b2) / d);
}
