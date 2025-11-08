import Complex from '~/complex';
import { isInfinite, isNaNC, isZero } from '~/operations';

/**
 * Calculates the hyperbolic secant of a Complex number.
 */
export default function sech(z: Complex) {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.ONE;

  // We avoid numeric cancellation by expanding the denominator and simplifying with trig rules.
  const a = z.getRe();
  const b = z.getIm();
  const d = Math.cosh(2 * a) + Math.cos(2 * b);

  return new Complex((2 * Math.cosh(a) * Math.cos(b)) / d, (-2 * Math.sinh(a) * Math.sin(b)) / d);
}
