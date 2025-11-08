import Complex from '~/complex';
import log from '~/functions/log';
import sqrt from '~/functions/sqrt';
import isInfinite from '~/operations/isInfinite';
import isNaNC from '~/operations/isNaNC';
import isZero from '~/operations/isZero';

/**
 * Calculates the arcsine (inverse sine) of a complex number: arcsin(z).
 *
 * Returns the principal value of the inverse sine function. For real z in [-1, 1],
 * this gives the standard arcsine. For complex z, it extends the function to the complex plane.
 *
 * @param z - The complex number.
 * @returns A new Complex number representing arcsin(z).
 *
 * @example
 * ```typescript
 * const z = new Complex(1, 0);
 * const result = asin(z);
 * console.log(result.toString()); // => approximately "1.571 + 0i" (π/2)
 * ```
 */
export default function asin(z: Complex) {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.ZERO;

  const a = z.getRe();
  const b = z.getIm();

  const s = sqrt(new Complex(1 - a * a + b * b, -2 * a * b));
  const l = log(new Complex(s.getRe() - b, s.getIm() + a));

  return new Complex(l.getIm(), -l.getRe());
}
