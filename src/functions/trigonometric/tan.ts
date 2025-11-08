import Complex from '~/complex';
import { isInfinite, isNaNC, isZero } from '~/operations';

/**
 * Calculates the tangent of a Complex number.
 */
export default function tan(z: Complex) {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.ZERO;

  // We avoid numeric cancellation by expanding the denominator and simplifying with trigonometric rules.
  const a2 = 2 * z.getRe();
  const b2 = 2 * z.getIm();
  const d = Math.cos(a2) + Math.cosh(b2);

  return new Complex(Math.sin(a2) / d, Math.sinh(b2) / d);
}
