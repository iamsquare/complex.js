import Complex from '../complex';
import isNaNC from './isNaNC';
import isReal from './isReal';
import isInfinite from './isInfinite';
import isZero from './isZero';

/**
 * Calculates z * w.
 */
export default function multiply(
  z: Complex | number,
  w: Complex | number
): Complex {
  const zc: Complex | number = z instanceof Complex ? z : new Complex(z, 0);
  const wc: Complex | number = w instanceof Complex ? w : new Complex(w, 0);

  if (
    isNaNC(zc) ||
    isNaNC(wc) ||
    (isZero(zc) && isInfinite(wc)) ||
    (isInfinite(zc) && isZero(wc))
  ) {
    return Complex.NAN;
  }

  if (isInfinite(zc) || isInfinite(wc)) return Complex.INFINITY;
  if (isZero(zc) || isZero(wc)) return Complex.ZERO;
  if (isReal(zc) && isReal(wc)) return new Complex(zc.getRe() * wc.getRe(), 0);

  const a: number = zc.getRe();
  const b: number = zc.getIm();
  const c: number = wc.getRe();
  const d: number = wc.getIm();

  return new Complex(a * c - b * d, a * d + b * c);
}
