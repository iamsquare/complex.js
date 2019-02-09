import Complex from '../complex';
import isNaNC from './isNaNC';
import isInfinite from './isInfinite';

/**
 * Calculates z - w.
 */
export default function subtract(z: Complex, w: Complex): Complex {
  if (isNaNC(z) || isNaNC(w) || (isInfinite(z) && isInfinite(w))) {
    return Complex.NAN;
  }
  if (isInfinite(z) || isInfinite(w)) return Complex.INFINITY;

  const a: number = z.getRe();
  const b: number = z.getIm();
  const c: number = w.getRe();
  const d: number = w.getIm();

  return new Complex(a - c, b - d);
}
