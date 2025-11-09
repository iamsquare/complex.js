import { describe, expect, test } from 'vitest';

import { addStable, isCartesian, isPolar, subtractStable } from '~/helpers';

describe('Helpers', () => {
  describe('isCartesian', () => {
    describe('valid Cartesian coordinates', () => {
      test('returns true for standard Cartesian coordinates', () => {
        expect(isCartesian({ x: 10, y: 20 })).toBe(true);
      });

      test('returns true for zero coordinates', () => {
        expect(isCartesian({ x: 0, y: 0 })).toBe(true);
      });

      test('returns true for negative coordinates', () => {
        expect(isCartesian({ x: -5, y: -3 })).toBe(true);
      });

      test('returns true for decimal coordinates', () => {
        expect(isCartesian({ x: 0.1, y: 0.2 })).toBe(true);
      });

      test('returns true for very large numbers', () => {
        expect(isCartesian({ x: 1e15, y: 2e15 })).toBe(true);
      });

      test('returns true for very small numbers', () => {
        expect(isCartesian({ x: 1e-15, y: 2e-15 })).toBe(true);
      });

      test('returns true for Infinity values', () => {
        expect(isCartesian({ x: Infinity, y: Infinity })).toBe(true);
      });

      test('returns true for NaN values', () => {
        expect(isCartesian({ x: NaN, y: NaN })).toBe(true);
      });
    });

    describe('invalid inputs', () => {
      test('returns false for undefined', () => {
        expect(isCartesian(undefined)).toBe(false);
      });

      test('returns false for null', () => {
        expect(isCartesian(null)).toBe(false);
      });

      test('returns false for non-object types', () => {
        const testCases = [5, 'string', true, []];

        testCases.forEach((value) => {
          expect(isCartesian(value)).toBe(false);
        });
      });

      test('returns false for objects missing x property', () => {
        expect(isCartesian({ y: 5 })).toBe(false);
      });

      test('returns false for objects missing y property', () => {
        expect(isCartesian({ x: 5 })).toBe(false);
      });

      test('returns false for objects with non-number x', () => {
        const testCases = [
          { x: '5', y: 10 },
          { x: null, y: 10 },
          { x: undefined, y: 10 },
        ];

        testCases.forEach((obj) => {
          expect(isCartesian(obj)).toBe(false);
        });
      });

      test('returns false for objects with non-number y', () => {
        const testCases = [
          { x: 5, y: '10' },
          { x: 5, y: null },
          { x: 5, y: undefined },
        ];

        testCases.forEach((obj) => {
          expect(isCartesian(obj)).toBe(false);
        });
      });

      test('returns false for Polar coordinates', () => {
        expect(isCartesian({ r: 1, p: Math.PI })).toBe(false);
      });

      test('returns true for objects with extra properties when x and y are present', () => {
        expect(isCartesian({ x: 5, y: 10, z: 15 })).toBe(true);
      });

      test('returns false for objects with wrong property names', () => {
        const testCases = [
          { a: 5, b: 10 },
          { real: 5, imag: 10 },
        ];

        testCases.forEach((obj) => {
          expect(isCartesian(obj)).toBe(false);
        });
      });
    });
  });

  describe('isPolar', () => {
    describe('valid Polar coordinates', () => {
      test('returns true for standard Polar coordinates', () => {
        expect(isPolar({ r: 11, p: Math.PI })).toBe(true);
      });

      test('returns true for zero radius', () => {
        expect(isPolar({ r: 0, p: 0 })).toBe(true);
      });

      test('returns true for negative phase', () => {
        expect(isPolar({ r: 5, p: -Math.PI / 2 })).toBe(true);
      });

      test('returns true for large phase values', () => {
        expect(isPolar({ r: 1, p: 2 * Math.PI })).toBe(true);
      });

      test('returns true for decimal values', () => {
        expect(isPolar({ r: 0.5, p: 0.1 })).toBe(true);
      });

      test('returns true for very large numbers', () => {
        expect(isPolar({ r: 1e15, p: 1e15 })).toBe(true);
      });

      test('returns true for very small numbers', () => {
        expect(isPolar({ r: 1e-15, p: 1e-15 })).toBe(true);
      });

      test('returns true for Infinity values', () => {
        expect(isPolar({ r: Infinity, p: Infinity })).toBe(true);
      });

      test('returns true for NaN values', () => {
        expect(isPolar({ r: NaN, p: NaN })).toBe(true);
      });
    });

    describe('invalid inputs', () => {
      test('returns false for undefined', () => {
        expect(isPolar(undefined)).toBe(false);
      });

      test('returns false for null', () => {
        expect(isPolar(null)).toBe(false);
      });

      test('returns false for non-object types', () => {
        const testCases = [5, 'string', true, []];

        testCases.forEach((value) => {
          expect(isPolar(value)).toBe(false);
        });
      });

      test('returns false for objects missing r property', () => {
        expect(isPolar({ p: Math.PI })).toBe(false);
      });

      test('returns false for objects missing p property', () => {
        expect(isPolar({ r: 5 })).toBe(false);
      });

      test('returns false for objects with non-number r', () => {
        const testCases = [
          { r: '5', p: Math.PI },
          { r: null, p: Math.PI },
          { r: undefined, p: Math.PI },
        ];

        testCases.forEach((obj) => {
          expect(isPolar(obj)).toBe(false);
        });
      });

      test('returns false for objects with non-number p', () => {
        const testCases = [
          { r: 5, p: 'Math.PI' },
          { r: 5, p: null },
          { r: 5, p: undefined },
        ];

        testCases.forEach((obj) => {
          expect(isPolar(obj)).toBe(false);
        });
      });

      test('returns false for Cartesian coordinates', () => {
        expect(isPolar({ x: 5, y: 10 })).toBe(false);
      });

      test('returns true for objects with extra properties when r and p are present', () => {
        expect(isPolar({ r: 5, p: Math.PI, q: 10 })).toBe(true);
      });

      test('returns false for objects with wrong property names', () => {
        const testCases = [
          { radius: 5, phase: Math.PI },
          { magnitude: 5, angle: Math.PI },
        ];

        testCases.forEach((obj) => {
          expect(isPolar(obj)).toBe(false);
        });
      });
    });
  });

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

  describe('toBeApproximatelyEqual matcher', () => {
    const EPSILON = Number.EPSILON;
    const SMALL_DIFF = EPSILON / 2;
    const LARGE_DIFF = EPSILON * 2;

    describe('exact equality', () => {
      test('passes for identical numbers', () => {
        expect(0).toBeApproximatelyEqual(0, EPSILON);
        expect(1).toBeApproximatelyEqual(1, EPSILON);
        expect(-1).toBeApproximatelyEqual(-1, EPSILON);
        expect(3.14159).toBeApproximatelyEqual(3.14159, EPSILON);
      });
    });

    describe('values within epsilon', () => {
      test('passes for numbers very close to each other', () => {
        expect(0).toBeApproximatelyEqual(SMALL_DIFF, EPSILON);
        expect(1).toBeApproximatelyEqual(1 + SMALL_DIFF, EPSILON);
        expect(-1).toBeApproximatelyEqual(-1 - SMALL_DIFF, EPSILON);
      });

      test('passes for numbers near zero using absolute error', () => {
        const value = 0.5;

        expect(value).toBeApproximatelyEqual(value + SMALL_DIFF, EPSILON);
        expect(value).toBeApproximatelyEqual(value - SMALL_DIFF, EPSILON);
      });

      test('passes for numbers away from zero using relative error', () => {
        const value = 100;

        expect(value).toBeApproximatelyEqual(value + SMALL_DIFF * value, EPSILON);
        expect(value).toBeApproximatelyEqual(value - SMALL_DIFF * value, EPSILON);
      });
    });

    describe('values outside epsilon', () => {
      test('fails for numbers too far apart', () => {
        expect(0).not.toBeApproximatelyEqual(LARGE_DIFF, EPSILON);
        expect(1).not.toBeApproximatelyEqual(1 + LARGE_DIFF, EPSILON);
        expect(-1).not.toBeApproximatelyEqual(-1 - LARGE_DIFF, EPSILON);
      });

      test('fails for clearly different numbers', () => {
        expect(1).not.toBeApproximatelyEqual(2, EPSILON);
        expect(0.1).not.toBeApproximatelyEqual(0.2, EPSILON);
        expect(-5).not.toBeApproximatelyEqual(5, EPSILON);
      });
    });

    describe('NaN handling', () => {
      test('fails when first argument is NaN', () => {
        expect(NaN).not.toBeApproximatelyEqual(0, EPSILON);
        expect(NaN).not.toBeApproximatelyEqual(1, EPSILON);
        expect(NaN).not.toBeApproximatelyEqual(NaN, EPSILON);
      });

      test('fails when second argument is NaN', () => {
        expect(0).not.toBeApproximatelyEqual(NaN, EPSILON);
        expect(1).not.toBeApproximatelyEqual(NaN, EPSILON);
      });
    });

    describe('Infinity handling', () => {
      test('passes for identical infinities', () => {
        expect(Infinity).toBeApproximatelyEqual(Infinity, EPSILON);
        expect(-Infinity).toBeApproximatelyEqual(-Infinity, EPSILON);
      });

      test('fails for different infinities', () => {
        expect(Infinity).not.toBeApproximatelyEqual(-Infinity, EPSILON);
        expect(-Infinity).not.toBeApproximatelyEqual(Infinity, EPSILON);
      });

      test('fails when comparing infinity to finite numbers', () => {
        expect(Infinity).not.toBeApproximatelyEqual(0, EPSILON);
        expect(Infinity).not.toBeApproximatelyEqual(1, EPSILON);
        expect(-Infinity).not.toBeApproximatelyEqual(0, EPSILON);
        expect(-Infinity).not.toBeApproximatelyEqual(-1, EPSILON);
      });
    });

    describe('custom epsilon', () => {
      test('uses custom epsilon when provided', () => {
        expect(1).toBeApproximatelyEqual(1.05, 0.1);
        expect(1).not.toBeApproximatelyEqual(1.15, 0.1);
      });

      test('works with very small custom epsilon', () => {
        expect(1).not.toBeApproximatelyEqual(1 + 1e-15, 1e-20);
      });

      test('works with large custom epsilon', () => {
        expect(1).toBeApproximatelyEqual(1.5, 1);
        expect(1).not.toBeApproximatelyEqual(2, 0.5);
      });
    });

    describe('edge cases', () => {
      test('handles very small numbers', () => {
        const tiny = 1e-15;

        expect(tiny).toBeApproximatelyEqual(tiny + SMALL_DIFF, EPSILON);
        expect(tiny).not.toBeApproximatelyEqual(tiny + LARGE_DIFF, EPSILON);
      });

      test('handles very large numbers', () => {
        const large = 1e15;
        const diff = (EPSILON * large) / 2;

        expect(large).toBeApproximatelyEqual(large + diff, EPSILON);
        expect(large).not.toBeApproximatelyEqual(large + diff * 2, EPSILON);
      });

      test('handles numbers just below and above 1', () => {
        expect(0.999).not.toBeApproximatelyEqual(1.001, EPSILON);
        expect(0.9999).toBeApproximatelyEqual(1.0001, 0.01);
      });
    });
  });
});
