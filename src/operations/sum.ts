import { Complex } from '~/complex';
import { add } from '~/operations/add';
import { isInfinite } from '~/operations/isInfinite';
import { isNaNC } from '~/operations/isNaNC';

/**
 * Sums multiple complex numbers.
 *
 * Performs component-wise addition of all provided complex numbers.
 * This is equivalent to repeatedly applying the `add` operation: z₁ + z₂ + z₃ + ... + zₙ.
 *
 * Special cases:
 * - Returns `Complex.ZERO` if no arguments are provided.
 * - Returns the single argument if only one is provided.
 * - Returns `Complex.NAN` if any number is NaN (NaN takes precedence over infinity).
 * - Returns `Complex.INFINITY` if any number is infinite (and none are NaN).
 *
 * @param numbers - The complex numbers to sum (zero or more arguments).
 * @returns A new Complex number representing the sum of all provided numbers.
 *
 * @example
 * ```typescript
 * const z1 = new Complex(1, 2);
 * const z2 = new Complex(3, 4);
 * const z3 = new Complex(5, 6);
 * const result = sum(z1, z2, z3);
 * console.log(result.toString()); // => "9 + 12i"
 * ```
 *
 * @example
 * ```typescript
 * // Sum with no arguments
 * const zero = sum();
 * console.log(zero.toString()); // => "0"
 * ```
 *
 * @example
 * ```typescript
 * // Sum with special values
 * const z = new Complex(1, 2);
 * const inf = Complex.INFINITY;
 * const result = sum(z, inf);
 * console.log(result.toString()); // => "Infinite"
 * ```
 */
export function sum(...numbers: Complex[]) {
  if (numbers.length === 0) return Complex.ZERO;
  if (numbers.length === 1) return numbers[0];
  if (numbers.some(isNaNC)) return Complex.NAN;
  if (numbers.some(isInfinite)) return Complex.INFINITY;

  return numbers.reduce(add, Complex.ZERO);
}
