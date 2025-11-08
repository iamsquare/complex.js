import { Complex } from '~/complex';
import { isInfinite, isNaNC, isZero } from '~/operations';

/**
 * Calculates the hyperbolic cotangent of a complex number: coth(z).
 *
 * The hyperbolic cotangent is the reciprocal of hyperbolic tangent: coth(z) = 1 / tanh(z) = cosh(z) / sinh(z).
 * Uses optimized computation to avoid numerical cancellation.
 *
 * @param z - The complex number.
 * @returns A new Complex number representing coth(z).
 *
 * @example
 * ```typescript
 * const z = new Complex(1, 0);
 * const result = coth(z);
 * console.log(result.toString()); // => approximately "1.313 + 0i"
 * ```
 */
export function coth(z: Complex) {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.INFINITY;

  // We avoid numeric cancellation by expanding the denominator and simplifying with trig rules.
  const a2 = 2 * z.getRe();
  const b2 = 2 * z.getIm();
  const d = Math.cos(b2) - Math.cosh(a2);

  return new Complex(-Math.sinh(a2) / d, Math.sin(b2) / d);
}
