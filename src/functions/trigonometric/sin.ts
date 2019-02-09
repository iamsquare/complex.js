import { Complex, isInfinite, isNaNC, isZero } from '../../';

/**
 * Calculates the sine of a Complex number.
 */
export default function sin(z: Complex): Complex {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.ZERO;

  const a: number = z.getRe();
  const b: number = z.getIm();

  return new Complex(Math.sin(a) * Math.cosh(b), Math.cos(a) * Math.sinh(b));
}
