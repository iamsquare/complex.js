import { Complex } from '~/complex';
import { isInfinite, isNaNC, isZero } from '~/operations';

/**
 * Calculates the sine of a complex number: sin(z).
 *
 * For z = a + ib, sin(z) = sin(a)cosh(b) + i*cos(a)sinh(b).
 *
 * @param z - The complex number.
 * @returns A new Complex number representing sin(z).
 *
 * @example
 * ```typescript
 * const z = new Complex(Math.PI / 2, 0);
 * const result = sin(z);
 * console.log(result.toString()); // => approximately "1 + 0i"
 * ```
 */
export function sin(z: Complex) {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.ZERO;

  const { re: a, im: b } = z.getComponents();

  return new Complex(Math.sin(a) * Math.cosh(b), Math.cos(a) * Math.sinh(b));
}
