import { Complex } from '~/complex';
import { argument } from '~/operations/argument';
import { conjugate } from '~/operations/conjugate';
import { divide } from '~/operations/divide';
import { isInfinite } from '~/operations/isInfinite';
import { isNaNC } from '~/operations/isNaNC';
import { isZero } from '~/operations/isZero';
import { modulus } from '~/operations/modulus';
import { pythagoras } from '~/operations/pythagoras';

/**
 * Calculates the principal value of the n-th root of a complex number: ⁿ√z.
 *
 * This function computes a special case of the n-th root operation, returning only the
 * [principal value](https://en.wikipedia.org/wiki/Principal_value) of the n-th root.
 * For z = r * e^(iθ), the principal n-th root is: ⁿ√z = ⁿ√r * e^(iθ/n), where r is the
 * modulus and θ is the argument.
 *
 * The n-th root of a complex number has n distinct values, but this function returns only
 * the principal value (k=0). To get all n roots, use the formula:
 * ⁿ√z = ⁿ√r * e^(i(θ + 2πk)/n) for k = 0, 1, 2, ..., n-1
 *
 * @param z - The complex number or real number.
 * @param n - The root index. For positive n, returns the n-th root. For negative n, returns the reciprocal of the |n|-th root (1/ⁿ√z). Must be a non-zero finite number.
 * @returns A new Complex number representing the principal n-th root of z (or its reciprocal if n is negative).
 *
 * @example
 * ```typescript
 * const z = new Complex(8, 0);
 * const result = principal(z, 3);
 * console.log(result.toString()); // => "2 + 0i" (cube root of 8)
 *
 * const z2 = new Complex(-1, 0);
 * const result2 = principal(z2, 2);
 * console.log(result2.toString()); // => "0 + 1i" (square root of -1, which is i)
 *
 * const z3 = new Complex(1, 1);
 * const result3 = principal(z3, 4);
 * console.log(result3.toString()); // => principal 4th root
 *
 * // Negative n returns the reciprocal root
 * const z4 = new Complex(4, 0);
 * const result4 = principal(z4, -2); // 1 / sqrt(4) = 1/2
 * console.log(result4.toString()); // => "0.5 + 0i"
 * ```
 */
export function principal(z: Complex | number, n: number): Complex {
  const zc = z instanceof Complex ? z : new Complex(z, 0);

  if (isNaNC(zc)) return Complex.NAN;
  if (Number.isNaN(n) || !Number.isFinite(n)) return Complex.NAN;
  if (n === 0) return Complex.NAN;
  if (isInfinite(zc) && n > 0) return Complex.INFINITY;
  if (isInfinite(zc) && n < 0) return Complex.ZERO;
  if (isZero(zc) && n > 0) return Complex.ZERO;
  if (isZero(zc) && n < 0) return Complex.INFINITY;

  if (n === 1) return zc;

  const absN = Math.abs(n);

  if (n < 0) {
    const r = modulus(zc);
    const p = argument(zc);
    const nthRootR = Math.pow(r, 1 / absN);
    const positiveRoot = new Complex(nthRootR * Math.cos(p / absN), nthRootR * Math.sin(p / absN));

    if (isNaNC(positiveRoot) || isZero(positiveRoot)) return Complex.NAN;
    if (isInfinite(positiveRoot)) return Complex.ZERO;

    return divide(conjugate(positiveRoot), pythagoras(positiveRoot));
  }

  const r = modulus(zc);
  const p = argument(zc);
  const nthRootR = Math.pow(r, 1 / n);

  return new Complex(nthRootR * Math.cos(p / n), nthRootR * Math.sin(p / n));
}
