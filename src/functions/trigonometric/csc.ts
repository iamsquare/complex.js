import Complex from '~/complex';
import { isInfinite, isNaNC, isZero } from '~/operations';
/**
 * Calculates the cosecant of a Complex number.
 */
export default function csc(z: Complex) {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.INFINITY;

  // We avoid numeric cancellation by expanding the denominator and simplifying with trigonometric rules.
  const a = z.getRe();
  const b = z.getIm();
  const d = Math.cosh(2 * b) - Math.cos(2 * a);

  return new Complex((2 * (Math.sin(a) * Math.cosh(b))) / d, -(2 * (Math.cos(a) * Math.sinh(b))) / d);
}
