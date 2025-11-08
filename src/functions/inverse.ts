import { Complex } from '~/complex';
import { isInfinite, isNaNC, isZero } from '~/operations';

/**
 * Calculates the multiplicative inverse (reciprocal) of a complex number: 1/z.
 *
 * For z = a + ib, the inverse is (a - ib) / (a² + b²), which is the conjugate divided by the modulus squared.
 *
 * @param z - The complex number.
 * @returns A new Complex number representing 1/z.
 *
 * @example
 * ```typescript
 * const z = new Complex(2, 3);
 * const inv = inverse(z);
 * const product = multiply(z, inv);
 * console.log(product.toString()); // => approximately "1 + 0i"
 * ```
 */
export function inverse(z: Complex) {
  if (isNaNC(z)) return Complex.NAN;
  if (isInfinite(z)) return Complex.ZERO;
  if (isZero(z)) return Complex.INFINITY;

  const a = z.getRe();
  const b = z.getIm();
  const d = a * a + b * b;

  return new Complex(a / d, -b / d);
}
