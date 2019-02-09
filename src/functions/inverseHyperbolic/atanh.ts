import { Complex, isInfinite, isNaNC, isZero, log } from '../../';

/**
 * Calculates the inverse hyperbolic tangent of a Complex number.
 */
export default function atanh(z: Complex): Complex {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.ZERO;

  const a: number = z.getRe();
  const b: number = z.getIm();
  const d: number = (1 - a) * (1 - a) + b * b;

  const l: Complex = log(new Complex((1 - a * a - b * b) / d, (2 * b) / d));

  return new Complex(l.getRe() / 2, l.getIm() / 2);
}
