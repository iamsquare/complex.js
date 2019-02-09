import { Complex, subtract, atan } from '../../';

/**
 * Calculates the inverse cotangent of a Complex number.
 */
export default function acot(z: Complex): Complex {
  return subtract(Complex.HALFPI, atan(z));
}
