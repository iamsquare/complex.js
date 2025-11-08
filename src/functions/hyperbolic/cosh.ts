import Complex from '~/complex';
import { isInfinite, isNaNC, isZero } from '~/operations';

/**
 * Calculates the hyperbolic cosine of a Complex number.
 */
export default function cosh(z: Complex) {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.ONE;

  const a = z.getRe();
  const b = z.getIm();

  return new Complex(Math.cosh(a) * Math.cos(b), Math.sinh(a) * Math.sin(b));
}
