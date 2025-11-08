import Complex from '~/complex';
import log from '~/functions/log';
import sqrt from '~/functions/sqrt';
import isInfinite from '~/operations/isInfinite';
import isNaNC from '~/operations/isNaNC';
import isZero from '~/operations/isZero';

/**
 * Calculates the inverse sine of a Complex number.
 */
export default function asin(z: Complex) {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.ZERO;

  const a = z.getRe();
  const b = z.getIm();

  const s = sqrt(new Complex(1 - a * a + b * b, -2 * a * b));
  const l = log(new Complex(s.getRe() - b, s.getIm() + a));

  return new Complex(l.getIm(), -l.getRe());
}
