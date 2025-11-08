import Complex from '~/complex';
import { argument, equals, isInfinite, isZero, multiply, notEquals, pythagoras } from '~/operations';

/**
 * Calculates the power of a complex number: z^w.
 *
 * Computes z raised to the power of w. Also accepts real numbers, which are treated
 * as complex numbers with zero imaginary part. The result is computed using the formula:
 * z^w = e^(w * ln(z)).
 *
 * @param z - The base complex number or real number.
 * @param w - The exponent complex number or real number.
 * @returns A new Complex number representing z^w.
 *
 * @example
 * ```typescript
 * const z = new Complex(1, 1);
 * const w = new Complex(2, 0);
 * const result = pow(z, w);
 * console.log(result.toString()); // => "0 + 2i" (approximately)
 *
 * // Real number exponent
 * const result2 = pow(z, 2);
 * console.log(result2.toString()); // => same as above
 * ```
 */
export default function pow(z: Complex | number, w: Complex | number) {
  const zc = z instanceof Complex ? z : new Complex(z, 0);
  const wc = w instanceof Complex ? w : new Complex(w, 0);

  if (isZero(zc) && !isZero(wc)) return Complex.ZERO;
  if (!isZero(zc) && !isInfinite(zc) && isZero(wc)) return Complex.ONE;
  if (!isZero(zc) && notEquals(zc, Complex.ONE) && isInfinite(wc)) {
    return Complex.INFINITY;
  }

  if ((equals(zc, Complex.ONE) && isInfinite(wc)) || (isZero(zc) && isZero(wc)) || (isInfinite(zc) && isZero(wc))) {
    return Complex.NAN;
  }

  const c = wc.getRe();
  const d = wc.getIm();

  const pyt = pythagoras(zc);
  const arg = argument(zc);
  const par = c * arg + (d / 2) * Math.log(pyt);

  const m = Math.pow(pyt, c / 2) * Math.exp(-d * arg);

  return multiply(m, new Complex(Math.cos(par), Math.sin(par)));
}
