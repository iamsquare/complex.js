import Complex from '../../complex';
import subtract from '../../operations/subtract';
import asin from '../inverseTrigonometric/asin';

/**
 * Calculates the inverse cosine of a Complex number.
 */
export default function acos(z: Complex): Complex {
  return subtract(Complex.HALFPI, asin(z));
}
