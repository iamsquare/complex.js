import Complex from '~/complex';
import { isInfinite, isNaNC, isZero } from '~/operations';

/**
 * Calculates 1 / z.
 */
export default function inverse(z: Complex) {
  if (isNaNC(z)) return Complex.NAN;
  if (isInfinite(z)) return Complex.ZERO;
  if (isZero(z)) return Complex.INFINITY;

  const a = z.getRe();
  const b = z.getIm();
  const d = a * a + b * b;

  return new Complex(a / d, -b / d);
}
