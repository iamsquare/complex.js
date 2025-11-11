/**
 * Checks if two floating-point numbers are approximately equal using a combination
 * of absolute and relative error. This is more robust than simple epsilon comparison.
 *
 * For values near zero, uses absolute error: |a - b| < ε
 * For values away from zero, uses relative error: |a - b| < ε · max(|a|, |b|)
 *
 * @param a - First number
 * @param b - Second number
 * @param epsilon - Maximum allowed error (defaults to Number.EPSILON)
 * @returns True if numbers are approximately equal
 */
export function isApproximatelyEqual(a: number, b: number, epsilon: number = Number.EPSILON): boolean {
  if (Number.isNaN(a) || Number.isNaN(b)) return false;
  if (!Number.isFinite(a) || !Number.isFinite(b)) return a === b;

  if (a === b) return true;

  const absA = Math.abs(a);
  const absB = Math.abs(b);
  const maxAbs = Math.max(absA, absB);

  if (maxAbs < 1) return Math.abs(a - b) < epsilon;

  return Math.abs(a - b) < epsilon * maxAbs;
}
