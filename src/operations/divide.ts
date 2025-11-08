import Complex from '~/complex';
import isInfinite from '~/operations/isInfinite';
import isNaNC from '~/operations/isNaNC';
import isZero from '~/operations/isZero';

/**
 * Divides two complex numbers or a complex number by a real number: z / w.
 *
 * Uses a [modified Smith's Method](http://forge.scilab.org/index.php/p/compdiv/source/tree/21/doc/improved_cdiv.pdf)
 * to avoid numerical overflow and underflow issues in complex division.
 * Also accepts real numbers, which are treated as complex numbers with zero imaginary part.
 *
 * @param z - The complex number to divide (dividend).
 * @param w - The complex number or real number to divide by (divisor).
 * @returns A new Complex number representing z / w.
 *
 * @example
 * ```typescript
 * const z = new Complex(1, 2);
 * const w = new Complex(3, 4);
 * const quotient = divide(z, w);
 * console.log(quotient.toString()); // => "0.44 + 0.08i" (approximately)
 *
 * // Divide by a real number
 * const realQuotient = divide(z, 2);
 * console.log(realQuotient.toString()); // => "0.5 + 1i"
 * ```
 *
 * @todo Test if this implementation is actually SO better than the original Smith's method.
 */
export default function divide(z: Complex | number, w: Complex | number) {
  const zc = z instanceof Complex ? z : new Complex(z, 0);
  const wc = w instanceof Complex ? w : new Complex(w, 0);

  if ((isZero(zc) && isZero(wc)) || (isInfinite(zc) && isInfinite(wc)) || isNaNC(zc) || isNaNC(wc)) {
    return Complex.NAN;
  }

  if (isInfinite(zc) || isZero(wc)) return Complex.INFINITY;
  if (isZero(zc) || isInfinite(wc)) return Complex.ZERO;

  const a = zc.getRe();
  const b = zc.getIm();
  const c = wc.getRe();
  const d = wc.getIm();

  let r;
  let t;

  if (Math.abs(d) < Math.abs(c)) {
    r = d / c;
    t = 1 / (c + d * r);

    if (r === 0) {
      return new Complex((a + d * (b / c)) * t, (b - d * (a / c)) * t);
    }
    return new Complex((a + b * r) * t, (b - a * r) * t);
  }

  r = c / d;
  t = 1 / (c * r + d);

  if (r === 0) {
    return new Complex((c * (a / d) + b) * t, (c * (b / d) - a) * t);
  }
  return new Complex((a * r + b) * t, (b * r - a) * t);
}
