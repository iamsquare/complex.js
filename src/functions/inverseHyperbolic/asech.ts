import Complex from '../../complex';
import inverse from '../inverse';
import acosh from './acosh';
/**
 * Calculates the inverse hyperbolic secant of a Complex number.
 */
export default function asech(z: Complex): Complex {
  return acosh(inverse(z));
}
