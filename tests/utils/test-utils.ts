import { expect } from 'vitest';

import { type Complex } from '~/complex';
import { type Polar } from '~/helpers';

/**
 * Epsilon value for floating-point comparisons.
 * Using a slightly larger epsilon than Number.EPSILON for practical comparisons.
 */
export const TEST_EPSILON = Number.EPSILON * 10;

/**
 * Checks if two floating-point numbers are approximately equal using a combination
 * of absolute and relative error. This is more robust than simple epsilon comparison.
 *
 * For values near zero, uses absolute error: |a - b| < epsilon
 * For values away from zero, uses relative error: |a - b| < epsilon * max(|a|, |b|)
 *
 * @param a - First number
 * @param b - Second number
 * @param epsilon - Maximum allowed error (defaults to TEST_EPSILON)
 * @returns True if numbers are approximately equal
 *
 * @example
 * ```typescript
 * isApproximatelyEqual(0.1 + 0.2, 0.3); // => true
 * isApproximatelyEqual(1, 1.0001, 0.001); // => true
 * isApproximatelyEqual(1, 2); // => false
 * ```
 */
export function isApproximatelyEqual(a: number, b: number, epsilon: number = TEST_EPSILON): boolean {
  if (Number.isNaN(a) || Number.isNaN(b)) return false;
  if (!Number.isFinite(a) || !Number.isFinite(b)) return a === b;

  if (a === b) return true;

  const absA = Math.abs(a);
  const absB = Math.abs(b);
  const maxAbs = Math.max(absA, absB);

  if (maxAbs < 1) return Math.abs(a - b) < epsilon;

  return Math.abs(a - b) < epsilon * maxAbs;
}

/**
 * Checks if a complex number's real and imaginary parts are approximately equal
 * to an expected Complex number using epsilon-based comparison.
 *
 * @param z - Complex number to check
 * @param expected - Expected Complex number
 * @param epsilon - Maximum allowed error (defaults to EPSILON)
 */
export function expectComplexCloseTo(z: Complex, expected: Complex, epsilon: number = TEST_EPSILON) {
  const actualRe = z.getRe();
  const actualIm = z.getIm();
  const expectedRe = expected.getRe();
  const expectedIm = expected.getIm();

  expect(
    isApproximatelyEqual(actualRe, expectedRe, epsilon),
    `Real part: expected ${expectedRe}, got ${actualRe} (difference: ${Math.abs(actualRe - expectedRe)})`,
  ).toBe(true);

  expect(
    isApproximatelyEqual(actualIm, expectedIm, epsilon),
    `Imaginary part: expected ${expectedIm}, got ${actualIm} (difference: ${Math.abs(actualIm - expectedIm)})`,
  ).toBe(true);
}

/**
 * Checks if a polar coordinate is approximately equal to an expected Polar coordinate.
 *
 * @param polar - Polar coordinate to check
 * @param expected - Expected Polar coordinate
 * @param epsilon - Maximum allowed error (defaults to TEST_EPSILON)
 */
export function expectPolarCloseTo(polar: Polar, expected: Polar, epsilon: number = TEST_EPSILON) {
  const actualR = polar.r;
  const actualP = polar.p;
  const expectedR = expected.r;
  const expectedP = expected.p;

  expect(
    isApproximatelyEqual(actualR, expectedR, epsilon),
    `Radius: expected ${expectedR}, got ${actualR} (difference: ${Math.abs(actualR - expectedR)})`,
  ).toBe(true);

  expect(
    isApproximatelyEqual(actualP, expectedP, epsilon),
    `Phase: expected ${expectedP}, got ${actualP} (difference: ${Math.abs(actualP - expectedP)})`,
  ).toBe(true);
}
