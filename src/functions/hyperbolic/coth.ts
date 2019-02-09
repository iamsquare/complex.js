import Complex from '../../complex';
import { isInfinite, isNaNC, isZero } from '../../operations';

/**
 * Calculates the hyperbolic cotangent of a Complex number.
 */
export default function coth(z: Complex): Complex {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.INFINITY;

  // We avoid numeric cancellation by expanding the denominator and simplifying with trig rules.
  const a2: number = 2 * z.getRe();
  const b2: number = 2 * z.getIm();
  const d: number = Math.cos(b2) - Math.cosh(a2);

  return new Complex(-Math.sinh(a2) / d, Math.sin(b2) / d);
}
