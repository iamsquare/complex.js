import Complex from '../complex';
import isNaNC from './isNaNC';
import isInfinite from './isInfinite';

/**
 * Gets the argument of a Complex number.
 */
export default function argument(z: Complex): number {
  if (isNaNC(z)) return NaN;
  if (isInfinite(z)) return Infinity;

  return Math.atan2(z.getIm(), z.getRe());
}
