import Complex from '~/complex';
import isInfinite from '~/operations/isInfinite';
import isNaNC from '~/operations/isNaNC';
import isReal from '~/operations/isReal';
import isZero from '~/operations/isZero';

/**
 * Multiplies two complex numbers or a complex number with a real number: z * w.
 *
 * Performs complex multiplication: (a + ib) * (c + id) = (ac - bd) + i(ad + bc).
 * Also accepts real numbers, which are treated as complex numbers with zero imaginary part.
 *
 * @param z - The first complex number or real number.
 * @param w - The second complex number or real number.
 * @returns A new Complex number representing z * w.
 *
 * @example
 * ```typescript
 * const z = new Complex(1, 2);
 * const w = new Complex(3, 4);
 * const product = multiply(z, w);
 * console.log(product.toString()); // => "-5 + 10i"
 *
 * // Multiply with a real number
 * const realProduct = multiply(z, 5);
 * console.log(realProduct.toString()); // => "5 + 10i"
 * ```
 */
export default function multiply(z: Complex | number, w: Complex | number) {
  const zc = z instanceof Complex ? z : new Complex(z, 0);
  const wc = w instanceof Complex ? w : new Complex(w, 0);

  if (isNaNC(zc) || isNaNC(wc) || (isZero(zc) && isInfinite(wc)) || (isInfinite(zc) && isZero(wc))) {
    return Complex.NAN;
  }

  if (isInfinite(zc) || isInfinite(wc)) return Complex.INFINITY;
  if (isZero(zc) || isZero(wc)) return Complex.ZERO;
  if (isReal(zc) && isReal(wc)) return new Complex(zc.getRe() * wc.getRe(), 0);

  const a = zc.getRe();
  const b = zc.getIm();
  const c = wc.getRe();
  const d = wc.getIm();

  return new Complex(a * c - b * d, a * d + b * c);
}
