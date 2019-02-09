import Complex from '../complex';

/**
 * Calculates the modulus of a Complex number.
 */
export default function modulus(z: Complex): number {
  return Math.hypot(z.getRe(), z.getIm());
}
