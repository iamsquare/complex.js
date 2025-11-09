import { Complex } from '~/complex';
import { isInfinite, isNaNC, isZero } from '~/operations';

/**
 * Calculates the hyperbolic sine of a complex number: sinh(z).
 *
 * For z = a + ib, sinh(z) = sinh(a)cos(b) + i*cosh(a)sin(b).
 *
 * @param z - The complex number.
 * @returns A new Complex number representing sinh(z).
 *
 * @example
 * ```typescript
 * const z = new Complex(0, 0);
 * const result = sinh(z);
 * console.log(result.toString()); // => "0"
 * ```
 */
export function sinh(z: Complex) {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.ZERO;

  const { re: a, im: b } = z.getComponents();

  return new Complex(Math.sinh(a) * Math.cos(b), Math.cosh(a) * Math.sin(b));
}
