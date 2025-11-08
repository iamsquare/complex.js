import Complex from '~/complex';
import { isInfinite, isNaNC, isZero } from '~/operations';

/**
 * Calculates the cosine of a Complex number.
 */
export default function cos(z: Complex) {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.ONE;

  const a = z.getRe();
  const b = z.getIm();

  return new Complex(Math.cos(a) * Math.cosh(b), -Math.sin(a) * Math.sinh(b));
}
