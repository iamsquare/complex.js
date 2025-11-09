import { describe, expect, test } from 'vitest';

import { Complex } from '~/complex';
import {
  addStable,
  type Cartesian,
  isApproximatelyEqual,
  isCartesian,
  isPolar,
  type Polar,
  subtractStable,
} from '~/helpers';

describe('Helpers', () => {
  describe('isCartesian', () => {
    describe('valid Cartesian coordinates', () => {
      test('returns true for standard Cartesian coordinates', () => {
        const cart: Cartesian = { x: 10, y: 20 };

        expect(isCartesian(cart)).toBe(true);
      });

      test('returns true for zero coordinates', () => {
        const cart: Cartesian = { x: 0, y: 0 };

        expect(isCartesian(cart)).toBe(true);
      });

      test('returns true for negative coordinates', () => {
        const cart: Cartesian = { x: -5, y: -3 };

        expect(isCartesian(cart)).toBe(true);
      });

      test('returns true for decimal coordinates', () => {
        const cart: Cartesian = { x: 0.1, y: 0.2 };

        expect(isCartesian(cart)).toBe(true);
      });

      test('returns true for very large numbers', () => {
        const cart: Cartesian = { x: 1e15, y: 2e15 };

        expect(isCartesian(cart)).toBe(true);
      });

      test('returns true for very small numbers', () => {
        const cart: Cartesian = { x: 1e-15, y: 2e-15 };

        expect(isCartesian(cart)).toBe(true);
      });

      test('returns true for Infinity values', () => {
        const cart: Cartesian = { x: Infinity, y: Infinity };

        expect(isCartesian(cart)).toBe(true);
      });

      test('returns true for NaN values', () => {
        const cart: Cartesian = { x: NaN, y: NaN };

        expect(isCartesian(cart)).toBe(true);
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
        const polar: Polar = { r: 1, p: Math.PI };

        expect(isCartesian(polar)).toBe(false);
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
        const polar: Polar = { r: 11, p: Math.PI };

        expect(isPolar(polar)).toBe(true);
      });

      test('returns true for zero radius', () => {
        const polar: Polar = { r: 0, p: 0 };

        expect(isPolar(polar)).toBe(true);
      });

      test('returns true for negative phase', () => {
        const polar: Polar = { r: 5, p: -Math.PI / 2 };

        expect(isPolar(polar)).toBe(true);
      });

      test('returns true for large phase values', () => {
        const polar: Polar = { r: 1, p: 2 * Math.PI };

        expect(isPolar(polar)).toBe(true);
      });

      test('returns true for decimal values', () => {
        const polar: Polar = { r: 0.5, p: 0.1 };

        expect(isPolar(polar)).toBe(true);
      });

      test('returns true for very large numbers', () => {
        const polar: Polar = { r: 1e15, p: 1e15 };

        expect(isPolar(polar)).toBe(true);
      });

      test('returns true for very small numbers', () => {
        const polar: Polar = { r: 1e-15, p: 1e-15 };

        expect(isPolar(polar)).toBe(true);
      });

      test('returns true for Infinity values', () => {
        const polar: Polar = { r: Infinity, p: Infinity };

        expect(isPolar(polar)).toBe(true);
      });

      test('returns true for NaN values', () => {
        const polar: Polar = { r: NaN, p: NaN };

        expect(isPolar(polar)).toBe(true);
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
        const cart: Cartesian = { x: 5, y: 10 };

        expect(isPolar(cart)).toBe(false);
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
        expect(addStable(1e-15, 2e-15)).toBeCloseTo(3e-15, 15);
      });

      test('handles very large numbers', () => {
        expect(addStable(1e15, 2e15)).toBe(3e15);
      });

      test('handles decimal precision', () => {
        expect(addStable(0.1, 0.2)).toBeCloseTo(0.3, 15);
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
        expect(subtractStable(1.0, 0.9)).toBeCloseTo(0.1, 15);
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
        expect(subtractStable(0.3, 0.1)).toBeCloseTo(0.2, 15);
      });

      test('uses stable algorithm for similar magnitudes when min to max ratio is greater than 0.5', () => {
        expect(subtractStable(100.0, 60.0)).toBeCloseTo(40.0, 15);
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
    const EPSILON = Complex.EPSILON;
    const SMALL_DIFF = EPSILON / 2;
    const LARGE_DIFF = EPSILON * 2;

    describe('exact equality', () => {
      test('returns true for identical numbers', () => {
        expect(isApproximatelyEqual(0, 0)).toBe(true);
        expect(isApproximatelyEqual(1, 1)).toBe(true);
        expect(isApproximatelyEqual(-1, -1)).toBe(true);
        expect(isApproximatelyEqual(3.14159, 3.14159)).toBe(true);
      });
    });

    describe('values within epsilon', () => {
      test('returns true for numbers very close to each other', () => {
        expect(isApproximatelyEqual(0, SMALL_DIFF)).toBe(true);
        expect(isApproximatelyEqual(1, 1 + SMALL_DIFF)).toBe(true);
        expect(isApproximatelyEqual(-1, -1 - SMALL_DIFF)).toBe(true);
      });

      test('returns true for numbers near zero using absolute error', () => {
        const value = 0.5;

        expect(isApproximatelyEqual(value, value + SMALL_DIFF)).toBe(true);
        expect(isApproximatelyEqual(value, value - SMALL_DIFF)).toBe(true);
      });

      test('returns true for numbers away from zero using relative error', () => {
        const value = 100;

        expect(isApproximatelyEqual(value, value + SMALL_DIFF * value)).toBe(true);
        expect(isApproximatelyEqual(value, value - SMALL_DIFF * value)).toBe(true);
      });
    });

    describe('values outside epsilon', () => {
      test('returns false for numbers too far apart', () => {
        expect(isApproximatelyEqual(0, LARGE_DIFF)).toBe(false);
        expect(isApproximatelyEqual(1, 1 + LARGE_DIFF)).toBe(false);
        expect(isApproximatelyEqual(-1, -1 - LARGE_DIFF)).toBe(false);
      });

      test('returns false for clearly different numbers', () => {
        expect(isApproximatelyEqual(1, 2)).toBe(false);
        expect(isApproximatelyEqual(0.1, 0.2)).toBe(false);
        expect(isApproximatelyEqual(-5, 5)).toBe(false);
      });
    });

    describe('NaN handling', () => {
      test('returns false when first argument is NaN', () => {
        expect(isApproximatelyEqual(NaN, 0)).toBe(false);
        expect(isApproximatelyEqual(NaN, 1)).toBe(false);
        expect(isApproximatelyEqual(NaN, NaN)).toBe(false);
      });

      test('returns false when second argument is NaN', () => {
        expect(isApproximatelyEqual(0, NaN)).toBe(false);
        expect(isApproximatelyEqual(1, NaN)).toBe(false);
      });
    });

    describe('Infinity handling', () => {
      test('returns true for identical infinities', () => {
        expect(isApproximatelyEqual(Infinity, Infinity)).toBe(true);
        expect(isApproximatelyEqual(-Infinity, -Infinity)).toBe(true);
      });

      test('returns false for different infinities', () => {
        expect(isApproximatelyEqual(Infinity, -Infinity)).toBe(false);
        expect(isApproximatelyEqual(-Infinity, Infinity)).toBe(false);
      });

      test('returns false when comparing infinity to finite numbers', () => {
        expect(isApproximatelyEqual(Infinity, 0)).toBe(false);
        expect(isApproximatelyEqual(Infinity, 1)).toBe(false);
        expect(isApproximatelyEqual(-Infinity, 0)).toBe(false);
        expect(isApproximatelyEqual(-Infinity, -1)).toBe(false);
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

        expect(isApproximatelyEqual(tiny, tiny + SMALL_DIFF)).toBe(true);
        expect(isApproximatelyEqual(tiny, tiny + LARGE_DIFF)).toBe(false);
      });

      test('handles very large numbers', () => {
        const large = 1e15;
        const diff = (EPSILON * large) / 2;

        expect(isApproximatelyEqual(large, large + diff)).toBe(true);
        expect(isApproximatelyEqual(large, large + diff * 2)).toBe(false);
      });

      test('handles numbers just below and above 1', () => {
        expect(isApproximatelyEqual(0.999, 1.001)).toBe(false);
        expect(isApproximatelyEqual(0.9999, 1.0001, 0.01)).toBe(true);
      });
    });
  });
});
