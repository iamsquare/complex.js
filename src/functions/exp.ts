import Complex from '~/complex';
import { isInfinite, isNaNC, isZero } from '~/operations';

/**
 * Calculates e^z.
 */
export default function exp(z: Complex) {
  if (isNaNC(z) || isInfinite(z)) return Complex.NAN;
  if (isZero(z)) return Complex.ONE;

  return new Complex({ r: Math.exp(z.getRe()), p: z.getIm() });
}
