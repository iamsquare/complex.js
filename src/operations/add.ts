import { Complex, isNaNC, isInfinite } from '../';

/**
 * Calculates z + w.
 */
export default function add(z: Complex, w: Complex): Complex {
  if (isNaNC(z) || isNaNC(w) || (isInfinite(z) && isInfinite(w))) {
    return Complex.NAN;
  }
  if (isInfinite(z) || isInfinite(w)) return Complex.INFINITY;

  return new Complex(z.getRe() + w.getRe(), z.getIm() + w.getIm());
}
