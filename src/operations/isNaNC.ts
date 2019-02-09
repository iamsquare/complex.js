import { Complex } from '..';

/**
 * Returns true when a Complex number is NaN.
 */
export default function isNaNC(z: Complex): boolean {
  return Number.isNaN(z.getRe()) || Number.isNaN(z.getIm());
}
