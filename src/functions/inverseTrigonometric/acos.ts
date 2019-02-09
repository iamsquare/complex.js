import { Complex, subtract, asin } from '../../';

/**
 * Calculates the inverse cosine of a Complex number.
 */
export default function acos(z: Complex): Complex {
  return subtract(Complex.HALFPI, asin(z));
}
