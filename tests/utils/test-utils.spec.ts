import { describe, expect, test } from 'vitest';

import { Complex } from '~/complex';
import { type Polar } from '~/helpers';
import { expectComplexCloseTo, expectPolarCloseTo, isApproximatelyEqual, TEST_EPSILON } from '~/tests/utils/test-utils';

const ZERO = Complex.ZERO;
const SMALL_DIFF = TEST_EPSILON / 2;
const LARGE_DIFF = TEST_EPSILON * 2;

describe('test-utils', () => {
  describe('isApproximatelyEqual', () => {
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
        const customEpsilon = 0.1;

        expect(isApproximatelyEqual(1, 1.05, customEpsilon)).toBe(true);
        expect(isApproximatelyEqual(1, 1.15, customEpsilon)).toBe(false);
      });

      test('works with very small custom epsilon', () => {
        const tinyEpsilon = 1e-20;
        const diff = 1e-15;

        expect(isApproximatelyEqual(1, 1 + diff, tinyEpsilon)).toBe(false);
      });

      test('works with large custom epsilon', () => {
        const largeEpsilon = 1;

        expect(isApproximatelyEqual(1, 1.5, largeEpsilon)).toBe(true);
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
        const diff = (TEST_EPSILON * large) / 2;

        expect(isApproximatelyEqual(large, large + diff)).toBe(true);
        expect(isApproximatelyEqual(large, large + diff * 2)).toBe(false);
      });

      test('handles numbers just below and above 1', () => {
        expect(isApproximatelyEqual(0.999, 1.001)).toBe(false);
        expect(isApproximatelyEqual(0.9999, 1.0001, 0.01)).toBe(true);
      });
    });
  });

  describe('expectComplexCloseTo', () => {
    describe('equal complex numbers', () => {
      test('does not throw for identical complex numbers', () => {
        const z1 = new Complex(1, 2);
        const z2 = new Complex(1, 2);

        expect(() => expectComplexCloseTo(z1, z2)).not.toThrow();
      });

      test('does not throw for zero complex numbers', () => {
        expect(() => expectComplexCloseTo(ZERO, ZERO)).not.toThrow();
      });
    });

    describe('close complex numbers', () => {
      test('does not throw for complex numbers within epsilon', () => {
        const z1 = new Complex(1, 2);
        const z2 = new Complex(1 + SMALL_DIFF, 2 + SMALL_DIFF);

        expect(() => expectComplexCloseTo(z1, z2)).not.toThrow();
      });

      test('does not throw for complex numbers with small differences', () => {
        const z1 = new Complex(0.1, 0.2);
        const z2 = new Complex(0.1 + SMALL_DIFF, 0.2 - SMALL_DIFF);

        expect(() => expectComplexCloseTo(z1, z2)).not.toThrow();
      });
    });

    describe('different complex numbers', () => {
      test('throws for complex numbers with different real parts', () => {
        const z1 = new Complex(1, 2);
        const z2 = new Complex(2, 2);

        expect(() => expectComplexCloseTo(z1, z2)).toThrow();
      });

      test('throws for complex numbers with different imaginary parts', () => {
        const z1 = new Complex(1, 2);
        const z2 = new Complex(1, 3);

        expect(() => expectComplexCloseTo(z1, z2)).toThrow();
      });

      test('throws for complex numbers with both parts different', () => {
        const z1 = new Complex(1, 2);
        const z2 = new Complex(3, 4);

        expect(() => expectComplexCloseTo(z1, z2)).toThrow();
      });
    });

    describe('custom epsilon', () => {
      test('uses custom epsilon when provided', () => {
        const customEpsilon = 0.1;
        const z1 = new Complex(1, 2);
        const z2 = new Complex(1.05, 2.05);

        expect(() => expectComplexCloseTo(z1, z2, customEpsilon)).not.toThrow();
      });

      test('throws with custom epsilon when values are too different', () => {
        const customEpsilon = 0.01;
        const z1 = new Complex(1, 2);
        const z2 = new Complex(1.1, 2.1);

        expect(() => expectComplexCloseTo(z1, z2, customEpsilon)).toThrow();
      });
    });

    describe('edge cases', () => {
      test('handles very small complex numbers', () => {
        const z1 = new Complex(1e-15, 2e-15);
        const z2 = new Complex(1e-15 + SMALL_DIFF, 2e-15 + SMALL_DIFF);

        expect(() => expectComplexCloseTo(z1, z2)).not.toThrow();
      });

      test('handles very large complex numbers', () => {
        const z1 = new Complex(1e15, 2e15);
        const z2 = new Complex(1e15 + (TEST_EPSILON * 1e15) / 2, 2e15 + (TEST_EPSILON * 2e15) / 2);

        expect(() => expectComplexCloseTo(z1, z2)).not.toThrow();
      });

      test('handles negative complex numbers', () => {
        const z1 = new Complex(-1, -2);
        const z2 = new Complex(-1 - SMALL_DIFF, -2 - SMALL_DIFF);

        expect(() => expectComplexCloseTo(z1, z2)).not.toThrow();
      });
    });
  });

  describe('expectPolarCloseTo', () => {
    describe('equal polar coordinates', () => {
      test('does not throw for identical polar coordinates', () => {
        const p1: Polar = { r: 1, p: Math.PI / 4 };
        const p2: Polar = { r: 1, p: Math.PI / 4 };

        expect(() => expectPolarCloseTo(p1, p2)).not.toThrow();
      });

      test('does not throw for zero polar coordinates', () => {
        const p1: Polar = { r: 0, p: 0 };
        const p2: Polar = { r: 0, p: 0 };

        expect(() => expectPolarCloseTo(p1, p2)).not.toThrow();
      });
    });

    describe('close polar coordinates', () => {
      test('does not throw for polar coordinates within epsilon', () => {
        const p1: Polar = { r: 1, p: Math.PI / 4 };
        const p2: Polar = { r: 1 + SMALL_DIFF, p: Math.PI / 4 + SMALL_DIFF };

        expect(() => expectPolarCloseTo(p1, p2)).not.toThrow();
      });

      test('does not throw for polar coordinates with small differences', () => {
        const p1: Polar = { r: 0.5, p: 0.1 };
        const p2: Polar = { r: 0.5 + SMALL_DIFF, p: 0.1 - SMALL_DIFF };

        expect(() => expectPolarCloseTo(p1, p2)).not.toThrow();
      });
    });

    describe('different polar coordinates', () => {
      test('throws for polar coordinates with different radius', () => {
        const p1: Polar = { r: 1, p: Math.PI / 4 };
        const p2: Polar = { r: 2, p: Math.PI / 4 };

        expect(() => expectPolarCloseTo(p1, p2)).toThrow();
      });

      test('throws for polar coordinates with different phase', () => {
        const p1: Polar = { r: 1, p: Math.PI / 4 };
        const p2: Polar = { r: 1, p: Math.PI / 2 };

        expect(() => expectPolarCloseTo(p1, p2)).toThrow();
      });

      test('throws for polar coordinates with both parts different', () => {
        const p1: Polar = { r: 1, p: Math.PI / 4 };
        const p2: Polar = { r: 2, p: Math.PI / 2 };

        expect(() => expectPolarCloseTo(p1, p2)).toThrow();
      });
    });

    describe('custom epsilon', () => {
      test('uses custom epsilon when provided', () => {
        const customEpsilon = 0.1;
        const p1: Polar = { r: 1, p: Math.PI / 4 };
        const p2: Polar = { r: 1.05, p: Math.PI / 4 + 0.05 };

        expect(() => expectPolarCloseTo(p1, p2, customEpsilon)).not.toThrow();
      });

      test('throws with custom epsilon when values are too different', () => {
        const customEpsilon = 0.01;
        const p1: Polar = { r: 1, p: Math.PI / 4 };
        const p2: Polar = { r: 1.1, p: Math.PI / 4 + 0.1 };

        expect(() => expectPolarCloseTo(p1, p2, customEpsilon)).toThrow();
      });
    });

    describe('edge cases', () => {
      test('handles very small polar coordinates', () => {
        const p1: Polar = { r: 1e-15, p: 1e-15 };
        const p2: Polar = { r: 1e-15 + SMALL_DIFF, p: 1e-15 + SMALL_DIFF };

        expect(() => expectPolarCloseTo(p1, p2)).not.toThrow();
      });

      test('handles very large polar coordinates', () => {
        const p1: Polar = { r: 1e15, p: Math.PI };
        const p2: Polar = { r: 1e15 + (TEST_EPSILON * 1e15) / 2, p: Math.PI + SMALL_DIFF };

        expect(() => expectPolarCloseTo(p1, p2)).not.toThrow();
      });

      test('handles negative radius', () => {
        const p1: Polar = { r: -1, p: Math.PI };
        const p2: Polar = { r: -1 - SMALL_DIFF, p: Math.PI };

        expect(() => expectPolarCloseTo(p1, p2)).not.toThrow();
      });

      test('handles phase wrapping around 2π', () => {
        const p1: Polar = { r: 1, p: 0 };
        const p2: Polar = { r: 1, p: 2 * Math.PI };

        expect(() => expectPolarCloseTo(p1, p2)).toThrow();
      });
    });
  });
});
