import Complex from '~/complex';

/**
 * Returns true when a Complex number is NaN.
 */
export default function isNaNC(z: Complex) {
  return Number.isNaN(z.getRe()) || Number.isNaN(z.getIm());
}
