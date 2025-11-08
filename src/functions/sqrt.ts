import Complex from '~/complex';
import { argument, isInfinite, isNaNC, isZero, modulus } from '~/operations';

/**
 * Calculates the [principal value](https://en.wikipedia.org/wiki/Principal_value) of the square-root of a Complex number.
 * @todo Test if this implementation is better than the commented algebraic formula.
 */
export default function sqrt(z: Complex) {
  if (isNaNC(z)) return Complex.NAN;
  if (isInfinite(z)) return Complex.INFINITY;
  if (isZero(z)) return Complex.ZERO;

  const r = modulus(z);
  const p = argument(z);

  return new Complex((r / Math.sqrt(r)) * Math.cos(p / 2), (r / Math.sqrt(r)) * Math.sin(p / 2));
}
