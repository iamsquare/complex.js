import Complex from '~/complex';
import { isInfinite, isNaNC, isZero } from '~/operations';

/**
 * Calculates the cosecant of a complex number: csc(z).
 *
 * The cosecant is the reciprocal of sine: csc(z) = 1 / sin(z).
 * Uses optimized computation to avoid numerical cancellation.
 *
 * @param z - The complex number.
 * @returns A new Complex number representing csc(z).
 *
 * @example
 * ```typescript
 * const z = new Complex(Math.PI / 2, 0);
 * const result = csc(z);
 * console.log(result.toString()); // => approximately "1 + 0i"
 * ```
 */
export default function csc(z: Complex) {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.INFINITY;

  // We avoid numeric cancellation by expanding the denominator and simplifying with trigonometric rules.
  const a = z.getRe();
  const b = z.getIm();
  const d = Math.cosh(2 * b) - Math.cos(2 * a);

  return new Complex((2 * (Math.sin(a) * Math.cosh(b))) / d, -(2 * (Math.cos(a) * Math.sinh(b))) / d);
}
