import Complex from '../complex';
import isNaNC from './isNaNC';
import isInfinite from './isInfinite';
import isZero from './isZero';

/**
 * Calculates the Complex-conjugate of a Complex number.
 */
export default function conjugate(z: Complex): Complex {
  if (isNaNC(z)) return Complex.NAN;
  if (isInfinite(z)) return Complex.INFINITY;
  if (isZero(z)) return Complex.ZERO;

  return new Complex(z.getRe(), -z.getIm());
}
