import { isApproximatelyEqual } from './isApproximatelyEqual';

/**
 * Performs numerically stable subtraction of two numbers.
 *
 * When subtracting numbers of similar magnitudes, subtracts a common value from both
 * before performing the subtraction to avoid loss of significant digits.
 *
 * @param x - The number to subtract from (minuend).
 * @param y - The number to subtract (subtrahend).
 * @returns The difference x - y computed in a numerically stable way.
 */
export function subtractStable(x: number, y: number): number {
  const xAbs = Math.abs(x);
  const yAbs = Math.abs(y);

  const xIsZero = isApproximatelyEqual(xAbs, 0);
  const yIsZero = isApproximatelyEqual(yAbs, 0);

  if (xIsZero) return yIsZero ? 0 : -y;
  if (yIsZero) return xIsZero ? 0 : x;

  const minAbs = Math.min(xAbs, yAbs);
  const maxAbs = Math.max(xAbs, yAbs);

  if (minAbs > 0.5 * maxAbs) {
    const m = xAbs < yAbs ? x : y;

    return x - m - (y - m);
  }

  return x - y;
}
