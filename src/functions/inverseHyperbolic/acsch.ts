import Complex from '../../complex';
import inverse from '../inverse';
import asinh from './asinh';
/**
 * Calculates the inverse hyperbolic cosecant of a Complex number.
 */
export default function acsch(z: Complex): Complex {
  return asinh(inverse(z));
}
