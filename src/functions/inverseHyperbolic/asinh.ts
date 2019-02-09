import { Complex, isInfinite, isNaNC, isZero, sqrt, log } from '../../';

/**
 * Calculates the inverse hyperbolic sine of a Complex number.
 */
export default function asinh(z: Complex): Complex {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.ZERO;

  const a: number = z.getRe();
  const b: number = z.getIm();

  const s: Complex = sqrt(new Complex(a * a - b * b + 1, 2 * a * b));
  const l: Complex = log(new Complex(s.getRe() + a, s.getIm() + b));

  return new Complex(l.getRe(), l.getIm());
}
