import { Complex, isNaNC } from '../';

/**
 * Returns true when a Complex number is ∞.
 */
export default function isInfinite(z: Complex): boolean {
  return (
    !isNaNC(z) && (!Number.isFinite(z.getRe()) || !Number.isFinite(z.getIm()))
  );
}
