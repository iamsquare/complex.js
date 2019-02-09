import Complex from '../../complex';
import isInfinite from '../../operations/isInfinite';
import isZero from '../../operations/isZero';
import isNaNC from '../../operations/isNaNC';
import log from '../log';
import sqrt from '../sqrt';

/**
 * Calculates the inverse sine of a Complex number.
 */
export default function asin(z: Complex): Complex {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.ZERO;

  const a: number = z.getRe();
  const b: number = z.getIm();

  const s: Complex = sqrt(new Complex(1 - a * a + b * b, -2 * a * b));
  const l: Complex = log(new Complex(s.getRe() - b, s.getIm() + a));

  return new Complex(l.getIm(), -l.getRe());
}
