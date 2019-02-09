import { Complex, equals } from '../';

/**
   * Returns true when z !== w.
   */
export default function notEquals(z: Complex, w: Complex): boolean {
  return !equals(z, w);
}
