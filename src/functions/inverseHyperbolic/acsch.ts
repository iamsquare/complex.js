import { Complex, inverse, asinh } from '../../';

/**
 * Calculates the inverse hyperbolic cosecant of a Complex number.
 */
export default function acsch(z: Complex): Complex {
  return asinh(inverse(z));
}
