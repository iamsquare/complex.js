import Complex from '~/complex';

/**
 * Returns true when a Complex number imaginary part is zero.
 */
export default function isReal(z: Complex) {
  return z.getIm() === 0;
}
