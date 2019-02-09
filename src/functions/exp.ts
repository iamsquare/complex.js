import { Complex, isNaNC, isInfinite, isZero } from '../';

/**
 * Calculates e^z.
 */
export default function exp(z: Complex): Complex {
  if (isNaNC(z) || isInfinite(z)) return Complex.NAN;
  if (isZero(z)) return Complex.ONE;

  return new Complex({ r: Math.exp(z.getRe()), p: z.getIm() });
}
