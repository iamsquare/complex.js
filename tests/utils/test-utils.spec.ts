import { describe, expect, test } from 'vitest';

import { Complex } from '~/complex';
import { TEST_EPSILON } from '~/tests/utils/test-utils';

const ZERO = Complex.ZERO;
const SMALL_DIFF = TEST_EPSILON / 2;
const LARGE_DIFF = TEST_EPSILON * 2;

describe('test-utils', () => {
  describe('toBeApproximatelyEqual matcher', () => {
    describe('exact equality', () => {
      test('passes for identical numbers', () => {
        expect(0).toBeApproximatelyEqual(0);
        expect(1).toBeApproximatelyEqual(1);
        expect(-1).toBeApproximatelyEqual(-1);
        expect(3.14159).toBeApproximatelyEqual(3.14159);
      });
    });

    describe('values within epsilon', () => {
      test('passes for numbers very close to each other', () => {
        expect(0).toBeApproximatelyEqual(SMALL_DIFF);
        expect(1).toBeApproximatelyEqual(1 + SMALL_DIFF);
        expect(-1).toBeApproximatelyEqual(-1 - SMALL_DIFF);
      });

      test('passes for numbers near zero using absolute error', () => {
        const value = 0.5;

        expect(value).toBeApproximatelyEqual(value + SMALL_DIFF);
        expect(value).toBeApproximatelyEqual(value - SMALL_DIFF);
      });

      test('passes for numbers away from zero using relative error', () => {
        const value = 100;

        expect(value).toBeApproximatelyEqual(value + SMALL_DIFF * value);
        expect(value).toBeApproximatelyEqual(value - SMALL_DIFF * value);
      });
    });

    describe('values outside epsilon', () => {
      test('fails for numbers too far apart', () => {
        expect(0).not.toBeApproximatelyEqual(LARGE_DIFF);
        expect(1).not.toBeApproximatelyEqual(1 + LARGE_DIFF);
        expect(-1).not.toBeApproximatelyEqual(-1 - LARGE_DIFF);
      });

      test('fails for clearly different numbers', () => {
        expect(1).not.toBeApproximatelyEqual(2);
        expect(0.1).not.toBeApproximatelyEqual(0.2);
        expect(-5).not.toBeApproximatelyEqual(5);
      });
    });

    describe('NaN handling', () => {
      test('fails when first argument is NaN', () => {
        expect(NaN).not.toBeApproximatelyEqual(0);
        expect(NaN).not.toBeApproximatelyEqual(1);
        expect(NaN).not.toBeApproximatelyEqual(NaN);
      });

      test('fails when second argument is NaN', () => {
        expect(0).not.toBeApproximatelyEqual(NaN);
        expect(1).not.toBeApproximatelyEqual(NaN);
      });
    });

    describe('Infinity handling', () => {
      test('passes for identical infinities', () => {
        expect(Infinity).toBeApproximatelyEqual(Infinity);
        expect(-Infinity).toBeApproximatelyEqual(-Infinity);
      });

      test('fails for different infinities', () => {
        expect(Infinity).not.toBeApproximatelyEqual(-Infinity);
        expect(-Infinity).not.toBeApproximatelyEqual(Infinity);
      });

      test('fails when comparing infinity to finite numbers', () => {
        expect(Infinity).not.toBeApproximatelyEqual(0);
        expect(Infinity).not.toBeApproximatelyEqual(1);
        expect(-Infinity).not.toBeApproximatelyEqual(0);
        expect(-Infinity).not.toBeApproximatelyEqual(-1);
      });
    });

    describe('custom epsilon', () => {
      test('uses custom epsilon when provided', () => {
        const customEpsilon = 0.1;

        expect(1).toBeApproximatelyEqual(1.05, customEpsilon);
        expect(1).not.toBeApproximatelyEqual(1.15, customEpsilon);
      });

      test('works with very small custom epsilon', () => {
        const tinyEpsilon = 1e-20;
        const diff = 1e-15;

        expect(1).not.toBeApproximatelyEqual(1 + diff, tinyEpsilon);
      });

      test('works with large custom epsilon', () => {
        const largeEpsilon = 1;

        expect(1).toBeApproximatelyEqual(1.5, largeEpsilon);
        expect(1).not.toBeApproximatelyEqual(2, 0.5);
      });
    });

    describe('edge cases', () => {
      test('handles very small numbers', () => {
        const tiny = 1e-15;

        expect(tiny).toBeApproximatelyEqual(tiny + SMALL_DIFF);
        expect(tiny).not.toBeApproximatelyEqual(tiny + LARGE_DIFF);
      });

      test('handles very large numbers', () => {
        const large = 1e15;
        const diff = (TEST_EPSILON * large) / 2;

        expect(large).toBeApproximatelyEqual(large + diff);
        expect(large).not.toBeApproximatelyEqual(large + diff * 2);
      });

      test('handles numbers just below and above 1', () => {
        expect(0.999).not.toBeApproximatelyEqual(1.001);
        expect(0.9999).toBeApproximatelyEqual(1.0001, 0.01);
      });
    });
  });

  describe('toBeComplexCloseTo matcher', () => {
    describe('equal complex numbers', () => {
      test('passes for identical complex numbers', () => {
        const z1 = new Complex(1, 2);
        const z2 = new Complex(1, 2);

        expect(z1).toBeComplexCloseTo(z2);
      });

      test('passes for zero complex numbers', () => {
        expect(ZERO).toBeComplexCloseTo(ZERO);
      });
    });

    describe('close complex numbers', () => {
      test('passes for complex numbers within epsilon', () => {
        const z1 = new Complex(1, 2);
        const z2 = new Complex(1 + SMALL_DIFF, 2 + SMALL_DIFF);

        expect(z1).toBeComplexCloseTo(z2);
      });

      test('passes for complex numbers with small differences', () => {
        const z1 = new Complex(0.1, 0.2);
        const z2 = new Complex(0.1 + SMALL_DIFF, 0.2 - SMALL_DIFF);

        expect(z1).toBeComplexCloseTo(z2);
      });
    });

    describe('different complex numbers', () => {
      test('fails for complex numbers with different real parts', () => {
        const z1 = new Complex(1, 2);
        const z2 = new Complex(2, 2);

        expect(() => expect(z1).toBeComplexCloseTo(z2)).toThrow();
      });

      test('fails for complex numbers with different imaginary parts', () => {
        const z1 = new Complex(1, 2);
        const z2 = new Complex(1, 3);

        expect(() => expect(z1).toBeComplexCloseTo(z2)).toThrow();
      });

      test('fails for complex numbers with both parts different', () => {
        const z1 = new Complex(1, 2);
        const z2 = new Complex(3, 4);

        expect(() => expect(z1).toBeComplexCloseTo(z2)).toThrow();
      });
    });

    describe('custom epsilon', () => {
      test('uses custom epsilon when provided', () => {
        const customEpsilon = 0.1;
        const z1 = new Complex(1, 2);
        const z2 = new Complex(1.05, 2.05);

        expect(z1).toBeComplexCloseTo(z2, customEpsilon);
      });

      test('fails with custom epsilon when values are too different', () => {
        const customEpsilon = 0.01;
        const z1 = new Complex(1, 2);
        const z2 = new Complex(1.1, 2.1);

        expect(() => expect(z1).toBeComplexCloseTo(z2, customEpsilon)).toThrow();
      });
    });

    describe('edge cases', () => {
      test('handles very small complex numbers', () => {
        const z1 = new Complex(1e-15, 2e-15);
        const z2 = new Complex(1e-15 + SMALL_DIFF, 2e-15 + SMALL_DIFF);

        expect(z1).toBeComplexCloseTo(z2);
      });

      test('handles very large complex numbers', () => {
        const z1 = new Complex(1e15, 2e15);
        const z2 = new Complex(1e15 + (TEST_EPSILON * 1e15) / 2, 2e15 + (TEST_EPSILON * 2e15) / 2);

        expect(z1).toBeComplexCloseTo(z2);
      });

      test('handles negative complex numbers', () => {
        const z1 = new Complex(-1, -2);
        const z2 = new Complex(-1 - SMALL_DIFF, -2 - SMALL_DIFF);

        expect(z1).toBeComplexCloseTo(z2);
      });
    });
  });

  describe('toBePolarCloseTo matcher', () => {
    describe('equal polar coordinates', () => {
      test('passes for identical polar coordinates', () => {
        expect({ r: 1, p: Math.PI / 4 }).toBePolarCloseTo({ r: 1, p: Math.PI / 4 });
      });

      test('passes for zero polar coordinates', () => {
        expect({ r: 0, p: 0 }).toBePolarCloseTo({ r: 0, p: 0 });
      });
    });

    describe('close polar coordinates', () => {
      test('passes for polar coordinates within epsilon', () => {
        expect({ r: 1, p: Math.PI / 4 }).toBePolarCloseTo({ r: 1 + SMALL_DIFF, p: Math.PI / 4 + SMALL_DIFF });
      });

      test('passes for polar coordinates with small differences', () => {
        expect({ r: 0.5, p: 0.1 }).toBePolarCloseTo({ r: 0.5 + SMALL_DIFF, p: 0.1 - SMALL_DIFF });
      });
    });

    describe('different polar coordinates', () => {
      test('fails for polar coordinates with different radius', () => {
        expect(() => expect({ r: 1, p: Math.PI / 4 }).toBePolarCloseTo({ r: 2, p: Math.PI / 4 })).toThrow();
      });

      test('fails for polar coordinates with different phase', () => {
        expect(() => expect({ r: 1, p: Math.PI / 4 }).toBePolarCloseTo({ r: 1, p: Math.PI / 2 })).toThrow();
      });

      test('fails for polar coordinates with both parts different', () => {
        expect(() => expect({ r: 1, p: Math.PI / 4 }).toBePolarCloseTo({ r: 2, p: Math.PI / 2 })).toThrow();
      });
    });

    describe('custom epsilon', () => {
      test('uses custom epsilon when provided', () => {
        expect({ r: 1, p: Math.PI / 4 }).toBePolarCloseTo({ r: 1.05, p: Math.PI / 4 + 0.05 }, 0.1);
      });

      test('fails with custom epsilon when values are too different', () => {
        expect(() =>
          expect({ r: 1, p: Math.PI / 4 }).toBePolarCloseTo({ r: 1.1, p: Math.PI / 4 + 0.1 }, 0.01),
        ).toThrow();
      });
    });

    describe('edge cases', () => {
      test('handles very small polar coordinates', () => {
        expect({ r: 1e-15, p: 1e-15 }).toBePolarCloseTo({ r: 1e-15 + SMALL_DIFF, p: 1e-15 + SMALL_DIFF });
      });

      test('handles very large polar coordinates', () => {
        expect({ r: 1e15, p: Math.PI }).toBePolarCloseTo({
          r: 1e15 + (TEST_EPSILON * 1e15) / 2,
          p: Math.PI + SMALL_DIFF,
        });
      });

      test('handles negative radius', () => {
        expect({ r: -1, p: Math.PI }).toBePolarCloseTo({ r: -1 - SMALL_DIFF, p: Math.PI });
      });

      test('fails for phase wrapping around 2π', () => {
        expect(() => expect({ r: 1, p: 0 }).toBePolarCloseTo({ r: 1, p: 2 * Math.PI })).toThrow();
      });
    });
  });
});
