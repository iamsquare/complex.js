import Complex from '~/complex';
import atan from '~/functions/inverseTrigonometric/atan';
import subtract from '~/operations/subtract';

/**
 * Calculates the inverse cotangent of a Complex number.
 */
export default function acot(z: Complex) {
  return subtract(Complex.HALFPI, atan(z));
}
