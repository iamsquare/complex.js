import Complex from '~/complex';
import log from '~/functions/log';
import sqrt from '~/functions/sqrt';
import isInfinite from '~/operations/isInfinite';
import isNaNC from '~/operations/isNaNC';
import isZero from '~/operations/isZero';

/**
 * Calculates the inverse hyperbolic cosine of a complex number: arcosh(z).
 *
 * Returns the principal value of the inverse hyperbolic cosine function. For real z ≥ 1,
 * this gives the standard inverse hyperbolic cosine. For complex z, it extends the function to the complex plane.
 *
 * @param z - The complex number.
 * @returns A new Complex number representing arcosh(z).
 *
 * @example
 * ```typescript
 * const z = new Complex(1, 0);
 * const result = acosh(z);
 * console.log(result.toString()); // => approximately "0 + 0i"
 * ```
 */
export default function acosh(z: Complex) {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return new Complex(0, Math.PI / 2);

  const a = z.getRe();
  const b = z.getIm();

  const s = sqrt(new Complex(a * a - b * b - 1, 2 * a * b));
  const l = log(new Complex(s.getRe() + a, s.getIm() + b));

  return new Complex(l.getRe(), l.getIm());
}
