import { Complex } from '~/complex';
import { log } from '~/functions/log';
import { isInfinite } from '~/operations/isInfinite';
import { isNaNC } from '~/operations/isNaNC';
import { isZero } from '~/operations/isZero';

/**
 * Calculates the arctangent (inverse tangent) of a complex number: arctan(z).
 *
 * Returns the principal value of the inverse tangent function. For real z,
 * this gives the standard arctangent. For complex z, it extends the function to the complex plane.
 *
 * @param z - The complex number.
 * @returns A new Complex number representing arctan(z).
 *
 * @example
 * ```typescript
 * const z = new Complex(1, 0);
 * const result = atan(z);
 * console.log(result.toString()); // => approximately "0.785 + 0i" (π/4)
 * ```
 */
export function atan(z: Complex) {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.ZERO;

  // We can avoid using divide() by refactoring the denominator.
  const a = z.getRe();
  const b = z.getIm();
  const d = a * a + (1 - b) * (1 - b);
  const l = log(new Complex((1 - a * a - b * b) / d, (-2 * a) / d));

  return new Complex(-l.getIm() / 2, l.getRe() / 2);
}
