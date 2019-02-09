import { Complex, inverse, acosh } from '../../';

/**
 * Calculates the inverse hyperbolic secant of a Complex number.
 */
export default function asech(z: Complex): Complex {
  return acosh(inverse(z));
}
