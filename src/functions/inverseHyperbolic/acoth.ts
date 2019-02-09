import Complex from '../../complex';
import inverse from '../inverse';
import atanh from './atanh';

/**
 * Calculates the inverse hyperbolic cotangent of a Complex number.
 */
export default function acoth(z: Complex): Complex {
  return atanh(inverse(z));
}
