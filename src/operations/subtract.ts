import Complex from '~/complex';
import isInfinite from '~/operations/isInfinite';
import isNaNC from '~/operations/isNaNC';

/**
 * Calculates z - w.
 */
export default function subtract(z: Complex, w: Complex) {
  if (isNaNC(z) || isNaNC(w) || (isInfinite(z) && isInfinite(w))) {
    return Complex.NAN;
  }
  if (isInfinite(z) || isInfinite(w)) return Complex.INFINITY;

  const a = z.getRe();
  const b = z.getIm();
  const c = w.getRe();
  const d = w.getIm();

  return new Complex(a - c, b - d);
}
