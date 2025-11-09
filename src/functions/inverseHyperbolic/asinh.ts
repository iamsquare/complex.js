import { Complex } from '~/complex';
import { log } from '~/functions/log';
import { sqrt } from '~/functions/sqrt';
import { add } from '~/operations/add';
import { isInfinite } from '~/operations/isInfinite';
import { isNaNC } from '~/operations/isNaNC';
import { isZero } from '~/operations/isZero';

/**
 * Calculates the inverse hyperbolic sine of a complex number: arsinh(z).
 *
 * Returns the principal value of the inverse hyperbolic sine function. For real z,
 * this gives the standard inverse hyperbolic sine. For complex z, it extends the function to the complex plane.
 *
 * @param z - The complex number.
 * @returns A new Complex number representing arsinh(z).
 *
 * @example
 * ```typescript
 * const z = new Complex(0, 0);
 * const result = asinh(z);
 * console.log(result.toString()); // => "0"
 * ```
 */
export function asinh(z: Complex) {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.ZERO;

  const { re: a, im: b } = z.getComponents();

  const s = sqrt(new Complex(a * a - b * b + 1, 2 * a * b));

  return log(add(s, z));
}
