import { Complex, isInfinite, isZero, isNaNC, log } from '../../';

/**
 * Calculates the inverse tangent of a Complex number.
 */
export default function atan(z: Complex): Complex {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.ZERO;

  // We can avoid using divide() by refactoring the denominator.
  const a: number = z.getRe();
  const b: number = z.getIm();
  const d: number = a * a + (1 - b) * (1 - b);
  const l: Complex = log(new Complex((1 - a * a - b * b) / d, (-2 * a) / d));

  return new Complex(-l.getIm() / 2, l.getRe() / 2);
}
