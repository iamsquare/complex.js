import { type Complex } from '~/complex';
import { type Polar } from '~/helpers';

/**
 * Type for Vitest matcher result.
 */
type SyncExpectationResult = {
  pass: boolean;
  message: () => string;
  actual?: unknown;
  expected?: unknown;
};

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
 * Vitest matcher for checking if a number is approximately equal to an expected value.
 */
export function toBeApproximatelyEqual(
  received: number,
  expected: number,
  epsilon: number = TEST_EPSILON,
): SyncExpectationResult {
  const pass = isApproximatelyEqual(received, expected, epsilon);
  const diff = Math.abs(received - expected);

  return {
    message: () =>
      pass
        ? ``
        : `Expected ${received} to be approximately equal to ${expected} (difference: ${diff}, epsilon: ${epsilon})`,
    pass,
    ...(pass ? {} : { actual: received, expected }),
  };
}

/**
 * Vitest matcher for checking if a complex number is approximately equal to an expected value.
 */
export function toBeComplexCloseTo(
  received: Complex,
  expected: Complex,
  epsilon: number = TEST_EPSILON,
): SyncExpectationResult {
  const actualRe = received.getRe();
  const actualIm = received.getIm();
  const expectedRe = expected.getRe();
  const expectedIm = expected.getIm();
  const reEqual = isApproximatelyEqual(actualRe, expectedRe, epsilon);
  const imEqual = isApproximatelyEqual(actualIm, expectedIm, epsilon);
  const pass = reEqual && imEqual;
  const reDiff = Math.abs(actualRe - expectedRe);
  const imDiff = Math.abs(actualIm - expectedIm);

  return {
    message: () =>
      pass
        ? ``
        : [
            !reEqual && `Real part: expected ${expectedRe}, got ${actualRe} (difference: ${reDiff})`,
            !imEqual && `Imaginary part: expected ${expectedIm}, got ${actualIm} (difference: ${imDiff})`,
          ]
            .filter(Boolean)
            .join('\n'),
    pass,
    ...(pass ? {} : { actual: received, expected }),
  };
}

/**
 * Vitest matcher for checking if a polar coordinate is approximately equal to an expected value.
 */
export function toBePolarCloseTo(received: Polar, expected: Polar, epsilon: number = TEST_EPSILON) {
  const actualR = received.r;
  const actualP = received.p;
  const expectedR = expected.r;
  const expectedP = expected.p;
  const rEqual = isApproximatelyEqual(actualR, expectedR, epsilon);
  const pEqual = isApproximatelyEqual(actualP, expectedP, epsilon);
  const pass = rEqual && pEqual;
  const rDiff = Math.abs(actualR - expectedR);
  const pDiff = Math.abs(actualP - expectedP);

  return {
    message: () =>
      pass
        ? ``
        : [
            !rEqual && `Radius: expected ${expectedR}, got ${actualR} (difference: ${rDiff})`,
            !pEqual && `Phase: expected ${expectedP}, got ${actualP} (difference: ${pDiff})`,
          ]
            .filter(Boolean)
            .join('\n'),
    pass,
    ...(pass ? {} : { actual: received, expected }),
  };
}
