import { Complex } from '~/complex';
import { log } from '~/functions/log';
import { sqrt } from '~/functions/sqrt';
import { conjugate } from '~/operations/conjugate';
import { flip } from '~/operations/flip';
import { isInfinite } from '~/operations/isInfinite';
import { isNaNC } from '~/operations/isNaNC';
import { isZero } from '~/operations/isZero';
import { subtract } from '~/operations/subtract';

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
export function asin(z: Complex) {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.ZERO;

  const { re: a, im: b } = z.getComponents();

  const s = sqrt(new Complex(1 - a * a + b * b, -2 * a * b));

  return conjugate(flip(log(subtract(s, new Complex(b, -a)))));
}
