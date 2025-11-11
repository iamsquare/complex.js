import { isApproximatelyEqual } from './isApproximatelyEqual';

/**
 * Performs numerically stable addition of two numbers.
 *
 * Adds numbers of similar small magnitude together before adding to larger magnitude numbers
 * to reduce rounding errors.
 *
 * @param x - The first number.
 * @param y - The second number.
 * @returns The sum x + y computed in a numerically stable way.
 */
export function addStable(x: number, y: number): number {
  const xAbs = Math.abs(x);
  const yAbs = Math.abs(y);

  const xIsZero = isApproximatelyEqual(xAbs, 0);
  const yIsZero = isApproximatelyEqual(yAbs, 0);

  if (xIsZero) return yIsZero ? 0 : y;
  if (yIsZero) return xIsZero ? 0 : x;

  return Math.min(xAbs, yAbs) < 0.1 * Math.max(xAbs, yAbs) ? (xAbs < yAbs ? y + x : x + y) : x + y;
}
