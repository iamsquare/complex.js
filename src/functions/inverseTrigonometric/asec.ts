import Complex from '~/complex';
import inverse from '~/functions/inverse';
import acos from '~/functions/inverseTrigonometric/acos';

/**
 * Calculates the inverse secant of a Complex number.
 */
export default function asec(z: Complex) {
  return acos(inverse(z));
}
