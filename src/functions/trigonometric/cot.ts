import Complex from '~/complex';
import { isInfinite, isNaNC, isZero } from '~/operations';

/**
 * Calculates the cotangent of a Complex number.
 */
export default function cot(z: Complex) {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.INFINITY;

  // We avoid numeric cancellation by expanding the denominator and simplifying with trigonometric rules.
  const a2 = 2 * z.getRe();
  const b2 = 2 * z.getIm();
  const d = Math.cosh(b2) - Math.cos(a2);

  return new Complex(Math.sin(a2) / d, -Math.sinh(b2) / d);
}
