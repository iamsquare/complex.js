import Complex from '~/complex';
import log from '~/functions/log';
import isInfinite from '~/operations/isInfinite';
import isNaNC from '~/operations/isNaNC';
import isZero from '~/operations/isZero';

/**
 * Calculates the inverse tangent of a Complex number.
 */
export default function atan(z: Complex) {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.ZERO;

  // We can avoid using divide() by refactoring the denominator.
  const a = z.getRe();
  const b = z.getIm();
  const d = a * a + (1 - b) * (1 - b);
  const l = log(new Complex((1 - a * a - b * b) / d, (-2 * a) / d));

  return new Complex(-l.getIm() / 2, l.getRe() / 2);
}
