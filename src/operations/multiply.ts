import Complex from '~/complex';
import isInfinite from '~/operations/isInfinite';
import isNaNC from '~/operations/isNaNC';
import isReal from '~/operations/isReal';
import isZero from '~/operations/isZero';

/**
 * Calculates z * w.
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
