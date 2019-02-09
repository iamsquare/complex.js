import Complex from '../complex';

/**
 * Calculates the modulus squared of a Complex number.
 */
export default function pythagoras(z: Complex): number {
  return z.getRe() * z.getRe() + z.getIm() * z.getIm();
}
