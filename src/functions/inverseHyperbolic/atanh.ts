import Complex from '~/complex';
import log from '~/functions/log';
import { divide } from '~/operations';
import isInfinite from '~/operations/isInfinite';
import isNaNC from '~/operations/isNaNC';
import isZero from '~/operations/isZero';

/**
 * Calculates the inverse hyperbolic tangent of a Complex number.
 */
export default function atanh(z: Complex) {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.ZERO;

  const a = z.getRe();
  const b = z.getIm();
  const d = (1 - a) * (1 - a) + b * b;

  return divide(log(new Complex((1 - a * a - b * b) / d, (2 * b) / d)), 2);
}
