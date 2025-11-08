import Complex from '~/complex';
import equals from '~/operations/equals';

/**
 * Returns true when z !== w.
 */
export default function notEquals(z: Complex, w: Complex) {
  return !equals(z, w);
}
