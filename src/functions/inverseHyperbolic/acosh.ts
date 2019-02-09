import { Complex, isInfinite, isNaNC, isZero, sqrt, log } from '../../';

/**
 * Calculates the inverse hyperbolic cosine of a Complex number.
 */
export default function acosh(z: Complex): Complex {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return new Complex(0, Math.PI / 2);

  const a: number = z.getRe();
  const b: number = z.getIm();

  const s: Complex = sqrt(new Complex(a * a - b * b - 1, 2 * a * b));
  const l: Complex = log(new Complex(s.getRe() + a, s.getIm() + b));

  return new Complex(l.getRe(), l.getIm());
}
