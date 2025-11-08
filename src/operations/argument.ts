import type { Complex } from '~/complex';
import { isInfinite } from '~/operations/isInfinite';
import { isNaNC } from '~/operations/isNaNC';

/**
 * Gets the argument (phase angle) of a complex number: arg(z).
 *
 * The argument is the angle in radians between the positive real axis and the line
 * from the origin to the point representing the complex number. It is computed using
 * Math.atan2(imaginary, real), which returns a value in the range [-π, π].
 *
 * @param z - The complex number.
 * @returns The argument (phase angle) in radians, or NaN/Infinity for special cases.
 *
 * @example
 * ```typescript
 * const z = new Complex(1, 1);
 * const arg = argument(z);
 * console.log(arg); // => ~0.785 (π/4 radians)
 * ```
 */
export function argument(z: Complex) {
  if (isNaNC(z)) return NaN;
  if (isInfinite(z)) return Infinity;

  return Math.atan2(z.getIm(), z.getRe());
}
