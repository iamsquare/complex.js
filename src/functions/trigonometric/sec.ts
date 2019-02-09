import Complex from '../../complex';
import { isInfinite, isZero, isNaNC } from '../../operations';

/**
 * Calculates the secant of a Complex number.
 */
export default function sec(z: Complex): Complex {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.ONE;

  // We avoid numeric cancellation by expanding the denominator and simplifying with trigonometric rules.
  const a: number = z.getRe();
  const b: number = z.getIm();
  const d: number = Math.cos(2 * a) + Math.cosh(2 * b);

  return new Complex(
    (2 * (Math.cos(a) * Math.cosh(b))) / d,
    (2 * (Math.sin(a) * Math.sinh(b))) / d
  );
}
