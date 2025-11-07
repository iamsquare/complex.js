import Complex from '~/complex';
import inverse from '~/functions/inverse';
import asin from '~/functions/inverseTrigonometric/asin';

/**
 * Calculates the inverse cosecant of a Complex number.
 */
export default function acsc(z: Complex) {
  return asin(inverse(z));
}
