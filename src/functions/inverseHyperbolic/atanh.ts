import { Complex } from '~/complex';
import { log } from '~/functions/log';
import { divide } from '~/operations';
import { isInfinite } from '~/operations/isInfinite';
import { isNaNC } from '~/operations/isNaNC';
import { isZero } from '~/operations/isZero';

/**
 * Calculates the inverse hyperbolic tangent of a complex number: artanh(z).
 *
 * Returns the principal value of the inverse hyperbolic tangent function. For real z in (-1, 1),
 * this gives the standard inverse hyperbolic tangent. For complex z, it extends the function to the complex plane.
 *
 * @param z - The complex number.
 * @returns A new Complex number representing artanh(z).
 *
 * @example
 * ```typescript
 * const z = new Complex(0, 0);
 * const result = atanh(z);
 * console.log(result.toString()); // => "0"
 * ```
 */
export function atanh(z: Complex) {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.ZERO;

  const a = z.getRe();
  const b = z.getIm();
  const d = (1 - a) * (1 - a) + b * b;

  return divide(log(new Complex((1 - a * a - b * b) / d, (2 * b) / d)), 2);
}
