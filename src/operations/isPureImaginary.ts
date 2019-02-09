import { Complex } from '../';

/**
 * Returns true when a Complex number real part is zero.
 */
export default function isPureImaginary(z: Complex): boolean {
  return z.getRe() === 0 && z.getIm() !== 0;
}
