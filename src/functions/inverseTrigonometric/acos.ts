import Complex from '~/complex';
import asin from '~/functions/inverseTrigonometric/asin';
import subtract from '~/operations/subtract';

/**
 * Calculates the inverse cosine of a Complex number.
 */
export default function acos(z: Complex) {
  return subtract(Complex.HALFPI, asin(z));
}
