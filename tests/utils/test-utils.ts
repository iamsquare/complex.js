import { type Complex } from '~/complex';
import { type Polar } from '~/helpers';
import { isApproximatelyEqual } from '~/lib/isApproximatelyEqual';

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
