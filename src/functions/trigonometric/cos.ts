import { Complex, isInfinite, isNaNC, isZero } from '../../';

/**
 * Calculates the cosine of a Complex number.
 */
export default function cos(z: Complex): Complex {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.ONE;

  const a: number = z.getRe();
  const b: number = z.getIm();

  return new Complex(Math.cos(a) * Math.cosh(b), -Math.sin(a) * Math.sinh(b));
}
