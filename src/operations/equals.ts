import { Complex, isInfinite, isNaNC } from '../';

/**
 * Returns true when z === w.
 */
export default function equals(z: Complex, w: Complex): boolean {
  if (isInfinite(z) && isInfinite(w)) return true;
  if (isNaNC(z) || isNaNC(w)) return false;

  // TODO: check if it should be done like this
  return (
    Math.abs(z.getRe() - w.getRe()) <= Complex.EPSILON &&
    Math.abs(z.getIm()- w.getIm()) <= Complex.EPSILON
  );
}
