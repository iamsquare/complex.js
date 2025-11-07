import Complex from '~/complex';
import isInfinite from '~/operations/isInfinite';
import isNaNC from '~/operations/isNaNC';

/**
 * Returns true when z === w.
 */
export default function equals(z: Complex, w: Complex) {
  if (isInfinite(z) && isInfinite(w)) return true;
  if (isNaNC(z) || isNaNC(w)) return false;

  const a = z.getRe();
  const b = z.getIm();
  const c = w.getRe();
  const d = w.getIm();

  // TODO: check if it should be done like this
  return Math.abs(a - c) <= Complex.EPSILON && Math.abs(b - d) <= Complex.EPSILON;
}
