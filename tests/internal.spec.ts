import { describe, expect, test } from 'vitest';

import { addStable } from '~/lib/addStable';
import { isApproximatelyEqual } from '~/lib/isApproximatelyEqual';
import { subtractStable } from '~/lib/subtractStable';

describe('Internal', () => {
  describe('addStable', () => {
    describe('basic addition', () => {
      test('adds two positive numbers', () => {
        expect(addStable(3, 4)).toBe(7);
      });

      test('adds two negative numbers', () => {
        expect(addStable(-3, -4)).toBe(-7);
      });

      test('adds positive and negative numbers', () => {
        const testCases = [
          { x: 5, y: -3, expected: 2 },
          { x: -5, y: 3, expected: -2 },
        ];

        testCases.forEach(({ x, y, expected }) => {
          expect(addStable(x, y)).toBe(expected);
        });
      });

      test('handles zero', () => {
        const testCases = [
          { x: 0, y: 5, expected: 5 },
          { x: 5, y: 0, expected: 5 },
          { x: 0, y: 0, expected: 0 },
        ];

        testCases.forEach(({ x, y, expected }) => {
          expect(addStable(x, y)).toBe(expected);
        });
      });
    });

    describe('numerically stable cases', () => {
      test('handles similar magnitudes correctly', () => {
        const testCases = [
          { x: 1.0, y: 1.1, expected: 2.1 },
          { x: 100, y: 101, expected: 201 },
        ];

        testCases.forEach(({ x, y, expected }) => {
          expect(addStable(x, y)).toBe(expected);
        });
      });

      test('handles very different magnitudes by adding smaller to larger for stability', () => {
        expect(addStable(1e15, 1)).toBe(1000000000000001);
      });

      test('handles very small numbers', () => {
        expect(addStable(1e-15, 2e-15)).toBeApproximatelyEqual(3e-15);
      });

      test('handles very large numbers', () => {
        expect(addStable(1e15, 2e15)).toBe(3e15);
      });

      test('handles decimal precision', () => {
        expect(addStable(0.1, 0.2)).toBeApproximatelyEqual(0.3);
      });
    });

    describe('edge cases', () => {
      test('handles Infinity', () => {
        const testCases = [
          { x: Infinity, y: 5, expected: Infinity },
          { x: 5, y: Infinity, expected: Infinity },
          { x: Infinity, y: Infinity, expected: Infinity },
          { x: -Infinity, y: -Infinity, expected: -Infinity },
        ];

        testCases.forEach(({ x, y, expected }) => {
          expect(addStable(x, y)).toBe(expected);
        });
      });

      test('handles NaN', () => {
        const testCases = [
          { x: NaN, y: 5 },
          { x: 5, y: NaN },
          { x: NaN, y: NaN },
        ];

        testCases.forEach(({ x, y }) => {
          expect(Number.isNaN(addStable(x, y))).toBe(true);
        });
      });

      test('handles mixed Infinity and NaN', () => {
        const testCases = [
          { x: Infinity, y: NaN },
          { x: NaN, y: Infinity },
        ];

        testCases.forEach(({ x, y }) => {
          expect(Number.isNaN(addStable(x, y))).toBe(true);
        });
      });
    });
  });

  describe('subtractStable', () => {
    describe('basic subtraction', () => {
      test('subtracts two positive numbers', () => {
        expect(subtractStable(5, 3)).toBe(2);
      });

      test('subtracts two negative numbers', () => {
        expect(subtractStable(-5, -3)).toBe(-2);
      });

      test('subtracts positive and negative numbers', () => {
        const testCases = [
          { x: 5, y: -3, expected: 8 },
          { x: -5, y: 3, expected: -8 },
        ];

        testCases.forEach(({ x, y, expected }) => {
          expect(subtractStable(x, y)).toBe(expected);
        });
      });

      test('handles zero', () => {
        const testCases = [
          { x: 0, y: 5, expected: -5 },
          { x: 5, y: 0, expected: 5 },
          { x: 0, y: 0, expected: 0 },
        ];

        testCases.forEach(({ x, y, expected }) => {
          expect(subtractStable(x, y)).toBe(expected);
        });
      });
    });

    describe('numerically stable cases', () => {
      test('handles similar magnitudes with stable subtraction when ratio is greater than 0.5', () => {
        expect(subtractStable(1.0, 0.9)).toBeApproximatelyEqual(0.1);
      });

      test('handles very different magnitudes by subtracting normally', () => {
        expect(subtractStable(1e15, 1)).toBe(999999999999999);
      });

      test('handles very small numbers', () => {
        expect(subtractStable(2e-15, 1e-15)).toBe(1e-15);
      });

      test('handles very large numbers', () => {
        expect(subtractStable(2e15, 1e15)).toBe(1e15);
      });

      test('handles decimal precision', () => {
        expect(subtractStable(0.3, 0.1)).toBeApproximatelyEqual(0.2);
      });

      test('uses stable algorithm for similar magnitudes when min to max ratio is greater than 0.5', () => {
        expect(subtractStable(100.0, 60.0)).toBeApproximatelyEqual(40.0);
      });
    });

    describe('edge cases', () => {
      test('handles Infinity', () => {
        const testCases = [
          { x: Infinity, y: 5, expected: Infinity },
          { x: 5, y: Infinity, expected: -Infinity },
        ];

        testCases.forEach(({ x, y, expected }) => {
          expect(subtractStable(x, y)).toBe(expected);
        });

        expect(Number.isNaN(subtractStable(Infinity, Infinity))).toBe(true);
        expect(Number.isNaN(subtractStable(-Infinity, -Infinity))).toBe(true);
      });

      test('handles NaN', () => {
        const testCases = [
          { x: NaN, y: 5 },
          { x: 5, y: NaN },
          { x: NaN, y: NaN },
        ];

        testCases.forEach(({ x, y }) => {
          expect(Number.isNaN(subtractStable(x, y))).toBe(true);
        });
      });

      test('handles mixed Infinity and NaN', () => {
        const testCases = [
          { x: Infinity, y: NaN },
          { x: NaN, y: Infinity },
        ];

        testCases.forEach(({ x, y }) => {
          expect(Number.isNaN(subtractStable(x, y))).toBe(true);
        });
      });
    });
  });

  describe('isApproximatelyEqual', () => {
    const EPSILON = Number.EPSILON;
    const SMALL_DIFF = EPSILON / 2;
    const LARGE_DIFF = EPSILON * 2;

    describe('exact equality', () => {
      test('returns true for identical numbers', () => {
        expect(isApproximatelyEqual(0, 0, EPSILON)).toBe(true);
        expect(isApproximatelyEqual(1, 1, EPSILON)).toBe(true);
        expect(isApproximatelyEqual(-1, -1, EPSILON)).toBe(true);
        expect(isApproximatelyEqual(3.14159, 3.14159, EPSILON)).toBe(true);
      });
    });

    describe('values within epsilon', () => {
      test('returns true for numbers very close to each other', () => {
        expect(isApproximatelyEqual(0, SMALL_DIFF, EPSILON)).toBe(true);
        expect(isApproximatelyEqual(1, 1 + SMALL_DIFF, EPSILON)).toBe(true);
        expect(isApproximatelyEqual(-1, -1 - SMALL_DIFF, EPSILON)).toBe(true);
      });

      test('returns true for numbers near zero using absolute error', () => {
        const value = 0.5;

        expect(isApproximatelyEqual(value, value + SMALL_DIFF, EPSILON)).toBe(true);
        expect(isApproximatelyEqual(value, value - SMALL_DIFF, EPSILON)).toBe(true);
      });

      test('returns true for numbers away from zero using relative error', () => {
        const value = 100;

        expect(isApproximatelyEqual(value, value + SMALL_DIFF * value, EPSILON)).toBe(true);
        expect(isApproximatelyEqual(value, value - SMALL_DIFF * value, EPSILON)).toBe(true);
      });
    });

    describe('values outside epsilon', () => {
      test('returns false for numbers too far apart', () => {
        expect(isApproximatelyEqual(0, LARGE_DIFF, EPSILON)).toBe(false);
        expect(isApproximatelyEqual(1, 1 + LARGE_DIFF, EPSILON)).toBe(false);
        expect(isApproximatelyEqual(-1, -1 - LARGE_DIFF, EPSILON)).toBe(false);
      });

      test('returns false for clearly different numbers', () => {
        expect(isApproximatelyEqual(1, 2, EPSILON)).toBe(false);
        expect(isApproximatelyEqual(0.1, 0.2, EPSILON)).toBe(false);
        expect(isApproximatelyEqual(-5, 5, EPSILON)).toBe(false);
      });
    });

    describe('NaN handling', () => {
      test('returns false when first argument is NaN', () => {
        expect(isApproximatelyEqual(NaN, 0, EPSILON)).toBe(false);
        expect(isApproximatelyEqual(NaN, 1, EPSILON)).toBe(false);
        expect(isApproximatelyEqual(NaN, NaN, EPSILON)).toBe(false);
      });

      test('returns false when second argument is NaN', () => {
        expect(isApproximatelyEqual(0, NaN, EPSILON)).toBe(false);
        expect(isApproximatelyEqual(1, NaN, EPSILON)).toBe(false);
      });
    });

    describe('Infinity handling', () => {
      test('returns true for identical infinities', () => {
        expect(isApproximatelyEqual(Infinity, Infinity, EPSILON)).toBe(true);
        expect(isApproximatelyEqual(-Infinity, -Infinity, EPSILON)).toBe(true);
      });

      test('returns false for different infinities', () => {
        expect(isApproximatelyEqual(Infinity, -Infinity, EPSILON)).toBe(false);
        expect(isApproximatelyEqual(-Infinity, Infinity, EPSILON)).toBe(false);
      });

      test('returns false when comparing infinity to finite numbers', () => {
        expect(isApproximatelyEqual(Infinity, 0, EPSILON)).toBe(false);
        expect(isApproximatelyEqual(Infinity, 1, EPSILON)).toBe(false);
        expect(isApproximatelyEqual(-Infinity, 0, EPSILON)).toBe(false);
        expect(isApproximatelyEqual(-Infinity, -1, EPSILON)).toBe(false);
      });
    });

    describe('custom epsilon', () => {
      test('uses custom epsilon when provided', () => {
        expect(isApproximatelyEqual(1, 1.05, 0.1)).toBe(true);
        expect(isApproximatelyEqual(1, 1.15, 0.1)).toBe(false);
      });

      test('works with very small custom epsilon', () => {
        expect(isApproximatelyEqual(1, 1 + 1e-15, 1e-20)).toBe(false);
      });

      test('works with large custom epsilon', () => {
        expect(isApproximatelyEqual(1, 1.5, 1)).toBe(true);
        expect(isApproximatelyEqual(1, 2, 0.5)).toBe(false);
      });
    });

    describe('edge cases', () => {
      test('handles very small numbers', () => {
        const tiny = 1e-15;

        expect(isApproximatelyEqual(tiny, tiny + SMALL_DIFF, EPSILON)).toBe(true);
        expect(isApproximatelyEqual(tiny, tiny + LARGE_DIFF, EPSILON)).toBe(false);
      });

      test('handles very large numbers', () => {
        const large = 1e15;
        const diff = (EPSILON * large) / 2;

        expect(isApproximatelyEqual(large, large + diff, EPSILON)).toBe(true);
        expect(isApproximatelyEqual(large, large + diff * 2, EPSILON)).toBe(false);
      });

      test('handles numbers just below and above 1', () => {
        expect(isApproximatelyEqual(0.999, 1.001, EPSILON)).toBe(false);
        expect(isApproximatelyEqual(0.9999, 1.0001, 0.01)).toBe(true);
      });
    });
  });
});
