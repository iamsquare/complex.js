import { Complex, inverse, asin } from '../../';

/**
 * Calculates the inverse cosecant of a Complex number.
 */
export default function acsc(z: Complex): Complex {
  return asin(inverse(z));
}
