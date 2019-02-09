import { Complex, inverse, acos } from '../../';

/**
 * Calculates the inverse secant of a Complex number.
 */
export default function asec(z: Complex): Complex {
  return acos(inverse(z));
}
