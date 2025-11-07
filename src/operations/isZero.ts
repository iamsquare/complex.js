import Complex from '~/complex';

/**
 * Returns true when a Complex number real and imaginary part are zero.
 */
export default function isZero(z: Complex) {
  return z.getRe() === 0 && z.getIm() === 0;
}
