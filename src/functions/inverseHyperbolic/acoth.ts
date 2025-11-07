import Complex from '~/complex';
import inverse from '~/functions/inverse';
import atanh from '~/functions/inverseHyperbolic/atanh';

/**
 * Calculates the inverse hyperbolic cotangent of a Complex number.
 */
export default function acoth(z: Complex) {
  return atanh(inverse(z));
}
