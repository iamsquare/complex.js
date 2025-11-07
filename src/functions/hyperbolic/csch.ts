import Complex from '~/complex';
import { isInfinite, isNaNC, isZero } from '~/operations';

/**
 * Calculates the hyperbolic cosecant of a Complex number.
 */
export default function csch(z: Complex) {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.INFINITY;

  // We avoid numeric cancellation by expanding the denominator and simplifying with trig rules.
  const a = z.getRe();
  const b = z.getIm();
  const d = Math.cos(2 * b) - Math.cosh(2 * a);

  return new Complex((-2 * Math.sinh(a) * Math.cos(b)) / d, (2 * Math.cosh(a) * Math.sin(b)) / d);
}
