import Complex from '~/complex';
import isInfinite from '~/operations/isInfinite';
import isNaNC from '~/operations/isNaNC';
import isZero from '~/operations/isZero';
import modulus from '~/operations/modulus';

/**
 * Calculates the unit vector of a Complex number.
 */
export default function unit(z: Complex) {
  if (isNaNC(z) || isZero(z)) return Complex.NAN;
  if (isInfinite(z)) return Complex.INFINITY;

  const m = modulus(z);

  return new Complex(z.getRe() / m, z.getIm() / m);
}
