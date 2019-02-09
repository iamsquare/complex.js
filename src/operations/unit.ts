import Complex from '../complex';
import isNaNC from './isNaNC';
import isInfinite from './isInfinite';
import isZero from './isZero';
import modulus from './modulus';

/**
 * Calculates the unit vector of a Complex number.
 */
export default function unit(z: Complex): Complex {
  if (isNaNC(z) || isZero(z)) return Complex.NAN;
  if (isInfinite(z)) return Complex.INFINITY;

  const m: number = modulus(z);

  return new Complex(z.getRe() / m, z.getIm() / m);
}
