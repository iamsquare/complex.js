import Complex from '../../complex';
import { isInfinite, isNaNC, isZero } from '../../operations';

/**
 * Calculates the hyperbolic cosine of a Complex number.
 */
export default function cosh(z: Complex): Complex {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.ONE;

  const a: number = z.getRe();
  const b: number = z.getIm();

  return new Complex(Math.cosh(a) * Math.cos(b), Math.sinh(a) * Math.sin(b));
}
