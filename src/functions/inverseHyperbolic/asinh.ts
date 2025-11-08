import Complex from '~/complex';
import log from '~/functions/log';
import sqrt from '~/functions/sqrt';
import { add } from '~/operations';
import isInfinite from '~/operations/isInfinite';
import isNaNC from '~/operations/isNaNC';
import isZero from '~/operations/isZero';

/**
 * Calculates the inverse hyperbolic sine of a Complex number.
 */
export default function asinh(z: Complex) {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.ZERO;

  const a = z.getRe();
  const b = z.getIm();

  const s = sqrt(new Complex(a * a - b * b + 1, 2 * a * b));

  return log(add(s, z));
}
