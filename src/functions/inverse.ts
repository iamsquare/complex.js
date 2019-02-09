import { Complex, isNaNC, isInfinite, isZero } from '../';

/**
 * Calculates 1 / z.
 */
export default function inverse(z: Complex): Complex {
  if (isNaNC(z)) return Complex.NAN;
  if (isInfinite(z)) return Complex.ZERO;
  if (isZero(z)) return Complex.INFINITY;

  const a: number = z.getRe();
  const b: number = z.getIm();
  const d: number = a * a + b * b;

  return new Complex(a / d, -b / d);
}
