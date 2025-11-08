import type { Complex } from '~/complex';
import { equals } from '~/operations/equals';

/**
 * Checks if two complex numbers are not equal: z !== w.
 *
 * This is the logical negation of the `equals` function.
 *
 * @param z - The first complex number.
 * @param w - The second complex number.
 * @returns `true` if z and w are not equal, `false` if they are equal.
 *
 * @example
 * ```typescript
 * const z1 = new Complex(1, 2);
 * const z2 = new Complex(3, 4);
 * console.log(notEquals(z1, z2)); // => true
 *
 * const z3 = new Complex(1, 2);
 * console.log(notEquals(z1, z3)); // => false
 * ```
 */
export function notEquals(z: Complex, w: Complex) {
  return !equals(z, w);
}
