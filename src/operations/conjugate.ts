import Complex from '~/complex';
import isInfinite from '~/operations/isInfinite';
import isNaNC from '~/operations/isNaNC';
import isZero from '~/operations/isZero';

/**
 * Calculates the Complex-conjugate of a Complex number.
 */
export default function conjugate(z: Complex) {
  if (isNaNC(z)) return Complex.NAN;
  if (isInfinite(z)) return Complex.INFINITY;
  if (isZero(z)) return Complex.ZERO;

  return new Complex(z.getRe(), -z.getIm());
}
