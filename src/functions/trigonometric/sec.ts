import Complex from '~/complex';
import { isInfinite, isNaNC, isZero } from '~/operations';

/**
 * Calculates the secant of a Complex number.
 */
export default function sec(z: Complex) {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.ONE;

  // We avoid numeric cancellation by expanding the denominator and simplifying with trigonometric rules.
  const a = z.getRe();
  const b = z.getIm();
  const d = Math.cos(2 * a) + Math.cosh(2 * b);

  return new Complex((2 * (Math.cos(a) * Math.cosh(b))) / d, (2 * (Math.sin(a) * Math.sinh(b))) / d);
}
