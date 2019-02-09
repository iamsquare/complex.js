import Complex from '../../complex';
import inverse from '../inverse';
import asin from '../inverseTrigonometric/asin';

/**
 * Calculates the inverse cosecant of a Complex number.
 */
export default function acsc(z: Complex): Complex {
  return asin(inverse(z));
}
