import Complex from '../../complex';
import inverse from '../inverse';
import acos from '../inverseTrigonometric/acos';

/**
 * Calculates the inverse secant of a Complex number.
 */
export default function asec(z: Complex): Complex {
  return acos(inverse(z));
}
