import Complex from '../../complex';
import subtract from '../../operations/subtract';
import atan from '../inverseTrigonometric/atan';

/**
 * Calculates the inverse cotangent of a Complex number.
 */
export default function acot(z: Complex): Complex {
  return subtract(Complex.HALFPI, atan(z));
}
