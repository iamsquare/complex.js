import Complex from '~/complex';
import { argument, equals, isInfinite, isNaNC, isZero, modulus } from '~/operations';

/**
 * Calculates the [principal value](https://en.wikipedia.org/wiki/Principal_value) of Ln(z).
 */
export default function log(z: Complex) {
  if (isNaNC(z) || isZero(z)) return Complex.NAN;
  if (isInfinite(z)) return Complex.INFINITY;
  if (equals(z, Complex.ONE)) return Complex.ZERO;

  return new Complex(Math.log(modulus(z)), argument(z));
}
