import { Complex } from '~/complex';
import { isInfinite } from '~/operations/isInfinite';
import { isNaNC } from '~/operations/isNaNC';
import { isZero } from '~/operations/isZero';
import { modulus } from '~/operations/modulus';

/**
 * Calculates the unit vector (normalized) of a complex number: z / |z|.
 *
 * Returns a complex number with the same direction (argument) as z but with modulus 1.
 * This is equivalent to dividing z by its modulus.
 *
 * @param z - The complex number.
 * @returns A new Complex number with modulus 1 and the same argument as z, or Complex.NAN if z is zero or NaN.
 *
 * @example
 * ```typescript
 * const z = new Complex(3, 4);
 * const u = unit(z);
 * console.log(modulus(u)); // => 1 (approximately)
 * console.log(argument(u)); // => same as argument(z)
 * ```
 */
export function unit(z: Complex) {
  if (isNaNC(z) || isZero(z)) return Complex.NAN;
  if (isInfinite(z)) return Complex.INFINITY;

  const m = modulus(z);

  return new Complex(z.getRe() / m, z.getIm() / m);
}
