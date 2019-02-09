import { Complex, isInfinite, isZero, isNaNC } from '../';

/**
 * Negates a Complex number.
 */
export default function negate(z: Complex): Complex {
  if (isNaNC(z)) return Complex.NAN;
  if (isInfinite(z)) return Complex.INFINITY;
  if (isZero(z)) return Complex.ZERO;

  return new Complex(-z.getRe(), -z.getIm());
}
