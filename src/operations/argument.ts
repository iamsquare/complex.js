import Complex from '~/complex';
import isInfinite from '~/operations/isInfinite';
import isNaNC from '~/operations/isNaNC';

/**
 * Gets the argument of a Complex number.
 */
export default function argument(z: Complex) {
  if (isNaNC(z)) return NaN;
  if (isInfinite(z)) return Infinity;

  return Math.atan2(z.getIm(), z.getRe());
}
