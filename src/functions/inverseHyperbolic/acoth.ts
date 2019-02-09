import { Complex, inverse, atanh } from '../../';

/**
 * Calculates the inverse hyperbolic cotangent of a Complex number.
 */
export default function acoth(z: Complex): Complex {
  return atanh(inverse(z));
}
