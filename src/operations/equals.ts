import { Complex, isInfinite, isNaNC } from '../';

/**
 * Returns true when z === w.
 */
export default function equals(z: Complex, w: Complex): boolean {
  if (isInfinite(z) && isInfinite(w)) return true;
  if (isNaNC(z) || isNaNC(w)) return false;

  const a: number = z.getRe();
  const b: number = z.getIm();
  const c: number = w.getRe();
  const d: number = w.getIm();

  // TODO: check if it should be done like this
  return (
    Math.abs(a - c) <= Complex.EPSILON &&
    Math.abs(b - d) <= Complex.EPSILON
  );
}
