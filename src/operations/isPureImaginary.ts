import Complex from '~/complex';

/**
 * Checks if a complex number is purely imaginary (has zero real part and non-zero imaginary part).
 *
 * A complex number is purely imaginary if its real part is exactly zero and its imaginary part is non-zero.
 * Note that zero (0 + 0i) is not considered purely imaginary.
 *
 * @param z - The complex number to check.
 * @returns `true` if z is purely imaginary (real part is zero and imaginary part is non-zero), `false` otherwise.
 *
 * @example
 * ```typescript
 * const z1 = new Complex(0, 5);
 * console.log(isPureImaginary(z1)); // => true
 *
 * const z2 = new Complex(3, 5);
 * console.log(isPureImaginary(z2)); // => false
 *
 * const z3 = new Complex(0, 0);
 * console.log(isPureImaginary(z3)); // => false (zero is not purely imaginary)
 * ```
 */
export default function isPureImaginary(z: Complex) {
  return z.getRe() === 0 && z.getIm() !== 0;
}
